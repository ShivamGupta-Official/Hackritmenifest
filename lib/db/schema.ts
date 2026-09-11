import mongoose, { Schema, Document } from 'mongoose';

// Organization
export interface IOrganization extends Document {
  name: string;
  slug: string;
  plan: 'starter' | 'growth' | 'agency' | 'enterprise';
  createdAt: Date;
}
const OrganizationSchema = new Schema<IOrganization>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  plan: { type: String, enum: ['starter', 'growth', 'agency', 'enterprise'], default: 'growth' },
  createdAt: { type: Date, default: Date.now }
});

// Workspace
export interface IWorkspace extends Document {
  organizationId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  industry?: string;
  businessModel?: string;
  createdAt: Date;
}
const WorkspaceSchema = new Schema<IWorkspace>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  industry: String,
  businessModel: String,
  createdAt: { type: Date, default: Date.now }
});

// BrandProfile
export interface IBrandProfile extends Document {
  organizationId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  brandName: string;
  tagline?: string;
  mission?: string;
  toneOfVoice: string[];
  positioning?: string;
}
const BrandProfileSchema = new Schema<IBrandProfile>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
  brandName: { type: String, required: true },
  tagline: String,
  mission: String,
  toneOfVoice: [String],
  positioning: String
});

// BrandRule
export interface IBrandRule extends Document {
  organizationId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  ruleType: 'forbidden_claim' | 'required_disclaimer' | 'tone_rule' | 'vocabulary';
  content: string;
  severity: 'strict' | 'warning';
  isActive: boolean;
}
const BrandRuleSchema = new Schema<IBrandRule>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
  ruleType: { type: String, enum: ['forbidden_claim', 'required_disclaimer', 'tone_rule', 'vocabulary'], required: true },
  content: { type: String, required: true },
  severity: { type: String, enum: ['strict', 'warning'], default: 'strict' },
  isActive: { type: Boolean, default: true }
});

// TargetAudience
export interface ITargetAudience extends Document {
  organizationId: mongoose.Types.ObjectId;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  painPoints: string[];
  desires: string[];
  objections: string[];
}
const TargetAudienceSchema = new Schema<ITargetAudience>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  painPoints: [String],
  desires: [String],
  objections: [String]
});

// HumanInstruction
export interface IHumanInstruction extends Document {
  organizationId: mongoose.Types.ObjectId;
  author: string;
  instruction: string;
  category: 'strategy' | 'creative' | 'safety';
  createdAt: Date;
}
const HumanInstructionSchema = new Schema<IHumanInstruction>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  author: { type: String, required: true },
  instruction: { type: String, required: true },
  category: { type: String, enum: ['strategy', 'creative', 'safety'], default: 'strategy' },
  createdAt: { type: Date, default: Date.now }
});

// ContentItem
export interface IContentItem extends Document {
  organizationId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  platform: 'instagram' | 'youtube' | 'blog' | 'linkedin' | 'tiktok';
  contentType: 'reel' | 'post' | 'blog' | 'carousel';
  title: string;
  caption: string;
  transcript?: string;
  publishedAt: Date;
  topic: string;
  subtopic: string;
  format: string;
  hookText: string;
  hookType: string;
  ctaText: string;
  ctaType: string;
  tone: string;
  durationSeconds: number;
  impressions: number;
  reach: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
  conversions: number;
  revenueCents: number;
  engagementRate: number;
  saveRate: number;
  ctr: number;
  outperformanceMultiplier: number;
}
const ContentItemSchema = new Schema<IContentItem>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
  platform: { type: String, required: true },
  contentType: { type: String, required: true },
  title: String,
  caption: String,
  transcript: String,
  publishedAt: Date,
  topic: String,
  subtopic: String,
  format: String,
  hookText: String,
  hookType: String,
  ctaText: String,
  ctaType: String,
  tone: String,
  durationSeconds: Number,
  impressions: { type: Number, default: 0 },
  reach: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  revenueCents: { type: Number, default: 0 },
  engagementRate: { type: Number, default: 0 },
  saveRate: { type: Number, default: 0 },
  ctr: { type: Number, default: 0 },
  outperformanceMultiplier: { type: Number, default: 1 }
});

