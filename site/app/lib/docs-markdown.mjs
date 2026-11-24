// Preserve fenced examples verbatim; remove only MDX imports and live UI blocks.
export function docsMarkdown(source, skillText = '') {
  let fence = 0;
  let uiBlock = false;
  const lines = [];
  for (const line of source.split('\n')) {
    const marker = line.match(/^\s*(`{3,})/);
    if (marker && !uiBlock && (!fence || marker[1].length >= fence)) {
      fence = fence ? 0 : marker[1].length;
      lines.push(line);
      continue;
    }
    if (fence) {
      lines.push(line);
      continue;
    }
    if (uiBlock) {
      if (/\/>\s*$/.test(line)) uiBlock = false;
      continue;
    }
    if (/^import\s/.test(line) || /^<span id=/.test(line)) continue;
    const heading = line.match(/^<h([2-4]) id="[^"]+">(.+)<\/h[2-4]>$/);
    if (heading) {
      lines.push(`${'#'.repeat(Number(heading[1]))} ${heading[2]}`);
      continue;
    }
    if (/^<(?:ChartPreview|StreamingChatRender|GenerationDemo|ThemeExamplesPreview)\b/.test(line)) {
      uiBlock = !/\/>\s*$/.test(line);
      continue;
    }
    if (/^<SkillGuide\s*\/>/.test(line)) {
      lines.push(skillText);
      continue;
    }
    lines.push(line.replace(/ <a id="[^"]+"\s*\/>/g, ''));
  }
  return (
    lines
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim() + '\n'
  );
}
