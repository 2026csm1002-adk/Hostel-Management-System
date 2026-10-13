"use client";

import { useState } from "react";
import { COMPLAINT_CATEGORIES, COMPLAINT_MAX_CHARS } from "@/lib/constants";
import { apiFetch, errorMessage } from "@/lib/api-client";

export function ComplaintForm({ onCreated }: { onCreated: () => void }) {
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit() {
    if (!category) return;
    setBusy(true);
    setMessage(null);
    try {
      await apiFetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, description }),
      });
      setCategory(null);
      setDescription("");
      setMessage({ ok: true, text: "Complaint submitted. Track it under My requests." });
      onCreated();
    } catch (e) {
      setMessage({ ok: false, text: errorMessage(e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-3.5">
        <div className="mb-1.5 text-[12.5px] font-semibold">Category</div>
        <div className="flex flex-wrap gap-2">
          {COMPLAINT_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={
                "rounded-full border px-3 py-1.5 text-[13px] font-semibold " +
                (category === c ? "border-teal bg-teal text-white" : "border-line-strong bg-white hover:border-teal")
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3.5">
        <label htmlFor="complaint-desc" className="mb-1.5 block text-[12.5px] font-semibold">
          What&apos;s the problem?
        </label>
        <textarea
          id="complaint-desc"
          rows={4}
          maxLength={COMPLAINT_MAX_CHARS}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Ceiling fan in my room is making a grinding noise."
          className="w-full rounded-[3px] border border-line-strong bg-white px-[11px] py-[9px]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={!category || description.trim() === "" || busy}
          className="rounded-[3px] bg-teal px-[18px] py-2.5 font-display text-[13.5px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Submitting…" : "Submit complaint"}
        </button>
        {message && (
          <span role="status" className={"text-[12.5px] " + (message.ok ? "text-green" : "text-brick")}>
            {message.text}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs text-ink-soft">
        Sent to your hostel&apos;s caretaker with your room details attached — no need to repeat them.
      </p>
    </div>
  );
}
