"use strict";(self.webpackChunk_antv_gpt_vis=self.webpackChunk_antv_gpt_vis||[]).push([[6527],{69928:function(o,u,n){n.r(u);var t=n(49700),e=n(10764),r=n(75271),_=n(52676),a=`
 ~~~vis-chart
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
~~~`,i={legend:!1,innerRadius:.6,style:{stroke:"#fff",inset:1,radius:10}};u.default=function(){return(0,_.jsx)(t.Z,{components:{Pie:i},children:(0,_.jsx)(e.Z,{children:a})})}},77476:function(o,u,n){n.r(u);var t=n(26068),e=n.n(t),r=n(15558),_=n.n(r),a=n(49700),i=n(10764),A=n(75271),s=n(52676),m=`
 ~~~vis-chart
{
  "type": "mind-map",
  "data": {
    "name": "\u53F0\u98CE\u5F62\u6210\u7684\u56E0\u7D20",
    "children": [
      {
        "name": "\u6C14\u8C61\u6761\u4EF6",
        "children": [
          { "name": "\u6E29\u6696\u7684\u6D77\u6C34" },
          { "name": "\u6C14\u538B\u5206\u5E03" },
          { "name": "\u6E7F\u5EA6\u6C34\u5E73" },
          { "name": "\u98CE\u7684\u5207\u53D8" }
        ]
      },
      {
        "name": "\u5730\u7406\u73AF\u5883",
        "children": [
          { "name": "\u5927\u9646\u67B6\u7684\u5F62\u72B6\u4E0E\u6DF1\u5EA6" },
          { "name": "\u6D77\u6D0B\u6696\u6D41\u7684\u5206\u5E03" },
          { "name": "\u70ED\u5E26\u5730\u533A\u7684\u6C14\u5019\u7279\u5F81" },
          { "name": "\u5C9B\u5C7F\u7684\u5F71\u54CD" }
        ]
      }
    ]
  }
}
~~~`,d={type:"linear",direction:"right",behaviors:function(l){return[].concat(_()(l.filter(function(E){return E.key!=="zoom-canvas"})),[{key:"drag-element",type:"drag-element"}])},transforms:function(l){return[].concat(_()(l.filter(function(E){return E.key!=="collapse-expand-react-node"})),[e()(e()({},l.find(function(E){return E.key==="collapse-expand-react-node"})),{},{enable:!1})])}};u.default=function(){return(0,s.jsx)(a.Z,{components:{MindMap:d},children:(0,s.jsx)(i.Z,{children:m})})}},12567:function(o,u,n){n.r(u);var t=n(49700),e=n(10764),r=n(75271),_=n(52676),a=`
  ~~~vis-chart
  {
    "type": "pin-map",
    "data": [
      {
        "longitude": 120.210792,
        "latitude": 30.246026,
        "label": "\u676D\u5DDE"
      },
      {
        "longitude": 121.473667,
        "latitude": 31.230525,
        "label": "\u4E0A\u6D77"
      },
      {
        "longitude": 120.585294,
        "latitude": 31.299758,
        "label": "\u82CF\u5DDE"
      },
      {
        "longitude": 118.796624,
        "latitude": 32.059344,
        "label": "\u5357\u4EAC"
      }
    ]
  }
~~~`;u.default=function(){return(0,_.jsx)(t.Z,{map:{style:"dark",token:"\u4F60\u7684\u5730\u56FEtoken"},components:{PinMap:{markerStyle:{iconPath:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oxcETa4MKgwAAAAAAAAAAAAADmJ7AQ/original"}}},children:(0,_.jsx)(e.Z,{children:a})})}},73007:function(o,u,n){n.r(u);var t=n(49700),e=n(10764),r=n(75271),_=n(52676),a=`
 ~~~vis-chart
{
  "type": "line",
  "data": [
    { "time": "2015 \u5E74", "value": 1700, "group": "\u51FA\u751F\u4EBA\u53E3" },
    { "time": "2015 \u5E74", "value": 965, "group": "\u6B7B\u4EA1\u4EBA\u53E3" },
    { "time": "2016 \u5E74", "value": 1500, "group": "\u51FA\u751F\u4EBA\u53E3" },
    { "time": "2016 \u5E74", "value": 846, "group": "\u6B7B\u4EA1\u4EBA\u53E3" },
    { "time": "2017 \u5E74", "value": 1200, "group": "\u51FA\u751F\u4EBA\u53E3" },
    { "time": "2017 \u5E74", "value": 782, "group": "\u6B7B\u4EA1\u4EBA\u53E3" },
    { "time": "2018 \u5E74", "value": 1250, "group": "\u51FA\u751F\u4EBA\u53E3" },
    { "time": "2018 \u5E74", "value": 762, "group": "\u6B7B\u4EA1\u4EBA\u53E3" },
    { "time": "2019 \u5E74", "value": 1290, "group": "\u51FA\u751F\u4EBA\u53E3" },
    { "time": "2019 \u5E74", "value": 862, "group": "\u6B7B\u4EA1\u4EBA\u53E3" },
    { "time": "2020 \u5E74", "value": 1100, "group": "\u51FA\u751F\u4EBA\u53E3" },
    { "time": "2020 \u5E74", "value": 962, "group": "\u6B7B\u4EA1\u4EBA\u53E3" }
  ],
  "axisXTitle": "year",
  "axisYTitle": "count"
}
~~~`;u.default=function(){return(0,_.jsx)(t.Z,{plot:{theme:{type:"academy"}},children:(0,_.jsx)(e.Z,{children:a})})}}}]);
