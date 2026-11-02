import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Store the small text-only Skill as a standard ZIP, without requiring a system zip utility.
const source = fileURLToPath(new URL('../../skills/chart-visualization/', import.meta.url));
const target = fileURLToPath(
  new URL('../public/downloads/chart-visualization.zip', import.meta.url),
);
const entries = [];
async function collect(directory, prefix = 'chart-visualization') {
  for (const item of (await readdir(directory, { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    if (item.name.startsWith('.')) continue;
    const path = join(directory, item.name);
    const name = `${prefix}/${item.name}`;
    if (item.isDirectory()) await collect(path, name);
    else if (item.isFile()) entries.push({ name: Buffer.from(name), data: await readFile(path) });
  }
}
await collect(source);
if (!entries.some(({ name }) => name.toString() === 'chart-visualization/SKILL.md'))
  throw new Error('Missing SKILL.md');
function crc32(data) {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
const files = [],
  directory = [];
let offset = 0;
for (const { name, data } of entries) {
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x0800, 6); // UTF-8 names; STORE compression.
  local.writeUInt16LE(0x0021, 12); // 1980-01-01: reproducible archives.
  local.writeUInt32LE(crc32(data), 14);
  local.writeUInt32LE(data.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(name.length, 26);
  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4);
  local.copy(central, 6, 4, 30);
  central.writeUInt32LE(offset, 42);
  files.push(local, name, data);
  directory.push(central, name);
  offset += local.length + name.length + data.length;
}
const central = Buffer.concat(directory);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(entries.length, 8);
end.writeUInt16LE(entries.length, 10);
end.writeUInt32LE(central.length, 12);
end.writeUInt32LE(offset, 16);
await mkdir(dirname(target), { recursive: true });
await writeFile(target, Buffer.concat([...files, central, end]));
console.log(`Packaged chart-visualization with ${entries.length} files.`);
