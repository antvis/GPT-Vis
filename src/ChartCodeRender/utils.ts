import copy from 'copy-text-to-clipboard';

export const handleCopyCode = async (data: any) => {
  try {
    const codeText = JSON.stringify(data, null, 2);
    const success = copy(codeText);
    if (!success) {
      throw new Error('复制失败');
    }
  } catch (err) {
    console.error('复制失败:', err);
    throw err;
  }
};
