"use strict";(self.webpackChunk_antv_gpt_vis=self.webpackChunk_antv_gpt_vis||[]).push([[1904],{66251:function(p,t,n){n.r(t),n.d(t,{demos:function(){return E}});var d=n(90228),r=n.n(d),C=n(87999),f=n.n(C),o=n(75271),h=n(69763),P=n(88421),E={"docs-guide-antd-design-x-demo-0":{component:o.memo(o.lazy(f()(r()().mark(function s(){var i,l,a,u,m,e,y;return r()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(n.bind(n,69763));case 2:return i=c.sent,l=i.Bubble,c.next=6,Promise.resolve().then(n.bind(n,88421));case 6:return a=c.sent,u=a.GPTVis,m={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},e=`
## GPT-VIS 
Components for GPTs, generative AI, and LLM projects. Not only UI Components.

\`\`\`vis-chart
  {
    "type": "pie",
    "data": [
      { "category": "\u5206\u7C7B\u4E00", "value": 27 },
      { "category": "\u5206\u7C7B\u4E8C", "value": 25 },
      { "category": "\u5206\u7C7B\u4E09", "value": 18 },
      { "category": "\u5206\u7C7B\u56DB", "value": 15 },
      { "category": "\u5206\u7C7B\u4E94", "value": 10 },
      { "category": "\u5176\u4ED6", "value": 5 }
    ]
  }
\`\`\``,y=function(b){return o.createElement(u,null,b)},c.abrupt("return",{default:function(){return o.createElement("div",{style:m},o.createElement(l,{content:e,messageRender:y,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}}))}});case 12:case"end":return c.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-antd-design-x-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Bubble, type BubbleProps } from '@ant-design/x';
import { GPTVis } from '@antv/gpt-vis';

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const markdownContent = \`
## GPT-VIS 
Components for GPTs, generative AI, and LLM projects. Not only UI Components.

\\\`\\\`\\\`vis-chart
  {
    "type": "pie",
    "data": [
      { "category": "\u5206\u7C7B\u4E00", "value": 27 },
      { "category": "\u5206\u7C7B\u4E8C", "value": 25 },
      { "category": "\u5206\u7C7B\u4E09", "value": 18 },
      { "category": "\u5206\u7C7B\u56DB", "value": 15 },
      { "category": "\u5206\u7C7B\u4E94", "value": 10 },
      { "category": "\u5176\u4ED6", "value": 5 }
    ]
  }
\\\`\\\`\\\`\`;

const RenderMarkdown: BubbleProps['messageRender'] = (content) => <GPTVis>{content}</GPTVis>;

export default () => {
  return (
    <div style={bgStyle}>
      <Bubble
        content={markdownContent}
        messageRender={RenderMarkdown}
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
        }}
        variant="shadow"
        styles={{ content: { background: '#fff' } }}
      />
    </div>
  );
};`},"@ant-design/x":{type:"NPM",value:"1.0.0-alpha.12"},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"}},entry:"index.tsx"},context:{"@ant-design/x":h,"@antv/gpt-vis":P},renderOpts:{compile:function(){var s=f()(r()().mark(function l(){var a,u=arguments;return r()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(a=e.sent).default.apply(a,u));case 3:case"end":return e.stop()}},l)}));function i(){return s.apply(this,arguments)}return i}()}},"docs-guide-antd-design-x-demo-1":{component:o.memo(o.lazy(f()(r()().mark(function s(){var i,l,a,u,m,e;return r()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,Promise.resolve().then(n.bind(n,88421));case 2:return i=v.sent,l=i.Pie,v.next=6,Promise.resolve().then(n.bind(n,69763));case 6:return a=v.sent,u=a.Bubble,m={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},e=[{category:"\u5206\u7C7B\u4E00",value:27},{category:"\u5206\u7C7B\u4E8C",value:25},{category:"\u5206\u7C7B\u4E09",value:18},{category:"\u5206\u7C7B\u56DB",value:15},{category:"\u5206\u7C7B\u4E94",value:10},{category:"\u5176\u4ED6",value:5}],v.abrupt("return",{default:function(){return o.createElement("div",{style:m},o.createElement(u,{content:o.createElement(l,{data:e,containerStyle:{width:550,height:300}}),avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}}))}});case 11:case"end":return v.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-antd-design-x-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Pie } from '@antv/gpt-vis';
import { Bubble } from '@ant-design/x';

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const mockdata = [
  { category: '\u5206\u7C7B\u4E00', value: 27 },
  { category: '\u5206\u7C7B\u4E8C', value: 25 },
  { category: '\u5206\u7C7B\u4E09', value: 18 },
  { category: '\u5206\u7C7B\u56DB', value: 15 },
  { category: '\u5206\u7C7B\u4E94', value: 10 },
  { category: '\u5176\u4ED6', value: 5 },
];

export default () => {
  return (
    <div style={bgStyle}>
      <Bubble
        content={<Pie data={mockdata} containerStyle={{ width: 550, height: 300 }} />}
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
        }}
        variant="shadow"
        styles={{ content: { background: '#fff' } }}
      />
    </div>
  );
};`},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"},"@ant-design/x":{type:"NPM",value:"1.0.0-alpha.12"}},entry:"index.tsx"},context:{"@antv/gpt-vis":P,"@ant-design/x":h},renderOpts:{compile:function(){var s=f()(r()().mark(function l(){var a,u=arguments;return r()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(a=e.sent).default.apply(a,u));case 3:case"end":return e.stop()}},l)}));function i(){return s.apply(this,arguments)}return i}()}}}},31025:function(p,t,n){n.r(t),n.d(t,{demos:function(){return r}});var d=n(75271),r={}},68295:function(p,t,n){n.r(t),n.d(t,{demos:function(){return E}});var d=n(90228),r=n.n(d),C=n(87999),f=n.n(C),o=n(75271),h=n(69763),P=n(88421),E={"docs-guide-customize-style-demo-0":{component:o.memo(o.lazy(f()(r()().mark(function s(){var i,l,a,u,m,e,y,v,c,g,b;return r()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,Promise.resolve().then(n.bind(n,69763));case 2:return i=A.sent,l=i.Bubble,A.next=6,Promise.resolve().then(n.bind(n,88421));case 6:return a=A.sent,u=a.ConfigProvider,m=a.GPTVis,e={legend:!1,innerRadius:.6,style:{stroke:"#fff",inset:1,radius:10}},y={style:{fill:"linear-gradient(-90deg, white 0%, darkgreen 100%)"},line:{style:{stroke:"darkgreen",strokeWidth:2},tooltip:!1}},v={markerStyle:{iconPath:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JZf9T6psSzkAAAAAAAAAAAAADmJ7AQ/original"}},c=`
\`\`\`vis-chart
{
  "type": "area",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "\u5206\u7C7B\u4E00", "value": 27 },
    { "category": "\u5206\u7C7B\u4E8C", "value": 25 },
    { "category": "\u5206\u7C7B\u4E09", "value": 18 },
    { "category": "\u5206\u7C7B\u56DB", "value": 15 },
    { "category": "\u5206\u7C7B\u4E94", "value": 10 },
    { "category": "\u5176\u4ED6", "value": 5 }
  ]
}
\`\`\`

\`\`\`vis-chart
  {
   "type": "pin-map",
   "data": [
    { "label": "\u6768\u6885\u5CAD", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "\u7406\u5B89\u5BFA", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "\u4E5D\u6EAA\u70DF\u6811", "longitude": 120.11335, "latitude": 30.202395 },
    { "label": "\u98DE\u6765\u5CF0", "longitude": 120.100549, "latitude": 30.236875 },
    { "label": "\u7075\u9690\u5BFA", "longitude": 120.101406, "latitude": 30.240826 },
    { "label": "\u5929\u7AFA\u4E09\u5BFA", "longitude": 120.105337, "latitude": 30.236818 },
    { "label": "\u676D\u5DDE\u690D\u7269\u56ED", "longitude": 120.116979, "latitude": 30.252876 },
    { "label": "\u676D\u5DDE\u82B1\u5703", "longitude": 120.127654, "latitude": 30.245663 },
    { "label": "\u82CF\u5824", "longitude": 120.135764, "latitude": 30.251448 },
    { "label": "\u864E\u8DD1\u516C\u56ED", "longitude": 120.130095, "latitude": 30.207505 },
    { "label": "\u7389\u7687\u98DE\u4E91", "longitude": 120.145323, "latitude": 30.214993 },
    { "label": "\u957F\u6865\u516C\u56ED", "longitude": 120.155057, "latitude": 30.232985 }
  ]
}
\`\`\`
`,g={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},b=function(T){return o.createElement(m,null,T)},A.abrupt("return",{default:function(){return o.createElement(u,{components:{Pie:e,Area:y,PinMap:v}},o.createElement("div",{style:g},o.createElement(l,{content:c,messageRender:b,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})))}});case 16:case"end":return A.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-customize-style-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Bubble, type BubbleProps } from '@ant-design/x';
import { ConfigProvider, GPTVis } from '@antv/gpt-vis';

// \u8BBE\u7F6E\u751C\u751C\u5708\u6837\u5F0F
const pieConfig = {
  legend: false,
  innerRadius: 0.6,
  style: {
    stroke: '#fff',
    inset: 1,
    radius: 10,
  },
};

// \u9762\u79EF\u56FE\u8BBE\u7F6E\u6E10\u53D8\u8272
const areaConfig = {
  style: {
    fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
  },
  line: {
    style: {
      stroke: 'darkgreen',
      strokeWidth: 2,
    },
    tooltip: false,
  },
};

// \u5730\u56FE\u8BBE\u7F6E\u56FE\u6807
const pinMapConfig = {
  markerStyle: {
    iconPath:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JZf9T6psSzkAAAAAAAAAAAAADmJ7AQ/original',
  },
};

const markdownContent = \`
\\\`\\\`\\\`vis-chart
{
  "type": "area",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\\\`\\\`\\\`

\\\`\\\`\\\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "\u5206\u7C7B\u4E00", "value": 27 },
    { "category": "\u5206\u7C7B\u4E8C", "value": 25 },
    { "category": "\u5206\u7C7B\u4E09", "value": 18 },
    { "category": "\u5206\u7C7B\u56DB", "value": 15 },
    { "category": "\u5206\u7C7B\u4E94", "value": 10 },
    { "category": "\u5176\u4ED6", "value": 5 }
  ]
}
\\\`\\\`\\\`

\\\`\\\`\\\`vis-chart
  {
   "type": "pin-map",
   "data": [
    { "label": "\u6768\u6885\u5CAD", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "\u7406\u5B89\u5BFA", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "\u4E5D\u6EAA\u70DF\u6811", "longitude": 120.11335, "latitude": 30.202395 },
    { "label": "\u98DE\u6765\u5CF0", "longitude": 120.100549, "latitude": 30.236875 },
    { "label": "\u7075\u9690\u5BFA", "longitude": 120.101406, "latitude": 30.240826 },
    { "label": "\u5929\u7AFA\u4E09\u5BFA", "longitude": 120.105337, "latitude": 30.236818 },
    { "label": "\u676D\u5DDE\u690D\u7269\u56ED", "longitude": 120.116979, "latitude": 30.252876 },
    { "label": "\u676D\u5DDE\u82B1\u5703", "longitude": 120.127654, "latitude": 30.245663 },
    { "label": "\u82CF\u5824", "longitude": 120.135764, "latitude": 30.251448 },
    { "label": "\u864E\u8DD1\u516C\u56ED", "longitude": 120.130095, "latitude": 30.207505 },
    { "label": "\u7389\u7687\u98DE\u4E91", "longitude": 120.145323, "latitude": 30.214993 },
    { "label": "\u957F\u6865\u516C\u56ED", "longitude": 120.155057, "latitude": 30.232985 }
  ]
}
\\\`\\\`\\\`
\`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const RenderMarkdown: BubbleProps['messageRender'] = (content) => <GPTVis>{content}</GPTVis>;

export default () => {
  return (
    <ConfigProvider
      components={{
        Pie: pieConfig,
        Area: areaConfig,
        PinMap: pinMapConfig,
      }}
    >
      <div style={bgStyle}>
        <Bubble
          content={markdownContent}
          messageRender={RenderMarkdown}
          avatar={{
            src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
          }}
          variant="shadow"
          styles={{ content: { background: '#fff' } }}
        />
      </div>
    </ConfigProvider>
  );
};`},"@ant-design/x":{type:"NPM",value:"1.0.0-alpha.12"},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"}},entry:"index.tsx"},context:{"@ant-design/x":h,"@antv/gpt-vis":P},renderOpts:{compile:function(){var s=f()(r()().mark(function l(){var a,u=arguments;return r()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(a=e.sent).default.apply(a,u));case 3:case"end":return e.stop()}},l)}));function i(){return s.apply(this,arguments)}return i}()}},"docs-guide-customize-style-demo-1":{component:o.memo(o.lazy(f()(r()().mark(function s(){var i,l,a,u,m,e,y,v;return r()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Promise.resolve().then(n.bind(n,69763));case 2:return i=g.sent,l=i.Bubble,g.next=6,Promise.resolve().then(n.bind(n,88421));case 6:return a=g.sent,u=a.ConfigProvider,m=a.GPTVis,e=`
\`\`\`vis-chart
{
  "type": "area",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "\u5206\u7C7B\u4E00", "value": 27 },
    { "category": "\u5206\u7C7B\u4E8C", "value": 25 },
    { "category": "\u5206\u7C7B\u4E09", "value": 18 },
    { "category": "\u5206\u7C7B\u56DB", "value": 15 },
    { "category": "\u5206\u7C7B\u4E94", "value": 10 },
    { "category": "\u5176\u4ED6", "value": 5 }
  ]
}
\`\`\`

\`\`\`vis-chart
  {
   "type": "pin-map",
   "data": [
    { "label": "\u6768\u6885\u5CAD", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "\u7406\u5B89\u5BFA", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "\u4E5D\u6EAA\u70DF\u6811", "longitude": 120.11335, "latitude": 30.202395 },
    { "label": "\u98DE\u6765\u5CF0", "longitude": 120.100549, "latitude": 30.236875 },
    { "label": "\u7075\u9690\u5BFA", "longitude": 120.101406, "latitude": 30.240826 },
    { "label": "\u5929\u7AFA\u4E09\u5BFA", "longitude": 120.105337, "latitude": 30.236818 },
    { "label": "\u676D\u5DDE\u690D\u7269\u56ED", "longitude": 120.116979, "latitude": 30.252876 },
    { "label": "\u676D\u5DDE\u82B1\u5703", "longitude": 120.127654, "latitude": 30.245663 },
    { "label": "\u82CF\u5824", "longitude": 120.135764, "latitude": 30.251448 },
    { "label": "\u864E\u8DD1\u516C\u56ED", "longitude": 120.130095, "latitude": 30.207505 },
    { "label": "\u7389\u7687\u98DE\u4E91", "longitude": 120.145323, "latitude": 30.214993 },
    { "label": "\u957F\u6865\u516C\u56ED", "longitude": 120.155057, "latitude": 30.232985 }
  ]
}
\`\`\`
`,y={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},v=function(D){return o.createElement(m,null,D)},g.abrupt("return",{default:function(){return o.createElement(u,{plot:{theme:{type:"academy"}},map:{style:"dark",token:"\u4F60\u7684\u5730\u56FEtoken"}},o.createElement("div",{style:y},o.createElement(l,{content:e,messageRender:v,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})))}});case 13:case"end":return g.stop()}},s)})))),asset:{type:"BLOCK",id:"docs-guide-customize-style-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Bubble, type BubbleProps } from '@ant-design/x';
import { ConfigProvider, GPTVis } from '@antv/gpt-vis';

const markdownContent = \`
\\\`\\\`\\\`vis-chart
{
  "type": "area",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\\\`\\\`\\\`

\\\`\\\`\\\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "\u5206\u7C7B\u4E00", "value": 27 },
    { "category": "\u5206\u7C7B\u4E8C", "value": 25 },
    { "category": "\u5206\u7C7B\u4E09", "value": 18 },
    { "category": "\u5206\u7C7B\u56DB", "value": 15 },
    { "category": "\u5206\u7C7B\u4E94", "value": 10 },
    { "category": "\u5176\u4ED6", "value": 5 }
  ]
}
\\\`\\\`\\\`

\\\`\\\`\\\`vis-chart
  {
   "type": "pin-map",
   "data": [
    { "label": "\u6768\u6885\u5CAD", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "\u7406\u5B89\u5BFA", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "\u4E5D\u6EAA\u70DF\u6811", "longitude": 120.11335, "latitude": 30.202395 },
    { "label": "\u98DE\u6765\u5CF0", "longitude": 120.100549, "latitude": 30.236875 },
    { "label": "\u7075\u9690\u5BFA", "longitude": 120.101406, "latitude": 30.240826 },
    { "label": "\u5929\u7AFA\u4E09\u5BFA", "longitude": 120.105337, "latitude": 30.236818 },
    { "label": "\u676D\u5DDE\u690D\u7269\u56ED", "longitude": 120.116979, "latitude": 30.252876 },
    { "label": "\u676D\u5DDE\u82B1\u5703", "longitude": 120.127654, "latitude": 30.245663 },
    { "label": "\u82CF\u5824", "longitude": 120.135764, "latitude": 30.251448 },
    { "label": "\u864E\u8DD1\u516C\u56ED", "longitude": 120.130095, "latitude": 30.207505 },
    { "label": "\u7389\u7687\u98DE\u4E91", "longitude": 120.145323, "latitude": 30.214993 },
    { "label": "\u957F\u6865\u516C\u56ED", "longitude": 120.155057, "latitude": 30.232985 }
  ]
}
\\\`\\\`\\\`
\`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const RenderMarkdown: BubbleProps['messageRender'] = (content) => <GPTVis>{content}</GPTVis>;

export default () => {
  return (
    <ConfigProvider
      plot={{ theme: { type: 'academy' } }}
      map={{ style: 'dark', token: '\u4F60\u7684\u5730\u56FEtoken' }}
    >
      <div style={bgStyle}>
        <Bubble
          content={markdownContent}
          messageRender={RenderMarkdown}
          avatar={{
            src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
          }}
          variant="shadow"
          styles={{ content: { background: '#fff' } }}
        />
      </div>
    </ConfigProvider>
  );
};`},"@ant-design/x":{type:"NPM",value:"1.0.0-alpha.12"},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"}},entry:"index.tsx"},context:{"@ant-design/x":h,"@antv/gpt-vis":P},renderOpts:{compile:function(){var s=f()(r()().mark(function l(){var a,u=arguments;return r()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(a=e.sent).default.apply(a,u));case 3:case"end":return e.stop()}},l)}));function i(){return s.apply(this,arguments)}return i}()}}}},87884:function(p,t,n){n.r(t),n.d(t,{demos:function(){return r}});var d=n(75271),r={}},95352:function(p,t,n){n.r(t),n.d(t,{demos:function(){return r}});var d=n(75271),r={}},7107:function(p,t,n){n.r(t),n.d(t,{texts:function(){return d}});const d=[{value:"1.\u5B9A\u4E49\u56FE\u8868 Markdown \u4EE3\u7801\u5757",paraId:0,tocIndex:0},{value:`const markdownContent = \`
## GPT-VIS
Components for GPTs, generative AI, and LLM projects. Not only UI Components.

 \\\`\\\`\\\`vis-chart
  {
    "type": "pie",
    "data": [
      { "category": "\u5206\u7C7B\u4E00", "value": 27 },
      { "category": "\u5206\u7C7B\u4E8C", "value": 25 },
      { "category": "\u5206\u7C7B\u4E09", "value": 18 },
      { "category": "\u5206\u7C7B\u56DB", "value": 15 },
      { "category": "\u5206\u7C7B\u4E94", "value": 10 },
      { "category": "\u5176\u4ED6", "value": 5 }
    ]
  }
\\\`\\\`\\\`\`;
`,paraId:1,tocIndex:0},{value:"2.\u6269\u5C55\u804A\u5929\u6C14\u6CE1\u6E32\u67D3",paraId:2,tocIndex:0},{value:`import { Bubble, type BubbleProps } from '@ant-design/x';
import { GPTVis } from '@antv/gpt-vis';

const RenderMarkdown: BubbleProps['messageRender'] = (content) => <GPTVis>{content}</GPTVis>;

export default () => {
  return (
    <Bubble
      content={markdownContent}
      messageRender={RenderMarkdown}
      avatar={{
        src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
      }}
      variant="shadow"
      styles={{ content: { background: '#fff' } }}
    />
  );
};
`,paraId:3,tocIndex:0},{value:"\u5B9A\u4E49\u4F60\u7684\u56FE\u8868\u6570\u636E",paraId:4,tocIndex:1},{value:`const mockdata = [
  { category: '\u5206\u7C7B\u4E00', value: 27 },
  { category: '\u5206\u7C7B\u4E8C', value: 25 },
  { category: '\u5206\u7C7B\u4E09', value: 18 },
  { category: '\u5206\u7C7B\u56DB', value: 15 },
  { category: '\u5206\u7C7B\u4E94', value: 10 },
  { category: '\u5176\u4ED6', value: 5 },
];
`,paraId:5,tocIndex:1},{value:"\u6E32\u67D3\u804A\u5929\u6C14\u6CE1",paraId:6,tocIndex:1},{value:`import { Pie } from '@antv/gpt-vis';
import { Bubble } from '@ant-design/x';

export default () => {
  return (
    <Bubble
      content={<Pie data={mockdata} containerStyle={{ width: 300, height: 250 }} />}
      styles={{ content: { background: '#fff' } }}
    />
  );
};
`,paraId:7,tocIndex:1}]},74619:function(p,t,n){n.r(t),n.d(t,{texts:function(){return d}});const d=[{value:`import React from 'react';
import Markdown from 'react-markdown';
import { withChartCode, withDefaultChartCode, ChartType, Line } from '@antv/gpt-vis';

const markdownContent = \`
# GPT-VIS \\n\\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

Here\u2019s a visualization of Haidilao's food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\\\`\\\`\\\`vis-chart
{ "type": "line","data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}] }
\\\`\\\`\\\`
\`;

const CodeBlock = withChartCode({
  components: { [ChartType.Line]: Line },
});
// \u6216
// const CodeBlock = withDefaultChartCode();

export default () => {
  return <Markdown components={{ code: CodeBlock }}>{markdownContent}</Markdown>;
};
`,paraId:0,tocIndex:0}]},41482:function(p,t,n){n.r(t),n.d(t,{texts:function(){return d}});const d=[{value:"\u901A\u8FC7\u5728 ",paraId:0},{value:"ConfigProvider",paraId:1},{value:" \u4E2D\u4F20\u5165\u6837\u5F0F\u5C5E\u6027\uFF0C\u6765\u914D\u7F6E\u56FE\u8868\u7EC4\u4EF6\u7684\u5168\u5C40\u6837\u5F0F\u3002",paraId:0},{value:"\u7ED9\u5404\u4E2A\u7EC4\u4EF6\u5B9A\u5236\u6837\u5F0F",paraId:2,tocIndex:0},{value:`import { ConfigProvider } from '@antv/gpt-vis';

// \u8BBE\u7F6E\u751C\u751C\u5708\u6837\u5F0F
const pieConfig = {
  legend: false,
  innerRadius: 0.6,
  style: {
    stroke: '#fff',
    inset: 1,
    radius: 10,
  },
};

// \u9762\u79EF\u56FE\u8BBE\u7F6E\u6E10\u53D8\u8272
const areaConfig = {
  style: {
    fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
  },
  line: {
    style: {
      stroke: 'darkgreen',
      strokeWidth: 2,
    },
    tooltip: false,
  },
};

// \u5730\u56FE\u8BBE\u7F6E\u56FE\u6807
const pinMapConfig = {
  markerStyle: {
    iconPath:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JZf9T6psSzkAAAAAAAAAAAAADmJ7AQ/original',
  },
};

export default () => {
  return (
    <ConfigProvider
      components={{
        Pie: pieConfig,
        Area: areaConfig,
        PinMap: pinMapConfig,
      }}
    >
      // ...
    </ConfigProvider>
  );
};
`,paraId:3,tocIndex:0},{value:`import { ConfigProvider } from '@antv/gpt-vis';

export default () => {
  return (
    <ConfigProvider
      plot={{ theme: { type: 'academy' } }}
      map={{ style: 'dark', token: '\u4F60\u7684\u5730\u56FEtoken' }}
    >
      // ...
    </ConfigProvider>
  );
};
`,paraId:4,tocIndex:1},{value:"\u66F4\u591A\u7528\u6CD5\u8BE6\u89C1 ",paraId:5},{value:"ConfigProvider",paraId:6}]},45980:function(p,t,n){n.r(t),n.d(t,{texts:function(){return d}});const d=[{value:`$ npm install @antv/gpt-vis --save
`,paraId:0,tocIndex:0},{value:`import React from 'react';
import { GPTVis } from '@antv/gpt-vis';

const markdownContent = \`
# GPT-VIS \\n\\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

Here\u2019s a visualization of Haidilao's food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\\\`\\\`\\\`vis-chart
{ "type": "line","data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}] }
\\\`\\\`\\\`
\`;

export default () => {
  return <GPTVis>{markdownContent}</GPTVis>;
};
`,paraId:1,tocIndex:1},{value:"\u4E1A\u52A1\u5B9A\u5236 UI \u573A\u666F\uFF0C\u63D0\u4F9B\u65B9\u4FBF\u7684\u6269\u5C55\u673A\u5236\uFF0C\u652F\u6301\u6807\u7B7E\u548C\u4EE3\u7801\u5757\u6269\u5C55\u3002",paraId:2,tocIndex:2},{value:`import { GPTVis, withDefaultChartCode, VisText } from '@antv/gpt-vis';

const markdownContent = \`
\\\`\\\`\\\`my-ui
my data
\\\`\\\`\\\`

<vis-text type="time_desc">\u672C\u6708</vis-text>\u5171\u4EA7\u751F<vis-text type="metric_name">\u51B3\u7B56\u6570\u91CF</vis-text><vis-text type="metric_value">2,783</vis-text>\u4E2A\uFF0C\u73AF\u6BD4<vis-text type="trend_desc">\u589E\u957F</vis-text><vis-text type="ratio_value_pos">15.2%</vis-text>\u3002<vis-text type="dim_name">\u9AD8\u4F18\u5148\u7EA7\u51B3\u7B56</vis-text>\u5360\u6BD4<vis-text type="proportion">56.2%</vis-text>\uFF0C\u5448\u73B0\u7A33\u5B9A<vis-text type="trend_desc" origin="[1, 2, 6, 18, 24, 48]">\u4E0A\u5347</vis-text>\u8D8B\u52BF\uFF0C\u9884\u8BA1<vis-text type="time_desc">\u4E0B\u6708</vis-text>\u5C06\u7A81\u7834<vis-text type="metric_value">3,000</vis-text>\u5927\u5173\u3002
\`;

const customRenderers = {
  'my-ui': ({ children }) => <div>{children}</div>,
};
const components = {
  'vis-text': VisText,
  code: withDefaultChartCode({ languageRenderers: customRenderers }),
};

export default () => {
  return <GPTVis components={components}>{markdownContent}</GPTVis>;
};
`,paraId:3,tocIndex:2}]},17026:function(p,t,n){n.r(t),n.d(t,{texts:function(){return d}});const d=[]}}]);
