from pydantic import BaseModel, Field, validator, ValidationError
import json
import os
from jsonschema import validate, ValidationError
from typing import Any, Dict

def validate_params(file_name: str, options: Dict[str, Any]):
    try:
        current_dir = os.path.dirname(__file__)
        json_file_path = os.path.join(current_dir, 'charts-schema', f"{file_name}.json")
        if not os.path.exists(json_file_path):
            raise FileNotFoundError(f"File not found: {json_file_path}")

        with open(json_file_path, 'r', encoding='utf-8') as file:
            schema = json.load(file)

        validate(instance=options, schema=schema)
    except FileNotFoundError as e:
        raise FileNotFoundError(f"File not found: {json_file_path}")
    except ValidationError as e:
        raise ValueError(f"Invalid data: {str(e)}")
