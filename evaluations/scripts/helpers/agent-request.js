import fetch from 'node-fetch';
import { PROJECT_CONFIG } from '../constants/index.js';
console.log('PROJECT_CONFIG: ', PROJECT_CONFIG);

export const requestAgent = async (query) => {
  const data = {
    ...PROJECT_CONFIG.agent.data,
    query,
  };

  const response = await fetch(`${PROJECT_CONFIG.agent.url}/api/v1/agent/completion_chat`, {
    method: 'POST',
    headers: {
      ...PROJECT_CONFIG.agent.headers,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.success) {
    const contents = result.data.contents;
    // console.log('contents: ', contents);

    const fristContent = contents[0];
    const { related, content } = fristContent;
    let response = content.text;

    // 提取代码块
    if (response.includes('```json\n') && response.includes('\n```')) {
      const pattern = /```json\n([\s\S]+)\n```/;
      const result = pattern.exec(response);
      response = JSON.stringify(JSON.parse(result[1]));
    }

    const reference = related ? related.map((item) => item.title) : [];

    return { response, reference };
  }

  return result;
};
