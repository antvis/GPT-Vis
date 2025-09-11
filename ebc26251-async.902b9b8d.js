(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["ebc26251"],{"545ab194":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return o;}});var a=t("a2e753d8");t("4b2eab52");var r=t("c6b3640c"),u=t("df67f0d6");let d=`
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
`,i={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},c=(0,u.withChartCode)({components:{[u.ChartType.IndentedTree]:u.IndentedTree}}),f=e=>(0,a.jsx)(u.GPTVisLite,{components:{code:c},children:e});var o=()=>(0,a.jsxs)("div",{style:i,children:[(0,a.jsx)(r.Bubble,{placement:"end",content:"\u7528\u7F29\u8FDB\u6811\u6765\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,a.jsx)(r.Bubble,{content:d,messageRender:f,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"72c03fb9":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return f;}});var a=t("a2e753d8");t("0ae75d08");var r=t("df67f0d6"),u=t("99c1b0b8"),d=t("9d065c04");let i={name:"my-project",children:[{name:"src",children:[{name:"components",children:[{name:"Header.tsx"},{name:"Footer.tsx"}]},{name:"pages",children:[{name:"Home.tsx"},{name:"About.tsx"}]},{name:"App.tsx"},{name:"index.tsx"}]},{name:"public",children:[{name:"index.html"},{name:"favicon.ico"}]},{name:"package.json"},{name:"tsconfig.json"},{name:"README.md"}]},c=["default","academy"];var f=()=>{let[e,n]=(0,d.useState)("default");return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{style:{marginBottom:16},children:[(0,a.jsx)("label",{htmlFor:"theme-select",style:{marginRight:8,fontSize:"14px"},children:"Theme:"}),(0,a.jsx)(u.Select,{id:"theme-select",value:e,onChange:e=>n(e),style:{width:120},options:c.map(e=>({label:e,value:e}))})]}),(0,a.jsx)(r.IndentedTree,{data:i,theme:e})]});};},c1f97feb:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"Source",{enumerable:!0,get:function(){return r.default;}});var a=t("d1751d7c"),r=t("777fffbe")._(t("63855282"));a._(t("a97b4ee8"),n),a._(t("d9b661b3"),n),a._(t("1686747a"),n),a._(t("382f6ca4"),n),a._(t("106867e1"),n),a._(t("fb1ec05a"),n),a._(t("3beb203b"),n);},c6b3640c:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{Actions:function(){return u.default;},Attachments:function(){return d.default;},Bubble:function(){return c.default;},Conversations:function(){return f.default;},Prompts:function(){return o.default;},Sender:function(){return i.default;},Suggestion:function(){return s.default;},ThoughtChain:function(){return l.default;},Welcome:function(){return m.default;},XProvider:function(){return b.default;},XRequest:function(){return A.default;},XStream:function(){return v.default;},useXAgent:function(){return _.default;},useXChat:function(){return h.default;},version:function(){return r.default;}});var a=t("777fffbe"),r=a._(t("a9af005b")),u=a._(t("5367784d")),d=a._(t("683a1bba")),i=a._(t("7b63da8c")),c=a._(t("16f10027")),f=a._(t("bc7e5305")),o=a._(t("6e5ed8f3")),l=a._(t("791d9675")),s=a._(t("2583e2b9")),m=a._(t("8de6515d")),b=a._(t("2008abfe")),h=a._(t("e6c4c43b")),_=a._(t("af0012d3")),v=a._(t("682391e7")),A=a._(t("aeeed557"));},df67f0d6:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{ConfigProvider:function(){return i.default;},GPTVis:function(){return c.default;},GPTVisLite:function(){return f.default;},useEventPublish:function(){return f.useEventPublish;},version:function(){return o.default;},withChartCode:function(){return d.withChartCode;},withDefaultChartCode:function(){return d.withDefaultChartCode;}});var a=t("d1751d7c"),r=t("777fffbe"),u=t("852bbaa9");a._(t("5639510f"),n),a._(t("d382b880"),n);var d=t("a574afdb"),i=r._(t("a7265236")),c=r._(t("2c69d5f6")),f=u._(t("033b3748")),o=r._(t("7cf1dc46"));}}]);
//# sourceMappingURL=ebc26251-async.902b9b8d.js.map