(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["5024fe4d"],{"4af10e80":function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.d(n,"default",{enumerable:!0,get:function(){return r;}});var t=a("a2e753d8");a("f64ca6db");var u=a("df67f0d6");let d={name:"\u9879\u76EE\u8BA1\u5212",children:[{name:"\u7814\u7A76\u9636\u6BB5",children:[{name:"\u5E02\u573A\u8C03\u7814"},{name:"\u6280\u672F\u53EF\u884C\u6027\u5206\u6790"}]},{name:"\u8BBE\u8BA1\u9636\u6BB5",children:[{name:"\u4EA7\u54C1\u529F\u80FD\u786E\u5B9A"},{name:"UI \u8BBE\u8BA1"}]},{name:"\u5F00\u53D1\u9636\u6BB5",children:[{name:"\u7F16\u5199\u4EE3\u7801"},{name:"\u5355\u5143\u6D4B\u8BD5"}]},{name:"\u6D4B\u8BD5\u9636\u6BB5",children:[{name:"\u529F\u80FD\u6D4B\u8BD5"},{name:"\u6027\u80FD\u6D4B\u8BD5"}]}]};var r=()=>(0,t.jsx)(u.MindMap,{data:d,containerStyle:{height:300}});},"6dfbec42":function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.d(n,"default",{enumerable:!0,get:function(){return c;}});var t=a("a2e753d8");a("d37f1b50");var u=a("91048bb3"),d=a("df67f0d6");let r=`
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
`,f={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},i=(0,d.withChartCode)({components:{[d.ChartType.MindMap]:d.MindMap},style:{width:500}}),o=e=>(0,t.jsx)(d.GPTVisLite,{components:{code:i},children:e});var c=()=>(0,t.jsxs)("div",{style:f,children:[(0,t.jsx)(u.Bubble,{placement:"end",content:'\u7528\u601D\u7EF4\u5BFC\u56FE\u6765\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E {"name":"\u53F0\u98CE\u5F62\u6210\u7684\u56E0\u7D20","children":[{"name":"\u6C14\u8C61\u6761\u4EF6","children":[{"name":"\u6E29\u6696\u7684\u6D77\u6C34"},{"name":"\u6C14\u538B\u5206\u5E03"},{"name":"\u6E7F\u5EA6\u6C34\u5E73"},{"name":"\u98CE\u7684\u5207\u53D8"}]},{"name":"\u5730\u7406\u73AF\u5883","children":[{"name":"\u5927\u9646\u67B6\u7684\u5F62\u72B6\u4E0E\u6DF1\u5EA6"},{"name":"\u6D77\u6D0B\u6696\u6D41\u7684\u5206\u5E03"},{"name":"\u70ED\u5E26\u5730\u533A\u7684\u6C14\u5019\u7279\u5F81"},{"name":"\u5C9B\u5C7F\u7684\u5F71\u54CD"}]}]}',avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb",maxWidth:"60%"}}}),(0,t.jsx)(u.Bubble,{content:r,messageRender:o,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"91048bb3":function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.e(n,{Attachments:function(){return d.default;},Bubble:function(){return f.default;},Conversations:function(){return i.default;},Prompts:function(){return o.default;},Sender:function(){return r.default;},Suggestion:function(){return l.default;},ThoughtChain:function(){return c.default;},Welcome:function(){return s.default;},XProvider:function(){return m.default;},XRequest:function(){return A.default;},XStream:function(){return _.default;},useXAgent:function(){return h.default;},useXChat:function(){return b.default;},version:function(){return u.default;}});var t=a("777fffbe"),u=t._(a("09a0409f")),d=t._(a("00a39875")),r=t._(a("71b2e10d")),f=t._(a("4d961e28")),i=t._(a("0a4ee772")),o=t._(a("2fffe306")),c=t._(a("5058819b")),l=t._(a("18ac0177")),s=t._(a("7b7cedcd")),m=t._(a("99e41b18")),b=t._(a("2744a42c")),h=t._(a("47962456")),_=t._(a("25a1fb31")),A=t._(a("2fb176a4"));},df67f0d6:function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.e(n,{ConfigProvider:function(){return f.default;},GPTVis:function(){return i.default;},GPTVisLite:function(){return o.default;},useEventPublish:function(){return o.useEventPublish;},version:function(){return c.default;},withChartCode:function(){return r.withChartCode;},withDefaultChartCode:function(){return r.withDefaultChartCode;}});var t=a("d1751d7c"),u=a("777fffbe"),d=a("852bbaa9");t._(a("5639510f"),n),t._(a("d382b880"),n);var r=a("a574afdb"),f=u._(a("a7265236")),i=u._(a("2c69d5f6")),o=d._(a("033b3748")),c=u._(a("7cf1dc46"));},e7bada6d:function(e,n,a){"use strict";a.d(n,"__esModule",{value:!0}),a.d(n,"Source",{enumerable:!0,get:function(){return u.default;}});var t=a("d1751d7c"),u=a("777fffbe")._(a("b00709ad"));t._(a("5e2dda25"),n),t._(a("969efd31"),n),t._(a("f21af0e0"),n),t._(a("33eda958"),n),t._(a("112b9a67"),n),t._(a("a45613fd"),n),t._(a("432777ba"),n);}}]);
//# sourceMappingURL=5024fe4d-async.81b0b543.js.map