---
name: ContentOS Velvet & Vanilla
colors:
  surface: '#09090b'
  surface-dim: '#070709'
  surface-bright: '#16161a'
  surface-container-lowest: '#050507'
  surface-container-low: '#0d0d10'
  surface-container: '#111115'
  surface-container-high: '#18181e'
  surface-container-highest: '#22222a'
  on-surface: '#fcfcf9'
  on-surface-variant: '#a1a1aa'
  inverse-surface: '#fbfbf9'
  inverse-on-surface: '#09090b'
  outline: '#27272a'
  outline-variant: '#1e1e24'
  surface-tint: '#fcfcf9'
  primary: '#fbfbf9'
  on-primary: '#09090b'
  primary-container: '#18181e'
  on-primary-container: '#fbfbf9'
  inverse-primary: '#09090b'
  secondary: '#d4d4d8'
  on-secondary: '#09090b'
  secondary-container: '#27272a'
  on-secondary-container: '#f4f4f5'
  tertiary: '#f5f5f0'
  on-tertiary: '#09090b'
  tertiary-container: '#1c1c22'
  on-tertiary-container: '#e4e4e7'
  error: '#f87171'
  on-error: '#450a0a'
  error-container: '#7f1d1d'
  on-error-container: '#fecaca'
  primary-fixed: '#fbfbf9'
  primary-fixed-dim: '#e4e4e7'
  on-primary-fixed: '#09090b'
  on-primary-fixed-variant: '#27272a'
  secondary-fixed: '#e4e4e7'
  secondary-fixed-dim: '#a1a1aa'
  on-secondary-fixed: '#09090b'
  on-secondary-fixed-variant: '#3f3f46'
  tertiary-fixed: '#f5f5f0'
  tertiary-fixed-dim: '#d4d4d8'
  on-tertiary-fixed: '#09090b'
  on-tertiary-fixed-variant: '#27272a'
  background: '#09090b'
  on-background: '#fcfcf9'
  surface-variant: '#141418'
  vanilla-white: '#fbfbf9'
  vanilla-cream: '#f4f3ee'
  black-velvet: '#09090b'
  velvet-depth: '#0d0d11'
  velvet-border: 'rgba(255, 255, 255, 0.08)'
  hairline: 'rgba(255, 255, 255, 0.05)'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.375rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.25rem
  full: 9999px
spacing:
  base: 8px
  card-gap: 20px
  section-gap: 48px
  container-margin: 32px
  mobile-margin: 16px
---

# ContentOS Design System: Vanilla White & Black Velvet

## 1. Brand Essence & Visual Philosophy
The ContentOS aesthetic rejects playful tech gradients and distracting "AI purple" neon glows. Instead, it draws inspiration from **high-end Swiss horology, luxury editorial publishing, and tactile architectural minimalism**.

The core palette centers on **Black Velvet** (`#09090B`) as the grounding foundation, contrasted with pure **Vanilla White** (`#FBFBF9` / `#F4F3EE`) for typography, key actionable surfaces, and structural definition. 

The feeling is:
- **Calm**: Reduces cognitive fatigue during intensive marketing analysis.
- **Intelligent & Serious**: Signals enterprise-grade analytical rigor.
- **Tactile**: Fine 1px hairline borders (`rgba(255, 255, 255, 0.08)`), micro-embossed badges, and velvety depth.
- **Data-Dense**: Maximum readability with monospace metric accents (`JetBrains Mono`).

---

## 2. Color Palette & Tone Scale

### Velvet Dark Surfaces
- **`--bg-velvet-base` (`#09090B`)**: Deep obsidian velvet background.
- **`--bg-velvet-layer1` (`#0D0D11`)**: Primary card containers and navigation sidebar.
- **`--bg-velvet-layer2` (`#141419`)**: Elevated dialogs, dropdowns, and active tab states.
- **`--bg-velvet-inset` (`#050507`)**: Metric wells, code snippets, and terminal logs.

