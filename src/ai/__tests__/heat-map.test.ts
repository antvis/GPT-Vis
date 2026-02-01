import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - heat-map chart', () => {
  it('should parse basic heat-map chart', () => {
    const result = parse(`
vis heat-map
data
  - longitude 116.3974
    latitude 39.9087
    value 5
  - longitude 121.4737
    latitude 31.2304
    value 3
    `);

    expect(result.type).toBe('heat-map');
    expect(result.data).toEqual([
      { longitude: 116.3974, latitude: 39.9087, value: 5 },
      { longitude: 121.4737, latitude: 31.2304, value: 3 },
    ]);
  });

  it('should parse heat-map chart with tourist data', () => {
    const result = parse(`
vis heat-map
data
  - longitude 121.474856
    latitude 31.249162
    value 800
  - longitude 121.449895
    latitude 31.228609
    value 500
  - longitude 121.449486
    latitude 31.222042
    value 900
    `);

    expect(result.type).toBe('heat-map');
    expect(result.data).toEqual([
      { longitude: 121.474856, latitude: 31.249162, value: 800 },
      { longitude: 121.449895, latitude: 31.228609, value: 500 },
      { longitude: 121.449486, latitude: 31.222042, value: 900 },
    ]);
  });

  it('should parse heat-map chart with intensity data', () => {
    const result = parse(`
vis heat-map
data
  - longitude 121.449895
    latitude 31.228609
    value 500
  - longitude 121.449486
    latitude 31.222042
    value 900
  - longitude 121.431826
    latitude 31.204638
    value 400
  - longitude 121.448453
    latitude 31.222341
    value 300
    `);

    expect(result.type).toBe('heat-map');
    expect(result.data).toHaveLength(4);
  });
});
