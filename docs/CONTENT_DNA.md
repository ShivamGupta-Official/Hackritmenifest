# ContentOS — Content DNA Engine & Statistical Learning

## 1. What is Content DNA?

Content DNA is the proprietary intelligence layer of ContentOS. It answers:
> *"What specific structural combinations of topics, hooks, formats, lengths, tones, and CTAs statistically outperform this company's historical baseline?"*

Generic tools make broad claims (*"Founder videos work well"*). 
ContentOS produces company-calibrated, statistically verified patterns:
> *"Founder-led educational reels under 30 seconds with a problem-first hook outperform your median Reel by 2.1× across 43 posts with 95% confidence."*

---

## 2. Feature Extraction Taxonomy

When a content item is ingested and analyzed, it is broken down into structured DNA dimensions:

| DNA Dimension | Possible Classifications |
| :--- | :--- |
| **Hook Type** | `problem_first`, `curiosity_gap`, `contrarian_take`, `data_statistic`, `visual_pattern_interrupt`, `direct_callout` |
| **Format** | `founder_talking_head`, `screen_recording_demo`, `split_screen_reaction`, `kinetic_typography`, `carousel_slide_deck`, `narrative_vlog` |
| **Topic Cluster** | Normalized taxonomy (e.g. `product_education`, `industry_critique`, `customer_case_study`, `daily_routine`, `recovery_science`) |
| **Duration Bracket** | `micro_under_15s`, `short_15_30s`, `medium_30_60s`, `long_over_60s` |
| **Tone** | `authoritative`, `empathetic`, `provocative`, `scientific`, `casual_humorous` |
| **CTA Type** | `soft_save_for_later`, `comment_keyword_for_dm`, `click_link_in_bio`, `direct_purchase_offer`, `none` |

---

## 3. Mathematical & Statistical Formulation

All Content DNA metrics are computed deterministically via standard statistical functions:

### 3.1 Company Median Baseline ($M$)
Because marketing metrics have extreme viral outliers, the **median** is preferred over the arithmetic mean:
$$M = \text{median}(\text{engagement\_rate}_{1..N})$$

### 3.2 Feature Group Median ($M_f$)
For any subset of content containing feature $f$ (e.g. `hook_type = 'problem_first'`):
$$M_f = \text{median}(\text{engagement\_rate}_{i \in \text{Group}(f)})$$

### 3.3 Outperformance Multiplier ($O_f$)
$$O_f = \frac{M_f}{M}$$
- $O_f > 1.20$: Positive DNA feature (winning pattern).
- $0.80 \le O_f \le 1.20$: Neutral / baseline performer.
- $O_f < 0.80$: Weak DNA feature (underperforming pattern).

### 3.4 Statistical Confidence Scoring ($C_f$)
Sample size determines how much trust is assigned to the conclusion:
- **High Confidence**: Sample size $n \ge 25$, or $p < 0.05$ via Mann-Whitney U test against baseline.
- **Medium Confidence**: $10 \le n < 25$.
- **Low Confidence**: $n < 10$. (Explicitly labeled in the UI as *"Preliminary data — small sample"*).

---

## 4. Multi-Feature Combinatorial Clustering

The system does not just test single features in isolation; it computes 2-way and 3-way feature intersections:
```
(Format: 'founder_talking_head') + (Hook: 'problem_first') + (Duration: 'short_15_30s')
  → Sample Size: n=31
  → Outperformance Multiplier: 2.34x
  → Statistical Confidence: High (p=0.008)
```
These winning multi-feature combinations form the company's **Signature Content Playbook**.
