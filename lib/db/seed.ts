import { calculateEngagementRate, calculateSaveRate, calculateCTR } from '@/lib/analytics/metrics';

export const SEED_ORGANIZATION: any = {
  id: 'org_example_fitness',
  name: 'Example Fitness',
  slug: 'example-fitness',
  plan: 'growth',
  createdAt: '2026-01-10T08:00:00Z',
};

export const SEED_WORKSPACE: any = {
  id: 'ws_fitness_main',
  organizationId: 'org_example_fitness',
  name: 'Main Brand Workspace',
  slug: 'main',
  industry: 'Health & Wellness',
  businessModel: 'D2C',
  createdAt: '2026-01-10T08:00:00Z',
};

export const SEED_BRAND: any = {
  id: 'brand_001',
  organizationId: 'org_example_fitness',
  workspaceId: 'ws_fitness_main',
  brandName: 'Example Fitness',
  tagline: 'Science-Backed Movement for Lifelong Vitality',
  mission: 'Empower beginner and intermediate athletes to build resilient strength without burnout, using proven exercise physiology and smart recovery.',
  toneOfVoice: ['Empathetic', 'Authoritative', 'Scientific', 'Calm'],
  positioning: 'The antidote to toxic fitness culture: sustainable, injury-free progress backed by sports science.',
};

export const SEED_BRAND_RULES: any[] = [
  {
    id: 'rule_01',
    organizationId: 'org_example_fitness',
    workspaceId: 'ws_fitness_main',
    ruleType: 'forbidden_claim',
    content: 'Never use aggressive urgency tactics or guaranteed rapid weight-loss claims (e.g., "Lose 10kg in 14 days").',
    severity: 'strict',
    isActive: true,
  },
  {
    id: 'rule_02',
    organizationId: 'org_example_fitness',
    workspaceId: 'ws_fitness_main',
    ruleType: 'forbidden_claim',
    content: 'Do not promote extreme caloric restriction or "no pain no gain" toxic grind culture.',
    severity: 'strict',
    isActive: true,
  },
  {
    id: 'rule_03',
    organizationId: 'org_example_fitness',
    workspaceId: 'ws_fitness_main',
    ruleType: 'tone_rule',
    content: 'Always emphasize progressive overload, nervous system recovery, and injury prevention.',
    severity: 'strict',
    isActive: true,
  },
];

export const SEED_AUDIENCES: any[] = [
  {
    id: 'aud_01',
    organizationId: 'org_example_fitness',
    name: 'Overwhelmed Beginners',
    level: 'beginner',
    painPoints: [
      'Intimidated by gym jargon and complex routines',
      'Chronic joint soreness and fear of injury',
      'Inconsistent habits due to busy work schedules',
    ],
    desires: [
      'Clear, step-by-step foundation without confusion',
      'Feeling energized rather than completely drained after workouts',
      'Sustainable daily vitality',
    ],
    objections: [
      'I do not have 2 hours a day',
      'Gyms feel intimidating',
      'I always get hurt when I try to start',
    ],
  },
];

export const SEED_HUMAN_INSTRUCTIONS: any[] = [
  {
    id: 'inst_01',
    organizationId: 'org_example_fitness',
    author: 'Pushkar (Head of Growth)',
    instruction: 'Founder should appear in more video hooks. Problem-first angles perform significantly better with beginner leads.',
    category: 'creative',
    createdAt: '2026-08-15T10:00:00Z',
  },
  {
    id: 'inst_02',
    organizationId: 'org_example_fitness',
    author: 'Sarah (Lead Physiologist)',
    instruction: 'We are launching our Beginner Recovery Protocol next month. Prioritize sleep quality and gentle mobility in content recommendations.',
    category: 'strategy',
    createdAt: '2026-09-01T12:00:00Z',
  },
];

