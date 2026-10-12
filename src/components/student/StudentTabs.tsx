"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/student", label: "Requests" },
  { href: "/student/profile", label: "Profile" },
];

export function StudentTabs() {
  const pathname = usePathname();
  const onProfile = pathname.startsWith("/student/profile");

  return (
    <nav aria-label="Student section" className="mb-[22px] flex gap-1.5">
      {TABS.map((tab) => {
        const active = tab.href === "/student/profile" ? onProfile : !onProfile;
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
