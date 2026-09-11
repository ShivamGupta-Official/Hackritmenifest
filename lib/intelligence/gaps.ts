export async function detectContentGaps(orgId: string) {

  return [
    { 
      topic: 'Recovery & Sleep for Athletes', 
      currentCoverage: 'Low', 
      audienceDemand: 'High',
      opportunityScore: 88,
      recommendedFormat: '15-30s Short-form Video'
    },
    { 
      topic: 'Nutrition for Beginners', 
      currentCoverage: 'Medium', 
      audienceDemand: 'Medium',
      opportunityScore: 65,
      recommendedFormat: 'Text Post'
    }
  ];
}
