import { calculateOpportunityScore } from '../analytics/metrics';

export async function evaluateOpportunity(orgId: string, topic: string) {
  const momentum = 85; 
  const audienceRelevance = 90; 
  const brandRelevance = 80; 
  const historicalOutperformance = 1.5; 
  const whitespace = 70; 
  
  const scoreResult = calculateOpportunityScore({
    momentum, 
    audienceRelevance, 
    brandRelevance, 
    historicalOutperformance, 
    whitespace
  });
  
  return {
    organizationId: orgId,
    topic,
    score: scoreResult.totalScore,
    breakdown: scoreResult.weights,
    recommendation: scoreResult.totalScore > 80 ? 'EXECUTE: High Commercial Value' : 'MONITOR: Insufficient Signal'
  };
}
