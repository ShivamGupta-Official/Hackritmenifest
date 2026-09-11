/**
 * Deterministic Mathematical & Analytical Core for ContentOS
 * STRICT RULE: All rates, medians, multipliers, and diagnoses are calculated by pure code.
 * LLMs are never asked to calculate arithmetic.
 */

export interface MetricInput {
  impressions: number;
  reach?: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
  conversions: number;
  revenueCents: number;
  spendCents?: number;
}

export function calculateEngagementRate(item: MetricInput): number {
  if (!item.impressions || item.impressions <= 0) return 0;
  const totalInteractions = item.likes + item.comments + item.shares + item.saves;
  return Number(((totalInteractions / item.impressions) * 100).toFixed(2));
}

export function calculateSaveRate(item: MetricInput): number {
  if (!item.impressions || item.impressions <= 0) return 0;
  return Number(((item.saves / item.impressions) * 100).toFixed(2));
}

export function calculateCTR(item: MetricInput): number {
  if (!item.impressions || item.impressions <= 0) return 0;
  return Number(((item.clicks / item.impressions) * 100).toFixed(2));
}

export function calculateROAS(revenueCents: number, spendCents: number): number {
  if (!spendCents || spendCents <= 0) return 0;
  return Number((revenueCents / spendCents).toFixed(2));
}

export function calculateMedian(values: number[]): number {
  if (!values || values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
}

export function calculateOutperformanceMultiplier(groupMedian: number, baselineMedian: number): number {
  if (!baselineMedian || baselineMedian <= 0) return 1.0;
  return Number((groupMedian / baselineMedian).toFixed(2));
}

export function calculateConfidenceTier(sampleSize: number): 'high' | 'medium' | 'low' {
  if (sampleSize >= 25) return 'high';
  if (sampleSize >= 10) return 'medium';
  return 'low';
}

export interface OpportunityFormulaParams {
  momentum: number; // 0 - 100
  audienceRelevance: number; // 0 - 100
  brandRelevance: number; // 0 - 100
  historicalOutperformance: number; // multiplier e.g. 1.0 to 2.5 normalized to 0 - 100
  whitespace: number; // 0 - 100
}

/**
 * Computes the 5-variable Opportunity Score (0 to 100).
 * Weights:
 * - Trend Momentum: 20%
 * - Audience Relevance: 25%
 * - Brand Alignment: 25%
 * - Historical DNA Outperformance: 20%
 * - Competitive Whitespace: 10%
 */
export function calculateOpportunityScore(params: OpportunityFormulaParams): {
  totalScore: number;
  weights: {
    momentum: number;
    audience: number;
    brand: number;
    history: number;
    whitespace: number;
  };
} {
  const normHistory = Math.min(100, Math.max(0, (params.historicalOutperformance / 2.0) * 100));
  
  const score = (
    0.20 * params.momentum +
    0.25 * params.audienceRelevance +
    0.25 * params.brandRelevance +
    0.20 * normHistory +
    0.10 * params.whitespace
  );

  return {
    totalScore: Math.round(Math.min(100, Math.max(0, score))),
    weights: {
      momentum: 0.20,
      audience: 0.25,
      brand: 0.25,
      history: 0.20,
      whitespace: 0.10,
    }
  };
}

export interface FunnelDiagnosisInput {
  ctr: number; // percentage, e.g. 2.5%
  cvr: number; // percentage, e.g. 1.2%
  roas: number; // multiplier, e.g. 1.8x
  cpaCents: number;
  targetCpaCents: number;
}

export interface FunnelDiagnosisResult {
  bottleneck: 'healthy' | 'creative_problem' | 'landing_page_problem' | 'audience_problem';
  reason: string;
  prescribedFix: string;
}

/**
 * Deterministic Multi-Tier Funnel Diagnosis
 */
export function diagnoseCampaignFunnel(input: FunnelDiagnosisInput): FunnelDiagnosisResult {
  const isCtrHigh = input.ctr >= 1.8;
  const isCvrLow = input.cvr < 2.0;
  const isCpaUnfavorable = input.cpaCents > input.targetCpaCents;

  if (isCtrHigh && isCvrLow) {
    return {
      bottleneck: 'landing_page_problem',
      reason: `Ad creative generates strong attention (CTR: ${input.ctr}%), but the landing page fails to convert (CVR: ${input.cvr}%).`,
      prescribedFix: 'Retain the ad hook. Realign the landing page headline, offer, and proof points to match the exact expectation set in the ad.'
    };
  }

  if (!isCtrHigh && !isCvrLow && isCpaUnfavorable) {
    return {
      bottleneck: 'creative_problem',
      reason: `Landing page converts qualified visitors well (CVR: ${input.cvr}%), but the ad creative fails to stop the scroll (CTR: ${input.ctr}%).`,
      prescribedFix: 'Keep the landing page identical. Deploy 3 new problem-first video hooks derived from your winning Content DNA.'
    };
  }

  if (!isCtrHigh && isCvrLow) {
    return {
      bottleneck: 'audience_problem',
      reason: `Both scroll-stop CTR (${input.ctr}%) and on-page conversion (${input.cvr}%) are below benchmark.`,
      prescribedFix: 'Audit target persona targeting and core value proposition. The offer does not match the demographic segment.'
    };
  }

  return {
    bottleneck: 'healthy',
    reason: `Creative and landing page are in harmony (ROAS: ${input.roas}x, CTR: ${input.ctr}%, CVR: ${input.cvr}%).`,
    prescribedFix: 'Scale budget incrementally by 15-20% weekly to maintain auction efficiency.'
  };
}
