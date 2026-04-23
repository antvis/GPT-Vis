import { Users } from 'lucide-react';

export const organizationChartData = {
  id: 'organization-chart',
  name: 'Organization Chart',
  icon: Users,
  galleryExamples:
    'vis organization-chart\ndata\n  name Alice Johnson\n  description Chief Technology Officer\n  children\n    - name Bob Smith\n      description Senior Software Engineer\n    - name Eve Black\n      description IT Support Department Head',
  description:
    '组织架构图用于直观地展示组织内部的层级结构和部门关系。它通过节点和边表示不同的职位、部门及其上下级关系。每个节点代表一个职位或部门，边则表示上下级或平级关系。以树状结构呈现，顶层为最高管理层，逐层向下展开，直至各个部门和职位。',
  knowledge: {
    introduction:
      '组织架构图用于直观地展示组织内部的层级结构和部门关系。它通过节点和边表示不同的职位、部门及其上下级关系。每个节点代表一个职位或部门，边则表示上下级关系。以树状结构呈现，顶层为最高管理层，逐层向下展开，直至各个部门和职位。',
    useCases: [
      '展示公司或团队的层级结构，明确各个职位和部门的上下级关系。',
      '展示员工的职位和部门分布。',
      '项目管理时，明确项目团队的成员和职责分工。',
      '用于股权穿透、投资上下游公司等依赖分析。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "organization-chart"。',
          },
          {
            property: 'data',
            type: 'required',
            description:
              '图表的数据，必填，树形对象类型，根节点包含 name、description（可选）、children（可选）字段。',
          },
          {
            property: 'data.name',
            type: 'required',
            description: '节点的名称，表示职位或部门的名称，必须唯一，必填，字符串类型。',
          },
          {
            property: 'data.description',
            type: 'optional',
            description: '节点的描述信息，可以包含职位职责或部门简介等，选填，字符串类型。',
          },
          {
            property: 'data.children',
            type: 'optional',
            description:
              '子节点数组，表示下级职位或部门，每个子节点本身也是一个树形对象，选填，数组类型。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表的标题，选填，文本类型。',
          },
          {
            property: 'theme',
            type: 'optional',
            description:
              '图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        'Alice Johnson 是公司的首席技术官，她的团队包括资深软件工程师 Bob Smith 和 IT 支持部门负责人 Eve Black。Bob Smith 负责带领软件工程团队，团队成员包括软件工程师 Charlie Brown 和 Diana White。Eve Black 负责 IT 支持部门，团队成员包括 IT 支持专家 Frank Green 和 Grace Blue。',
      description:
        'Alice Johnson 是公司的首席技术官，她的团队包括资深软件工程师 Bob Smith 和 IT 支持部门负责人 Eve Black。',
      code: 'vis organization-chart\ndata\n  name Alice Johnson\n  description Chief Technology Officer\n  children\n    - name Bob Smith\n      description Senior Software Engineer\n      children\n        - name Charlie Brown\n          description Software Engineer\n        - name Diana White\n          description Software Engineer\n    - name Eve Black\n      description IT Support Department Head\n      children\n        - name Frank Green\n          description IT Support Specialist\n        - name Grace Blue\n          description IT Support Specialist',
    },
    {
      title:
        '用组织架构图可视化以下数据：Eric Joplin 是首席执行官，其直属下级为 Linda Newland（首席执行助理）。',
      description: '用于验证：节点内容超出时省略号显示，hover 展示完整内容。',
      code: 'vis organization-chart\ndata\n  name Eric Joplin (Interim Chief Executive Officer & Acting President)\n  description Chief Executive Officer overseeing global operations, strategy, and cross-functional leadership across multiple regions\n  children\n    - name Linda Newland (Executive Assistant to the CEO, Board Liaison)\n      description Chief Executive Assistant responsible for calendar management, stakeholder communications, and confidential executive coordination',
    },
    {
      title:
        '用组织架构图展示一家科技公司的部门结构：CEO 下设 CTO、CFO、COO 三位高管，CTO 下设前端团队和后端团队。',
      description: '用组织架构图展示科技公司三层部门结构。',
      code: 'vis organization-chart\ndata\n  name CEO\n  description 首席执行官\n  children\n    - name CTO\n      description 首席技术官\n      children\n        - name 前端团队\n          description 负责人：张工\n        - name 后端团队\n          description 负责人：李工\n    - name CFO\n      description 首席财务官\n    - name COO\n      description 首席运营官\ntitle 科技公司组织架构\ntheme academy',
    },
  ],
};
