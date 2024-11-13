import type { PropsWithChildren } from 'react';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { TEXT_THEME } from '../../constants';
import { getElementFontSize } from './getElementFontSize';

type SvgProps = PropsWithChildren<React.SVGProps<SVGSVGElement>>;

export const useSvgWrapper = () => {
  const ele = useRef(null);
  const [fontSize, setFontSize] = useState<number>(TEXT_THEME.fontSizeBase);
  useLayoutEffect(() => {
    if (ele.current) {
      setFontSize(getElementFontSize(ele.current, TEXT_THEME.fontSizeBase));
    }
  }, []);
  const Svg = ({ children, ...otherProps }: SvgProps) => {
    return (
      <svg
        style={{
          margin: '0px 4px',
          transform: 'translate(0px, 0.125em)',
        }}
        ref={ele}
        {...otherProps}
      >
        {children}
      </svg>
    );
  };
  return [Svg, fontSize] as const;
};
