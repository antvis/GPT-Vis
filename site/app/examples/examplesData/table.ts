import { Table } from 'lucide-react';

export const tableData = {
  id: 'table',
  name: 'Table',
  icon: Table,
  galleryExamples:
    'vis table\ndata\n  - 类别 火锅\n    营收额占比(%) 22\n  - 类别 自助餐\n    营收额占比(%) 12\n  - 类别 小吃快餐\n    营收额占比(%) 8\n  - 类别 西餐\n    营收额占比(%) 6\n  - 类别 其它\n    营收额占比(%) 44',
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
      title: '展示餐饮业营收额数据表。',
      description: '展示餐饮业营收额数据表。',
      code: 'vis table\ndata\n  - 类别 火锅\n    营收额占比(%) 22\n  - 类别 自助餐\n    营收额占比(%) 12\n  - 类别 小吃快餐\n    营收额占比(%) 8\n  - 类别 西餐\n    营收额占比(%) 6\n  - 类别 其它\n    营收额占比(%) 44\ntitle 餐饮业营收额数据表',
    },
    {
      title: '展示全国人口居住分布数据表。',
      description: '展示全国人口居住分布数据表。',
      code: 'vis table\ndata\n  - 人口类型 城镇人口\n    数量(万人) 63.89\n  - 人口类型 乡村人口\n    数量(万人) 36.11\ntitle 全国人口居住分布',
    },
    {
      title: '展示产业结构数据表。',
      description: '展示产业结构数据表。',
      code: 'vis table\ndata\n  - 产业类型 第一产业\n    产值(亿元) 7200.0\n  - 产业类型 第二产业\n    产值(亿元) 36600.0\n  - 产业类型 第三产业\n    产值(亿元) 41000.0',
    },
  ],
};
