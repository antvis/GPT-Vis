export function urlToMarkerId(url: string) {
  let hash = 0;
  if (url.length > 0) {
    for (let i = 0; i < url.length; i++) {
      hash = ((hash << 5) - hash + url.charCodeAt(i)) | 0;
    }
  }
  // 将哈希值转换为四位数
  const id = Math.abs(hash % 10000)
    .toString()
    .padStart(4, '0');
  return `marker-${id}`;
}
