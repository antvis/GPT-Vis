(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["ebc26251"],{"545ab194":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return c;}});var a=t("a2e753d8");t("4b2eab52");var d=t("b07f28a7"),r=t("df67f0d6");let u=`
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
`,f={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},i=(0,r.withChartCode)({components:{[r.ChartType.IndentedTree]:r.IndentedTree}}),o=e=>(0,a.jsx)(r.GPTVisLite,{components:{code:i},children:e});var c=()=>(0,a.jsxs)("div",{style:f,children:[(0,a.jsx)(d.Bubble,{placement:"end",content:"\u7528\u7F29\u8FDB\u6811\u6765\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,a.jsx)(d.Bubble,{content:u,messageRender:o,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"62fd2610":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"Source",{enumerable:!0,get:function(){return d.default;}});var a=t("d1751d7c"),d=t("777fffbe")._(t("bab36354"));a._(t("27879b75"),n),a._(t("df46a20d"),n),a._(t("2b913cc4"),n),a._(t("83de2887"),n),a._(t("41a1de45"),n),a._(t("4f5b22e1"),n),a._(t("5eb37857"),n);},"72c03fb9":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return o;}});var a=t("a2e753d8");t("0ae75d08");var d=t("df67f0d6"),r=t("37e8d303"),u=t("9d065c04");let f={name:"my-project",children:[{name:"src",children:[{name:"components",children:[{name:"Header.tsx"},{name:"Footer.tsx"}]},{name:"pages",children:[{name:"Home.tsx"},{name:"About.tsx"}]},{name:"App.tsx"},{name:"index.tsx"}]},{name:"public",children:[{name:"index.html"},{name:"favicon.ico"}]},{name:"package.json"},{name:"tsconfig.json"},{name:"README.md"}]},i=["default","academy"];var o=()=>{let[e,n]=(0,u.useState)("default");return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{style:{marginBottom:16},children:[(0,a.jsx)("label",{htmlFor:"theme-select",style:{marginRight:8,fontSize:"14px"},children:"Theme:"}),(0,a.jsx)(r.Select,{id:"theme-select",value:e,onChange:e=>n(e),style:{width:120},options:i.map(e=>({label:e,value:e}))})]}),(0,a.jsx)(d.IndentedTree,{data:f,theme:e})]});};},b07f28a7:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{Actions:function(){return r.default;},Attachments:function(){return u.default;},Bubble:function(){return i.default;},Conversations:function(){return o.default;},Prompts:function(){return c.default;},Sender:function(){return f.default;},Suggestion:function(){return s.default;},ThoughtChain:function(){return l.default;},Welcome:function(){return m.default;},XProvider:function(){return b.default;},XRequest:function(){return A.default;},XStream:function(){return v.default;},useXAgent:function(){return _.default;},useXChat:function(){return h.default;},version:function(){return d.default;}});var a=t("777fffbe"),d=a._(t("11c4b9b1")),r=a._(t("75c6e3a2")),u=a._(t("f8cbd6e9")),f=a._(t("d6f377ef")),i=a._(t("d6be0193")),o=a._(t("09e9f499")),c=a._(t("01b84f75")),l=a._(t("3b5ff57f")),s=a._(t("37a13873")),m=a._(t("26643b83")),b=a._(t("eb940c50")),h=a._(t("0405af5f")),_=a._(t("859e26a4")),v=a._(t("d6d8916f")),A=a._(t("314f8cd3"));},df67f0d6:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{ConfigProvider:function(){return f.default;},GPTVis:function(){return i.default;},GPTVisLite:function(){return o.default;},useEventPublish:function(){return o.useEventPublish;},version:function(){return c.default;},withChartCode:function(){return u.withChartCode;},withDefaultChartCode:function(){return u.withDefaultChartCode;}});var a=t("d1751d7c"),d=t("777fffbe"),r=t("852bbaa9");a._(t("5639510f"),n),a._(t("d382b880"),n),a._(t("8e074ce8"),n);var u=t("a574afdb"),f=d._(t("a7265236")),i=d._(t("2c69d5f6")),o=r._(t("033b3748")),c=d._(t("7cf1dc46"));}}]);
//# sourceMappingURL=ebc26251-async.eafa5504.js.map