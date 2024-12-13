---
order: 1
group:
  order: 3
  title: 文本
toc: content
---

# VisText 文本

## 代码演示

### 单独使用

<code src="./demos/common"></code>

### 使用 Markdown 协议

<code src="./demos/markdown"></code>

### 使用 ConfigProvider 全局配置，个性化定制

- 修改内置 entityType 的 encoding 样式，如将‘红涨绿跌’该为‘红跌绿涨’；
- 为自定义 entityType 定义 encoding 样式，如增加‘行动建议’实体类型；

<code src="./demos/custom-markdown"></code>

## API

### VisTextProps

| 属性     | 类型   | 是否必传 | 默认值 | 说明                                               |
| -------- | ------ | -------- | ------ | -------------------------------------------------- |
| type     | string | 否       | -      | 实体类型                                           |
| children | string | 否       | -      | 文本内容                                           |
| origin   | any    | 否       | -      | 原始数据，比如未经格式化的指标值、占比、趋势详情等 |

### GlobalConfig.components.VisText

通过 `ConfigProvider` 全局配置，个性化定制 VisText 组件。

```tsx | pure
<ConfigProvider
  components={{
    VisText: {}, // 类型为 TextConfig
  }}
>
  <MarkdownRender></MarkdownRender>
</ConfigProvider>;

/** 文本组件配置信息 */
export type TextConfig =
  // 实体短语类型映射
  Record<InnerEntityType & string, TextEncoding> & {
    // 静态组件映射, 如 icon 和 mimi-chart
    __statics: Record<string, React.FC<VisTextProps>>;
  };
```
