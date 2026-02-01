# Summary 组件

Summary 组件用于数据的概括性总结，通常是文本 + 数据呈现。它基于 AntV T8 实现，使用类似 Markdown 的语法来描述数据总结内容。

## 特性

- 支持 T8 Syntax，一种类似于 Markdown 的描述性语法
- 内置多种指标类型（metric_value、delta_value、ratio_value 等）
- 支持浅色和深色主题
- 适合 AI 生成的数据总结场景

## 使用方法

### 基础用法

```typescript
import { Summary } from '@antv/gpt-vis';

const summary = Summary({
  container: '#container',
  theme: 'light', // 可选，默认为 light
});

summary.render(`
  # 销售报告
  总销售额达到 [¥1,234,567](metric_value, origin=1234567)。
`);

// 清理资源
summary.destroy();
```

### 高级用法

使用多种指标类型和富文本格式：

```typescript
const summary = Summary({
  container: '#container',
  theme: 'light',
});

summary.render(`
  # Q1 业务分析报告
  
  ## 销售概览
  本季度总销售额达到 [¥5,234,567](metric_value, origin=5234567)，
  较上季度 [增长 15.2%](delta_value, status=increase)。
  
  ## 关键指标
  - 新增客户：[1,234](metric_value, origin=1234) 人
  - 客户留存率：[89.5%](ratio_value) 
  - 平均订单金额：[¥4,567](metric_value, origin=4567)
  
  ## 趋势分析
  销售额呈现 [稳步上升](trend_desc) 态势，预计下季度将继续保持增长。
`);
```

### 主题切换

```typescript
// 浅色主题（默认）
const summaryLight = Summary({
  container: '#container',
  theme: 'light',
});
summaryLight.render('# 销售报告\n总销售额达到 [¥1,234,567](metric_value)。');

// 深色主题
const summaryDark = Summary({
  container: '#container',
  theme: 'dark',
});
summaryDark.render('# 销售报告\n总销售额达到 [¥1,234,567](metric_value)。');
```

## T8 Syntax 说明

T8 Syntax 是一种类似 Markdown 的语法，支持以下特性：

### 标题

```
# 一级标题
## 二级标题
### 三级标题
```

### 指标类型

- `[¥1,234,567](metric_value)` - 指标数值
- `[增长 15%](delta_value, status=increase)` - 增量值（支持 increase/decrease）
- `[89.5%](ratio_value)` - 比率值
- `[稳步上升](trend_desc)` - 趋势描述
- `[2023年](time_desc)` - 时间描述
- `[产品A](dimension_value)` - 维度值

### 列表

```
- 项目 1
- 项目 2
- 项目 3
```

### 强调

```
*斜体*
**粗体**
```

## API

### Summary(options)

创建 Summary 组件实例。

**参数：**

- `options.container` - `string | HTMLElement` - 必填，容器元素或选择器
- `options.theme` - `'light' | 'dark'` - 可选，主题，默认为 `'light'`
- `options.width` - `number` - 可选，容器宽度
- `options.height` - `number` - 可选，容器高度

### SummaryInstance

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| render | `syntax: string` | `void` | 渲染 T8 Syntax 格式的内容 |
| destroy | - | `void` | 销毁组件实例 |

## 参考资料

- [T8 GitHub](https://github.com/antvis/T8)
- [T8 快速上手](https://github.com/antvis/T8/blob/main/site/en/tutorial/quick-start.md)
- [T8 Skill 文档](https://github.com/antvis/chart-visualization-skills/blob/master/skills/narrative-text-visualization/SKILL.md)