// Generate 110 Realistic Content Items (Instagram Reels, Carousels, Blogs, YouTube)
function generateSeedContent(): any[] {
  const items: any[] = [];
  const baseDate = new Date('2026-01-15T00:00:00Z');

  const topicTemplates = [
    { topic: 'Recovery Science', subtopic: 'Sleep & CNS Reset', format: 'founder_talking_head', hook: 'problem_first', hookText: 'Why you wake up more exhausted after your workout than before', tone: 'scientific', duration: 28, baseImpressions: 48000, mult: 2.15 },
    { topic: 'Beginner Strength', subtopic: 'Squat Biomechanics', format: 'founder_talking_head', hook: 'problem_first', hookText: 'Stop squatting like this if your lower back hurts', tone: 'authoritative', duration: 26, baseImpressions: 52000, mult: 2.22 },
    { topic: 'Recovery Science', subtopic: 'Zone 2 Cardio', format: 'founder_talking_head', hook: 'curiosity_gap', hookText: 'The 45-minute easy walk that burns more visceral fat than sprints', tone: 'empathetic', duration: 29, baseImpressions: 44000, mult: 2.05 },
    { topic: 'Mobility & Joints', subtopic: 'Hip Opener Routine', format: 'how_to_demo', hook: 'problem_first', hookText: 'Tight hips from sitting all day? Do this 3-minute desk routine', tone: 'empathetic', duration: 42, baseImpressions: 31000, mult: 1.45 },
    { topic: 'Nutrition Basics', subtopic: 'Post-Workout Protein', format: 'carousel_slide_deck', hook: 'data_statistic', hookText: 'The 30g protein threshold: What 40 clinical trials actually prove', tone: 'scientific', duration: 0, baseImpressions: 24000, mult: 1.10 },
    { topic: 'Mindset & Habits', subtopic: 'Overcoming Plateaus', format: 'narrative_vlog', hook: 'contrarian', hookText: 'Why lifting heavier this week will actually slow down your progress', tone: 'thoughtful', duration: 75, baseImpressions: 19000, mult: 0.95 },
    { topic: 'Product Education', subtopic: 'Starter Program Tour', format: 'screen_demo', hook: 'direct_callout', hookText: 'Take a look inside our Beginner Strength portal', tone: 'casual', duration: 45, baseImpressions: 11000, mult: 0.62 },
    { topic: 'Generic Promo', subtopic: 'Flash Discount', format: 'static_image', hook: 'direct_callout', hookText: 'Get 20% off our program this weekend only', tone: 'promotional', duration: 0, baseImpressions: 8500, mult: 0.48 },
  ];

  for (let i = 1; i <= 110; i++) {
    const template = topicTemplates[i % topicTemplates.length];
    const pubDate = new Date(baseDate.getTime() + i * 2.1 * 24 * 60 * 60 * 1000).toISOString();
    
    // Slight variance in engagement
    const noise = 0.85 + Math.random() * 0.30;
    const impressions = Math.round(template.baseImpressions * noise);
    const likes = Math.round(impressions * 0.038 * template.mult * noise);
    const comments = Math.round(impressions * 0.0035 * template.mult * noise);
    const shares = Math.round(impressions * 0.006 * template.mult * noise);
    const saves = Math.round(impressions * 0.012 * template.mult * noise);
    const clicks = Math.round(impressions * 0.015 * template.mult);
    const conversions = Math.round(clicks * 0.04);
    const revenueCents = conversions * 4900; // $49 lead purchase

    const rawInput = { impressions, likes, comments, shares, saves, clicks, conversions, revenueCents };
    const engagementRate = calculateEngagementRate(rawInput);
    const saveRate = calculateSaveRate(rawInput);
    const ctr = calculateCTR(rawInput);

    items.push({
      id: `content_item_${i.toString().padStart(3, '0')}`,
      organizationId: 'org_example_fitness',
      workspaceId: 'ws_fitness_main',
      platform: i % 5 === 0 ? 'youtube' : i % 7 === 0 ? 'blog' : 'instagram',
      contentType: template.duration > 0 ? 'reel' : i % 7 === 0 ? 'blog' : 'carousel',
      title: `${template.topic}: ${template.hookText}`,
      caption: `${template.hookText}. In this breakdown, we walk through the exact sports science protocol designed for beginners. Tap save to revisit.`,
      publishedAt: pubDate,
      topic: template.topic,
      subtopic: template.subtopic,
      format: template.format,
      hookText: template.hookText,
      hookType: template.hook,
      ctaText: 'Save this post for your next session & comment RECOVERY for the guide.',
      ctaType: 'soft_save_for_later',
      tone: template.tone,
      durationSeconds: template.duration,
      impressions,
      reach: Math.round(impressions * 0.82),
      views: template.duration > 0 ? impressions : 0,
      likes,
      comments,
      shares,
      saves,
      clicks,
      conversions,
      revenueCents,
      engagementRate,
      saveRate,
      ctr,
      outperformanceMultiplier: template.mult,
    });
  }

  return items;
}

