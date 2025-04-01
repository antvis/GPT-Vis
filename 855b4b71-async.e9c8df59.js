(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["855b4b71"],{"11f8c980":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{Attachments:function(){return i.default;},Bubble:function(){return l.default;},Conversations:function(){return d.default;},Prompts:function(){return s.default;},Sender:function(){return r.default;},Suggestion:function(){return o.default;},ThoughtChain:function(){return f.default;},Welcome:function(){return c.default;},XProvider:function(){return v.default;},XRequest:function(){return g.default;},XStream:function(){return A.default;},useXAgent:function(){return b.default;},useXChat:function(){return m.default;},version:function(){return n.default;}});var u=a("777fffbe"),n=u._(a("fee9194e")),i=u._(a("772b829d")),r=u._(a("38cd4593")),l=u._(a("0b4ce24e")),d=u._(a("252ac52e")),s=u._(a("0d932f2a")),f=u._(a("dabca7da")),o=u._(a("a7c4581a")),c=u._(a("21ba459e")),v=u._(a("79553279")),m=u._(a("ad2e4f85")),b=u._(a("642231e2")),A=u._(a("234f8a0e")),g=u._(a("9b25ee4f"));},"144f07ad":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return f;}});var u=a("a2e753d8");a("4b2af025");var n=a("11f8c980"),i=a("df67f0d6");let r=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{9762}\u{79EF}\u{56FE}

\`\`\`vis-chart
{
  "type": "area",
  "data": [
    {
      "time": "1974",
      "value": 107,
      "group": "Gas flaring"
    },
    {
      "time": "1974",
      "value": 208,
      "group": "Renewables"
    },
    {
      "time": "1974",
      "value": 356,
      "group": "Fossil fuels"
    },
    {
      "time": "1975",
      "value": 173,
      "group": "Gas flaring"
    },
    {
      "time": "1975",
      "value": 415,
      "group": "Renewables"
    },
    {
      "time": "1975",
      "value": 364,
      "group": "Fossil fuels"
    },
    {
      "time": "1976",
      "value": 117,
      "group": "Gas flaring"
    },
    {
      "time": "1976",
      "value": 220,
      "group": "Renewables"
    },
    {
      "time": "1976",
      "value": 373,
      "group": "Fossil fuels"
    },
    {
      "time": "1977",
      "value": 122,
      "group": "Gas flaring"
    },
    {
      "time": "1977",
      "value": 225,
      "group": "Renewables"
    },
    {
      "time": "1977",
      "value": 382,
      "group": "Fossil fuels"
    }
  ],
  "stack": true,
  "axisXTitle": "year",
  "axisYTitle": "value"
}
\`\`\`
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},d=(0,i.withChartCode)({components:{[i.ChartType.Area]:i.Area},style:{width:350}}),s=e=>(0,u.jsx)(i.GPTVisLite,{components:{code:d},children:e});var f=()=>(0,u.jsxs)("div",{style:l,children:[(0,u.jsx)(n.Bubble,{placement:"end",content:"\u9762\u79EF\u56FE\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb",maxWidth:"60%"}}}),(0,u.jsx)(n.Bubble,{content:r,messageRender:s,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"2c529b27":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return f;}});var u=a("a2e753d8");a("e54ed773");var n=a("11f8c980"),i=a("df67f0d6");let r=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{9762}\u{79EF}\u{56FE}

\`\`\`vis-chart
{
  "type": "area",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}],
  "axisXTitle": "year",
  "axisYTitle": "GDP"
}
\`\`\`
`,l={display:"grid",gridGap:"20px 0",padding:20,background:"#f7f7f7",borderRadius:8},d=(0,i.withChartCode)({components:{[i.ChartType.Area]:i.Area},style:{width:350}}),s=e=>(0,u.jsx)(i.GPTVisLite,{components:{code:d},children:e});var f=()=>(0,u.jsxs)("div",{style:l,children:[(0,u.jsx)(n.Bubble,{placement:"end",content:"\u5E2E\u6211\u9762\u79EF\u56FE\u663E\u793A\u6700\u8FD1\u51E0\u5E74 GDP \u60C5\u51B5",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,u.jsx)(n.Bubble,{content:r,messageRender:s,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},"3d66d808":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return r;}});var u=a("a2e753d8");a("37349b31");var n=a("df67f0d6");let i=[{time:"1991",value:3},{time:"1992",value:4},{time:"1993",value:3.5},{time:"1994",value:5},{time:"1995",value:4.9},{time:"1996",value:6},{time:"1997",value:7},{time:"1998",value:9},{time:"1999",value:13}];var r=()=>(0,u.jsx)(n.Area,{data:i,axisXTitle:"year",axisYTitle:"growth",containerStyle:{height:300}});},c19296a1:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"Source",{enumerable:!0,get:function(){return n.default;}});var u=a("d1751d7c"),n=a("777fffbe")._(a("f7d3e1e7"));u._(a("5124a778"),t),u._(a("ce96b799"),t),u._(a("bd5feb0d"),t),u._(a("7b705fdd"),t),u._(a("3cf6dc2e"),t),u._(a("81f0b3e9"),t),u._(a("814632ac"),t);},df67f0d6:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{ConfigProvider:function(){return l.default;},GPTVis:function(){return d.default;},GPTVisLite:function(){return s.default;},useEventPublish:function(){return s.useEventPublish;},version:function(){return f.default;},withChartCode:function(){return r.withChartCode;},withDefaultChartCode:function(){return r.withDefaultChartCode;}});var u=a("d1751d7c"),n=a("777fffbe"),i=a("852bbaa9");u._(a("5639510f"),t),u._(a("d382b880"),t);var r=a("a574afdb"),l=n._(a("a7265236")),d=n._(a("2c69d5f6")),s=i._(a("033b3748")),f=n._(a("7cf1dc46"));}}]);
//# sourceMappingURL=855b4b71-async.e9c8df59.js.map