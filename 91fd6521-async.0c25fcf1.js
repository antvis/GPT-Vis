(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["91fd6521"],{"1d926a75":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return d;}});var a=n("a2e753d8");n("79c44ed8");var r=n("df67f0d6");let u={code:(0,r.withChartCode)({languageRenderers:{"my-ui":({children:e})=>(0,a.jsx)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:e})},components:{[r.ChartType.Pie]:r.Pie}})},i=`
\`\`\`my-ui
my data ...
\`\`\`

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
`;var d=()=>(0,a.jsx)(r.GPTVisLite,{components:u,children:i});},"37903e7a":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return i;}});var a=n("a2e753d8");n("fc305c7d");var r=n("df67f0d6");let u=`# GPT-VIS 

Components for GPTs, generative AI, and LLM projects. Not only UI Components.

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "\u{5206}\u{7C7B}\u{4E00}", "value": 27 },
    { "category": "\u{5206}\u{7C7B}\u{4E8C}", "value": 25 },
    { "category": "\u{5206}\u{7C7B}\u{4E09}", "value": 18 },
    { "category": "\u{5176}\u{4ED6}", "value": 5 }
  ]
}
\`\`\`
`;var i=()=>(0,a.jsx)(r.GPTVis,{children:u});},"56c0d1a6":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return d;}});var a=n("a2e753d8");n("b447189d");var r=n("df67f0d6");let u={a(e){let{href:t,children:n}=e;return(0,a.jsx)("a",{href:t,target:"_blank",rel:"noreferrer",style:{textDecoration:"#2b8afe wavy underline"},children:n});},em(e){let{node:t,...n}=e;return(0,a.jsx)("b",{style:{background:"#f0f489",fontWeight:"bold"},...n});},code:(0,r.withDefaultChartCode)()},i=`
# Haidilao's Food Delivery Revenue (2013-2022)

Here\u{2019}s a visualization of [Haidilao](/)'s food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{
  "type": "line",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\`\`\`
`;var d=()=>(0,a.jsx)(r.GPTVisLite,{components:u,children:i});},"9c07645c":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return l;}});var a=n("a2e753d8");n("0247468d");var r=n("df67f0d6"),u=n("9d065c04");let i={code:(0,r.withChartCode)({languageRenderers:{"my-ui":({children:e})=>{let t=(0,r.useEventPublish)();return(0,a.jsxs)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:[(0,a.jsx)("p",{children:e}),(0,a.jsx)("button",{onClick:()=>{t("xxxclick",{});},type:"button",children:"click"})]});}},components:{}})},d=`
\`\`\`my-ui
my ui data ...
\`\`\`
`;var l=()=>{let[e,t]=(0,u.useState)(0);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("p",{children:["count: ",e]}),(0,a.jsx)(r.GPTVisLite,{eventSubs:{xxxclick:e=>{console.log("data: ",e),t(e=>e+1);}},components:i,children:d})]});};},b316d85b:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{MyContext:function(){return d;},default:function(){return s;},useMyContext:function(){return l;}});var a=n("852bbaa9"),r=n("a2e753d8");n("b62c491c");var u=n("df67f0d6"),i=a._(n("9d065c04"));let d=i.default.createContext(null);function l(){let e=i.default.useContext(d);if(void 0===e||0===Object.keys(e).length)throw Error("useMyContext must be used within a MyContext.Provider");return e;}let o={code:(0,u.withChartCode)({languageRenderers:{"my-ui":({children:e})=>{let t=l();return console.log("context: ",t),(0,r.jsxs)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:[(0,r.jsx)("p",{children:e}),(0,r.jsx)("button",{onClick:null==t?void 0:t.onClick,type:"button",children:"click"})]});}},components:{}})},c=`
\`\`\`my-ui
my ui data ...
\`\`\`
`;var s=()=>{let[e,t]=(0,i.useState)(0),n=(0,i.useCallback)(()=>{console.log("handleClick"),t(e=>e+1);},[]),a=(0,i.useMemo)(()=>({count:e,onClick:n}),[e]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["count: ",e]}),(0,r.jsx)(d.Provider,{value:a,children:(0,r.jsx)("div",{children:(0,r.jsx)("div",{children:(0,r.jsx)(u.GPTVisLite,{components:o,children:c})})})})]});};},c19296a1:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"Source",{enumerable:!0,get:function(){return r.default;}});var a=n("d1751d7c"),r=n("777fffbe")._(n("f7d3e1e7"));a._(n("5124a778"),t),a._(n("ce96b799"),t),a._(n("bd5feb0d"),t),a._(n("7b705fdd"),t),a._(n("3cf6dc2e"),t),a._(n("81f0b3e9"),t),a._(n("814632ac"),t);},df67f0d6:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{ConfigProvider:function(){return d.default;},GPTVis:function(){return l.default;},GPTVisLite:function(){return o.default;},useEventPublish:function(){return o.useEventPublish;},version:function(){return c.default;},withChartCode:function(){return i.withChartCode;},withDefaultChartCode:function(){return i.withDefaultChartCode;}});var a=n("d1751d7c"),r=n("777fffbe"),u=n("852bbaa9");a._(n("5639510f"),t),a._(n("d382b880"),t);var i=n("a574afdb"),d=r._(n("a7265236")),l=r._(n("2c69d5f6")),o=u._(n("033b3748")),c=r._(n("7cf1dc46"));}}]);
//# sourceMappingURL=91fd6521-async.0c25fcf1.js.map