// ContentDNASummary
export interface IContentDNASummary extends Document {
  dimension: 'hook' | 'format' | 'duration' | 'topic' | 'tone';
  name: string;
  sampleSize: number;
  medianEngagementRate: number;
  outperformanceMultiplier: number;
  confidence: 'high' | 'medium' | 'low';
  isWinningPattern: boolean;
}
const ContentDNASummarySchema = new Schema<IContentDNASummary>({
  dimension: { type: String, required: true },
  name: { type: String, required: true },
  sampleSize: Number,
  medianEngagementRate: Number,
  outperformanceMultiplier: Number,
  confidence: { type: String, enum: ['high', 'medium', 'low'] },
  isWinningPattern: Boolean
});

// TrendSignal
export interface ITrendSignal extends Document {
  topic: string;
  industry: string;
  source: string;
  velocityPct: number;
  volumeTier: 'high' | 'medium' | 'rising_niche';
  sentimentScore: number;
  commercialIntent: number;
  detectedAt: Date;
}
const TrendSignalSchema = new Schema<ITrendSignal>({
  topic: { type: String, required: true },
  industry: String,
  source: String,
  velocityPct: Number,
  volumeTier: String,
  sentimentScore: Number,
  commercialIntent: Number,
  detectedAt: { type: Date, default: Date.now }
});

// OpportunityScorecard
export interface IOpportunityScorecard extends Document {
  organizationId: mongoose.Types.ObjectId;
  trendTopic: string;
  recommendedFormat: string;
  opportunityScore: number;
  momentumWeight: number;
  audienceRelevanceWeight: number;
  brandRelevanceWeight: number;
  historicalWinRateWeight: number;
  whitespaceWeight: number;
  whyExplanation: string;
  evidence: {
    similarPostsCount: number;
    medianOutperformance: number;
    audienceQuestionsVolume: string;
    competitorCoverage: string;
  };
  status: 'active' | 'in_progress' | 'published' | 'dismissed';
}
const OpportunityScorecardSchema = new Schema<IOpportunityScorecard>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  trendTopic: String,
  recommendedFormat: String,
  opportunityScore: Number,
  momentumWeight: Number,
  audienceRelevanceWeight: Number,
  brandRelevanceWeight: Number,
  historicalWinRateWeight: Number,
  whitespaceWeight: Number,
  whyExplanation: String,
  evidence: Object,
  status: { type: String, enum: ['active', 'in_progress', 'published', 'dismissed'], default: 'active' }
});

// CampaignData
export interface ICampaignData extends Document {
  organizationId: mongoose.Types.ObjectId;
  name: string;
  platform: 'meta_ads' | 'google_ads';
  spendCents: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenueCents: number;
  ctr: number;
  cpcCents: number;
  cpaCents: number;
  roas: number;
  bottleneck: 'healthy' | 'creative_problem' | 'landing_page_problem' | 'audience_problem';
  diagnosisReason: string;
  actionRecommendation: string;
}
const CampaignDataSchema = new Schema<ICampaignData>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  name: String,
  platform: String,
  spendCents: Number,
  impressions: Number,
  clicks: Number,
  conversions: Number,
  revenueCents: Number,
  ctr: Number,
  cpcCents: Number,
  cpaCents: Number,
  roas: Number,
  bottleneck: String,
  diagnosisReason: String,
  actionRecommendation: String
});

