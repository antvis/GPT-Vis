---
name: theme-author
description: Create or refine a reusable GPT-Vis ThemeSpec from brand guidelines, websites, slides, or visual references. Return JSON for Theme Studio across statistical charts, relationship graphs, tables, and summaries.
---

# GPT-Vis theme authoring

Translate the user's references into one coherent visual system that can be pasted into [Theme Studio](https://gpt-vis.antv.vision/themes).

## Source of truth

Read the relevant contracts before authoring unfamiliar fields. All links target GPT-Vis's current `ai` branch. In a local checkout, use the corresponding local paths.

- [ThemeSpec](https://github.com/antvis/GPT-Vis/blob/ai/src/types/theme.ts): top-level shape and chart overrides.
- [Seed tokens](https://github.com/antvis/GPT-Vis/blob/ai/src/types/tokens.ts): shared colors, typography, spacing, stroke, and radius.
- [Chart style boundaries](https://github.com/antvis/GPT-Vis/blob/ai/src/types/style/charts.ts): which chart supports which styles.
- [Component styles](https://github.com/antvis/GPT-Vis/blob/ai/src/types/style/components.ts): titles, axes, legends, and labels.
- [G2 mark styles](https://github.com/antvis/GPT-Vis/blob/ai/src/types/style/g2-marks.ts) and [G6 element styles](https://github.com/antvis/GPT-Vis/blob/ai/src/types/style/g6-elements.ts).
- [Table styles](https://github.com/antvis/GPT-Vis/blob/ai/src/types/style/table.ts) and [Summary styles](https://github.com/antvis/GPT-Vis/blob/ai/src/types/style/summary.ts).
- [Working theme examples](https://github.com/antvis/GPT-Vis/blob/ai/site/app/themes/presets.ts).

To read a source file directly, replace `https://github.com/antvis/GPT-Vis/blob/ai/` with `https://raw.githubusercontent.com/antvis/GPT-Vis/ai/`. If references cannot be read, explain the limitation rather than inventing unsupported fields.

## Authoring

Extract recurring design decisions from the references: surfaces, text hierarchy, categorical palette, semantic positive/negative colors, type, line weight, corners, and spacing. Ask only for missing information that would materially change the result. Preserve required brand colors while finding readable text and surface combinations.

Use this shape:

```json
{
  "version": "1",
  "id": "my-theme",
  "label": "My theme",
  "description": "Optional human-readable description",
  "baseTheme": "default",
  "tokens": {},
  "style": {},
  "charts": {}
}
```

Only `version`, `id`, and `label` are required. Omit optional blocks with no authored decisions. Use a stable kebab-case `id`.

Start with tokens so the same decisions reach all renderers:

- Colors: `colorDefault`, `colorBackground`, `colorSurface`, `colorText`, `colorTextSecondary`, `colorTextInverse`, `colorStroke`, `colorPositive`, `colorNegative`, `colorNeutral`.
- Palettes: `category10`, `category20`; author the extended palette deliberately when specifying both.
- Typography: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`. Font weight is a number, `"normal"`, or `"bold"`.
- Geometry and spacing: `padding1`, `padding2`, `lineWidth`, `radius`.

Use `style` for supported global refinements; use `charts.<type>.style` for a chart's visual exception. Mark styles belong in `style.mark.<mark>`. G6 elements belong in `style.node` and `style.edge`. Table and Summary use `style.table` and `style.summary`.

Precedence, from lowest to highest: built-in renderer defaults → token expansion → global `style` → `charts.<type>.style` → the chart's local `style`. Nested style objects merge; arrays replace. A chart-level `theme` selects its theme instead of the instance's theme. The built-in base names are `default`, `light`, `dark`, and `academy`; `light` is the light-theme alias. Custom themes are passed as objects, not registered by ID.

## Visual boundaries

A theme changes presentation. It does not select data, chart type, encodings, aggregation, sorting, titles, axes' semantic meaning, layout algorithms, or interactions. Keep these out of ThemeSpec.

- Never copy another library's ThemeSpec schema. GPT-Vis has no `extends`, `ink`, `variants`, or arbitrary renderer configuration blocks.
- Use `mark.line.lineWidth`, not the deprecated `style.lineWidth` shorthand.
- Mark style objects do not accept `false`. A theme never switches marks on or off. Chart-local `label: false` remains a chart decision.
- Pie radius, Treemap spacing, WordCloud layout/rotation/size ranges, Liquid wave count, and graph layout stay in chart configuration or internal defaults.
- Global G2 mark paint intentionally excludes arbitrary `fill`; categorical colors come from the palette. Follow each mark's declared fields rather than forwarding arbitrary G2/G6 properties.
- Network graphs support the declared node and edge types. Other relationship graphs preserve their structural node/edge types. Flow diagram HTML nodes remain fixed; style its supported edges and title.
- A grouped Boxplot's internally hidden points must stay hidden. A theme only styles points already emitted by the chart.
- Summary consumes T8 text and construction-time ThemeSpec. It has no `render({ style })` input. Do not invent one.

## Accessibility and coherence

Maintain readable text on backgrounds and filled marks: aim for 4.5:1 for normal text and 3:1 for large text. Distinguish categorical series and retain meaningful positive/negative colors. Set `colorTextInverse` for text on contrasting fills. Do not rely on color alone where the chart already offers labels or shapes.

Choose fonts with defensible fallbacks. A font mentioned in a reference is not automatically available in the browser. Preview typography across G2, G6, Table, and Summary; the same token can serve different visual roles. Use restrained line widths and spacing that remain usable in compact previews.

## Output and validation

Unless the user asks for explanation, return exactly one bare JSON object, without Markdown fences, comments, trailing commas, placeholders, or surrounding text.

Before returning:

- Check strict JSON parsing and `version: "1"`, `id`, and `label`.
- Check every authored field, enum, and value against the linked TypeScript contracts, including chart-specific restrictions.
- Confirm that shared tokens cover surfaces, readable text, palette, and typography; add exact styles only where the references justify them.
- Confirm that the theme contains no data or semantic/layout decisions and does not disable internal marks.
- Check readable contrast, useful category distinctions, and font fallbacks.
- When browser access is available, paste the result into Theme Studio and inspect statistics, relationship graphs, Table, and Summary. Otherwise do not claim visual validation.
