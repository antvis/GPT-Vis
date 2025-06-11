import requests
from typing import Dict, Any
from requests.exceptions import HTTPError, RequestException

DEFAULT_CHART_URL = "https://antv-studio.alipay.com/api/gpt-vis"

class GenerateChartUrl:
    def generate_chart_url(self, options: Dict[str, Any]) -> str:
        try:
            payload = {
                **options,
                "source": "dify-plugin-visualization",
            }
            headers = {
                "Content-Type": "application/json",
            }
            response = requests.post(DEFAULT_CHART_URL, json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            if not data.get('success'):
                raise ValueError(data.get('errorMessage', 'Unknown error'))
            return data.get("resultObj", "")

        except HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
            print(f"Status code: {response.status_code}")
            print(f"Response content: {response.text}")
            raise

        except RequestException as e:
            print(f"Request failed: {e}")
            raise
        except Exception as e:
            print(f"An error occurred: {e}")
            raise
