/**
 * Google ADK Function Tools
 * "Anything deterministic you can code yourself belongs here, not in a second agent."
 * - google-ADK.md (Component 02)
 */

import {
  calculateEngagementRate,
  calculateSaveRate,
  calculateCTR,
  calculateROAS,
  calculateOpportunityScore,
  diagnoseCampaignFunnel,
  MetricInput,
  OpportunityFormulaParams,
  FunnelDiagnosisInput,
} from '@/lib/analytics/metrics';

/**
 * Tool: calculate_metrics
 * Computes deterministic engagement rate, save rate, and CTR for content items.
 */
export function calculateMetricsTool(input: MetricInput) {
  return {
    engagementRate: calculateEngagementRate(input),
    saveRate: calculateSaveRate(input),
    ctr: calculateCTR(input),
  };
}

/**
 * Tool: score_opportunity
 * Computes the 5-variable Opportunity Score (0 to 100) using verified weights.
 */
export function scoreOpportunityTool(params: OpportunityFormulaParams) {
  return calculateOpportunityScore(params);
}

/**
 * Tool: diagnose_campaign
 * Evaluates campaign CTR vs Landing Page CVR to pinpoint the exact funnel bottleneck.
 */
export function diagnoseCampaignTool(input: FunnelDiagnosisInput) {
  return diagnoseCampaignFunnel(input);
}
