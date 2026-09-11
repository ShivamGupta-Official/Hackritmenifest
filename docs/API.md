# ContentOS — API Specification

## 1. Design Standards
- **Protocol**: RESTful JSON over HTTPS.
- **Tenant Context**: All requests must be authenticated. The active organization is passed via the `X-Organization-Id` header or derived from the user's active session.
- **Versioning**: All routes are prefixed with `/api/v1`.
- **Pagination**: Uniform cursor/offset pagination (`?limit=20&offset=0` or `?cursor=...`).
- **Error Format**: Structured JSON errors with RFC 7807 compliant shapes.

```json
{
  "error": {
    "code": "TENANT_ACCESS_DENIED",
    "message": "User does not have access to the requested organization.",
    "details": {}
  }
}
```

---

## 2. Route Groups & Endpoints

### 2.1 Authentication & Tenants (`/api/v1/auth`, `/api/v1/organizations`)
- `POST /api/v1/auth/login`: Issue session token / JWT.
- `GET /api/v1/organizations`: List organizations the authenticated user belongs to.
- `POST /api/v1/organizations`: Create a new organization and default workspace.
- `GET /api/v1/workspaces`: List workspaces within the current organization.
- `POST /api/v1/workspaces`: Create a client workspace.

### 2.2 Company Brain (`/api/v1/brain`)
- `GET /api/v1/brain/brand`: Retrieve brand identity, voice guidelines, and target personas.
- `PUT /api/v1/brain/brand`: Update brand voice, tone parameters, and mission.
- `GET /api/v1/brain/rules`: List brand rules and forbidden claims.
- `POST /api/v1/brain/rules`: Add a new forbidden claim or compliance rule.
- `DELETE /api/v1/brain/rules/:id`: Deactivate/delete a brand rule.
- `GET /api/v1/brain/instructions`: List active human instructions and directives.
- `POST /api/v1/brain/instructions`: Record a new human preference/directive.

### 2.3 Content Ingestion & Storage (`/api/v1/content`)
- `GET /api/v1/content`: Paginated list of content items with metrics, filterable by platform, format, and date range.
- `GET /api/v1/content/:id`: Detailed content item with hook, transcript, and full performance stats.
- `POST /api/v1/content/upload`: Upload manual content (caption, metrics, format, duration).
- `POST /api/v1/content/import-csv`: Batch ingest CSV with schema validation.
- `POST /api/v1/content/ingest-url`: Ingest blog or public post via URL (with SSRF protection).

### 2.4 Content DNA & Performance Analytics (`/api/v1/analytics`)
- `GET /api/v1/analytics/overview`: High-level Content Health Score, median engagement rates, total reach.
- `GET /api/v1/analytics/dna`: Statistical breakdown of top-performing hooks, formats, lengths, and tones with sample sizes (`n`) and outperformance multipliers (e.g. `2.1x vs median`).
- `GET /api/v1/analytics/gaps`: Matrix of untapped topics, missing funnel stages, and audience questions.

### 2.5 Trends & Opportunity Radar (`/api/v1/opportunities`)
- `GET /api/v1/opportunities`: Ranked list of opportunities scored 0–100.
  - Returns `opportunity_score`, `trend_momentum`, `brand_relevance`, `historical_outperformance`, `why_explanation`, and `evidence`.
- `POST /api/v1/opportunities/:id/feedback`: User feedback on recommendation (`good`, `bad`, `wrong_audience`, `less_like_this`).
- `POST /api/v1/opportunities/scan`: Trigger an asynchronous background scan for new industry trends.

### 2.6 Content Studio & Generation (`/api/v1/studio`)
- `POST /api/v1/studio/generate`: Generate content brief or draft (Reel script, blog outline, carousel, ad copy) grounded in Company Brain and Content DNA.
  - Request body: `{ opportunityId, format, objective, audienceId }`
  - Response: Strictly typed Pydantic/Zod JSON content brief.
- `GET /api/v1/studio/assets`: List drafts, in-review assets, and approved content.
- `PUT /api/v1/studio/assets/:id`: Human edit with provenance tracking.
- `POST /api/v1/studio/assets/:id/approve`: Human approval gate.
- `POST /api/v1/studio/analyze-origin`: Analyze AI-origin likelihood (0–100%) and linguistic perplexity/burstiness signals.

### 2.7 Campaign & Funnel Intelligence (`/api/v1/campaigns`)
- `GET /api/v1/campaigns`: List ad campaigns, spend, CTR, conversions, ROAS.
- `GET /api/v1/campaigns/diagnosis`: Funnel diagnostic breakdown identifying exact bottlenecks (Creative vs. Landing Page vs. Audience problem).
- `GET /api/v1/campaigns/attribution`: Correlation analysis between organic high-performing topics and paid ad conversions.

### 2.8 Executive Reports (`/api/v1/reports`)
- `POST /api/v1/reports/generate`: Generate comprehensive executive intelligence report (Summary, What Worked, Gaps, Opportunities, Action Plan).
- `GET /api/v1/reports/:id`: Retrieve exported report.
