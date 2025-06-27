
from collections.abc import Generator
from typing import Any
from dify_plugin import Tool
from dify_plugin.entities.tool import ToolInvokeMessage
from dify_plugin.errors.tool import ToolProviderCredentialValidationError
from .generate_chart_url import GenerateChartUrl
from .validate import validate_params
import json

class GenerateBarChart(Tool):
    def _invoke(self, tool_parameters: dict[str, Any]) -> Generator[ToolInvokeMessage]:
        try:
            width = tool_parameters.get("width", 600)
            height = tool_parameters.get("height", 400)
            title = tool_parameters.get("title", "")
            axisXTitle = tool_parameters.get("axisXTitle", "")
            axisYTitle = tool_parameters.get("axisYTitle", "")
            stack = tool_parameters.get("stack", False)
            group = tool_parameters.get("group", False)
            data_str = tool_parameters.get("data", "")
            theme = tool_parameters.get("theme", "default")

            try:
                data_str = data_str.replace("'", '"')
                data_list = json.loads(data_str)
            except json.JSONDecodeError as e:
                print(f"Data Parse Failed: {e}")

            chartType = "bar"
            options = {
                "width": width,
                "height": height,
                "title": title,
                "axisXTitle": axisXTitle,
                "axisYTitle": axisYTitle,
                "stack": stack,
                "group": group,
                "data": data_list,
                "theme": theme
            }

            validate_params(chartType, options)
            generate_url = GenerateChartUrl()
            chart_url = generate_url.generate_chart_url({
                "type": chartType,
                **options
            })

            print("chart_url", chart_url)
            yield self.create_text_message(chart_url)
            yield self.create_json_message({
              "imageUrl": chart_url,
            })

        except Exception as e:
            raise ToolProviderCredentialValidationError(str(e))
