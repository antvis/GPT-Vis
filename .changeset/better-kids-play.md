---
'@antv/gpt-vis': minor
---

feat: add Spreadsheet component based on @antv/s2

- Added new Spreadsheet component supporting pivot table and table sheet modes
- Added knowledge document and evaluation datasets
- Spreadsheet is exported but NOT included in DEFAULT_CHART_COMPONENTS to avoid bundle size increase
- Users can register it on demand via `withChartCode({ components: { [ChartType.Spreadsheet]: Spreadsheet } })`
