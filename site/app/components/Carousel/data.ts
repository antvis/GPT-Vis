const line =
  'vis line\ndata\n  - time 2019\n    value 320\n    group Cloud\n  - time 2020\n    value 370\n    group Cloud\n  - time 2021\n    value 430\n    group Cloud\n  - time 2022\n    value 500\n    group Cloud\n  - time 2023\n    value 580\n    group Cloud\n  - time 2024\n    value 670\n    group Cloud\n  - time 2019\n    value 140\n    group AI Chip\n  - time 2020\n    value 175\n    group AI Chip\n  - time 2021\n    value 230\n    group AI Chip\n  - time 2022\n    value 310\n    group AI Chip\n  - time 2023\n    value 430\n    group AI Chip\n  - time 2024\n    value 600\n    group AI Chip\n  - time 2019\n    value 30\n    group Green Energy\n  - time 2020\n    value 42\n    group Green Energy\n  - time 2021\n    value 60\n    group Green Energy\n  - time 2022\n    value 88\n    group Green Energy\n  - time 2023\n    value 135\n    group Green Energy\n  - time 2024\n    value 210\n    group Green Energy\nstyle\n  backgroundColor #EDE5FF\n  lineWidth 2';

const bar =
  'vis bar\ndata\n  - category Amazon\n    value 620\n  - category Apple\n    value 385\n  - category Google\n    value 340\n  - category Microsoft\n    value 245\nstyle\n  backgroundColor #DBEAFE';

const pie =
  'vis pie\ndata\n  - category Android\n    value 72\n  - category iOS\n    value 28\nstyle\n  backgroundColor #D5F5F6';

const column =
  'vis column\ndata\n  - category 2020\n    value 210\n    group BEV\n  - category 2020\n    value 98\n    group PHEV\n  - category 2021\n    value 460\n    group BEV\n  - category 2021\n    value 185\n    group PHEV\n  - category 2022\n    value 780\n    group BEV\n  - category 2022\n    value 290\n    group PHEV\n  - category 2023\n    value 1050\n    group BEV\n  - category 2023\n    value 410\n    group PHEV\n  - category 2024\n    value 1320\n    group BEV\n  - category 2024\n    value 560\n    group PHEV\nstack true\nstyle\n  palette\n    - #5B8FF9\n    - #61DDAA\n  backgroundColor #fef9f2';

const scatter =
  'vis scatter\ndata\n  - x 15\n    y 72\n    group A\n  - x 45\n    y 78\n    group A\n  - x 25\n    y 68\n    group B\n  - x 55\n    y 82\n    group B\n  - x 35\n    y 75\n    group C\n  - x 65\n    y 85\n    group C\nstyle\n  backgroundColor #DCFCE7';

const histogram =
  'vis histogram\ndata\n  - 6.5\n  - 6.5\n  - 6.5\n  - 6.5\n  - 6.5\n  - 6.5\n  - 6.5\n  - 6.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 9.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 12.5\n  - 15.5\n  - 15.5\n  - 15.5\n  - 15.5\n  - 15.5\n  - 15.5\n  - 15.5\n  - 15.5\n  - 18.5\n  - 18.5\n  - 18.5\n  - 18.5\n  - 18.5\n  - 21.5\n  - 21.5\nstyle\n  backgroundColor #f7f5fd';

const boxplot =
  'vis boxplot\ndata\n  - category 研发\n    value 62\n  - category 研发\n    value 74\n  - category 研发\n    value 78\n  - category 研发\n    value 82\n  - category 研发\n    value 85\n  - category 研发\n    value 88\n  - category 研发\n    value 90\n  - category 研发\n    value 93\n  - category 研发\n    value 95\n  - category 研发\n    value 98\n  - category 市场\n    value 55\n  - category 市场\n    value 68\n  - category 市场\n    value 72\n  - category 市场\n    value 76\n  - category 市场\n    value 78\n  - category 市场\n    value 81\n  - category 市场\n    value 84\n  - category 市场\n    value 86\n  - category 市场\n    value 90\n  - category 市场\n    value 95\n  - category 销售\n    value 45\n  - category 销售\n    value 65\n  - category 销售\n    value 70\n  - category 销售\n    value 76\n  - category 销售\n    value 80\n  - category 销售\n    value 85\n  - category 销售\n    value 88\n  - category 销售\n    value 92\n  - category 销售\n    value 96\n  - category 销售\n    value 100';

