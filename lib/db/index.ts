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
  DocumentChunk,
  ConnectedAccount,
  RawScrapedSnapshot
} from './schema';

let mongod: MongoMemoryServer | null = null;
let isConnected = false;

/**
 * Connects to MongoDB Atlas (if MONGODB_URI is provided) or falls back
 * to an in-memory MongoDB instance for local zero-friction development.
 */
export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;

  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 2500,
        connectTimeoutMS: 2500
      });
      console.log('Connected to MongoDB Atlas');
      isConnected = true;
      return;
    } catch (atlasErr: any) {
      console.warn('[connectDB] MongoDB Atlas unavailable (IP whitelist or network). Seamlessly falling back to In-Memory MongoDB:', atlasErr.message);
    }
  }

  // Fallback to in-memory server for instant local zero-friction execution
  if (!mongod) {
    mongod = await MongoMemoryServer.create();
  }
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  console.log('Connected to In-Memory MongoDB');
  
  // Auto-seed for development
  await seedDevDatabase();
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
  async connect() {
    return connectDB();
  }

  private async ensureConnected() {
    await connectDB();
  }
  
  // Organization & Workspace
  async getOrganization(orgId: string) {
    await this.ensureConnected();
    return Organization.findById(orgId);
  }

  async getWorkspace(orgId: string) {
    await this.ensureConnected();
    return Workspace.findOne({ organizationId: orgId });
  }

  // Company Brain
  async getBrandProfile(orgId: string) {
    await this.ensureConnected();
    return BrandProfile.findOne({ organizationId: orgId });
  }

  async updateBrandProfile(orgId: string, updates: any) {
    await this.ensureConnected();
    return BrandProfile.findOneAndUpdate({ organizationId: orgId }, updates, { new: true });
  }

  async getBrandRules(orgId: string) {
    await this.ensureConnected();
    return BrandRule.find({ organizationId: orgId });
  }

  async addBrandRule(orgId: string, workspaceId: string, rule: any) {
    await this.ensureConnected();
    return BrandRule.create({ ...rule, organizationId: orgId, workspaceId });
  }

  async getTargetAudiences(orgId: string) {
    await this.ensureConnected();
    return TargetAudience.find({ organizationId: orgId });
  }

  async getHumanInstructions(orgId: string) {
    await this.ensureConnected();
    return HumanInstruction.find({ organizationId: orgId }).sort({ createdAt: -1 });
  }

  async addHumanInstruction(orgId: string, instructionText: string, author: string) {
    await this.ensureConnected();
    return HumanInstruction.create({ organizationId: orgId, author, instruction: instructionText });
  }

  // Content Repository
  async getContentItems(orgId: string, filter?: { platform?: string; format?: string }) {
    await this.ensureConnected();
    const query: any = { organizationId: orgId };
    if (filter?.platform && filter.platform !== 'all') query.platform = filter.platform;
    if (filter?.format && filter.format !== 'all') query.format = filter.format;
    
    return ContentItem.find(query).sort({ publishedAt: -1 });
  }

  async addContentItem(item: any) {
    await this.ensureConnected();
    return ContentItem.create(item);
  }

  // Trends & Opportunities
  async getTrends() {
    await this.ensureConnected();
    return TrendSignal.find().sort({ detectedAt: -1 });
  }

  async getOpportunities(orgId: string) {
    await this.ensureConnected();
    return OpportunityScorecard.find({ organizationId: orgId }).sort({ opportunityScore: -1 });
  }

  async updateOpportunityStatus(id: string, status: string) {
    await this.ensureConnected();
    return OpportunityScorecard.findByIdAndUpdate(id, { status }, { new: true });
  }

  // Campaigns
  async getCampaigns(orgId: string) {
    await this.ensureConnected();
    return CampaignData.find({ organizationId: orgId });
  }

  // Generated Assets & Studio
  async getGeneratedAssets(orgId: string) {
    await this.ensureConnected();
    return GeneratedAsset.find({ organizationId: orgId }).sort({ createdAt: -1 });
  }

  async saveGeneratedAsset(asset: any) {
    await this.ensureConnected();
    const assetId = asset.id || (typeof asset._id === 'string' && !asset._id.startsWith('asset_') ? asset._id : undefined);
    
    if (assetId && mongoose.isValidObjectId(assetId)) {
      return GeneratedAsset.findByIdAndUpdate(assetId, asset, { new: true, upsert: true });
    }
    
    const toSave = { ...asset };
    if (toSave._id && !mongoose.isValidObjectId(toSave._id)) {
      if (!toSave.id) toSave.id = toSave._id;
      delete toSave._id;
    }
    return GeneratedAsset.create(toSave);
  }

  // Connected Accounts
  async getConnectedAccounts(orgId: string) {
    await this.ensureConnected();
    return ConnectedAccount.find({ organizationId: orgId });
  }

  async saveConnectedAccount(account: any) {
    await this.ensureConnected();
    if (account._id || account.id) {
      return ConnectedAccount.findByIdAndUpdate(account._id || account.id, account, { new: true });
    }
    return ConnectedAccount.create(account);
  }

  // Raw Scraped Snapshots
  async saveRawSnapshot(snapshot: any) {
    await this.ensureConnected();
    return RawScrapedSnapshot.create(snapshot);
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
    organizationId: 'org_example_fitness',
    name: 'Acme Content Studio',
    slug: 'acme-content-studio',
    industry: 'Health & Fitness'
  });

  await BrandProfile.create({
    organizationId: 'org_example_fitness',
    workspaceId: workspace._id,
    brandName: 'Acme Fitness',
    toneOfVoice: ['motivational', 'scientific']
  });

  await BrandRule.create({
    organizationId: 'org_example_fitness',
    workspaceId: workspace._id,
    ruleType: 'forbidden_claim',
    content: 'Guaranteed 10kg weight loss in 7 days',
    severity: 'strict',
    isActive: true
  });
  
  console.log('Development database seeded with initial Organization, Workspace & BrandProfile');
}

// Export the singleton DB repository instance
export const db = new ContentOSDatabase();

// Re-export models for convenience
export * from './schema';
