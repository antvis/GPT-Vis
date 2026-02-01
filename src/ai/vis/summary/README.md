# Summary

A narrative text visualization component for creating data interpretation reports and summaries with semantic entity annotations, built with AntV T8.

## What is Summary

Summary is a text visualization component that transforms data into structured narrative text using **T8 Syntax** - a declarative Markdown-like language for creating data narratives. Instead of traditional charts, Summary presents insights through natural language with semantically annotated data entities.

**Key Features:**
- **LLM-Friendly**: Simple syntax ideal for AI-generated content
- **Semantic Annotations**: Mark metrics, trends, and comparisons with meaning
- **Built-in Visualizations**: Mini charts embedded in text
- **Professional Styling**: Consistent, report-quality appearance
- **Theme Support**: Light and dark themes

## Usage

```ts
import { Summary } from '@antv/gpt-vis/ai';

const summary = Summary({
  container: '#container',
  theme: 'light', // optional, default 'light'
});

summary.render(`
  # Sales Report
  
  Total sales reached [¥1,234,567](metric_value, origin=1234567) this quarter,
  showing a [15.2% increase](ratio_value, origin=0.152, assessment="positive") 
  compared to last quarter.
`);

summary.destroy();
```

## Configuration

### Constructor Options (SummaryOptions)

| Property  | Type                  | Default   | Description                   |
| --------- | --------------------- | --------- | ----------------------------- |
| container | string \| HTMLElement | -         | Container element or selector |
| theme     | 'light' \| 'dark'     | 'light'   | Visual theme                  |
| width     | number                | -         | Container width in pixels     |
| height    | number                | -         | Container height in pixels    |

### Render Config

The `render()` method accepts a **T8 Syntax** string (see T8 Syntax Reference below).

```ts
type SummaryConfig = string; // T8 Syntax string
```

## T8 Syntax Reference

T8 Syntax is a Markdown-like language for creating narrative text with semantic entity annotations.

### Document Structure

#### Headings

Use standard Markdown heading syntax:

```
# Level 1 Heading (Main Title)
## Level 2 Heading (Section)
### Level 3 Heading (Subsection)
```

#### Paragraphs

Regular text paragraphs are separated by blank lines:

```
This is the first paragraph.

This is the second paragraph.
```

#### Lists

**Unordered Lists:**
```
- First item
- Second item
- Third item
```

**Ordered Lists:**
```
1. First step
2. Second step
3. Third step
```

### Text Formatting

- **Bold**: `This is **bold text**`
- **Italic**: `This is *italic text*`
- **Underline**: `This is __underlined text__`
- **Links**: `Visit [our website](https://example.com)`

### Entity Annotation Syntax

The core feature of T8 Syntax is **entity annotation** - marking data points with semantic meaning.

#### Basic Syntax

```
[displayText](entityType)
```

**Example:**
```
The [sales revenue](metric_name) reached [¥1.5 million](metric_value).
```

#### With Metadata

```
[displayText](entityType, key1=value1, key2=value2)
```

**Example:**
```
Revenue grew by [15.3%](ratio_value, origin=0.153, assessment="positive").
```

### Entity Types

| Entity Type          | Description                   | Example                                 |
| -------------------- | ----------------------------- | --------------------------------------- |
| `metric_name`        | Name of a metric or KPI       | `[revenue](metric_name)`                |
| `metric_value`       | Primary metric value          | `[¥1.5M](metric_value, origin=1500000)` |
| `other_metric_value` | Secondary metric value        | `[avg: $120](other_metric_value)`       |
| `delta_value`        | Absolute change               | `[+1,200](delta_value)`                 |
| `ratio_value`        | Percentage change             | `[+15.3%](ratio_value, origin=0.153)`   |
| `contribute_ratio`   | Contribution percentage       | `[45%](contribute_ratio, origin=0.45)`  |
| `trend_desc`         | Trend description             | `[rising](trend_desc)`                  |
| `dim_value`          | Dimensional value/category    | `[North America](dim_value)`            |
| `time_desc`          | Time period                   | `[Q3 2024](time_desc)`                  |
| `proportion`         | Proportion or ratio           | `[3 out of 5](proportion, origin=0.6)`  |

### Metadata Fields

#### `origin` (number)

The raw numerical value behind the displayed text.

**Examples:**
- `[¥1.5M](metric_value, origin=1500000)`
- `[23.7%](ratio_value, origin=0.237)`

#### `assessment` (string)

Evaluates whether a change is positive, negative, or neutral.

**Valid values:** `"positive"`, `"negative"`, `"equal"`, `"neutral"`

**Examples:**
- `[increased 15%](ratio_value, assessment="positive")`
- `[dropped 8%](ratio_value, assessment="negative")`

#### `unit` (string)

The unit of measurement for the value.

**Example:**
- `[150](metric_value, unit="units")`

## Examples

### Basic Report

```ts
summary.render(`
  # Q4 Sales Report
  
  ## Overview
  Total [revenue](metric_name) reached [¥5,234,567](metric_value, origin=5234567),
  representing a [15.2% increase](ratio_value, origin=0.152, assessment="positive") 
  compared to Q3.
  
  ## Key Metrics
  - New customers: [1,234](metric_value, origin=1234)
  - Retention rate: [89.5%](ratio_value, origin=0.895)
  - Average order: [¥4,567](metric_value, origin=4567)
`);
```

### With Multiple Sections

```ts
summary.render(`
  # Market Analysis Report
  
  ## Executive Summary
  [Global smartphone shipments](metric_name) reached [1.2 billion units](metric_value, origin=1200000000)
  in [2024](time_desc), showing a [modest decline of 2.1%](ratio_value, origin=-0.021, assessment="negative").
  
  ## Regional Performance
  
  ### Asia-Pacific
  [Asia-Pacific](dim_value) remains the largest market with [680M units](metric_value, origin=680000000),
  accounting for [56.7%](contribute_ratio, origin=0.567) of global sales.
  
  ### North America
  [North America](dim_value) showed [steady growth](trend_desc, assessment="positive") 
  with [220M units](metric_value, origin=220000000).
`);
```

### Dark Theme

```ts
const summaryDark = Summary({
  container: '#container',
  theme: 'dark',
});

summaryDark.render(`
  # Sales Performance
  Revenue reached [¥2.5M](metric_value, origin=2500000), up [18%](ratio_value, origin=0.18, assessment="positive").
`);
```

## Methods

- `render(syntax: string): void` - Render narrative text using T8 Syntax
- `destroy(): void` - Destroy the component and clean up resources

## Best Practices

### Content Guidelines

1. **Use Natural Language**: Write fluent, readable prose
2. **Annotate All Data**: Mark every metric, percentage, and value
3. **Provide Context**: Explain significance, not just numbers
4. **Structure Clearly**: Use headings and sections logically
5. **Add Metadata**: Include `origin`, `assessment` for richer visualization

### Entity Annotation Tips

✅ **DO annotate:**
- All numeric values and percentages
- Metric names and KPIs
- Time periods and geographic regions
- Trends and changes
- Comparisons and contributions

❌ **DON'T annotate:**
- Generic text without data meaning
- Connecting phrases
- Context without measurable concepts

## References

- [T8 GitHub Repository](https://github.com/antvis/T8)
- [T8 Documentation](https://github.com/antvis/T8/blob/main/site/en/tutorial/quick-start.md)
- [T8 Skill Guide](https://github.com/antvis/chart-visualization-skills/blob/master/skills/narrative-text-visualization/SKILL.md)
