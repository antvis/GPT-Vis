import { CodeBlock } from '../../components/CodeBlock';
import { SKILL_INSTALL_PROMPT } from '../../lib/skill-installation';

export function SkillGuide() {
  return <CodeBlock code={SKILL_INSTALL_PROMPT} lang="text" />;
}
