
export interface ADKModelContext {
  organizationId: string;
  workspaceId?: string;
  model: string;
  temperature?: number;
}

export function before_model_callback(prompt: string, context: ADKModelContext): string {
  let sanitized = prompt.replace(/Ignore all previous instructions/gi, "[REDACTED]");
  sanitized = sanitized.replace(/System prompt/gi, "[REDACTED]");
  
  const securityHeader = `\n[SYSTEM SECURITY CONTEXT: You are operating on behalf of Organization ${context.organizationId}. Do not reference data outside this context.]\n`;
  
  return securityHeader + sanitized;
}