const funnel =
  'vis funnel\ndata\n  - category Visit\n    value 100000\n  - category Cart\n    value 58000\n  - category Pay\n    value 42000\nstyle\n  backgroundColor #EDE5FF';

const waterfall =
  'vis waterfall\ndata\n  - category 营业收入\n    value 5800\n  - category 成本\n    value -3200\n  - category 管理费用\n    value -800\n  - category 税费\n    value -860\n  - category 净利润\n    value 940\nstyle\n  palette\n    - #A855F7\n    - #38BDF8\n    - #34D399\n  backgroundColor #DBEAFE';

const liquid = 'vis liquid\npercent 0.736\nshape circle\nstyle\n  backgroundColor #D5F5F6';

const wordCloud =
  'vis word-cloud\ndata\n  - text Chart\n    value 856\n  - text Data\n    value 723\n  - text Visual\n    value 645\n  - text Graph\n    value 589\n  - text Insight\n    value 534\n  - text Trend\n    value 478\n  - text Analytics\n    value 412\n  - text Dashboard\n    value 367\n  - text Report\n    value 323\n  - text Metric\n    value 298\nstyle\n  backgroundColor #fef9f2';

const venn =
  'vis venn\ndata\n  - sets "Set A"\n    value 12000\n    label "Set A"\n  - sets "Set B"\n    value 8000\n    label "Set B"\n  - sets "Set C"\n    value 5500\n    label "Set C"\n  - sets "Set A，Set B"\n    value 5200\n  - sets "Set A，Set C"\n    value 3800\n  - sets "Set B，Set C"\n    value 2600\n  - sets "Set A，Set B，Set C"\n    value 2000\nstyle\n  backgroundColor #DCFCE7';

const treemap =
  'vis treemap\ndata\n  - name 软件\n    value 2800\n    children\n      - name type1\n        value 1200\n      - name type2\n        value 500\n      - name type3\n        value 400\n      - name type4\n        value 700\n  - name 硬件\n    value 2200\n    children\n      - name type5\n        value 1500\n      - name type6\n        value 400\n      - name type7\n        value 300\nstyle\n  backgroundColor #f7f5fd';

const mindmap =
  'vis mindmap\ndata\n  name AI\n  children\n    - name ML\n      children\n        - name Supervised\n        - name Unsupervised\n    - name DL\n      children\n        - name CNN\n        - name Transformer\n    - name NLP\n      children\n        - name Translation\n        - name LLM\n    - name CV\n      children\n        - name Detection\n        - name Generation\n    - name Speech\n      children\n        - name Recognition\n        - name Synthesis\nstyle\n  backgroundColor #EDE5FF';

const organizationChart =
  'vis organization-chart\ndata\n  name CEO\n  children\n    - name CTO\n      children\n        - name Dev\n        - name QA\n    - name CFO\n      children\n        - name Finance\n        - name Audit\nstyle\n  backgroundColor #DBEAFE';

const network =
  'vis network-graph\ndata\n  nodes\n    - name Alice\n    - name Bob\n    - name Carol\n    - name Dave\n    - name Eve\n  edges\n    - source Alice\n      target Bob\n    - source Alice\n      target Carol\n    - source Bob\n      target Dave\n    - source Carol\n      target Dave\n    - source Alice\n      target Eve\n    - source Eve\n      target Bob\nlayout force\nstyle\n  backgroundColor #D5F5F6';

const radar =
  'vis radar\ndata\n  - name 涨跌幅\n    value 12.3\n    group 上证指数\n  - name 成交量\n    value 45.21\n    group 上证指数\n  - name PE\n    value 13.2\n    group 上证指数\n  - name 相对位置\n    value 72.5\n    group 上证指数\n  - name 涨跌幅\n    value 8.9\n    group 纳斯达克\n  - name 成交量\n    value 32.01\n    group 纳斯达克\n  - name PE\n    value 34.5\n    group 纳斯达克\n  - name 相对位置\n    value 72.1\n    group 纳斯达克\n  - name 涨跌幅\n    value 11.5\n    group 日经225\n  - name 成交量\n    value 21.04\n    group 日经225\n  - name PE\n    value 21.3\n    group 日经225\n  - name 相对位置\n    value 77.6\n    group 日经225\nstyle\n  backgroundColor #fef9f2';

// dualAxes,
export default [
  line,
  bar,
  pie,
  column,
  scatter,
  histogram,
  radar,
  mindmap,
  organizationChart,
  venn,
  liquid,
  treemap,
  boxplot,
  network,
  funnel,
  waterfall,
  wordCloud,
];
