
from collections.abc import Generator
from typing import Any
from dify_plugin import Tool
from dify_plugin.entities.tool import ToolInvokeMessage
from dify_plugin.errors.tool import ToolProviderCredentialValidationError
from .generate_chart_url import GenerateChartUrl
from .validate import validate_params, validate_node_edge_data
import json

class GenerateOrganizationChart(Tool):
    def _invoke(self, tool_parameters: dict[str, Any]) -> Generator[ToolInvokeMessage]:
        try:
            width = tool_parameters.get("width", 600)
            height = tool_parameters.get("height", 400)
            title = tool_parameters.get("title", "")
            orient = tool_parameters.get("orient", "vertical")
            data_str = tool_parameters.get("data", "")
            theme = tool_parameters.get("theme", "default")

            try:
                data_str = data_str.replace("'", '"')
                data_list = json.loads(data_str)
            except json.JSONDecodeError as e:
                print(f"Data Parse Failed: {e}")

            chartType = "organization-chart"
            options = {
                "width": width,
                "height": height,
                "data": data_list,
                "theme": theme,
                "orient": orient
            }

            validate_params(chartType, options)
            validate_node_edge_data(options.get('data', {}))
            generate_url = GenerateChartUrl()
            chart_url = generate_url.generate_chart_url({
                "type": chartType,
                **options
            })

            print("chart_url", chart_url)
            yield self.create_text_message(chart_url)
            yield self.create_json_message({
              "imageUrl": chart_url
            })

        except Exception as e:
            raise ToolProviderCredentialValidationError(str(e))
