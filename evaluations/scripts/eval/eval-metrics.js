/**
 * 生成指标
 */
import { evaluate } from '../helpers/evaluate.js';
import { readDataset, writeDataset } from '../helpers/read-dataset.js';

async function evalMetrics(chartName) {
  const evalDatasetPath = `datastes/chart/${chartName}/eval.json`;

  const evalDataset = await readDataset(evalDatasetPath);
  const result = await evaluate(evalDataset);
  await writeDataset(`datastes/chart/${chartName}/metrics.json`, result);
}

const chartName = process.argv[2];
if (!chartName) {
  console.error('Please provide a chart name as an argument.');
  process.exit(1);
}

evalMetrics(chartName).catch((error) => {
  console.error('Error generating metrics:', error);
});
