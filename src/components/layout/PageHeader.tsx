type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // right-hand side, e.g. a role chip or action buttons
};

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-3.5">
      <div>
        <h2 className="text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 max-w-[50ch] text-[13.5px] text-ink-soft">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
