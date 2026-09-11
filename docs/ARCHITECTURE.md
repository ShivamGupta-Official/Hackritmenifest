# ContentOS — Architecture Specification

## 1. System Overview

ContentOS is an AI-powered Content & Growth Intelligence Operating System designed for multi-tenant SaaS. It operates on a continuous feedback loop:

```
OBSERVE → UNDERSTAND → ANALYZE → DETECT → RECOMMEND → CREATE → APPROVE → PUBLISH → MEASURE → LEARN → REPEAT
```

The system differentiates itself from generic AI generators by combining:
1. **Tenant-isolated historical Content DNA** (hooks, topics, formats, lengths, tones, statistical win rates).
2. **Company Brain & Rules Engine** (brand voice, target audience, personas, forbidden claims, strategic directives).
3. **Deterministic Performance Analytics** (programmatic CTR, engagement rates, ROAS, conversion calculations).
4. **Hybrid RAG Knowledge Layer** (semantic chunking, vector similarity, metadata and performance filtering).
5. **Opportunity Engine** (trend momentum × brand relevance × historical performance × competition gap).
6. **Campaign & Funnel Diagnosis** (funnel drop-off classification: creative vs. landing page vs. audience).
7. **AI Origin & Provenance Tracking** (linguistic entropy + workflow lineage).
8. **Lean Agentic Core via Essential Google ADK primitives** (Deterministic Tools, Structured Schemas, Workflow Pipelines, and Guardrail Callbacks).

---

## 2. Component Topology

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WEB APPLICATION (UI)                            │
│  - Executive Dashboard       - Content DNA Explorer                    │
│  - Trend & Opportunity Radar - Campaign & Funnel Diagnoser             │
│  - Content Studio & Approval - Company Brain & Rules Config            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / Server Actions
┌───────────────────────────────────▼────────────────────────────────────┐
│                        API & APPLICATION LAYER                         │
│  - Multi-tenant Context / Org Resolution & RBAC                        │
│  - Rate Limiting & Input Sanitization (Prompt Injection Guard)          │
│  - Deterministic Analytics Services (CTR, ROAS, Growth, Velocity)       │
│  - Background Job Orchestrator (Async Ingestion, Embeddings, Reports)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
┌────────▼──────────┐      ┌────────▼──────────┐      ┌────────▼──────────┐
│   DATABASE LAYER  │      │  AI / RAG ENGINE  │      │ LEAN ADK ENGINE   │
│ - Multi-tenant DB │      │ - Provider Layer  │      │ - Function Tools  │
│ - Postgres Schema │      │   (Gemini/OAI/CL) │      │   (Math / Rules)  │
│ - pgvector tables │      │ - Semantic Vector │      │ - Structured JSON │
│ - Ingestion ETL   │      │ - Hybrid Filter   │      │ - Seq / Loop QA   │
│ - Full Audit Log  │      │ - Origin Analyzer │      │ - Guard Callbacks │
└───────────────────┘      └───────────────────┘      └───────────────────┘
```

---

## 3. Technology Stack

- **Runtime & Language**: Node.js (v24 LTS) + TypeScript (strict mode throughout).
- **Frontend & App Shell**: Next.js 14+ (App Router) with custom Vanilla CSS design tokens (calm, premium, data-dense, professional dark-mode-first aesthetic, Google Fonts `Plus Jakarta Sans` / `Outfit`).
- **Database Engine**: PostgreSQL with `pgvector` extension.
  - *Local Development / Zero-Dependency Mode*: High-speed in-process PostgreSQL (`@electric-sql/pglite` with pgvector extension) so it runs natively on any machine without Docker overhead.
  - *Production*: Managed PostgreSQL (Neon, Supabase, AWS RDS, Railway) via standard `DATABASE_URL`.
- **Lean AI & Agent Engine (Only what we need from Google ADK)**:
  - **Function Tools**: Encapsulates deterministic calculations (CTR, ROAS, Content DNA outperformance factors, Opportunity score math).
  - **Structured Outputs (Pydantic / Zod schemas)**: Enforces rigid JSON contracts for `ContentBrief`, `OpportunityScorecard`, and `CampaignDiagnosis`.
  - **Workflow Agents**:
    - `SequentialAgent`: Linear pipeline: Gather DNA → Score Opportunity → Generate Strategy.
    - `LoopAgent`: Content Creator drafting + Critic Agent brand-safety review (max 3 iterations).
  - **Callbacks (`before_model_callback`)**: Prompt injection sanitization, tenant boundary enforcement, and secret redaction.
- **Excluded ADK Components (Deliberate YAGNI Cuts)**:
  - *No Agent2Agent (A2A)*: We run in a single codebase; network agent cards and remote microservice ports add pure latency and complexity.
  - *No MCP toolset servers*: Ingestion runs via direct native DB queries and secure fetchers, avoiding extra stdio/HTTP server processes.
  - *No external memory servers*: PostgreSQL stores our persistent brand knowledge and human feedback directly.

---

## 4. Multi-Tenant Data Isolation Model

Every query and state mutation runs in an explicit tenant context:
```sql
SELECT * FROM content_items 
WHERE organization_id = :current_org_id 
  AND workspace_id = :current_workspace_id;
