# ContentOS — Deployment & Infrastructure Specification

## 1. Architecture: Modular Monolith + Worker Model

ContentOS is designed as a **modular monolith** with async background workers to maximize operational simplicity and minimize early cloud costs.

```
       [ Client Browser / Mobile Web ]
                     │ HTTPS
                     ▼
          [ Reverse Proxy / Cloudflare ]
                     │
       ┌─────────────┴─────────────┐
       │                           │
       ▼                           ▼
[ Next.js Web App ]         [ Next.js API Routes ]
       │                           │
       ├───────────────────────────┤
       │                           │
       ▼                           ▼
[ Background Job Worker ]   [ PostgreSQL + pgvector ]
(Heavy Ingestion/Embeddings)       │
                                   ▼
                            [ Object Storage ]
                            (S3 / Cloudflare R2)
```

---

## 2. Environment Tiers

### Local Development / Offline Mode
- Database: Embedded PostgreSQL via `@electric-sql/pglite` (zero external dependencies, runs in Node.js).
- AI Engine: Deterministic heuristic provider or Gemini API with direct key.
- Storage: Local filesystem.

### Staging & Production
- Web Application & API: Vercel / Railway / Render container.
- Database: Managed PostgreSQL with pgvector (Neon, Supabase, AWS RDS).
- Object Storage: AWS S3 or Cloudflare R2 for user-uploaded videos and PDFs.
- AI Gateway: Google Cloud Vertex AI / Gemini API with rate limiting and spending caps.

---

## 3. Key Environment Variables

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://app.contentos.ai

# Database
DATABASE_URL=postgresql://user:password@db.example.com:5432/contentos?sslmode=require

# AI Providers
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=optional_openai_key
ANTHROPIC_API_KEY=optional_claude_key

# 21st MCP & UI Integration
API_KEY_21ST=21st_sk_...

# Security & Secrets
JWT_SECRET=production_random_jwt_secret_min_32_chars
ENCRYPTION_KEY=32_byte_hex_key_for_aes_credential_vault
```
