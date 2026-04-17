import { CopyMarkdownButton } from './CopyMarkdownButton';

interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <h1 className="flex justify-between items-center text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
      {title}
      <CopyMarkdownButton />
    </h1>
  );
}
