# ContentOS — Trend & Opportunity Scoring Engine

## 1. Core Distinction: Trend ≠ Opportunity

A topic can have viral social momentum and still be catastrophic or wasteful for a specific company to pursue.

- **A Trend** is an external observation (*"Ice baths are trending on TikTok with 150M views"*).
- **An Opportunity** is the mathematical intersection of an external trend with this company's brand identity, historical Content DNA, audience needs, and commercial offering.

---

## 2. Signal Normalization

The Trend Engine monitors external signals (via Google Search trends, industry RSS, social mentions, and audience search intent). Each trend is normalized into a standardized record:
- `topic`: Canonical query title.
- `velocity`: 7-day rate of change in search/mention volume.
- `volume_tier`: Categorized relative volume (`high`, `medium`, `rising_niche`).
- `sentiment`: Public conversation sentiment (-1.0 to +1.0).
- `commercial_intent`: High intent queries (e.g. *"best recovery tools for beginners"*) vs. low intent jokes/memes.

---

## 3. The Opportunity Scoring Formula (0 to 100)

Every candidate trend is evaluated against the active company profile to produce an **Opportunity Score**:

$$\text{OpportunityScore} = w_1 M + w_2 A + w_3 B + w_4 H + w_5 W$$

Where:
1. **$M$ (Trend Momentum, 20%)**: Growth rate and freshness of the trend.
2. **$A$ (Audience Relevance, 25%)**: Semantic alignment between the trend and target audience pain points.
3. **$B$ (Brand Alignment, 25%)**: Fit with the company's product line, mission, and approved vocabulary.
4. **$H$ (Historical DNA Match, 20%)**: Has this company succeeded with similar topic clusters or hooks in the past?
5. **$W$ (Competitive Whitespace, 10%)**: Are competitors neglecting this angle or producing weak, low-effort responses?

### Score Interpretation
- **90–100**: *Immediate High-Conviction Action* — High commercial relevance, proven historical DNA match, strong trend momentum.
- **70–89**: *Recommended Campaign Angle* — Strong fit, viable testing opportunity.
- **50–69**: *Watchlist / Low Priority* — High viral buzz but marginal brand alignment or unproven audience interest.
- **< 50**: *Filtered Out* — Irrelevant or brand-incompatible noise.

---

## 4. Content Gap Detection Matrix

The engine performs continuous 4-quadrant gap analysis:

```
                  HIGH AUDIENCE INTENT
                           │
       QUADRANT 2:         │        QUADRANT 1:
    CRITICAL GAP           │     DEFENDED STRENGTH
(Audience asks constantly; │ (Company publishes heavily;
 company publishes rarely) │  converts reliably)
───────────────────────────┼───────────────────────────
       QUADRANT 3:         │        QUADRANT 4:
     IRRELEVANT NOISE      │      CONTENT FATIGUE
(Low audience interest;    │ (Company publishes heavily;
 low company output)       │  audience engagement dying)
                           │
                   LOW AUDIENCE INTENT
```

The system proactively alerts users to **Quadrant 2 (Critical Gaps)** and advises pausing **Quadrant 4 (Content Fatigue)** topics.
