export function trackProvenance(history: { actor: 'human' | 'ai', action: string, timestamp: Date }[]) {
  const aiTouches = history.filter(h => h.actor === 'ai').length;
  const humanTouches = history.filter(h => h.actor === 'human').length;
  
  let classification = 'Human-Led';
  if (aiTouches > 0 && humanTouches === 0) classification = 'AI-Generated';
  if (aiTouches > 0 && humanTouches > 0) classification = 'Cyborg / Co-Created';
  
  return {
    classification,
    totalTouches: history.length,
    authenticityScore: Math.min(100, (humanTouches / (aiTouches + humanTouches || 1)) * 100),
    history
  };
}
