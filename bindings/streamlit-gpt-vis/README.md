# streamlit-gpt-vis

[![Latest Stable Version](https://img.shields.io/pypi/v/streamlit-gpt-vis.svg)](https://pypi.python.org/pypi/streamlit-gpt-vis) [![Pypi Download](https://img.shields.io/pypi/dm/streamlit-gpt-vis)](https://pypi.python.org/pypi/streamlit-gpt-vis)

Streamlit binding for [`@AntV/GPT-Vis`](https://github.com/antvis/GPT-Vis) Components for GPTs, generative AI, and LLM projects. Not only UI Components.

## Installation

```sh
pip install streamlit-gpt-vis
```

## Usage

```python
import streamlit as st
from streamlit_gpt_vis import set_gpt_vis

content = '''
# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

Here’s a visualization of Haidilao's food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{"type": "line","data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]}
\`\`\`
'''

set_gpt_vis(content)
```

## API

### `set_gpt_vis(content: str, config: dict = None)`

- content：Markdown content
- config: GPT-Vis [ConfigProvider](https://github.com/antvis/GPT-Vis/blob/main/src/ConfigProvider/index.md) config

## License

[MIT](./LICENSE)
