import { get } from 'lodash';

const ADC_ENCODE_FIELDS = new Map([
  ['x', 'xField'],
  ['y', 'yField'],
  ['series', 'seriesField'],
  ['size', 'sizeField'],
  ['color', 'colorField'],
  ['shape', 'shapeField'],
  ['y', 'angleField'],
]);

/**
 * 将 G2 encode 写法转换为 ADC Plot 字段映射
 */
function visG2Encode2ADCEncode<T extends Record<string, any>>(config: T) {
  const encodeConfig = config.encode;
  if (!encodeConfig) return config;

  const _config = { ...config };
  for (const field of encodeConfig) {
    const adcField = ADC_ENCODE_FIELDS.get(field);
    if (adcField) {
      // @ts-expect-error
      _config[adcField] = encodeConfig[field];
    }
  }

  return _config;
}

/**
 * 将缩写的 axisTitle 转换为 G2 axis 配置
 */
function axisTitle2G2axis<T extends Record<string, any>>(config: T) {
  const { axisXTitle, axisYTitle } = config;
  const _config: T = { axis: {}, ...config };

  if (axisXTitle) {
    if (get(_config, 'axis.x')) {
      _config.axis.x.title = axisXTitle;
    } else {
      _config.axis.x = { title: axisXTitle };
    }
  }

  if (axisYTitle) {
    if (get(_config, 'axis.y')) {
      _config.axis.y.title = axisYTitle;
    } else {
      _config.axis.y = { title: axisYTitle };
    }
  }

  return _config;
}

/**
 * 将 GPT-Vis 图表的配置转换为 ADC 的配置
 */
export function transform2ADCProps<T extends Record<string, any>>(props: T) {
  const transformedEncode = visG2Encode2ADCEncode(props);
  const transformedAxis = axisTitle2G2axis(transformedEncode);

  return transformedAxis;
}

export function groupBy(data: any[], keyFunc: (d: any) => string) {
  return data.reduce(
    (acc, item) => {
      const key = keyFunc(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, any[]>,
  );
}
