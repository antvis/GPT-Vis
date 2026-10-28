# GPT-Vis Theme Creator

Create one coherent visual theme from the user's references, ready to paste into [Theme Studio](https://gpt-vis.antv.vision/themes). This document contains the supported ThemeSpec configuration; creating a theme does not require reading repository code or another chart library's documentation.

ThemeSpec requires GPT-Vis `1.0.3` or later.

## Workflow and output

Identify the reference's backgrounds, text hierarchy, categorical colors, semantic colors, typography, corners, line weight, and density. Ask only for missing information that materially changes the design. Start with tokens; add shared styles and per-chart exceptions when they serve the reference.

Unless the user requests an explanation, return exactly one complete JSON object. No Markdown fences, comments, trailing commas, placeholders, functions, or surrounding prose. Only `id` and `label` are required. Omit optional settings without a deliberate design decision; “complete” means ready to use, not that every field must be filled.

```json
{
  "id": "my-theme",
  "label": "My theme",
  "description": "A short description of the visual direction.",
  "baseTheme": "default",
  "tokens": {},
  "style": {},
  "charts": {}
}
```

## Structure, precedence, and boundaries

| Field                 | Type / values                                 | Purpose and guidance                                                                                                                                                           |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                  | Non-empty string                              | Required identifier. Use a stable identifier with lowercase words joined by hyphens, e.g. `coastal-product`. This is metadata, not a registered theme name.                    |
| `label`               | Non-empty string                              | Required display name.                                                                                                                                                         |
| `description`         | String                                        | Optional short visual description.                                                                                                                                             |
| `baseTheme`           | `"default"`, `"light"`, `"dark"`, `"academy"` | Defaults to `"default"`; `"light"` is its alias. Choose `"dark"` for dark surfaces, `"academy"` for academic defaults. G6, Table, and Summary map Academy to their light base. |
| `tokens`              | Object                                        | Shared design decisions, expanded into the supported styles below.                                                                                                             |
| `style`               | Object                                        | Shared precise visual overrides, applied after tokens.                                                                                                                         |
| `charts`              | Object keyed by chart type                    | Visual exceptions, e.g. `"charts": { "pie": { "style": { ... } } }`. Supported keys are listed in the chart table below.                                                       |
| `charts.<type>.style` | Same structure as `style`                     | Per-chart visual overrides. There is no per-chart `tokens`, `data`, or layout block here.                                                                                      |

Priority, highest first: **single-chart configuration > custom ThemeSpec > GPT-Vis built-in theme**. Within the theme, the order is built-in defaults → tokens → shared `style` → `charts.<type>.style` → local chart `style`. Nested objects merge; arrays replace. Explicit zero values are meaningful. Omitted fields retain the underlying defaults.

Pass a custom ThemeSpec as an object, not its `id`. A chart-level `theme` replaces the constructor's theme selection rather than merging a second theme into it. Summary receives T8 text and its theme at construction; it has no per-render `{ style }` configuration.

A theme controls appearance. It must not include chart data, encodings, aggregation, sorting, title/subtitle **content**, axis titles, layout algorithms, interaction behaviors, or renderer plugins. There is no `extends`, `variants`, `ink`, or arbitrary G2/G6 configuration block. Unknown style fields are discarded, so do not invent them.

## Value conventions

| Value kind                                | Meaning and guidance                                                                                                                                                  |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Color                                     | CSS color string, preferably hex or `rgba(...)`. Never a token-name reference such as `"colorText"`; precise styles need the actual color value.                      |
| Size, width, radius, spacing, line height | JSON number in **pixels**, not a CSS string or a unitless line-height multiplier. Use non-negative values except shadow offsets, which may be negative.               |
| Opacity                                   | Number from `0` to `1`; `0` is fully transparent.                                                                                                                     |
| Font family                               | CSS font-family string with fallbacks, e.g. `"Georgia, 'Times New Roman', serif"`. The theme does not load fonts.                                                     |
| Font weight                               | Number, usually `400`–`700`, or `"normal"`, `"bold"`.                                                                                                                 |
| Dash pattern                              | Number array, e.g. `[4, 2]` for a dashed stroke; `[0, 0]` for solid.                                                                                                  |
| Visibility                                | Component flags such as `axis.grid` may be booleans. Mark/style blocks are objects, never `false`; a theme cannot enable or disable marks.                            |
| Native names                              | `fill` means text/shape color; `stroke` means outline color. Prefixes name the target, e.g. `titleFill`, `labelFill`, `nodeStroke`. Keep these stable renderer names. |

## Shared tokens: `tokens`

Recommendations are starting points, not hard defaults. Each token affects only the consumers listed; it does not rewrite every renderer's internal options.

