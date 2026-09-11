# ContentOS — Product Specification

## 1. Executive Summary
**ContentOS** is a multi-tenant SaaS operating system that serves as an intelligent marketing brain for businesses, marketing teams, and growth agencies. It closes the loop between organic content, advertising campaigns, and revenue attribution.

## 2. Core Value Proposition
- **Evidence-Driven Recommendations**: Every recommendation provides WHAT, WHY, EVIDENCE, and ACTION. No generic "Post 10 ideas".
- **Proprietary Content DNA**: Learns the company-specific combinations of hooks, topics, formats, lengths, and tones that outperform historical baselines with statistical confidence.
- **Company Brain & Guardrails**: Enforces brand voice, target personas, forbidden claims, and human directives as strict rules rather than passive prompt suggestions, guarded via callbacks.
- **Opportunity & Gap Engine**: Distinguishes between viral noise and commercially relevant company opportunities (scoring 0–100).
- **Lean ADK Workflow Pipelines**: Employs `SequentialAgent` for linear strategy generation and `LoopAgent` for iterative content drafting and brand rule criticism.
- **Campaign & Funnel Diagnosis**: Connects top-of-funnel content engagement to bottom-of-funnel ROAS, diagnosing creative vs. landing page drop-offs.
- **AI Content Origin & Workflow Provenance**: Provides transparent likelihood scoring with confidence bands and tracks genuine creation lineage.

## 3. Key User Personas
1. **D2C / Brand Founder**: Needs high-confidence guidance on what content will drive leads/revenue, without hiring a 10-person agency.
2. **Head of Growth / Marketing Director**: Requires cross-platform attribution, content DNA diagnostics, and team approval workflows.
3. **Agency Strategist / Creator**: Manages multiple isolated client workspaces, generating evidence-backed briefs and creative variants.

## 4. MVP Functional Modules
1. **Multi-Tenant Foundation & Workspaces**: Organization switcher, role-based access, audit logging.
2. **Content Ingestion Hub**: Manual paste/upload, CSV bulk import, URL scraping & HTML normalization, multimodal video/audio ingestion.
3. **Company Brain & Brand Registry**: Brand voice rules, forbidden claims, audience personas, products/services catalog, and human directives in PostgreSQL.
4. **Performance Analytics & Content DNA**: Programmatic calculation of engagement rate, save rate, CTR, ROAS, and statistical win-rate feature matrix via ADK Function Tools.
5. **Hybrid RAG Knowledge System**: Semantic chunking, pgvector embeddings, tenant-isolated hybrid filtering (similarity + performance tier + recency).
6. **Trend & Opportunity Radar**: Trend signal ingestion (via built-in web search), relevance scoring, opportunity scoring (0–100), and content gap detector.
7. **AI Strategist & Evidence-Backed Content Studio**: Brief generator, script writer, carousel & ad copy creator, utilizing ADK `LoopAgent` for creator-critic QA loops and rigid structured JSON schemas.
8. **Origin & Provenance Inspector**: AI-origin likelihood estimation (perplexity/burstiness/linguistic patterns) + internal step-by-step workflow lineage.
9. **Campaign & Funnel Diagnostic Studio**: Ad set metrics, creative hook testing, bottleneck detection (Creative vs. Landing Page vs. Audience).
10. **Executive Intelligence Reporting**: Exportable, evidence-backed strategy documents.