export const SEED_CONTENT_ITEMS = generateSeedContent();

export const SEED_TRENDS: any[] = [
  {
    id: 'trend_01',
    topic: 'Zone 2 Cardio for Athletic Recovery',
    industry: 'Health & Fitness',
    source: 'google_search',
    velocityPct: 78.4,
    volumeTier: 'high',
    sentimentScore: 0.82,
    commercialIntent: 84,
    detectedAt: '2026-09-10T14:30:00Z',
  },
  {
    id: 'trend_02',
    topic: 'Overcoming CNS Workout Fatigue in Beginners',
    industry: 'Strength & Conditioning',
    source: 'community_qa',
    velocityPct: 62.1,
    volumeTier: 'rising_niche',
    sentimentScore: 0.65,
    commercialIntent: 91,
    detectedAt: '2026-09-08T09:15:00Z',
  },
  {
    id: 'trend_03',
    topic: 'Ice Baths vs Heat Saunas Debate',
    industry: 'Biohacking',
    source: 'social_signal',
    velocityPct: 94.0,
    volumeTier: 'high',
    sentimentScore: 0.25,
    commercialIntent: 42,
    detectedAt: '2026-09-09T18:00:00Z',
  },
];

export const SEED_OPPORTUNITY_SCORES: any[] = [
  {
    id: 'opp_01',
    organizationId: 'org_example_fitness',
    trendTopic: 'Overcoming CNS Workout Fatigue in Beginners',
    recommendedFormat: 'Founder Reel (25-30s) + Problem-First Hook',
    opportunityScore: 92,
    momentumWeight: 0.20,
    audienceRelevanceWeight: 0.25,
    brandRelevanceWeight: 0.25,
    historicalWinRateWeight: 0.20,
    whitespaceWeight: 0.10,
    whyExplanation: 'Audience queries about feeling "drained after starting strength training" increased +62%. Your founder-led recovery reels outperform median baseline by 2.14× across 31 posts. Competitors focus almost entirely on heavy lifting, creating an acute educational whitespace.',
    evidence: {
      similarPostsCount: 31,
      medianOutperformance: 2.14,
      audienceQuestionsVolume: 'High (+62% MoM)',
      competitorCoverage: 'Low / Neglected',
    },
    status: 'active',
  },
  {
    id: 'opp_02',
    organizationId: 'org_example_fitness',
    trendTopic: 'Zone 2 Cardio for Athletic Recovery',
    recommendedFormat: 'Founder Talking Head (30s) + Contrarian Hook',
    opportunityScore: 86,
    momentumWeight: 0.20,
    audienceRelevanceWeight: 0.25,
    brandRelevanceWeight: 0.25,
    historicalWinRateWeight: 0.20,
    whitespaceWeight: 0.10,
    whyExplanation: 'Zone 2 cardio interest is surging (+78% search velocity). Connects seamlessly with your Beginner Protocol value proposition. Demonstrates strong commercial intent for lead acquisition.',
    evidence: {
      similarPostsCount: 14,
      medianOutperformance: 1.88,
      audienceQuestionsVolume: 'Rising (+78%)',
      competitorCoverage: 'Moderate',
    },
    status: 'active',
  },
  {
    id: 'opp_03',
    organizationId: 'org_example_fitness',
    trendTopic: 'Ice Baths & Cold Plunge Hype',
    recommendedFormat: 'Scientific Carousel Breakdown',
    opportunityScore: 54,
    momentumWeight: 0.20,
    audienceRelevanceWeight: 0.25,
    brandRelevanceWeight: 0.25,
    historicalWinRateWeight: 0.20,
    whitespaceWeight: 0.10,
    whyExplanation: 'Viral search interest is high, but commercial relevance and audience conversion for your beginner demographic is low. Competitor saturation is very high. Kept on watchlist as low priority.',
    evidence: {
      similarPostsCount: 4,
      medianOutperformance: 0.98,
      audienceQuestionsVolume: 'Low commercial intent',
      competitorCoverage: 'Saturated (88%)',
    },
    status: 'active',
  },
];

