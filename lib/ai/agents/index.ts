import { invokeAgent } from '../providers';

export async function runSequentialAgent(orgId: string, steps: string[]) {
  let context = '';
  const results = [];

  for (const step of steps) {
    const prompt = `Context from previous steps:\n${context}\n\nCurrent Task:\n${step}`;
    const result = await invokeAgent(orgId, prompt);
    results.push(result);
    context = result;
  }

  return results;
}

export async function runLoopAgent(orgId: string, task: string, maxIterations: number = 3) {
  let currentDraft = '';
  let feedback = '';
  
  for (let i = 0; i < maxIterations; i++) {
    const creatorPrompt = i === 0 
      ? `Task: ${task}`
      : `Refine this draft based on feedback:\n\nDraft: ${currentDraft}\n\nFeedback: ${feedback}`;
      
    currentDraft = await invokeAgent(orgId, creatorPrompt, { systemPrompt: 'You are the Creator.' });
    
    const criticPrompt = `Review this draft for brand compliance and quality. If it is perfect, reply EXACTLY with "APPROVE". Otherwise, provide specific feedback.\n\nDraft: ${currentDraft}`;
    feedback = await invokeAgent(orgId, criticPrompt, { systemPrompt: 'You are the strict Critic.' });
    
    if (feedback.includes('APPROVE')) {
      return { success: true, iterations: i + 1, finalDraft: currentDraft };
    }
  }
  
  return { success: false, iterations: maxIterations, finalDraft: currentDraft, lastFeedback: feedback };
}
