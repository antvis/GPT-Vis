import { FontFamily } from '../types';

export const getTitle = (text: string | undefined, texture: string) => {
  if (!text) return undefined;

  if (texture === 'rough') {
    return { title: text, titleFontFamily: FontFamily.ROUGH };
  }
  return text;
};
