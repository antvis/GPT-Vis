import { exec } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from '../package.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

writeFileSync(
  join(__dirname, '..', 'src', 'version.ts'),
  `export default '${pkg.version}'`,
  'utf8',
);

exec('git add .', (error, stdout, stderr) => {
  if (error) {
    console.log(`sync version error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`sync version stderr: ${stderr}`);
    return;
  }
  console.log(`sync version success.`);
});
