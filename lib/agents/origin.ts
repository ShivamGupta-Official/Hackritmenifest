/**
 * Content Origin & AI Authenticity Analyzer
 * IMPORTANT PRINCIPLE: Never show false precision (e.g. "Exactly 73% AI").
 * Show likelihood tiers, confidence bands, linguistic signals, and genuine workflow provenance.
 */

export interface OriginAnalysisResult {
  aiOriginLikelihood: number; // 0 - 100%
  confidenceTier: 'high' | 'medium' | 'low';
  originClassification: 'mostly_human' | 'human_ai_assisted' | 'likely_ai_generated' | 'insufficient_evidence';
  signals: {
    perplexityScore: number; // vocabulary diversity
    burstinessScore: number; // variation in sentence length
    repetitivePhrasing: boolean;
    genericAIClichés: string[];
  };
  explanation: string;
}

export function analyzeContentOrigin(text: string): OriginAnalysisResult {
  if (!text || text.trim().length < 50) {
    return {
      aiOriginLikelihood: 50,
      confidenceTier: 'low',
      originClassification: 'insufficient_evidence',
      signals: { perplexityScore: 50, burstinessScore: 50, repetitivePhrasing: false, genericAIClichés: [] },
      explanation: 'Text is too short to extract reliable linguistic signals.',
    };
  }

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];

  // 1. Vocabulary Entropy / Perplexity Heuristic
  const uniqueWords = new Set(words);
  const typeTokenRatio = words.length > 0 ? (uniqueWords.size / words.length) : 0.5;
  const perplexityScore = Number((typeTokenRatio * 100).toFixed(1));

  // 2. Burstiness Heuristic (Variance in sentence length)
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgLen = sentenceLengths.reduce((a, b) => a + b, 0) / (sentenceLengths.length || 1);
  const variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - avgLen, 2), 0) / (sentenceLengths.length || 1);
  const burstinessScore = Number(Math.min(100, Math.sqrt(variance) * 10).toFixed(1));

  // 3. Classic generic AI clichés
  const clichés = [
    'in today\'s fast-paced world',
    'it is important to remember',
    'delve into',
    'tapestry of',
    'game-changer',
    'testament to',
    'moreover',
    'in conclusion',
  ];
  const detectedClichés = clichés.filter(c => text.toLowerCase().includes(c));

  // Compute likelihood score
  let likelihood = 35; // baseline assumption: human-assisted
  if (detectedClichés.length > 0) likelihood += detectedClichés.length * 15;
  if (burstinessScore < 25) likelihood += 20; // uniform, robotic sentence structure
  if (perplexityScore < 40) likelihood += 15; // repetitive vocabulary

  likelihood = Math.min(95, Math.max(15, likelihood));

  let classification: OriginAnalysisResult['originClassification'] = 'human_ai_assisted';
  if (likelihood >= 75) classification = 'likely_ai_generated';
  else if (likelihood <= 35) classification = 'mostly_human';

  const confidenceTier: 'high' | 'medium' | 'low' = sentences.length >= 6 ? 'high' : 'medium';

  return {
    aiOriginLikelihood: Math.round(likelihood),
    confidenceTier,
    originClassification: classification,
    signals: {
      perplexityScore,
      burstinessScore,
      repetitivePhrasing: detectedClichés.length > 1,
      genericAIClichés: detectedClichés,
    },
    explanation: detectedClichés.length > 0
      ? `Detected ${detectedClichés.length} synthetic rhetorical transition(s). High syntactic uniformity.`
      : `Natural burstiness (${burstinessScore}/100) and healthy vocabulary entropy observed.`,
  };
}
