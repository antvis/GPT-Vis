import { requestAgent } from './agent-request.js';
import { chartsSchemaCorrectness } from './chart-schema.js';
import { evaluateText, isText } from './evaluate-text.js';

export const getEvalDataset = async (datasets) => {
  console.log('datasets count: ', datasets.length);
  console.log('Beginning request eval LLM...');

  const eval_datasets = [];

  for (const { type, question, answer } of datasets) {
    const eval_dataset = {
      type,
      question,
      response: '',
      answer: JSON.stringify(answer),
      reference: [],
    };
    try {
      const { response, reference } = await requestAgent(question);
      eval_dataset.response = response;
      eval_dataset.reference = reference;
    } catch (error) {
      console.log('Get eval dataset warn: ', error);
    }
    eval_datasets.push(eval_dataset);
  }

  return eval_datasets;
};

export const evaluate = async (datasets) => {
  console.log('datasets count: ', datasets.length);
  console.log('Beginning eval datasets...');

  const eval_datasets = [];

  for (const eval_dataset of datasets) {
    const { question, answer, response, reference } = eval_dataset;

    if (reference.length) {
      if (isText(answer)) {
        // 文本测评单独的链路
        eval_dataset.correctness = evaluateText(answer, response);
        eval_datasets.push(eval_dataset);
        continue;
      }
      try {
        const answerData = JSON.parse(answer);
        const responseData = JSON.parse(response);
        // 可信度
        eval_dataset.correctness = chartsSchemaCorrectness(responseData, answerData);
        // eval_dataset.correctness = isChartsSchemaValid(responseData) ? 1 : 0;
        // const answerData = JSON.parse(answer);
        // if (
        //   JSON.stringify(responseData.data) === JSON.stringify(answerData.data)
        // ) {
        //   eval_dataset.correctness = 1;
        // } else {
        //   eval_dataset.correctness = 0.5;
        // }
      } catch (error) {
        console.log('Evaluate warn: ', question, error);
        eval_dataset.correctness = 0;
      }
    } else {
      eval_dataset.correctness = 0;
    }

    eval_datasets.push(eval_dataset);
  }

  const count = eval_datasets.length;
  const sum = eval_datasets
    .map((item) => item.correctness)
    .reduce((total, current) => total + current, 0);
  console.log(`Evaluate result: ${sum}/${count} => ${sum / count}`);

  return eval_datasets;
};
