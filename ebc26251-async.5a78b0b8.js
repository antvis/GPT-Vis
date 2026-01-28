(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["ebc26251"],{"36d8a4f8":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{Actions:function(){return r.default;},Attachments:function(){return u.default;},Bubble:function(){return f.default;},Conversations:function(){return c.default;},Prompts:function(){return o.default;},Sender:function(){return i.default;},Suggestion:function(){return s.default;},ThoughtChain:function(){return l.default;},Welcome:function(){return m.default;},XProvider:function(){return b.default;},XRequest:function(){return A.default;},XStream:function(){return v.default;},useXAgent:function(){return _.default;},useXChat:function(){return h.default;},version:function(){return d.default;}});var a=t("777fffbe"),d=a._(t("f5f0d9bb")),r=a._(t("faa71e2d")),u=a._(t("4b30c990")),i=a._(t("7b31f050")),f=a._(t("6250cf6d")),c=a._(t("1fccaf05")),o=a._(t("453b775e")),l=a._(t("752de3f1")),s=a._(t("21c831ca")),m=a._(t("93d32012")),b=a._(t("d52145fb")),h=a._(t("89babbae")),_=a._(t("81745cc0")),v=a._(t("b59532a4")),A=a._(t("99124e3b"));},"545ab194":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return o;}});var a=t("a2e753d8");t("4b2eab52");var d=t("36d8a4f8"),r=t("df67f0d6");let u=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{7F29}\u{8FDB}\u{6811}

\`\`\`vis-chart
{
  "type": "indented-tree",
  "data": {
    "name": "\u{5BFC}\u{822A}\u{83DC}\u{5355}",
    "children": [
      { "name": "\u{9996}\u{9875}" },
      {
        "name": "\u{4EA7}\u{54C1}",
        "children": [
          {
            "name": "\u{4EA7}\u{54C1}\u{5206}\u{7C7B}1",
            "children": [{ "name": "\u{4EA7}\u{54C1}1-1" }, { "name": "\u{4EA7}\u{54C1}1-2" }]
          },
          {
            "name": "\u{4EA7}\u{54C1}\u{5206}\u{7C7B}2",
            "children": [{ "name": "\u{4EA7}\u{54C1}2-1" }, { "name": "\u{4EA7}\u{54C1}2-2" }]
          }
        ]
      },
      {
        "name": "\u{5173}\u{4E8E}\u{6211}\u{4EEC}",
        "children": [{ "name": "\u{516C}\u{53F8}\u{7B80}\u{4ECB}" }, { "name": "\u{56E2}\u{961F}\u{4ECB}\u{7ECD}" }]
      },
      {
        "name": "\u{670D}\u{52A1}",
        "children": [{ "name": "\u{54A8}\u{8BE2}\u{670D}\u{52A1}" }, { "name": "\u{6280}\u{672F}\u{652F}\u{6301}" }]
      },
      { "name": "\u{8054}\u{7CFB}\u{6211}\u{4EEC}" }
    ]
  }
}
\`\`\`
`,i={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},f=(0,r.withChartCode)({components:{[r.ChartType.IndentedTree]:r.IndentedTree}}),c=e=>(0,a.jsx)(r.GPTVisLite,{components:{code:f},children:e});var o=()=>(0,a.jsxs)("div",{style:i,children:[(0,a.jsx)(d.Bubble,{placement:"end",content:"\u7528\u7F29\u8FDB\u6811\u6765\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,a.jsx)(d.Bubble,{content:u,messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"72c03fb9":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return c;}});var a=t("a2e753d8");t("0ae75d08");var d=t("df67f0d6"),r=t("5c709dd2"),u=t("9d065c04");let i={name:"my-project",children:[{name:"src",children:[{name:"components",children:[{name:"Header.tsx"},{name:"Footer.tsx"}]},{name:"pages",children:[{name:"Home.tsx"},{name:"About.tsx"}]},{name:"App.tsx"},{name:"index.tsx"}]},{name:"public",children:[{name:"index.html"},{name:"favicon.ico"}]},{name:"package.json"},{name:"tsconfig.json"},{name:"README.md"}]},f=["default","academy"];var c=()=>{let[e,n]=(0,u.useState)("default");return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{style:{marginBottom:16},children:[(0,a.jsx)("label",{htmlFor:"theme-select",style:{marginRight:8,fontSize:"14px"},children:"Theme:"}),(0,a.jsx)(r.Select,{id:"theme-select",value:e,onChange:e=>n(e),style:{width:120},options:f.map(e=>({label:e,value:e}))})]}),(0,a.jsx)(d.IndentedTree,{data:i,theme:e})]});};},"7dca4d14":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"Source",{enumerable:!0,get:function(){return d.default;}});var a=t("d1751d7c"),d=t("777fffbe")._(t("e5365288"));a._(t("1ad5815b"),n),a._(t("7f6e4cdf"),n),a._(t("450e3722"),n),a._(t("711e7b38"),n),a._(t("9f3735c7"),n),a._(t("75cceb9a"),n),a._(t("d17b15fe"),n);},df67f0d6:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{ConfigProvider:function(){return i.default;},GPTVis:function(){return f.default;},GPTVisLite:function(){return c.default;},useEventPublish:function(){return c.useEventPublish;},version:function(){return o.default;},withChartCode:function(){return u.withChartCode;},withDefaultChartCode:function(){return u.withDefaultChartCode;}});var a=t("d1751d7c"),d=t("777fffbe"),r=t("852bbaa9");a._(t("5639510f"),n),a._(t("d382b880"),n),a._(t("8e074ce8"),n);var u=t("a574afdb"),i=d._(t("a7265236")),f=d._(t("2c69d5f6")),c=r._(t("033b3748")),o=d._(t("7cf1dc46"));}}]);
//# sourceMappingURL=ebc26251-async.5a78b0b8.js.map