---
order: 4
group:
  order: 5
  title: Maps
toc: content
---

# Organization Chart

An organization chart is used to display the hierarchical structure and departmental relationships within an organization.

## Code Examples

### Basic Usage

<code src="./demos/common"></code>

### Markdown Protocol

<code src="./demos/markdown"></code>

## Spec

```json
{
  "type": "organization-chart",
  "data": {
    "name": "Eric Joplin",
    "description": "Chief Executive Officer",
    "children": [
      {
        "name": "Linda Newland",
        "description": "Chief Executive Assistant"
      }
    ]
  }
}
```

## API

### OrganizationChartProps

| Property | Type                    | Required | Default | Description |
| -------- | ----------------------- | -------- | ------- | ----------- |
| data     | `OrganizationChartData` | Yes      | -       | Data        |

### OrganizationChartData

| Property    | Type                      | Required | Default | Description                                                                                                                                                                                                              |
| ----------- | ------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name        | `string`                  | Yes      | -       | Node name that represents a position or department; must be unique                                                                                                                                                       |
| description | `string`                  | No       | -       | Node description, e.g., job responsibilities or department introduction                                                                                                                                                  |
| children    | `OrganizationChartData[]` | No       | -       | Child nodes representing subordinate positions or departments. If there are no children, this field can be omitted. Each child is also an `OrganizationChartData`, allowing recursive nesting to form a multi-level tree |
