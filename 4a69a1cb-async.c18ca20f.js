(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["4a69a1cb"],{"5a9ccd12":function(n,e,a){"use strict";a.d(e,"__esModule",{value:!0}),a.d(e,"default",{enumerable:!0,get:function(){return t;}}),a("83b16f1a");var t='import { Bubble, type BubbleProps } from \'@ant-design/x\';\nimport { ChartType, FishboneDiagram, GPTVisLite, withChartCode } from \'@antv/gpt-vis\';\nimport React from \'react\';\n\nconst markdownContent = `\n\u5F53\u7136\u4E86\uFF0C\u4EE5\u4E0B\u662F\u4E3A\u4F60\u7ED8\u5236\u7684\u4E00\u4E2A\u9C7C\u9AA8\u56FE\n\n\\`\\`\\`vis-chart\n{\n  "type": "fishbone-diagram",\n  "data": {\n    "name": "\u751F\u4EA7\u6548\u7387\u4F4E",\n    "children": [\n      {\n        "name": "\u8BBE\u5907\u95EE\u9898",\n        "children": [{ "name": "\u8BBE\u5907\u8001\u5316" }, { "name": "\u7EF4\u62A4\u4E0D\u53CA\u65F6" }]\n      },\n      {\n        "name": "\u5458\u5DE5\u95EE\u9898",\n        "children": [{ "name": "\u6280\u80FD\u4E0D\u8DB3" }, { "name": "\u5DE5\u4F5C\u6001\u5EA6\u5DEE" }]\n      },\n      {\n        "name": "\u6D41\u7A0B\u95EE\u9898",\n        "children": [{ "name": "\u6D41\u7A0B\u7E41\u7410" }, { "name": "\u7F3A\u4E4F\u6807\u51C6\u5316" }]\n      }\n    ]\n  }\n}\n\\`\\`\\`\n`;\n\nconst bgStyle = {\n  display: \'grid\',\n  gridGap: \'20px 0\',\n  background: \'#f7f7f7\',\n  padding: 20,\n  borderRadius: 8,\n};\n\nconst CodeComponent = withChartCode({\n  components: { [ChartType.FishboneDiagram]: FishboneDiagram },\n});\n\nconst RenderMarkdown: BubbleProps[\'messageRender\'] = (content) => (\n  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>\n);\n\nexport default () => (\n  <div style={bgStyle}>\n    <Bubble\n      placement="end"\n      content=\'\u7528\u9C7C\u9AA8\u56FE\u6765\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E {"problem":"\u751F\u4EA7\u6548\u7387\u4F4E","bones":[{"category":"\u8BBE\u5907\u95EE\u9898","factors":["\u8BBE\u5907\u8001\u5316","\u7EF4\u62A4\u4E0D\u53CA\u65F6"]},{"category":"\u5458\u5DE5\u95EE\u9898","factors":["\u6280\u80FD\u4E0D\u8DB3","\u5DE5\u4F5C\u6001\u5EA6\u5DEE"]},{"category":"\u6D41\u7A0B\u95EE\u9898","factors":["\u6D41\u7A0B\u7E41\u7410","\u7F3A\u4E4F\u6807\u51C6\u5316"]}]}\'\n      avatar={{\n        src: \'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp\',\n      }}\n      styles={{ content: { background: \'#ebebeb\' } }}\n    />\n    <Bubble\n      content={markdownContent}\n      messageRender={RenderMarkdown}\n      avatar={{\n        src: \'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original\',\n      }}\n      variant="shadow"\n      styles={{ content: { background: \'#fff\' } }}\n    />\n  </div>\n);\n';},"67be58a8":function(n,e,a){"use strict";a.d(e,"__esModule",{value:!0}),a.d(e,"texts",{enumerable:!0,get:function(){return t;}}),a("efc54e21");let t=[{value:"\u9C7C\u9AA8\u56FE\uFF0C\u662F\u4E00\u79CD\u4EE5\u6838\u5FC3\u95EE\u9898\u4E3A\u9C7C\u5934\uFF0C\u901A\u8FC7\u9C7C\u9AA8\u5206\u652F\u7684\u5F62\u5F0F\u5206\u6790\u548C\u5C55\u793A\u95EE\u9898\u539F\u56E0\u6216\u7ED3\u679C\u7684\u56FE\u8868\u3002",paraId:0,tocIndex:0},{value:'{\n  "type": "fishbone-diagram",\n  "data": {\n    "name": "problem",\n    "children": [\n      {\n        "name": "bone 1",\n        "children": [{ "name": "factor 1-1" }, { "name": "factor 1-2" }]\n      },\n      {\n        "name": "bone 2",\n        "children": [{ "name": "factor 2-1" }, { "name": "factor 2-2" }]\n      }\n    ]\n  }\n}\n',paraId:1,tocIndex:4},{value:"\u5C5E\u6027",paraId:2,tocIndex:6},{value:"\u7C7B\u578B",paraId:2,tocIndex:6},{value:"\u662F\u5426\u5FC5\u4F20",paraId:2,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:6},{value:"\u8BF4\u660E",paraId:2,tocIndex:6},{value:"data",paraId:2,tocIndex:6},{value:"FishboneData",paraId:2,tocIndex:6},{value:"\u662F",paraId:2,tocIndex:6},{value:"-",paraId:2,tocIndex:6},{value:"\u6570\u636E",paraId:2,tocIndex:6},{value:"\u5C5E\u6027",paraId:3,tocIndex:7},{value:"\u7C7B\u578B",paraId:3,tocIndex:7},{value:"\u662F\u5426\u5FC5\u4F20",paraId:3,tocIndex:7},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:7},{value:"\u8BF4\u660E",paraId:3,tocIndex:7},{value:"name",paraId:3,tocIndex:7},{value:"string",paraId:3,tocIndex:7},{value:"\u662F",paraId:3,tocIndex:7},{value:"-",paraId:3,tocIndex:7},{value:"\u8282\u70B9\u7684\u540D\u79F0\uFF0C\u7528\u4E8E\u663E\u793A\u5728\u601D\u7EF4\u5BFC\u56FE\u7684\u8282\u70B9\u4E0A",paraId:3,tocIndex:7},{value:"children",paraId:3,tocIndex:7},{value:"FishboneData[]",paraId:3,tocIndex:7},{value:"\u5426",paraId:3,tocIndex:7},{value:"-",paraId:3,tocIndex:7},{value:"\u5F53\u524D\u8282\u70B9\u7684\u5B50\u8282\u70B9\u96C6\u5408\u3002\u5982\u679C\u5F53\u524D\u8282\u70B9\u6CA1\u6709\u5B50\u8282\u70B9\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u7701\u7565\u3002\u6BCF\u4E2A\u5B50\u8282\u70B9\u672C\u8EAB\u4E5F\u662F\u4E00\u4E2A ",paraId:3,tocIndex:7},{value:"FishboneData",paraId:3,tocIndex:7},{value:" \u5BF9\u8C61\uFF0C\u8FD9\u610F\u5473\u7740\u5B83\u53EF\u4EE5\u5305\u542B\u81EA\u5DF1\u7684\u5B50\u8282\u70B9\uFF0C\u4ECE\u800C\u9012\u5F52\u5730\u6784\u5EFA\u51FA\u4E00\u4E2A\u591A\u5C42\u6B21\u7684\u6811\u72B6\u7ED3\u6784",paraId:3,tocIndex:7}];},"8e82210d":function(n,e,a){"use strict";a.d(e,"__esModule",{value:!0}),a.d(e,"default",{enumerable:!0,get:function(){return t;}}),a("8649da6d");var t="import { FishboneDiagram } from '@antv/gpt-vis';\nimport React from 'react';\n\nconst data = {\n  name: '\u4EA7\u54C1\u76C8\u5229\u672A\u8FBE\u5230\u9884\u671F\u76EE\u6807',\n  children: [\n    {\n      name: '\u95EE\u9898\u63CF\u8FF0\u4E0E\u5206\u6790',\n      children: [\n        { name: '\u54C1\u724C\u9500\u91CF\u5206\u6790' },\n        { name: '\u5E02\u573A\u5BB9\u91CF\u8BC4\u4F30' },\n        { name: '\u54C1\u724C\u7684\u5E02\u573A\u4EFD\u989D\u5206\u6790' },\n        { name: '\u603B\u8D21\u732E\u6BDB\u5229\u8BA1\u7B97' },\n      ],\n    },\n    {\n      name: '\u54C1\u724C\u5B9A\u4F4D\u7B56\u7565',\n      children: [\n        { name: '\u5916\u5305\u88C5\u8BBE\u8BA1' },\n        { name: '\u54C1\u724C\u540D\u79F0\u9009\u62E9' },\n        { name: '\u9500\u552E\u4EF7\u683C\u5B9A\u4F4D' },\n        { name: '\u4EA7\u54C1\u89C4\u683C\u5B9A\u4E49' },\n      ],\n    },\n    {\n      name: '\u5206\u9500\u6E20\u9053\u7BA1\u7406',\n      children: [\n        { name: '\u5730\u533A\u5206\u5E03' },\n        { name: '\u6E20\u9053\u9009\u62E9' },\n        { name: '\u5BA2\u6237\u7C7B\u578B\u5206\u7C7B' },\n        { name: '\u9500\u552E\u4EBA\u5458\u8986\u76D6\u8303\u56F4' },\n      ],\n    },\n    {\n      name: '\u5E02\u573A\u77E5\u540D\u5EA6\u63D0\u5347',\n      children: [\n        { name: '\u5730\u533A\u6743\u91CD\u5206\u6790' },\n        { name: '\u5A92\u4F53\u7EC4\u5408\u7B56\u7565' },\n        { name: '\u5E7F\u544A\u6295\u5165\u9884\u7B97' },\n        { name: '\u54C1\u8D28\u610F\u8BC6\u63D0\u5347' },\n      ],\n    },\n    {\n      name: '\u8BD5\u8D2D\u4E70\u7B56\u7565',\n      children: [\n        { name: '\u73B0\u573A\u5C55\u793A\u6548\u679C' },\n        { name: '\u4FC3\u9500\u5F62\u5F0F\u8BBE\u8BA1' },\n        { name: '\u4FC3\u9500\u65F6\u673A\u9009\u62E9' },\n        { name: '\u4F9B\u8D27\u4FDD\u8BC1\u63AA\u65BD' },\n      ],\n    },\n    {\n      name: '\u91CD\u590D\u8D2D\u4E70\u7B56\u7565',\n      children: [\n        { name: '\u6D88\u8D39\u8005\u6863\u6848\u7BA1\u7406' },\n        { name: '\u4F7F\u7528\u573A\u5408\u5206\u6790' },\n        { name: '\u4F7F\u7528\u6B21\u6570\u7EDF\u8BA1' },\n        { name: '\u4EA7\u54C1\u539F\u56E0\u9000\u8D27\u5904\u7406' },\n      ],\n    },\n  ],\n};\n\nexport default () => <FishboneDiagram data={data} />;\n";},"91048bb3":function(n,e,a){"use strict";a.d(e,"__esModule",{value:!0}),a.e(e,{Attachments:function(){return r.default;},Bubble:function(){return u.default;},Conversations:function(){return c.default;},Prompts:function(){return i.default;},Sender:function(){return o.default;},Suggestion:function(){return l.default;},ThoughtChain:function(){return s.default;},Welcome:function(){return f.default;},XProvider:function(){return m.default;},XRequest:function(){return h.default;},XStream:function(){return p.default;},useXAgent:function(){return b.default;},useXChat:function(){return v.default;},version:function(){return d.default;}});var t=a("777fffbe"),d=t._(a("09a0409f")),r=t._(a("00a39875")),o=t._(a("71b2e10d")),u=t._(a("4d961e28")),c=t._(a("0a4ee772")),i=t._(a("2fffe306")),s=t._(a("5058819b")),l=t._(a("18ac0177")),f=t._(a("7b7cedcd")),m=t._(a("99e41b18")),v=t._(a("2744a42c")),b=t._(a("47962456")),p=t._(a("25a1fb31")),h=t._(a("2fb176a4"));},c583ebcb:function(n,e,a){"use strict";var t=a("852bbaa9")._;a.d(e,"__esModule",{value:!0}),a.d(e,"demos",{enumerable:!0,get:function(){return c;}});var d=a("852bbaa9"),r=d._(a("9d065c04"));a("efc54e21");var o=d._(a("df67f0d6")),u=d._(a("91048bb3"));let c={"fishbonediagram-demo-common":{component:r.default.memo(r.default.lazy(()=>Promise.all([a.ensure("vendors_3"),a.ensure("common"),a.ensure("vendors_0"),a.ensure("vendors_1"),a.ensure("vendors_2"),a.ensure("27c597df")]).then(a.dr(t,a.bind(a,"f110f2c3"))))),asset:{type:"BLOCK",id:"fishbonediagram-demo-common",refAtomIds:["FishboneDiagram"],dependencies:{"index.tsx":{type:"FILE",value:a("8e82210d").default},"@antv/gpt-vis":{type:"NPM",value:"0.4.2"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@antv/gpt-vis":o,react:r},renderOpts:{compile:async(...n)=>(await Promise.all([a.ensure("vendors_0"),a.ensure("vendors_1"),a.ensure("d030c320")]).then(a.dr(t,a.bind(a,"d030c320")))).default(...n)}},"fishbonediagram-demo-markdown":{component:r.default.memo(r.default.lazy(()=>Promise.all([a.ensure("vendors_3"),a.ensure("common"),a.ensure("vendors_0"),a.ensure("vendors_1"),a.ensure("vendors_2"),a.ensure("27c597df")]).then(a.dr(t,a.bind(a,"671c5363"))))),asset:{type:"BLOCK",id:"fishbonediagram-demo-markdown",refAtomIds:["FishboneDiagram"],dependencies:{"index.tsx":{type:"FILE",value:a("5a9ccd12").default},"@ant-design/x":{type:"NPM",value:"1.0.4"},"@antv/gpt-vis":{type:"NPM",value:"0.4.2"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@ant-design/x":u,"@antv/gpt-vis":o,react:r},renderOpts:{compile:async(...n)=>(await Promise.all([a.ensure("vendors_0"),a.ensure("vendors_1"),a.ensure("d030c320")]).then(a.dr(t,a.bind(a,"d030c320")))).default(...n)}}};},df67f0d6:function(n,e,a){"use strict";a.d(e,"__esModule",{value:!0}),a.e(e,{ConfigProvider:function(){return u.default;},GPTVis:function(){return c.default;},GPTVisLite:function(){return i.default;},useEventPublish:function(){return i.useEventPublish;},version:function(){return s.default;},withChartCode:function(){return o.withChartCode;},withDefaultChartCode:function(){return o.withDefaultChartCode;}});var t=a("d1751d7c"),d=a("777fffbe"),r=a("852bbaa9");t._(a("5639510f"),e),t._(a("d382b880"),e);var o=a("a574afdb"),u=d._(a("a7265236")),c=d._(a("2c69d5f6")),i=r._(a("033b3748")),s=d._(a("7cf1dc46"));},e7bada6d:function(n,e,a){"use strict";a.d(e,"__esModule",{value:!0}),a.d(e,"Source",{enumerable:!0,get:function(){return d.default;}});var t=a("d1751d7c"),d=a("777fffbe")._(a("b00709ad"));t._(a("5e2dda25"),e),t._(a("969efd31"),e),t._(a("f21af0e0"),e),t._(a("33eda958"),e),t._(a("112b9a67"),e),t._(a("a45613fd"),e),t._(a("432777ba"),e);}}]);
//# sourceMappingURL=4a69a1cb-async.c18ca20f.js.map