import _ from 'lodash';

// 计算词频
function getCharFrequencyVector(str) {
  const vector = {};
  for (const char of str) {
    if (vector[char]) {
      vector[char]++;
    } else {
      vector[char] = 1;
    }
  }
  return vector;
}

function dotProduct(vec1, vec2) {
  let product = 0;
  for (const key in vec1) {
    if (vec2[key]) {
      product += vec1[key] * vec2[key];
    }
  }
  return product;
}

function magnitude(vec) {
  let sum = 0;
  for (const key in vec) {
    sum += vec[key] ** 2;
  }
  return Math.sqrt(sum);
}

/** 计算余弦相似度 */
function cosineSimilarity(str1, str2) {
  const vec1 = getCharFrequencyVector(str1);
  const vec2 = getCharFrequencyVector(str2);

  const dotProd = dotProduct(vec1, vec2);
  const magnitude1 = magnitude(vec1);
  const magnitude2 = magnitude(vec2);

  // 如果任意一个向量的模为0（即字符串为空或无共同字符），则相似度为0
  if (magnitude1 === 0 || magnitude2 === 0) return 0;

  return dotProd / (magnitude1 * magnitude2);
}

/** 计算 jaccard 相似度 */
function jaccardSimilarity(words1, words2) {
  // 并集
  const union = _.union(words1, words2);
  if (union.length === 0) return 0;

  // 交集
  const intersection = _.intersection(words1, words2);

  // 计算 Jaccard 相似度
  const similarity = intersection.length / union.length;

  return similarity;
}

function cleanAndTokenizeText(inputText) {
  const regex = /<vis-text([^>]*)>(.*?)<\/vis-text>/g;
  const text = inputText.replaceAll('\\', '').replaceAll("'", '"');
  const tokens = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const attributesString = match[1];
    const innerText = match[2];

    // 提取标签属性类型和值
    const typeMatch = /type=(?:"([^"]+)"|([^\s>]+))/g.exec(attributesString);
    if (typeMatch) {
      tokens.push(`${typeMatch[0]}`);
    }

    // 添加标签内部的文本
    if (innerText) {
      tokens.push(innerText);
    }
  }

  // 从原始文本中移除 <vis-text> 标签
  const plainText = text.replace(/<vis-text[^>]*>(.*?)<\/vis-text>/g, '');

  // 将去掉标签的文本进行简单分词
  const plainTextTokens = plainText.split(/[\s，。]+/);
  // 合并标签词汇和普通词汇
  return tokens
    .concat(plainTextTokens)
    .map((token) => token)
    .filter((item) => item && item !== "'" && item !== '"'); // 暂忽略 \\
}

export const isText = (inputText) => {
  return inputText.includes('</vis-text>');
};

export const evaluateText = (answer, generation) => {
  const sourceWords = cleanAndTokenizeText(answer);
  const targetWords = cleanAndTokenizeText(generation);
  // const jaccardScore =  jaccardSimilarity(sourceWords, targetWords)
  // 经测试，余弦相似度比较合适
  const cosineScore = cosineSimilarity(sourceWords, targetWords);
  return cosineScore;
};
