---
order: 2
group:
  order: 2
  title: Maps
demo: { cols: 2 }
toc: content
---

# Path Map

A path map visualizes route and path data.

## Code Examples

<code src='./demos/default.tsx'>Default Map</code>
<code src='./demos/line.tsx'>Custom Style</code>

<code src='./demos/markdown.tsx'>Markdown Protocol</code>

## Spec

```json
{
  "type": "path-map",
  "data": [
    {
      "path": {
        "points": [
          { "longitude": 120.130638, "latitude": 30.219835, "label": "石屋洞" },
          { "longitude": 120.128125, "latitude": 30.219386, "label": "满觉陇" },
          { "longitude": 120.118362, "latitude": 30.217175, "label": "杨梅岭" },
          { "longitude": 120.112958, "latitude": 30.207319, "label": "理安寺" },
          { "longitude": 120.11335, "latitude": 30.202395, "label": "九溪烟树" }
        ]
      },
      "markers": [
        { "longitude": 120.130638, "latitude": 30.219835, "label": "石屋洞" },
        { "longitude": 120.128125, "latitude": 30.219386, "label": "满觉陇" },
        { "longitude": 120.118362, "latitude": 30.217175, "label": "杨梅岭" },
        { "longitude": 120.112958, "latitude": 30.207319, "label": "理安寺" },
        { "longitude": 120.11335, "latitude": 30.202395, "label": "九溪烟树" }
      ]
    },
    {
      "path": {
        "points": [
          { "longitude": 120.100549, "latitude": 30.236875, "label": "飞来峰" },
          { "longitude": 120.101406, "latitude": 30.240826, "label": "灵隐寺" },
          { "longitude": 120.105337, "latitude": 30.236818, "label": "天竺三寺" }
        ]
      },
      "markers": [
        { "longitude": 120.100549, "latitude": 30.236875, "label": "飞来峰" },
        { "longitude": 120.101406, "latitude": 30.240826, "label": "灵隐寺" },
        { "longitude": 120.105337, "latitude": 30.236818, "label": "天竺三寺" }
      ]
    }
  ]
}
```

## API

### PathMapProps

| Property    | Type       | Required | Default | Description  |
| ----------- | ---------- | -------- | ------- | ------------ |
| data        | RoutData[] | Yes      | -       | Data         |
| markerStyle | Marker     | No       | -       | Marker style |
| pathStyle   | Polyline   | No       | -       | Path style   |

### RoutData

| Property | Type         | Required | Default | Description |
| -------- | ------------ | -------- | ------- | ----------- |
| markers  | MarkerData[] | No       | -       | Path labels |
| path     | Polyline     | Yes      | -       | Route path  |

### Polyline

| Property   | Type     | Required | Default | Description   |
| ---------- | -------- | -------- | ------- | ------------- |
| points     | LngLat[] | Yes      | -       | Path points   |
| width      | Polyline | No       | 2       | Path width    |
| color      | string   | No       | #16f    | Color         |
| dottedLine | boolean  | No       | false   | Dashed or not |

### MarkerData

| Property  | Type   | Required | Default | Description |
| --------- | ------ | -------- | ------- | ----------- |
| longitude | number | Yes      | -       | Longitude   |
| latitude  | number | Yes      | -       | Latitude    |
| label     | number | Yes      | -       | Label text  |
