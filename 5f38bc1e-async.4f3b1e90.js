(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["5f38bc1e"],{"12614c0e":function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.d(a,"default",{enumerable:!0,get:function(){return l;}});var t=n("a2e753d8");n("10bd6db2");var u=n("d88f8877"),r=n("df67f0d6");let o=`
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
`,d={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},f=(0,r.withChartCode)({components:{[r.ChartType.Radar]:r.Radar}}),i=e=>(0,t.jsx)(r.GPTVisLite,{components:{code:f},children:e});var l=()=>(0,t.jsxs)("div",{style:d,children:[(0,t.jsx)(u.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6C34\u679C\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,t.jsx)(u.Bubble,{content:o,messageRender:i,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"938cfb3d":function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.d(a,"default",{enumerable:!0,get:function(){return o;}});var t=n("a2e753d8");n("9e0e4e69");var u=n("df67f0d6");let r=[{name:"\u6C9F\u901A\u80FD\u529B",value:2},{name:"\u534F\u4F5C\u80FD\u529B",value:3},{name:"\u9886\u5BFC\u80FD\u529B",value:2},{name:"\u5B66\u4E60\u80FD\u529B",value:5},{name:"\u521B\u65B0\u80FD\u529B",value:6},{name:"\u6280\u672F\u80FD\u529B",value:9}];var o=()=>(0,t.jsx)(u.Radar,{data:r,containerStyle:{height:300}});},c1f97feb:function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.d(a,"Source",{enumerable:!0,get:function(){return u.default;}});var t=n("d1751d7c"),u=n("777fffbe")._(n("63855282"));t._(n("a97b4ee8"),a),t._(n("d9b661b3"),a),t._(n("1686747a"),a),t._(n("382f6ca4"),a),t._(n("106867e1"),a),t._(n("fb1ec05a"),a),t._(n("3beb203b"),a);},d88f8877:function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.e(a,{Actions:function(){return r.default;},Attachments:function(){return o.default;},Bubble:function(){return f.default;},Conversations:function(){return i.default;},Prompts:function(){return l.default;},Sender:function(){return d.default;},Suggestion:function(){return s.default;},ThoughtChain:function(){return c.default;},Welcome:function(){return b.default;},XProvider:function(){return A.default;},XRequest:function(){return g.default;},XStream:function(){return p.default;},useXAgent:function(){return v.default;},useXChat:function(){return m.default;},version:function(){return u.default;}});var t=n("777fffbe"),u=t._(n("3edfbc06")),r=t._(n("5a3fc685")),o=t._(n("03beb35e")),d=t._(n("c9165ac3")),f=t._(n("ff25a18a")),i=t._(n("612eb5e2")),l=t._(n("edb83f8b")),c=t._(n("ca7410f4")),s=t._(n("c050d803")),b=t._(n("d2663e62")),A=t._(n("fa9eca97")),m=t._(n("5125e7a0")),v=t._(n("eb6f09a6")),p=t._(n("42620b25")),g=t._(n("233c6aa7"));},df67f0d6:function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.e(a,{ConfigProvider:function(){return d.default;},GPTVis:function(){return f.default;},GPTVisLite:function(){return i.default;},useEventPublish:function(){return i.useEventPublish;},version:function(){return l.default;},withChartCode:function(){return o.withChartCode;},withDefaultChartCode:function(){return o.withDefaultChartCode;}});var t=n("d1751d7c"),u=n("777fffbe"),r=n("852bbaa9");t._(n("5639510f"),a),t._(n("d382b880"),a);var o=n("a574afdb"),d=u._(n("a7265236")),f=u._(n("2c69d5f6")),i=r._(n("033b3748")),l=u._(n("7cf1dc46"));},e7f49784:function(e,a,n){"use strict";n.d(a,"__esModule",{value:!0}),n.d(a,"default",{enumerable:!0,get:function(){return l;}});var t=n("a2e753d8");n("85edf161");var u=n("d88f8877"),r=n("df67f0d6");let o=`
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
`,d={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},f=(0,r.withChartCode)({components:{[r.ChartType.Radar]:r.Radar}}),i=e=>(0,t.jsx)(r.GPTVisLite,{components:{code:f},children:e});var l=()=>(0,t.jsxs)("div",{style:d,children:[(0,t.jsx)(u.Bubble,{placement:"end",content:"\u5BF9\u7EF4\u5EA6\u53EF\u89C6\u5316\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,t.jsx)(u.Bubble,{content:o,messageRender:i,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});}}]);
//# sourceMappingURL=5f38bc1e-async.4f3b1e90.js.map