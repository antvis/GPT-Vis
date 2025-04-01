(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["5f38bc1e"],{"11f8c980":function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.e(a,{Attachments:function(){return r.default;},Bubble:function(){return o.default;},Conversations:function(){return i.default;},Prompts:function(){return f.default;},Sender:function(){return d.default;},Suggestion:function(){return c.default;},ThoughtChain:function(){return l.default;},Welcome:function(){return s.default;},XProvider:function(){return m.default;},XRequest:function(){return p.default;},XStream:function(){return v.default;},useXAgent:function(){return b.default;},useXChat:function(){return A.default;},version:function(){return u.default;}});var t=n("777fffbe"),u=t._(n("fee9194e")),r=t._(n("772b829d")),d=t._(n("38cd4593")),o=t._(n("0b4ce24e")),i=t._(n("252ac52e")),f=t._(n("0d932f2a")),l=t._(n("dabca7da")),c=t._(n("a7c4581a")),s=t._(n("21ba459e")),m=t._(n("79553279")),A=t._(n("ad2e4f85")),b=t._(n("642231e2")),v=t._(n("234f8a0e")),p=t._(n("9b25ee4f"));},"12614c0e":function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.d(a,"default",{enumerable:!0,get:function(){return l;}});var t=n("a2e753d8");n("10bd6db2");var u=n("11f8c980"),r=n("df67f0d6");let d=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{96F7}\u{8FBE}\u{56FE}

\`\`\`vis-chart
{
  "type": "radar",
  "data": [
    { "group": "Apple", "name": "Vitamin C", "value": 5 },
    { "group": "Apple", "name": "Fiber", "value": 7 },
    { "group": "Apple", "name": "Sugar", "value": 6 },
    { "group": "Apple", "name": "Protein", "value": 2 },
    { "group": "Apple", "name": "Iron", "value": 3 },
    { "group": "Apple", "name": "Calcium", "value": 2 },
    { "group": "Banana", "name": "Vitamin C", "value": 4 },
    { "group": "Banana", "name": "Fiber", "value": 5 },
    { "group": "Banana", "name": "Sugar", "value": 7 },
    { "group": "Banana", "name": "Protein", "value": 3 },
    { "group": "Banana", "name": "Iron", "value": 2 },
    { "group": "Banana", "name": "Calcium", "value": 3 }
  ]
}
\`\`\`
`,o={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},i=(0,r.withChartCode)({components:{[r.ChartType.Radar]:r.Radar}}),f=e=>(0,t.jsx)(r.GPTVisLite,{components:{code:i},children:e});var l=()=>(0,t.jsxs)("div",{style:o,children:[(0,t.jsx)(u.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6C34\u679C\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,t.jsx)(u.Bubble,{content:d,messageRender:f,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"938cfb3d":function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.d(a,"default",{enumerable:!0,get:function(){return d;}});var t=n("a2e753d8");n("9e0e4e69");var u=n("df67f0d6");let r=[{name:"\u6C9F\u901A\u80FD\u529B",value:2},{name:"\u534F\u4F5C\u80FD\u529B",value:3},{name:"\u9886\u5BFC\u80FD\u529B",value:2},{name:"\u5B66\u4E60\u80FD\u529B",value:5},{name:"\u521B\u65B0\u80FD\u529B",value:6},{name:"\u6280\u672F\u80FD\u529B",value:9}];var d=()=>(0,t.jsx)(u.Radar,{data:r,containerStyle:{height:300}});},c19296a1:function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.d(a,"Source",{enumerable:!0,get:function(){return u.default;}});var t=n("d1751d7c"),u=n("777fffbe")._(n("f7d3e1e7"));t._(n("5124a778"),a),t._(n("ce96b799"),a),t._(n("bd5feb0d"),a),t._(n("7b705fdd"),a),t._(n("3cf6dc2e"),a),t._(n("81f0b3e9"),a),t._(n("814632ac"),a);},df67f0d6:function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.e(a,{ConfigProvider:function(){return o.default;},GPTVis:function(){return i.default;},GPTVisLite:function(){return f.default;},useEventPublish:function(){return f.useEventPublish;},version:function(){return l.default;},withChartCode:function(){return d.withChartCode;},withDefaultChartCode:function(){return d.withDefaultChartCode;}});var t=n("d1751d7c"),u=n("777fffbe"),r=n("852bbaa9");t._(n("5639510f"),a),t._(n("d382b880"),a);var d=n("a574afdb"),o=u._(n("a7265236")),i=u._(n("2c69d5f6")),f=r._(n("033b3748")),l=u._(n("7cf1dc46"));},e7f49784:function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.d(a,"default",{enumerable:!0,get:function(){return l;}});var t=n("a2e753d8");n("85edf161");var u=n("11f8c980"),r=n("df67f0d6");let d=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{96F7}\u{8FBE}\u{56FE}

\`\`\`vis-chart
{
  "type": "radar",
  "data": [
    { "name": "Vitamin C", "value": 7 },
    { "name": "Fiber", "value": 6 },
    { "name": "Sugar", "value": 5 },
    { "name": "Protein", "value": 4 },
    { "name": "Iron", "value": 3 },
    { "name": "Calcium", "value": 2 }
  ]
}
\`\`\`
`,o={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},i=(0,r.withChartCode)({components:{[r.ChartType.Radar]:r.Radar}}),f=e=>(0,t.jsx)(r.GPTVisLite,{components:{code:i},children:e});var l=()=>(0,t.jsxs)("div",{style:o,children:[(0,t.jsx)(u.Bubble,{placement:"end",content:"\u5BF9\u7EF4\u5EA6\u53EF\u89C6\u5316\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,t.jsx)(u.Bubble,{content:d,messageRender:f,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});}}]);
//# sourceMappingURL=5f38bc1e-async.f7b9616d.js.map