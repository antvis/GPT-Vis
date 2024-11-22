import _ from 'lodash';
import { evaluateChartEncodes } from '../helpers/evaluate-chart-encode.js';
import { readDataset, writeDataset } from '../helpers/read-dataset.js';

export const evaluateChartRecommend = async () => {
  const evalDatasetPath = `datastes/recommend/eval.json`;
  const testDataset = await readDataset(evalDatasetPath);
  console.log('datasets count: ', testDataset.length);
  console.log('Beginning eval datasets...');
  const misMap = new Map();
  const scoredData = testDataset
    .map((data) => {
      const target = data.target?.[0] ?? data.target;
      const gen = data.generation?.[0] ?? data.generation;
      if (!gen || !target) {
        // 数据缺失
        misMap.set('missing', (misMap.get('missing') ?? 0) + 1);
        return;
      }
      const chartTypeScore = gen.type === target.type ? 1 : 0;
      const encodeScore = evaluateChartEncodes(gen.encode, target.encode);
      if (!chartTypeScore) {
        const key = `${target.type}_to_${gen.type}`;
        if (misMap.has(key)) {
          misMap.set(key, misMap.get(key) + 1);
        } else {
          misMap.set(key, 1);
        }
      }
      return {
        ...data,
        correctness: chartTypeScore,
        encodeScore,
      };
    })
    .filter((data) => data);
  // save evaluate result
  await writeDataset(`datastes/recommend/metrics.json`, scoredData);
  // output metrics
  let score = 0;
  let chartTypeScore = 0;
  let encodeScore = 0;
  let chartTypeScoreMap = {};
  scoredData.forEach((data) => {
    chartTypeScore += data.correctness;
    encodeScore += data.encodeScore;
    const target = data.target?.[0] ?? data.target;
    const chartType = target?.type;
    chartTypeScoreMap[chartType] = {
      chartTypeScore: (chartTypeScoreMap[chartType]?.chartTypeScore ?? 0) + data.correctness,
      encodeScore: (chartTypeScoreMap[chartType]?.encodeScore ?? 0) + data.encodeScore,
      count: (chartTypeScoreMap[chartType]?.count ?? 0) + 1,
    };
  });
  score /= testDataset.length;
  chartTypeScore /= testDataset.length;
  encodeScore /= testDataset.length;
  chartTypeScoreMap = _.mapValues(chartTypeScoreMap, (score) => ({
    chartTypeScore: score.chartTypeScore / score.count,
    encodeScore: score.encodeScore / score.count,
    count: score.count,
  }));
  console.log('scoredData.length', scoredData.length, 'datasets count: ', testDataset.length);
  console.log('chart type recommend accuracy:', chartTypeScore);
  console.log('chart encode score:', encodeScore);
  console.log('misclassified:', misMap);
  console.log('chartTypeScoreMap', chartTypeScoreMap);
};

evaluateChartRecommend().catch((error) => {
  console.error('Error evaluating chart recommendation:', error);
});
