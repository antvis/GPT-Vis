(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["dda9d791"],{"6f4b20d1":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{Attachments:function(){return d.default;},Bubble:function(){return i.default;},Conversations:function(){return s.default;},Prompts:function(){return f.default;},Sender:function(){return r.default;},Suggestion:function(){return c.default;},ThoughtChain:function(){return o.default;},Welcome:function(){return l.default;},XProvider:function(){return A.default;},XRequest:function(){return p.default;},XStream:function(){return h.default;},useXAgent:function(){return _.default;},useXChat:function(){return b.default;},version:function(){return u.default;}});var n=a("777fffbe"),u=n._(a("cea7a711")),d=n._(a("86e758f8")),r=n._(a("21ce146d")),i=n._(a("243206a0")),s=n._(a("c0871562")),f=n._(a("70c8ecc2")),o=n._(a("b2332147")),c=n._(a("a6701d1e")),l=n._(a("d7c71a38")),A=n._(a("c34ae465")),b=n._(a("e5e3fe21")),_=n._(a("34370490")),h=n._(a("0f4ecb35")),p=n._(a("119b7956"));},b26e07f5:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return o;}});var n=a("a2e753d8");a("a165890a");var u=a("6f4b20d1"),d=a("df67f0d6");let r=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{591A}\u{8F74}\u{56FE}

\`\`\`vis-chart
{
	"type": "dual-axes",
	"categories": [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	"series": [
    {
			"type": "column",
			"data": [
				26,
				59,
				90,
				264,
				287,
				707,
				1756,
				1822,
				487,
				188,
				60,
				23
			],
      "axisYTitle": "\u{603B}\u{4F53}\u{589E}\u{957F}\u{91CF}"
		},
    {
			"type": "line",
			"data": [
				2.6,
				5.9,
				9,
				26.4,
				28.7,
				70.7,
				175.6,
				182.2,
				48.7,
				18.8,
				6,
				2.3
			],
      "axisYTitle": "A\u{589E}\u{957F}\u{7387}"
		},
		{
			"type": "line",
			"data": [
				2,
				2.2,
				3.3,
				4.5,
				6.3,
				10.2,
				20.3,
				23.4,
				23,
				16.5,
				12,
				6.2
			],
      "axisYTitle": "B\u{589E}\u{957F}\u{7387}"
		}
	]
}
\`\`\`
`,i={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},s=(0,d.withChartCode)({components:{[d.ChartType.DualAxes]:d.DualAxes},style:{width:350}}),f=e=>(0,n.jsx)(d.GPTVisLite,{components:{code:s},children:e});var o=()=>(0,n.jsxs)("div",{style:i,children:[(0,n.jsx)(u.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,n.jsx)(u.Bubble,{content:r,messageRender:f,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},cc7462f0:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return r;}});var n=a("a2e753d8");a("19cf2f23");var u=a("df67f0d6");let d={categories:["2020-08-20","2020-08-21","2020-08-22","2020-08-23","2020-08-24","2020-08-25","2020-08-26","2020-08-27","2020-08-28","2020-08-29","2020-08-30","2020-08-31","2020-09-01","2020-09-02","2020-09-03","2020-09-04","2020-09-05","2020-09-06","2020-09-07","2020-09-08","2020-09-09","2020-09-10","2020-09-11","2020-09-12","2020-09-13","2020-09-14","2020-09-15","2020-09-16","2020-09-17","2020-09-18"],series:[{type:"column",data:[10868,8786,10824,7860,13253,17015,19298,13937,11541,15244,14247,9402,10440,9345,18459,9763,11074,11770,12206,11434,16218,11914,16781,10555,10899,10713,0,0,20357,10424],axisYTitle:"\u6D88\u8017\u65F6\u95F4"},{type:"line",data:[649.483,1053.7,679.817,638.117,843.3,1092.983,1036.317,1031.9,803.467,830.733,709.867,665.233,696.367,692.867,936.017,782.867,653.8,856.683,777.15,773.283,833.3,793.517,894.45,725.55,709.967,787.6,644.183,1066.65,932.45,753.583],axisYTitle:"\u5B8C\u6210\u65F6\u95F4"}]};var r=()=>(0,n.jsx)(u.DualAxes,{...d});},df67f0d6:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{ConfigProvider:function(){return r.default;},GPTVis:function(){return i.default;},GPTVisLite:function(){return s.default;},version:function(){return f.default;},withChartCode:function(){return d.withChartCode;},withDefaultChartCode:function(){return d.withDefaultChartCode;}});var n=a("d1751d7c"),u=a("777fffbe");n._(a("5639510f"),t),n._(a("d382b880"),t);var d=a("a574afdb"),r=u._(a("a7265236")),i=u._(a("2c69d5f6")),s=u._(a("033b3748")),f=u._(a("7cf1dc46"));},e7bada6d:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"Source",{enumerable:!0,get:function(){return u.default;}});var n=a("d1751d7c"),u=a("777fffbe")._(a("b00709ad"));n._(a("5e2dda25"),t),n._(a("969efd31"),t),n._(a("f21af0e0"),t),n._(a("33eda958"),t),n._(a("112b9a67"),t),n._(a("a45613fd"),t),n._(a("432777ba"),t);},ec063eeb:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return o;}});var n=a("a2e753d8");a("b2344bf5");var u=a("6f4b20d1"),d=a("df67f0d6");let r=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{53CC}\u{8F74}\u{56FE}

\`\`\`vis-chart
{
  "type": "dual-axes",
  "categories": ["2020", "2021", "2022"],
  "series": [
    {
      "type": "column",
      "data": [500, 600, 700],
      "axisYTitle": "amount"
    },
    {
      "type": "line",
      "data": [10, 12, 15],
      "axisYTitle": "rate"
    }
  ]
}
\`\`\`
`,i={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8},s=(0,d.withChartCode)({components:{[d.ChartType.DualAxes]:d.DualAxes},style:{width:350}}),f=e=>(0,n.jsx)(d.GPTVisLite,{components:{code:s},children:e});var o=()=>(0,n.jsxs)("div",{style:i,children:[(0,n.jsx)(u.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,n.jsx)(u.Bubble,{content:r,messageRender:f,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});}}]);
//# sourceMappingURL=dda9d791-async.e86c5eb7.js.map