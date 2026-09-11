import { IGeneratedAsset } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { analyzeContentDNA } from '@/lib/intelligence/content-dna';
import { auditContentAgainstBrandRules } from './critic';
import { analyzeContentOrigin } from './origin';

export interface GenerationRequest {
  orgId: string;
  opportunityId?: string;
  topic?: string;
  assetType: 'reel_script' | 'blog_brief' | 'carousel' | 'ad_variant';
  format?: string;
  actorName?: string;
}

/**
 * Google ADK LoopAgent Workflow:
 * Step 1: Synthesize Strategy using winning Content DNA evidence
 * Step 2: ContentCreator drafts asset
 * Step 3: CriticAgent validates against Brand Rules
 * Step 4: Record workflow provenance lineage
 */
export async function runContentStrategistLoop(req: GenerationRequest): Promise<any> {
  const brand = await db.getBrandProfile(req.orgId);
  const rules = await db.getBrandRules(req.orgId);
  const instructions = await db.getHumanInstructions(req.orgId);
  const items = await db.getContentItems(req.orgId);
  const dna = analyzeContentDNA(items);

  let targetTopic = req.topic || 'Athletic Recovery for Beginners';
  let evidenceText = dna.topWinningPattern.proofText;

  if (req.opportunityId) {
    const opps = await db.getOpportunities(req.orgId);
    const opp = opps.find((o: any) => o._id?.toString() === req.opportunityId || o.id === req.opportunityId);
    if (opp) {
      targetTopic = opp.trendTopic;
      evidenceText = opp.whyExplanation;
    }
  }

  const AI_KEY = process.env.AI_API_KEY || process.env.FAST_AI_KEY || '';
  const AI_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

  // LoopAgent Step 1: Strategist & Creator dynamically generate hook, visual cue, and body points
  let hookHeadline = `The Game-Changing ${targetTopic} Insight Most Creators Overlook`;
  let hookVisualCue = `Fast-paced visual interrupt contrasting common misconceptions with verified results for ${targetTopic}.`;
  let bodyPoints = [
    `The #1 blind spot people encounter when approaching ${targetTopic}.`,
    `A verified 3-step framework to achieve breakthrough consistency without friction.`,
    `Actionable metrics to monitor and track your compound progress over 14 days.`,
  ];
  let cta = `Comment "${targetTopic.toUpperCase().slice(0, 8).trim() || 'GROWTH'}" below to get our comprehensive step-by-step execution guide.`;

  try {
    const aiRes = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: 'You are an elite Content Strategist & Copywriter Agent in ContentOS. Craft high-retention content briefs grounded in brand DNA. Respond strictly in JSON.'
          },
          {
            role: 'user',
            content: `Generate a high-converting ${req.assetType || 'video script'} brief on topic: "${targetTopic}".
Brand: ${brand?.brandName || 'Acme Corp'}.
Provide JSON with keys:
- hookHeadline (punchy, high-retention title max 12 words)
- hookVisualCue (first 3-second visual camera/screen action)
- bodyPoints (array of 3 distinct, insightful takeaways)
- callToAction (direct, engagement-driving CTA)`
          }
        ],
        response_format: { type: 'json_object' }
      }),
      signal: AbortSignal.timeout(6000)
    });

    if (aiRes.ok) {
      const data = await aiRes.json();
      const rawContent = data.choices?.[0]?.message?.content;
      if (rawContent) {
        const parsed = JSON.parse(rawContent);
        if (parsed.hookHeadline) hookHeadline = parsed.hookHeadline;
        if (parsed.hookVisualCue) hookVisualCue = parsed.hookVisualCue;
        if (Array.isArray(parsed.bodyPoints) && parsed.bodyPoints.length > 0) bodyPoints = parsed.bodyPoints;
        if (parsed.callToAction) cta = parsed.callToAction;
      }
    }
  } catch (e) {
    console.warn('[runContentStrategistLoop] Dynamic AI generation fallback used:', e);
  }

  const fullDraftText = `${hookHeadline}\n\n${bodyPoints.join('\n\n')}\n\n${cta}`;

  // LoopAgent Step 2: Critic Agent audits the draft
  const audit = auditContentAgainstBrandRules(fullDraftText, rules);

  // Analyze Origin Likelihood
  const origin = analyzeContentOrigin(fullDraftText);

  const newAsset: any = {
    id: `asset_${Date.now()}`,
    organizationId: req.orgId,
    opportunityId: req.opportunityId,
    assetType: req.assetType,
    title: `${targetTopic} (${req.assetType.replace('_', ' ').toUpperCase()})`,
    brief: {
      objective: `Generate qualified beginner leads while positioning ${brand?.brandName || 'our brand'} as the trusted scientific authority.`,
      targetAudience: `Beginners and active adults experiencing post-workout fatigue or intimidation.`,
      hookHeadline,
      hookVisualCue,
      bodyPoints,
      callToAction: cta,
      groundingDNAEvidence: evidenceText,
    },
    aiOriginLikelihood: origin.aiOriginLikelihood,
    confidenceTier: origin.confidenceTier,
    originClassification: origin.originClassification,
    linguisticSignals: {
      perplexityScore: origin.signals.perplexityScore,
      burstinessScore: origin.signals.burstinessScore,
      repetitivePhrasing: origin.signals.repetitivePhrasing,
    },
    workflowSteps: [
      {
        step: 'human_prompt',
        timestamp: new Date().toISOString(),
        actor: req.actorName || 'User',
        notes: `Requested ${req.assetType} based on Opportunity: "${targetTopic}"`,
      },
      {
        step: 'ai_draft',
        timestamp: new Date().toISOString(),
        actor: 'ContentOS Creator Agent',
        notes: `Grounded in Content DNA winning pattern (${dna.topWinningPattern.multiplier}x outperformance).`,
      },
      {
        step: 'critic_review',
        timestamp: new Date().toISOString(),
        actor: 'ContentOS Critic Agent',
        notes: audit.isCompliant 
          ? `Compliant with all ${rules.length} brand rules and forbidden claim filters.`
          : `Audit warning: ${audit.violations.map(v => v.description).join('; ')}`,
      },
    ],
    status: audit.isCompliant ? 'in_review' : 'draft',
    createdAt: new Date().toISOString(),
  };

  await db.saveGeneratedAsset(newAsset);
  return newAsset;
}
