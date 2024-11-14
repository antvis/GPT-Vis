"use strict";(self.webpackChunk_antv_gpt_vis=self.webpackChunk_antv_gpt_vis||[]).push([[5755],{26239:function(m,t,n){var o;n.r(t),n.d(t,{demos:function(){return g}});var f=n(90228),l=n.n(f),y=n(87999),p=n.n(y),a=n(75271),c=n(88421),g={"gptvis-demo-default":{component:a.memo(a.lazy(function(){return n.e(9639).then(n.bind(n,17754))})),asset:{type:"BLOCK",id:"gptvis-demo-default",refAtomIds:["GPTVis"],dependencies:{"index.tsx":{type:"FILE",value:n(76714).Z},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@antv/gpt-vis":c,react:o||(o=n.t(a,2))},renderOpts:{compile:function(){var s=p()(l()().mark(function d(){var r,u=arguments;return l()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(r=e.sent).default.apply(r,u));case 3:case"end":return e.stop()}},d)}));function i(){return s.apply(this,arguments)}return i}()}},"gptvis-demo-tag":{component:a.memo(a.lazy(function(){return n.e(9639).then(n.bind(n,12272))})),asset:{type:"BLOCK",id:"gptvis-demo-tag",refAtomIds:["GPTVis"],dependencies:{"index.tsx":{type:"FILE",value:n(49754).Z},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@antv/gpt-vis":c,react:o||(o=n.t(a,2))},renderOpts:{compile:function(){var s=p()(l()().mark(function d(){var r,u=arguments;return l()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(r=e.sent).default.apply(r,u));case 3:case"end":return e.stop()}},d)}));function i(){return s.apply(this,arguments)}return i}()}},"gptvis-demo-code":{component:a.memo(a.lazy(function(){return n.e(9639).then(n.bind(n,18062))})),asset:{type:"BLOCK",id:"gptvis-demo-code",refAtomIds:["GPTVis"],dependencies:{"index.tsx":{type:"FILE",value:n(45011).Z},"@antv/gpt-vis":{type:"NPM",value:"0.1.0"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@antv/gpt-vis":c,react:o||(o=n.t(a,2))},renderOpts:{compile:function(){var s=p()(l()().mark(function d(){var r,u=arguments;return l()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(7474).then(n.bind(n,77474));case 2:return e.abrupt("return",(r=e.sent).default.apply(r,u));case 3:case"end":return e.stop()}},d)}));function i(){return s.apply(this,arguments)}return i}()}}}},92640:function(m,t,n){n.r(t),n.d(t,{texts:function(){return o}});const o=[{value:"GPTVis \u534F\u8BAE\u7684 Markdown \u6E32\u67D3\u5668\uFF0C\u57FA\u4E8E Markdown \u8BED\u6CD5\u6269\u5C55 ",paraId:0,tocIndex:0},{value:"vis-chart",paraId:0,tocIndex:0},{value:" \u8BED\u6CD5\u5757\uFF0C\u652F\u6301\u81EA\u5B9A\u4E49\u6E32\u67D3\u7EC4\u4EF6\u3002",paraId:0,tocIndex:0},{value:"\u7EE7\u627F ",paraId:1,tocIndex:4},{value:"react-markdown",paraId:1,tocIndex:4},{value:" \u7EC4\u4EF6\u5168\u90E8\u5C5E\u6027\u3002",paraId:1,tocIndex:4}]},45011:function(m,t){t.Z=`import type { CodeBlockComponent } from '@antv/gpt-vis';
import { ChartType, GPTVis, PinMap, withChartCode } from '@antv/gpt-vis';
import React from 'react';

/**
 * \u81EA\u5B9A\u4E49\u4EE3\u7801\u5757\u6E32\u67D3\u5668
 */
const MyUIRenderer: CodeBlockComponent = ({ children }) => {
  return <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>{children}</div>;
};

const components = {
  code: withChartCode({
    languageRenderers: { kotlin: MyUIRenderer },
    components: { [ChartType.PinMap]: PinMap },
  }),
};

const content = \`
\\\`\\\`\\\`my-ui
my data ...
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
export default () => <GPTVis components={components}>{content}</GPTVis>;
`},76714:function(m,t){t.Z=`import { GPTVis } from '@antv/gpt-vis';
import React from 'react';

const content = \`# GPT-VIS \\n\\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

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
\`;

export default () => {
  return <GPTVis>{content}</GPTVis>;
};
`},49754:function(m,t){t.Z=`import { GPTVis, withDefaultChartCode } from '@antv/gpt-vis';
import React from 'react';

const components = {
  // Rewrite \`a\` style
  a(props: any) {
    const { href, children } = props;
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: '#2b8afe wavy underline' }}
      >
        {children}
      </a>
    );
  },
  // Rewrite \`em\`s (\`*like so*\`) to \`i\` with a color.
  em(props: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { node, ...rest } = props;
    return (
      <b
        style={{
          background: '#f0f489',
          fontWeight: 'bold',
        }}
        {...rest}
      />
    );
  },
  code: withDefaultChartCode(),
};

const content = \`
# Haidilao's Food Delivery Revenue (2013-2022)

Here\u2019s a visualization of [Haidilao](/)'s food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\\\`\\\`\\\`vis-chart
{
  "type": "line",
  "data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]
}
\\\`\\\`\\\`
\`;
export default () => <GPTVis components={components}>{content}</GPTVis>;
`}}]);
