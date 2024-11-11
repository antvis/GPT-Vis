<h1 align="center">
<b>GPT-VIS</b>
</h1>

<div align="center">
Components for GPTs, generative AI, and LLM projects. Not only UI Components.

![GPT-vis logo-06](https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05)

</div>

## 特性

- 🤖 **LLM 相关**：针对 LLM 对话式交互，以及服务端序列化输出而设计，方便快速集成到 AI 应用中。
- 🍡 **丰富组件**：内置有 20+ 美观好看的常用 UI 组件，满足常规需求。
- 🔨 **易于扩展**：对于自己的特殊 UI 定制需求，提供方便的扩展机制和架构设计。

## 安装

使用 NodeJS 包管理工具安装依赖。

```bash
$npm i --save gpt-vis
```

## 快速使用

快速使用 gpt-vis 渲染出对话卡片的 UI。

```tsx
import { Conversation, Components } from "gpt-vis";

function Demo() {
  // 服务端返回的协议内容
  const content =
    "# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.";

  return <Conversation components={Components}>{content}</Conversation>;
}
```

使用自定义的 UI 组件。UI 渲染最终使用 markdown 格式，所以自定义的方式有两种，一种是基于 markdown code 标签去扩展语言，一种是扩展标签。

````tsx
import { Conversation, Components } from "gpt-vis";

const custom = {
  "my-ui": () => {},
};

function Demo() {
  // 服务端返回的协议内容
  const content = '# GPT-VIS \n\n```my-ui\n{"value": "1"}```';

  return (
    <Conversation components={{ ...components, ...custom }}>
      {content}
    </Conversation>
  );
}
````

## Development

```bash
# install dependencies
$ npm install

# develop library by docs demo
$ npm run dev

# build library source code
$ npm run build
```

## License

MIT
