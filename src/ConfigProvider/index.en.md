---
order: 3
toc: content
group:
  order: 10
  title: Others
demo: { cols: 2 }
---

# ConfigProvider Global Configuration

## Code Demo

<code src="./demos/plot-theme">Set statistical chart theme</code>

<code src="./demos/map-config">Set map token and style</code>
<code src="./demos/components-config">Set component default properties</code>
<code src="./demos/graph-components-config">Set relationship graph component default properties</code>

## API

| Property   | Type                     | Required | Default | Description                      |
| ---------- | ------------------------ | -------- | ------- | -------------------------------- |
| plot       | `PlotGlobalConfig`       | No       | -       | Chart configuration              |
| graph      | `GraphGlobalConfig`      | No       | -       | Relationship graph configuration |
| map        | `MapGlobalConfig`        | No       | -       | Map configuration                |
| components | `ComponentsGlobalConfig` | No       | -       | Component configuration          |

### PlotGlobalConfig

| Property | Type      | Required | Default | Description                                                                                                    |
| -------- | --------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| theme    | `G2Theme` | No       | -       | Statistical chart theme, see [plots theme](https://ant-design-charts.antgroup.com/options/plots/theme/academy) |

### GraphGlobalConfig

Refer to [Ant Design Charts relationship graph configuration items](https://ant-design-charts.antgroup.com/options/graphs/overview).

### MapGlobalConfig

| Property | Type                                       | Required | Default | Description |
| -------- | ------------------------------------------ | -------- | ------- | ----------- |
| style    | `'normal' ｜ 'light'  ｜ 'dark' ｜ string` | No       | -       | Map style   |
| token    | `string`                                   | Yes      | -       | Amap token  |

### ComponentsGlobalConfig

| Property          | Type                       | Required | Default | Description                                                                                                                                        |
| ----------------- | -------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Line              | `LineConfig`               | No       | -       | Line chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview)                    |
| Column            | `ColumnConfig`             | No       | -       | Column chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview)                  |
| Pie               | `PieConfig`                | No       | -       | Pie chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview)                     |
| Area              | `AreaConfig`               | No       | -       | Area chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview)                    |
| Bar               | `BarConfig`                | No       | -       | Bar chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview)                     |
| Scatter           | `ScatterConfig`            | No       | -       | Scatter chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview)                 |
| Radar             | `RadarConfig`              | No       | -       | Radar chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview)                   |
| Treemap           | `TreemapConfig`            | No       | -       | Treemap chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview)                 |
| WordCloud         | `WordCloudConfig`          | No       | -       | Word cloud chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview)              |
| VisText           | `TextConfig`               | No       | -       | Visual text component customization, see [VisText](/components/text#globalconfigcomponentsvistext)                                                 |
| PinMap            | `PinMapConfig`             | No       | -       | Pin map component default properties, see [PinMap](/components/pin-map/api)                                                                        |
| PathMa            | `PathMapConfig`            | No       | -       | Path map component default properties, see [PathMa](/components/path-map/api)                                                                      |
| HeatMap           | `TextConfig`               | No       | -       | Heat map component default properties, see [HeatMap](/components/heat-map/api)                                                                     |
| MindMap           | `MindMapOptions`           | No       | -       | Mind map component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/graphs/mind-map)                     |
| FlowDiagram       | `FlowGraphOptions`         | No       | -       | Flow diagram component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/graphs/flow-graph)               |
| NetworkGraph      | `NetworkGraphOptions`      | No       | -       | Network graph component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/graphs/network-graph)           |
| OrganizationChart | `OrganizationChartOptions` | No       | -       | Organization chart component default properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/graphs/organization-chart) |
