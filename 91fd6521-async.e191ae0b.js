(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["91fd6521"],{"1d926a75":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return l;}});var a=n("a2e753d8");n("79c44ed8");var r=n("df67f0d6");let u={code:(0,r.withChartCode)({languageRenderers:{"my-ui":({children:e})=>(0,a.jsx)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:e})},components:{[r.ChartType.Pie]:r.Pie}})},i=`
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
`;var l=()=>(0,a.jsx)(r.GPTVisLite,{components:u,children:i});},"37903e7a":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return i;}});var a=n("a2e753d8");n("fc305c7d");var r=n("df67f0d6");let u=`# GPT-VIS 

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
`;var i=()=>(0,a.jsx)(r.GPTVis,{children:u});},"56c0d1a6":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return l;}});var a=n("a2e753d8");n("b447189d");var r=n("df67f0d6");let u={a(e){let{href:t,children:n}=e;return(0,a.jsx)("a",{href:t,target:"_blank",rel:"noreferrer",style:{textDecoration:"#2b8afe wavy underline"},children:n});},em(e){let{node:t,...n}=e;return(0,a.jsx)("b",{style:{background:"#f0f489",fontWeight:"bold"},...n});},code:(0,r.withDefaultChartCode)()},i=`
# Haidilao's Food Delivery Revenue (2013-2022)

Here\u{2019}s a visualization of [Haidilao](/)'s food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{
  "type": "line",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\`\`\`
`;var l=()=>(0,a.jsx)(r.GPTVisLite,{components:u,children:i});},"91441f70":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"Source",{enumerable:!0,get:function(){return r.default;}});var a=n("d1751d7c"),r=n("777fffbe")._(n("53dff23a"));a._(n("5baefd50"),t),a._(n("28eb9d62"),t),a._(n("42923712"),t),a._(n("3107d462"),t),a._(n("6eb0d2a9"),t),a._(n("e1259736"),t),a._(n("ec39a417"),t);},"9c07645c":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return o;}});var a=n("a2e753d8");n("0247468d");var r=n("df67f0d6"),u=n("9d065c04");let i={code:(0,r.withChartCode)({languageRenderers:{"my-ui":({children:e})=>{let t=(0,r.useEventPublish)();return(0,a.jsxs)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:[(0,a.jsx)("p",{children:e}),(0,a.jsx)("button",{onClick:()=>{t("xxxclick",{});},type:"button",children:"click"})]});}},components:{}})},l=`
\`\`\`my-ui
my ui data ...
\`\`\`
`;var o=()=>{let[e,t]=(0,u.useState)(0);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("p",{children:["count: ",e]}),(0,a.jsx)(r.GPTVisLite,{eventSubs:{xxxclick:e=>{console.log("data: ",e),t(e=>e+1);}},components:i,children:l})]});};},b316d85b:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{MyContext:function(){return l;},default:function(){return s;},useMyContext:function(){return o;}});var a=n("852bbaa9"),r=n("a2e753d8");n("b62c491c");var u=n("df67f0d6"),i=a._(n("9d065c04"));let l=i.default.createContext(null);function o(){let e=i.default.useContext(l);if(void 0===e||0===Object.keys(e).length)throw Error("useMyContext must be used within a MyContext.Provider");return e;}let d={code:(0,u.withChartCode)({languageRenderers:{"my-ui":({children:e})=>{let t=o();return console.log("context: ",t),(0,r.jsxs)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:[(0,r.jsx)("p",{children:e}),(0,r.jsx)("button",{onClick:null==t?void 0:t.onClick,type:"button",children:"click"})]});}},components:{}})},c=`
\`\`\`my-ui
my ui data ...
\`\`\`
`;var s=()=>{let[e,t]=(0,i.useState)(0),n=(0,i.useCallback)(()=>{console.log("handleClick"),t(e=>e+1);},[]),a=(0,i.useMemo)(()=>({count:e,onClick:n}),[e]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["count: ",e]}),(0,r.jsx)(l.Provider,{value:a,children:(0,r.jsx)("div",{children:(0,r.jsx)("div",{children:(0,r.jsx)(u.GPTVisLite,{components:d,children:c})})})})]});};},df67f0d6:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{ConfigProvider:function(){return l.default;},GPTVis:function(){return o.default;},GPTVisLite:function(){return d.default;},useEventPublish:function(){return d.useEventPublish;},version:function(){return c.default;},withChartCode:function(){return i.withChartCode;},withDefaultChartCode:function(){return i.withDefaultChartCode;}});var a=n("d1751d7c"),r=n("777fffbe"),u=n("852bbaa9");a._(n("5639510f"),t),a._(n("d382b880"),t);var i=n("a574afdb"),l=r._(n("a7265236")),o=r._(n("2c69d5f6")),d=u._(n("033b3748")),c=r._(n("7cf1dc46"));}}]);
//# sourceMappingURL=91fd6521-async.e191ae0b.js.map