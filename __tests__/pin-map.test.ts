import { describe, expect, it } from 'vitest';
import { parse } from '../src/ai/parser';

describe('parse - pin-map chart', () => {
  it('should parse basic pin-map chart', () => {
    const result = parse(`
vis pin-map
data
  - longitude 120.153576
    latitude 30.287459
    label 杭州
  - longitude 121.4737
    latitude 31.2304
    label 上海
    `);

    expect(result.type).toBe('pin-map');
    expect(result.data).toEqual([
      { longitude: 120.153576, latitude: 30.287459, label: '杭州' },
      { longitude: 121.4737, latitude: 31.2304, label: '上海' },
    ]);
  });

  it('should parse pin-map chart with population data', () => {
    const result = parse(`
vis pin-map
data
  - longitude 121.549792
    latitude 29.868388
    label 宁波人口：51万
  - longitude 121.4737
    latitude 31.2304
    label 上海人口：151万
  - longitude 120.672111
    latitude 28.000575
    label 温州人口：67万
    `);

    expect(result.type).toBe('pin-map');
    expect(result.data).toEqual([
      { longitude: 121.549792, latitude: 29.868388, label: '宁波人口：51万' },
      { longitude: 121.4737, latitude: 31.2304, label: '上海人口：151万' },
      { longitude: 120.672111, latitude: 28.000575, label: '温州人口：67万' },
    ]);
  });

  it('should parse pin-map chart with scenic spots', () => {
    const result = parse(`
vis pin-map
data
  - label 杨梅岭
    longitude 120.118362
    latitude 30.217175
  - label 理安寺
    longitude 120.112958
    latitude 30.207319
  - label 九溪烟树
    longitude 120.11335
    latitude 30.202395
    `);

    expect(result.type).toBe('pin-map');
    expect(result.data).toEqual([
      { label: '杨梅岭', longitude: 120.118362, latitude: 30.217175 },
      { label: '理安寺', longitude: 120.112958, latitude: 30.207319 },
      { label: '九溪烟树', longitude: 120.11335, latitude: 30.202395 },
    ]);
  });
});
