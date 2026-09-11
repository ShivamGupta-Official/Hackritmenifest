import { TrendSignal } from '../db/schema';

export interface TrendData {
  topic: string;
  momentumScore: number;
  source: string;
  description?: string;
}

export async function ingestTrendSignal(orgId: string, data: TrendData) {
  const normalized = {
    organizationId: orgId,
    keyword: data.topic,
    momentumScore: Math.min(100, Math.max(0, data.momentumScore)),
    volume: 0,
    source: data.source,
    detectedAt: new Date(),
  };
  
  try {
    const signal = await TrendSignal.create(normalized);
    return { success: true, signal };
  } catch (err: any) {
    console.error('Failed to ingest trend signal:', err);
    return { success: false, error: err.message };
  }
}