| Token                | Type        | Actual effect                                                                                                                                      | Recommendation                                                                                                                                                     |
| -------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `colorDefault`       | Color       | Fallback palette color when neither category palette is supplied; Liquid outline; Summary metric values and links.                                 | Brand accent. Align it with the first categorical color unless deliberately different.                                                                             |
| `colorBackground`    | Color       | Chart canvas / graph container / Table and Summary wrapper background.                                                                             | Set explicitly for a complete light or dark theme.                                                                                                                 |
| `colorSurface`       | Color       | Table header/body backgrounds; Liquid's unfilled container; existing G2 and Organization Chart tooltip backgrounds.                                | A subtle surface distinct from the canvas. Does not recolor Theme Studio cards.                                                                                    |
| `colorText`          | Color       | Main title, legend text, G6 node labels, Table/Summary text, Liquid percentage, supported G2 labels, and tooltip values/content.                   | Maintain at least 4.5:1 contrast against the relevant background.                                                                                                  |
| `colorTextSecondary` | Color       | Subtitles, G2 axis labels/titles, G6 edge labels, and G2 tooltip titles/item names.                                                                | Muted but readable. Does not set Summary entity colors.                                                                                                            |
| `colorTextInverse`   | Color       | Contrasting text for inside G2 labels; the renderer can choose between it and `colorText`.                                                         | Usually white for dark filled marks, dark ink for bright fills. Does not automatically recolor G6 filled-node labels.                                              |
| `colorStroke`        | Color       | G2 axes/ticks/grids, G6 nodes/edges, Table/Summary borders, Liquid/Sankey outlines, and tooltip borders/dividers.                                  | A quiet structural color; keep tooltip boundaries visible against their surface.                                                                                   |
| `colorPositive`      | Color       | Positive semantic text in Summary.                                                                                                                 | Usually green or a culturally appropriate positive color. Does not set Waterfall bars.                                                                             |
| `colorNegative`      | Color       | Negative semantic text in Summary.                                                                                                                 | Distinguish clearly from the positive color. Does not set Waterfall bars.                                                                                          |
| `colorNeutral`       | Color       | Summary's other/neutral value text.                                                                                                                | Readable supporting color.                                                                                                                                         |
| `category10`         | Color array | Primary categorical palette, assigned in order to chart series, groups, or graph branches.                                                         | Usually 6–10 distinct colors; the name does not require exactly ten entries.                                                                                       |
| `category20`         | Color array | Alternative extended palette, used **only when `category10` is absent**.                                                                           | Not appended to `category10`; set one palette unless there is a reason to keep both. The name does not require exactly twenty entries.                             |
| `fontFamily`         | Font family | G2 titles/axes/legends/labels, G6 labels, Table, Summary, Liquid/WordCloud text, and existing tooltips.                                            | Use a font actually available to the user and a generic fallback.                                                                                                  |
| `fontSize`           | Number      | Base G2 component/label, G6 label, Table/Summary, and tooltip size; shared title size is this value **plus 4px**.                                  | `11`–`14` for compact charts, `14`–`16` for larger presentations. Does not set Liquid percentage or WordCloud's data-driven sizes.                                 |
| `fontWeight`         | Font weight | Shared titles, G2 component/label text, G6 labels, Table/Liquid/Sankey text, and tooltip base text; tooltip headings/values retain their emphasis. | `400` or `500`; give titles an explicit heavier style if needed. Summary does not consume this token.                                                              |
| `lineHeight`         | Number      | G2 data labels, legend item labels, Summary text, and existing tooltip line height.                                                                | Pixels, e.g. `20` for `fontSize: 12`; **not `1.5`**. Does not set G6 label line height or Table cell line height.                                                  |
| `spacingSmall`       | Number      | G2 axis label-to-axis gap; legend title/item spacing and row padding; tooltip vertical padding.                                                    | `4`–`8`. This is a compact shared gap, not canvas padding or chart layout spacing.                                                                                 |
| `spacingMedium`      | Number      | Title-to-subtitle gap; G2 axis title spacing and legend column padding; Table cell padding on all sides; tooltip horizontal padding.               | `8`–`16`. For a single exception, override `title.spacing`, `axis.titleSpacing`, or `table.cell.padding`. Does not change graph node gaps or outer canvas padding. |
| `lineWidth`          | Number      | G2 mark/Treemap/Sankey outlines, G6 node/edge strokes, Table borders, axis/tick/grid lines, and tooltip borders/dividers.                          | Start with `1`–`2`. Override `axis.gridLineWidth` to `0.5`–`1` if grids become too heavy. Does not change area opacity or Liquid outline thickness.                |
| `radius`             | Number      | Interval/Treemap corners, G6 node corners where supported, Table outer corners, and tooltip corners.                                               | `0` for square, `4`–`8` for restrained rounding, `10`–`16` for a softer product feel. Not Pie radius, graph node size, or graph edge curvature.                    |

Palette selection is `style.palette` → `tokens.category10` → `tokens.category20` → `[tokens.colorDefault]` → built-in palette. An explicit palette array replaces the inherited one. Supply a non-empty palette. For **Waterfall**, use `charts.waterfall.style.palette` with `[positive, negative, total]`; Summary semantic tokens do not control those slots.

### Tooltips

Existing G2 tooltips and the Organization Chart tooltip consume the shared tokens above: `colorSurface` for the background, `colorText` for values/content, `colorTextSecondary` for G2 titles/item names, `colorStroke` for borders/dividers, typography tokens for text, `spacingSmall` / `spacingMedium` for vertical/horizontal padding, `lineWidth` for borders/dividers, and `radius` for corners. Omitted tokens preserve the `baseTheme` appearance.

There is no `style.tooltip` namespace. These tokens style existing tooltips; they do not change content, visibility, triggers, or interactions, and do not add tooltips to charts that have none. Other G6 relationship charts, Table, and Summary do not currently provide tooltips.

## Style namespaces: `style` and `charts.<type>.style`

