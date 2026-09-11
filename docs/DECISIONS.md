# ContentOS — Architecture & Engineering Decisions (ADR)

## ADR-001: Unified Fullstack Next.js + TypeScript Architecture
- **Context**: The product requires an interactive, high-density, professional SaaS dashboard alongside robust API routes, background workers, and deterministic analytics.
- **Decision**: Next.js 14+ (App Router) with TypeScript and custom Vanilla CSS design tokens.
- **Rationale**: Single codebase eliminates API drift, ensures end-to-end type safety from database schemas to UI charts, and minimizes deployment complexity. Vanilla CSS guarantees bespoke, sleek dark-mode aesthetics without heavy utility bloat.

## ADR-002: Dual-Mode PostgreSQL Strategy (PGlite for Local Dev, Standard Postgres for Cloud)
- **Context**: The host machine lacks Docker and native psql CLI tools. Installing native daemons can introduce friction or environment incompatibility, yet the system must strictly use PostgreSQL and `pgvector` semantics.
- **Decision**: Employ `@electric-sql/pglite` (with vector extension) for zero-dependency local development and testing, while exposing a standard `DATABASE_URL` for production managed Postgres (Neon, Supabase, AWS RDS).
- **Rationale**: Guarantees identical SQL dialect, vector similarity searches, and ACID transactions locally without requiring Docker or external installations, while remaining 100% production-ready for cloud deployments.

## ADR-003: Deterministic Analytics over LLM Arithmetic
- **Context**: LLMs are known to hallucinate numerical calculations, percentages, and metrics.
- **Decision**: All rates (CTR, engagement, ROAS, sample sizes, medians, outperformance multipliers) are calculated deterministically via tested math tools.
- **Rationale**: Preserves user trust, guarantees reproducible metrics, and leaves LLMs to reason, summarize, and synthesize strategy based on validated numbers.

## ADR-004: Pluggable AI & Embedding Provider Interface
- **Context**: Reliance on a single LLM vendor creates cost volatility and vendor lock-in.
- **Decision**: Standardize `LLMProvider` and `EmbeddingProvider` interfaces with support for Gemini, OpenAI, Anthropic, and an offline deterministic heuristic provider for testing.
- **Rationale**: Enables dynamic routing (lightweight models for classification, heavy reasoning models for strategy) and offline verification without external network dependency.

## ADR-005: Tenant Isolation via Organization Context
- **Context**: Multi-tenancy must prevent accidental cross-organization data leakage, particularly in vector search and AI memory.
- **Decision**: Every storage table and vector record contains `organization_id`. Every query explicitly filters on `organization_id` at the repository/middleware layer.
- **Rationale**: Eliminates cross-tenant data leaks and satisfies enterprise compliance standards.

## ADR-006: Lean Google ADK Adoption (Pruned to Essentials)
- **Context**: Google ADK ships ~12 components. Adopting every component (such as A2A, MCP server daemons, and external memory banks) introduces premature complexity, multi-process management overhead, and unnecessary network latency for an MVP.
- **Decision**: Strictly adopt only the 4-5 essential ADK patterns:
  1. **Function Tools**: Code handles deterministic math; docstrings provide tool schemas to the model.
  2. **Structured Outputs**: Rigid JSON schemas for briefs, scores, and diagnoses.
  3. **Workflow Agents**: `SequentialAgent` (pipeline ordering) and `LoopAgent` (creator-critic QA loop).
  4. **Callbacks**: `before_model_callback` for prompt injection filtering and tenant boundary checks.
  5. **Multimodal Parts**: Native Gemini video/audio/PDF inspection.
  *Explicitly cut for MVP*: A2A (single codebase doesn't need remote agent cards), MCP server daemons (native DB/HTTP fetch is cleaner), and external memory banks (Postgres is our single source of truth).
- **Rationale**: Directly aligns with ADK's core guidance: *"Start with one agent and a few function tools. Add a piece when the project asks for it, not before."* Keeps the codebase fast, maintainable, and robust.
