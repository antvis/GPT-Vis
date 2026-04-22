interface SectionHeadingProps {
  id: string;
  children: React.ReactNode;
}

export function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <h2 className="text-[28px] font-bold text-on-surface group flex items-center gap-1.5">
        {children}
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-40 hover:!opacity-70 text-on-surface-variant font-normal text-xl transition-opacity"
          aria-label={`Link to this section`}
        >
          #
        </a>
      </h2>
      <div className="h-[1px] flex-1 bg-surface-container ml-4" />
    </div>
  );
}
