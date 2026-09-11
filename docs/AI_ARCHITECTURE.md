# ContentOS — AI Architecture & Agent Framework

## 1. Core Architectural Principle

ContentOS is **not** a generic LLM wrapper. It strictly separates **deterministic computation** from **heuristic reasoning**:

1. **Deterministic Calculations (100% Code)**:
   - Median engagement rates, save rates, CTR, ROAS.
   - Content DNA outperformance factors (`multiplier = feature_median / overall_median`).
   - Sample size thresholds (`n >= 15` for high statistical confidence).
   - Opportunity Score formula weighting.
   - Funnel diagnosis logic (comparing CTR against industry baseline vs. conversion rate against landing page baseline).

2. **Heuristic Reasoning & Synthesis (LLM & Agent Engine)**:
   - Topic extraction and semantic categorization.
   - Tone classification and hook parsing.
   - Socratic synthesis of why certain patterns outperform.
   - Creative brief generation and script drafting.
   - Critic Agent brand compliance auditing.

---

## 2. Pluggable Provider Interface

The AI subsystem uses a decoupled adapter pattern:
```typescript
export interface LLMProvider {
  name: string;
  generateText(prompt: string, options?: LLMOptions): Promise<string>;
  generateStructured<T>(prompt: string, schema: Schema<T>, options?: LLMOptions): Promise<T>;
}

export interface EmbeddingProvider {
  name: string;
  dimensions: number;
  embedText(text: string): Promise<number[]>;
  embedBatch(texts: string[]): Promise<number[][]>;
}
```

### Supported Implementations
- **GeminiProvider**: Gemini 1.5/2.0 Flash (high speed, cost-efficient classification) & Gemini Pro (advanced strategic reasoning).
- **OpenAIProvider**: GPT-4o / GPT-4o-mini.
- **AnthropicProvider**: Claude 3.5 Sonnet.
- **DeterministicHeuristicProvider**: Built-in offline provider for automated testing, local validation, and zero-cost CI/CD runs.

---

## 3. Lean Google ADK Engine Design

ContentOS adopts the leanest, most effective subset of Google ADK (`google-adk`):

### 3.1 Function Tools (`tools=[...]`)
All metric lookups and mathematical formulas are exposed to the agent as formal tools with strict typed docstrings:
```python
def calculate_dna_outperformance(feature: str, category: str, org_id: str) -> dict:
    """Calculates median performance and outperformance multiplier for a hook/format.
    Returns: { sample_size: int, multiplier: float, confidence: 'high'|'medium'|'low' }
    """
    ...
```
The agent calls this tool to retrieve verified numbers. It is strictly prohibited from doing arithmetic inside prompt tokens.

### 3.2 Structured Output Schemas (Zod / Pydantic)
All business-critical outputs return typed schemas:
- `ContentBriefSchema`: Hook, Scene-by-Scene Visuals, Dialogue, Audio Cue, CTA, Grounding Evidence.
- `OpportunityScoreSchema`: Topic, Momentum, Audience Relevance, Commercial Whitespace, Total Score (0–100).
- `CampaignDiagnosisSchema`: Bottleneck (`creative_problem`, `landing_page_problem`, etc.), Evidence, Prescribed Fix.

### 3.3 Workflow Agents
- **`SequentialAgent` (Linear Strategy Pipeline)**:
  `[Gather DNA Metrics] → [Score Opportunities] → [Synthesize Strategy]`
- **`LoopAgent` (Creator ↔ Critic QA Loop)**:
  - Step 1: `ContentCreator` generates draft based on strategic brief.
  - Step 2: `CriticAgent` validates against Brand Rules, Forbidden Claims, and Tone constraints.
  - Step 3: If compliant, marks `APPROVED_BY_AI` and outputs to human review; if non-compliant, sends explicit feedback back to `ContentCreator` (capped at 3 iterations).

### 3.4 Callbacks (`before_model_callback`)
A centralized pipeline intercepting every LLM request:
1. **Prompt Injection Defense**: Sanitizes user-uploaded content (treating it as inert data, never instructions).
2. **Tenant Boundary Check**: Asserts `organization_id` in context matches all query parameters.
3. **Secret & PII Stripping**: Redacts API keys, credit card patterns, and personal emails before requests hit external inference.
