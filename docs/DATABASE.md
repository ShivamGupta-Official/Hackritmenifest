# ContentOS — Database Schema & Data Models

## 1. Overview & Isolation Architecture

ContentOS uses **MongoDB** as its primary document database engine with **MongoDB Atlas Vector Search** for high-performance semantic vector search.

For local development and zero-friction environments, a local MongoDB instance or `mongodb-memory-server` runs directly in-process. In staging and production, the application connects to a managed MongoDB Atlas cluster via standard `MONGODB_URI`.

Every customer query, background job, and vector search is strictly scoped to an `organizationId`. Cross-tenant data leakage is structurally prevented through index filters and application-level repository access controls.

---

## 2. Core Document Collections

### 2.1 Multi-Tenant & Identity Hierarchy
```javascript
// organizations
{
  _id: ObjectId,
  name: String,
  slug: String,
  plan: String, // 'starter', 'growth', 'agency', 'enterprise'
  settings: Object,
  createdAt: Date,
  updatedAt: Date
}

// users
{
  _id: ObjectId,
  email: String,
  name: String,
  avatarUrl: String,
  createdAt: Date,
  updatedAt: Date
}

// workspaces
{
  _id: ObjectId,
  organizationId: ObjectId, // ref: 'organizations'
  name: String,
  slug: String,
  industry: String,
  businessModel: String,
  createdAt: Date,
  updatedAt: Date
}

// organization_members
{
  _id: ObjectId,
  organizationId: ObjectId,
  userId: ObjectId,
  role: String, // 'owner', 'admin', 'strategist', 'creator', 'viewer'
  createdAt: Date
}
```

### 2.2 Company Brain & Brand Knowledge
```javascript
// brand_profiles
{
  _id: ObjectId,
  organizationId: ObjectId,
  workspaceId: ObjectId,
  brandName: String,
  tagline: String,
  mission: String,
  toneOfVoice: [String],
  positioningStatement: String,
  createdAt: Date,
  updatedAt: Date
}

// brand_rules
{
  _id: ObjectId,
  organizationId: ObjectId,
  workspaceId: ObjectId,
  ruleType: String, // 'forbidden_claim', 'required_disclaimer', 'tone_rule', 'vocabulary'
  ruleContent: String,
  severity: String, // 'strict', 'warning'
  isActive: Boolean,
  createdAt: Date
}

// target_audiences
{
  _id: ObjectId,
  organizationId: ObjectId,
  workspaceId: ObjectId,
  name: String,
  demographics: Object,
  painPoints: [String],
  desires: [String],
  objections: [String],
  level: String, // 'beginner', 'intermediate', 'advanced'
  createdAt: Date
}

// human_instructions
{
  _id: ObjectId,
  organizationId: ObjectId,
  workspaceId: ObjectId,
  authorId: ObjectId,
  instruction: String,
  category: String,
  isActive: Boolean,
  createdAt: Date
}
```

### 2.3 Normalized Content Repository
```javascript
// content_items
{
  _id: ObjectId,
  organizationId: ObjectId,
  workspaceId: ObjectId,
  platform: String,
  contentType: String,
  title: String,
  caption: String,
  body: String,
  transcript: String,
  mediaUrl: String,
  publishedAt: Date,
  author: String,
  
  // Content DNA & Feature Tags
  topic: String,
  subtopic: String,
  format: String,
  hookText: String,
  hookType: String,
  ctaText: String,
  ctaType: String,
  tone: String,
  durationSeconds: Number,
  
  // Deterministic Content Performance Metrics
  metrics: {
    impressions: Number,
    reach: Number,
    views: Number,
    likes: Number,
    comments: Number,
    shares: Number,
    saves: Number,
    clicks: Number,
    conversions: Number,
    revenueCents: Number,
    
    engagementRate: Number,
    saveRate: Number,
    shareRate: Number,
    clickThroughRate: Number,
    conversionRate: Number,
    
    outperformanceMultiplier: Number
  },
  
  analysisStatus: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 2.4 Vector Search & Document Chunks
```javascript
// document_chunks (used with Atlas Vector Search)
{
  _id: ObjectId,
  organizationId: ObjectId,
  workspaceId: ObjectId,
  contentItemId: ObjectId, // Optional ref
  
  chunkType: String,
  chunkText: String,
  metadata: Object,
  
  embedding: [Number], // Array of floats (e.g. 768 dimensions)
  createdAt: Date
}
// Atlas Vector Search Index definition required for `embedding` field.
```

### 2.5 Trends, Gaps & Opportunity Scores
```javascript
// trends
{
  _id: ObjectId,
  topic: String,
  industry: String,
  source: String,
  detectedAt: Date,
  
  searchVolume: Number,
  growthVelocityPct: Number,
  sentimentScore: Number,
  commercialIntentScore: Number,
  confidencePct: Number
}

// opportunity_scores
{
  _id: ObjectId,
  organizationId: ObjectId,
  workspaceId: ObjectId,
  trendId: ObjectId,
  
  topic: String,
  recommendedFormat: String,
  
  opportunityScore: Number,
  trendMomentumWeight: Number,
  audienceRelevanceWeight: Number,
  brandRelevanceWeight: Number,
  historicalWinRateWeight: Number,
  competitionWhitespaceWeight: Number,
  
  whyExplanation: String,
  supportingEvidence: Object,
  status: String,
  createdAt: Date
}
```

### 2.6 Campaign & Funnel Intelligence
```javascript
// campaigns
{
  _id: ObjectId,
  organizationId: ObjectId,
  workspaceId: ObjectId,
  name: String,
  platform: String,
  objective: String,
  budgetCents: Number,
  status: String,
  createdAt: Date
}

// ad_creatives
{
  _id: ObjectId,
  campaignId: ObjectId,
  organizationId: ObjectId,
  headline: String,
  hookText: String,
  ctaText: String,
  landingPageUrl: String,
  mediaUrl: String,
  
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
  diagnosisReason: String
}
```

### 2.7 Generated Content & Provenance Lineage
```javascript
// generated_assets
{
  _id: ObjectId,
  organizationId: ObjectId,
  workspaceId: ObjectId,
  opportunityId: ObjectId,
  
  assetType: String,
  title: String,
  contentDraft: Object,
  
  // Authenticity & Origin Analysis
  originAnalysis: {
    aiOriginLikelihood: Number,
    confidenceTier: String,
    originClassification: String,
    linguisticSignals: Object
  },
  
  // Genuine Workflow Provenance
  workflowSteps: [{
    step: String,
    actor: String,
    timestamp: Date,
    notes: String
  }],
  
  approvalStatus: String,
  approvedById: ObjectId,
  createdAt: Date
}

// audit_logs
{
  _id: ObjectId,
  organizationId: ObjectId,
  userId: ObjectId,
  action: String,
  entityType: String,
  entityId: ObjectId,
  details: Object,
  ipAddress: String,
  createdAt: Date
}
```
