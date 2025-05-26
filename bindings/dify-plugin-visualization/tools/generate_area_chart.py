from collections.abc import Generator
from typing import Any
from dify_plugin import Tool
from dify_plugin.entities.tool import ToolInvokeMessage
from dify_plugin.errors.tool import ToolProviderCredentialValidationError
from .generate_chart_url import GenerateChartUrl
from pydantic import BaseModel, validator
import json
import requests
import json

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

            try:
                data_str = data_str.replace("'", '"')
                data_list = json.loads(data_str)
            except json.JSONDecodeError as e:
                print(f"Data Parse Failed: {e}")

            options = {
                "type": "area",
                "width": width,
                "height": height,
                "title": title,
                "axisXTitle": axisXTitle,
                "axisYTitle": axisYTitle,
                "stack": stack,
                "data": data_list,
            }

            generate_url = GenerateChartUrl()
            chart_url = generate_url.generate_chart_url(options)

            print("chart_url", chart_url)
            yield self.create_json_message({
                "result": chart_url
            })

        except Exception as e:
            raise ToolProviderCredentialValidationError(str(e))

class ParamsValid(BaseModel):
    width: int = 600
    height: int = 400
    title: str = ""
    axisXTitle: str = ""
    axisYTitle: str = ""
    stack: bool = False
    data: str

    @validator('data')
    def validate_data(cls, v):
        try:
            data_list = json.loads(v.replace("'", '"'))
            if not isinstance(data_list, list) or not data_list:
                raise ValueError("Data must be a non-empty list")
            for item in data_list:
                if not isinstance(item, dict) or 'time' not in item or 'value' not in item:
                    raise ValueError("Each data item must be an object with 'time' and 'value' properties")
            return v
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON format for data: {str(e)}")

