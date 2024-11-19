import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const __dirProject = resolve(__dirname, '../../');

const projectConfigPath = resolve(__dirProject, 'config.json');
const projectLocalConfigPath = resolve(__dirProject, 'config.local.json');

export const PROJECT_CONFIG = JSON.parse(
  readFileSync(
    existsSync(projectLocalConfigPath) ? projectLocalConfigPath : projectConfigPath,
    'utf-8',
  ),
);