| Field             | Type                   | Purpose and guidance                                                                                                            |
| ----------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `backgroundColor` | Color                  | Override canvas/container background without changing the other tokens.                                                         |
| `palette`         | Color array            | Override the categorical palette. Graphs use it for branches/groups; Table and Summary do not consume it.                       |
| `title`           | Object                 | Shared title and subtitle appearance; text comes from chart configuration.                                                      |
| `axis`            | Object                 | Shared G2 axis appearance, applied to both axes. No `x`/`y` child blocks.                                                       |
| `legend`          | Object                 | Appearance of a chart's existing color legend. Does not make a hidden legend visible.                                           |
| `label`           | Object                 | Appearance of supported G2 data labels. Not G6 node labels, axis labels, or every chart's internal labels.                      |
| `mark`            | Object                 | Supported G2 mark appearance, keyed by the mark names below.                                                                    |
| `node`            | Object                 | Supported G6 node appearance, not G2 marks.                                                                                     |
| `edge`            | Object                 | Supported G6 edge appearance.                                                                                                   |
| `table`           | Object                 | Contains `header`, `cell`, and `border` objects.                                                                                |
| `summary`         | Object                 | T8 Summary text appearance.                                                                                                     |
| `texture`         | `"rough"`, `"default"` | Fishbone drawing texture only. Does not change the layout.                                                                      |
| `lineWidth`       | Number, deprecated     | Existing chart-local shorthand for Line, Area, Radar. For new themes use `mark.line.lineWidth`; do not generate this shorthand. |

### Chart capabilities

A shared theme may contain multiple namespaces. Each chart consumes its supported subset; use this table for `charts.<type>.style` exceptions. All charts support `backgroundColor`; all except Table and Summary also consume `palette`.

| Chart key            | Component blocks                   | G2 marks under `mark`   | G6 / special fields                                                 |
| -------------------- | ---------------------------------- | ----------------------- | ------------------------------------------------------------------- |
| `area`               | `title`, `axis`, `legend`          | `area`, `line`, `point` | —                                                                   |
| `bar`                | `title`, `axis`, `legend`, `label` | `interval`              | —                                                                   |
| `boxplot`            | `title`, `axis`, `legend`          | `box`, `point`          | Theme cannot reveal internally hidden grouped-box points.           |
| `column`             | `title`, `axis`, `legend`, `label` | `interval`              | —                                                                   |
| `dual-axes`          | `title`, `axis`, `legend`          | `interval`, `line`      | —                                                                   |
| `fishbone-diagram`   | `title`                            | —                       | `node`, `edge`, `texture`; leaf nodes accept label appearance only. |
| `flow-diagram`       | `title`                            | —                       | `edge`; HTML node appearance is fixed.                              |
| `funnel`             | `title`, `label`                   | `interval`, `connector` | —                                                                   |
| `histogram`          | `title`, `axis`                    | `interval`              | —                                                                   |
| `indented-tree`      | `title`                            | —                       | `node`, `edge`                                                      |
| `line`               | `title`, `axis`, `legend`          | `line`, `point`         | —                                                                   |
| `liquid`             | `title`                            | `liquid`                | Content text is styled inside `mark.liquid`.                        |
| `mindmap`            | `title`                            | —                       | `node`, `edge`                                                      |
| `network-graph`      | `title`                            | —                       | `node`, `edge`; can also choose their `type`.                       |
| `organization-chart` | `title`                            | —                       | `node`, `edge`                                                      |
| `pie`                | `title`, `legend`, `label`         | `interval`              | Donut/pie radius remains chart configuration.                       |
| `radar`              | `title`, `axis`, `legend`          | `line`                  | —                                                                   |
| `sankey`             | `title`                            | `sankey`                | Labels are styled inside `mark.sankey`.                             |
| `scatter`            | `title`, `axis`, `legend`          | `point`                 | —                                                                   |
| `summary`            | `summary`                          | —                       | Construction-time theme; no title or palette style block.           |
| `table`              | `title`, `table`                   | —                       | `table.header`, `table.cell`, `table.border`                        |
| `treemap`            | `title`                            | `treemap`               | Internal labels have fixed sizing; no `label` block.                |
| `venn`               | `title`, `label`                   | `path`                  | —                                                                   |
| `violin`             | `title`, `axis`, `legend`          | `density`, `box`        | —                                                                   |
| `waterfall`          | `title`, `axis`, `label`           | `interval`, `link`      | Palette order: positive, negative, total.                           |
| `word-cloud`         | `title`                            | `wordCloud`             | Note the camelCase mark key; font sizes stay data-driven.           |

### Title: `style.title`

Supported by G2, G6, and Table. G6 reserves title space from typography automatically. The block does not create a title when chart title content is absent.

| Field                 | Type                            | Meaning / recommendation                                                                         |
| --------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `align`               | `"left"`, `"center"`, `"right"` | Alignment of title and subtitle.                                                                 |
| `spacing`             | Number                          | Vertical gap between title and subtitle; start at `4`–`12`. Not the distance from title to plot. |
| `titleFill`           | Color                           | Main title text color.                                                                           |
| `titleFillOpacity`    | Opacity                         | Main title text opacity; usually `1`.                                                            |
| `titleFontFamily`     | Font family                     | Main title typeface.                                                                             |
| `titleFontSize`       | Number                          | Main title size; usually `16`–`24`.                                                              |
| `titleFontWeight`     | Font weight                     | Main title weight; usually `600`–`700`.                                                          |
| `subtitleFill`        | Color                           | Supporting title text color.                                                                     |
| `subtitleFillOpacity` | Opacity                         | Subtitle opacity.                                                                                |
| `subtitleFontFamily`  | Font family                     | Subtitle typeface.                                                                               |
| `subtitleFontSize`    | Number                          | Subtitle size; usually `11`–`14`.                                                                |
| `subtitleFontWeight`  | Font weight                     | Subtitle weight; usually `400`–`500`.                                                            |