```
Vector searches enforce mandatory metadata filtering on `organization_id` before similarity reranking.
In the agent layer, the `before_model_callback` verifies that all agent tool calls and retrievals carry the active `organization_id`. Cross-tenant contamination is strictly prevented.

---

## 5. Intelligence Engine Pipelines

### Pipeline A: Content Ingestion & Normalization
`Source (Blog/URL/Upload/Social) → Parser → Normalized Representation → Metric Extraction → Semantic Chunking → Embedding → Vector Storage`

### Pipeline B: Content DNA Learning
`Historical Content + Performance Metrics → Statistical Feature Grouping (Hooks, Formats, Durations, CTAs) → Baseline Comparison (Outperformance Factor) → Confidence Interval Calculation → Company DNA Registry`

### Pipeline C: Opportunity & Gap Scoring
`Trend Signals + Brand Rules + Content DNA + Competitor Corpus → Opportunity Matrix [Score: 0–100] = w1*TrendMomentum + w2*AudienceFit + w3*BrandRelevance + w4*HistoricalOutperformance + w5*CompetitorWhitespace`

### Pipeline D: AI Content Origin & Provenance
`Linguistic Perplexity/Burstiness Heuristics + Workflow Provenance Log (Human Idea → AI Draft → Human Edit → Approval) → Likelihood Tier + Confidence Score + Audit Trail`

---

## 6. Lean ADK Implementation (Pruned to Essentials)

Following the official ADK guideline: *"Start with one agent and a few function tools. Add a piece when the project asks for it, not before."*

| ADK Piece | Included? | How ContentOS Uses It | Why Included / Excluded |
| :--- | :--- | :--- | :--- |
| **01. Agent (`LlmAgent`)** | **YES** | Core Strategist and Critic agents. | Minimal harness with explicit instructions and tools. |
| **02. Function Tools** | **YES** | Deterministic metrics (CTR, Engagement, ROAS, Opportunity formula). | Critical: code calculates numbers, model reasons. |
| **03. Built-in Tools** | **YES (Search only)** | `google_search` for trend validation. | Avoids writing custom web scrapers for live trends. |
| **04. Structured Output** | **YES** | Pydantic / Zod schemas for briefs and scores. | Guaranteed UI-safe JSON data without parsing errors. |
| **05. Sub-agents** | **Lean** | Strategist hands off to Creator & Critic. | Scoped to creation & review, not 10 fragmented micro-agents. |
| **06. Workflow Agents** | **YES** | `SequentialAgent` (pipeline) & `LoopAgent` (creator-critic QA). | Replaces fragile prompt loops with deterministic steps. |
| **07. Agent2Agent (A2A)** | **NO (Cut)** | *Excluded* | Single codebase; multi-process A2A adds unnecessary complexity. |
| **08. MCP Toolset** | **NO (Cut)** | *Excluded* | Native DB / fetch functions are faster and more secure. |
| **09. Callbacks** | **YES** | `before_model_callback` for safety & tenant isolation. | Essential prompt injection defense and secret stripping. |
| **10. Sessions & State** | **Lean** | Conversational research sessions stored in DB. | Plain DB storage; no external Redis/Vertex session required. |
| **11. Memory** | **Lean** | PostgreSQL Company Brain + vector embeddings. | Built-in Postgres RAG; no complex external memory bank needed. |
| **12. Multimodal Input** | **YES** | Video frames/PDF guideline parts via Gemini. | Enables native Reel hook and brand PDF document analysis. |
