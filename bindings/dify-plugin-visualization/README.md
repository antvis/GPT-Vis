# Dify Plugin Visualization

A Dify Plugin Visualization Tools for generating charts using [AntV](https://github.com/antvis/). You can also use it with [mcp-server-chart](https://github.com/antvis/mcp-server-chart).

## ✨ Features

Now 15+ charts supported.

<img width="640" alt="mcp-server-chart preview" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZlzKQKoJzsYAAAAAAAAAAAAAemJ7AQ/fmt.webp" />

- `generate_area_chart` - Generate a `area` chart, and return an image URL.
- `generate_bar_chart` - Generate a `bar` chart, and return an image URL.
- `generate_column_chart` - Generate a `column` chart, and return an image URL.
- `generate_dual_axes_chart` - Generate a `dual-axes` chart, and return an image URL.
- `generate_fishbone_diagram` - Generate a `fishbone-diagram` chart, and return an image URL.
- `generate_flow_diagram` - Generate a `flow-diagram` chart, and return an image URL.
- `generate_histogram_chart` - Generate a `histogram` chart, and return an image URL.
- `generate_line_chart` - Generate a `line` chart, and return an image URL.
- `generate_mind_map` - Generate a `mind-map` chart, and return an image URL.
- `generate_network_graph` - Generate a `network-graph` chart, and return an image URL.
- `generate_pie_chart` - Generate a `pie` chart, and return an image URL.
- `generate_radar_chart` - Generate a `radar` chart, and return an image URL.
- `generate_scatter_chart` - Generate a `scatter` chart, and return an image URL.
- `generate_treemap_chart` - Generate a `treemap` chart, and return an image URL.
- `generate_word_cloud_chart` - Generate a `word-cloud` chart, and return an image URL.

## Configuration

### 1. Get Visualization from Plugin Marketplace

The AntV Visualization Chart could be found at the Plugin Marketplace, please install it first.

### 2. Use the tool

You can use the AntV's 15+ visualization chart, both chatflow and workflow applications support adding a AntV visualization chart node.

## 🔨 Development

Install dependencies:

```bash
pip install -r requirements.txt
```

Build the server:

```bash
python -m main
```

## 📄 License

MIT@[AntV](https://github.com/antvis).