### Axes: `style.axis`

Appearance of existing G2 axes. Set `line`, `tick`, or `grid` individually; the `axis` block itself is an object. These flags are component decoration, not mark visibility.

| Field               | Type         | Meaning / recommendation                                                   |
| ------------------- | ------------ | -------------------------------------------------------------------------- |
| `line`              | Boolean      | Show the axis baseline.                                                    |
| `lineStroke`        | Color        | Baseline color.                                                            |
| `lineStrokeOpacity` | Opacity      | Baseline opacity.                                                          |
| `lineLineWidth`     | Number       | Baseline stroke width; the doubled `line` is the native name, usually `1`. |
| `lineLineDash`      | Dash pattern | Baseline dash pattern.                                                     |
| `tick`              | Boolean      | Show tick marks.                                                           |
| `tickStroke`        | Color        | Tick mark stroke color.                                                    |
| `tickStrokeOpacity` | Opacity      | Tick stroke opacity.                                                       |
| `tickOpacity`       | Opacity      | Overall tick opacity.                                                      |
| `tickLineWidth`     | Number       | Tick stroke width, usually `1`.                                            |
| `tickLength`        | Number       | Tick length, usually `3`–`5`.                                              |
| `grid`              | Boolean      | Show grid lines.                                                           |
| `gridStroke`        | Color        | Grid line color, softer than data strokes.                                 |
| `gridStrokeOpacity` | Opacity      | Grid stroke opacity.                                                       |
| `gridLineWidth`     | Number       | Grid stroke width, usually `0.5`–`1`.                                      |
| `gridLineDash`      | Dash pattern | Grid dash pattern; `[2, 3]` for a restrained dotted/dashed grid.           |
| `labelFill`         | Color        | Axis tick-label text color.                                                |
| `labelFillOpacity`  | Opacity      | Tick-label fill opacity.                                                   |
| `labelOpacity`      | Opacity      | Overall tick-label opacity.                                                |
| `labelFontFamily`   | Font family  | Tick-label typeface.                                                       |
| `labelFontSize`     | Number       | Tick-label size, usually `10`–`13`.                                        |
| `labelFontWeight`   | Font weight  | Tick-label weight.                                                         |
| `labelSpacing`      | Number       | Gap between tick labels and the axis, usually `4`–`8`.                     |
| `titleFill`         | Color        | Axis title text color; does not set its content.                           |
| `titleFillOpacity`  | Opacity      | Axis title fill opacity.                                                   |
| `titleOpacity`      | Opacity      | Overall axis title opacity.                                                |
| `titleFontFamily`   | Font family  | Axis title typeface.                                                       |
| `titleFontSize`     | Number       | Axis title size, usually `11`–`14`.                                        |
| `titleFontWeight`   | Font weight  | Axis title weight.                                                         |
| `titleSpacing`      | Number       | Gap between the axis title and axis content, usually `8`–`16`.             |

### Legend: `style.legend`

Styles a legend already emitted by the chart; it does not control its existence, position, or title content.

| Field                     | Type                   | Meaning / recommendation                                                                                                                                       |
| ------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `titleFill`               | Color                  | Legend title color.                                                                                                                                            |
| `titleFillOpacity`        | Opacity                | Legend title opacity.                                                                                                                                          |
| `titleFontFamily`         | Font family            | Legend title typeface.                                                                                                                                         |
| `titleFontSize`           | Number                 | Legend title size.                                                                                                                                             |
| `titleFontWeight`         | Font weight            | Legend title weight.                                                                                                                                           |
| `titleSpacing`            | Number                 | Gap after the title, usually `4`–`8`.                                                                                                                          |
| `itemLabelFill`           | Color                  | Legend entry text color.                                                                                                                                       |
| `itemLabelFillOpacity`    | Opacity                | Entry text opacity.                                                                                                                                            |
| `itemLabelFontFamily`     | Font family            | Entry typeface.                                                                                                                                                |
| `itemLabelFontSize`       | Number                 | Entry text size, usually `11`–`13`.                                                                                                                            |
| `itemLabelFontWeight`     | Font weight            | Entry text weight.                                                                                                                                             |
| `itemLabelLineHeight`     | Number                 | Entry text line height in pixels.                                                                                                                              |
| `itemLabelLetterSpacing`  | Number                 | Entry text tracking in pixels; usually `0`.                                                                                                                    |
| `itemSpacing`             | Number or number array | Gaps between the marker, label, value, and focus icon inside each entry. Use `4`–`8` or `[6, 6, 3]`; `rowPadding` / `colPadding` control gaps between entries. |
| `itemMarkerSize`          | Number                 | Legend swatch/marker size, usually `8`–`12`.                                                                                                                   |
| `itemMarkerFillOpacity`   | Opacity                | Swatch fill opacity.                                                                                                                                           |
| `itemMarkerStroke`        | Color                  | Swatch outline color.                                                                                                                                          |
| `itemMarkerStrokeOpacity` | Opacity                | Swatch outline opacity.                                                                                                                                        |
| `itemMarkerLineWidth`     | Number                 | Swatch outline width.                                                                                                                                          |
| `rowPadding`              | Number                 | Spacing between legend rows.                                                                                                                                   |
| `colPadding`              | Number                 | Spacing between legend columns.                                                                                                                                |

### Data labels: `style.label`

