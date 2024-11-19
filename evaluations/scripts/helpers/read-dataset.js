import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { __dirProject } from '../constants/index.js';

export const readDataset = async (filePath) => {
  const absolutefilePath = resolve(__dirProject, filePath);

  const content = await readFile(absolutefilePath, 'utf-8');

  const data = JSON.parse(content);

  return data;
};

export const writeDataset = async (filePath, content) => {
  const absolutefilePath = resolve(__dirProject, filePath);

  const data = JSON.stringify(content);

  await writeFile(absolutefilePath, data, 'utf-8');
};
