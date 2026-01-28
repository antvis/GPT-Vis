(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["6eb1bbc9"],{"2ce50c00":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return d;}});var r=a("a2e753d8");a("6012f323");var u=a("36d8a4f8"),n=a("df67f0d6");let o=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{67F1}\u{72B6}\u{56FE}

\`\`\`vis-chart
{
  "type": "column",
  "data": [{"category":"2013","value":59.3},{"category":"2014","value":64.4},{"category":"2015","value":68.9},{"category":"2016","value":74.4},{"category":"2017","value":82.7},{"category":"2018","value":91.9},{"category":"2019","value":99.1},{"category":"2020","value":101.6},{"category":"2021","value":114.4},{"category":"2022","value":121}],
  "axisXTitle": "year",
  "axisYTitle": "GDP"
}
\`\`\`
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},i=(0,n.withChartCode)({components:{[n.ChartType.Column]:n.Column},style:{width:350}}),c=e=>(0,r.jsx)(n.GPTVisLite,{components:{code:i},children:e});var d=()=>(0,r.jsxs)("div",{style:l,children:[(0,r.jsx)(u.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6700\u8FD1\u51E0\u5E74 GDP \u60C5\u51B5",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,r.jsx)(u.Bubble,{content:o,messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"36d8a4f8":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{Actions:function(){return n.default;},Attachments:function(){return o.default;},Bubble:function(){return i.default;},Conversations:function(){return c.default;},Prompts:function(){return d.default;},Sender:function(){return l.default;},Suggestion:function(){return f.default;},ThoughtChain:function(){return s.default;},Welcome:function(){return g.default;},XProvider:function(){return A.default;},XRequest:function(){return m.default;},XStream:function(){return p.default;},useXAgent:function(){return b.default;},useXChat:function(){return v.default;},version:function(){return u.default;}});var r=a("777fffbe"),u=r._(a("f5f0d9bb")),n=r._(a("faa71e2d")),o=r._(a("4b30c990")),l=r._(a("7b31f050")),i=r._(a("6250cf6d")),c=r._(a("1fccaf05")),d=r._(a("453b775e")),s=r._(a("752de3f1")),f=r._(a("21c831ca")),g=r._(a("93d32012")),A=r._(a("d52145fb")),v=r._(a("89babbae")),b=r._(a("81745cc0")),p=r._(a("b59532a4")),m=r._(a("99124e3b"));},"79b43c44":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return d;}});var r=a("a2e753d8");a("9154e165");var u=a("36d8a4f8"),n=a("df67f0d6");let o=`
\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{67F1}\u{72B6}\u{56FE}

\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "\u{5317}\u{4EAC}", "value": 825.6, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{5317}\u{4EAC}", "value": 60.2, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" },
    { "category": "\u{4E0A}\u{6D77}", "value": 450, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{4E0A}\u{6D77}", "value": 95, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" },
    { "category": "\u{6DF1}\u{5733}", "value": 506, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{6DF1}\u{5733}", "value": 76.7, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" },
    { "category": "\u{5E7F}\u{5DDE}", "value": 976.6, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{5E7F}\u{5DDE}", "value": 97.2, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" },
    { "category": "\u{676D}\u{5DDE}", "value": 651.2, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{676D}\u{5DDE}", "value": 62, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" }
  ],
  "stack": true,
  "axisXTitle": "\u{57CE}\u{5E02}",
  "axisYTitle": "\u{552E}\u{91CF}"
}
\`\`\`
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},i=(0,n.withChartCode)({components:{[n.ChartType.Column]:n.Column}}),c=e=>(0,r.jsx)(n.GPTVisLite,{components:{code:i},children:e});var d=()=>(0,r.jsxs)("div",{style:l,children:[(0,r.jsx)(u.Bubble,{placement:"end",content:"\u4E3B\u8981\u57CE\u5E02\u6CB9\u8F66\u4E0E\u65B0\u80FD\u6E90\u6C7D\u8F66\u7684\u552E\u5356\u91CF\u5BF9\u6BD4",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,r.jsx)(u.Bubble,{content:o,messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"7dca4d14":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"Source",{enumerable:!0,get:function(){return u.default;}});var r=a("d1751d7c"),u=a("777fffbe")._(a("e5365288"));r._(a("1ad5815b"),t),r._(a("7f6e4cdf"),t),r._(a("450e3722"),t),r._(a("711e7b38"),t),r._(a("9f3735c7"),t),r._(a("75cceb9a"),t),r._(a("d17b15fe"),t);},df67f0d6:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{ConfigProvider:function(){return l.default;},GPTVis:function(){return i.default;},GPTVisLite:function(){return c.default;},useEventPublish:function(){return c.useEventPublish;},version:function(){return d.default;},withChartCode:function(){return o.withChartCode;},withDefaultChartCode:function(){return o.withDefaultChartCode;}});var r=a("d1751d7c"),u=a("777fffbe"),n=a("852bbaa9");r._(a("5639510f"),t),r._(a("d382b880"),t),r._(a("8e074ce8"),t);var o=a("a574afdb"),l=u._(a("a7265236")),i=u._(a("2c69d5f6")),c=n._(a("033b3748")),d=u._(a("7cf1dc46"));},e0ce15c7:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return d;}});var r=a("a2e753d8");a("6944036d");var u=a("36d8a4f8"),n=a("df67f0d6");let o=`
\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{67F1}\u{72B6}\u{56FE}

