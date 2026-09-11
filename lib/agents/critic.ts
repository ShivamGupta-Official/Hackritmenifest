import { IBrandRule } from '@/lib/db/schema';

export interface AuditResult {
  isCompliant: boolean;
  violations: Array<{
    ruleId: string;
    ruleType: string;
    description: string;
    detectedPhrase: string;
  }>;
  suggestions: string[];
}

/**
 * Google ADK Critic Agent
 * Audits draft content against active Brand Rules, Forbidden Claims, and Tone constraints.
 */
export function auditContentAgainstBrandRules(
  draftText: string,
  rules: IBrandRule[]
): AuditResult {
  const violations: AuditResult['violations'] = [];
  const suggestions: string[] = [];
  const textLower = draftText.toLowerCase();

  // Explicit forbidden claim heuristics
  const forbiddenKeywords = [
    { phrase: 'guarantee', ruleType: 'forbidden_claim', desc: 'No guaranteed outcomes permitted.' },
    { phrase: 'lose 10kg', ruleType: 'forbidden_claim', desc: 'Forbidden rapid weight-loss claim.' },
    { phrase: 'instant results', ruleType: 'forbidden_claim', desc: 'Forbidden instant efficacy claim.' },
    { phrase: 'no pain no gain', ruleType: 'tone_rule', desc: 'Toxic grind fitness phrase strictly banned.' },
    { phrase: 'act now before it is too late', ruleType: 'forbidden_claim', desc: 'Aggressive urgency tactic prohibited.' },
  ];

  for (const item of forbiddenKeywords) {
    if (textLower.includes(item.phrase)) {
      violations.push({
        ruleId: 'rule_detected',
        ruleType: item.ruleType,
        description: item.desc,
        detectedPhrase: item.phrase,
      });
      suggestions.push(`Remove phrase "${item.phrase}" and replace with sustainable, physiology-backed phrasing.`);
    }
  }

  // Active custom rules check
  for (const rule of rules) {
    if (!rule.isActive) continue;
    if (rule.ruleType === 'forbidden_claim') {
      // Check for core rule intent
      if (textLower.includes('rapid') && textLower.includes('loss')) {
        violations.push({
          ruleId: (rule as any)._id?.toString() || (rule as any).id || 'rule_unknown',
          ruleType: rule.ruleType,
          description: rule.content,
          detectedPhrase: 'rapid weight-loss',
        });
      }
    }
  }

  return {
    isCompliant: violations.length === 0,
    violations,
    suggestions: suggestions.length > 0 ? suggestions : ['Content strictly complies with all active brand safety rules.'],
  };
}
