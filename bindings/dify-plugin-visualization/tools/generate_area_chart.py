from collections.abc import Generator
from typing import Any
from dify_plugin import Tool
from dify_plugin.entities.tool import ToolInvokeMessage
from dify_plugin.errors.tool import ToolProviderCredentialValidationError
from .generate_chart_url import GenerateChartUrl
from .base_params_valid import validate_json_schema
import json
import requests

class GenerateAreaChart(Tool):
    def _invoke(self, tool_parameters: dict[str, Any]) -> Generator[ToolInvokeMessage]:
        try:
            validated_params = ParamsValid(**tool_parameters)
            width = tool_parameters.get("width", 600)
            height = tool_parameters.get("height", 400)
            title = tool_parameters.get("title", "")
            axisXTitle = tool_parameters.get("axisXTitle", "")
            axisYTitle = tool_parameters.get("axisYTitle", "")
            stack = tool_parameters.get("stack", False)
            data_str = tool_parameters.get("data", "")
            theme =  tool_parameters.get("theme", "default")

            try:
                data_str = data_str.replace("'", '"')
                data_list = json.loads(data_str)
            except json.JSONDecodeError as e:
                print(f"Data Parse Failed: {e}")

            chartType = "area"
            options = {
                "width": width,
                "height": height,
                "title": title,
                "axisXTitle": axisXTitle,
                "axisYTitle": axisYTitle,
                "stack": stack,
                "data": data_list,
                "theme": theme
            }

            validate_json_schema(chartType, options)
            generate_url = GenerateChartUrl()
            chart_url = generate_url.generate_chart_url({
                "type": chartType,
                **options
            })

            print("chart_url", chart_url)
            yield self.create_json_message({
                "result": chart_url
            })

        except Exception as e:
            raise ToolProviderCredentialValidationError(str(e))

