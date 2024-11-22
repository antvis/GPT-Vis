import _ from 'lodash';

const jaccardSimilarity = (a, b) => {
  const base = _.union(a, b).length;
  if (base === 0) return 0;
  return _.intersection(a, b).length / base;
};

const removeEmpty = (v) => {
  const res = {};
  _.each(v, (value, key) => {
    if (typeof value === 'string') {
      if (value) {
        res[key] = value;
      }
    } else if (Array.isArray(value)) {
      if (value.length) {
        res[key] = value;
      }
    }
  });
  return res;
};

/** 根据推荐的 chart encode 和期望的 chart encode 的相似度打分*/
export const evaluateChartEncodes = (gen, ref) => {
  try {
    const v = [];
    const a = removeEmpty(gen);
    const b = removeEmpty(ref);
    const allKeys = _.union(Object.keys(a), Object.keys(b));
    _.each(allKeys, (key) => {
      const ao = a[key];
      const bo = b[key];
      if (!ao && !bo) {
        return;
      }
      if (Array.isArray(ao) && Array.isArray(bo)) {
        v.push(jaccardSimilarity(ao, bo));
      } else {
        v.push(ao === bo ? 1 : 0);
      }
    });
    return v.length ? _.sum(v) / v.length : gen == ref;
  } catch (e) {
    console.log('error', e);
    return 0;
  }
};
