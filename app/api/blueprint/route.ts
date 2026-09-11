import { NextRequest, NextResponse } from 'next/server';
import { generateGrowthBlueprint, UserBrandInput } from '@/lib/intelligence/blueprint';
import { SocialAdapterFactory } from '@/lib/ingestion/adapters';
import { SwarmOrchestrator } from '@/lib/ai/agent-swarm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { competitorUrl, competitorHandle, competitorPosts, brandInput } = body;

    if (!brandInput || !brandInput.brandName) {
      return NextResponse.json(
        { success: false, error: 'Please provide your brand name and essential details.' },
        { status: 400 }
      );
    }

    let posts = competitorPosts || [];
    let handle = competitorHandle || 'inspiration';

    // If posts weren't passed directly, fetch them using adapter
    if ((!posts || posts.length === 0) && competitorUrl) {
      const limit = body.limit ? parseInt(String(body.limit), 10) : 12;
      const { adapter } = SocialAdapterFactory.getAdapterForUrl(competitorUrl);
      handle = adapter.extractAccountHandle(competitorUrl) || handle;
      posts = await adapter.extractPublicPosts(competitorUrl, limit);
    }

    // Try Multi-Model AI Swarm first for deep reasoning synthesis
    try {
      const swarmResult = await SwarmOrchestrator.runFullIntelligenceLoop(
        { handle },
        posts.map((p: any) => ({
          title: p.title || p.caption?.slice(0, 60) || 'Observed Reel',
          hookText: p.hookText || p.title,
          format: p.format,
          topic: p.topic
        })),
        {
          brandName: brandInput.brandName,
          industry: brandInput.industry || 'Technology & D2C',
          icp: brandInput.targetAudience || (brandInput as any).icp || 'Active consumers and decision makers',
          valueProp: brandInput.valueProposition || (brandInput as any).valueProp || 'Delivering premium transformative value',
          product: brandInput.primaryProduct || (brandInput as any).product || brandInput.brandName,
          toneOfVoice: Array.isArray(brandInput.toneOfVoice) ? brandInput.toneOfVoice : [brandInput.toneOfVoice || 'authoritative']
        }
      );

      if (swarmResult && swarmResult.blueprint) {
        return NextResponse.json({
          success: true,
          blueprint: swarmResult.blueprint,
          swarmSummary: swarmResult.swarmSummary,
          audits: swarmResult.audits
        });
      }
    } catch (swarmErr) {
      console.warn('Swarm orchestrator error, using deterministic blueprint:', swarmErr);
    }

    const blueprint = generateGrowthBlueprint(posts, brandInput as UserBrandInput, handle);

    return NextResponse.json({
      success: true,
      blueprint
    });
  } catch (error: any) {
    console.error('Error generating growth blueprint:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to synthesize growth blueprint.' },
      { status: 500 }
    );
  }
}
