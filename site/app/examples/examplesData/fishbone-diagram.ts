import { Fish } from 'lucide-react';

export const fishboneDiagramData = {
  id: 'fishbone-diagram',
  name: 'Fishbone diagram',
  icon: Fish,
  description: '通过树状结构展示问题根本原因的专业图表',
  knowledge: {
    introduction: '鱼骨图(又称因果图/石川图)能系统化分析问题成因，将复杂问题分解为多个可管理的因素',
    useCases: ['生产质量问题分析', '业务流程瓶颈诊断', '项目风险识别与管理'],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，对象类型，表示鱼骨图的根节点（核心问题）；',
          },
          {
            property: 'data.name',
            type: 'required',
            description: '根节点名称，即核心问题描述，必填，文本类型；',
          },
          {
            property: 'data.children',
            type: 'required',
            description: '原因分类列表（鱼骨主干分支），必填，数组对象类型；',
          },
          {
            property: 'data.children.name',
            type: 'required',
            description: '分类名称，即原因大类，必填，文本类型；',
          },
          {
            property: 'data.children.children',
            type: 'optional',
            description: '具体原因列表（鱼骨细分支），选填，数组对象类型；',
          },
          {
            property: 'data.children.children.name',
            type: 'required',
            description: '具体原因名称，必填，文本类型；',
          },
          {
            property: 'theme',
            type: 'string',
            description:
              '可选，图表主题风格，可选值: default(浅色)/academy(学术风格)/dark(暗色)，默认: default',
          },
          {
            property: 'title',
            type: 'string',
            description: '可选，图表标题，显示在图表顶部',
          },
          {
            property: 'style.palette',
            type: 'string[]',
            description:
              '可选，自定义分支节点颜色列表，十六进制颜色值数组，按分支顺序循环使用，覆盖主题默认色板',
          },
          {
            property: 'style.backgroundColor',
            type: 'string',
            description: '可选，画布背景色，十六进制颜色值，覆盖主题默认背景色',
          },
          {
            property: 'style.texture',
            type: 'string',
            description:
              '可选，节点渲染风格，可选值: rough(手绘风格)/default(平滑风格)，默认: default',
          },
        ],
      },
    ],
  },
  galleryExamples:
    'vis fishbone-diagram\ndata\n  name 产品盈利未达到预期目标\n  children\n    - name 问题描述与分析\n      children\n        - name 品牌销量分析\n        - name 市场容量评估\n        - name 品牌的市场份额分析\n        - name 总贡献毛利计算\n    - name 品牌定位策略\n      children\n        - name 外包装设计\n        - name 品牌名称选择\n        - name 销售价格定位\n        - name 产品规格定义\n    - name 分销渠道管理\n      children\n        - name 地区分布\n        - name 渠道选择\n        - name 客户类型分类\n        - name 销售人员覆盖范围\n    - name 市场知名度提升\n      children\n        - name 地区权重分析\n        - name 媒体组合策略\n        - name 广告投入预算\n        - name 品质意识提升\n    - name 试购买策略\n      children\n        - name 现场展示效果\n        - name 促销形式设计\n        - name 促销时机选择\n        - name 供货保证措施\n    - name 重复购买策略\n      children\n        - name 消费者档案管理\n        - name 使用场合分析\n        - name 使用次数统计\n        - name 产品原因退货处理\ntheme default',
  examples: [
    {
      title: '产品盈利未达到预期目标（default）',
      description: '多维度拆解产品盈利不及预期的根本原因，默认主题',
      code: 'vis fishbone-diagram\ntitle 产品盈利未达到预期目标\ndata\n  name 产品盈利未达到预期目标\n  children\n    - name 问题描述与分析\n      children\n        - name 品牌销量分析\n        - name 市场容量评估\n        - name 品牌的市场份额分析\n        - name 总贡献毛利计算\n    - name 品牌定位策略\n      children\n        - name 外包装设计\n        - name 品牌名称选择\n        - name 销售价格定位\n        - name 产品规格定义\n    - name 分销渠道管理\n      children\n        - name 地区分布\n        - name 渠道选择\n        - name 客户类型分类\n        - name 销售人员覆盖范围\n    - name 市场知名度提升\n      children\n        - name 地区权重分析\n        - name 媒体组合策略\n        - name 广告投入预算\n        - name 品质意识提升\n    - name 试购买策略\n      children\n        - name 现场展示效果\n        - name 促销形式设计\n        - name 促销时机选择\n        - name 供货保证措施\n    - name 重复购买策略\n      children\n        - name 消费者档案管理\n        - name 使用场合分析\n        - name 使用次数统计\n        - name 产品原因退货处理\ntheme default',
    },
    {
      title: '生产效率低（academy）',
      description: '从设备、人员、流程三个维度分析生产效率低下的原因，学术主题',
      code: 'vis fishbone-diagram\ntitle 生产效率低\ndata\n  name 生产效率低\n  children\n    - name 设备问题\n      children\n        - name 设备老化\n        - name 维护不及时\n    - name 员工问题\n      children\n        - name 技能不足\n        - name 工作态度差\n    - name 流程问题\n      children\n        - name 流程繁琐\n        - name 缺乏标准化\ntheme academy',
    },
    {
      title: '网站响应缓慢，自定义配色',
      description: '前端、后端、网络三个层面分析页面加载慢的根因，自定义配色',
      code: 'vis fishbone-diagram\ntitle 网站响应缓慢\ndata\n  name 页面加载时间过长\n  children\n    - name 前端因素\n      children\n        - name 资源未压缩\n        - name 第三方脚本过多\n    - name 后端因素\n      children\n        - name 数据库查询未优化\n        - name API响应慢\n    - name 网络因素\n      children\n        - name CDN配置不当\n        - name 带宽不足\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
