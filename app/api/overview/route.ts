import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { analyzeContentDNA } from '@/lib/intelligence/content-dna';

export async function GET(req: Request) {
  try {
    const orgId = 'org_example_fitness';
    const org = await db.getOrganization(orgId);
    const brand = await db.getBrandProfile(orgId);
    const rules = await db.getBrandRules(orgId);
    const audiences = await db.getTargetAudiences(orgId);
    const instructions = await db.getHumanInstructions(orgId);
    const items = await db.getContentItems(orgId);
    const dna = analyzeContentDNA(items);
    const trends = await db.getTrends();
    const opportunities = await db.getOpportunities(orgId);
    const campaigns = await db.getCampaigns(orgId);
    const assets = await db.getGeneratedAssets(orgId);

    // Calculate aggregated high-level KPIs
    const totalImpressions = items.reduce((sum, i) => sum + i.impressions, 0);
    const totalConversions = items.reduce((sum, i) => sum + i.conversions, 0);
    const totalRevenueCents = items.reduce((sum, i) => sum + i.revenueCents, 0) + campaigns.reduce((sum, c) => sum + c.revenueCents, 0);
    const totalAdSpendCents = campaigns.reduce((sum, c) => sum + c.spendCents, 0);

    return NextResponse.json({
      success: true,
      organization: org,
      brand,
      rules,
      audiences,
      instructions,
      kpis: {
        totalContentPieces: items.length,
        totalImpressions,
        totalConversions,
        totalRevenueFormatted: `$${(totalRevenueCents / 100).toLocaleString()}`,
        totalAdSpendFormatted: `$${(totalAdSpendCents / 100).toLocaleString()}`,
        overallROAS: totalAdSpendCents > 0 ? (totalRevenueCents / totalAdSpendCents).toFixed(2) : 'N/A',
        contentHealthScore: dna.contentHealthScore,
        baselineMedianEngagement: dna.baselineMedianEngagement,
      },
      contentDNA: dna,
      recentContent: items.slice(0, 10),
      trends,
      opportunities,
      campaigns,
      assets,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch overview data' },
      { status: 500 }
    );
  }
}
