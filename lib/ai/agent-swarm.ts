/**
 * Multi-Model Agent Swarm (High-Performance Inference Engine)
 * 
 * Specialized Agent Architecture:
 * 1. StrategyAgent (openai/gpt-oss-120b)              - Strategic Reasoning & Growth Blueprint synthesis
 * 2. CreatorAgent (openai/gpt-oss-20b)                - Rapid Copy & Hook drafting
 * 3. VisualCriticAgent (openai/gpt-oss-20b)           - Visual Pacing, Retention & Multimodal Critique
 * 4. SafetyPolicyAgent (openai/gpt-oss-safeguard-20b) - Compliance, Negative Claims & Brand Safety
 * 5. SwarmOrchestrator                                - Multi-Agent Synthesis Loop
 */

const AI_KEY = process.env.AI_API_KEY || process.env.FAST_AI_KEY || '';
const AI_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export interface AgentResponse<T = any> {
  success: boolean;
  model: string;
  agentRole: string;
  content: string;
  parsed?: T;
  reasoning?: string;
  executionTimeMs: number;
}

export function extractJsonFromText<T = any>(text: string): T | null {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      try {
        return JSON.parse(codeBlockMatch[1]);
      } catch {}
    }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(text.slice(firstBrace, lastBrace + 1));
      } catch {}
    }
  }
  return null;
}

async function invokeSwarmModel(
  model: string,
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options: {
    temperature?: number;
    responseFormatJson?: boolean;
    maxTokens?: number;
  } = {}
): Promise<{ content: string; reasoning?: string; executionTimeMs: number }> {
  const startTime = Date.now();
  
  const payload: any = {
    model,
    messages,
    temperature: options.temperature ?? 0.7,
  };

  if (options.responseFormatJson) {
    payload.response_format = { type: 'json_object' };
  }
  if (options.maxTokens) {
    payload.max_tokens = options.maxTokens;
  }

  let res = await fetch(AI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok && res.status === 429 && model !== 'openai/gpt-oss-20b') {
    payload.model = 'openai/gpt-oss-20b';
    payload.max_tokens = Math.min(payload.max_tokens || 1000, 800);
    res = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`AI Agent [${payload.model}] failed (${res.status}): ${errorText}`);
  }

  const json = await res.json();
  const choice = json.choices?.[0];
  const content = choice?.message?.content || '';
  const reasoning = choice?.message?.reasoning;
  const executionTimeMs = Date.now() - startTime;

  return { content, reasoning, executionTimeMs };
}

/**
 * 1. STRATEGY AGENT (openai/gpt-oss-120b)
 * Deep reasoning and comprehensive Growth Blueprint synthesis
 */
export class StrategyAgent {
  static readonly MODEL = 'openai/gpt-oss-120b';

  static async generateGrowthBlueprint(
    competitorProfile: { handle: string; displayName?: string; bio?: string },
    observedHooks: Array<{ title: string; hookText?: string; format?: string; topic?: string }>,
    brandInput: { brandName: string; industry: string; icp: string; valueProp: string; product: string; toneOfVoice?: string[] }
  ): Promise<AgentResponse> {
    const systemPrompt = `You are the Lead Strategy Agent in the ContentOS multi-model swarm.
Your job is to analyze competitor content DNA and synthesize an original, highly tailored 7-Day Growth Blueprint for a target brand.
Do NOT copy competitor content verbatim. Abstract the underlying psychological mechanics and map them specifically to the user's product.
You MUST output your response as a valid JSON object matching this schema:
{
  "executiveSummary": "string",
  "personaAngle": "string",
  "originalHooks": [
    {
      "hookNumber": 1,
      "headline": "string",
      "hookType": "string",
      "visualScript": "string",
      "spokenAudio": "string",
      "cta": "string"
    }
  ],
  "organic7DayCalendar": [
    {
      "day": 1,
      "theme": "string",
      "format": "string",
      "hookHeadline": "string",
      "coreMessage": "string",
      "cta": "string"
    }
  ],
  "paidAdAngles": [
    {
      "angleName": "string",
      "targetPainPoint": "string",
      "hook": "string",
      "creativeDirection": "string",
      "estimatedRoasMultiplier": "string"
    }
  ]
}`;

    const userPrompt = `
TARGET BRAND INFORMATION:
- Brand Name: ${brandInput.brandName}
- Industry: ${brandInput.industry}
- Ideal Customer Profile (ICP): ${brandInput.icp}
- Core Value Proposition: ${brandInput.valueProp}
- Featured Product/Service: ${brandInput.product}
- Brand Voice: ${brandInput.toneOfVoice?.join(', ') || 'authoritative, direct'}

OBSERVED COMPETITOR INSPIRATION:
- Competitor Handle: @${competitorProfile.handle} (${competitorProfile.displayName || ''})
- Bio: ${competitorProfile.bio || ''}
- Top Observed Hooks & Formats:
${observedHooks.map((h, i) => `  ${i + 1}. [${h.format || 'Reel'}] "${h.hookText || h.title}" (Topic: ${h.topic || 'General'})`).join('\n')}

Generate the comprehensive, 100% original Growth Blueprint in JSON.`;

    const result = await invokeSwarmModel(
      this.MODEL,
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.6, responseFormatJson: true, maxTokens: 1800 }
    );

