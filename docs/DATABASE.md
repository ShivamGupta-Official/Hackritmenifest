# ContentOS — Database Schema & Data Models

## 1. Overview & Isolation Architecture

ContentOS uses **PostgreSQL** as its primary relational engine with the **`pgvector`** extension for high-performance semantic vector search.

For local development and zero-friction environments, `@electric-sql/pglite` (WebAssembly-embedded PostgreSQL with pgvector) runs directly in-process. In staging and production, the application connects to a managed PostgreSQL cluster (Neon, Supabase, AWS RDS, Railway) via standard `DATABASE_URL`.

Every customer query, background job, and vector search is strictly scoped to an `organization_id`. Cross-tenant data leakage is mathematically prevented.

---

## 2. Core Relational Tables

### 2.1 Multi-Tenant & Identity Hierarchy
```sql
-- Organizations (Tenants)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    plan VARCHAR(50) DEFAULT 'growth', -- starter, growth, agency, enterprise
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workspaces (Organizations can have multiple client workspaces)
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    industry VARCHAR(100),
    business_model VARCHAR(100), -- D2C, B2B, Agency, Creator
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, slug)
);

-- Organization Memberships & RBAC
CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'member', -- owner, admin, strategist, creator, viewer
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);
```

### 2.2 Company Brain & Brand Knowledge
```sql
-- Brand Identity & Positioning
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    brand_name VARCHAR(255) NOT NULL,
    tagline TEXT,
    mission TEXT,
    tone_of_voice TEXT[], -- e.g. ['authoritative', 'empathetic', 'scientific']
    positioning_statement TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brand Guardrails & Rules
CREATE TABLE brand_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    rule_type VARCHAR(50) NOT NULL, -- 'forbidden_claim', 'required_disclaimer', 'tone_rule', 'vocabulary'
    rule_content TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'strict', -- 'strict', 'warning'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Target Audiences & Personas
CREATE TABLE audiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    demographics JSONB,
    pain_points TEXT[],
    desires TEXT[],
    objections TEXT[],
    level VARCHAR(50) DEFAULT 'beginner', -- beginner, intermediate, advanced
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products & Services
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_cents INTEGER,
    value_props TEXT[],
    target_audience_ids UUID[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Human Instructions & Strategic Directives
CREATE TABLE human_instructions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id),
    instruction TEXT NOT NULL, -- e.g. "Never use aggressive urgency tactics. Emphasize recovery."
    category VARCHAR(100) DEFAULT 'strategy',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.3 Normalized Content Repository
```sql
-- Unified Content Items
CREATE TABLE content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- 'instagram', 'youtube', 'blog', 'linkedin', 'tiktok', 'x'
    content_type VARCHAR(50) NOT NULL, -- 'reel', 'post', 'blog', 'carousel', 'story'
    title TEXT,
    caption TEXT,
    body TEXT,
    transcript TEXT,
    media_url TEXT,
    published_at TIMESTAMPTZ,
    author VARCHAR(255),
    
    -- Content DNA & Feature Tags
    topic VARCHAR(100),
    subtopic VARCHAR(100),
    format VARCHAR(100), -- 'founder_talking_head', 'how_to_screen', 'before_after', 'listicle'
    hook_text TEXT,
    hook_type VARCHAR(100), -- 'problem_first', 'curiosity_gap', 'contrarian', 'statistic'
    cta_text TEXT,
    cta_type VARCHAR(100), -- 'soft_educational', 'hard_conversion', 'engagement_question'
    tone VARCHAR(100),
    duration_seconds INTEGER,
    
    -- Analysis & Lifecycle
    analysis_status VARCHAR(50) DEFAULT 'pending', -- pending, analyzed, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deterministic Content Performance Metrics
