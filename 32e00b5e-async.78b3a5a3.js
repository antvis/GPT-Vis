(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["32e00b5e"],{"0039c572":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return d;}});var n=a("a2e753d8");a("71e4927d");var u=a("df67f0d6");let r=`
\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "\u{7B2C}\u{4E00}\u{4EA7}\u{4E1A}", "value": 7200.0 },
    { "category": "\u{7B2C}\u{4E8C}\u{4EA7}\u{4E1A}", "value": 36600.0 },
    { "category": "\u{7B2C}\u{4E09}\u{4EA7}\u{4E1A}" ,"value": 41000.0 },
    { "category": "\u{7B2C}\u{56DB}\u{4EA7}\u{4E1A}" ,"value": 21000.0 },
    { "category": "\u{5176}\u{4ED6}\u{4EA7}\u{4E1A}" ,"value": 81000.0 }
  ]
}
\`\`\`
`,l=(0,u.withChartCode)({components:{[u.ChartType.Column]:u.Column},debug:!0});var d=()=>(0,n.jsx)(u.GPTVisLite,{components:{code:l},children:r});},"1feffc3e":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return s;}});var n=a("a2e753d8");a("b70d1ea4");var u=a("8241bef2"),r=a("df67f0d6"),l=a("9d065c04");let d=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{67F1}\u{72B6}\u{56FE}

