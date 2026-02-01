import pkg from '../package.json';
import version from '../src/version';

describe('version', () => {
  it('should match the `version` field of package.json', () => {
    const expected = pkg.version;
    expect(version).toBe(expected);
  });
});
