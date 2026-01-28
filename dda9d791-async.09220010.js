(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["dda9d791"],{"36d8a4f8":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{Actions:function(){return u.default;},Attachments:function(){return i.default;},Bubble:function(){return f.default;},Conversations:function(){return d.default;},Prompts:function(){return o.default;},Sender:function(){return l.default;},Suggestion:function(){return c.default;},ThoughtChain:function(){return s.default;},Welcome:function(){return b.default;},XProvider:function(){return A.default;},XRequest:function(){return g.default;},XStream:function(){return p.default;},useXAgent:function(){return h.default;},useXChat:function(){return m.default;},version:function(){return r.default;}});var n=a("777fffbe"),r=n._(a("f5f0d9bb")),u=n._(a("faa71e2d")),i=n._(a("4b30c990")),l=n._(a("7b31f050")),f=n._(a("6250cf6d")),d=n._(a("1fccaf05")),o=n._(a("453b775e")),s=n._(a("752de3f1")),c=n._(a("21c831ca")),b=n._(a("93d32012")),A=n._(a("d52145fb")),m=n._(a("89babbae")),h=n._(a("81745cc0")),p=n._(a("b59532a4")),g=n._(a("99124e3b"));},"7dca4d14":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"Source",{enumerable:!0,get:function(){return r.default;}});var n=a("d1751d7c"),r=a("777fffbe")._(a("e5365288"));n._(a("1ad5815b"),t),n._(a("7f6e4cdf"),t),n._(a("450e3722"),t),n._(a("711e7b38"),t),n._(a("9f3735c7"),t),n._(a("75cceb9a"),t),n._(a("d17b15fe"),t);},b26e07f5:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return o;}});var n=a("a2e753d8");a("a165890a");var r=a("36d8a4f8"),u=a("df67f0d6");let i=`
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
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},f=(0,u.withChartCode)({components:{[u.ChartType.DualAxes]:u.DualAxes},style:{width:350}}),d=e=>(0,n.jsx)(u.GPTVisLite,{components:{code:f},children:e});var o=()=>(0,n.jsxs)("div",{style:l,children:[(0,n.jsx)(r.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,n.jsx)(r.Bubble,{content:i,messageRender:d,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});},cc7462f0:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{PALETTE_1:function(){return d;},PALETTE_2:function(){return o;},PALETTE_3:function(){return s;},default:function(){return c;}});var n=a("a2e753d8");a("19cf2f23");var r=a("df67f0d6"),u=a("5c709dd2"),i=a("9d065c04");let l={categories:["2020-08-20","2020-08-21","2020-08-22","2020-08-23","2020-08-24","2020-08-25","2020-08-26","2020-08-27","2020-08-28","2020-08-29","2020-08-30","2020-08-31","2020-09-01","2020-09-02","2020-09-03","2020-09-04","2020-09-05","2020-09-06","2020-09-07","2020-09-08","2020-09-09","2020-09-10","2020-09-11","2020-09-12","2020-09-13","2020-09-14","2020-09-15","2020-09-16","2020-09-17","2020-09-18"],series:[{type:"column",data:[10868,8786,10824,7860,13253,17015,19298,13937,11541,15244,14247,9402,10440,9345,18459,9763,11074,11770,12206,11434,16218,11914,16781,10555,10899,10713,0,0,20357,10424],axisYTitle:"\u6D88\u8017\u65F6\u95F4"},{type:"line",data:[649.483,1053.7,679.817,638.117,843.3,1092.983,1036.317,1031.9,803.467,830.733,709.867,665.233,696.367,692.867,936.017,782.867,653.8,856.683,777.15,773.283,833.3,793.517,894.45,725.55,709.967,787.6,644.183,1066.65,932.45,753.583],axisYTitle:"\u5B8C\u6210\u65F6\u95F4"}]},f=["default","academy","dark"],d=["#8459fc","#ff89bd","#1677ff","#00c2ff","#ff9a00"],o=["#1B9E77","#D95F02","#7570B3","#E7298A","#66A61E"],s=["#7593ed","#95e3b0","#6c7893","#e7c450","#7460eb"];var c=()=>{let[e,t]=(0,i.useState)("default"),[a,c]=(0,i.useState)(""),[b,A]=(0,i.useState)([]);return(0,n.jsxs)("div",{children:[(0,n.jsxs)(u.Form,{layout:"inline",style:{marginBottom:12},initialValues:{theme:e,backgroundColor:a,palette:b},onValuesChange:e=>{if(e.theme&&(t(e.theme),A([])),void 0!==e.backgroundColor&&c(e.backgroundColor),void 0!==e.palette){let t=e.palette;if("string"==typeof t)try{t=JSON.parse(t);}catch{t=[];}A(Array.isArray(t)?t:[]);}else A([]);},children:[(0,n.jsx)(u.Form.Item,{label:"Theme",name:"theme",style:{marginBottom:6},children:(0,n.jsx)(u.Select,{style:{width:120},options:f.map(e=>({label:e,value:e}))})}),(0,n.jsx)(u.Form.Item,{label:"Background",name:"backgroundColor",rules:[{pattern:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,message:"\u8BF7\u8F93\u5165\u6709\u6548\u7684\u8272\u503C\u7F16\u7801\uFF0C\u4F8B\u5982 #fff \u6216 #ffffff"}],style:{marginBottom:6},children:(0,n.jsx)(u.Input,{placeholder:"#ffffff",style:{width:120}})}),(0,n.jsx)(u.Form.Item,{label:"Palette",name:"palette",style:{marginBottom:6},children:(0,n.jsx)(u.Select,{placeholder:"\u9009\u62E9\u8C03\u8272\u677F",style:{width:200},options:[{label:`\u{8272}\u{677F}1: ${d.join(", ")}`,value:JSON.stringify(d)},{label:`\u{8272}\u{677F}2: ${o.join(", ")}`,value:JSON.stringify(o)},{label:`\u{8272}\u{677F}3: ${s.join(", ")}`,value:JSON.stringify(s)}],allowClear:!0})})]},e),(0,n.jsx)(r.DualAxes,{...l,theme:e,style:{backgroundColor:a,palette:b}})]});};},df67f0d6:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{ConfigProvider:function(){return l.default;},GPTVis:function(){return f.default;},GPTVisLite:function(){return d.default;},useEventPublish:function(){return d.useEventPublish;},version:function(){return o.default;},withChartCode:function(){return i.withChartCode;},withDefaultChartCode:function(){return i.withDefaultChartCode;}});var n=a("d1751d7c"),r=a("777fffbe"),u=a("852bbaa9");n._(a("5639510f"),t),n._(a("d382b880"),t),n._(a("8e074ce8"),t);var i=a("a574afdb"),l=r._(a("a7265236")),f=r._(a("2c69d5f6")),d=u._(a("033b3748")),o=r._(a("7cf1dc46"));},ec063eeb:function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return o;}});var n=a("a2e753d8");a("b2344bf5");var r=a("36d8a4f8"),u=a("df67f0d6");let i=`
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
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},f=(0,u.withChartCode)({components:{[u.ChartType.DualAxes]:u.DualAxes},style:{width:350}}),d=e=>(0,n.jsx)(u.GPTVisLite,{components:{code:f},children:e});var o=()=>(0,n.jsxs)("div",{style:l,children:[(0,n.jsx)(r.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,n.jsx)(r.Bubble,{content:i,messageRender:d,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});}}]);
//# sourceMappingURL=dda9d791-async.09220010.js.map