\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "\u{7B2C}\u{4E00}\u{4EA7}\u{4E1A}", "value": 7200.0 },
    { "category": "\u{7B2C}\u{4E8C}\u{4EA7}\u{4E1A}", "value": 36600.0 },
    { "category": "\u{7B2C}\u{4E09}\u{4EA7}\u{4E1A}" ,"value": 41000.0 }
  ]
}
\`\`\`
`,o={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},i=(0,r.withChartCode)({components:{[r.ChartType.Column]:r.Column},loadingTimeout:3e3}),c=e=>(0,n.jsx)(r.GPTVisLite,{components:{code:i},children:e}),f=()=>{let[e,t]=(0,l.useState)(""),a=(0,l.useRef)(""),n=(0,l.useRef)(null),u=()=>{n.current=setInterval(()=>{let u=parseInt((10*Math.random()).toString(),20),r=a.current+d.substring(a.current.length,a.current.length+u);a.current=r,t(r),e.length===d.length-1&&clearTimeout(n.current);},200);};return[e,()=>{n.current&&clearTimeout(n.current),n.current=null,a.current="",t(""),u();}];};var s=()=>{let[e,t]=f();return(0,l.useEffect)(()=>{t();},[]),(0,n.jsxs)("div",{style:o,children:[(0,n.jsx)("button",{onClick:t,type:"button",children:"\u91CD\u65B0\u6F14\u793A"}),(0,n.jsx)(u.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,n.jsx)(u.Bubble,{content:e,messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}}),(0,n.jsx)(u.Bubble,{content:"\u751F\u6210\u8D85\u65F6\u7684\u6F14\u793A\n"+e.substring(0,e.length-10),messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});};},"42a9474b":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return d;}});var n=a("a2e753d8");a("93d1d306");var u=a("df67f0d6");let r=`
\`\`\`my-ui
my data ...
\`\`\`

\`\`\`vis-chart
{
   "type": "pin-map",
   "data": [
    { "label": "\u{6768}\u{6885}\u{5CAD}", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "\u{7406}\u{5B89}\u{5BFA}", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "\u{4E5D}\u{6EAA}\u{70DF}\u{6811}", "longitude": 120.11335, "latitude": 30.202395 },
    { "label": "\u{98DE}\u{6765}\u{5CF0}", "longitude": 120.100549, "latitude": 30.236875 },
    { "label": "\u{7075}\u{9690}\u{5BFA}", "longitude": 120.101406, "latitude": 30.240826 },
    { "label": "\u{5929}\u{7AFA}\u{4E09}\u{5BFA}", "longitude": 120.105337, "latitude": 30.236818 },
    { "label": "\u{676D}\u{5DDE}\u{690D}\u{7269}\u{56ED}", "longitude": 120.116979, "latitude": 30.252876 },
    { "label": "\u{676D}\u{5DDE}\u{82B1}\u{5703}", "longitude": 120.127654, "latitude": 30.245663 },
    { "label": "\u{82CF}\u{5824}", "longitude": 120.135764, "latitude": 30.251448 },
    { "label": "\u{864E}\u{8DD1}\u{516C}\u{56ED}", "longitude": 120.130095, "latitude": 30.207505 },
    { "label": "\u{7389}\u{7687}\u{98DE}\u{4E91}", "longitude": 120.145323, "latitude": 30.214993 },
    { "label": "\u{957F}\u{6865}\u{516C}\u{56ED}", "longitude": 120.155057, "latitude": 30.232985 }
  ]
}
\`\`\`
`,l=(0,u.withDefaultChartCode)({languageRenderers:{"my-ui":({children:e})=>(0,n.jsx)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:e})}});var d=()=>(0,n.jsx)("div",{children:(0,n.jsx)(u.GPTVisLite,{components:{code:l},children:r})});},"5dee4d26":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return o;}});var n=a("a2e753d8");a("ff1ba601");var u=a("df67f0d6");let r=`
\u{5F53}\u{7136}\u{53EF}\u{4EE5}\u{FF01}\u{5728} JavaScript \u{4E2D}\u{FF0C}\u{4F60}\u{53EF}\u{4EE5}\u{4F7F}\u{7528}\u{52A0}\u{6CD5}\u{8FD0}\u{7B97}\u{7B26} \`+\` \u{6765}\u{5B9E}\u{73B0}\u{4E24}\u{4E2A}\u{6570}\u{5B57}\u{7684}\u{76F8}\u{52A0}\u{3002}\u{4EE5}\u{4E0B}\u{662F}\u{4E00}\u{4E2A}\u{7B80}\u{5355}\u{7684}\u{51FD}\u{6570}\u{FF0C}\u{5B83}\u{63A5}\u{53D7}\u{4E24}\u{4E2A}\u{53C2}\u{6570} \`a\` \u{548C} \`b\`,\u{5E76}\u{8FD4}\u{56DE}\u{5B83}\u{4EEC}\u{7684}\u{548C}\u{FF1A}

\`\`\`javascript
function add(a, b) {
  return a + b;
}

// \u{793A}\u{4F8B}\u{7528}\u{6CD5}
const result = add(3, 4);
console.log(result); // \u{8F93}\u{51FA}\u{FF1A}7
\`\`\`

\u{5728}\u{8FD9}\u{4E2A}\u{793A}\u{4F8B}\u{4E2D}\u{FF0C}\u{6211}\u{4EEC}\u{5B9A}\u{4E49}\u{4E86}\u{4E00}\u{4E2A}\u{540D}\u{4E3A} \`add\` \u{7684}\u{51FD}\u{6570}\u{FF0C}\u{5B83}\u{63A5}\u{53D7}\u{4E24}\u{4E2A}\u{53C2}\u{6570} \`a\` \u{548C} \`b\`\u{3002}\u{51FD}\u{6570}\u{7684}\u{4E3B}\u{4F53}\u{53EA}\u{6709}\u{4E00}\u{884C}\u{4EE3}\u{7801}\u{FF0C}\u{4F7F}\u{7528}\u{52A0}\u{6CD5}\u{8FD0}\u{7B97}\u{7B26} \`+\` \u{5C06} \`a\` \u{548C} \`b\` \u{76F8}\u{52A0}\u{FF0C}\u{5E76}\u{8FD4}\u{56DE}\u{7ED3}\u{679C}\u{3002}

\u{7136}\u{540E}\u{FF0C}\u{6211}\u{4EEC}\u{8C03}\u{7528}
`,l=`
\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "\u{5206}\u{7C7B}\u{4E00}", "value": 27 },
    { "category": "\u{5206}\u{7C7B}\u{4E8C}", "value": 25 },
    { "category": "\u{5206}\u{7C7B}\u{4E09}", "value": 18 },
    { "category": "\u{5206}\u{7C7B}\u{56DB}", "value": 15 },
    { "category": "\u{5206}\u{7C7B}\u{4E94}", "value": 10 },
    { "category": "\u{5176}\u{4ED6}", "value": 5 }
  ]
}
\`\`\`
`,d=(0,u.withDefaultChartCode)({debug:!0});var o=()=>(0,n.jsxs)("div",{children:[(0,n.jsx)(u.GPTVisLite,{children:r}),(0,n.jsx)(u.GPTVisLite,{components:{code:d},children:l})]});},"8241bef2":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{Attachments:function(){return r.default;},Bubble:function(){return d.default;},Conversations:function(){return o.default;},Prompts:function(){return i.default;},Sender:function(){return l.default;},Suggestion:function(){return f.default;},ThoughtChain:function(){return c.default;},Welcome:function(){return s.default;},XProvider:function(){return b.default;},XRequest:function(){return m.default;},XStream:function(){return h.default;},useXAgent:function(){return v.default;},useXChat:function(){return g.default;},version:function(){return u.default;}});var n=a("777fffbe"),u=n._(a("5ebed021")),r=n._(a("80c23231")),l=n._(a("ff3aa385")),d=n._(a("677d9947")),o=n._(a("b513479b")),i=n._(a("4f0f2cb3")),c=n._(a("507c5721")),f=n._(a("a553c582")),s=n._(a("97082eef")),b=n._(a("0ab64679")),g=n._(a("5a437944")),v=n._(a("bf1f75c4")),h=n._(a("63f76eae")),m=n._(a("1e417a58"));},df67f0d6:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{ConfigProvider:function(){return l.default;},GPTVis:function(){return d.default;},GPTVisLite:function(){return o.default;},version:function(){return i.default;},withChartCode:function(){return r.withChartCode;},withDefaultChartCode:function(){return r.withDefaultChartCode;}});var n=a("d1751d7c"),u=a("777fffbe");n._(a("5639510f"),t),n._(a("d382b880"),t);var r=a("a574afdb"),l=u._(a("a7265236")),d=u._(a("2c69d5f6")),o=u._(a("033b3748")),i=u._(a("7cf1dc46"));},e7bada6d:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"Source",{enumerable:!0,get:function(){return u.default;}});var n=a("d1751d7c"),u=a("777fffbe")._(a("b00709ad"));n._(a("5e2dda25"),t),n._(a("969efd31"),t),n._(a("f21af0e0"),t),n._(a("33eda958"),t),n._(a("112b9a67"),t),n._(a("a45613fd"),t),n._(a("432777ba"),t);}}]);
//# sourceMappingURL=32e00b5e-async.78b3a5a3.js.map