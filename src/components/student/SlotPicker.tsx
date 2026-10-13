"use client";

import { useEffect, useState } from "react";
import { apiFetch, errorMessage } from "@/lib/api-client";
import { bookableDates, formatDateLabel, todayISO } from "@/lib/dates";
import type { SlotAvailability, StudentProfile } from "@/types";

type Loaded = { date: string; slots: SlotAvailability[]; error: string | null };

export function SlotPicker({ profile, onBooked }: { profile: StudentProfile; onBooked: () => void }) {
  // Dates come from "today", so they are worked out after the page loads.
  const [dates] = useState(() => bookableDates(todayISO()));
  const [date, setDate] = useState(dates[0]);
  const [slotStart, setSlotStart] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [reload, setReload] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    apiFetch<{ slots: SlotAvailability[] }>(`/api/cleaning/slots?date=${date}`)
      .then((d) => !cancelled && setLoaded({ date, slots: d.slots, error: null }))
      .catch((e) => !cancelled && setLoaded({ date, slots: [], error: errorMessage(e) }));
    return () => {
      cancelled = true;
    };
  }, [date, reload]);

  const slots = loaded?.date === date ? loaded.slots : null;

  async function confirm() {
    if (!slotStart) return;
    setBusy(true);
    setMessage(null);
    try {
      await apiFetch("/api/cleaning/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, slotStart }),
      });
      setMessage({ ok: true, text: "Cleaning booked. See it under My requests." });
      setSlotStart(null);
      onBooked();
    } catch (e) {
      setMessage({ ok: false, text: errorMessage(e) });
    } finally {
      setBusy(false);
      setReload((n) => n + 1); // always show fresh seat counts
    }
  }

  return (
    <div>
      <p className="mb-3 text-[13px] text-ink-soft">
        Booking for room <strong className="text-ink">{profile.roomNo}</strong> on the{" "}
        <strong className="text-ink">{profile.floorLabel}</strong> of {profile.hostelName}.
      </p>

      <div className="mb-3 flex flex-wrap gap-2">
        {dates.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={d === date}
            onClick={() => {
              setDate(d);
              setSlotStart(null);
              setMessage(null);
            }}
            className={
              "rounded-[3px] border px-3 py-1.5 text-[13px] font-semibold " +
              (d === date ? "border-teal bg-teal text-white" : "border-line-strong bg-white hover:border-teal")
            }
          >
            {formatDateLabel(d)}
          </button>
        ))}
      </div>

      {loaded?.date === date && loaded.error && <p className="mb-3 text-sm text-brick">{loaded.error}</p>}

      <div className="mb-4 grid gap-2.5 sm:grid-cols-3">
        {slots === null
          ? Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-[58px] animate-pulse rounded-[3px] border border-line bg-paper" />
            ))
          : slots.map((s) => {
              const disabled = s.status === "Full" || s.bookedByMe;
              const selected = slotStart === s.slotStart;
              return (
                <button
                  key={s.slotStart}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  onClick={() => setSlotStart(s.slotStart)}
                  className={
                    "rounded-[3px] border px-3 py-2.5 text-left disabled:cursor-not-allowed disabled:opacity-60 " +
                    (selected
                      ? "border-teal bg-teal-soft"
                      : s.status === "Full"
                        ? "border-line bg-paper"
                        : "border-line-strong bg-white hover:border-teal")
                  }
                >
                  <span className="block font-mono text-[13px] font-semibold">{s.label}</span>
                  <span className={"text-xs " + (s.status === "Full" ? "text-brick" : "text-ink-soft")}>
                    {s.bookedByMe ? "Booked by your room" : `${s.filled}/${s.capacity} ${s.status}`}
                  </span>
                </button>
              );
            })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={confirm}
          disabled={!slotStart || busy}
          className="rounded-[3px] bg-teal px-[18px] py-2.5 font-display text-[13.5px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Booking…" : "Confirm booking"}
        </button>
        {message && (
          <span role="status" className={"text-[12.5px] " + (message.ok ? "text-green" : "text-brick")}>
            {message.text}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs text-ink-soft">
        Slots run 9:00 AM–1:00 PM and 2:00–4:00 PM. Each floor allows a maximum of 3 rooms per one-hour slot, and
        bookings must be made 2–4 days ahead. Your room number and floor come from your profile.
      </p>
    </div>
  );
}