    const parsed = extractJsonFromText(result.content);

    return {
      success: true,
      model: this.MODEL,
      agentRole: 'Strategic Reasoning & Growth Synthesis',
      content: result.content,
      parsed,
      reasoning: result.reasoning,
      executionTimeMs: result.executionTimeMs
    };
  }
}

/**
 * 2. CREATOR AGENT (openai/gpt-oss-20b)
 * Fast creative copy and viral hook variations
 */
export class CreatorAgent {
  static readonly MODEL = 'openai/gpt-oss-20b';

  static async generateVariations(
    baseHook: string,
    brandName: string,
    product: string,
    count: number = 3
  ): Promise<AgentResponse> {
    const systemPrompt = `You are the High-Speed Creator Agent. Generate ${count} high-converting viral variations of a base hook tailored to a specific product. Keep it punchy, attention-grabbing, and formatted with 0-3s visual cues.
You MUST format your entire response as a valid JSON object with key "variations": [{ "hook": "string", "visualCue": "string", "script": "string", "cta": "string" }].`;

    const userPrompt = `Base Hook: "${baseHook}"\nBrand: ${brandName}\nProduct: ${product}\nProvide response in JSON format.`;

    const result = await invokeSwarmModel(
      this.MODEL,
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.8, responseFormatJson: true, maxTokens: 600 }
    );

    const parsed = extractJsonFromText(result.content);

    return {
      success: true,
      model: this.MODEL,
      agentRole: 'Rapid Creative Copywriter',
      content: result.content,
      parsed,
      reasoning: result.reasoning,
      executionTimeMs: result.executionTimeMs
    };
  }
}

/**
 * 3. VISUAL CRITIC AGENT (openai/gpt-oss-20b)
 * Multimodal & visual perception model for evaluating Frame 1 visual hooks, text-density, and retention pacing
 */
export class VisualCriticAgent {
  static readonly MODEL = 'openai/gpt-oss-20b';

  static async auditVisualPacing(
    script: string,
    format: string,
    durationSeconds: number
  ): Promise<AgentResponse> {
    const systemPrompt = `You are the Visual Critic Agent in the ContentOS swarm.
Analyze the provided video script for retention drop-off risks in the first 3 seconds, subtitle pacing, and frame composition.
Provide a retention score out of 100 and 3 actionable visual optimizations.
You MUST output your response as a valid JSON object with keys:
{
  "retentionScore": 88,
  "pacingRating": "Optimal",
  "visualCritiques": ["critique 1", "critique 2"],
  "frame1Recommendation": "actionable visual cue"
}`;

    const userPrompt = `Format: ${format} (~${durationSeconds}s)\nScript: "${script}"\nProvide evaluation in JSON format.`;

    const result = await invokeSwarmModel(
      this.MODEL,
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.4, responseFormatJson: true, maxTokens: 450 }
    );

