"use client";

import { useState } from "react";

// TEMPORARY: the three cards from the prototype. Each opens a short note for now.
// Replace the note with SlotPicker, ComplaintForm and SwapForm when those are built.
const ACTIONS = [
  { key: "cleaning", number: "01", title: "Book room cleaning", note: "Pick a date, floor and time slot. This form is added in the next step." },
  { key: "complaint", number: "02", title: "Submit a complaint", note: "Choose a category and describe the problem. This form is added in the next step." },
  { key: "swap", number: "03", title: "Request room swap", note: "Give a reason and attach a document if needed. This form is added in the next step." },
];

export function ActionStubs() {
  const [open, setOpen] = useState<string | null>(null);
  const current = ACTIONS.find((a) => a.key === open);

  return (
    <div className="mb-[30px]">
      <div className="grid gap-3.5 sm:grid-cols-3">
        {ACTIONS.map((action) => {
          const isOpen = open === action.key;
          return (
            <button
              key={action.key}
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : action.key)}
              className={
                "relative block w-full rounded-[3px] border px-4 pb-3.5 pt-4 text-left " +
                (isOpen ? "border-teal bg-teal-soft" : "border-line bg-white hover:border-teal")
              }
            >
              <span className="mb-1.5 block font-mono text-[11px] text-ink-soft">{action.number}</span>
              <span className="font-display text-[15.5px] font-semibold">{action.title}</span>
              <span className="absolute right-3.5 top-4 text-[13px] text-ink-soft">{isOpen ? "−" : "+"}</span>
            </button>
          );
        })}
      </div>
      {current && (
        <div className="mt-3.5 rounded-[3px] border border-line bg-white p-[18px] text-sm text-ink-soft">
          {current.note}
        </div>
      )}
    </div>
  );
}