// GeneratedAsset
export interface IGeneratedAsset extends Document {
  organizationId: mongoose.Types.ObjectId;
  opportunityId?: mongoose.Types.ObjectId;
  assetType: 'reel_script' | 'blog_brief' | 'carousel' | 'ad_variant';
  title: string;
  brief: {
    objective: string;
    targetAudience: string;
    hookHeadline: string;
    hookVisualCue: string;
    bodyPoints: string[];
    callToAction: string;
    groundingDNAEvidence: string;
  };
  aiOriginLikelihood: number;
  confidenceTier: 'high' | 'medium' | 'low';
  originClassification: 'mostly_human' | 'human_ai_assisted' | 'mostly_ai';
  linguisticSignals: {
    perplexityScore: number;
    burstinessScore: number;
    repetitivePhrasing: boolean;
  };
  workflowSteps: Array<{
    step: 'human_prompt' | 'ai_draft' | 'human_edit' | 'critic_review' | 'approval';
    timestamp: Date;
    actor: string;
    notes?: string;
  }>;
  status: 'draft' | 'in_review' | 'approved' | 'published';
  createdAt: Date;
}
const GeneratedAssetSchema = new Schema<IGeneratedAsset>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  opportunityId: { type: Schema.Types.ObjectId, ref: 'OpportunityScorecard' },
  assetType: String,
  title: String,
  brief: Object,
  aiOriginLikelihood: Number,
  confidenceTier: String,
  originClassification: String,
  linguisticSignals: Object,
  workflowSteps: [Object],
  status: { type: String, enum: ['draft', 'in_review', 'approved', 'published'], default: 'draft' },
  createdAt: { type: Date, default: Date.now }
});

// DocumentChunk (for Vector Search)
export interface IDocumentChunk extends Document {
  organizationId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  contentItemId?: mongoose.Types.ObjectId;
  chunkType: string;
  chunkText: string;
  metadata: any;
  embedding: number[];
  createdAt: Date;
}
const DocumentChunkSchema = new Schema<IDocumentChunk>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
  contentItemId: { type: Schema.Types.ObjectId, ref: 'ContentItem' },
  chunkType: String,
  chunkText: String,
  metadata: Object,
  embedding: { type: [Number], required: true }, // For Atlas Vector Search
  createdAt: { type: Date, default: Date.now }
});

// Export Models
export const Organization = mongoose.models.Organization || mongoose.model<IOrganization>('Organization', OrganizationSchema);
export const Workspace = mongoose.models.Workspace || mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);
export const BrandProfile = mongoose.models.BrandProfile || mongoose.model<IBrandProfile>('BrandProfile', BrandProfileSchema);
export const BrandRule = mongoose.models.BrandRule || mongoose.model<IBrandRule>('BrandRule', BrandRuleSchema);
export const TargetAudience = mongoose.models.TargetAudience || mongoose.model<ITargetAudience>('TargetAudience', TargetAudienceSchema);
export const HumanInstruction = mongoose.models.HumanInstruction || mongoose.model<IHumanInstruction>('HumanInstruction', HumanInstructionSchema);
export const ContentItem = mongoose.models.ContentItem || mongoose.model<IContentItem>('ContentItem', ContentItemSchema);
export const ContentDNASummary = mongoose.models.ContentDNASummary || mongoose.model<IContentDNASummary>('ContentDNASummary', ContentDNASummarySchema);
export const TrendSignal = mongoose.models.TrendSignal || mongoose.model<ITrendSignal>('TrendSignal', TrendSignalSchema);
export const OpportunityScorecard = mongoose.models.OpportunityScorecard || mongoose.model<IOpportunityScorecard>('OpportunityScorecard', OpportunityScorecardSchema);
export const CampaignData = mongoose.models.CampaignData || mongoose.model<ICampaignData>('CampaignData', CampaignDataSchema);
export const GeneratedAsset = mongoose.models.GeneratedAsset || mongoose.model<IGeneratedAsset>('GeneratedAsset', GeneratedAssetSchema);
export const DocumentChunk = mongoose.models.DocumentChunk || mongoose.model<IDocumentChunk>('DocumentChunk', DocumentChunkSchema);