    const parsed = extractJsonFromText(result.content);

    return {
      success: true,
      model: this.MODEL,
      agentRole: 'Visual Pacing & Multimodal Critic',
      content: result.content,
      parsed,
      reasoning: result.reasoning,
      executionTimeMs: result.executionTimeMs
    };
  }
}

/**
 * 4. SAFETY & POLICY AGENT (openai/gpt-oss-safeguard-20b)
 * Enforces brand safety, FTC disclosure compliance, negative claims, and competitor non-infringement
 */
export class SafetyPolicyAgent {
  static readonly MODEL = 'openai/gpt-oss-safeguard-20b';

  static async verifyBrandCompliance(
    content: string,
    brandRules: { negativeKeywords?: string[]; forbiddenClaims?: string[] } = {}
  ): Promise<AgentResponse> {
    const systemPrompt = `You are the Brand Safety & Policy Agent in the ContentOS swarm.
Audit the marketing copy for compliance, false claims, and negative keywords.
You MUST return your response as a valid JSON object with keys:
{
  "isSafe": true,
  "flaggedTerms": [],
  "complianceAdvice": "string",
  "riskLevel": "LOW"
}`;

    const userPrompt = `Content to audit:\n"${content}"\nForbidden keywords: ${brandRules.negativeKeywords?.join(', ') || 'None'}\nForbidden claims: ${brandRules.forbiddenClaims?.join(', ') || 'Guaranteed 100% returns, Cure-all claims'}\nProvide audit result in JSON format.`;

    const result = await invokeSwarmModel(
      this.MODEL,
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      { temperature: 0.2, responseFormatJson: true, maxTokens: 400 }
    );

    const parsed = extractJsonFromText(result.content);

    return {
      success: true,
      model: this.MODEL,
      agentRole: 'Safety & Compliance Guardrail',
      content: result.content,
      parsed,
      reasoning: result.reasoning,
      executionTimeMs: result.executionTimeMs
    };
  }
}

/**
 * 5. SWARM ORCHESTRATOR
 * Coordinates the multi-agent pipeline: Strategy -> Creator -> Visual Critic -> Safety Guardrail
 */
export class SwarmOrchestrator {
  static async runFullIntelligenceLoop(
    competitorProfile: { handle: string; displayName?: string; bio?: string },
    observedHooks: Array<{ title: string; hookText?: string; format?: string; topic?: string }>,
    brandInput: { brandName: string; industry: string; icp: string; valueProp: string; product: string; toneOfVoice?: string[] }
  ) {
    const startTime = Date.now();

    // Step 1: Strategy Agent synthesizes Blueprint
    const strategyResult = await StrategyAgent.generateGrowthBlueprint(
      competitorProfile,
      observedHooks,
      brandInput
    );

    const firstHook = strategyResult.parsed?.originalHooks?.[0];
    const hookText = firstHook ? `${firstHook.headline}: ${firstHook.spokenAudio}` : 'Problem agitation hook';

    // Step 2 & 3: Run Visual Critic & Safety Agent in parallel on the primary hook
    const [visualAudit, safetyAudit] = await Promise.all([
      VisualCriticAgent.auditVisualPacing(hookText, firstHook?.hookType || 'Reel', 28),
      SafetyPolicyAgent.verifyBrandCompliance(hookText)
    ]);

    return {
      success: true,
      swarmSummary: {
        totalExecutionTimeMs: Date.now() - startTime,
        modelsUsed: [
          StrategyAgent.MODEL,
          VisualCriticAgent.MODEL,
          SafetyPolicyAgent.MODEL
        ],
        activeAgents: [
          'StrategyAgent (120B Reasoning)',
          'VisualCriticAgent (20B Pacing & Critique)',
          'SafetyPolicyAgent (20B Guardrail)'
        ]
      },
      blueprint: strategyResult.parsed,
      audits: {
        visualPacing: visualAudit.parsed,
        safetyCompliance: safetyAudit.parsed
      }
    };
  }
}
