import inquirer from 'inquirer';
import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
import { getBasePrompt as getBaseDataPrompt } from './data2chart.js';
import { getBasePrompt as getBaseTextPrompt } from './text2chart.js';

const { kebabCase } = _;

const knowledgePath = '../knowledges';
const promptPath = './prompts';

/**
 * 获取知识库下的所有文件
 */
const getKnowledgeFiles = (folderPath) => {
  return fs
    .readdirSync(folderPath)
    .filter((file) => fs.lstatSync(path.join(folderPath, file)).isFile());
};

const selectFile = async (files) => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedFile',
      message: '请选择目标文件:',
      choices: files,
    },
  ]);
  return answers.selectedFile;
};

const inputChartName = async (defaultName) => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'chartName',
      message: '请输入资产名称（留空则使用默认名称）:',
      default: defaultName,
    },
  ]);
  return answers.chartName;
};

const inputRecordCount = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'count',
      message: '请输入生成问答对的数量:',
      default: 5,
    },
  ]);
  return Number(answers.count);
};

const readKnowledge = async (content) => {
  const regex = /## 图表用法([\s\S]*?)## 使用示例/;
  const match = content.match(regex);

  const filtered = match[1].trim();

  return filtered;
};

const generatePrompts = async (filePath, nameZh, chartPromptPath) => {
  const content = fs.readFileSync(filePath, 'utf-8');

  const usageExampleRegex = /(\d+\.\s[\s\S]*?)(```json[\s\S]*?```)/g;
  const usageExamples = [...content.matchAll(usageExampleRegex)].map((match) => ({
    text: match[1].trim(),
    code: match[2].trim(),
  }));

  console.log(`抽取的文件中包含 ${usageExamples.length} 个使用示例，请依次选择对应的类型：`);

  const text2chartExamples = [];
  const data2chartExamples = [];

  for (const example of usageExamples) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: `请选择示例的分类:\n${example.text}\n${example.code}`,
        choices: ['text2chart', 'data2chart', 'skip'],
      },
    ]);

    const format = (example) => ({
      question: example.text.replace(/\d+\.\s/, ''),
      answer: JSON.parse(example.code.replace(/```json|```/g, '').trim()),
    });

    if (answers.category === 'text2chart') {
      text2chartExamples.push(format(example));
    } else if (answers.category === 'data2chart') {
      data2chartExamples.push(format(example));
    }
  }

  const knowledge = await readKnowledge(content);
  const recordCount = await inputRecordCount();

  const text2chartFilePath = `${chartPromptPath}/text2chart.md`;
  if (!fs.existsSync(text2chartFilePath)) {
    fs.mkdirSync(path.dirname(text2chartFilePath), { recursive: true });
  }
  fs.writeFileSync(
    text2chartFilePath,
    getBaseTextPrompt(nameZh, knowledge, text2chartExamples, recordCount),
    'utf8',
  );

  const data2chartFilePath = `${chartPromptPath}/data2chart.md`;
  if (!fs.existsSync(data2chartFilePath)) {
    fs.mkdirSync(path.dirname(data2chartFilePath), { recursive: true });
  }
  fs.writeFileSync(
    data2chartFilePath,
    getBaseDataPrompt(nameZh, knowledge, data2chartExamples, recordCount),
    'utf8',
  );
};

const run = async () => {
  const files = getKnowledgeFiles(knowledgePath);
  const selectedFile = await selectFile(files);

  const [nameZh, nameEn] = path.parse(selectedFile).name.split('-');

  const chartFolderName = await inputChartName(kebabCase(nameEn));
  const chartPromptPath = path.join(promptPath, chartFolderName);
  console.log(`根据 ${selectedFile} 生成 prompt 并保存到 ${chartPromptPath}`);

  await generatePrompts(path.join(knowledgePath, selectedFile), nameZh.trim(), chartPromptPath);
};

run();
