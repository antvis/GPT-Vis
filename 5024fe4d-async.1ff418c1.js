(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["5024fe4d"],{"36d8a4f8":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{Actions:function(){return u.default;},Attachments:function(){return r.default;},Bubble:function(){return i.default;},Conversations:function(){return c.default;},Prompts:function(){return l.default;},Sender:function(){return f.default;},Suggestion:function(){return s.default;},ThoughtChain:function(){return o.default;},Welcome:function(){return m.default;},XProvider:function(){return h.default;},XRequest:function(){return A.default;},XStream:function(){return v.default;},useXAgent:function(){return _.default;},useXChat:function(){return b.default;},version:function(){return d.default;}});var a=t("777fffbe"),d=a._(t("f5f0d9bb")),u=a._(t("faa71e2d")),r=a._(t("4b30c990")),f=a._(t("7b31f050")),i=a._(t("6250cf6d")),c=a._(t("1fccaf05")),l=a._(t("453b775e")),o=a._(t("752de3f1")),s=a._(t("21c831ca")),m=a._(t("93d32012")),h=a._(t("d52145fb")),b=a._(t("89babbae")),_=a._(t("81745cc0")),v=a._(t("b59532a4")),A=a._(t("99124e3b"));},"4af10e80":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return c;}});var a=t("a2e753d8");t("f64ca6db");var d=t("df67f0d6"),u=t("5c709dd2"),r=t("9d065c04");let f={name:"\u9879\u76EE\u8BA1\u5212",children:[{name:"\u7814\u7A76\u9636\u6BB5",children:[{name:"\u5E02\u573A\u8C03\u7814"},{name:"\u6280\u672F\u53EF\u884C\u6027\u5206\u6790"}]},{name:"\u8BBE\u8BA1\u9636\u6BB5",children:[{name:"\u4EA7\u54C1\u529F\u80FD\u786E\u5B9A"},{name:"UI \u8BBE\u8BA1"}]},{name:"\u5F00\u53D1\u9636\u6BB5",children:[{name:"\u7F16\u5199\u4EE3\u7801"},{name:"\u5355\u5143\u6D4B\u8BD5"}]},{name:"\u6D4B\u8BD5\u9636\u6BB5",children:[{name:"\u529F\u80FD\u6D4B\u8BD5"},{name:"\u6027\u80FD\u6D4B\u8BD5"}]}]},i=["default","academy"];var c=()=>{let[e,n]=(0,r.useState)("default");return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{style:{marginBottom:16},children:[(0,a.jsx)("label",{htmlFor:"theme-select",style:{marginRight:8,fontSize:"14px"},children:"Theme:"}),(0,a.jsx)(u.Select,{id:"theme-select",value:e,onChange:e=>n(e),style:{width:120},options:i.map(e=>({label:e,value:e}))})]}),(0,a.jsx)(d.MindMap,{data:f,containerStyle:{height:300},theme:e})]});};},"6dfbec42":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return l;}});var a=t("a2e753d8");t("d37f1b50");var d=t("36d8a4f8"),u=t("df67f0d6");let r=`
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
`,f={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},i=(0,u.withChartCode)({components:{[u.ChartType.MindMap]:u.MindMap},style:{width:500}}),c=e=>(0,a.jsx)(u.GPTVisLite,{components:{code:i},children:e});var l=()=>(0,a.jsxs)("div",{style:f,children:[(0,a.jsx)(d.Bubble,{placement:"end",content:'\u7528\u601D\u7EF4\u5BFC\u56FE\u6765\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E {"name":"\u53F0\u98CE\u5F62\u6210\u7684\u56E0\u7D20","children":[{"name":"\u6C14\u8C61\u6761\u4EF6","children":[{"name":"\u6E29\u6696\u7684\u6D77\u6C34"},{"name":"\u6C14\u538B\u5206\u5E03"},{"name":"\u6E7F\u5EA6\u6C34\u5E73"},{"name":"\u98CE\u7684\u5207\u53D8"}]},{"name":"\u5730\u7406\u73AF\u5883","children":[{"name":"\u5927\u9646\u67B6\u7684\u5F62\u72B6\u4E0E\u6DF1\u5EA6"},{"name":"\u6D77\u6D0B\u6696\u6D41\u7684\u5206\u5E03"},{"name":"\u70ED\u5E26\u5730\u533A\u7684\u6C14\u5019\u7279\u5F81"},{"name":"\u5C9B\u5C7F\u7684\u5F71\u54CD"}]}]}',avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb",maxWidth:"60%"}}}),(0,a.jsx)(d.Bubble,{content:r,messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"7dca4d14":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"Source",{enumerable:!0,get:function(){return d.default;}});var a=t("d1751d7c"),d=t("777fffbe")._(t("e5365288"));a._(t("1ad5815b"),n),a._(t("7f6e4cdf"),n),a._(t("450e3722"),n),a._(t("711e7b38"),n),a._(t("9f3735c7"),n),a._(t("75cceb9a"),n),a._(t("d17b15fe"),n);},df67f0d6:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{ConfigProvider:function(){return f.default;},GPTVis:function(){return i.default;},GPTVisLite:function(){return c.default;},useEventPublish:function(){return c.useEventPublish;},version:function(){return l.default;},withChartCode:function(){return r.withChartCode;},withDefaultChartCode:function(){return r.withDefaultChartCode;}});var a=t("d1751d7c"),d=t("777fffbe"),u=t("852bbaa9");a._(t("5639510f"),n),a._(t("d382b880"),n),a._(t("8e074ce8"),n);var r=t("a574afdb"),f=d._(t("a7265236")),i=d._(t("2c69d5f6")),c=u._(t("033b3748")),l=d._(t("7cf1dc46"));}}]);
//# sourceMappingURL=5024fe4d-async.1ff418c1.js.map