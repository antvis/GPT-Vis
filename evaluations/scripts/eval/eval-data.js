/**
 * 测评数据
 */
import { getEvalDataset } from '../helpers/evaluate.js';
import { readDataset, writeDataset } from '../helpers/read-dataset.js';

async function evaluateDataset(chartName) {
  const testDatasetPath = `datastes/chart/${chartName}/test.json`;
  const evalDatasetPath = `datastes/chart/${chartName}/eval.json`;

  const testDataset = await readDataset(testDatasetPath);
  const evalDataset = await getEvalDataset(testDataset);
  await writeDataset(evalDatasetPath, evalDataset);
}

const chartName = process.argv[2];
if (!chartName) {
  console.error('Please provide a chart name as an argument.');
  process.exit(1);
}

evaluateDataset(chartName).catch((error) => {
  console.error('Error evaluating dataset:', error);
});
