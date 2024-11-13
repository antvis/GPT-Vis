---
order: 3
group:
  order: 10
  title: 其他
demo: { cols: 2 }
---

# ConfigProvider 全局化配置

## 代码演示

<code src="./demos/plot-theme">设置统计图表主题</code>

<code src="./demos/map-config">设置地图 token 和样式</code>
<code src="./demos/components-config">设置组件的默认属性</code>
<code src="./demos/graph-components-config">设置关系图组件的默认属性</code>

## API

| 属性       | 类型                     | 是否必传 | 默认值 | 说明     |
| ---------- | ------------------------ | -------- | ------ | -------- |
| plot       | `PlotGlobalConfig`       | 否       | -      | 图表配置 |
| map        | `MapGlobalConfig`        | 否       | -      | 地图配置 |
| components | `ComponentsGlobalConfig` | 否       | -      | 组件配置 |

### PlotGlobalConfig

| 属性  | 类型      | 是否必传 | 默认值 | 说明                                                                                                 |
| ----- | --------- | -------- | ------ | ---------------------------------------------------------------------------------------------------- |
| theme | `G2Theme` | 否       | -      | 统计图表主题，详见 [plots theme](https://ant-design-charts.antgroup.com/options/plots/theme/academy) |

### MapGlobalConfig

| 属性  | 类型                                       | 是否必传 | 默认值 | 说明           |
| ----- | ------------------------------------------ | -------- | ------ | -------------- |
| style | `'normal' ｜ 'light'  ｜ 'dark' ｜ string` | 否       | -      | 地图样式       |
| token | `string`                                   | 是       | -      | 高德地图 token |

### ComponentsGlobalConfig

| 属性              | 类型                       | 是否必传 | 默认值 | 说明                                                                                                                       |
| ----------------- | -------------------------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| Line              | `LineConfig`               | 否       | -      | 折线图组件默认属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview)               |
| Column            | `ColumnConfig`             | 否       | -      | 柱形图组件默认属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview)               |
| Pie               | `PieConfig`                | 否       | -      | 饼图组件默认属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview)                 |
| Area              | `AreaConfig`               | 否       | -      | 面积图组件默认属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview)               |
| Bar               | `BarConfig`                | 否       | -      | 条形图组件默认属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview)               |
| Scatter           | `ScatterConfig`            | 否       | -      | 散点图组件默认属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview)               |
| Radar             | `RadarConfig`              | 否       | -      | 雷达图组件默认属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview)               |
| Treemap           | `TreemapConfig`            | 否       | -      | 矩阵树图组件默认属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview)             |
| WordCloud         | `WordCloudConfig`          | 否       | -      | 词语图图组件默认属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview)             |
| VisText           | `TextConfig`               | 否       | -      | 可视文本组件个性化定制，详见 [VisText](/components/text#globalconfigcomponentsvistext)                                     |
| PinMap            | `PinMapConfig`             | 否       | -      | 标注地图组件默认属性，详见 [PinMap](/components/pin-map/api)                                                               |
| PathMa            | `PathMapConfig`            | 否       | -      | 路径地图组件默认属性，详见 [PathMa](/components/path-map/api)                                                              |
| HeatMap           | `TextConfig`               | 否       | -      | 热力地图组件默认属性，详见 [HeatMap](/components/heat-map/api)                                                             |
| MindMap           | `MindMapOptions`           | 否       | -      | 思维导图组件默认属性，详见 [Ant Design Charts](https://ant-design-charts.antgroup.com/options/graphs/mind-map)             |
| FlowDiagram       | `FlowGraphOptions`         | 否       | -      | 流程图组件默认属性，详见 [Ant Design Charts](https://ant-design-charts.antgroup.com/options/graphs/flow-graph)             |
| NetworkGraph      | `NetworkGraphOptions`      | 否       | -      | 网络图组件默认属性，详见 [Ant Design Charts](https://ant-design-charts.antgroup.com/options/graphs/network-graph)          |
| OrganizationChart | `OrganizationChartOptions` | 否       | -      | 组织架构图组件默认属性，详见 [Ant Design Charts](https://ant-design-charts.antgroup.com/options/graphs/organization-chart) |