\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "\u{5317}\u{4EAC}", "value": 825.6, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{5317}\u{4EAC}", "value": 60.2, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" },
    { "category": "\u{4E0A}\u{6D77}", "value": 450, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{4E0A}\u{6D77}", "value": 95, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" },
    { "category": "\u{6DF1}\u{5733}", "value": 506, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{6DF1}\u{5733}", "value": 76.7, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" },
    { "category": "\u{5E7F}\u{5DDE}", "value": 976.6, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{5E7F}\u{5DDE}", "value": 97.2, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" },
    { "category": "\u{676D}\u{5DDE}", "value": 651.2, "group": "\u{6CB9}\u{8F66}" },
    { "category": "\u{676D}\u{5DDE}", "value": 62, "group": "\u{65B0}\u{80FD}\u{6E90}\u{6C7D}\u{8F66}" }
  ],
  "group": true,
  "axisXTitle": "\u{57CE}\u{5E02}",
  "axisYTitle": "\u{552E}\u{91CF}",
  "theme": "academy"
}
\`\`\`
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},i=(0,n.withChartCode)({components:{[n.ChartType.Column]:n.Column}}),c=e=>(0,r.jsx)(n.GPTVisLite,{components:{code:i},children:e});var d=()=>(0,r.jsxs)("div",{style:l,children:[(0,r.jsx)(u.Bubble,{placement:"end",content:"\u4E3B\u8981\u57CE\u5E02\u6CB9\u8F66\u4E0E\u65B0\u80FD\u6E90\u6C7D\u8F66\u7684\u552E\u5356\u91CF\u5BF9\u6BD4",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,r.jsx)(u.Bubble,{content:o,messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},f6144435:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{PALETTE_1:function(){return c;},PALETTE_2:function(){return d;},PALETTE_3:function(){return s;},default:function(){return f;}});var r=a("a2e753d8");a("9639f0de");var u=a("df67f0d6"),n=a("5c709dd2"),o=a("9d065c04");let l=[{type:"1-3\u79D2",value:.16},{type:"4-10\u79D2",value:.125},{type:"11-30\u79D2",value:.24},{type:"31-60\u79D2",value:.19},{type:"1-3\u5206",value:.22},{type:"3-10\u5206",value:.05},{type:"10-30\u5206",value:.01},{type:"30+\u5206",value:.015}],i=["default","academy","dark"],c=["#8459fc","#ff89bd","#1677ff","#00c2ff","#ff9a00"],d=["#1B9E77","#D95F02","#7570B3","#E7298A","#66A61E"],s=["#7593ed","#95e3b0","#6c7893","#e7c450","#7460eb"];var f=()=>{let[e,t]=(0,o.useState)("default"),[a,f]=(0,o.useState)(""),[g,A]=(0,o.useState)([]);return(0,r.jsxs)("div",{children:[(0,r.jsxs)(n.Form,{layout:"inline",style:{marginBottom:12},initialValues:{theme:e,backgroundColor:a,palette:g},onValuesChange:e=>{if(e.theme&&(t(e.theme),A([])),void 0!==e.backgroundColor&&f(e.backgroundColor),void 0!==e.palette){let t=e.palette;if("string"==typeof t)try{t=JSON.parse(t);}catch{t=[];}A(Array.isArray(t)?t:[]);}else A([]);},children:[(0,r.jsx)(n.Form.Item,{label:"Theme",name:"theme",style:{marginBottom:6},children:(0,r.jsx)(n.Select,{style:{width:120},options:i.map(e=>({label:e,value:e}))})}),(0,r.jsx)(n.Form.Item,{label:"Background",name:"backgroundColor",rules:[{pattern:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,message:"\u8BF7\u8F93\u5165\u6709\u6548\u7684\u8272\u503C\u7F16\u7801\uFF0C\u4F8B\u5982 #fff \u6216 #ffffff"}],style:{marginBottom:6},children:(0,r.jsx)(n.Input,{placeholder:"#ffffff",style:{width:120}})}),(0,r.jsx)(n.Form.Item,{label:"Palette",name:"palette",style:{marginBottom:6},children:(0,r.jsx)(n.Select,{placeholder:"\u9009\u62E9\u8C03\u8272\u677F",style:{width:200},options:[{label:`\u{8272}\u{677F}1: ${c.join(", ")}`,value:JSON.stringify(c)},{label:`\u{8272}\u{677F}2: ${d.join(", ")}`,value:JSON.stringify(d)},{label:`\u{8272}\u{677F}3: ${s.join(", ")}`,value:JSON.stringify(s)}],allowClear:!0})})]},e),(0,r.jsx)(u.Column,{data:l,xField:"type",yField:"value",axisXTitle:"type",axisYTitle:"value",containerStyle:{height:300},theme:e,style:{backgroundColor:a,palette:g,radiusTopLeft:4,radiusTopRight:4}})]});};}}]);
//# sourceMappingURL=6eb1bbc9-async.5d9be405.js.map