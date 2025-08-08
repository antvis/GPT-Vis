---
order: 1
group:
  order: 3
  title: Text
toc: content
---

# VisText

## Code Examples

### Basic Usage

<code src="./demos/common"></code>

### Markdown Protocol

<code src="./demos/markdown"></code>

### Customize via ConfigProvider

- Modify the encoding styles for built-in `entityType`s (e.g., swap red-up/green-down to red-down/green-up)
- Define encoding styles for custom `entityType`s (e.g., add an “Action Suggestion” entity type)

<code src="./demos/custom-markdown"></code>

## API

### VisTextProps

| Property | Type   | Required | Default | Description                                                                |
| -------- | ------ | -------- | ------- | -------------------------------------------------------------------------- |
| type     | string | No       | -       | Entity type                                                                |
| children | string | No       | -       | Text content                                                               |
| origin   | any    | No       | -       | Original data, e.g., unformatted metrics, proportions, trend details, etc. |

### GlobalConfig.components.VisText

Customize VisText globally via `ConfigProvider`.

```tsx | pure
<ConfigProvider
  components={{
    VisText: {}, // type: TextConfig
  }}
>
  <MarkdownRender></MarkdownRender>
</ConfigProvider>;

/** Text component configuration */
export type TextConfig =
  // Mapping for entity phrase types
  Record<InnerEntityType & string, TextEncoding> & {
    // Static component mapping, e.g., icon and mini-chart
    __statics: Record<string, React.FC<VisTextProps>>;
  };
```
