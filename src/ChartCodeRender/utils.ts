const handleCopyCode = async (data: any) => {
  try {
    const codeText = JSON.stringify(data, null, 2);
    await navigator.clipboard.writeText(codeText);
  } catch (err) {
    console.error('复制失败:', err);
    // 降级方案
    const textArea = document.createElement('textarea');
    textArea.value = JSON.stringify(data, null, 2);
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (fallbackErr) {
      console.error('复制失败:', fallbackErr);
    }
    document.body.removeChild(textArea);
  }
};

// 下载代码
const handleDownloadCode = (data: any) => {
  const codeText = JSON.stringify(data, null, 2);
  const blob = new Blob([codeText], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `chart-config-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export { handleCopyCode, handleDownloadCode };
