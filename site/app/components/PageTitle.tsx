import { CopyMarkdownButton } from './CopyMarkdownButton';

interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="flex justify-between items-center gap-4 mb-4">
      <h1 className="text-[40px] font-extrabold tracking-tight text-on-surface">{title}</h1>
      <CopyMarkdownButton />
    </div>
  );
}