Use only on the chart types listed with `label` above. For graphs use `node.label*` / `edge.label*`; for Sankey or Liquid use their mark-specific fields. Label placement, text, transforms, and visibility stay chart-owned. Inside G2 labels can use automatic text contrast; setting `fill` explicitly overrides it.

| Field           | Type                   | Meaning / recommendation                                                               |
| --------------- | ---------------------- | -------------------------------------------------------------------------------------- |
| `fill`          | Color                  | Label text color. Usually prefer automatic `colorText` / `colorTextInverse` selection. |
| `fillOpacity`   | Opacity                | Text fill opacity.                                                                     |
| `stroke`        | Color                  | Text outline/halo color, useful on busy backgrounds.                                   |
| `strokeOpacity` | Opacity                | Text outline opacity.                                                                  |
| `lineWidth`     | Number                 | Text outline width, usually `0`–`2`.                                                   |
| `opacity`       | Opacity                | Whole label opacity.                                                                   |
| `fontFamily`    | Font family            | Label typeface.                                                                        |
| `fontSize`      | Number                 | Label text size, usually `10`–`14`; small cards need restrained sizing.                |
| `fontWeight`    | Font weight            | Label weight.                                                                          |
| `fontStyle`     | `"normal"`, `"italic"` | Label font style.                                                                      |
| `lineHeight`    | Number                 | Label line height in pixels.                                                           |

## G2 marks: `style.mark`

Mark keys are `line`, `area`, `point`, `interval`, `box`, `connector`, `path`, `density`, `link`, `liquid`, `treemap`, `sankey`, and `wordCloud`. Each value is an object. These settings style existing geometry; they do not add/remove a mark or change chart layout.

### Common mark paint

These fields apply to `line`, `area`, `point`, `interval`, `box`, `connector`, `path`, `density`, `link`, `liquid`, and `treemap`. `sankey` and `wordCloud` use only their dedicated tables.

| Field           | Type         | Meaning / recommendation                                                       |
| --------------- | ------------ | ------------------------------------------------------------------------------ |
| `fillOpacity`   | Opacity      | Filled shape opacity. Area usually `0.1`–`0.3`; solid bars usually `0.85`–`1`. |
| `strokeOpacity` | Opacity      | Outline opacity.                                                               |
| `lineWidth`     | Number       | Stroke width; Line usually `2`–`3`, outlines usually `0.5`–`1.5`.              |
| `lineDash`      | Dash pattern | Stroke dash pattern.                                                           |
| `opacity`       | Opacity      | Overall mark opacity.                                                          |
| `shadowColor`   | Color        | Shadow color; use low-opacity dark ink or omit it.                             |
| `shadowBlur`    | Number       | Shadow blur radius; small values such as `2`–`6`.                              |
| `shadowOffsetX` | Number       | Horizontal shadow offset.                                                      |
| `shadowOffsetY` | Number       | Vertical shadow offset.                                                        |

There is **no generic mark `fill`**. Data colors come from the palette. Only the mark-specific tables below allow an explicit `stroke`. `shape` is also mark-specific, not a generic renderer option.

### Additional simple-mark fields

Common paint above remains available for each row's mark.

| Field path under `mark`          | Type                                   | Meaning / recommendation                                                                                                        |
| -------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `line.shape`                     | Shape string                           | Line interpolation/shape; see allowed shapes below. Prefer `"line"` for literal trends, `"smooth"` for a softer style.          |
| `line.lineCap`                   | `"butt"`, `"round"`, `"square"`        | Stroke endpoints. `"round"` is softer.                                                                                          |
| `line.lineJoin`                  | `"miter"`, `"round"`, `"bevel"`        | Stroke joins.                                                                                                                   |
| `area.shape`                     | Shape string                           | Area interpolation. Keep it coherent with `line.shape` when both marks are present.                                             |
| `point.shape`                    | Shape string                           | Point symbol; see the catalog below.                                                                                            |
| `point.size`                     | Number                                 | G2 point size channel; start at `3`–`6`, not a guaranteed CSS diameter.                                                         |
| `point.stroke`                   | Color                                  | Point outline; canvas color helps separate overlapping points.                                                                  |
| `interval.shape`                 | Shape string                           | Bar/sector/funnel shape. Preserve chart meaning; prefer `"rect"` / `"hollow"` for ordinary bars and the default for Pie/Funnel. |
| `interval.stroke`                | Color                                  | Bar/sector outline or separator.                                                                                                |
| `interval.radius`                | Number                                 | Uniform corner rounding. Overrides chart-owned individual corner defaults. Not the Pie/donut radius.                            |
| `interval.radiusTopLeft`         | Number                                 | Specific corner radius; wins over uniform `radius`.                                                                             |
| `interval.radiusTopRight`        | Number                                 | Specific corner radius.                                                                                                         |
| `interval.radiusBottomLeft`      | Number                                 | Specific corner radius.                                                                                                         |
| `interval.radiusBottomRight`     | Number                                 | Specific corner radius.                                                                                                         |
| `box.shape`                      | `"box"`, `"violin"`                    | Native box shape; normally preserve the chart's default.                                                                        |
| `box.stroke`                     | Color                                  | Box/whisker outline.                                                                                                            |
| `path.shape`                     | `"path"`, `"hollow"`                   | Venn region path treatment.                                                                                                     |
| `path.stroke`                    | Color                                  | Venn region outline.                                                                                                            |
| `density.stroke`                 | Color                                  | Violin density outline; there is no exposed `density.shape`.                                                                    |
| `link.shape`                     | `"link"`, `"smooth"`, `"arc"`, `"vhv"` | Waterfall connector shape; normally retain `"link"`.                                                                            |
| `link.stroke`                    | Color                                  | Waterfall connector color.                                                                                                      |
| `connector.stroke`               | Color                                  | Funnel connector color.                                                                                                         |
| `connector.endMarker`            | Boolean                                | Whether the connector's end marker is painted. Does not toggle the connector mark.                                              |
| `connector.endMarkerSize`        | Number                                 | End marker size.                                                                                                                |
| `connector.endMarkerFill`        | Color                                  | End marker fill color.                                                                                                          |
| `connector.endMarkerFillOpacity` | Opacity                                | End marker opacity.                                                                                                             |

