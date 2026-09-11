# ContentOS — Implementation Roadmap

## Overview of Phases

### Phase 0: Discovery & Architecture (Current)
- [x] Environment & runtime verification (Node v24, npm, Python 3.12, git).
- [x] Architectural documentation (`ARCHITECTURE.md`, `PRODUCT_SPEC.md`, `ROADMAP.md`, `DECISIONS.md`).
- [x] Lean Google ADK adoption (pruned to essentials; cut A2A, MCP servers, and external memory banks).
- [x] MVP Technical stack & database isolation design.

### Phase 1: Foundation, Multi-Tenancy & Database Layer
- [ ] Initialize Next.js 14+ fullstack TypeScript project with custom Vanilla CSS design tokens (calm, dark-mode-first, data-dense).
- [ ] Implement database schema with Postgres + pgvector support (PGlite for instant local zero-dependency run, standard Postgres for cloud deployment).
- [ ] Build tenant context resolution, user/organization modeling, and audit logger.
- [ ] Establish global error handling, logging, and environment configuration.

### Phase 2: Content Ingestion & Normalization Engine
- [ ] Unified `ContentItem` schema (platform, format, hook, CTA, transcript, metrics).
- [ ] Ingestion connectors: URL fetcher & HTML cleaner, manual text/video metadata uploader, CSV batch importer.
- [ ] SSRF security filters & rate limiting for external fetching.
- [ ] Deterministic performance metric calculator (engagement rate, save rate, click-through rate) via ADK function tools.

### Phase 3: Company Brain & Hybrid RAG Knowledge Layer
- [ ] Brand rules, personas, products, and human instructions data store.
- [ ] Document chunker & semantic embedder abstraction (`EmbeddingProvider`).
- [ ] Hybrid vector search with mandatory tenant isolation, topic filtering, and performance-band filtering.
- [ ] Context assembler with ADK `before_model_callback` for prompt injection defense and secret stripping.

### Phase 4: Content DNA Engine
- [ ] Statistical grouping by topic, hook type, format, duration, and tone.
- [ ] Median baseline comparison & outperformance factor (e.g., 2.1× vs median).
- [ ] Sample size & confidence interval computation.
- [ ] Content Health Score algorithm.

### Phase 5 & 6: Trend Engine, Opportunity Scoring & Gap Detector
- [ ] Trend signal ingestion abstraction (supporting built-in search tool).
- [ ] Opportunity score formula (Momentum, Audience Fit, Brand Relevance, History, Whitespace).
- [ ] Content gap detector (Company vs. Audience questions vs. Competitors vs. Trends).

### Phase 7 & 8: AI Strategist & Content Generation Studio (Lean ADK Workflows)
- [ ] Evidence-backed recommendation generator (WHAT, WHY, EVIDENCE, ACTION).
- [ ] Implement ADK `SequentialAgent` for pipeline ordering: Gathering → Opportunity → Strategy.
- [ ] Implement ADK `LoopAgent` for creator-critic refinement loop (`ContentCreator` + `CriticAgent` brand compliance check, max 3 iterations).
- [ ] Structured output schemas for briefs, scripts, carousels, and ad copy.
- [ ] Human approval, editing, and versioning workflow.

### Phase 9: AI Authenticity & Workflow Provenance
- [ ] AI-origin likelihood analyzer (linguistic heuristics, repetitive phrasing, burstiness).
- [ ] Internal workflow provenance tracking (Human Idea → AI Draft → Human Edit → Approval).

### Phase 10: Campaign & Funnel Intelligence
- [ ] Ad creative, ad set, and campaign data models.
- [ ] Funnel bottleneck diagnostic engine (Ad CTR vs. Landing Page CVR vs. CPA).
- [ ] Organic-to-Paid revenue attribution pattern detector.

### Phase 11 & 12: Production Hardening & Full Simulation Verification
- [ ] Comprehensive test suite (Unit, Integration, Heuristic).
- [ ] Guardrail callback validation.
- [ ] Simulated end-to-end user journey ("Example Fitness" company: onboarding, 100+ posts analysis, Content DNA extraction, opportunity scoring, script generation, and executive report).
