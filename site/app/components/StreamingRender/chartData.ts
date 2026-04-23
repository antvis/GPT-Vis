export const CHART_DATA = [
  {
    id: 'pie',
    title: '饼图',
    code: 'vis pie\ndata\n  - category 火锅\n    value 22\n  - category 自助餐\n    value 12\n  - category 小吃快餐\n    value 8\n  - category 西餐\n    value 6\n  - category 其它\n    value 44\ntitle 餐饮业营收额占比',
  },
  {
    id: 'treemap',
    title: '矩阵树图',
    code: 'vis treemap\ndata\n  - name 技术部\n    value 100\n    children\n      - name 前端组\n        value 40\n      - name 后端组\n        value 35\n      - name 测试组\n        value 25\n  - name 产品部\n    value 80\n    children\n      - name 产品设计组\n        value 50\n      - name 用户研究组\n        value 30',
  },
  {
    id: 'waterfall',
    title: '季度收益瀑布图',
    code: 'vis waterfall\ndata\n  - category 第一季度\n    value 120000000\n  - category 第二季度\n    value 569000000\n  - category 第三季度\n    value 231000000\n  - category 前三季度总计\n    isIntermediateTotal true\n  - category 第四季度\n    value -342000000\n  - category 第五季度\n    value -232000000\n  - category 四五季度总计\n    isIntermediateTotal true\n  - category 总计\n    isTotal true\ntitle 季度收益瀑布图',
  },
  {
    id: 'scatter',
    title: '身高体重关系分析',
    code: 'vis scatter\ndata\n  - x 161.2\n    y 51.6\n  - x 167.5\n    y 59\n  - x 159.5\n    y 49.2\n  - x 176.2\n    y 66.8\n  - x 170\n    y 59\n  - x 155.8\n    y 53.6\n  - x 172.5\n    y 55.2\n  - x 165.1\n    y 64.1\n  - x 182.9\n    y 81.8\n  - x 152.4\n    y 47.3\naxisXTitle 身高(cm)\naxisYTitle 体重(kg)',
  },
  {
    id: 'line',
    title: '折线图',
    code: 'vis line\ndata\n  - time 2015\n    value 0.87\n  - time 2016\n    value 0.99\n  - time 2017\n    value 0.91\n  - time 2018\n    value 0.83\n  - time 2019\n    value 0.98\n  - time 2020\n    value 1.02\n  - time 2021\n    value 0.85\n  - time 2022\n    value 0.89\n  - time 2023\n    value 1.17\n  - time 2024\n    value 1.29\ntitle 全球平均温度距平变化\naxisXTitle 年份\naxisYTitle 温度距平 (°C)',
  },
  {
    id: 'column',
    title: '柱状图',
    code: 'vis column\ndata\n  - category 1月\n    value 820\n  - category 2月\n    value 650\n  - category 3月\n    value 780\n  - category 4月\n    value 860\n  - category 5月\n    value 920\n  - category 6月\n    value 1350\n  - category 7月\n    value 890\n  - category 8月\n    value 850\n  - category 9月\n    value 960\n  - category 10月\n    value 1100\n  - category 11月\n    value 2180\n  - category 12月\n    value 1250\ntitle 2024 电商平台月度 GMV\naxisXTitle 月份\naxisYTitle GMV (亿元)',
  },
  {
    id: 'area',
    title: '面积图',
    code: 'vis area\ndata\n  - time 2018\n    value 201\n  - time 2019\n    value 221\n  - time 2020\n    value 307\n  - time 2021\n    value 460\n  - time 2022\n    value 620\n  - time 2023\n    value 830\n  - time 2024\n    value 1080\ntitle 全球电动汽车销量趋势\naxisXTitle 年份\naxisYTitle 销量 (万辆)',
  },
  {
    id: 'bar',
    title: '条形图',
    code: 'vis bar\ndata\n  - category Python\n    value 28.1\n  - category JavaScript\n    value 18.5\n  - category Java\n    value 15.6\n  - category "C/C++"\n    value 12.3\n  - category TypeScript\n    value 8.2\n  - category Go\n    value 5.7\n  - category Rust\n    value 3.8\n  - category Kotlin\n    value 2.9\ntitle 2024 全球编程语言流行度\naxisXTitle 流行度指数\naxisYTitle 编程语言',
  },
  {
    id: 'histogram',
    title: '直方图',
    code: 'vis histogram\ndata\n  - 68\n  - 72\n  - 85\n  - 56\n  - 91\n  - 74\n  - 63\n  - 88\n  - 79\n  - 67\n  - 82\n  - 95\n  - 58\n  - 76\n  - 84\n  - 71\n  - 93\n  - 65\n  - 78\n  - 87\n  - 52\n  - 73\n  - 81\n  - 69\n  - 90\n  - 62\n  - 75\n  - 86\n  - 59\n  - 77\n  - 83\n  - 70\n  - 94\n  - 66\n  - 80\n  - 89\n  - 55\n  - 72\n  - 85\n  - 64\n  - 92\n  - 68\n  - 76\n  - 83\n  - 57\n  - 88\n  - 74\n  - 81\n  - 67\n  - 95\n  - 61\n  - 79\n  - 86\n  - 53\n  - 91\n  - 70\n  - 78\n  - 84\n  - 63\n  - 87\n  - 75\n  - 82\n  - 69\n  - 93\n  - 58\n  - 73\n  - 80\n  - 66\n  - 89\n  - 54\n  - 77\n  - 85\n  - 62\n  - 90\n  - 71\n  - 79\n  - 83\n  - 65\n  - 94\n  - 60\n  - 76\n  - 88\n  - 56\n  - 92\n  - 68\n  - 81\n  - 74\n  - 86\n  - 64\n  - 78\n  - 84\n  - 72\n  - 87\n  - 59\n  - 75\n  - 82\n  - 67\n  - 91\n  - 55\n  - 80\n  - 85\n  - 63\n  - 89\n  - 70\n  - 77\n  - 83\n  - 66\n  - 93\n  - 61\n  - 79\n  - 88\n  - 57\n  - 90\n  - 73\n  - 82\nbinNumber 10\ntitle 学生考试成绩分布\naxisXTitle 分数\naxisYTitle 人数',
  },
  {
    id: 'word-cloud',
    title: '词云图',
    code: 'vis word-cloud\ndata\n  - text 机器学习\n    value 100\n  - text 深度学习\n    value 95\n  - text 自然语言处理\n    value 88\n  - text 计算机视觉\n    value 85\n  - text 大模型\n    value 92\n  - text 强化学习\n    value 72\n  - text 知识图谱\n    value 65\n  - text 数据挖掘\n    value 70\n  - text 神经网络\n    value 80\n  - text 迁移学习\n    value 60\n  - text 生成式AI\n    value 90\n  - text 对抗网络\n    value 55\n  - text 注意力机制\n    value 75\n  - text 预训练\n    value 82\n  - text 微调\n    value 68\n  - text 多模态\n    value 86\n  - text 向量数据库\n    value 58\n  - text 提示工程\n    value 78\n  - text 智能体\n    value 84\n  - text 图神经网络\n    value 50\n  - text 贝叶斯\n    value 45\n  - text 联邦学习\n    value 48\n  - text 自动驾驶\n    value 76\n  - text 语音识别\n    value 62\n  - text 推荐系统\n    value 66\n  - text 异常检测\n    value 42\n  - text 时间序列\n    value 52\n  - text 文本分类\n    value 40\n  - text 目标检测\n    value 58\n  - text 语义分割\n    value 46\ntitle AI 技术关键词',
  },
  {
    id: 'dual-axes',
    title: '双轴图',
    code: 'vis dual-axes\ncategories\n  - 1月\n  - 2月\n  - 3月\n  - 4月\n  - 5月\n  - 6月\n  - 7月\n  - 8月\n  - 9月\n  - 10月\n  - 11月\n  - 12月\nseries\n  - type column\n    axisYTitle 销售额(万元)\n    data\n      - 820\n      - 650\n      - 780\n      - 860\n      - 920\n      - 1350\n      - 890\n      - 850\n      - 960\n      - 1100\n      - 2180\n      - 1250\n  - type line\n    axisYTitle 利润率(%)\n    data\n      - 12\n      - 10\n      - 13\n      - 14\n      - 15\n      - 18\n      - 14\n      - 13\n      - 15\n      - 16\n      - 22\n      - 17\ntitle 月度销售额与利润率\naxisXTitle 月份',
  },
  {
    id: 'radar',
    title: '雷达图',
    code: 'vis radar\ndata\n  - name 性能\n    value 85\n  - name 生态\n    value 92\n  - name 学习成本\n    value 78\n  - name 社区活跃度\n    value 88\n  - name 工程化\n    value 90\n  - name 移动端支持\n    value 82\ntitle 前端框架综合评估',
  },
  {
    id: 'liquid',
    title: '水波图',
    code: 'vis liquid\npercent 0.72\nshape circle\ntitle 服务器 CPU 使用率',
  },
  {
    id: 'funnel',
    title: '漏斗图',
    code: 'vis funnel\ndata\n  - category 浏览商品\n    value 100000\n  - category 加入购物车\n    value 45000\n  - category 提交订单\n    value 25000\n  - category 完成支付\n    value 18000\n  - category 确认收货\n    value 15000\ntitle 电商用户转化漏斗',
  },
  {
    id: 'sankey',
    title: '桑基图',
    code: 'vis sankey\ndata\n  - source 煤炭\n    target 电力\n    value 320\n  - source 煤炭\n    target 钢铁\n    value 180\n  - source 煤炭\n    target 化工\n    value 120\n  - source 石油\n    target 交通运输\n    value 280\n  - source 石油\n    target 化工\n    value 150\n  - source 天然气\n    target 电力\n    value 200\n  - source 天然气\n    target 供暖\n    value 160\n  - source 天然气\n    target 化工\n    value 80\n  - source 水电\n    target 电力\n    value 180\n  - source 核能\n    target 电力\n    value 100\n  - source 风能\n    target 电力\n    value 90\n  - source 太阳能\n    target 电力\n    value 60\nnodeAlign justify\ntitle 全球能源流向',
  },
  {
    id: 'venn',
    title: '韦恩图',
    code: 'vis venn\ndata\n  - sets A\n    value 3500\n    label 购买手机\n  - sets B\n    value 2800\n    label 购买耳机\n  - sets C\n    value 2200\n    label 购买充电器\n  - sets A,B\n    value 1500\n  - sets A,C\n    value 1200\n  - sets B,C\n    value 800\n  - sets A,B,C\n    value 600\ntitle 用户购买行为交集',
  },
  {
    id: 'boxplot',
    title: '箱线图',
    code: 'vis boxplot\ndata\n  - category 数学\n    value 72\n  - category 数学\n    value 85\n  - category 数学\n    value 68\n  - category 数学\n    value 91\n  - category 数学\n    value 76\n  - category 数学\n    value 83\n  - category 数学\n    value 65\n  - category 数学\n    value 88\n  - category 数学\n    value 79\n  - category 数学\n    value 94\n  - category 数学\n    value 70\n  - category 数学\n    value 82\n  - category 数学\n    value 86\n  - category 数学\n    value 74\n  - category 数学\n    value 90\n  - category 数学\n    value 67\n  - category 数学\n    value 78\n  - category 数学\n    value 84\n  - category 数学\n    value 73\n  - category 数学\n    value 89\n  - category 语文\n    value 78\n  - category 语文\n    value 82\n  - category 语文\n    value 75\n  - category 语文\n    value 88\n  - category 语文\n    value 80\n  - category 语文\n    value 85\n  - category 语文\n    value 72\n  - category 语文\n    value 90\n  - category 语文\n    value 77\n  - category 语文\n    value 83\n  - category 语文\n    value 79\n  - category 语文\n    value 86\n  - category 语文\n    value 74\n  - category 语文\n    value 91\n  - category 语文\n    value 76\n  - category 语文\n    value 84\n  - category 语文\n    value 81\n  - category 语文\n    value 73\n  - category 语文\n    value 87\ntitle 语数考试成绩分布\naxisXTitle 科目\naxisYTitle 分数',
  },
  {
    id: 'violin',
    title: '小提琴图',
    code: 'vis violin\ndata\n  - category "I. setosa"\n    value 5.1\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 4.7\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 4.4\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.3\n  - category "I. setosa"\n    value 5.8\n  - category "I. versicolor"\n    value 7.0\n  - category "I. versicolor"\n    value 6.4\n  - category "I. versicolor"\n    value 6.9\n  - category "I. versicolor"\n    value 5.5\n  - category "I. versicolor"\n    value 6.5\n  - category "I. versicolor"\n    value 5.7\n  - category "I. versicolor"\n    value 6.3\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 6.6\n  - category "I. versicolor"\n    value 5.2\n  - category "I. versicolor"\n    value 5.0\n  - category "I. versicolor"\n    value 5.9\n  - category "I. versicolor"\n    value 6.0\n  - category "I. versicolor"\n    value 6.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 7.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 7.6\n  - category "I. virginica"\n    value 4.9\n  - category "I. virginica"\n    value 7.3\n  - category "I. virginica"\n    value 6.7\n  - category "I. virginica"\n    value 7.2\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 6.4\n  - category "I. virginica"\n    value 6.8\n  - category "I. virginica"\n    value 5.7\ntitle 鸢尾花萼片长度分布\naxisYTitle 萼片长度（cm）',
  },
  {
    id: 'flow-diagram',
    title: '流程图',
    code: 'vis flow-diagram\ntitle 用户注册流程\ndata\n  nodes\n    - name 访问注册页面\n    - name 填写并提交注册表单\n    - name 验证用户信息\n    - name 创建新用户账户\n    - name 发送验证邮件\n    - name 点击验证链接\n    - name 注册成功\n  edges\n    - source 访问注册页面\n      target 填写并提交注册表单\n    - source 填写并提交注册表单\n      target 验证用户信息\n    - source 验证用户信息\n      target 创建新用户账户\n    - source 创建新用户账户\n      target 发送验证邮件\n    - source 发送验证邮件\n      target 点击验证链接\n    - source 点击验证链接\n      target 注册成功',
  },
  {
    id: 'network-graph',
    title: '网络图',
    code: 'vis network-graph\ndata\n  nodes\n    - name 哈利·波特\n    - name 赫敏·格兰杰\n    - name 罗恩·韦斯莱\n    - name 伏地魔\n  edges\n    - source 哈利·波特\n      target 赫敏·格兰杰\n      name 朋友\n    - source 哈利·波特\n      target 罗恩·韦斯莱\n      name 朋友\n    - source 哈利·波特\n      target 伏地魔\n      name 敌人\n    - source 伏地魔\n      target 哈利·波特\n      name 试图杀死\ntitle 哈利波特人物关系',
  },
  {
    id: 'organization-chart',
    title: '组织架构图',
    code: 'vis organization-chart\ndata\n  name Alice Johnson\n  description Chief Technology Officer\n  children\n    - name Bob Smith\n      description Senior Software Engineer\n      children\n        - name Charlie Brown\n          description Software Engineer\n        - name Diana White\n          description Software Engineer\n    - name Eve Black\n      description IT Support Department Head\n      children\n        - name Frank Green\n          description IT Support Specialist\n        - name Grace Blue\n          description IT Support Specialist',
  },
  {
    id: 'indented-tree',
    title: '缩进树',
    code: 'vis indented-tree\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json',
  },
  {
    id: 'mindmap',
    title: '思维导图',
    code: 'vis mindmap\ndata\n  name 项目计划\n  children\n    - name 研究阶段\n      children\n        - name 市场调研\n        - name 技术可行性分析\n    - name 设计阶段\n      children\n        - name 产品功能确定\n        - name UI 设计\n    - name 开发阶段\n      children\n        - name 编写代码\n        - name 单元测试\n    - name 测试阶段\n      children\n        - name 功能测试\n        - name 性能测试\ntitle 项目计划',
  },
  {
    id: 'fishbone-diagram',
    title: '鱼骨图',
    code: 'vis fishbone-diagram\ntitle 生产效率低\ndata\n  name 生产效率低\n  children\n    - name 设备问题\n      children\n        - name 设备老化\n        - name 维护不及时\n    - name 员工问题\n      children\n        - name 技能不足\n        - name 工作态度差\n    - name 流程问题\n      children\n        - name 流程繁琐\n        - name 缺乏标准化',
  },
  {
    id: 'table',
    title: '表格',
    code: 'vis table\ndata\n  - 产品 智能手机\n    区域 华东\n    销售额 4580\n    同比增长 23.5%\n    排名 1\n  - 产品 笔记本电脑\n    区域 华南\n    销售额 3200\n    同比增长 15.8%\n    排名 2\n  - 产品 平板电脑\n    区域 华北\n    销售额 2100\n    同比增长 8.2%\n    排名 3\n  - 产品 智能手表\n    区域 西南\n    销售额 1850\n    同比增长 42.1%\n    排名 4\n  - 产品 无线耳机\n    区域 华中\n    销售额 1520\n    同比增长 31.6%\n    排名 5\ntitle 2024 Q1 季度销售报表',
  },
  {
    id: 'summary',
    title: '统计摘要',
    code: `# Q4 销售报告

[总收入](metric_name)达到[¥520万](metric_value, origin=5200000)，增长[18%](ratio_value, origin=0.18, assessment="positive")。[北美地区](dim_value)占比[40%](contribute_ratio, origin=0.40)。`,
  },
];
