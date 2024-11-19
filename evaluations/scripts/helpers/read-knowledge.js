import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { __dirProject } from '../constants/index.js';

export const readKnowledge = async (fileName) => {
  const filePath = resolve(__dirProject, '../knowledges/' + fileName);

  const content = await readFile(filePath, 'utf-8');

  const regex = /## 图表用法([\s\S]*?)## 使用示例/;
  const match = content.match(regex);

  const filtered = match[1].trim();

  return filtered;
};