| Mark       | Accepted `shape` strings                                                                                                                                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `line`     | `line`, `smooth`, `hv`, `vh`, `hvh`, `trail`                                                                                                                                                                                                                           |
| `area`     | `area`, `smooth`, `hv`, `vh`, `hvh`                                                                                                                                                                                                                                    |
| `point`    | `point`, `hollow`, `circle`, `hollowCircle`, `square`, `hollowSquare`, `diamond`, `hollowDiamond`, `triangle`, `hollowTriangle`, `triangleDown`, `hollowTriangleDown`, `hexagon`, `hollowHexagon`, `bowtie`, `hollowBowtie`, `cross`, `plus`, `hyphen`, `line`, `tick` |
| `interval` | `rect`, `hollow`, `funnel`, `pyramid`                                                                                                                                                                                                                                  |
| `box`      | `box`, `violin`                                                                                                                                                                                                                                                        |
| `path`     | `path`, `hollow`                                                                                                                                                                                                                                                       |
| `link`     | `link`, `smooth`, `arc`, `vhv`                                                                                                                                                                                                                                         |

The catalog lists native names, not a recommendation to change every shape. Do not apply one `shape` string indiscriminately to different mark kinds. Area and its outline use separate marks: set both `mark.area.shape` and `mark.line.shape` to `"smooth"` for matching smooth interpolation. Straight interpolation uses `"area"` for the area and `"line"` for its outline.

### Liquid: `style.mark.liquid`

Common paint is supported, plus every field below. Percentage text, wave count/wavelength, and data remain chart-owned. Global `fontSize` does not size the percentage; use `contentFontSize`.

| Field                     | Type                                                     | Meaning / recommendation                                                    |
| ------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- |
| `shape`                   | `"circle"`, `"rect"`, `"diamond"`, `"triangle"`, `"pin"` | Container silhouette. A chart-local `shape` configuration takes precedence. |
| `contentFill`             | Color                                                    | Percentage text color.                                                      |
| `contentStroke`           | Color                                                    | Percentage text halo/outline color.                                         |
| `contentStrokeOpacity`    | Opacity                                                  | Percentage text outline opacity.                                            |
| `contentLineWidth`        | Number                                                   | Percentage text outline width.                                              |
| `contentFontFamily`       | Font family                                              | Percentage typeface.                                                        |
| `contentFontSize`         | Number                                                   | Percentage size; usually `24`–`40` for preview-sized charts.                |
| `contentFontWeight`       | Font weight                                              | Percentage weight.                                                          |
| `backgroundFill`          | Color                                                    | The unfilled container surface behind the liquid, not the chart canvas.     |
| `backgroundFillOpacity`   | Opacity                                                  | Container surface opacity.                                                  |
| `backgroundStroke`        | Color                                                    | Container surface outline.                                                  |
| `backgroundStrokeOpacity` | Opacity                                                  | Container outline opacity.                                                  |
| `backgroundLineWidth`     | Number                                                   | Container outline width.                                                    |
| `outlineBorder`           | Number                                                   | Outer silhouette border thickness; usually `1`–`3`. Not layout padding.     |
| `outlineStroke`           | Color                                                    | Outer silhouette stroke.                                                    |
| `outlineStrokeOpacity`    | Opacity                                                  | Outer silhouette opacity.                                                   |

### Treemap: `style.mark.treemap`

Common paint is supported, plus:

| Field    | Type   | Meaning / recommendation                                  |
| -------- | ------ | --------------------------------------------------------- |
| `stroke` | Color  | Tile outline/separator.                                   |
| `radius` | Number | Tile corner radius; keep small relative to compact tiles. |

Tile padding, tiling algorithm, and label sizing are not theme fields. `spacingSmall` / `spacingMedium` do not change tile spacing.

### WordCloud: `style.mark.wordCloud`

Only these four fields are supported; the common mark-paint table does not apply.

| Field           | Type        | Meaning / recommendation |
| --------------- | ----------- | ------------------------ |
| `fontFamily`    | Font family | Word typeface.           |
| `opacity`       | Opacity     | Overall word opacity.    |
| `fillOpacity`   | Opacity     | Word fill opacity.       |
| `strokeOpacity` | Opacity     | Word outline opacity.    |

Font-size ranges, rotation, placement, and font-weight ranking are data/layout decisions and stay internal.

### Sankey: `style.mark.sankey`

Only the following fields are supported; use prefixes to address nodes, links, and labels independently.

