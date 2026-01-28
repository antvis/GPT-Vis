(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["91fd6521"],{"1d926a75":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return o;}});var n=a("a2e753d8");a("79c44ed8");var r=a("df67f0d6");let d={code:(0,r.withChartCode)({languageRenderers:{"my-ui":({children:e})=>(0,n.jsx)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:e})},components:{[r.ChartType.Pie]:r.Pie}})},i=`
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
`;var o=()=>(0,n.jsx)(r.GPTVisLite,{components:d,children:i});},"32fb643d":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return i;}});var n=a("a2e753d8");a("723ed56b");var r=a("df67f0d6"),d=a("9d065c04"),i=()=>{let[e,t]=(0,d.useState)(!0);return(0,n.jsxs)("div",{children:[(0,n.jsx)("button",{onClick:()=>t(!e),style:{marginBottom:"16px",padding:"8px 16px",cursor:"pointer",border:"1px solid #d9d9d9",borderRadius:"4px",backgroundColor:"#fff",fontSize:"14px"},children:e?"\u6536\u8D77":"\u5C55\u5F00"}),(0,n.jsx)("div",{style:{width:e?"100%":"50%",transition:"height 0.3s ease",border:"1px solid #e8e8e8",borderRadius:"4px",padding:"16px",boxSizing:"border-box"},children:(0,n.jsx)("pre",{children:(0,n.jsx)("div",{children:(0,n.jsx)("div",{children:(0,n.jsx)(r.Pie,{data:[{category:"\u5206\u7C7B\u4E00",value:27},{category:"\u5206\u7C7B\u4E8C",value:25},{category:"\u5206\u7C7B\u4E09",value:18},{category:"\u5206\u7C7B\u56DB",value:15},{category:"\u5206\u7C7B\u4E94",value:10},{category:"\u5176\u4ED6",value:5}]})})})})}),(0,n.jsx)("p",{style:{marginTop:"16px",color:"#666",fontSize:"13px"},children:"\u70B9\u51FB\u6309\u94AE\u5207\u6362\u5BB9\u5668\u9AD8\u5EA6\uFF0C\u56FE\u8868\u4F1A\u81EA\u52A8\u9002\u5E94\u5BB9\u5668\u5927\u5C0F"})]});};},"37903e7a":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return i;}});var n=a("a2e753d8");a("fc305c7d");var r=a("df67f0d6");let d=`# GPT-VIS 

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
`;var i=()=>(0,n.jsx)(r.GPTVis,{children:d});},"3eee889d":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return o;}});var n=a("a2e753d8");a("4c8e5202");var r=a("df67f0d6"),d=a("9d065c04");let i=`

\u{4EE5}\u{4E0B}\u{662F}\u{6570}\u{636E}\u{7684}\u{53EF}\u{89C6}\u{5316}\u{5206}\u{6790}\u{FF1A}

\`\`\`vis-chart
{
  "type": "flow-diagram",
  "data": {
    "nodes": [
      { "name": "\u{5BA2}\u{6237}\u{4E0B}\u{5355}" },
      { "name": "\u{7CFB}\u{7EDF}\u{751F}\u{6210}\u{8BA2}\u{5355}" },
      { "name": "\u{4ED3}\u{5E93}\u{62E3}\u{8D27}" },
      { "name": "\u{4ED3}\u{5E93}\u{6253}\u{5305}" },
      { "name": "\u{7269}\u{6D41}\u{914D}\u{9001}" },
      { "name": "\u{5BA2}\u{6237}\u{6536}\u{8D27}" }
    ],
    "edges": [
      { "source": "\u{5BA2}\u{6237}\u{4E0B}\u{5355}", "target": "\u{7CFB}\u{7EDF}\u{751F}\u{6210}\u{8BA2}\u{5355}" },
      { "source": "\u{7CFB}\u{7EDF}\u{751F}\u{6210}\u{8BA2}\u{5355}", "target": "\u{4ED3}\u{5E93}\u{62E3}\u{8D27}" },
      { "source": "\u{4ED3}\u{5E93}\u{62E3}\u{8D27}", "target": "\u{4ED3}\u{5E93}\u{6253}\u{5305}" },
      { "source": "\u{4ED3}\u{5E93}\u{6253}\u{5305}", "target": "\u{7269}\u{6D41}\u{914D}\u{9001}" },
      { "source": "\u{7269}\u{6D41}\u{914D}\u{9001}", "target": "\u{5BA2}\u{6237}\u{6536}\u{8D27}" }
    ]
  }
}
\`\`\`

\`\`\`vis-chart
{
  "type": "line",
  "title": "\u{6708}\u{5EA6}\u{9500}\u{552E}\u{8D8B}\u{52BF}",
  "data": [
    { "time": "1\u{6708}", "value": 3000 },
    { "time": "2\u{6708}", "value": 4500 },
    { "time": "3\u{6708}", "value": 3800 },
    { "time": "4\u{6708}", "value": 5200 },
    { "time": "5\u{6708}", "value": 6100 }
  ]
}
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "title": "\u{4EA7}\u{54C1}\u{7C7B}\u{578B}\u{5206}\u{5E03}",
  "data": [
    { "category": "\u{7535}\u{5B50}\u{4EA7}\u{54C1}", "value": 45 },
    { "category": "\u{670D}\u{88C5}", "value": 30 },
    { "category": "\u{98DF}\u{54C1}", "value": 15 },
    { "category": "\u{5176}\u{4ED6}", "value": 10 }
  ]
}
\`\`\`


`;var o=()=>{let[e,t]=(0,d.useState)(!1),[a,o]=(0,d.useState)({width:0,height:0}),[l,u]=(0,d.useState)(!1);return(0,d.useEffect)(()=>{let e=setTimeout(()=>{t(!0),o({width:600,height:600});},2e3);return()=>clearTimeout(e);},[]),(0,n.jsxs)("div",{style:{padding:"20px"},children:[(0,n.jsx)("h2",{children:"\u6A21\u62DF\u573A\u666F\uFF1A\u56FE\u8868\u6839\u636E\u5BB9\u5668 resize \u6E32\u67D3"}),(0,n.jsxs)("div",{style:{marginBottom:"20px",padding:"10px",background:"#fff3cd",borderRadius:"4px"},children:[(0,n.jsx)("strong",{children:"\u26A0\uFE0F\u573A\u666F\u6A21\u62DF\uFF1A"}),(0,n.jsx)("ul",{style:{margin:"10px 0",paddingLeft:"20px"},children:(0,n.jsx)("li",{children:"\u56FE\u8868\u5BBD\u5EA6\u6839\u636E\u5BB9\u5668\u5C3A\u5BF8\u53D8\u5316"})}),(0,n.jsxs)("div",{style:{marginTop:"10px"},children:["\u5BB9\u5668\u72B6\u6001: ",e?"\u2705 \u5DF2\u5C31\u7EEA":"\u23F3 \u521D\u59CB\u5316\u4E2D...",e&&` (${a.width}x${a.height})`]}),(0,n.jsxs)("div",{style:{marginTop:"10px",display:"flex",gap:8},children:[(0,n.jsx)("button",{onClick:()=>u(!1),style:{padding:"6px 10px",borderRadius:4,border:"1px solid #d9d9d9",background:"#fff"},children:"\u5C55\u5F00\uFF08100%\uFF09"}),(0,n.jsx)("button",{onClick:()=>u(!0),style:{padding:"6px 10px",borderRadius:4,border:"1px solid #d9d9d9",background:"#fff"},children:"\u6536\u8D77\uFF0850%\uFF09"})]})]}),(0,n.jsx)("div",{style:{marginBottom:"30px"},children:(0,n.jsx)("div",{style:{border:"2px dashed #ff4d4f",padding:"10px",minHeight:"200px",background:"#fff",width:e?`${Math.round(a.width*(l?.8:1))}px`:"auto",transition:"width 0.3s"},children:(0,n.jsx)(r.GPTVis,{children:i})})})]});};},"40d101ee":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return o;}});var n=a("a2e753d8");a("46d12efb");var r=a("df67f0d6");let d={code:(0,r.withDefaultChartCode)()},i=[`\u{4E8C}\u{3001}\u{6B8B}\u{4F59}\u{6D41}\u{91CF}\u{5206}\u{6790}\u{548C}\u{5904}\u{7406}
##### 2.1 \u{6B8B}\u{4F59}\u{6D41}\u{91CF}\u{6C47}\u{603B}
\`\`\`vis-chart
{
  "type": "flow-diagram",
  "data": {
    "nodes": [
      { "name": "\u{6B8B}\u{4F59}\u{673A}\u{5668}\u{6570}\u{6838}\u{67E5}" },
      { "name": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}" },
      { "name": "\u{5B9A}\u{65F6}\u{4EFB}\u{52A1}\u{5206}\u{6790}" },
      { "name": "\u{57DF}\u{540D}\u{6D41}\u{91CF}\u{68C0}\u{6D4B}" },
      { "name": "RPC\u{6D41}\u{91CF}\u{6EAF}\u{6E90}" },
      { "name": "\u{6D88}\u{606F}\u{961F}\u{5217}\u{68C0}\u{67E5}" }
    ],
    "edges": [
      { "source": "\u{6B8B}\u{4F59}\u{673A}\u{5668}\u{6570}\u{6838}\u{67E5}", "target": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "name": "\u{53D1}\u{73B0}5\u{53F0}\u{6B8B}\u{4F59}\u{673A}\u{5668}" },
      { "source": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "target": "RPC\u{6D41}\u{91CF}\u{6EAF}\u{6E90}", "name": "\u{8BC6}\u{522B}9154\u{6B21}/\u{5929}\u{670D}\u{52A1}\u{8C03}\u{7528}" },
      { "source": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "target": "\u{5B9A}\u{65F6}\u{4EFB}\u{52A1}\u{5206}\u{6790}", "name": "\u{5B9A}\u{65F6}\u{4EFB}\u{52A1}\u{96F6}\u{98CE}\u{9669}" },
      { "source": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "target": "\u{57DF}\u{540D}\u{6D41}\u{91CF}\u{68C0}\u{6D4B}", "name": "\u{65E0}PV\u{6D41}\u{91CF}" },
      { "source": "RPC\u{6D41}\u{91CF}\u{6EAF}\u{6E90}", "target": "mobilemock\u{5E94}\u{7528}\u{8FFD}\u{8E2A}", "name": "\u{4E0A}\u{6E38}\u{672A}\u{5B8C}\u{6210}\u{8FC1}\u{79FB}" }
    ]
  }
}

\`\`\`
`];var o=()=>(0,n.jsx)(r.GPTVisLite,{components:d,children:i[0]});},"56c0d1a6":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return o;}});var n=a("a2e753d8");a("b447189d");var r=a("df67f0d6");let d={a(e){let{href:t,children:a}=e;return(0,n.jsx)("a",{href:t,target:"_blank",rel:"noreferrer",style:{textDecoration:"#2b8afe wavy underline"},children:a});},em(e){let{node:t,...a}=e;return(0,n.jsx)("b",{style:{background:"#f0f489",fontWeight:"bold"},...a});},code:(0,r.withDefaultChartCode)()},i=`
# Haidilao's Food Delivery Revenue (2013-2022)

Here\u{2019}s a visualization of [Haidilao](/)'s food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{
  "type": "line",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\`\`\`
`;var o=()=>(0,n.jsx)(r.GPTVisLite,{components:d,children:i});},"7dca4d14":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"Source",{enumerable:!0,get:function(){return r.default;}});var n=a("d1751d7c"),r=a("777fffbe")._(a("e5365288"));n._(a("1ad5815b"),t),n._(a("7f6e4cdf"),t),n._(a("450e3722"),t),n._(a("711e7b38"),t),n._(a("9f3735c7"),t),n._(a("75cceb9a"),t),n._(a("d17b15fe"),t);},"9c07645c":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return l;}});var n=a("a2e753d8");a("0247468d");var r=a("df67f0d6"),d=a("9d065c04");let i={code:(0,r.withChartCode)({languageRenderers:{"my-ui":({children:e})=>{let t=(0,r.useEventPublish)();return(0,n.jsxs)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:[(0,n.jsx)("p",{children:e}),(0,n.jsx)("button",{onClick:()=>{t("xxxclick",{});},type:"button",children:"click"})]});}},components:{}})},o=`
\`\`\`my-ui
my ui data ...
\`\`\`
`;var l=()=>{let[e,t]=(0,d.useState)(0);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("p",{children:["count: ",e]}),(0,n.jsx)(r.GPTVisLite,{eventSubs:{xxxclick:e=>{console.log("data: ",e),t(e=>e+1);}},components:i,children:o})]});};},b316d85b:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{MyContext:function(){return o;},default:function(){return c;},useMyContext:function(){return l;}});var n=a("852bbaa9"),r=a("a2e753d8");a("b62c491c");var d=a("df67f0d6"),i=n._(a("9d065c04"));let o=i.default.createContext(null);function l(){let e=i.default.useContext(o);if(void 0===e||0===Object.keys(e).length)throw Error("useMyContext must be used within a MyContext.Provider");return e;}let u={code:(0,d.withChartCode)({languageRenderers:{"my-ui":({children:e})=>{let t=l();return console.log("context: ",t),(0,r.jsxs)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:[(0,r.jsx)("p",{children:e}),(0,r.jsx)("button",{onClick:null==t?void 0:t.onClick,type:"button",children:"click"})]});}},components:{}})},s=`
\`\`\`my-ui
my ui data ...
\`\`\`
`;var c=()=>{let[e,t]=(0,i.useState)(0),a=(0,i.useCallback)(()=>{console.log("handleClick"),t(e=>e+1);},[]),n=(0,i.useMemo)(()=>({count:e,onClick:a}),[e]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["count: ",e]}),(0,r.jsx)(o.Provider,{value:n,children:(0,r.jsx)("div",{children:(0,r.jsx)("div",{children:(0,r.jsx)(d.GPTVisLite,{components:u,children:s})})})})]});};},de9f8c55:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return i;}});var n=a("a2e753d8");a("b1a62842");var r=a("df67f0d6");let d=`# GPT-VIS 

Components for GPTs, generative AI, and LLM projects. Not only UI Components.

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
`;var i=()=>(0,n.jsx)(r.GPTVis,{children:d});},df67f0d6:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{ConfigProvider:function(){return o.default;},GPTVis:function(){return l.default;},GPTVisLite:function(){return u.default;},useEventPublish:function(){return u.useEventPublish;},version:function(){return s.default;},withChartCode:function(){return i.withChartCode;},withDefaultChartCode:function(){return i.withDefaultChartCode;}});var n=a("d1751d7c"),r=a("777fffbe"),d=a("852bbaa9");n._(a("5639510f"),t),n._(a("d382b880"),t),n._(a("8e074ce8"),t);var i=a("a574afdb"),o=r._(a("a7265236")),l=r._(a("2c69d5f6")),u=d._(a("033b3748")),s=r._(a("7cf1dc46"));}}]);
//# sourceMappingURL=91fd6521-async.7c637091.js.map