# Chart Recommendation Dataset

This folder provides datasets for evaluating/fine-tuning large models on the "Chart Recommendation" task. Here, the chart recommendation task refers to recommending suitable charts to display data based on the given data.

Currently, the dataset covers 16 types of charts, with 1-3 distinct data scenarios for each chart type. Each scenario contains 15+ sets of chart data. The data will be continually updated, and we welcome contributions of chart data collected from your use scenarios.

## Dataset Description

### Original Chart Data

Data is organized into different folders based on chart types, and chart data is divided into different files based on data scenarios. For example, the column chart folder column contains two files: 01_base.json for basic column chart data, and 02_split.json for split column chart data.

In each data entry, source represents the user input. source.data contains the original data, and source.meta includes metadata about the input data, mainly field names and data types. One of these pieces of information can be missing. target represents the recommended chart type and the field mappings in the chart configuration. Here is an example:

```json
{
    "source": {
        // Metadata about data fields
        "metas": [{"name": "City", "dataType": "string"}, {"name": "Population", "dataType": "number"}],
        // Original data
        "data": [{"City": "Beijing", "Population": 2154}, {"City": "Shanghai", "Population": 2424}, {"City": "Guangzhou", "Population": 1530}]
    },
    "target": [
        {
            "type": "column",
            "encode": {
                "x": ["City"], // Field for x-axis
                "y": ["Population"] // Field for y-axis
            }
        }
    ]s
}
```

### Model Fine-Tuning Dataset

The gpt_vis_train.jsonl file is a fine-tuning training dataset generated from the above original chart data. The generation strategy is as follows: randomly select half of the cases for each chart type (the remaining data is used for evaluation). Since the number of original data entries varies for each chart type, to avoid imbalanced chart quantities affecting recommendation results, some chart data entries are repeated a certain number of times to ensure there are 60 entries for each chart type in the training set.

### Evaluation Result File

The `metrics.json` file contains the results of our model evaluation after fine-tuning. In this file, every source entry is the original input, target is the expected output, and generation is the model's output. Comparing these entries allows the evaluation of recommendation accuracy.

## Model's Performance on Chart Recommendation Task

Using the above datasets, we achieved a chart type accuracy of 89% and an encode accuracy of 82% with fine-tuning based on the `qwen2.5-14b-instruct`.

It is important to note that the model recommendations can satisfy the requirement of "providing data and returning chart and configuration" in most scenarios. However, the model's output is not entirely controlled, which may result in invalid output or charts that cannot be successfully rendered. We recommend combining these with the recommendation modules in [@antv/ava](https://ava.antv.antgroup.com/api/advice/advisor). In scenarios where the model performance is suboptimal or where traditional rules fulfill the recommendation requirements, rule-based recommendation pipelines can be used as a fallback.
