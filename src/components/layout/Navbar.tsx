"use client";

import { signOut } from "next-auth/react";

type NavbarProps = {
  userEmail: string;
  roleLabel: string; // e.g. "Student"
  tabColor: string;  // colour of the line under the role tab
};

export function Navbar({ userEmail, roleLabel, tabColor }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-ink text-white">
      <div className="mx-auto max-w-[1140px] px-5 pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 pb-3">
          <h1 className="text-lg font-semibold">Hostel Management System</h1>
          <span className="text-[12.5px] text-[#B9C2CC]">{userEmail}</span>
          <button
            type="button"
            onClick={() => signOut({ redirectTo: "/login" })}
            className="whitespace-nowrap rounded-[3px] border border-white/35 px-3 py-[7px] text-[12.5px] font-semibold text-[#E8ECEE] hover:border-white"
          >
            Log out
          </button>
        </div>
        <div role="tablist" aria-label="Role" className="flex gap-1">
          <span
            role="tab"
            aria-selected="true"
            className="whitespace-nowrap rounded-t-[3px] border-b-[3px] bg-white/[0.06] px-4 py-2.5 font-display text-sm font-semibold text-white"
            style={{ borderBottomColor: tabColor }}
          >
            {roleLabel}
          </span>
        </div>
      </div>
    </header>
  );
}
