import inquirer from 'inquirer';
import fs from 'node:fs';
import path from 'node:path';

const knowledgePath = '../knowledges';
const savetPath = '../knowledges';

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

const replacerCodeBlock = (content) => {
  const usageTypeCodeRegex = /```typescript([\s\S]*?)```/g;

  let _tcontent = content.replace(usageTypeCodeRegex, (match) => {
    return match.replace(/```typescript|```/g, '').trim();
  });

  const usageExampleCodeRegex = /(```json([\s\S]*?)```)/g;

  _tcontent = _tcontent.replace(usageExampleCodeRegex, (match) => {
    return JSON.stringify(JSON.parse(match.replace(/```json|```/g, '').trim()));
  });

  return _tcontent;
};

const generateTxt = async (filePath, name, savetPath) => {
  const content = fs.readFileSync(filePath, 'utf-8');

  const knowledge = replacerCodeBlock(content);

  const txtFilePath = `${savetPath}/${name}.txt`;
  if (!fs.existsSync(txtFilePath)) {
    fs.mkdirSync(path.dirname(txtFilePath), { recursive: true });
  }
  fs.writeFileSync(txtFilePath, knowledge, 'utf8');
};

const run = async () => {
  const files = getKnowledgeFiles(knowledgePath);
  const selectedFile = await selectFile(files);

  const name = path.parse(selectedFile).name;

  console.log(`根据 ${selectedFile} 生成 txt 并保存到 ${savetPath}`);

  await generateTxt(path.join(knowledgePath, selectedFile), name, savetPath);
};

run();
