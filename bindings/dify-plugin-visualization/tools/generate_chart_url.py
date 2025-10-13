import requests
from typing import Dict, Any, Optional
from requests.exceptions import HTTPError, RequestException

DEFAULT_CHART_URL = "https://antv-studio.alipay.com/api/gpt-vis"

class GenerateChartUrl:
  def __init__(self, runtime=None):
    self.runtime = runtime

  def generate_chart_url(self, options: Dict[str, Any]) -> str:
    url = self._get_chart_url()
    payload = {**options, "source": "dify-plugin-visualization"}
    headers = {"Content-Type": "application/json"}

    try:
      response = requests.post(url, json=payload, headers=headers)
      response.raise_for_status()
      data = response.json()
      if not data.get('success'):
        raise ValueError(data.get('errorMessage', 'Unknown error'))
      return data.get("resultObj", "")
    except HTTPError as http_err:
      print(f"HTTP error occurred: {http_err}")
      print(f"Status code: {getattr(response, 'status_code', 'N/A')}")
      print(f"Response content: {getattr(response, 'text', 'N/A')}")
      raise
    except RequestException as req_err:
      print(f"Request failed: {req_err}")
      raise
    except Exception as err:
      print(f"An error occurred: {err}")
      raise

  def _get_chart_url(self) -> str:
    if self.runtime and hasattr(self.runtime, "credentials"):
      credentials = getattr(self.runtime, "credentials", {})
      vis_url = credentials.get("VIS_REQUEST_SERVER")
      if vis_url:
        return vis_url
    return DEFAULT_CHART_URL
