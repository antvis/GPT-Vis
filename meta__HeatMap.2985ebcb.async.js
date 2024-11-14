"use strict";(self.webpackChunk_antv_gpt_vis=self.webpackChunk_antv_gpt_vis||[]).push([[4132],{92855:function(f,v,n){var m;n.r(v),n.d(v,{demos:function(){return E}});var y=n(82092),P=n.n(y),b=n(90228),r=n.n(b),M=n(87999),c=n.n(M),l=n(75271),_=n(88421),x=n(69763),E={"heatmap-demo-0":{component:l.memo(l.lazy(c()(r()().mark(function s(){var u,d,t,o,p;return r()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Promise.resolve().then(n.t.bind(n,75271,19));case 2:return u=a.sent,d=u.default,a.next=6,Promise.resolve().then(n.bind(n,88421));case 6:return t=a.sent,o=t.HeatMap,p=[{longitude:121.473117,latitude:31.230125,value:20},{longitude:121.473337,latitude:31.230325,value:100},{longitude:121.473557,latitude:31.230525,value:300},{longitude:121.473777,latitude:31.230725,value:600},{longitude:121.473997,latitude:31.230925,value:1e3}],a.abrupt("return",{default:function(){return d.createElement(o,{data:p})}});case 10:case"end":return a.stop()}},s)})))),asset:{type:"BLOCK",id:"heatmap-demo-0",refAtomIds:["HeatMap"],dependencies:{"index.jsx":{type:"FILE",value:`import React from 'react';
import { HeatMap } from '@antv/gpt-vis';

const data = [
  {
    longitude: 121.473117,
    latitude: 31.230125,
    value: 20,
  },
  {
    longitude: 121.473337,
    latitude: 31.230325,
    value: 100,
  },
  {
    longitude: 121.473557,
    latitude: 31.230525,
    value: 300,
  },
  {
    longitude: 121.473777,
    latitude: 31.230725,
    value: 600,
  },
  {
    longitude: 121.473997,
    latitude: 31.230925,
    value: 1000,
  },
];

export default () => <HeatMap data={data} />;`},react:{type:"NPM",value:"18.3.1"},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"}},entry:"index.jsx"},context:{react:m||(m=n.t(l,2)),"@antv/gpt-vis":_},renderOpts:{compile:function(){var s=c()(r()().mark(function d(){var t,o=arguments;return r()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(t=e.sent).default.apply(t,o));case 3:case"end":return e.stop()}},d)}));function u(){return s.apply(this,arguments)}return u}()}},"heatmap-demo-1":{component:l.memo(l.lazy(c()(r()().mark(function s(){var u,d,t,o,p,e,a,g,I,A,h;return r()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Promise.resolve().then(n.bind(n,69763));case 2:return u=i.sent,d=u.Bubble,i.next=6,Promise.resolve().then(n.bind(n,88421));case 6:return t=i.sent,o=t.HeatMap,p=t.withChartCode,e=t.ChartType,a=t.GPTVis,g={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},I=`
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
~~~`,A=p({components:P()({},e.HeatMap,o),style:{width:500}}),h=function(T){return l.createElement(a,{components:{code:A}},T)},i.abrupt("return",{default:function(){return l.createElement("div",{style:g},l.createElement(d,{placement:"end",content:"\u4E0A\u6D77\u5E02\u6E38\u5BA2\u91CF\u8F83\u5927\u7684\u666F\u70B9\u5728\u54EA\u91CC\uFF1F",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),l.createElement(d,{content:I,messageRender:h,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}}))}});case 16:case"end":return i.stop()}},s)})))),asset:{type:"BLOCK",id:"heatmap-demo-1",refAtomIds:["HeatMap"],dependencies:{"index.tsx":{type:"FILE",value:`import { Bubble, type BubbleProps } from '@ant-design/x';
import { HeatMap, withChartCode, ChartType, GPTVis } from '@antv/gpt-vis';

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const markdownContent = \`
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
~~~\`;

const CodeComponent = withChartCode({
  components: { [ChartType.HeatMap]: HeatMap },
  style: { width: 500 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
);

export default () => {
  return (
    <div style={bgStyle}>
      <Bubble
        placement="end"
        content="\u4E0A\u6D77\u5E02\u6E38\u5BA2\u91CF\u8F83\u5927\u7684\u666F\u70B9\u5728\u54EA\u91CC\uFF1F"
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp',
        }}
        styles={{ content: { background: '#ebebeb' } }}
      />
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
};`},"@ant-design/x":{type:"NPM",value:"1.0.0-alpha.12"},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"}},entry:"index.tsx"},context:{"@ant-design/x":x,"@antv/gpt-vis":_},renderOpts:{compile:function(){var s=c()(r()().mark(function d(){var t,o=arguments;return r()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(t=e.sent).default.apply(t,o));case 3:case"end":return e.stop()}},d)}));function u(){return s.apply(this,arguments)}return u}()}}}},64900:function(f,v,n){n.r(v),n.d(v,{texts:function(){return m}});const m=[{value:"\u70ED\u529B\u5730\u56FE\uFF0C\u76F4\u89C2\u5C55\u793A\u6570\u636E\u5BC6\u5EA6\u4E0E\u9891\u7387\u7684\u7A7A\u95F4\u5206\u5E03\u3002",paraId:0,tocIndex:0},{value:`{
  "type": "heat-map",
  "data": [
    {
      "longitude": 121.473117,
      "latitude": 31.230125,
      "value": 20
    },
    {
      "longitude": 121.473337,
      "latitude": 31.230325,
      "value": 100
    },
    {
      "longitude": 121.473557,
      "latitude": 31.230525,
      "value": 300
    },
    {
      "longitude": 121.473777,
      "latitude": 31.230725,
      "value": 600
    },
    {
      "longitude": 121.473997,
      "latitude": 31.230925,
      "value": 1000
    }
  ]
}
`,paraId:1,tocIndex:4},{value:"\u5C5E\u6027",paraId:2,tocIndex:6},{value:"\u7C7B\u578B",paraId:2,tocIndex:6},{value:"\u662F\u5426\u5FC5\u4F20",paraId:2,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:6},{value:"\u8BF4\u660E",paraId:2,tocIndex:6},{value:"data",paraId:2,tocIndex:6},{value:"HeatMapDataItem[]",paraId:2,tocIndex:6},{value:"\u662F",paraId:2,tocIndex:6},{value:"-",paraId:2,tocIndex:6},{value:"\u6570\u636E",paraId:2,tocIndex:6},{value:"\u5C5E\u6027",paraId:3,tocIndex:7},{value:"\u7C7B\u578B",paraId:3,tocIndex:7},{value:"\u662F\u5426\u5FC5\u4F20",paraId:3,tocIndex:7},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:7},{value:"\u8BF4\u660E",paraId:3,tocIndex:7},{value:"longitude",paraId:3,tocIndex:7},{value:"number",paraId:3,tocIndex:7},{value:"\u662F",paraId:3,tocIndex:7},{value:"-",paraId:3,tocIndex:7},{value:"\u7ECF\u5EA6",paraId:3,tocIndex:7},{value:"latitude",paraId:3,tocIndex:7},{value:"number",paraId:3,tocIndex:7},{value:"\u662F",paraId:3,tocIndex:7},{value:"-",paraId:3,tocIndex:7},{value:"\u7EAC\u5EA6",paraId:3,tocIndex:7},{value:"value",paraId:3,tocIndex:7},{value:"number",paraId:3,tocIndex:7},{value:"\u662F",paraId:3,tocIndex:7},{value:"-",paraId:3,tocIndex:7},{value:"\u70ED\u529B\u503C",paraId:3,tocIndex:7}]}}]);