| Field               | Type        | Meaning / recommendation                               |
| ------------------- | ----------- | ------------------------------------------------------ |
| `nodeFillOpacity`   | Opacity     | Sankey node fill opacity.                              |
| `nodeStroke`        | Color       | Node outline color.                                    |
| `nodeStrokeOpacity` | Opacity     | Node outline opacity.                                  |
| `nodeLineWidth`     | Number      | Node outline width.                                    |
| `linkFillOpacity`   | Opacity     | Flow ribbon fill opacity; usually `0.15`–`0.4`.        |
| `linkStroke`        | Color       | Ribbon outline color.                                  |
| `linkStrokeOpacity` | Opacity     | Ribbon outline opacity.                                |
| `linkLineWidth`     | Number      | Ribbon outline width.                                  |
| `labelFill`         | Color       | Sankey label color; `style.label` does not apply here. |
| `labelFillOpacity`  | Opacity     | Label opacity.                                         |
| `labelFontFamily`   | Font family | Label typeface.                                        |
| `labelFontSize`     | Number      | Label size.                                            |
| `labelFontWeight`   | Font weight | Label weight.                                          |

## G6 elements: `style.node` and `style.edge`

The following fields are shared by both element blocks. Do not nest them under another `style` object. Node sizes, label placement/wrapping, graph layout, and arrow/interaction settings are not exposed.

| Field             | Type         | Meaning / recommendation                                                                                                                        |
| ----------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`            | Shape string | Selects native element type **only for Network Graph**; use the catalog below. Other relationship charts keep structural element types.         |
| `stroke`          | Color        | Node or edge outline color.                                                                                                                     |
| `strokeOpacity`   | Opacity      | Outline opacity.                                                                                                                                |
| `lineWidth`       | Number       | Outline width.                                                                                                                                  |
| `lineDash`        | Dash pattern | Outline dash pattern.                                                                                                                           |
| `opacity`         | Opacity      | Whole element opacity.                                                                                                                          |
| `shadowColor`     | Color        | Element shadow color.                                                                                                                           |
| `shadowBlur`      | Number       | Shadow blur radius.                                                                                                                             |
| `shadowOffsetX`   | Number       | Horizontal shadow offset.                                                                                                                       |
| `shadowOffsetY`   | Number       | Vertical shadow offset.                                                                                                                         |
| `radius`          | Number       | Node corner radius where the shape supports it; for polyline edges, bend rounding where supported. Does not size nodes or set layout curvature. |
| `labelFill`       | Color        | Label text color. Explicitly contrast filled hierarchy nodes; `colorTextInverse` is not automatically selected for G6.                          |
| `labelFontFamily` | Font family  | Label typeface.                                                                                                                                 |
| `labelFontSize`   | Number       | Label size. Node measurements follow the theme typography where needed.                                                                         |
| `labelFontWeight` | Font weight  | Label weight.                                                                                                                                   |

Additional node-only fields:

| Field         | Type    | Meaning / recommendation                                                                                                                                                                                           |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fill`        | Color   | Explicit node background; replaces palette-based branch/group fills. Usually omit it to preserve category colors. Use only for a deliberate uniform fill or chart exception. Fishbone leaf nodes stay transparent. |
| `fillOpacity` | Opacity | Softens palette-based fills without replacing category colors. Check label contrast against the actual fill composited over `colorBackground`.                                                                     |

For palette-based node colors, omit `fill` from **both** shared `style.node` and per-chart `charts.<type>.style.node` (for example, `charts.network-graph.style.node`). A fixed color in either block overrides category/branch fills and can make every node the same color even when `tokens.category10` or `style.palette` contains multiple colors. Because nested objects merge, omitting `fill` in a per-chart block does not clear a shared `style.node.fill`; remove the shared field as well. Adjust `stroke`, `lineWidth`, or `fillOpacity` to style nodes while preserving the palette. Set a fixed `fill` only when uniform node colors are deliberately intended.

| Element     | Theme-selectable `type` values for Network Graph                      |
| ----------- | --------------------------------------------------------------------- |
| `node.type` | `circle`, `diamond`, `ellipse`, `hexagon`, `rect`, `star`, `triangle` |
| `edge.type` | `line`, `polyline`, `quadratic`, `cubic`                              |

Do not use HTML, image, or donut nodes; they need data/content outside a theme. Flow Diagram does not consume `node`. Fishbone leaf nodes consume only `labelFill`, `labelFontFamily`, `labelFontSize`, and `labelFontWeight`; filled boxes/paint apply to its root and first-level branches.

## Table: `style.table`

`header` styles column-heading cells; `cell` styles body cells. Both support each field below. Numeric sizes are converted to CSS pixels; `fill` is text color, not cell background.

| Field under `header` or `cell` | Type                               | Meaning / recommendation                                                                                                                  |
| ------------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                         | Color                              | Text color.                                                                                                                               |
| `backgroundColor`              | Color                              | Cell surface color. Give the header clear contrast.                                                                                       |
| `padding`                      | Number or `[vertical, horizontal]` | Cell inner padding in pixels, e.g. `12` or `[8, 12]`. Defaults from `spacingMedium` when provided. Not column gap or table outer padding. |
| `fontFamily`                   | Font family                        | Cell typeface.                                                                                                                            |
| `fontSize`                     | Number                             | Cell text size.                                                                                                                           |
| `fontWeight`                   | Font weight                        | Cell text weight; header usually `600`–`700`.                                                                                             |
| `fontStyle`                    | `"normal"`, `"italic"`             | Cell font style.                                                                                                                          |
| `lineHeight`                   | Number                             | Cell line height in pixels; set here if needed, since the global `lineHeight` token does not feed Table cells.                            |

`style.table.border`:

