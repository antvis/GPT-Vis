import { isNaN, isString, toNumber } from 'lodash';
import React, { useMemo } from 'react';
import type { VisTextProps } from '../../types';
import { useSvgWrapper } from '../hooks/useSvgWrapper';
import { getArcPath } from './getArcPath';

const SHADOW_COLOR = '#CDDDFD';
const FILL_COLOR = '#3471F9';

function getProportionNumber(
  children: string | string[], // markdown 中传入的 children 文本为 string[]
  origin?: any,
): number | undefined {
  let result: number | undefined;
  const originNumber = toNumber(origin);
  if (!isNaN(originNumber)) {
    result = originNumber;
  } else {
    let text;
    if (isString(children)) {
      text = children;
    } else if (Array.isArray(children) && isString(children[0])) {
      text = children[0];
    }
    if (text?.endsWith?.('%')) {
      const percentageStr = text?.replace(/%$/, '');
      const proportionNumber = toNumber(percentageStr);
      if (!isNaN(proportionNumber)) result = proportionNumber / 100;
    }
  }
  return result;
}

export const ProportionChart: React.FC<VisTextProps> = ({ origin, children }) => {
  const data = useMemo(() => getProportionNumber(children, origin), [children, origin]);
  const [Svg, fontSize] = useSvgWrapper();
  const r = fontSize / 2;
  return (
    data && (
      <Svg width={fontSize} height={fontSize}>
        <circle cx={r} cy={r} r={r} fill={SHADOW_COLOR} />
        {data >= 1 ? (
          <circle cx={r} cy={r} r={r} fill={FILL_COLOR} />
        ) : (
          <path d={getArcPath(fontSize, data)} fill={FILL_COLOR} />
        )}
      </Svg>
    )
  );
};
