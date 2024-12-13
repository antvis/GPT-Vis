(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["5024fe4d"],{"4af10e80":function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.d(n,"default",{enumerable:!0,get:function(){return r;}});var t=a("a2e753d8");a("f64ca6db");var d=a("df67f0d6");let u={name:"\u9879\u76EE\u8BA1\u5212",children:[{name:"\u7814\u7A76\u9636\u6BB5",children:[{name:"\u5E02\u573A\u8C03\u7814"},{name:"\u6280\u672F\u53EF\u884C\u6027\u5206\u6790"}]},{name:"\u8BBE\u8BA1\u9636\u6BB5",children:[{name:"\u4EA7\u54C1\u529F\u80FD\u786E\u5B9A"},{name:"UI \u8BBE\u8BA1"}]},{name:"\u5F00\u53D1\u9636\u6BB5",children:[{name:"\u7F16\u5199\u4EE3\u7801"},{name:"\u5355\u5143\u6D4B\u8BD5"}]},{name:"\u6D4B\u8BD5\u9636\u6BB5",children:[{name:"\u529F\u80FD\u6D4B\u8BD5"},{name:"\u6027\u80FD\u6D4B\u8BD5"}]}]};var r=()=>(0,t.jsx)(d.MindMap,{data:u,containerStyle:{height:300}});},"6dfbec42":function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.d(n,"default",{enumerable:!0,get:function(){return o;}});var t=a("a2e753d8");a("d37f1b50");var d=a("6f4b20d1"),u=a("df67f0d6");let r=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{601D}\u{7EF4}\u{5BFC}\u{56FE}

\`\`\`vis-chart
{
  "type": "mind-map",
  "data": {
    "name": "\u{53F0}\u{98CE}\u{5F62}\u{6210}\u{7684}\u{56E0}\u{7D20}",
    "children": [
      {
        "name": "\u{6C14}\u{8C61}\u{6761}\u{4EF6}",
        "children": [
          { "name": "\u{6E29}\u{6696}\u{7684}\u{6D77}\u{6C34}" },
          { "name": "\u{6C14}\u{538B}\u{5206}\u{5E03}" },
          { "name": "\u{6E7F}\u{5EA6}\u{6C34}\u{5E73}" },
          { "name": "\u{98CE}\u{7684}\u{5207}\u{53D8}" }
        ]
      },
      {
        "name": "\u{5730}\u{7406}\u{73AF}\u{5883}",
        "children": [
          { "name": "\u{5927}\u{9646}\u{67B6}\u{7684}\u{5F62}\u{72B6}\u{4E0E}\u{6DF1}\u{5EA6}" },
          { "name": "\u{6D77}\u{6D0B}\u{6696}\u{6D41}\u{7684}\u{5206}\u{5E03}" },
          { "name": "\u{70ED}\u{5E26}\u{5730}\u{533A}\u{7684}\u{6C14}\u{5019}\u{7279}\u{5F81}" },
          { "name": "\u{5C9B}\u{5C7F}\u{7684}\u{5F71}\u{54CD}" }
        ]
      }
    ]
  }
}
\`\`\`
`,f={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},i=(0,u.withChartCode)({components:{[u.ChartType.MindMap]:u.MindMap},style:{width:500}}),c=e=>(0,t.jsx)(u.GPTVisLite,{components:{code:i},children:e});var o=()=>(0,t.jsxs)("div",{style:f,children:[(0,t.jsx)(d.Bubble,{placement:"end",content:'\u7528\u601D\u7EF4\u5BFC\u56FE\u6765\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E {"name":"\u53F0\u98CE\u5F62\u6210\u7684\u56E0\u7D20","children":[{"name":"\u6C14\u8C61\u6761\u4EF6","children":[{"name":"\u6E29\u6696\u7684\u6D77\u6C34"},{"name":"\u6C14\u538B\u5206\u5E03"},{"name":"\u6E7F\u5EA6\u6C34\u5E73"},{"name":"\u98CE\u7684\u5207\u53D8"}]},{"name":"\u5730\u7406\u73AF\u5883","children":[{"name":"\u5927\u9646\u67B6\u7684\u5F62\u72B6\u4E0E\u6DF1\u5EA6"},{"name":"\u6D77\u6D0B\u6696\u6D41\u7684\u5206\u5E03"},{"name":"\u70ED\u5E26\u5730\u533A\u7684\u6C14\u5019\u7279\u5F81"},{"name":"\u5C9B\u5C7F\u7684\u5F71\u54CD"}]}]}',avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb",maxWidth:"60%"}}}),(0,t.jsx)(d.Bubble,{content:r,messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"6f4b20d1":function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.e(n,{Attachments:function(){return u.default;},Bubble:function(){return f.default;},Conversations:function(){return i.default;},Prompts:function(){return c.default;},Sender:function(){return r.default;},Suggestion:function(){return l.default;},ThoughtChain:function(){return o.default;},Welcome:function(){return s.default;},XProvider:function(){return m.default;},XRequest:function(){return A.default;},XStream:function(){return b.default;},useXAgent:function(){return _.default;},useXChat:function(){return h.default;},version:function(){return d.default;}});var t=a("777fffbe"),d=t._(a("cea7a711")),u=t._(a("86e758f8")),r=t._(a("21ce146d")),f=t._(a("243206a0")),i=t._(a("c0871562")),c=t._(a("70c8ecc2")),o=t._(a("b2332147")),l=t._(a("a6701d1e")),s=t._(a("d7c71a38")),m=t._(a("c34ae465")),h=t._(a("e5e3fe21")),_=t._(a("34370490")),b=t._(a("0f4ecb35")),A=t._(a("119b7956"));},df67f0d6:function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.e(n,{ConfigProvider:function(){return r.default;},GPTVis:function(){return f.default;},GPTVisLite:function(){return i.default;},version:function(){return c.default;},withChartCode:function(){return u.withChartCode;},withDefaultChartCode:function(){return u.withDefaultChartCode;}});var t=a("d1751d7c"),d=a("777fffbe");t._(a("5639510f"),n),t._(a("d382b880"),n);var u=a("a574afdb"),r=d._(a("a7265236")),f=d._(a("2c69d5f6")),i=d._(a("033b3748")),c=d._(a("7cf1dc46"));},e7bada6d:function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.d(n,"Source",{enumerable:!0,get:function(){return d.default;}});var t=a("d1751d7c"),d=a("777fffbe")._(a("b00709ad"));t._(a("5e2dda25"),n),t._(a("969efd31"),n),t._(a("f21af0e0"),n),t._(a("33eda958"),n),t._(a("112b9a67"),n),t._(a("a45613fd"),n),t._(a("432777ba"),n);}}]);
//# sourceMappingURL=5024fe4d-async.186c0c64.js.map