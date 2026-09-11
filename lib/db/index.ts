import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import {
  Organization,
  Workspace,
  BrandProfile,
  BrandRule,
  TargetAudience,
  HumanInstruction,
  ContentItem,
  TrendSignal,
  OpportunityScorecard,
  CampaignData,
  GeneratedAsset,
  DocumentChunk
} from './schema';

let mongod: MongoMemoryServer | null = null;
let isConnected = false;

/**
 * Connects to MongoDB Atlas (if MONGODB_URI is provided) or falls back
 * to an in-memory MongoDB instance for local zero-friction development.
 */
export async function connectDB() {
  if (isConnected) return;

  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
  } else {
    // Fallback to in-memory server for instant dev setup without running Docker/Mongo
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('Connected to In-Memory MongoDB');
    
    // Auto-seed for development
    await seedDevDatabase();
  }
  
  isConnected = true;
}

export async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
    isConnected = false;
  }
}

/**
 * Basic Data Access Repository for ContentOS
 * Provides tenant-isolated access to MongoDB collections.
 */
class ContentOSDatabase {
  
  // Organization & Workspace
  async getOrganization(orgId: string) {
    return Organization.findById(orgId);
  }

  async getWorkspace(orgId: string) {
    return Workspace.findOne({ organizationId: orgId });
  }

  // Company Brain
  async getBrandProfile(orgId: string) {
    return BrandProfile.findOne({ organizationId: orgId });
  }

  async updateBrandProfile(orgId: string, updates: any) {
    return BrandProfile.findOneAndUpdate({ organizationId: orgId }, updates, { new: true });
  }

  async getBrandRules(orgId: string) {
    return BrandRule.find({ organizationId: orgId });
  }

  async addBrandRule(orgId: string, workspaceId: string, rule: any) {
    return BrandRule.create({ ...rule, organizationId: orgId, workspaceId });
  }

  async getTargetAudiences(orgId: string) {
    return TargetAudience.find({ organizationId: orgId });
  }

  async getHumanInstructions(orgId: string) {
    return HumanInstruction.find({ organizationId: orgId }).sort({ createdAt: -1 });
  }

  async addHumanInstruction(orgId: string, instructionText: string, author: string) {
    return HumanInstruction.create({ organizationId: orgId, author, instruction: instructionText });
  }

  // Content Repository
  async getContentItems(orgId: string, filter?: { platform?: string; format?: string }) {
    const query: any = { organizationId: orgId };
    if (filter?.platform && filter.platform !== 'all') query.platform = filter.platform;
    if (filter?.format && filter.format !== 'all') query.format = filter.format;
    
    return ContentItem.find(query).sort({ publishedAt: -1 });
  }

  async addContentItem(item: any) {
    return ContentItem.create(item);
  }

  // Trends & Opportunities
  async getTrends() {
    return TrendSignal.find().sort({ detectedAt: -1 });
  }

  async getOpportunities(orgId: string) {
    return OpportunityScorecard.find({ organizationId: orgId }).sort({ opportunityScore: -1 });
  }

  async updateOpportunityStatus(id: string, status: string) {
    return OpportunityScorecard.findByIdAndUpdate(id, { status }, { new: true });
  }

  // Campaigns
  async getCampaigns(orgId: string) {
    return CampaignData.find({ organizationId: orgId });
  }

  // Generated Assets & Studio
  async getGeneratedAssets(orgId: string) {
    return GeneratedAsset.find({ organizationId: orgId }).sort({ createdAt: -1 });
  }

  async saveGeneratedAsset(asset: any) {
    if (asset._id || asset.id) {
      return GeneratedAsset.findByIdAndUpdate(asset._id || asset.id, asset, { new: true });
    }
    return GeneratedAsset.create(asset);
  }
}

// Development Seed Function
async function seedDevDatabase() {
  const orgCount = await Organization.countDocuments();
  if (orgCount > 0) return; // Already seeded

  const org = await Organization.create({
    name: 'Acme Fitness',
    slug: 'acme-fitness',
    plan: 'growth'
  });

  const workspace = await Workspace.create({
    organizationId: org._id,
    name: 'Acme Content Studio',
    slug: 'acme-content-studio',
    industry: 'Health & Fitness'
  });

  await BrandProfile.create({
    organizationId: org._id,
    workspaceId: workspace._id,
    brandName: 'Acme Fitness',
    toneOfVoice: ['motivational', 'scientific']
  });
  
  console.log('Development database seeded with mock Organization & Workspace');
}

// Export the singleton DB repository instance
export const db = new ContentOSDatabase();

// Re-export models for convenience
export * from './schema';
