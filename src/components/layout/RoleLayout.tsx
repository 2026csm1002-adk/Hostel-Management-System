import { Navbar } from "@/components/layout/Navbar";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTabs } from "@/components/layout/SectionTabs";

// Full class names are written out so Tailwind can see them.
const ACCENTS = {
  amber: { chip: "border-amber/35 bg-amber-soft text-amber", dot: "bg-amber", tab: "#B8791F" },
  indigo: { chip: "border-indigo/35 bg-indigo-soft text-indigo", dot: "bg-indigo", tab: "#3B4C86" },
  green: { chip: "border-green/35 bg-green-soft text-green", dot: "bg-green", tab: "#3F7D52" },
} as const;

type Props = {
  email: string;
  roleLabel: string;                 // "Caretaker"
  accent: keyof typeof ACCENTS;
  title: string;
  subtitle: string;
  chipText: string;                  // e.g. "Caretaker · Satluj"
  tabs?: { href: string; label: string }[];
  children: React.ReactNode;
};

/** The frame shared by the three staff areas: Navbar, page header with a role chip, optional tabs. */
export function RoleLayout({ email, roleLabel, accent, title, subtitle, chipText, tabs, children }: Props) {
  const a = ACCENTS[accent];
  return (
    <>
      <Navbar userEmail={email} roleLabel={roleLabel} tabColor={a.tab} />
      <main className="mx-auto max-w-[1140px] px-5 pb-20 pt-7">
        <PageHeader title={title} subtitle={subtitle}>
          <span className={`inline-flex items-center gap-[7px] rounded-[3px] border px-2.5 py-1.5 font-mono text-xs font-semibold ${a.chip}`}>
            <span className={`h-[7px] w-[7px] rounded-full ${a.dot}`} />
            {chipText}
          </span>
        </PageHeader>
        {tabs && <SectionTabs tabs={tabs} label={`${roleLabel} section`} />}
        {children}
      </main>
    </>
  );
}
