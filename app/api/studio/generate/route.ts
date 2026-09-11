import { NextResponse } from 'next/server';
import { runContentStrategistLoop } from '@/lib/agents/strategist';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orgId = body.orgId || 'org_example_fitness';
    const opportunityId = body.opportunityId;
    const assetType = body.assetType || 'reel_script';
    const topic = body.topic;
    const actorName = body.actorName || 'User';

    const asset = await runContentStrategistLoop({
      orgId,
      opportunityId,
      assetType,
      topic,
      actorName,
    });

    return NextResponse.json({ success: true, asset });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Generation failed' },
      { status: 500 }
    );
  }
}