### Vanilla White Accents & Text
- **`--text-vanilla-high` (`#FCFCF9`)**: 100% contrast headers, primary metrics, and hero numbers.
- **`--text-vanilla-body` (`#E4E4E7`)**: Clean editorial body text.
- **`--text-vanilla-muted` (`#A1A1AA`)**: Metadata, table headers, and secondary labels.
- **`--text-vanilla-subtle` (`#71717A`)**: Inactive timestamps and helper hints.

### Functional Status Indicators (Subtle & High Fidelity)
- **Positive / Outperformance (Emerald Velvet)**:
  - Text: `#34D399` | Background: `rgba(52, 211, 153, 0.08)` | Border: `rgba(52, 211, 153, 0.2)`
- **Warning / Opportunity High (Warm Amber)**:
  - Text: `#FBBF24` | Background: `rgba(251, 191, 36, 0.08)` | Border: `rgba(251, 191, 36, 0.2)`
- **Bottleneck / Drop-off (Rose Red)**:
  - Text: `#F87171` | Background: `rgba(248, 113, 113, 0.08)` | Border: `rgba(248, 113, 113, 0.2)`

---

## 3. Typography Hierarchy
- **Brand Display & Headings**: `Plus Jakarta Sans`
  - Crisp geometric forms with subtle human touches, giving authority to executive summaries.
- **Interface & Narrative**: `Inter`
  - The industry benchmark for UI clarity, ensuring dense tables and multi-paragraph strategy briefs remain effortless to scan.
- **Metrics, Proof Points & Code**: `JetBrains Mono`
  - Used for sample sizes (`n=43`), confidence bands (`[84% - 92%]`), multipliers (`2.1x`), and dates.

---

## 4. Elevation, Depth & Velvet Texture
- **Hairlines**: All cards use a crisp 1px border: `border: 1px solid rgba(255, 255, 255, 0.08)`.
- **Soft Ambient Velvet Shadow**:
  - `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.06)`
- **Active / Focused State**:
  - `box-shadow: 0 0 0 1px #FBFBF9, 0 8px 30px rgba(0, 0, 0, 0.8)`
- **Tactile Hover**: Subtle translateY(-1px) with border illumination to `rgba(255, 255, 255, 0.16)`.

---

## 5. Component Patterns

### A. Primary Action Button
- Background: Solid **Vanilla White** (`#FBFBF9`).
- Text: Deep **Black Velvet** (`#09090B`), font-weight 600.
- Hover: Soft opacity shift (0.92) with subtle lift.
- Border radius: `rounded-md` (8px).

### B. Secondary / Ghost Button
- Background: `rgba(255, 255, 255, 0.03)`.
- Text: **Vanilla White** (`#FCFCF9`).
- Border: `1px solid rgba(255, 255, 255, 0.1)`.
- Hover: Background switches to `rgba(255, 255, 255, 0.08)`.

### C. The Evidence & DNA Card
Every strategic recommendation displays an Evidence Panel:
- Container: Velvet layer 1 with a thin top border highlight (`linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 100%)`).
- Header: Bold Vanilla White recommendation title.
- Badge: Monospace outperformance factor (e.g. `+2.1× vs Median`).
- Data Rows: High-density key-value pairings with sample sizes and confidence bars.

### D. Input Fields & Selects
- Background: `surface-container-lowest` (`#050507`).
- Border: `1px solid rgba(255, 255, 255, 0.1)`.
- Typography: Vanilla White with muted placeholder (`#71717A`).
- Focus: Crisp Vanilla outline (`#FBFBF9`).

---

## 6. Light Mode Inversion (Vanilla Editorial Mode)
When light mode is toggled, the palette inverts seamlessly into an ultra-clean **Vanilla White Editorial Canvas**:
- Page Background: Warm Alabaster Vanilla (`#FBFBF9`).
- Cards & Surfaces: Pure Crisp White (`#FFFFFF`) with 1px graphite hairlines (`#E4E4E7`).
- Text & Headings: Solid Black Velvet (`#09090B`).
- Buttons: Solid Black Velvet with Vanilla White typography.
