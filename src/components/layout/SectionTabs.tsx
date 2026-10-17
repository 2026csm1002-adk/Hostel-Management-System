"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { href: string; label: string };

/** Pill tabs under the page header. The tab whose path matches the current URL is highlighted. */
export function SectionTabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="mb-[22px] flex gap-1.5">
      {tabs.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(tab.href + "/");
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={
              "rounded-full border px-4 py-[7px] text-[13px] font-semibold " +
              (active
                ? "border-ink bg-ink text-white"
                : "border-line-strong bg-white text-ink hover:border-ink")
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
