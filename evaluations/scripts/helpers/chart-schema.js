/**
 * 判断输出图表配置可信度
 * @returns 0 为错误情况，1 为准确
 */
export function chartsSchemaCorrectness(response, answer) {
  if (typeof answer !== 'object' || !answer.type) {
    return 0;
  }

  const validators = {
    'mind-map': isHierarchicalData,
    'organization-chart': isHierarchicalData,
    'fishbone-diagram': isHierarchicalData,
    'flow-diagram': isNetworkData,
    'network-graph': isNetworkData,
  };

  const validate = validators[answer.type];
  if (validate) {
    return validate(response.data) ? 1 : 0;
  }

  return plotsSchemaCorrectness(response, answer);
}

/**
 * 判断输出的统计图表配置可信度
 * @returns 0 为错误情况，1 为准确
 */
function plotsSchemaCorrectness(response, answer) {
  const keys = Object.keys(answer);
  const validkeys = ['type'];
  const ignorekeys = ['title', 'axisXTitle', 'axisYTitle'];

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const answer_value = answer[key];
    const response_value = response[key];

    // // 值不相等的情况
    if (answer_value === response_value) {
      continue;
    }

    /** 以下是，值不相等的情况 */

    if (ignorekeys.includes(key)) {
      continue;
    }

    if (validkeys.includes(key)) {
      return 0;
    }

    if (key === 'data') {
      const dataCorrectness = chartsDataCorrectness(response_value, answer_value);
      if (dataCorrectness === 0) {
        return 0;
      }
    }

    return 1;
  }

  return 1;
}

/**
 * 判断统计图表的 data 数据可信度
 * @returns 0 为错误情况，1 为准确
 */
function chartsDataCorrectness(responseData, answerData) {
  if (!Array.isArray(answerData) || !Array.isArray(responseData)) {
    return 0;
  }

  if (responseData.length !== answerData.length) {
    return 0;
  }

  const ansDataItemKeys = Object.keys(answerData[0]).sort();
  const resDataItemKeys = Object.keys(responseData[0]).sort();
  if (ansDataItemKeys.toString() !== resDataItemKeys.toString()) {
    return 0;
  }

  return 1;
}

/**
 * 验证数据是否为层次数据格式
 */
function isHierarchicalData(data) {
  if (!data || typeof data.name !== 'string') {
    return false;
  }

  if (!data.children) {
    if (!Array.isArray(data.children)) {
      return false;
    }

    for (const child of data.children) {
      if (!isHierarchicalData(child)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * 验证数据是否为网络数据格式
 */
function isNetworkData(data) {
  if (
    !data ||
    typeof data !== 'object' ||
    !Array.isArray(data.nodes) ||
    !Array.isArray(data.edges)
  ) {
    return false;
  }

  for (const node of data.nodes) {
    if (typeof node.name !== 'string') {
      return false;
    }
  }
  const nodeNames = data.nodes.map((node) => node.name);

  for (const edge of data.edges) {
    if (
      typeof edge.source !== 'string' ||
      typeof edge.target !== 'string' ||
      !nodeNames.includes(edge.source) ||
      !nodeNames.includes(edge.target) ||
      (edge.name && typeof edge.name !== 'string')
    ) {
      return false;
    }
  }

  return true;
}

export function isChartsSchemaValid(data) {
  if (data.type === 'line') {
    return isLineChartValid(data);
  }

  if (data.type === 'column') {
    return isColumnValid(data);
  }

  return false;
}

function isLineChartValid(data) {
  if (data.type !== 'line' || !Array.isArray(data.data)) {
    return false;
  }

  for (let item of data.data) {
    if (
      (typeof item.time !== 'string' && typeof item.time !== 'number') ||
      typeof item.value !== 'number'
    ) {
      return false;
    }
    if (item.group && typeof item.group !== 'string') {
      return false;
    }
  }

  if (data.title && typeof data.title !== 'string') {
    return false;
  }
  if (data.axisXTitle && typeof data.axisXTitle !== 'string') {
    return false;
  }
  if (data.axisYTitle && typeof data.axisYTitle !== 'string') {
    return false;
  }

  return true;
}

function isColumnValid(data) {
  // 判断是否是对象
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  // 判断 type 属性是否符合要求
  if (data.type !== 'column') {
    return false;
  }
  // 判断 data 属性是否符合要求
  if (
    !Array.isArray(data.data) ||
    data.data.some(
      (item) =>
        typeof item !== 'object' ||
        typeof item.category !== 'string' ||
        typeof item.value !== 'number' ||
        (item.group && typeof item.group !== 'string'),
    )
  ) {
    return false;
  }
  // 判断其他可选属性是否符合要求
  if (data.group && typeof data.group !== 'boolean') {
    return false;
  }
  if (data.stack && typeof data.stack !== 'boolean') {
    return false;
  }
  if (data.title && typeof data.title !== 'string') {
    return false;
  }
  if (data.axisXTitle && typeof data.axisXTitle !== 'string') {
    return false;
  }
  if (data.axisYTitle && typeof data.axisYTitle !== 'string') {
    return false;
  }
  return true;
}
