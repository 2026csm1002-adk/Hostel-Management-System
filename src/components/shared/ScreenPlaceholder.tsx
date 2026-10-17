/** Temporary body of a screen that is not built yet. Replace it with the real screen component. */
export function ScreenPlaceholder({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[3px] border border-dashed border-line-strong bg-white p-[22px]">
      <h3 className="text-[15px]">{title}</h3>
      <p className="mt-1 text-[13px] text-ink-soft">
        You are in the right place for this role. This screen is not built yet. It will contain:
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-[13.5px]">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </section>
  );
}
