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

def validate_tree_data(options: Dict[str, Any]) -> bool:
    """
    Validates the tree data to ensure node names are unique.

    Args:
        options: The tree data to validate.

    Returns:
        bool: True if the tree data is valid, False otherwise.

    Raises:
        ValidationError: If a node name is not unique.
    """
    names = set()

    def check_uniqueness(current_node: Dict[str, Any]) -> None:
        if current_node is None:
            return

        if current_node.get('name') is None:
            raise ValidationError("Invalid parameters: node name is missing.")

        if current_node['name'] in names:
            raise ValidationError(
                f"Invalid parameters: node name '{current_node['name']}' is not unique."
            )
        names.add(current_node['name'])

        if current_node.get('children'):
            for child in current_node['children']:
                check_uniqueness(child)

    # 检查根节点
    if options.get('name') is None:
        raise ValidationError("Invalid parameters: root node name is missing.")

    check_uniqueness(options)
    return True

def validate_node_edge_data(data: Dict[str, Any]) -> bool:
    """
    Validates node and edge data.

    Args:
        data: A dictionary containing "nodes" and "edges" keys.
            - "nodes" is a list of dictionaries, each with a "name" key.
            - "edges" is a list of dictionaries, each with "source" and "target" keys.

    Returns:
        bool: True if the data is valid.

    Raises:
        ValidationError: If any of the validation checks fail.
    """
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    # Extract node names
    node_names = {node["name"] for node in nodes}

    # 1. Check for unique node names
    unique_node_names = set()
    for node in nodes:
        if "name" not in node:
            raise ValidationError("Invalid parameters: node name is missing.")
        if node["name"] in unique_node_names:
            raise ValidationError(f"Invalid parameters: nodes name '{node['name']}' is not unique.")
        unique_node_names.add(node["name"])

    # 2. Check if edge sources and targets exist in nodes
    for edge in edges:
        if "source" not in edge or "target" not in edge:
            raise ValidationError("Invalid parameters: edge source or target is missing.")
        if edge["source"] not in node_names:
            raise ValidationError(f"Invalid parameters: source '{edge['source']}' does not exist in nodes.")
        if edge["target"] not in node_names:
            raise ValidationError(f"Invalid parameters: target '{edge['target']}' does not exist in nodes.")

    # 3. Check if edge source-target pairs are unique
    edge_pairs = set()
    for edge in edges:
        pair = f"{edge['source']}-{edge['target']}"
        if pair in edge_pairs:
            raise ValidationError(f"Invalid parameters: edge pair '{pair}' is not unique.")
        edge_pairs.add(pair)

    return True
