(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["ebc26251"],{"1c5d635b":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{Attachments:function(){return u.default;},Bubble:function(){return f.default;},Conversations:function(){return i.default;},Prompts:function(){return o.default;},Sender:function(){return r.default;},Suggestion:function(){return s.default;},ThoughtChain:function(){return c.default;},Welcome:function(){return l.default;},XProvider:function(){return m.default;},XRequest:function(){return A.default;},XStream:function(){return _.default;},useXAgent:function(){return h.default;},useXChat:function(){return b.default;},version:function(){return d.default;}});var a=t("777fffbe"),d=a._(t("61551e8a")),u=a._(t("150d8a7a")),r=a._(t("013e81db")),f=a._(t("d161127f")),i=a._(t("11781cbc")),o=a._(t("5a025bc4")),c=a._(t("e2d1bf07")),s=a._(t("d0c39811")),l=a._(t("0176aebf")),m=a._(t("8b35f51f")),b=a._(t("92b2492a")),h=a._(t("1e122ed0")),_=a._(t("470d5fd8")),A=a._(t("e0f10014"));},"545ab194":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return c;}});var a=t("a2e753d8");t("4b2eab52");var d=t("1c5d635b"),u=t("df67f0d6");let r=`
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
`,f={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},i=(0,u.withChartCode)({components:{[u.ChartType.IndentedTree]:u.IndentedTree}}),o=e=>(0,a.jsx)(u.GPTVisLite,{components:{code:i},children:e});var c=()=>(0,a.jsxs)("div",{style:f,children:[(0,a.jsx)(d.Bubble,{placement:"end",content:"\u7528\u7F29\u8FDB\u6811\u6765\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,a.jsx)(d.Bubble,{content:r,messageRender:o,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"72c03fb9":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return r;}});var a=t("a2e753d8");t("0ae75d08");var d=t("df67f0d6");let u={name:"my-project",children:[{name:"src",children:[{name:"components",children:[{name:"Header.tsx"},{name:"Footer.tsx"}]},{name:"pages",children:[{name:"Home.tsx"},{name:"About.tsx"}]},{name:"App.tsx"},{name:"index.tsx"}]},{name:"public",children:[{name:"index.html"},{name:"favicon.ico"}]},{name:"package.json"},{name:"tsconfig.json"},{name:"README.md"}]};var r=()=>(0,a.jsx)(d.IndentedTree,{data:u});},df67f0d6:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{ConfigProvider:function(){return f.default;},GPTVis:function(){return i.default;},GPTVisLite:function(){return o.default;},useEventPublish:function(){return o.useEventPublish;},version:function(){return c.default;},withChartCode:function(){return r.withChartCode;},withDefaultChartCode:function(){return r.withDefaultChartCode;}});var a=t("d1751d7c"),d=t("777fffbe"),u=t("852bbaa9");a._(t("5639510f"),n),a._(t("d382b880"),n);var r=t("a574afdb"),f=d._(t("a7265236")),i=d._(t("2c69d5f6")),o=u._(t("033b3748")),c=d._(t("7cf1dc46"));},e7bada6d:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"Source",{enumerable:!0,get:function(){return d.default;}});var a=t("d1751d7c"),d=t("777fffbe")._(t("b00709ad"));a._(t("5e2dda25"),n),a._(t("969efd31"),n),a._(t("f21af0e0"),n),a._(t("33eda958"),n),a._(t("112b9a67"),n),a._(t("a45613fd"),n),a._(t("432777ba"),n);}}]);
//# sourceMappingURL=ebc26251-async.0a4bb0cf.js.map