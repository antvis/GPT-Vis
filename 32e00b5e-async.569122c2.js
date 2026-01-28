(("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]=("undefined"!=typeof globalThis?globalThis:self)["makoChunk_@antv/gpt-vis"]||[]).push([["32e00b5e"],{"0039c572":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return i;}});var a=t("a2e753d8");t("71e4927d");var r=t("df67f0d6");let o=`
\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "\u{7B2C}\u{4E00}\u{4EA7}\u{4E1A}", "value": 7200.0 },
    { "category": "\u{7B2C}\u{4E8C}\u{4EA7}\u{4E1A}", "value": 36600.0 },
    { "category": "\u{7B2C}\u{4E09}\u{4EA7}\u{4E1A}" ,"value": 41000.0 },
    { "category": "\u{7B2C}\u{56DB}\u{4EA7}\u{4E1A}" ,"value": 21000.0 },
    { "category": "\u{5176}\u{4ED6}\u{4EA7}\u{4E1A}" ,"value": 81000.0 }
  ]
}
\`\`\`
`,d=(0,r.withChartCode)({components:{[r.ChartType.Column]:r.Column},debug:!0});var i=()=>(0,a.jsx)(r.GPTVisLite,{components:{code:d},children:o});},"1feffc3e":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return m;}});var a=t("a2e753d8");t("b70d1ea4");var r=t("36d8a4f8"),o=t("df67f0d6"),d=t("9d065c04");let i=`
\u{5F53}\u{7136}\u{4E86}\u{FF0C}\u{4EE5}\u{4E0B}\u{662F}\u{4E3A}\u{4F60}\u{7ED8}\u{5236}\u{7684}\u{4E00}\u{4E2A}\u{67F1}\u{72B6}\u{56FE}

\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "\u{7B2C}\u{4E00}\u{4EA7}\u{4E1A}", "value": 7200.0 },
    { "category": "\u{7B2C}\u{4E8C}\u{4EA7}\u{4E1A}", "value": 36600.0 },
    { "category": "\u{7B2C}\u{4E09}\u{4EA7}\u{4E1A}" ,"value": 41000.0 }
  ]
}
\`\`\`
`,l={display:"grid",gridGap:"20px 0",background:"#f7f7f7",padding:20,borderRadius:8,overflow:"auto"},c=(0,o.withChartCode)({components:{[o.ChartType.Column]:o.Column},loadingTimeout:3e3}),s=e=>(0,a.jsx)(o.GPTVisLite,{components:{code:c},children:e}),u=()=>{let[e,n]=(0,d.useState)(""),t=(0,d.useRef)(""),a=(0,d.useRef)(null),r=()=>{a.current=setInterval(()=>{let r=parseInt((10*Math.random()).toString(),20),o=t.current+i.substring(t.current.length,t.current.length+r);t.current=o,n(o),e.length===i.length-1&&clearTimeout(a.current);},200);};return[e,()=>{a.current&&clearTimeout(a.current),a.current=null,t.current="",n(""),r();}];};var m=()=>{let[e,n]=u();return(0,d.useEffect)(()=>{n();},[]),(0,a.jsxs)("div",{style:l,children:[(0,a.jsx)("button",{onClick:n,type:"button",children:"\u91CD\u65B0\u6F14\u793A"}),(0,a.jsx)(r.Bubble,{placement:"end",content:"\u5E2E\u6211\u53EF\u89C6\u5316\u4E00\u4E0B\u6211\u7684\u6570\u636E",avatar:{src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp"},styles:{content:{background:"#ebebeb"}}}),(0,a.jsx)(r.Bubble,{content:e,messageRender:s,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}}),(0,a.jsx)(r.Bubble,{content:"\u751F\u6210\u8D85\u65F6\u7684\u6F14\u793A\n"+e.substring(0,e.length-10),messageRender:s,avatar:{src:"https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original"},variant:"shadow",styles:{content:{background:"#fff"}}})]});};},"2ae37173":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return x;}});var a=t("a2e753d8");t("f8773a3e");var r=t("df67f0d6");let o=`
#### \u{9ED8}\u{8BA4}\u{6570}\u{636E}\u{89E3}\u{6790}\u{9519}\u{8BEF}\u{6E32}\u{67D3}
\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "\u{7B2C}\u{4E00}\u{4EA7}\u{4E1A}", "value": 7200.0 }
  // JSON \u{89E3}\u{6790}\u{9519}\u{8BEF}\u{793A}\u{4F8B}
\`\`\`
`,d=`
#### \u{81EA}\u{5B9A}\u{4E49} JSON\u{89E3}\u{6790}\u{9519}\u{8BEF} \u{6E32}\u{67D3}\u{793A}\u{4F8B}\u{4E00}
\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "\u{7B2C}\u{4E00}\u{4EA7}\u{4E1A}", "value": 7200.0 }
  // JSON \u{89E3}\u{6790}\u{9519}\u{8BEF}\u{793A}\u{4F8B}
\`\`\`
`,i=`
#### \u{81EA}\u{5B9A}\u{4E49} JSON\u{89E3}\u{6790}\u{9519}\u{8BEF} \u{6E32}\u{67D3}\u{793A}\u{4F8B}\u{4E8C}
\`\`\`vis-chart
{
  "type": "unsupported-chart",
  "data": [{ "category": "\u{6D4B}\u{8BD5}", "value": 100 }]
}
\`\`\`
`,l=`
#### \u{56FE}\u{8868}\u{6E32}\u{67D3}\u{9519}\u{8BEF}\u{629B}\u{9519}
\`\`\`vis-chart
{
  "type": "mind-map",
  "data": {
    "name": "Transformer \u{6A21}\u{578B}",
    "children": [
      {
        "name": "\u{6982}\u{8FF0}",
        "children": [
          {
            "name": "\u{5B9A}\u{4E49}\u{4E0E}\u{80CC}\u{666F}",
            "children": [
              {
                "name": "2017\u{5E74} Vaswani \u{7B49}\u{4EBA}\u{63D0}\u{51FA}"
              },
              {
                "name": "\u{81EA}\u{7136}\u{8BED}\u{8A00}\u{5904}\u{7406}\u{4EFB}\u{52A1}"
              }
            ]
          },
          {
            "name": "\u{4E3B}\u{8981}\u{7279}\u{70B9}",
            "children": [
              {
                "name": "\u{65E0}\u{9700}\u{5FAA}\u{73AF}\u{7ED3}\u{6784}"
              },
              {
                "name": "\u{4F9D}\u{8D56}\u{81EA}\u{6CE8}\u{610F}\u{529B}\u{673A}\u{5236}"
              },
              {
                "name": "\u{53EF}\u{5E76}\u{884C}\u{5904}\u{7406}"
              }
            ]
          },
          {
            "name": "\u{5E94}\u{7528}\u{9886}\u{57DF}",
            "children": [
              {
                "name": "\u{673A}\u{5668}\u{7FFB}\u{8BD1}"
              },
              {
                "name": "\u{6587}\u{672C}\u{6458}\u{8981}"
              },
              {
                "name": "\u{95EE}\u{7B54}\u{7CFB}\u{7EDF}"
              },
              {
                "name": "\u{8BED}\u{97F3}\u{5904}\u{7406}"
              }
            ]
          }
        ]
      },
      {
        "name": "\u{6838}\u{5FC3}\u{7EC4}\u{4EF6}",
        "children": [
          {
            "name": "\u{81EA}\u{6CE8}\u{610F}\u{529B}\u{673A}\u{5236}",
            "children": [
              {
                "name": "\u{673A}\u{5236}\u{539F}\u{7406}",
                "children": [
                  {
                    "name": "\u{6BCF}\u{4E2A}\u{8BCD}\u{5173}\u{6CE8}\u{5176}\u{4ED6}\u{8BCD}"
                  },
                  {
                    "name": "\u{8BA1}\u{7B97}\u{6CE8}\u{610F}\u{529B}\u{6743}\u{91CD}"
                  }
                ]
              },
              {
                "name": "\u{4F18}\u{70B9}",
                "children": [
                  {
                    "name": "\u{6355}\u{6349}\u{957F}\u{8DDD}\u{79BB}\u{4F9D}\u{8D56}"
                  },
                  {
                    "name": "\u{53EF}\u{5E76}\u{884C}\u{8BA1}\u{7B97}"
                  }
                ]
              }
            ]
          },
          {
            "name": "\u{591A}\u{5934}\u{81EA}\u{6CE8}\u{610F}\u{529B}",
            "children": [
              {
                "name": "\u{591A}\u{4E2A}\u{6CE8}\u{610F}\u{529B}\u{5934}\u{5E76}\u{884C}\u{8BA1}\u{7B97}"
              },
              {
                "name": "\u{62FC}\u{63A5}\u{4E0E}\u{7EBF}\u{6027}\u{53D8}\u{6362}"
              }
            ]
          },
          {
            "name": "\u{4F4D}\u{7F6E}\u{7F16}\u{7801}",
            "children": [
              {
                "name": "\u{4F5C}\u{7528}",
                "children": [
                  {
                    "name": "\u{63D0}\u{4F9B}\u{5E8F}\u{5217}\u{987A}\u{5E8F}\u{4FE1}\u{606F}"
                  }
                ]
              },
              {
                "name": "\u{5B9E}\u{73B0}\u{65B9}\u{5F0F}",
                "children": [
                  {
                    "name": "\u{6B63}\u{5F26}/\u{4F59}\u{5F26}\u{51FD}\u{6570}"
                  },
                  {
                    "name": "\u{53EF}\u{5B66}\u{4E60}\u{7684}\u{5D4C}\u{5165}"
                  }
                ]
              }
            ]
          },
          {
            "name": "\u{524D}\u{9988}\u{7F51}\u{7EDC}",
            "children": [
              {
                "name": "\u{4E24}\u{5C42}\u{5168}\u{8FDE}\u{63A5}\u{7F51}\u{7EDC}"
              },
              {
                "name": "\u{6BCF}\u{4E2A}\u{4F4D}\u{7F6E}\u{72EC}\u{7ACB}\u{5904}\u{7406}"
              }
            ]
          },
          {
            "name": "\u{6B8B}\u{5DEE}\u{8FDE}\u{63A5}\u{4E0E}\u{5C42}\u{5F52}\u{4E00}\u{5316}",
            "children": [
              {
                "name": "\u{7F13}\u{89E3}\u{68AF}\u{5EA6}\u{6D88}\u{5931}"
              },
              {
                "name": "\u{52A0}\u{901F}\u{8BAD}\u{7EC3}"
              }
            ]
          }
        ]
      },
      {
        "name": "\u{67B6}\u{6784}",
        "children": [
          {
            "name": "\u{7F16}\u{7801}\u{5668}",
            "children": [
              {
                "name": "\u{591A}\u{5C42}\u{7ED3}\u{6784}"
              },
              {
                "name": "\u{6BCF}\u{5C42}\u{7EC4}\u{6210}",
                "children": [
                  {
                    "name": "\u{81EA}\u{6CE8}\u{610F}\u{529B}"
                  },
                  {
                    "name": "\u{524D}\u{9988}\u{7F51}\u{7EDC}"
                  }
                ]
              }
            ]
          },
          {
            "name": "\u{89E3}\u{7801}\u{5668}",
            "children": [
              {
                "name": "\u{591A}\u{5C42}\u{7ED3}\u{6784}"
              },
              {
                "name": "\u{6BCF}\u{5C42}\u{7EC4}\u{6210}",
                "children": [
                  {
                    "name": "\u{81EA}\u{6CE8}\u{610F}\u{529B}"
                  },
                  {
                    "name": "\u{7F16}\u{7801}\u{5668}-\u{89E3}\u{7801}\u{5668}\u{6CE8}\u{610F}\u{529B}"
                  },
                  {
                    "name": "\u{524D}\u{9988}\u{7F51}\u{7EDC}"
                  }
                ]
              }
            ]
          },
          {
            "name": "\u{8F93}\u{5165}\u{8F93}\u{51FA}\u{5D4C}\u{5165}",
            "children": [
              {
                "name": "\u{8BCD}\u{5411}\u{91CF}\u{8F6C}\u{6362}"
              },
              {
                "name": "\u{4E0E}\u{4F4D}\u{7F6E}\u{7F16}\u{7801}\u{7ED3}\u{5408}"
              }
            ]
          }
        ]
      },
      {
        "name": "\u{8BA1}\u{7B97}\u{590D}\u{6742}\u{5EA6}\u{4E0E}\u{4F18}\u{5316}",
        "children": [
          {
            "name": "\u{81EA}\u{6CE8}\u{610F}\u{529B}\u{590D}\u{6742}\u{5EA6}",
            "children": [
              {
                "name": "O(N\xb2)"
              }
            ]
          },
          {
            "name": "\u{6539}\u{8FDB}\u{65B9}\u{6848}",
            "children": [
              {
                "name": "Set Transformer - \u{8BF1}\u{5BFC}\u{70B9}\u{964D}\u{4F4E}\u{590D}\u{6742}\u{5EA6}"
              },
              {
                "name": "Reformer - \u{5C40}\u{90E8}\u{6CE8}\u{610F}\u{529B}\u{548C}\u{54C8}\u{5E0C}"
              },
              {
                "name": "Linformer - \u{964D}\u{4F4E}\u{6CE8}\u{610F}\u{529B}\u{77E9}\u{9635}\u{7EF4}\u{5EA6}"
              },
              {
                "name": "Longformer - \u{957F}\u{5E8F}\u{5217}\u{5C40}\u{90E8}/\u{5168}\u{5C40}\u{6CE8}\u{610F}\u{529B}"
              },
              {
                "name": "Charformer - \u{5B57}\u{7B26}\u{7EA7}\u{9AD8}\u{6548}\u{8868}\u{793A}"
              }
            ]
          }
        ]
      },
      {
        "name": "\u{5E94}\u{7528}\u{4E0E}\u{6269}\u{5C55}",
        "children": [
          {
            "name": "\u{81EA}\u{7136}\u{8BED}\u{8A00}\u{5904}\u{7406}",
            "children": [
              {
                "name": "BERT\u{3001}GPT \u{7B49}"
              }
            ]
          },
          {
            "name": "\u{8BA1}\u{7B97}\u{673A}\u{89C6}\u{89C9}",
            "children": [
              {
                "name": "Vision Transformer (ViT)"
              }
            ]
          },
          {
            "name": "\u{8BED}\u{97F3}\u{5904}\u{7406}",
            "children": [
              {
                "name": "Transformer \u{8BED}\u{97F3}\u{8BC6}\u{522B}"
              }
            ]
          },
          {
            "name": "\u{5F3A}\u{5316}\u{5B66}\u{4E60}",
            "children": [
              {
                "name": "\u{72B6}\u{6001}\u{5173}\u{7CFB}\u{5EFA}\u{6A21}"
              }
            ]
          }
        ]
      },
      {
        "name": "\u{603B}\u{7ED3}",
        "children": [
          {
            "name": "\u{4F18}\u{52BF}",
            "children": [
              {
                "name": "\u{9AD8}\u{6548}\u{5E76}\u{884C}"
              },
              {
                "name": "\u{957F}\u{8DDD}\u{79BB}\u{4F9D}\u{8D56}\u{6355}\u{6349}"
              }
            ]
          },
          {
            "name": "\u{6311}\u{6218}",
            "children": [
              {
                "name": "\u{5927}\u{578B}\u{6A21}\u{578B}\u{8BA1}\u{7B97}\u{5F00}\u{9500}"
              },
              {
                "name": "\u{9700}\u{8981}\u{5927}\u{91CF}\u{8BAD}\u{7EC3}\u{6570}\u{636E}"
              }
            ]
          }
        ]
      }
    ]
  }
}
`,c=`
#### \u{9ED8}\u{8BA4}\u{56FE}\u{8868}\u{6E32}\u{67D3}\u{9519}\u{8BEF}
\`\`\`vis-chart
{
  "type": "flow-diagram",
  "data": {
    "nodes": [
      { "name": "\u{6B8B}\u{4F59}\u{673A}\u{5668}\u{6570}\u{6838}\u{67E5}" },
      { "name": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}" },
      { "name": "\u{5B9A}\u{65F6}\u{4EFB}\u{52A1}\u{5206}\u{6790}" },
      { "name": "\u{57DF}\u{540D}\u{6D41}\u{91CF}\u{68C0}\u{6D4B}" },
      { "name": "RPC\u{6D41}\u{91CF}\u{6EAF}\u{6E90}" },
      { "name": "\u{6D88}\u{606F}\u{961F}\u{5217}\u{68C0}\u{67E5}" }
    ],
    "edges": [
      { "source": "\u{6B8B}\u{4F59}\u{673A}\u{5668}\u{6570}\u{6838}\u{67E5}", "target": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "name": "\u{53D1}\u{73B0}5\u{53F0}\u{6B8B}\u{4F59}\u{673A}\u{5668}" },
      { "source": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "target": "RPC\u{6D41}\u{91CF}\u{6EAF}\u{6E90}", "name": "\u{8BC6}\u{522B}9154\u{6B21}/\u{5929}\u{670D}\u{52A1}\u{8C03}\u{7528}" },
      { "source": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "target": "\u{5B9A}\u{65F6}\u{4EFB}\u{52A1}\u{5206}\u{6790}", "name": "\u{5B9A}\u{65F6}\u{4EFB}\u{52A1}\u{96F6}\u{98CE}\u{9669}" },
      { "source": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "target": "\u{57DF}\u{540D}\u{6D41}\u{91CF}\u{68C0}\u{6D4B}", "name": "\u{65E0}PV\u{6D41}\u{91CF}" },
      { "source": "RPC\u{6D41}\u{91CF}\u{6EAF}\u{6E90}", "target": "mobilemock\u{5E94}\u{7528}\u{8FFD}\u{8E2A}", "name": "\u{4E0A}\u{6E38}\u{672A}\u{5B8C}\u{6210}\u{8FC1}\u{79FB}" }
    ]
  }
}
`,s=`
#### \u{81EA}\u{5B9A}\u{4E49}\u{56FE}\u{8868}\u{6E32}\u{67D3}\u{9519}\u{8BEF}
\`\`\`vis-chart
{
  "type": "flow-diagram",
  "data": {
    "nodes": [
      { "name": "\u{6B8B}\u{4F59}\u{673A}\u{5668}\u{6570}\u{6838}\u{67E5}" },
      { "name": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}" },
      { "name": "\u{5B9A}\u{65F6}\u{4EFB}\u{52A1}\u{5206}\u{6790}" },
      { "name": "\u{57DF}\u{540D}\u{6D41}\u{91CF}\u{68C0}\u{6D4B}" },
      { "name": "RPC\u{6D41}\u{91CF}\u{6EAF}\u{6E90}" },
      { "name": "\u{6D88}\u{606F}\u{961F}\u{5217}\u{68C0}\u{67E5}" }
    ],
    "edges": [
      { "source": "\u{6B8B}\u{4F59}\u{673A}\u{5668}\u{6570}\u{6838}\u{67E5}", "target": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "name": "\u{53D1}\u{73B0}5\u{53F0}\u{6B8B}\u{4F59}\u{673A}\u{5668}" },
      { "source": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "target": "RPC\u{6D41}\u{91CF}\u{6EAF}\u{6E90}", "name": "\u{8BC6}\u{522B}9154\u{6B21}/\u{5929}\u{670D}\u{52A1}\u{8C03}\u{7528}" },
      { "source": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "target": "\u{5B9A}\u{65F6}\u{4EFB}\u{52A1}\u{5206}\u{6790}", "name": "\u{5B9A}\u{65F6}\u{4EFB}\u{52A1}\u{96F6}\u{98CE}\u{9669}" },
      { "source": "\u{6D41}\u{91CF}\u{7C7B}\u{578B}\u{68C0}\u{6D4B}", "target": "\u{57DF}\u{540D}\u{6D41}\u{91CF}\u{68C0}\u{6D4B}", "name": "\u{65E0}PV\u{6D41}\u{91CF}" },
      { "source": "RPC\u{6D41}\u{91CF}\u{6EAF}\u{6E90}", "target": "mobilemock\u{5E94}\u{7528}\u{8FFD}\u{8E2A}", "name": "\u{4E0A}\u{6E38}\u{672A}\u{5B8C}\u{6210}\u{8FC1}\u{79FB}" }
    ]
  }
}
`,u=({errorInfo:e})=>{let{error:n,content:t}=e;return(0,a.jsxs)("div",{style:{border:"1px solid #e8e8e8",borderRadius:"12px",padding:"24px",margin:"8px 0",backgroundColor:"#fafafa",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},children:[(0,a.jsxs)("div",{style:{display:"flex",alignItems:"center",marginBottom:"16px",paddingBottom:"12px",borderBottom:"1px solid #e8e8e8"},children:[(0,a.jsx)("div",{style:{width:"32px",height:"32px",borderRadius:"50%",backgroundColor:"#ff7875",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"12px",color:"#fff",fontWeight:"bold"},children:"!"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h4",{style:{margin:"0",fontSize:"16px",color:"#262626"},children:"\u89E3\u6790\u9519\u8BEF"}),(0,a.jsx)("p",{style:{margin:"4px 0 0 0",fontSize:"12px",color:"#8c8c8c"},children:"\u81EA\u5B9A\u4E49\u9519\u8BEF\u6E32\u67D3 - \u5361\u7247\u5F0F\u8BBE\u8BA1"})]})]}),(0,a.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,a.jsx)("div",{style:{fontSize:"14px",color:"#595959",marginBottom:"8px"},children:(0,a.jsx)("strong",{children:"\u9519\u8BEF\u4FE1\u606F"})}),(0,a.jsx)("div",{style:{backgroundColor:"#fff2f0",border:"1px solid #ffccc7",borderRadius:"6px",padding:"12px",fontSize:"13px",color:"#a8071a",fontFamily:"monospace"},children:(null==n?void 0:n.message)||"\u672A\u77E5\u9519\u8BEF"})]}),(0,a.jsxs)("details",{children:[(0,a.jsx)("summary",{style:{cursor:"pointer",fontSize:"14px",color:"#1890ff",userSelect:"none",outline:"none"},children:"\u67E5\u770B\u539F\u59CB\u4EE3\u7801"}),(0,a.jsx)("div",{style:{backgroundColor:"#f5f5f5",border:"1px solid #d9d9d9",borderRadius:"6px",padding:"16px",marginTop:"8px",fontSize:"12px",fontFamily:"Consolas, Monaco, monospace",lineHeight:"1.5",color:"#262626"},children:(0,a.jsx)("pre",{style:{margin:0,whiteSpace:"pre-wrap"},children:t})})]})]});},m=({errorInfo:e})=>{let{content:n,error:t}=e,r=new Date().toLocaleTimeString();return(0,a.jsxs)("div",{style:{backgroundColor:"#1e1e1e",color:"#00ff00",fontFamily:'Consolas, Monaco, "Courier New", monospace',fontSize:"13px",padding:"20px",borderRadius:"0",border:"2px solid #333",margin:"8px 0",lineHeight:"1.4"},children:[(0,a.jsxs)("div",{style:{borderBottom:"1px solid #333",paddingBottom:"8px",marginBottom:"12px",color:"#888"},children:["GPT-Vis Terminal v1.0 - ",r]}),(0,a.jsxs)("div",{style:{marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#ff6b6b"},children:"ERROR"}),(0,a.jsx)("span",{style:{color:"#4ecdc4"},children:" [CHART_TYPE_NOT_SUPPORTED]"})]}),(0,a.jsxs)("div",{style:{marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#888"},children:"$"}),(0,a.jsx)("span",{style:{color:"#ffd93d"},children:" chart.render()"})]}),(0,a.jsxs)("div",{style:{marginBottom:"12px",paddingLeft:"20px"},children:[(0,a.jsxs)("div",{style:{color:"#ff6b6b"},children:["\u2717 ",t?t.message||t.toString():""]}),(0,a.jsx)("div",{style:{color:"#888",fontSize:"12px"},children:"\u2514\u2500\u2500 Available types: column, pie, line, bar, area, scatter..."})]}),(0,a.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,a.jsx)("div",{style:{color:"#4ecdc4"},children:"\u{1F4CA} PAYLOAD:"}),(0,a.jsx)("div",{style:{backgroundColor:"#2d2d2d",padding:"8px",marginTop:"4px",borderLeft:"3px solid #4ecdc4",color:"#e6e6e6"},children:(0,a.jsx)("pre",{style:{margin:0,fontSize:"11px"},children:n})})]}),(0,a.jsxs)("div",{style:{color:"#888",fontSize:"11px"},children:[(0,a.jsx)("span",{style:{color:"#ffd93d"},children:"TIP:"})," Use errorRender for custom error handling"]})]});},f=(0,r.withChartCode)({components:{[r.ChartType.Column]:r.Column}}),h=(0,r.withChartCode)({components:{[r.ChartType.Column]:r.Column},errorRender:e=>(0,a.jsx)(u,{errorInfo:e})}),g=(0,r.withChartCode)({components:{[r.ChartType.Column]:r.Column},errorRender:e=>(0,a.jsx)(m,{errorInfo:e})}),p=(0,r.withChartCode)({components:{[r.ChartType.FlowDiagram]:r.FlowDiagram,[r.ChartType.MindMap]:r.MindMap}}),v=(0,r.withChartCode)({components:{[r.ChartType.FlowDiagram]:r.FlowDiagram},componentErrorRender:({error:e})=>(0,a.jsx)("div",{style:{height:"100px",color:"red",display:"flex",alignItems:"center",justifyContent:"center"},children:e?e.message||e.toString():""})});var x=()=>(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{children:(0,a.jsx)(r.GPTVisLite,{components:{code:f},children:o})}),(0,a.jsx)("div",{style:{marginBottom:"24px"},children:(0,a.jsx)(r.GPTVisLite,{components:{code:h},children:d})}),(0,a.jsx)("div",{children:(0,a.jsx)(r.GPTVisLite,{components:{code:g},children:i})}),(0,a.jsx)("div",{children:(0,a.jsx)(r.GPTVisLite,{components:{code:p},children:c})}),(0,a.jsx)("div",{children:(0,a.jsx)(r.GPTVisLite,{components:{code:p},children:l})}),(0,a.jsx)("div",{children:(0,a.jsx)(r.GPTVisLite,{components:{code:v},children:s})})]});},"36d8a4f8":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{Actions:function(){return o.default;},Attachments:function(){return d.default;},Bubble:function(){return l.default;},Conversations:function(){return c.default;},Prompts:function(){return s.default;},Sender:function(){return i.default;},Suggestion:function(){return m.default;},ThoughtChain:function(){return u.default;},Welcome:function(){return f.default;},XProvider:function(){return h.default;},XRequest:function(){return x.default;},XStream:function(){return v.default;},useXAgent:function(){return p.default;},useXChat:function(){return g.default;},version:function(){return r.default;}});var a=t("777fffbe"),r=a._(t("f5f0d9bb")),o=a._(t("faa71e2d")),d=a._(t("4b30c990")),i=a._(t("7b31f050")),l=a._(t("6250cf6d")),c=a._(t("1fccaf05")),s=a._(t("453b775e")),u=a._(t("752de3f1")),m=a._(t("21c831ca")),f=a._(t("93d32012")),h=a._(t("d52145fb")),g=a._(t("89babbae")),p=a._(t("81745cc0")),v=a._(t("b59532a4")),x=a._(t("99124e3b"));},"42a9474b":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return i;}});var a=t("a2e753d8");t("93d1d306");var r=t("df67f0d6");let o=`
\`\`\`my-ui
my data ...
\`\`\`

\`\`\`vis-chart
{
   "type": "pin-map",
   "data": [
    { "label": "\u{6768}\u{6885}\u{5CAD}", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "\u{7406}\u{5B89}\u{5BFA}", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "\u{4E5D}\u{6EAA}\u{70DF}\u{6811}", "longitude": 120.11335, "latitude": 30.202395 },
    { "label": "\u{98DE}\u{6765}\u{5CF0}", "longitude": 120.100549, "latitude": 30.236875 },
    { "label": "\u{7075}\u{9690}\u{5BFA}", "longitude": 120.101406, "latitude": 30.240826 },
    { "label": "\u{5929}\u{7AFA}\u{4E09}\u{5BFA}", "longitude": 120.105337, "latitude": 30.236818 },
    { "label": "\u{676D}\u{5DDE}\u{690D}\u{7269}\u{56ED}", "longitude": 120.116979, "latitude": 30.252876 },
    { "label": "\u{676D}\u{5DDE}\u{82B1}\u{5703}", "longitude": 120.127654, "latitude": 30.245663 },
    { "label": "\u{82CF}\u{5824}", "longitude": 120.135764, "latitude": 30.251448 },
    { "label": "\u{864E}\u{8DD1}\u{516C}\u{56ED}", "longitude": 120.130095, "latitude": 30.207505 },
    { "label": "\u{7389}\u{7687}\u{98DE}\u{4E91}", "longitude": 120.145323, "latitude": 30.214993 },
    { "label": "\u{957F}\u{6865}\u{516C}\u{56ED}", "longitude": 120.155057, "latitude": 30.232985 }
  ]
}
\`\`\`
`,d=(0,r.withDefaultChartCode)({languageRenderers:{"my-ui":({children:e})=>(0,a.jsx)("div",{style:{backgroundColor:"#f0f0f0",padding:"10px"},children:e})}});var i=()=>(0,a.jsx)("div",{children:(0,a.jsx)(r.GPTVisLite,{components:{code:d},children:o})});},"5dee4d26":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return l;}});var a=t("a2e753d8");t("ff1ba601");var r=t("df67f0d6");let o=`
\u{5F53}\u{7136}\u{53EF}\u{4EE5}\u{FF01}\u{5728} JavaScript \u{4E2D}\u{FF0C}\u{4F60}\u{53EF}\u{4EE5}\u{4F7F}\u{7528}\u{52A0}\u{6CD5}\u{8FD0}\u{7B97}\u{7B26} \`+\` \u{6765}\u{5B9E}\u{73B0}\u{4E24}\u{4E2A}\u{6570}\u{5B57}\u{7684}\u{76F8}\u{52A0}\u{3002}\u{4EE5}\u{4E0B}\u{662F}\u{4E00}\u{4E2A}\u{7B80}\u{5355}\u{7684}\u{51FD}\u{6570}\u{FF0C}\u{5B83}\u{63A5}\u{53D7}\u{4E24}\u{4E2A}\u{53C2}\u{6570} \`a\` \u{548C} \`b\`,\u{5E76}\u{8FD4}\u{56DE}\u{5B83}\u{4EEC}\u{7684}\u{548C}\u{FF1A}

\`\`\`javascript
function add(a, b) {
  return a + b;
}

// \u{793A}\u{4F8B}\u{7528}\u{6CD5}
const result = add(3, 4);
console.log(result); // \u{8F93}\u{51FA}\u{FF1A}7
\`\`\`

\u{5728}\u{8FD9}\u{4E2A}\u{793A}\u{4F8B}\u{4E2D}\u{FF0C}\u{6211}\u{4EEC}\u{5B9A}\u{4E49}\u{4E86}\u{4E00}\u{4E2A}\u{540D}\u{4E3A} \`add\` \u{7684}\u{51FD}\u{6570}\u{FF0C}\u{5B83}\u{63A5}\u{53D7}\u{4E24}\u{4E2A}\u{53C2}\u{6570} \`a\` \u{548C} \`b\`\u{3002}\u{51FD}\u{6570}\u{7684}\u{4E3B}\u{4F53}\u{53EA}\u{6709}\u{4E00}\u{884C}\u{4EE3}\u{7801}\u{FF0C}\u{4F7F}\u{7528}\u{52A0}\u{6CD5}\u{8FD0}\u{7B97}\u{7B26} \`+\` \u{5C06} \`a\` \u{548C} \`b\` \u{76F8}\u{52A0}\u{FF0C}\u{5E76}\u{8FD4}\u{56DE}\u{7ED3}\u{679C}\u{3002}

\u{7136}\u{540E}\u{FF0C}\u{6211}\u{4EEC}\u{8C03}\u{7528}
`,d=`
\`\`\`vis-chart
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
\`\`\`
`,i=(0,r.withDefaultChartCode)({debug:!0});var l=()=>(0,a.jsxs)("div",{children:[(0,a.jsx)(r.GPTVisLite,{children:o}),(0,a.jsx)(r.GPTVisLite,{components:{code:i},children:d})]});},"7dca4d14":function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"Source",{enumerable:!0,get:function(){return r.default;}});var a=t("d1751d7c"),r=t("777fffbe")._(t("e5365288"));a._(t("1ad5815b"),n),a._(t("7f6e4cdf"),n),a._(t("450e3722"),n),a._(t("711e7b38"),n),a._(t("9f3735c7"),n),a._(t("75cceb9a"),n),a._(t("d17b15fe"),n);},df67f0d6:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.e(n,{ConfigProvider:function(){return i.default;},GPTVis:function(){return l.default;},GPTVisLite:function(){return c.default;},useEventPublish:function(){return c.useEventPublish;},version:function(){return s.default;},withChartCode:function(){return d.withChartCode;},withDefaultChartCode:function(){return d.withDefaultChartCode;}});var a=t("d1751d7c"),r=t("777fffbe"),o=t("852bbaa9");a._(t("5639510f"),n),a._(t("d382b880"),n),a._(t("8e074ce8"),n);var d=t("a574afdb"),i=r._(t("a7265236")),l=r._(t("2c69d5f6")),c=o._(t("033b3748")),s=r._(t("7cf1dc46"));},e3e487b9:function(e,n,t){"use strict";t.d(n,"__esModule",{value:!0}),t.d(n,"default",{enumerable:!0,get:function(){return i;}});var a=t("a2e753d8");t("462891a7");var r=t("df67f0d6");let o=`
\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "category 1", "value": 27 },
    { "category": "category 2", "value": 25 },
    { "category": "category 3", "value": 18 },
    { "category": "category 4", "value": 15 },
    { "category": "category 5", "value": 10 },
    { "category": "category 6", "value": 5 }
  ]
}
\`\`\`
`,d=(0,r.withDefaultChartCode)({debug:!0,locale:"en-US"});var i=()=>(0,a.jsx)("div",{children:(0,a.jsx)(r.GPTVisLite,{components:{code:d},children:o})});}}]);
//# sourceMappingURL=32e00b5e-async.569122c2.js.map