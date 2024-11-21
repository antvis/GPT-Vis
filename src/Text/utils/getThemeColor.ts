import { findKey, get } from 'lodash';
import { DEFAULT_VIS_TEXT_CONFIG } from '../config';
import { TEXT_THEME } from '../theme';

/**
 * 自动适配暗黑模式
 * @params type 类型
 * @params color 当前颜色
 * @params theme 当前主题
 */
export const getThemeColor = ({
  type,
  color,
  theme,
}: {
  type?: string;
  color: string | undefined;
  theme: 'dark' | 'light';
}) => {
  // 仅暗黑主题才处理
  if (type && color && theme === 'dark') {
    const defaultLightColor = get(DEFAULT_VIS_TEXT_CONFIG, [type, 'color']);
    // 仅当前颜色为默认的浅色主题时才处理
    if (color === defaultLightColor) {
      // 找到浅色主题的 token
      const token = findKey(TEXT_THEME.light, (i) => i === color);
      // 返回暗黑主题的对应 token 的颜色
      if (token) return TEXT_THEME.dark[token as keyof typeof TEXT_THEME.dark];
    }
  }
  return color;
};