| Field    | Type                              | Meaning / recommendation                                    |
| -------- | --------------------------------- | ----------------------------------------------------------- |
| `color`  | Color                             | Table outer border and row separator color.                 |
| `width`  | Number                            | Outer border and row separator width, usually `1`.          |
| `style`  | `"solid"`, `"dashed"`, `"dotted"` | Border line treatment.                                      |
| `radius` | Number                            | Table outer corner radius. Does not round individual cells. |

There are no column widths, row heights, alignment, alternate-row, or table-layout options in ThemeSpec.

## Summary: `style.summary`

These are T8 seed options, not G2 label options. They style existing text/entity roles without changing content or semantics.

| Field                 | Type        | Meaning / recommendation                               |
| --------------------- | ----------- | ------------------------------------------------------ |
| `fontFamily`          | Font family | Summary typeface.                                      |
| `fontSize`            | Number      | Base Summary text size, usually `14`–`16`.             |
| `lineHeight`          | Number      | Summary text line height in pixels, usually `22`–`28`. |
| `borderColor`         | Color       | Borders/separators of supported T8 annotations.        |
| `colorBase`           | Color       | Ordinary text color.                                   |
| `colorEntityBase`     | Color       | Fallback entity text color.                            |
| `colorHeadingBase`    | Color       | Heading text color.                                    |
| `colorPositive`       | Color       | Positive/trending-up entity text color.                |
| `colorNegative`       | Color       | Negative/trending-down entity text color.              |
| `colorConclusion`     | Color       | Conclusion entity text color.                          |
| `colorDimensionValue` | Color       | Dimension/category value text color.                   |
| `colorMetricName`     | Color       | Metric name text color.                                |
| `colorMetricValue`    | Color       | Metric value text color; usually the main accent.      |
| `colorOtherValue`     | Color       | Other/neutral value text color.                        |
| `colorLink`           | Color       | Link text color.                                       |

Summary ignores `style.title`, `style.label`, `style.palette`, and `fontWeight`. It uses its own semantic roles above.

## Example: a coherent theme with deliberate exceptions

```json
{
  "id": "coastal-product",
  "label": "Coastal Product",
  "baseTheme": "default",
  "tokens": {
    "colorDefault": "#2563eb",
    "colorBackground": "#f8fbff",
    "colorSurface": "#eef5ff",
    "colorText": "#17324d",
    "colorTextSecondary": "#52687e",
    "colorTextInverse": "#ffffff",
    "colorStroke": "#cbd8e6",
    "colorPositive": "#16835d",
    "colorNegative": "#be3154",
    "colorNeutral": "#64748b",
    "category10": ["#2563eb", "#0e8175", "#9a6700", "#9c3e87", "#7662c8", "#b84f32"],
    "fontFamily": "Arial, sans-serif",
    "fontSize": 12,
    "fontWeight": 400,
    "lineHeight": 20,
    "spacingSmall": 6,
    "spacingMedium": 12,
    "lineWidth": 1,
    "radius": 8
  },
  "style": {
    "title": { "titleFontWeight": 700, "spacing": 6 },
    "axis": { "line": false, "tick": false, "gridLineWidth": 0.5 },
    "mark": {
      "line": { "shape": "smooth", "lineWidth": 2.5 },
      "area": { "shape": "smooth", "fillOpacity": 0.16 },
      "point": { "shape": "point", "size": 4 },
      "sankey": { "linkFillOpacity": 0.25 }
    },
    "table": { "header": { "backgroundColor": "#e0edff", "fontWeight": 700 } },
    "summary": { "fontSize": 15, "lineHeight": 25 }
  },
  "charts": {
    "mindmap": { "style": { "node": { "fillOpacity": 0.18, "labelFill": "#17324d" } } },
    "organization-chart": { "style": { "node": { "fillOpacity": 0.18, "labelFill": "#17324d" } } },
    "liquid": { "style": { "mark": { "liquid": { "contentFontSize": 32 } } } },
    "waterfall": { "style": { "palette": ["#16835d", "#be3154", "#2563eb"] } }
  }
}
```

Adapt the example to the actual reference; do not return its palette unchanged for unrelated requests. For dark themes, set `baseTheme: "dark"` as well as dark surfaces, readable text, and contrasting entity/label colors. Mindmap has both filled and transparent nodes: the example keeps its palette-based fills, softens them with `fillOpacity`, and uses dark labels readable against both treatments. Organization Chart uses the same approach. Check contrast against the composited colors rather than the raw palette alone.

## Validation before returning

- Parse the output as strict JSON; check non-empty `id` and `label`.
- Check each field against the tables in this document and each chart against the capability table. Open style objects do not imply arbitrary renderer API support.
- Use tokens for shared decisions, precise styles for supported exceptions. Do not assume every token controls every chart feature.
- Preserve data, layout, internal defaults, and existing mark visibility. In particular, keep Pie radius, Treemap tile padding, Liquid wave count, WordCloud rotation/size ranges, and graph layout out of the theme.
- Check at least 4.5:1 text contrast, or 3:1 for large text; distinguish categories and preserve semantic positive/negative colors. Do not rely on color alone when existing labels/shapes can communicate the distinction.
- Use available fonts with fallbacks. Check inside labels and filled G6 nodes separately from canvas text. Preserve palette-based branch/group distinctions unless uniform node fills were explicitly intended.
- When browser access is available, paste the JSON into Theme Studio and inspect statistical charts, relationship graphs, Table, and Summary; hover statistical marks and Organization Chart nodes to check tooltip contrast, type, and spacing. Otherwise do not claim visual validation.
