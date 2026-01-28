(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["2cf24a06"],{"0d19db32":function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.d(a,"default",{enumerable:!0,get:function(){return c;}});var r=t("a2e753d8");t("fbf8d061");var n=t("36d8a4f8"),o=t("df67f0d6");let u=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{6761}\u{5F62}\u{56FE}

\`\`\`vis-chart
{
  "type": "bar",
  "data": [
    { "group": "London", "category": "Jan.", "value": 18.9 },
    { "group": "London", "category": "Feb.", "value": 28.8 },
    { "group": "London", "category": "Mar.", "value": 39.3 },
    { "group": "London", "category": "Apr.", "value": 81.4 },
    { "group": "London", "category": "May.", "value": 47 },
    { "group": "London", "category": "Jun.", "value": 20.3 },
    { "group": "London", "category": "Jul.", "value": 24 },
    { "group": "London", "category": "Aug.", "value": 35.6 },
    { "group": "Berlin", "category": "Jan.", "value": 12.4 },
    { "group": "Berlin", "category": "Feb.", "value": 23.2 },
    { "group": "Berlin", "category": "Mar.", "value": 34.5 },
    { "group": "Berlin", "category": "Apr.", "value": 99.7 },
    { "group": "Berlin", "category": "May.", "value": 52.6 },
    { "group": "Berlin", "category": "Jun.", "value": 35.5 },
    { "group": "Berlin", "category": "Jul.", "value": 37.4 },
    { "group": "Berlin", "category": "Aug.", "value": 42.4 }
  ],
  "group": true,
  "axisXTitle": "month",
  "axisYTitle": "value"
}
\`\`\`
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},d=(0,o.withChartCode)({components:{[o.ChartType.Bar]:o.Bar}}),i=e=>(0,r.jsx)(o.GPTVisLite,{components:{code:d},children:e});var c=()=>(0,r.jsxs)("div",{style:l,children:[(0,r.jsx)(n.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,r.jsx)(n.Bubble,{content:u,messageRender:i,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"1856afc8":function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.d(a,"default",{enumerable:!0,get:function(){return c;}});var r=t("a2e753d8");t("a7cff687");var n=t("36d8a4f8"),o=t("df67f0d6");let u=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{6761}\u{5F62}\u{56FE}

\`\`\`vis-chart
{
  "type": "bar",
  "data": [
        { "category": "1951 \u{5E74}", "value": 38 },
        { "category": "1952 \u{5E74}", "value": 52 },
        { "category": "1956 \u{5E74}", "value": 61 },
        { "category": "1957 \u{5E74}", "value": 145 },
        { "category": "1958 \u{5E74}", "value": 48 },
        { "category": "1959 \u{5E74}", "value": 38 },
        { "category": "1960 \u{5E74}", "value": 38 },
        { "category": "1962 \u{5E74}", "value": 38 }
  ],
  "axisXTitle": "year",
  "axisYTitle": "sales"
}
\`\`\`
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},d=(0,o.withChartCode)({components:{[o.ChartType.Bar]:o.Bar}}),i=e=>(0,r.jsx)(o.GPTVisLite,{components:{code:d},children:e});var c=()=>(0,r.jsxs)("div",{style:l,children:[(0,r.jsx)(n.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6700\u8FD1\u51E0\u5E74\u9500\u552E\u60C5\u51B5",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,r.jsx)(n.Bubble,{content:u,messageRender:i,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"36d8a4f8":function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.e(a,{Actions:function(){return o.default;},Attachments:function(){return u.default;},Bubble:function(){return d.default;},Conversations:function(){return i.default;},Prompts:function(){return c.default;},Sender:function(){return l.default;},Suggestion:function(){return s.default;},ThoughtChain:function(){return f.default;},Welcome:function(){return g.default;},XProvider:function(){return A.default;},XRequest:function(){return y.default;},XStream:function(){return p.default;},useXAgent:function(){return b.default;},useXChat:function(){return v.default;},version:function(){return n.default;}});var r=t("777fffbe"),n=r._(t("f5f0d9bb")),o=r._(t("faa71e2d")),u=r._(t("4b30c990")),l=r._(t("7b31f050")),d=r._(t("6250cf6d")),i=r._(t("1fccaf05")),c=r._(t("453b775e")),f=r._(t("752de3f1")),s=r._(t("21c831ca")),g=r._(t("93d32012")),A=r._(t("d52145fb")),v=r._(t("89babbae")),b=r._(t("81745cc0")),p=r._(t("b59532a4")),y=r._(t("99124e3b"));},"42afd7cf":function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.d(a,"default",{enumerable:!0,get:function(){return c;}});var r=t("a2e753d8");t("b31cf3ca");var n=t("36d8a4f8"),o=t("df67f0d6");let u=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{6761}\u{5F62}\u{56FE}

\`\`\`vis-chart
{
  "type": "bar",
  "data": [
    { "group": "London", "category": "Jan.", "value": 18.9 },
    { "group": "London", "category": "Feb.", "value": 28.8 },
    { "group": "London", "category": "Mar.", "value": 39.3 },
    { "group": "London", "category": "Apr.", "value": 81.4 },
    { "group": "London", "category": "May.", "value": 47 },
    { "group": "London", "category": "Jun.", "value": 20.3 },
    { "group": "London", "category": "Jul.", "value": 24 },
    { "group": "London", "category": "Aug.", "value": 35.6 },
    { "group": "Berlin", "category": "Jan.", "value": 12.4 },
    { "group": "Berlin", "category": "Feb.", "value": 23.2 },
    { "group": "Berlin", "category": "Mar.", "value": 34.5 },
    { "group": "Berlin", "category": "Apr.", "value": 99.7 },
    { "group": "Berlin", "category": "May.", "value": 52.6 },
    { "group": "Berlin", "category": "Jun.", "value": 35.5 },
    { "group": "Berlin", "category": "Jul.", "value": 37.4 },
    { "group": "Berlin", "category": "Aug.", "value": 42.4 }
  ],
  "stack": true,
  "axisXTitle": "month",
  "axisYTitle": "value"
}
\`\`\`
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},d=(0,o.withChartCode)({components:{[o.ChartType.Bar]:o.Bar}}),i=e=>(0,r.jsx)(o.GPTVisLite,{components:{code:d},children:e});var c=()=>(0,r.jsxs)("div",{style:l,children:[(0,r.jsx)(n.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,r.jsx)(n.Bubble,{content:u,messageRender:i,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"7dca4d14":function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.d(a,"Source",{enumerable:!0,get:function(){return n.default;}});var r=t("d1751d7c"),n=t("777fffbe")._(t("e5365288"));r._(t("1ad5815b"),a),r._(t("7f6e4cdf"),a),r._(t("450e3722"),a),r._(t("711e7b38"),a),r._(t("9f3735c7"),a),r._(t("75cceb9a"),a),r._(t("d17b15fe"),a);},df67f0d6:function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.e(a,{ConfigProvider:function(){return l.default;},GPTVis:function(){return d.default;},GPTVisLite:function(){return i.default;},useEventPublish:function(){return i.useEventPublish;},version:function(){return c.default;},withChartCode:function(){return u.withChartCode;},withDefaultChartCode:function(){return u.withDefaultChartCode;}});var r=t("d1751d7c"),n=t("777fffbe"),o=t("852bbaa9");r._(t("5639510f"),a),r._(t("d382b880"),a),r._(t("8e074ce8"),a);var u=t("a574afdb"),l=n._(t("a7265236")),d=n._(t("2c69d5f6")),i=o._(t("033b3748")),c=n._(t("7cf1dc46"));},fd5e13ef:function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.e(a,{PALETTE_1:function(){return i;},PALETTE_2:function(){return c;},PALETTE_3:function(){return f;},default:function(){return s;}});var r=t("a2e753d8");t("68491f3d");var n=t("df67f0d6"),o=t("5c709dd2"),u=t("9d065c04");let l=[{\u57CE\u5E02:"\u4E03\u53F0\u6CB3",\u9500\u552E\u989D:52827.32},{\u57CE\u5E02:"\u4E07\u53BF",\u9500\u552E\u989D:16921.576},{\u57CE\u5E02:"\u4E09\u4E9A",\u9500\u552E\u989D:22698.396},{\u57CE\u5E02:"\u4E09\u5C94\u5B50",\u9500\u552E\u989D:3262.98},{\u57CE\u5E02:"\u4E0A\u6D77",\u9500\u552E\u989D:182450.567},{\u57CE\u5E02:"\u4E0A\u865E",\u9500\u552E\u989D:10672.872},{\u57CE\u5E02:"\u4E1C\u4E30",\u9500\u552E\u989D:1785.84},{\u57CE\u5E02:"\u4E1C\u53F0",\u9500\u552E\u989D:2789.892},{\u57CE\u5E02:"\u4E1C\u5B81",\u9500\u552E\u989D:2706.2},{\u57CE\u5E02:"\u4E1C\u6751",\u9500\u552E\u989D:13692.14},{\u57CE\u5E02:"\u4E1C\u6D77",\u9500\u552E\u989D:4508.28},{\u57CE\u5E02:"\u4E1C\u80DC",\u9500\u552E\u989D:12766.068},{\u57CE\u5E02:"\u4E1C\u839E",\u9500\u552E\u989D:10165.89},{\u57CE\u5E02:"\u4E1C\u8425",\u9500\u552E\u989D:17153.92},{\u57CE\u5E02:"\u4E2D\u67A2",\u9500\u552E\u989D:1050.42},{\u57CE\u5E02:"\u4E30\u53BF",\u9500\u552E\u989D:10309.516},{\u57CE\u5E02:"\u4E30\u9547",\u9500\u552E\u989D:3507.336},{\u57CE\u5E02:"\u4E34\u6C34",\u9500\u552E\u989D:21443.1},{\u57CE\u5E02:"\u4E34\u6C5F",\u9500\u552E\u989D:36496.74},{\u57CE\u5E02:"\u4E34\u6C7E",\u9500\u552E\u989D:26205.48},{\u57CE\u5E02:"\u4E34\u6C82",\u9500\u552E\u989D:97200.74},{\u57CE\u5E02:"\u4E34\u6D77",\u9500\u552E\u989D:7071.456},{\u57CE\u5E02:"\u4E34\u6E05",\u9500\u552E\u989D:38676.12},{\u57CE\u5E02:"\u4E39\u4E1C",\u9500\u552E\u989D:45447.612},{\u57CE\u5E02:"\u4E39\u6C5F\u53E3",\u9500\u552E\u989D:4879.616},{\u57CE\u5E02:"\u4E3D\u6C34",\u9500\u552E\u989D:3983.616},{\u57CE\u5E02:"\u4E49\u4E4C",\u9500\u552E\u989D:34511.624},{\u57CE\u5E02:"\u4E49\u9A6C",\u9500\u552E\u989D:1144.024},{\u57CE\u5E02:"\u4E4C\u6D77",\u9500\u552E\u989D:16096.64},{\u57CE\u5E02:"\u4E4C\u8FBE",\u9500\u552E\u989D:3474.66},{\u57CE\u5E02:"\u4E50\u57CE",\u9500\u552E\u989D:3241},{\u57CE\u5E02:"\u4E50\u5C71",\u9500\u552E\u989D:12561.892},{\u57CE\u5E02:"\u4E5D\u53F0",\u9500\u552E\u989D:32535.944},{\u57CE\u5E02:"\u4E5D\u6C5F",\u9500\u552E\u989D:29890.7},{\u57CE\u5E02:"\u4E8C\u9053\u6C5F",\u9500\u552E\u989D:4461.24},{\u57CE\u5E02:"\u4E91\u6D6E",\u9500\u552E\u989D:6351.212},{\u57CE\u5E02:"\u4E91\u9633",\u9500\u552E\u989D:24699.64},{\u57CE\u5E02:"\u4E94\u5E38",\u9500\u552E\u989D:3771.46},{\u57CE\u5E02:"\u4EB3\u5DDE",\u9500\u552E\u989D:16961.14},{\u57CE\u5E02:"\u4ED9\u5C45",\u9500\u552E\u989D:6868.512},{\u57CE\u5E02:"\u4ED9\u6843",\u9500\u552E\u989D:16600.164},{\u57CE\u5E02:"\u4EEA\u5F81",\u9500\u552E\u989D:8566.628},{\u57CE\u5E02:"\u4EFB\u4E18",\u9500\u552E\u989D:12106.78},{\u57CE\u5E02:"\u4F59\u4E0B",\u9500\u552E\u989D:103.04},{\u57CE\u5E02:"\u4F59\u59DA",\u9500\u552E\u989D:12621.84},{\u57CE\u5E02:"\u4F5B\u5C71",\u9500\u552E\u989D:7500.388},{\u57CE\u5E02:"\u4F73\u6728\u65AF",\u9500\u552E\u989D:63263.34},{\u57CE\u5E02:"\u4F9D\u5170",\u9500\u552E\u989D:26874.82},{\u57CE\u5E02:"\u4FDD\u5B9A",\u9500\u552E\u989D:124133.1},{\u57CE\u5E02:"\u4FE1\u5B9C",\u9500\u552E\u989D:4771.06},{\u57CE\u5E02:"\u4FE1\u9633",\u9500\u552E\u989D:38849.412},{\u57CE\u5E02:"\u5156\u5DDE",\u9500\u552E\u989D:28648.2},{\u57CE\u5E02:"\u516C\u4E3B\u5CAD",\u9500\u552E\u989D:21210.756},{\u57CE\u5E02:"\u516D\u5408",\u9500\u552E\u989D:5775.98},{\u57CE\u5E02:"\u5170\u5DDE",\u9500\u552E\u989D:42543.144}],d=["default","academy","dark"],i=["#8459fc","#ff89bd","#1677ff","#00c2ff","#ff9a00"],c=["#1B9E77","#D95F02","#7570B3","#E7298A","#66A61E"],f=["#7593ed","#95e3b0","#6c7893","#e7c450","#7460eb"];var s=()=>{let[e,a]=(0,u.useState)("default"),[t,s]=(0,u.useState)(""),[g,A]=(0,u.useState)([]);return(0,r.jsxs)("div",{children:[(0,r.jsxs)(o.Form,{layout:"inline",style:{marginBottom:12},initialValues:{theme:e,backgroundColor:t,palette:g},onValuesChange:e=>{if(e.theme&&(a(e.theme),A([])),void 0!==e.backgroundColor&&s(e.backgroundColor),void 0!==e.palette){let a=e.palette;if("string"==typeof a)try{a=JSON.parse(a);}catch{a=[];}A(Array.isArray(a)?a:[]);}},children:[(0,r.jsx)(o.Form.Item,{label:"Theme",name:"theme",style:{marginBottom:6},children:(0,r.jsx)(o.Select,{style:{width:120},options:d.map(e=>({label:e,value:e}))})}),(0,r.jsx)(o.Form.Item,{label:"Background",name:"backgroundColor",rules:[{pattern:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,message:"\u8BF7\u8F93\u5165\u6709\u6548\u7684\u8272\u503C\u7F16\u7801\uFF0C\u4F8B\u5982 #fff \u6216 #ffffff"}],style:{marginBottom:6},children:(0,r.jsx)(o.Input,{placeholder:"#ffffff",style:{width:120}})}),(0,r.jsx)(o.Form.Item,{label:"Palette",name:"palette",style:{marginBottom:6},children:(0,r.jsx)(o.Select,{placeholder:"\u9009\u62E9\u8C03\u8272\u677F",style:{width:200},options:[{label:`\u{8272}\u{677F}1: ${i.join(", ")}`,value:JSON.stringify(i)},{label:`\u{8272}\u{677F}2: ${c.join(", ")}`,value:JSON.stringify(c)},{label:`\u{8272}\u{677F}3: ${f.join(", ")}`,value:JSON.stringify(f)}],allowClear:!0})})]},e),(0,r.jsx)(n.Bar,{data:l,xField:"\u57CE\u5E02",yField:"\u9500\u552E\u989D",axisXTitle:"\u57CE\u5E02",axisYTitle:"\u9500\u552E\u989D",theme:e,style:{backgroundColor:t,palette:g}})]});};}}]);
//# sourceMappingURL=2cf24a06-async.57964b9a.js.map