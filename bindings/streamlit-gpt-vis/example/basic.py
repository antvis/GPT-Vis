import streamlit as st
from streamlit_gpt_vis import set_gpt_vis

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run example/basic.py`

st.subheader("Component with constant args")

# Create an instance of our component with a constant `content` arg, and
# print its output value.
set_gpt_vis('''
# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

Here’s a visualization of Haidilao's food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

```vis-chart
{ "type": "line","data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}] }
```

```vis-chart
{ "type":"network-graph","data":{"nodes":[{"name":"哈利·波特"},{"name":"赫敏·格兰杰"},{"name":"罗恩·韦斯莱"},{"name":"伏地魔"}],"edges":[{"source":"哈利·波特","target":"赫敏·格兰杰","name":"朋友"},{"source":"哈利·波特","target":"罗恩·韦斯莱","name":"朋友"},{"source":"哈利·波特","target":"伏地魔","name":"敌人"},{"source":"伏地魔","target":"哈利·波特","name":"试图杀死"}]} }
```
''')

st.markdown("---")

st.subheader("Component with vis text")

set_gpt_vis('''
<vis-text type="time_desc">本月</vis-text>共产生<vis-text type="metric_name">决策数量</vis-text><vis-text type="metric_value">2,783</vis-text>个，环比<vis-text type="trend_desc">增长</vis-text><vis-text type="ratio_value_pos">15.2%</vis-text>。<vis-text type="dim_name">高优先级决策</vis-text>占比<vis-text type="proportion">56.2%</vis-text>，呈现稳定<vis-text type="trend_desc" origin="[1, 2, 6, 18, 24, 48]">上升</vis-text>趋势，预计<vis-text type="time_desc">下月</vis-text>将突破<vis-text type="metric_value">3,000</vis-text>大关。
''')


st.markdown("---")

st.subheader("Component with variable args")

# Create a second instance of our component whose `content` arg will vary
# based on a text_input widget.
#
# We use the special "key" argument to assign a fixed identity to this
# component instance. By default, when a component's arguments change,
# it is considered a new instance and will be re-mounted on the frontend
# and lose its current state. In this case, we want to vary the component's
# "content" argument without having it get recreated.
content_input = st.text_input("Enter render content", value="#### GPT-VIS \n\n Components for GPTs, generative AI, and LLM projects. Not only UI Components.")

set_gpt_vis(content_input, config={'plot': { 'theme': { 'type': 'academy' }}})
