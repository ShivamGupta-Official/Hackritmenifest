import { ContentItem, ContentDNASummary } from '@/lib/db/schema';
import {
  calculateMedian,
  calculateOutperformanceMultiplier,
  calculateConfidenceTier,
} from '@/lib/analytics/metrics';

export interface ContentDNAAnalysisResult {
  baselineMedianEngagement: number;
  totalContentAnalyzed: number;
  contentHealthScore: number; // 0 - 100
  dimensions: {
    hooks: ContentDNASummary[];
    formats: ContentDNASummary[];
    durations: ContentDNASummary[];
    topics: ContentDNASummary[];
    tones: ContentDNASummary[];
  };
  topWinningPattern: {
    hook: string;
    format: string;
    duration: string;
    multiplier: number;
    sampleSize: number;
    proofText: string;
  };
  criticalWeakPattern: {
    format: string;
    multiplier: number;
    sampleSize: number;
    advisory: string;
  };
}

export function analyzeContentDNA(items: ContentItem[]): ContentDNAAnalysisResult {
  if (!items || items.length === 0) {
    return {
      baselineMedianEngagement: 0,
      totalContentAnalyzed: 0,
      contentHealthScore: 0,
      dimensions: { hooks: [], formats: [], durations: [], topics: [], tones: [] },
      topWinningPattern: { hook: 'N/A', format: 'N/A', duration: 'N/A', multiplier: 1.0, sampleSize: 0, proofText: 'Insufficient historical data.' },
      criticalWeakPattern: { format: 'N/A', multiplier: 1.0, sampleSize: 0, advisory: 'No data.' }
    };
  }

  // 1. Calculate overall baseline median
  const allEngagements = items.map(i => i.engagementRate);
  const baselineMedian = calculateMedian(allEngagements);

  // Helper to group by a property and compute statistics
  function groupDimension(
    dimension: 'hook' | 'format' | 'duration' | 'topic' | 'tone',
    keyExtractor: (i: ContentItem) => string
  ): ContentDNASummary[] {
    const groups: { [key: string]: number[] } = {};
    for (const item of items) {
      const key = keyExtractor(item);
      if (!key) continue;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item.engagementRate);
    }

    return Object.keys(groups).map(name => {
      const groupRates = groups[name];
      const median = calculateMedian(groupRates);
      const multiplier = calculateOutperformanceMultiplier(median, baselineMedian);
      const confidence = calculateConfidenceTier(groupRates.length);

      return {
        dimension,
        name,
        sampleSize: groupRates.length,
        medianEngagementRate: median,
        outperformanceMultiplier: multiplier,
        confidence,
        isWinningPattern: multiplier >= 1.25 && groupRates.length >= 3,
      };
    }).sort((a, b) => b.outperformanceMultiplier - a.outperformanceMultiplier);
  }

  const hooks = groupDimension('hook', i => i.hookType);
  const formats = groupDimension('format', i => i.format);
  const durations = groupDimension('duration', i => {
    if (i.durationSeconds <= 15) return '< 15s (Micro)';
    if (i.durationSeconds <= 30) return '15-30s (Short)';
    if (i.durationSeconds <= 60) return '30-60s (Medium)';
    return '> 60s (Long)';
  });
  const topics = groupDimension('topic', i => i.topic);
  const tones = groupDimension('tone', i => i.tone);

  // 2. Identify Signature Winning Combinations
  const winningHook = hooks.find(h => h.isWinningPattern) || hooks[0] || { name: 'problem_first', outperformanceMultiplier: 1.0, sampleSize: 0 };
  const winningFormat = formats.find(f => f.isWinningPattern) || formats[0] || { name: 'founder_talking_head', outperformanceMultiplier: 1.0, sampleSize: 0 };
  const winningDuration = durations.find(d => d.isWinningPattern) || durations[0] || { name: '15-30s', outperformanceMultiplier: 1.0, sampleSize: 0 };

  // Calculate composite multiplier
  const combinedMultiplier = Number(
    ((winningHook.outperformanceMultiplier + winningFormat.outperformanceMultiplier) / 2).toFixed(2)
  );

  // 3. Identify Underperforming Pattern
  const weakFormat = [...formats].reverse().find(f => f.outperformanceMultiplier < 0.85 && f.sampleSize >= 3) || formats[formats.length - 1];

  // 4. Content Health Score (0 - 100)
  // Evaluates: baseline quality, presence of high-confidence winning patterns, and content velocity
  let healthScore = 50;
  if (baselineMedian >= 4.0) healthScore += 20;
  else if (baselineMedian >= 2.5) healthScore += 10;

  const winningPatternsCount = [...hooks, ...formats].filter(p => p.isWinningPattern).length;
  healthScore += Math.min(25, winningPatternsCount * 5);
  if (items.length >= 50) healthScore += 10;
  healthScore = Math.min(100, Math.max(20, healthScore));

  return {
    baselineMedianEngagement: baselineMedian,
    totalContentAnalyzed: items.length,
    contentHealthScore: healthScore,
    dimensions: {
      hooks,
      formats,
      durations,
      topics,
      tones,
    },
    topWinningPattern: {
      hook: winningHook.name,
      format: winningFormat.name,
      duration: winningDuration.name,
      multiplier: combinedMultiplier,
      sampleSize: winningFormat.sampleSize,
      proofText: `${formatDisplayName(winningFormat.name)} with ${formatDisplayName(winningHook.name)} hook outperforms your median post by ${combinedMultiplier}× across ${winningFormat.sampleSize} published pieces.`,
    },
    criticalWeakPattern: {
      format: weakFormat ? weakFormat.name : 'generic_promo',
      multiplier: weakFormat ? weakFormat.outperformanceMultiplier : 0.65,
      sampleSize: weakFormat ? weakFormat.sampleSize : 0,
      advisory: weakFormat 
        ? `${formatDisplayName(weakFormat.name)} underperforms your baseline by ${(100 - (weakFormat.outperformanceMultiplier * 100)).toFixed(0)}% across ${weakFormat.sampleSize} posts. Consider reallocating production bandwidth.`
        : 'No severe underperforming formats detected.',
    }
  };
}

export function formatDisplayName(slug: string): string {
  if (!slug) return '';
  return slug
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
