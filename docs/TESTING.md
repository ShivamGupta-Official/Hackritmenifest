# ContentOS — Testing & Evaluation Strategy

## 1. Multi-Tier Testing Pyramid

ContentOS employs a rigorous 4-tier testing hierarchy to ensure mathematical integrity, tenant isolation, and AI reliability:

```
          ┌──────────────────────────┐
          │   End-to-End Simulation  │ (Example Fitness Journey)
          ├──────────────────────────┤
          │    AI Evaluation Tests   │ (Guardrails, Hallucination checks)
          ├──────────────────────────┤
          │     Integration Tests    │ (APIs, Database, RAG Retrieval)
          ├──────────────────────────┤
          │        Unit Tests        │ (Deterministic Math, Scoring)
          └──────────────────────────┘
```

---

## 2. Unit Testing (Deterministic Code)

Unit tests focus on math and algorithmic guarantees:
1. **Performance Metrics**:
   - Engagement rate: `(likes + comments + shares + saves) / impressions`.
   - CTR: `clicks / impressions`.
   - ROAS: `revenue / spend`.
2. **Content DNA Outperformance**:
   - Correct median calculation ignoring extreme viral outliers.
   - Outperformance multiplier precision.
   - Sample size confidence thresholds ($n < 10 \rightarrow \text{low}$, $n \ge 25 \rightarrow \text{high}$).
3. **Opportunity Score Formula**:
   - Boundary tests ensuring score always falls within $[0, 100]$.
   - Correct weighting when trend momentum is zero or brand relevance is low.
4. **Funnel Diagnosis Logic**:
   - Correctly triggers `creative_problem` when CTR is low and CVR is high.
   - Correctly triggers `landing_page_problem` when CTR is high and CVR is low.

---

## 3. Integration Testing (Database & APIs)

1. **Multi-Tenant Isolation**:
   - Attempting to query Organization A's content with Organization B's session token MUST return 403 Forbidden or empty results.
2. **Vector Similarity with Tenant Filter**:
   - Inserting chunks for Org 1 and Org 2 with identical text. Searching as Org 1 MUST only return Org 1 chunk IDs.
3. **SSRF Validator**:
   - Testing that `localhost`, `127.0.0.1`, `10.0.0.1`, and AWS metadata endpoint `169.254.169.254` are blocked with 400 Invalid URL.

---

## 4. AI Evaluation Tests

1. **Brand Rule Adherence**:
   - Providing a forbidden claim (e.g. *"guaranteed 10kg weight loss"*). The Critic Agent MUST detect and reject drafts containing this claim.
2. **Provenance Tracking**:
   - Testing that internal edits update the workflow lineage array without altering historical timestamps.
3. **AI Origin Likelihood**:
   - Testing synthetic AI text vs human editorial text against linguistic entropy and repetition heuristics.

---

## 5. The Golden End-to-End Simulation ("Example Fitness")

Prior to production release, the system executes the **Example Fitness** benchmark:
1. Onboard company profile ("Beginners interested in fitness", "Lead generation").
2. Ingest 100 Instagram posts, 20 Reels, and 10 blogs.
3. Verify Content DNA extracts problem-first founder reels as top performer ($>2.0\times$).
4. Ingest trend "Athletic recovery for beginners" and verify Opportunity Score $>85/100$.
5. Generate Reel script through Creator ↔ Critic QA loop.
6. Verify human approval gate and provenance tracking.
7. Export executive intelligence report.
