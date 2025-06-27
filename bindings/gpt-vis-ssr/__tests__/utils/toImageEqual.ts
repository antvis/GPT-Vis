import * as fs from 'fs';
import * as path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export type toImageEqualOptions = {
  maxError?: number;
};

/**
 * diff between PNGs
 */
function diff(
  src: string,
  target: string,
  diff: string,
  maxError = 0,
  showMismatchedPixels = true,
) {
  let pass = true;

  const img1 = PNG.sync.read(fs.readFileSync(src));
  const img2 = PNG.sync.read(fs.readFileSync(target));
  const { width, height } = img1;

  let diffPNG: PNG | null = null;
  let output: Buffer | null = null;
  if (showMismatchedPixels) {
    diffPNG = new PNG({ width, height });
    output = diffPNG.data;
  }

  // @see https://github.com/mapbox/pixelmatch#pixelmatchimg1-img2-output-width-height-options
  const mismatch = pixelmatch(img1.data, img2.data, output, width, height, {
    threshold: 0.1,
  });

  if (mismatch / (width * height) > maxError) {
    pass = false;
  }

  if (showMismatchedPixels && !pass && diffPNG) {
    fs.writeFileSync(diff, PNG.sync.write(diffPNG));
  }

  return {
    pass,
    mismatch,
  };
}

// @see https://jestjs.io/docs/26.x/expect#expectextendmatchers
export async function toImageEqual(
  buffer: Buffer,
  dir: string,
  name: string,
  options: toImageEqualOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  const { maxError = 0.01 } = options;

  const targetFile = path.join(dir, name);
  const actualFilePath = path.join(dir, `${name}-actual.png`);
  const expectedFilePath = path.join(dir, `${name}.png`);
  const diffFilePath = path.join(dir, `${name}-diff.png`);
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (!fs.existsSync(expectedFilePath)) {
      if (process.env.CI === 'true') {
        throw new Error(`Please generate golden image for ${targetFile}`);
      }
      console.warn(`! generate ${targetFile}`);
      fs.writeFileSync(expectedFilePath, buffer);
      return {
        message: () => `generate ${targetFile}`,
        pass: true,
      };
    } else {
      fs.writeFileSync(actualFilePath, buffer);
      const { mismatch, pass } = diff(actualFilePath, expectedFilePath, diffFilePath, maxError);
      if (pass) {
        if (fs.existsSync(diffFilePath)) fs.unlinkSync(diffFilePath);
        fs.unlinkSync(actualFilePath);
        return {
          message: () => `match ${targetFile}`,
          pass: true,
        };
      }
      return {
        message: () => `mismatch ${targetFile} (mismatch: ${mismatch}) `,
        pass: false,
      };
    }
  } catch (e) {
    return {
      message: () => `${e}`,
      pass: false,
    };
  }
}