export const SEED_CAMPAIGNS: any[] = [
  {
    id: 'camp_01',
    organizationId: 'org_example_fitness',
    name: 'Beginner Strength Protocol - Top of Funnel',
    platform: 'meta_ads',
    spendCents: 420000, // $4,200
    impressions: 168000,
    clicks: 4368,
    conversions: 61,
    revenueCents: 298900, // $2,989
    ctr: 2.60,
    cpcCents: 96,
    cpaCents: 6885, // $68.85
    roas: 0.71,
    bottleneck: 'landing_page_problem',
    diagnosisReason: 'The ad hook ("Stop squatting like this") drives an outstanding 2.60% CTR, but the landing page CVR drops to 1.39%. The page opens with generic gym imagery instead of resolving the lower-back pain promise made in the ad.',
    actionRecommendation: 'Retain the video creative hook. Rewrite the landing page hero section to directly address "Fixing Lower Back Discomfort in Your First 30 Days".',
  },
  {
    id: 'camp_02',
    organizationId: 'org_example_fitness',
    name: 'Recovery & Vitality Masterclass Leads',
    platform: 'meta_ads',
    spendCents: 310000, // $3,100
    impressions: 142000,
    clicks: 3408,
    conversions: 289,
    revenueCents: 1416100, // $14,161
    ctr: 2.40,
    cpcCents: 90,
    cpaCents: 1072, // $10.72 CPA
    roas: 4.56,
    bottleneck: 'healthy',
    diagnosisReason: 'Creative, audience persona, and landing page are in perfect alignment. Lead CPA is 48% below target with an exceptional 4.56x return.',
    actionRecommendation: 'Scale ad budget by +20% weekly while monitoring frequency caps.',
  },
];

export const SEED_GENERATED_ASSETS: any[] = [
  {
    id: 'asset_001',
    organizationId: 'org_example_fitness',
    opportunityId: 'opp_01',
    assetType: 'reel_script',
    title: 'Why Beginners Wake Up Drained (And How to Fix It)',
    brief: {
      objective: 'Acquire qualified beginner leads by demystifying nervous system recovery.',
      targetAudience: 'Overwhelmed beginners struggling with constant post-workout exhaustion.',
      hookHeadline: 'Why you wake up more exhausted 2 days AFTER your workout',
      hookVisualCue: 'Founder holding a coffee cup, direct eye contact, speaking in a calm, conversational tone. No aggressive shouting.',
      bodyPoints: [
        'Point 1: Beginners don’t fail from lack of discipline; they fail because their central nervous system (CNS) hasn’t adapted to high-frequency load.',
        'Point 2: Cortisol stays elevated if you jump straight into 5 days of intense weight training without autonomic down-regulation.',
        'Point 3: The 15-minute fix: 10 minutes of low-HR Zone 2 walking + 5 minutes of box breathing directly shifts you into parasympathetic recovery.',
      ],
      callToAction: 'Comment RECOVERY below and our team will send you our complete 7-day Nervous System Reset guide.',
      groundingDNAEvidence: 'Founder-led educational reels with problem-first hooks outperform median Reel by 2.14× across 31 posts (p < 0.01).',
    },
    aiOriginLikelihood: 32.5,
    confidenceTier: 'high',
    originClassification: 'human_ai_assisted',
    linguisticSignals: {
      perplexityScore: 78.4,
      burstinessScore: 84.1,
      repetitivePhrasing: false,
    },
    workflowSteps: [
      { step: 'human_prompt', timestamp: '2026-09-11T10:00:00Z', actor: 'Pushkar', notes: 'Generated from Opportunity #1' },
      { step: 'ai_draft', timestamp: '2026-09-11T10:01:15Z', actor: 'ContentOS Creator Agent' },
      { step: 'critic_review', timestamp: '2026-09-11T10:01:25Z', actor: 'ContentOS Critic Agent', notes: 'Checked against 3 Brand Rules. Zero forbidden claims found. Compliant.' },
      { step: 'human_edit', timestamp: '2026-09-11T10:05:00Z', actor: 'Sarah (Physiologist)', notes: 'Refined CNS terminology to ensure accessible beginner language.' },
      { step: 'approval', timestamp: '2026-09-11T10:06:00Z', actor: 'Pushkar', notes: 'Approved for production.' },
    ],
    status: 'approved',
    createdAt: '2026-09-11T10:00:00Z',
  },
];
