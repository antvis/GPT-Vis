import { Table } from 'lucide-react';

export const tableData = {
  id: 'table',
  name: 'Table',
  icon: Table,
  galleryExamples:
    'vis table\ndata\n  - 产品 智能手机\n    区域 华东\n    销售额 4580\n    同比增长 23.5%\n    排名 1\n  - 产品 笔记本电脑\n    区域 华南\n    销售额 3200\n    同比增长 15.8%\n    排名 2\n  - 产品 平板电脑\n    区域 华北\n    销售额 2100\n    同比增长 8.2%\n    排名 3\n  - 产品 智能手表\n    区域 西南\n    销售额 1850\n    同比增长 42.1%\n    排名 4\n  - 产品 无线耳机\n    区域 华中\n    销售额 1520\n    同比增长 31.6%\n    排名 5\ntitle 2024 Q1 季度销售报表',
  description:
    '表格是一种以行和列组织数据的结构化展示方式。每一行代表一个数据实体，每一列代表一个属性或字段。表格能够清晰地展示大量数据，便于用户进行查找、比较和分析。表格通常用于展示结构化数据，如财务报表、成绩单、产品列表等。 表格的核心优势在于对齐和比较。用户可以快速定位某一行或某一列的数据，进行横向或纵向的对比。表格也支持排序、筛选等操作，提升数据的可用性和交互性。',
  knowledge: {
    introduction:
      '表格是一种以行和列组织数据的结构化展示方式。每一行代表一个数据实体，每一列代表一个属性或字段。表格能够清晰地展示大量数据，便于用户进行查找、比较和分析。表格通常用于展示结构化数据，如财务报表、成绩单、产品列表等。 表格的核心优势在于对齐和比较。用户可以快速定位某一行或某一列的数据，进行横向或纵向的对比。表格也支持排序、筛选等操作，提升数据的可用性和交互性。',
    useCases: [
      '展示结构化数据，如明细、清单、报表等。',
      '需要对数据进行查找、排序、筛选、对比时。',
      '数据量较大，且每条数据有多个属性。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表类型，必填，文本类型，值为 "table"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '表格数据，必填，数组对象类型，每个对象的字段需与表头对应。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '表格标题，选填，文本类型。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '展示 2024 Q1 季度产品销售报表',
      description: '展示 2024 Q1 季度产品销售报表。',
      code: 'vis table\ndata\n  - 产品 智能手机\n    区域 华东\n    销售额 4580\n    同比增长 23.5%\n    排名 1\n  - 产品 笔记本电脑\n    区域 华南\n    销售额 3200\n    同比增长 15.8%\n    排名 2\n  - 产品 平板电脑\n    区域 华北\n    销售额 2100\n    同比增长 8.2%\n    排名 3\n  - 产品 智能手表\n    区域 西南\n    销售额 1850\n    同比增长 42.1%\n    排名 4\n  - 产品 无线耳机\n    区域 华中\n    销售额 1520\n    同比增长 31.6%\n    排名 5\ntitle 2024 Q1 季度销售报表',
    },
    {
      title: '展示员工绩效评估表',
      description: '展示员工绩效评估表',
      code: 'vis table\ndata\n  - 姓名 张伟\n    部门 技术部\n    KPI评分 92\n    出勤率 98%\n    评级 A\n  - 姓名 李娜\n    部门 市场部\n    KPI评分 88\n    出勤率 96%\n    评级 A\n  - 姓名 王强\n    部门 产品部\n    KPI评分 85\n    出勤率 94%\n    评级 B+\n  - 姓名 赵敏\n    部门 运营部\n    KPI评分 90\n    出勤率 97%\n    评级 A\n  - 姓名 陈晨\n    部门 技术部\n    KPI评分 78\n    出勤率 92%\n    评级 B\ntitle 员工绩效表',
    },
    {
      title: '展示服务器监控状态列表',
      description: '展示服务器监控状态列表。',
      code: 'vis table\ndata\n  - 服务器 web-prod-01\n    CPU 72%\n    内存 85%\n    磁盘 60%\n    状态 正常\n  - 服务器 web-prod-02\n    CPU 45%\n    内存 62%\n    磁盘 55%\n    状态 正常\n  - 服务器 db-master\n    CPU 88%\n    内存 92%\n    磁盘 78%\n    状态 警告\n  - 服务器 db-slave\n    CPU 35%\n    内存 58%\n    磁盘 45%\n    状态 正常\n  - 服务器 cache-01\n    CPU 92%\n    内存 95%\n    磁盘 30%\n    状态 警告\ntitle 服务器监控状态',
    },
  ],
};
