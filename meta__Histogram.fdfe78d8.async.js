"use strict";(self.webpackChunk_antv_gpt_vis=self.webpackChunk_antv_gpt_vis||[]).push([[8056],{25786:function(d,a,n){var l;n.r(a),n.d(a,{demos:function(){return g}});var I=n(90228),v=n.n(I),c=n(87999),p=n.n(c),u=n(75271),i=n(88421),x=n(69763),g={"histogram-demo-common":{component:u.memo(u.lazy(function(){return n.e(5898).then(n.bind(n,26281))})),asset:{type:"BLOCK",id:"histogram-demo-common",refAtomIds:["Histogram"],dependencies:{"index.tsx":{type:"FILE",value:n(78417).Z},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",title:"\u5355\u72EC\u4F7F\u7528"},context:{"@antv/gpt-vis":i,react:l||(l=n.t(u,2))},renderOpts:{compile:function(){var o=p()(v()().mark(function s(){var t,m=arguments;return v()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(t=e.sent).default.apply(t,m));case 3:case"end":return e.stop()}},s)}));function r(){return o.apply(this,arguments)}return r}()}},"histogram-demo-markdown":{component:u.memo(u.lazy(function(){return n.e(5898).then(n.bind(n,51779))})),asset:{type:"BLOCK",id:"histogram-demo-markdown",refAtomIds:["Histogram"],dependencies:{"index.tsx":{type:"FILE",value:n(5187).Z},"@ant-design/x":{type:"NPM",value:"1.0.0-alpha.12"},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",title:"\u4F7F\u7528 Markdown \u534F\u8BAE"},context:{"@ant-design/x":x,"@antv/gpt-vis":i,react:l||(l=n.t(u,2))},renderOpts:{compile:function(){var o=p()(v()().mark(function s(){var t,m=arguments;return v()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(t=e.sent).default.apply(t,m));case 3:case"end":return e.stop()}},s)}));function r(){return o.apply(this,arguments)}return r}()}}}},46102:function(d,a,n){n.r(a),n.d(a,{texts:function(){return l}});const l=[{value:`{
  "type": "histogram",
  "data": [{ "value": 2 }, { "value": 5 }, { "value": 8 }, { "value": 3 }],
  "binNumber": 4
}
`,paraId:0,tocIndex:4},{value:"\u5C5E\u6027",paraId:1,tocIndex:6},{value:"\u7C7B\u578B",paraId:1,tocIndex:6},{value:"\u662F\u5426\u5FC5\u4F20",paraId:1,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:1,tocIndex:6},{value:"\u8BF4\u660E",paraId:1,tocIndex:6},{value:"data",paraId:1,tocIndex:6},{value:"HistogramDataItem[]",paraId:1,tocIndex:6},{value:"\u662F",paraId:1,tocIndex:6},{value:"-",paraId:1,tocIndex:6},{value:"\u6570\u636E",paraId:1,tocIndex:6},{value:"binNumber",paraId:1,tocIndex:6},{value:"number",paraId:1,tocIndex:6},{value:"\u5426",paraId:1,tocIndex:6},{value:"-",paraId:1,tocIndex:6},{value:"\u533A\u95F4\u4E2A\u6570\uFF0C\u7528\u4E8E\u5B9A\u4E49\u76F4\u65B9\u56FE\u7684\u533A\u95F4\u6570\u91CF",paraId:1,tocIndex:6},{value:"title",paraId:1,tocIndex:6},{value:"string",paraId:1,tocIndex:6},{value:"\u5426",paraId:1,tocIndex:6},{value:"-",paraId:1,tocIndex:6},{value:"\u56FE\u8868\u7684\u6807\u9898",paraId:1,tocIndex:6},{value:"axisXTitle",paraId:1,tocIndex:6},{value:"string",paraId:1,tocIndex:6},{value:"\u5426",paraId:1,tocIndex:6},{value:"-",paraId:1,tocIndex:6},{value:"x \u8F74\u7684\u6807\u9898",paraId:1,tocIndex:6},{value:"axisYTitle",paraId:1,tocIndex:6},{value:"string",paraId:1,tocIndex:6},{value:"\u5426",paraId:1,tocIndex:6},{value:"-",paraId:1,tocIndex:6},{value:"y \u8F74\u7684\u6807\u9898",paraId:1,tocIndex:6},{value:"...",paraId:1,tocIndex:6},{value:"-",paraId:1,tocIndex:6},{value:"-",paraId:1,tocIndex:6},{value:"-",paraId:1,tocIndex:6},{value:"\u66F4\u591A\u5C5E\u6027\uFF0C\u8BE6\u89C1 ",paraId:1,tocIndex:6},{value:"Ant Design Charts ",paraId:1,tocIndex:6},{value:"\u5C5E\u6027",paraId:2,tocIndex:7},{value:"\u7C7B\u578B",paraId:2,tocIndex:7},{value:"\u662F\u5426\u5FC5\u4F20",paraId:2,tocIndex:7},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:7},{value:"\u8BF4\u660E",paraId:2,tocIndex:7},{value:"value",paraId:2,tocIndex:7},{value:"number",paraId:2,tocIndex:7},{value:"\u662F",paraId:2,tocIndex:7},{value:"-",paraId:2,tocIndex:7},{value:"\u6570\u636E\u7684\u503C",paraId:2,tocIndex:7}]},78417:function(d,a){a.Z=`import { Histogram } from '@antv/gpt-vis';
import React from 'react';

const data = [
  { value: 1.2 },
  { value: 3.4 },
  { value: 3.7 },
  { value: 4.3 },
  { value: 5.2 },
  { value: 5.8 },
  { value: 6.1 },
  { value: 6.5 },
  { value: 6.8 },
  { value: 7.1 },
  { value: 7.3 },
  { value: 7.7 },
  { value: 8.3 },
  { value: 8.6 },
  { value: 8.8 },
  { value: 9.1 },
  { value: 9.2 },
  { value: 9.4 },
  { value: 9.5 },
  { value: 9.7 },
  { value: 10.5 },
  { value: 10.7 },
  { value: 10.8 },
  { value: 11.0 },
  { value: 11.0 },
  { value: 11.1 },
  { value: 11.2 },
  { value: 11.3 },
  { value: 11.4 },
  { value: 11.4 },
  { value: 11.7 },
  { value: 12.0 },
  { value: 12.9 },
  { value: 12.9 },
  { value: 13.3 },
  { value: 13.7 },
  { value: 13.8 },
  { value: 13.9 },
  { value: 14.0 },
  { value: 14.2 },
  { value: 14.5 },
  { value: 15 },
  { value: 15.2 },
  { value: 15.6 },
  { value: 16.0 },
  { value: 16.3 },
  { value: 17.3 },
  { value: 17.5 },
  { value: 17.9 },
  { value: 18.0 },
  { value: 18.0 },
  { value: 20.6 },
  { value: 21 },
  { value: 23.4 },
];

export default () => {
  return (
    <Histogram
      data={data}
      binNumber={10}
      axisXTitle="range"
      axisYTitle="count"
      containerStyle={{ height: 300 }}
    />
  );
};
`},5187:function(d,a){a.Z=`import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVis, Histogram, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = \`
\u5F53\u7136\u4E86\uFF0C\u4EE5\u4E0B\u662F\u4E3A\u4F60\u7ED8\u5236\u7684\u4E00\u4E2A\u76F4\u65B9\u56FE

\\\`\\\`\\\`vis-chart
{
    "type": "histogram",
    "data": [
        {
            "value": 45
        },
        {
            "value": 55
        },
        {
            "value": 67
        },
        {
            "value": 50
        },
        {
            "value": 42
        },
        {
            "value": 61
        },
        {
            "value": 33
        },
        {
            "value": 76
        },
        {
            "value": 59
        },
        {
            "value": 51
        },
        {
            "value": 70
        },
        {
            "value": 63
        },
        {
            "value": 50
        },
        {
            "value": 48
        },
        {
            "value": 37
        },
        {
            "value": 72
        },
        {
            "value": 55
        },
        {
            "value": 52
        },
        {
            "value": 50
        },
        {
            "value": 46
        },
        {
            "value": 65
        },
        {
            "value": 68
        },
        {
            "value": 60
        },
        {
            "value": 45
        },
        {
            "value": 54
        },
        {
            "value": 75
        },
        {
            "value": 49
        },
        {
            "value": 56
        },
        {
            "value": 47
        },
        {
            "value": 51
        },
        {
            "value": 62
        },
        {
            "value": 53
        },
        {
            "value": 71
        },
        {
            "value": 50
        },
        {
            "value": 40
        },
        {
            "value": 57
        },
        {
            "value": 36
        },
        {
            "value": 69
        },
        {
            "value": 42
        },
        {
            "value": 63
        },
        {
            "value": 44
        },
        {
            "value": 64
        },
        {
            "value": 77
        },
        {
            "value": 59
        },
        {
            "value": 50
        },
        {
            "value": 53
        },
        {
            "value": 61
        },
        {
            "value": 48
        },
        {
            "value": 58
        },
        {
            "value": 66
        },
        {
            "value": 51
        },
        {
            "value": 39
        },
        {
            "value": 60
        },
        {
            "value": 56
        },
        {
            "value": 57
        },
        {
            "value": 67
        },
        {
            "value": 64
        },
        {
            "value": 53
        },
        {
            "value": 73
        },
        {
            "value": 50
        },
        {
            "value": 45
        },
        {
            "value": 61
        },
        {
            "value": 58
        },
        {
            "value": 54
        },
        {
            "value": 68
        },
        {
            "value": 41
        },
        {
            "value": 62
        },
        {
            "value": 50
        },
        {
            "value": 46
        },
        {
            "value": 70
        },
        {
            "value": 42
        },
        {
            "value": 69
        },
        {
            "value": 55
        },
        {
            "value": 60
        },
        {
            "value": 51
        },
        {
            "value": 66
        },
        {
            "value": 48
        },
        {
            "value": 59
        },
        {
            "value": 52
        },
        {
            "value": 63
        },
        {
            "value": 57
        },
        {
            "value": 61
        },
        {
            "value": 74
        },
        {
            "value": 65
        },
        {
            "value": 55
        },
        {
            "value": 47
        },
        {
            "value": 53
        },
        {
            "value": 68
        },
        {
            "value": 62
        },
        {
            "value": 49
        },
        {
            "value": 58
        },
        {
            "value": 66
        },
        {
            "value": 50
        },
        {
            "value": 44
        },
        {
            "value": 72
        },
        {
            "value": 41
        }
    ],
    "binNumber": 10
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

const CodeComponent = withChartCode({
  components: { [ChartType.Histogram]: Histogram },
  style: { width: 350 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="\u76F4\u65B9\u56FE\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E"
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
`}}]);
