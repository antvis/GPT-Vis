<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | [简体中文](./README.zh-CN.md) | 日本語

<h1 align="center">GPT-Vis</h1>

<div align="center">

GPTs、生成AI、およびLLMプロジェクトのためのコンポーネント。**UIコンポーネントだけではありません**。

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">ドキュメント</a> •
  <a href="/knowledges" target="_blank">知識</a> •
  <a href="https://tbox.alipay.com/experience/202410APr1n200110168?id=20241122F8eB00104644" target="_blank">エージェントデモ</a>
</p>

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" width=500">
</div>

</div>

## ✨ 特徴

- 🤖 **LLMプロトコル**: LLMエージェントカードのための視覚的プロトコルで、LLMの対話型インタラクションとサービスのシリアライズされた出力のために設計されており、AIアプリケーションへの迅速な統合を容易にします。
- 🍡 **LLMコンポーネント**: LLMアプリケーションのために開発されたコンポーネントで、20以上の一般的なVISコンポーネントが組み込まれており、カスタマイズされたUI要件のための便利な拡張メカニズムとアーキテクチャ設計を提供します。
- 📈 **LLMアクセス**: チャート知識ベースとチャート推奨モデルをシームレスにLLMにアクセスし、LLMのために視覚カードを直接出力し、エージェントのための知識ベースと推奨モデルソリューションを提供します。

## 📦 インストール

```bash
$ npm i @antv/gpt-vis --save
```

## 🔨 使用方法

```jsx
import { GPTVis } from '@antv/gpt-vis';

const markdownContent = `
# GPT-VIS \n\nGPTs、生成AI、およびLLMプロジェクトのためのコンポーネント。UIコンポーネントだけではありません。

ここに、2013年から2022年までのHaidilaoのフードデリバリー収益の視覚化があります。年々着実に増加しており、特に最近の年では顕著な*成長*が見られます。

\`\`\`vis-chart
{
  "type": "line",
  "data": [
    { "time":2013,"value":59.3 },
    { "time":2014,"value":64.4 },
    { "time":2015,"value":68.9 },
    { "time":2016,"value":74.4 },
    { "time":2017,"value":82.7 },
    { "time":2018,"value":91.9 },
    { "time":2019,"value":99.1 },
    { "time":2020,"value":101.6 },
    { "time":2021,"value":114.4 },
    { "time":2022,"value":121 }
  ]
}
\`\`\`
`;

export default () => {
  return <GPTVis>{markdownContent}</GPTVis>;
};
```

<details>
<summary>🛠 カスタムレンダラー</summary>

```jsx
import { GPTVisLite, withChartCode, ChartType, Pie } from '@antv/gpt-vis';

const markdownContent = `
\`\`\`my-ui
my data
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "カテゴリ1", "value": 27 },
    { "category": "カテゴリ2", "value": 25 },
    { "category": "カテゴリ3", "value": 18 },
    { "category": "その他", "value": 5 }
  ]
}
\`\`\`
`;

const customRenderers = { 'my-ui': ({ children }) => <div>{children}</div> };
const components = {
  code: withChartCode({
    languageRenderers: customRenderers, // カスタムブロックレンダラーを登録
    components: { [ChartType.Pie]: Pie }, // パイチャートを登録
  }),
};

export default () => {
  return <GPTVisLite components={components}>{markdownContent}</GPTVisLite>;
};
```

</details>

## 🐍 Streamlit

```python
import streamlit as st
from streamlit_gpt_vis import set_gpt_vis

content = '''
ここに、2013年から2022年までのHaidilaoのフードデリバリー収益の視覚化があります。年々着実に増加しており、特に最近の年では顕著な*成長*が見られます。

\`\`\`vis-chart
{"type": "line","data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]}
\`\`\`
'''

set_gpt_vis(content)
```

詳細はこちら 👉 [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/tree/main/bindings/streamlit-gpt-vis)

## ビジュアル知識

[ビジュアル知識ベース](https://github.com/antvis/GPT-Vis/tree/main/knowledges)の目的は、エージェントがさまざまなデータ可視化チャートを理解、選択、作成するのを支援するための包括的かつ体系的なリソースを提供することです。以下は、RAGを通じて評価データセットに基づいて正確なチャートプロトコルを生成するためのメトリクスです。

|               |                         |                      |               |                      |                 |         |
| ------------- | ----------------------- | -------------------- | ------------- | -------------------- | --------------- | ------- |
| Line(Multi)   | Column(Grouped/Stacked) | Pie                  | Area(Stacked) | Bar(Grouped/Stacked) | Scatter(Bubble) | Heatmap |
| 40/40         | 25/27                   | 13/14                | 18/18         | 18/20                | 10/10           | 9/10    |
| Histogram     | Tree Map                | Word Cloud           | Radar         | Dual Axis            | Rich Text NTV   | Pin Map |
| 15/16         | 13/15                   | 11/12                | 23/23         | 13/14                | 7.3/10          | 10/11   |
| Network Graph | Mind Map                | Organizational Chart | Flow Diagram  | Fishbone Diagram     |                 |         |
| 8/10          | 12/14                   | 10/12                | 10/11         | 10/12                |                 |         |
|               |                         |                      |               |                      |                 |         |

注: X/Y形式の数字は、データセットに対して評価されたときのそれぞれのチャートタイプのメトリクスを表しています。

## 🤖 チャート推奨データセット

チャート推奨データセットは、与えられたデータに基づいてチャートタイプを推奨する能力を評価または微調整するために設計されています。データセットは現在、16種類のチャートをカバーしており、各チャートタイプには1〜3の異なるデータシナリオがあり、各シナリオには15以上のチャートデータインスタンスがあります。データセットは継続的に更新されており、使用ケースから収集したチャートデータの提供を歓迎します。データセットの詳細については、[evaluations/recommend](https://github.com/antvis/GPT-Vis/tree/main/evaluations/recommend/README.md)をご覧ください。

## 💻 開発

```bash
# 依存関係をインストール
$ pnpm install

# ドキュメントデモでライブラリを開発
$ pnpm dev

# ライブラリのソースコードをビルド
$ pnpm build
```

## ライセンス

[MIT](./LICENSE)
