from pydantic import BaseModel, Field, validator, ValidationError
import json
import os
from jsonschema import validate, ValidationError
from typing import Any, Dict

class CommonParamsValid(BaseModel):
    width: int = Field(default = 600, description = "Set the width of chart, default is 600.")
    height: int = Field(default = 400, description = "Set the height of chart, default is 400.")
    title: str = Field(default = "", description = "Set the title of chart.")


class axisXTitleParamsValid(BaseModel):
   axisXTitle: str = Field(default = "", description="Set the x-axis title of chart.")

class axisYTitleParamsValid(BaseModel):
   axisXTitle: str = Field(default = "", description="Set the x-axis title of chart.")


def validate_json_schema(file_name: str, options: Dict[str, Any]):
    try:
        current_dir = os.path.dirname(__file__)
        json_file_path = os.path.join(current_dir, 'charts-schema', f"{file_name}.json")
        if not os.path.exists(json_file_path):
            raise FileNotFoundError(f"File not found: {json_file_path}")

        with open(json_file_path, 'r', encoding='utf-8') as file:
            schema = json.load(file)
        # 校验数据
        validate(instance=options, schema=schema)
    except FileNotFoundError as e:
        raise FileNotFoundError(f"File not found: {json_file_path}")
    except ValidationError as e:
        raise ValueError(f"Invalid data: {str(e)}")
