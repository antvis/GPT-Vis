(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["5024fe4d"],{"4af10e80":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return c;}});var a=t("a2e753d8");t("f64ca6db");var u=t("df67f0d6"),d=t("99c1b0b8"),r=t("9d065c04");let i={name:"\u9879\u76EE\u8BA1\u5212",children:[{name:"\u7814\u7A76\u9636\u6BB5",children:[{name:"\u5E02\u573A\u8C03\u7814"},{name:"\u6280\u672F\u53EF\u884C\u6027\u5206\u6790"}]},{name:"\u8BBE\u8BA1\u9636\u6BB5",children:[{name:"\u4EA7\u54C1\u529F\u80FD\u786E\u5B9A"},{name:"UI \u8BBE\u8BA1"}]},{name:"\u5F00\u53D1\u9636\u6BB5",children:[{name:"\u7F16\u5199\u4EE3\u7801"},{name:"\u5355\u5143\u6D4B\u8BD5"}]},{name:"\u6D4B\u8BD5\u9636\u6BB5",children:[{name:"\u529F\u80FD\u6D4B\u8BD5"},{name:"\u6027\u80FD\u6D4B\u8BD5"}]}]},f=["default","academy"];var c=()=>{let[e,n]=(0,r.useState)("default");return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{style:{marginBottom:16},children:[(0,a.jsx)("label",{htmlFor:"theme-select",style:{marginRight:8,fontSize:"14px"},children:"Theme:"}),(0,a.jsx)(d.Select,{id:"theme-select",value:e,onChange:e=>n(e),style:{width:120},options:f.map(e=>({label:e,value:e}))})]}),(0,a.jsx)(u.MindMap,{data:i,containerStyle:{height:300},theme:e})]});};},"6dfbec42":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return l;}});var a=t("a2e753d8");t("d37f1b50");var u=t("c6b3640c"),d=t("df67f0d6");let r=`
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
  },
}
\`\`\`
`,i={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},f=(0,d.withChartCode)({components:{[d.ChartType.MindMap]:d.MindMap},style:{width:500}}),c=e=>(0,a.jsx)(d.GPTVisLite,{components:{code:f},children:e});var l=()=>(0,a.jsxs)("div",{style:i,children:[(0,a.jsx)(u.Bubble,{placement:"end",content:'\u7528\u601D\u7EF4\u5BFC\u56FE\u6765\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E {"name":"\u53F0\u98CE\u5F62\u6210\u7684\u56E0\u7D20","children":[{"name":"\u6C14\u8C61\u6761\u4EF6","children":[{"name":"\u6E29\u6696\u7684\u6D77\u6C34"},{"name":"\u6C14\u538B\u5206\u5E03"},{"name":"\u6E7F\u5EA6\u6C34\u5E73"},{"name":"\u98CE\u7684\u5207\u53D8"}]},{"name":"\u5730\u7406\u73AF\u5883","children":[{"name":"\u5927\u9646\u67B6\u7684\u5F62\u72B6\u4E0E\u6DF1\u5EA6"},{"name":"\u6D77\u6D0B\u6696\u6D41\u7684\u5206\u5E03"},{"name":"\u70ED\u5E26\u5730\u533A\u7684\u6C14\u5019\u7279\u5F81"},{"name":"\u5C9B\u5C7F\u7684\u5F71\u54CD"}]}]}',avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb",maxWidth:"60%"}}}),(0,a.jsx)(u.Bubble,{content:r,messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},c1f97feb:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"Source",{enumerable:!0,get:function(){return u.default;}});var a=t("d1751d7c"),u=t("777fffbe")._(t("63855282"));a._(t("a97b4ee8"),n),a._(t("d9b661b3"),n),a._(t("1686747a"),n),a._(t("382f6ca4"),n),a._(t("106867e1"),n),a._(t("fb1ec05a"),n),a._(t("3beb203b"),n);},c6b3640c:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{Actions:function(){return d.default;},Attachments:function(){return r.default;},Bubble:function(){return f.default;},Conversations:function(){return c.default;},Prompts:function(){return l.default;},Sender:function(){return i.default;},Suggestion:function(){return s.default;},ThoughtChain:function(){return o.default;},Welcome:function(){return m.default;},XProvider:function(){return h.default;},XRequest:function(){return A.default;},XStream:function(){return v.default;},useXAgent:function(){return _.default;},useXChat:function(){return b.default;},version:function(){return u.default;}});var a=t("777fffbe"),u=a._(t("a9af005b")),d=a._(t("5367784d")),r=a._(t("683a1bba")),i=a._(t("7b63da8c")),f=a._(t("16f10027")),c=a._(t("bc7e5305")),l=a._(t("6e5ed8f3")),o=a._(t("791d9675")),s=a._(t("2583e2b9")),m=a._(t("8de6515d")),h=a._(t("2008abfe")),b=a._(t("e6c4c43b")),_=a._(t("af0012d3")),v=a._(t("682391e7")),A=a._(t("aeeed557"));},df67f0d6:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{ConfigProvider:function(){return i.default;},GPTVis:function(){return f.default;},GPTVisLite:function(){return c.default;},useEventPublish:function(){return c.useEventPublish;},version:function(){return l.default;},withChartCode:function(){return r.withChartCode;},withDefaultChartCode:function(){return r.withDefaultChartCode;}});var a=t("d1751d7c"),u=t("777fffbe"),d=t("852bbaa9");a._(t("5639510f"),n),a._(t("d382b880"),n);var r=t("a574afdb"),i=u._(t("a7265236")),f=u._(t("2c69d5f6")),c=d._(t("033b3748")),l=u._(t("7cf1dc46"));}}]);
//# sourceMappingURL=5024fe4d-async.5db9161c.js.map