(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["eff985a5"],{"87e9bada":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"texts",{enumerable:!0,get:function(){return a;}}),t("0e9c772d");let a=[{value:"\u70ED\u529B\u5730\u56FE\uFF0C\u76F4\u89C2\u5C55\u793A\u6570\u636E\u5BC6\u5EA6\u4E0E\u9891\u7387\u7684\u7A7A\u95F4\u5206\u5E03\u3002",paraId:0,tocIndex:0},{value:'{\n  "type": "heat-map",\n  "data": [\n    {\n      "longitude": 121.473117,\n      "latitude": 31.230125,\n      "value": 20\n    },\n    {\n      "longitude": 121.473337,\n      "latitude": 31.230325,\n      "value": 100\n    },\n    {\n      "longitude": 121.473557,\n      "latitude": 31.230525,\n      "value": 300\n    },\n    {\n      "longitude": 121.473777,\n      "latitude": 31.230725,\n      "value": 600\n    },\n    {\n      "longitude": 121.473997,\n      "latitude": 31.230925,\n      "value": 1000\n    }\n  ]\n}\n',paraId:1,tocIndex:4},{value:"\u5C5E\u6027",paraId:2,tocIndex:6},{value:"\u7C7B\u578B",paraId:2,tocIndex:6},{value:"\u662F\u5426\u5FC5\u4F20",paraId:2,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:6},{value:"\u8BF4\u660E",paraId:2,tocIndex:6},{value:"data",paraId:2,tocIndex:6},{value:"HeatMapDataItem[]",paraId:2,tocIndex:6},{value:"\u662F",paraId:2,tocIndex:6},{value:"-",paraId:2,tocIndex:6},{value:"\u6570\u636E",paraId:2,tocIndex:6},{value:"\u5C5E\u6027",paraId:3,tocIndex:7},{value:"\u7C7B\u578B",paraId:3,tocIndex:7},{value:"\u662F\u5426\u5FC5\u4F20",paraId:3,tocIndex:7},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:7},{value:"\u8BF4\u660E",paraId:3,tocIndex:7},{value:"longitude",paraId:3,tocIndex:7},{value:"number",paraId:3,tocIndex:7},{value:"\u662F",paraId:3,tocIndex:7},{value:"-",paraId:3,tocIndex:7},{value:"\u7ECF\u5EA6",paraId:3,tocIndex:7},{value:"latitude",paraId:3,tocIndex:7},{value:"number",paraId:3,tocIndex:7},{value:"\u662F",paraId:3,tocIndex:7},{value:"-",paraId:3,tocIndex:7},{value:"\u7EAC\u5EA6",paraId:3,tocIndex:7},{value:"value",paraId:3,tocIndex:7},{value:"number",paraId:3,tocIndex:7},{value:"\u662F",paraId:3,tocIndex:7},{value:"-",paraId:3,tocIndex:7},{value:"\u70ED\u529B\u503C",paraId:3,tocIndex:7}];},c19296a1:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"Source",{enumerable:!0,get:function(){return d.default;}});var a=t("d1751d7c"),d=t("777fffbe")._(t("f7d3e1e7"));a._(t("5124a778"),n),a._(t("ce96b799"),n),a._(t("bd5feb0d"),n),a._(t("7b705fdd"),n),a._(t("3cf6dc2e"),n),a._(t("81f0b3e9"),n),a._(t("814632ac"),n);},df67f0d6:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{ConfigProvider:function(){return o.default;},GPTVis:function(){return i.default;},GPTVisLite:function(){return r.default;},useEventPublish:function(){return r.useEventPublish;},version:function(){return s.default;},withChartCode:function(){return l.withChartCode;},withDefaultChartCode:function(){return l.withDefaultChartCode;}});var a=t("d1751d7c"),d=t("777fffbe"),u=t("852bbaa9");a._(t("5639510f"),n),a._(t("d382b880"),n);var l=t("a574afdb"),o=d._(t("a7265236")),i=d._(t("2c69d5f6")),r=u._(t("033b3748")),s=d._(t("7cf1dc46"));},e14e0636:function(e,n,t){"use strict";var a=t("852bbaa9")._;t.d(n,"__esModule",{value:!0}),t.d(n,"demos",{enumerable:!0,get:function(){return i;}});var d=t("852bbaa9"),u=d._(t("9d065c04"));t("0e9c772d");var l=d._(t("df67f0d6")),o=d._(t("e2557001"));let i={"heatmap-demo-0":{component:u.default.memo(u.default.lazy(async function(){let{default:e}=await Promise.all([t.ensure("9d065c04")]).then(t.dr(a,t.bind(t,"9d065c04"))),{HeatMap:n}=await Promise.all([t.ensure("vendors_3"),t.ensure("common"),t.ensure("vendors_0"),t.ensure("vendors_1"),t.ensure("vendors_2"),t.ensure("df67f0d6")]).then(t.dr(a,t.bind(t,"df67f0d6"))),d=[{longitude:121.473117,latitude:31.230125,value:20},{longitude:121.473337,latitude:31.230325,value:100},{longitude:121.473557,latitude:31.230525,value:300},{longitude:121.473777,latitude:31.230725,value:600},{longitude:121.473997,latitude:31.230925,value:1e3}];return{default:()=>e.createElement(n,{data:d})};})),asset:{type:"BLOCK",id:"heatmap-demo-0",refAtomIds:["HeatMap"],dependencies:{"index.jsx":{type:"FILE",value:"import React from 'react';\nimport { HeatMap } from '@antv/gpt-vis';\n\nconst data = [\n  {\n    longitude: 121.473117,\n    latitude: 31.230125,\n    value: 20,\n  },\n  {\n    longitude: 121.473337,\n    latitude: 31.230325,\n    value: 100,\n  },\n  {\n    longitude: 121.473557,\n    latitude: 31.230525,\n    value: 300,\n  },\n  {\n    longitude: 121.473777,\n    latitude: 31.230725,\n    value: 600,\n  },\n  {\n    longitude: 121.473997,\n    latitude: 31.230925,\n    value: 1000,\n  },\n];\n\nexport default () => <HeatMap data={data} />;"},react:{type:"NPM",value:"18.3.1"},"@antv/gpt-vis":{type:"NPM",value:"0.4.4"}},entry:"index.jsx"},context:{react:u,"@antv/gpt-vis":l},renderOpts:{compile:async(...e)=>(await Promise.all([t.ensure("vendors_0"),t.ensure("vendors_1"),t.ensure("47eee747")]).then(t.dr(a,t.bind(t,"47eee747")))).default(...e)}},"heatmap-demo-1":{component:u.default.memo(u.default.lazy(async function(){let{Bubble:e}=await Promise.all([t.ensure("vendors_3"),t.ensure("vendors_0"),t.ensure("vendors_1"),t.ensure("e2557001")]).then(t.dr(a,t.bind(t,"e2557001"))),{HeatMap:n,withChartCode:d,ChartType:l,GPTVisLite:o}=await Promise.all([t.ensure("vendors_3"),t.ensure("common"),t.ensure("vendors_0"),t.ensure("vendors_1"),t.ensure("vendors_2"),t.ensure("df67f0d6")]).then(t.dr(a,t.bind(t,"df67f0d6"))),i={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},r=`
 ~~~vis-chart
  {
    "type": "heat-map",
    "data": [
      {
        "longitude": 121.474856,
        "latitude": 31.249162,
        "value": 800
      },
      {
        "longitude": 121.499718,
        "latitude": 31.239703,
        "value": 1000
      },
      {
        "longitude": 121.48612,
        "latitude": 31.24166,
        "value": 1200
      },
      {
        "longitude": 121.449895,
        "latitude": 31.228609,
        "value": 500
      },
      {
        "longitude": 121.449486,
        "latitude": 31.222042,
        "value": 900
      },
      {
        "longitude": 121.431826,
        "latitude": 31.204638,
        "value": 400
      },
      {
        "longitude": 121.438573,
        "latitude": 31.204188,
        "value": 1000
      },
      {
        "longitude": 121.448453,
        "latitude": 31.222341,
        "value": 300
      },
      {
        "longitude": 121.474856,
        "latitude": 31.249162,
        "value": 800
      },
      {
        "longitude": 121.473688,
        "latitude": 31.249921,
        "value": 1000
      },
      {
        "longitude": 121.449895,
        "latitude": 31.228609,
        "value": 500
      },
      {
        "longitude": 121.449486,
        "latitude": 31.222042,
        "value": 900
      },
      {
        "longitude": 121.431826,
        "latitude": 31.204638,
        "value": 400
      },
      {
        "longitude": 121.438573,
        "latitude": 31.204188,
        "value": 1000
      },
      {
        "longitude": 121.448453,
        "latitude": 31.222341,
        "value": 300
      },
      {
        "longitude": 121.448997,
        "latitude": 31.203590,
        "value": 400
      }
    ]
  }
~~~`,s=d({components:{[l.HeatMap]:n},style:{width:500}}),c=e=>u.default.createElement(o,{components:{code:s}},e);return{default:()=>u.default.createElement("div",{style:i},u.default.createElement(e,{placement:"end",content:"\u4E0A\u6D77\u5E02\u6E38\u5BA2\u91CF\u8F83\u5927\u7684\u666F\u70B9\u5728\u54EA\u91CC\uFF1F",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),u.default.createElement(e,{content:r,messageRender:c,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}}))};})),asset:{type:"BLOCK",id:"heatmap-demo-1",refAtomIds:["HeatMap"],dependencies:{"index.tsx":{type:"FILE",value:'import { Bubble, type BubbleProps } from \'@ant-design/x\';\nimport { HeatMap, withChartCode, ChartType, GPTVisLite } from \'@antv/gpt-vis\';\n\nconst bgStyle = {\n  display: \'grid\',\n  gridGap: \'20px 0\',\n  background: \'#f7f7f7\',\n  padding: 20,\n  borderRadius: 8,\n};\n\nconst markdownContent = `\n ~~~vis-chart\n  {\n    "type": "heat-map",\n    "data": [\n      {\n        "longitude": 121.474856,\n        "latitude": 31.249162,\n        "value": 800\n      },\n      {\n        "longitude": 121.499718,\n        "latitude": 31.239703,\n        "value": 1000\n      },\n      {\n        "longitude": 121.48612,\n        "latitude": 31.24166,\n        "value": 1200\n      },\n      {\n        "longitude": 121.449895,\n        "latitude": 31.228609,\n        "value": 500\n      },\n      {\n        "longitude": 121.449486,\n        "latitude": 31.222042,\n        "value": 900\n      },\n      {\n        "longitude": 121.431826,\n        "latitude": 31.204638,\n        "value": 400\n      },\n      {\n        "longitude": 121.438573,\n        "latitude": 31.204188,\n        "value": 1000\n      },\n      {\n        "longitude": 121.448453,\n        "latitude": 31.222341,\n        "value": 300\n      },\n      {\n        "longitude": 121.474856,\n        "latitude": 31.249162,\n        "value": 800\n      },\n      {\n        "longitude": 121.473688,\n        "latitude": 31.249921,\n        "value": 1000\n      },\n      {\n        "longitude": 121.449895,\n        "latitude": 31.228609,\n        "value": 500\n      },\n      {\n        "longitude": 121.449486,\n        "latitude": 31.222042,\n        "value": 900\n      },\n      {\n        "longitude": 121.431826,\n        "latitude": 31.204638,\n        "value": 400\n      },\n      {\n        "longitude": 121.438573,\n        "latitude": 31.204188,\n        "value": 1000\n      },\n      {\n        "longitude": 121.448453,\n        "latitude": 31.222341,\n        "value": 300\n      },\n      {\n        "longitude": 121.448997,\n        "latitude": 31.203590,\n        "value": 400\n      }\n    ]\n  }\n~~~`;\n\nconst CodeComponent = withChartCode({\n  components: { [ChartType.HeatMap]: HeatMap },\n  style: { width: 500 },\n});\n\nconst RenderMarkdown: BubbleProps[\'messageRender\'] = (content) => (\n  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>\n);\n\nexport default () => {\n  return (\n    <div style={bgStyle}>\n      <Bubble\n        placement="end"\n        content="\u4E0A\u6D77\u5E02\u6E38\u5BA2\u91CF\u8F83\u5927\u7684\u666F\u70B9\u5728\u54EA\u91CC\uFF1F"\n        avatar={{\n          src: \'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp\',\n        }}\n        styles={{ content: { background: \'#ebebeb\' } }}\n      />\n      <Bubble\n        content={markdownContent}\n        messageRender={RenderMarkdown}\n        avatar={{\n          src: \'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original\',\n        }}\n        variant="shadow"\n        styles={{ content: { background: \'#fff\' } }}\n      />\n    </div>\n  );\n};'},"@ant-design/x":{type:"NPM",value:"1.0.6"},"@antv/gpt-vis":{type:"NPM",value:"0.4.4"}},entry:"index.tsx"},context:{"@ant-design/x":o,"@antv/gpt-vis":l},renderOpts:{compile:async(...e)=>(await Promise.all([t.ensure("vendors_0"),t.ensure("vendors_1"),t.ensure("47eee747")]).then(t.dr(a,t.bind(t,"47eee747")))).default(...e)}}};},e2557001:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{Attachments:function(){return u.default;},Bubble:function(){return o.default;},Conversations:function(){return i.default;},Prompts:function(){return r.default;},Sender:function(){return l.default;},Suggestion:function(){return c.default;},ThoughtChain:function(){return s.default;},Welcome:function(){return v.default;},XProvider:function(){return f.default;},XRequest:function(){return b.default;},XStream:function(){return m.default;},useXAgent:function(){return g.default;},useXChat:function(){return p.default;},version:function(){return d.default;}});var a=t("777fffbe"),d=a._(t("c9407b36")),u=a._(t("6fa5f039")),l=a._(t("51807679")),o=a._(t("b73418d7")),i=a._(t("af0dff72")),r=a._(t("e6afcfdd")),s=a._(t("95d72754")),c=a._(t("49492959")),v=a._(t("9f3a4557")),f=a._(t("bdeca71c")),p=a._(t("1a771103")),g=a._(t("b72f5517")),m=a._(t("1ac0248e")),b=a._(t("7caa518a"));}}]);
//# sourceMappingURL=eff985a5-async.612d87cc.js.map