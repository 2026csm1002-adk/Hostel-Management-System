"use client";

import Link from "next/link";
import { useState } from "react";
import type { StudentProfile } from "@/types";
import { ComplaintForm } from "./ComplaintForm";
import { SlotPicker } from "./SlotPicker";
import { SwapForm } from "./SwapForm";

type Props = {
  profile: StudentProfile | null; // null = profile not saved yet
  onCreated: () => void;          // called after any booking / complaint / swap, to refresh the list
};

const ACTIONS = [
  { key: "cleaning", number: "01", title: "Book room cleaning" },
  { key: "complaint", number: "02", title: "Submit a complaint" },
  { key: "swap", number: "03", title: "Request room swap" },
] as const;

export function StudentActions({ profile, onCreated }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="mb-[30px]">
      <div className="grid gap-3.5 sm:grid-cols-3">
        {ACTIONS.map((a) => {
          const isOpen = open === a.key;
          return (
            <button
              key={a.key}
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : a.key)}
              className={
                "relative block w-full rounded-[3px] border px-4 pb-3.5 pt-4 text-left " +
                (isOpen ? "border-teal bg-teal-soft" : "border-line bg-white hover:border-teal")
              }
            >
              <span className="mb-1.5 block font-mono text-[11px] text-ink-soft">{a.number}</span>
              <span className="font-display text-[15.5px] font-semibold">{a.title}</span>
              <span className="absolute right-3.5 top-4 text-[13px] text-ink-soft">{isOpen ? "−" : "+"}</span>
            </button>
          );
        })}
      </div>

      {open && (
        <div className="mt-3.5 rounded-[3px] border border-line bg-white p-[18px]">
          {!profile ? (
            <p className="text-sm text-ink-soft">
              Please{" "}
              <Link href="/student/profile" className="font-semibold text-teal underline">
                complete your profile
              </Link>{" "}
              first. Your hostel, wing and room are attached to every request automatically.
            </p>
          ) : open === "cleaning" ? (
            <SlotPicker profile={profile} onBooked={onCreated} />
          ) : open === "complaint" ? (
            <ComplaintForm onCreated={onCreated} />
          ) : (
            <SwapForm onCreated={onCreated} />
          )}
        </div>
      )}
    </div>
  );
}
