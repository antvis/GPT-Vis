from collections.abc import Generator
from typing import Any
from dify_plugin import Tool
from dify_plugin.entities.tool import ToolInvokeMessage
from dify_plugin.errors.tool import ToolProviderCredentialValidationError
from .generate_chart_url import GenerateChartUrl
from .validate import validate_params

class GenerateLiquidChart(Tool):
    def _invoke(self, tool_parameters: dict[str, Any]) -> Generator[ToolInvokeMessage]:
        try:
            width = tool_parameters.get("width", 600)
            height = tool_parameters.get("height", 400)
            title = tool_parameters.get("title", "")
            percent = tool_parameters.get("percent", "")
            theme =  tool_parameters.get("theme", "default")

            chartType = "liquid"
            options = {
                "width": width,
                "height": height,
                "title": title,
                "percent": percent,
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
              "imageUrl": chart_url
            })

        except Exception as e:
            raise ToolProviderCredentialValidationError(str(e))
