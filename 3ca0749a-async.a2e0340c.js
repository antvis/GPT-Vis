(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["3ca0749a"],{"3c9e98d5":function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.d(a,"default",{enumerable:!0,get:function(){return l;}});var n=t("a2e753d8");t("a28246c2");var i=t("df67f0d6");let r=`
 ~~~vis-chart
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
~~~`,u={legend:!1,innerRadius:.6,style:{stroke:"#fff",inset:1,radius:10}};var l=()=>(0,n.jsx)(i.ConfigProvider,{components:{Pie:u},children:(0,n.jsx)(i.GPTVis,{children:r})});},"4791efb4":function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.d(a,"default",{enumerable:!0,get:function(){return l;}});var n=t("a2e753d8");t("902a8da0");var i=t("df67f0d6");let r=`
 ~~~vis-chart
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
~~~`,u={type:"linear",direction:"right",behaviors:e=>[...e.filter(e=>"zoom-canvas"!==e.key),{key:"drag-element",type:"drag-element"}],transforms:e=>[...e.filter(e=>"collapse-expand-react-node"!==e.key),{...e.find(e=>"collapse-expand-react-node"===e.key),enable:!1}]};var l=()=>(0,n.jsx)(i.ConfigProvider,{components:{MindMap:u},children:(0,n.jsx)(i.GPTVis,{children:r})});},c1f97feb:function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.d(a,"Source",{enumerable:!0,get:function(){return i.default;}});var n=t("d1751d7c"),i=t("777fffbe")._(t("63855282"));n._(t("a97b4ee8"),a),n._(t("d9b661b3"),a),n._(t("1686747a"),a),n._(t("382f6ca4"),a),n._(t("106867e1"),a),n._(t("fb1ec05a"),a),n._(t("3beb203b"),a);},d9e2422f:function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.d(a,"default",{enumerable:!0,get:function(){return u;}});var n=t("a2e753d8");t("f54b0301");var i=t("df67f0d6");let r=`
 ~~~vis-chart
{
  "type": "line",
  "data": [
    { "time": "2015 \u{5E74}", "value": 1700, "group": "\u{51FA}\u{751F}\u{4EBA}\u{53E3}" },
    { "time": "2015 \u{5E74}", "value": 965, "group": "\u{6B7B}\u{4EA1}\u{4EBA}\u{53E3}" },
    { "time": "2016 \u{5E74}", "value": 1500, "group": "\u{51FA}\u{751F}\u{4EBA}\u{53E3}" },
    { "time": "2016 \u{5E74}", "value": 846, "group": "\u{6B7B}\u{4EA1}\u{4EBA}\u{53E3}" },
    { "time": "2017 \u{5E74}", "value": 1200, "group": "\u{51FA}\u{751F}\u{4EBA}\u{53E3}" },
    { "time": "2017 \u{5E74}", "value": 782, "group": "\u{6B7B}\u{4EA1}\u{4EBA}\u{53E3}" },
    { "time": "2018 \u{5E74}", "value": 1250, "group": "\u{51FA}\u{751F}\u{4EBA}\u{53E3}" },
    { "time": "2018 \u{5E74}", "value": 762, "group": "\u{6B7B}\u{4EA1}\u{4EBA}\u{53E3}" },
    { "time": "2019 \u{5E74}", "value": 1290, "group": "\u{51FA}\u{751F}\u{4EBA}\u{53E3}" },
    { "time": "2019 \u{5E74}", "value": 862, "group": "\u{6B7B}\u{4EA1}\u{4EBA}\u{53E3}" },
    { "time": "2020 \u{5E74}", "value": 1100, "group": "\u{51FA}\u{751F}\u{4EBA}\u{53E3}" },
    { "time": "2020 \u{5E74}", "value": 962, "group": "\u{6B7B}\u{4EA1}\u{4EBA}\u{53E3}" }
  ],
  "axisXTitle": "year",
  "axisYTitle": "count"
}
~~~`;var u=()=>(0,n.jsx)(i.ConfigProvider,{plot:{theme:{type:"academy"}},children:(0,n.jsx)(i.GPTVis,{children:r})});},df67f0d6:function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.e(a,{ConfigProvider:function(){return l.default;},GPTVis:function(){return d.default;},GPTVisLite:function(){return o.default;},useEventPublish:function(){return o.useEventPublish;},version:function(){return f.default;},withChartCode:function(){return u.withChartCode;},withDefaultChartCode:function(){return u.withDefaultChartCode;}});var n=t("d1751d7c"),i=t("777fffbe"),r=t("852bbaa9");n._(t("5639510f"),a),n._(t("d382b880"),a);var u=t("a574afdb"),l=i._(t("a7265236")),d=i._(t("2c69d5f6")),o=r._(t("033b3748")),f=i._(t("7cf1dc46"));},e6806ec7:function(e,a,t){"use strict";t.d(a,"__esModule",{value:!0}),t.d(a,"default",{enumerable:!0,get:function(){return u;}});var n=t("a2e753d8");t("00a0c788");var i=t("df67f0d6");let r=`
  ~~~vis-chart
  {
    "type": "pin-map",
    "data": [
      {
        "longitude": 120.210792,
        "latitude": 30.246026,
        "label": "\u{676D}\u{5DDE}"
      },
      {
        "longitude": 121.473667,
        "latitude": 31.230525,
        "label": "\u{4E0A}\u{6D77}"
      },
      {
        "longitude": 120.585294,
        "latitude": 31.299758,
        "label": "\u{82CF}\u{5DDE}"
      },
      {
        "longitude": 118.796624,
        "latitude": 32.059344,
        "label": "\u{5357}\u{4EAC}"
      }
    ]
  }
~~~`;var u=()=>(0,n.jsx)(i.ConfigProvider,{map:{style:"dark",token:"\u4F60\u7684\u5730\u56FEtoken"},components:{PinMap:{markerStyle:{iconPath:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oxcETa4MKgwAAAAAAAAAAAAADmJ7AQ/original"}}},children:(0,n.jsx)(i.GPTVis,{children:r})});}}]);
//# sourceMappingURL=3ca0749a-async.a2e0340c.js.map