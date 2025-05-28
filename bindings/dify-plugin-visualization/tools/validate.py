import json
import os
from jsonschema import validate, ValidationError
from typing import Any, Dict

def validate_params(file_name: str, options: Dict[str, Any]):

    current_dir = os.path.dirname(__file__)
    json_file_path = os.path.join(current_dir, 'charts-schema', f"{file_name}.json")
    with open(json_file_path, 'r', encoding='utf-8') as file:
        schema = json.load(file)
    validate(instance=options, schema=schema.get('inputSchema'))
