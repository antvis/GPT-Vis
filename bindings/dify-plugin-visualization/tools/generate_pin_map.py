
from collections.abc import Generator
from typing import Any
from dify_plugin import Tool
from dify_plugin.entities.tool import ToolInvokeMessage
from dify_plugin.errors.tool import ToolProviderCredentialValidationError
from .generate_chart_url import GenerateChartUrl
from .validate import validate_params
import json

class GeneratePinMap(Tool):
    def _invoke(self, tool_parameters: dict[str, Any]) -> Generator[ToolInvokeMessage]:
        try:
            width = tool_parameters.get("width", 1600)
            height = tool_parameters.get("height", 1000)
            title = tool_parameters.get("title", "")
            data_str = tool_parameters.get("data", "")

            try:
                data_str = data_str.replace("'", '"')
                data_list = json.loads(data_str)
            except json.JSONDecodeError as e:
                print(f"Data Parse Failed: {e}")

            chartType = "pin-map"
            options = {
                "width": width,
                "height": height,
                "title": title,
                "data": data_list,
            }

            validate_params(chartType, options)
            generate_url = GenerateChartUrl()
            chart_info = generate_url.generate_chart_url({
                "tool": "generate_pin_map",
                "input": options
            })
            content = chart_info.get('structuredContent', {})
            url = content.get('imageUrl', '')

            print("content", chart_info, content)
            yield self.create_json_message(content)
            yield self.create_text_message(url)

        except Exception as e:
            raise ToolProviderCredentialValidationError(str(e))