CREATE TABLE content_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id UUID NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Primary Signals
    impressions BIGINT DEFAULT 0,
    reach BIGINT DEFAULT 0,
    views BIGINT DEFAULT 0,
    likes BIGINT DEFAULT 0,
    comments BIGINT DEFAULT 0,
    shares BIGINT DEFAULT 0,
    saves BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    conversions BIGINT DEFAULT 0,
    revenue_cents BIGINT DEFAULT 0,
    
    -- Computed Rates (strictly calculated by deterministic math functions)
    engagement_rate NUMERIC(6, 4) DEFAULT 0.0000,
    save_rate NUMERIC(6, 4) DEFAULT 0.0000,
    share_rate NUMERIC(6, 4) DEFAULT 0.0000,
    click_through_rate NUMERIC(6, 4) DEFAULT 0.0000,
    conversion_rate NUMERIC(6, 4) DEFAULT 0.0000,
    
    -- DNA Outperformance Factor (vs median baseline)
    outperformance_multiplier NUMERIC(6, 2) DEFAULT 1.00,
    
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.4 Vector Search & Document Chunks (pgvector)
```sql
CREATE EXTENSION IF NOT EXISTS vector;

-- Knowledge Chunks & Embeddings (for Hybrid RAG)
CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    
    chunk_type VARCHAR(50) NOT NULL, -- 'brand_rule', 'content_transcript', 'blog_body', 'customer_qa'
    chunk_text TEXT NOT NULL,
    metadata JSONB DEFAULT '{}', -- platform, topic, performance_band, published_year
    
    embedding vector(768), -- compatible with Gemini text-embedding-004 / 3-small (configurable)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Multi-Tenant Vector Index
CREATE INDEX idx_document_chunks_org_type ON document_chunks(organization_id, chunk_type);
CREATE INDEX idx_document_chunks_vector ON document_chunks USING hnsw (embedding vector_cosine_ops);
```

### 2.5 Trends, Gaps & Opportunity Scores
```sql
CREATE TABLE trends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL, -- 'google_search', 'industry_news', 'social_signal'
    detected_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Deterministic Signal Metrics
    search_volume BIGINT DEFAULT 0,
    growth_velocity_pct NUMERIC(6, 2) DEFAULT 0.0,
    sentiment_score NUMERIC(4, 2) DEFAULT 0.0,
    commercial_intent_score NUMERIC(4, 2) DEFAULT 0.0,
    confidence_pct NUMERIC(5, 2) DEFAULT 0.0
);

CREATE TABLE opportunity_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    trend_id UUID REFERENCES trends(id) ON DELETE CASCADE,
    
    topic VARCHAR(255) NOT NULL,
    recommended_format VARCHAR(100) NOT NULL,
    
    -- The Opportunity Formula (0 - 100)
    opportunity_score NUMERIC(5, 2) NOT NULL,
    trend_momentum_weight NUMERIC(4, 2) NOT NULL,
    audience_relevance_weight NUMERIC(4, 2) NOT NULL,
    brand_relevance_weight NUMERIC(4, 2) NOT NULL,
    historical_win_rate_weight NUMERIC(4, 2) NOT NULL,
    competition_whitespace_weight NUMERIC(4, 2) NOT NULL,
    
    why_explanation TEXT NOT NULL,
    supporting_evidence JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- active, accepted, rejected, archived
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.6 Campaign & Funnel Intelligence
```sql
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL, -- 'meta_ads', 'google_ads', 'linkedin_ads'
    objective VARCHAR(100) NOT NULL, -- 'conversions', 'lead_generation', 'traffic'
    budget_cents BIGINT NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ad_creatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    headline TEXT NOT NULL,
    hook_text TEXT,
    cta_text TEXT,
    landing_page_url TEXT,
    media_url TEXT,
    
    spend_cents BIGINT DEFAULT 0,
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    conversions BIGINT DEFAULT 0,
    revenue_cents BIGINT DEFAULT 0,
    
    -- Calculated
    ctr NUMERIC(6, 4) DEFAULT 0.0000,
    cpc_cents INTEGER DEFAULT 0,
    cpa_cents INTEGER DEFAULT 0,
    roas NUMERIC(6, 2) DEFAULT 0.00,
    
    -- Diagnosis
    bottleneck VARCHAR(100), -- 'creative_problem', 'landing_page_problem', 'audience_problem', 'healthy'
    diagnosis_reason TEXT
);
```

### 2.7 Generated Content & Provenance Lineage
```sql
CREATE TABLE generated_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunity_scores(id),
    
    asset_type VARCHAR(50) NOT NULL, -- 'reel_script', 'blog_brief', 'carousel', 'ad_variant'
    title VARCHAR(255) NOT NULL,
    content_draft JSONB NOT NULL,
    
    -- Authenticity & Origin Analysis
    ai_origin_likelihood NUMERIC(5, 2), -- 0 - 100%
    confidence_tier VARCHAR(50), -- 'high', 'medium', 'low'
    origin_classification VARCHAR(100), -- 'mostly_human', 'human_ai_assisted', 'mostly_ai'
    linguistic_signals JSONB,
    
    -- Genuine Workflow Provenance
    workflow_steps JSONB DEFAULT '[]', -- [{step: 'human_idea', ts: '...'}, {step: 'ai_draft'}, {step: 'human_edit'}]
    approval_status VARCHAR(50) DEFAULT 'draft', -- draft, in_review, approved, published
    approved_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```
