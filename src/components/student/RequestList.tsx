"use client";

import { useEffect, useState } from "react";
import { COMPLAINT_CATEGORIES } from "@/lib/constants";
import { apiFetch, errorMessage } from "@/lib/api-client";
import { formatDateLabel } from "@/lib/dates";
import type { CleaningBookingDTO, ComplaintDTO, SwapDTO } from "@/types";
import { StatusChip } from "./StatusChip";

type Row = {
  id: string;
  kind: "cleaning" | "complaint" | "swap";
  category?: string;
  typeLabel: string;
  title: string;
  meta: string;
  status: string;
  open: boolean;
  sortKey: string; // newest first; cleaning uses its booking time, so upcoming bookings come first
  notes: string[];
  reregisterId?: string;
};

const shortId = (id: string) => id.slice(0, 8).toUpperCase();
const day = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

function buildRows(c: CleaningBookingDTO[], q: ComplaintDTO[], s: SwapDTO[]): Row[] {
  const rows: Row[] = [
    ...c.map<Row>((b) => ({
      id: b.id,
      kind: "cleaning",
      typeLabel: "Room cleaning",
      title: `${b.floorLabel} · ${b.label} · ${formatDateLabel(b.date)}`,
      meta: `Room ${b.roomNo} · seat ${b.seat}`,
      status: b.status,
      open: b.status === "Confirmed",
      sortKey: `${b.date}T${b.slotStart}`,
      notes: [],
    })),
    ...q.map<Row>((x) => ({
      id: x.id,
      kind: "complaint",
      category: x.category,
      typeLabel: `Complaint · ${x.category}`,
      title: x.description,
      meta: `${day(x.createdAt)} · ${x.daysOld} day${x.daysOld === 1 ? "" : "s"} ago`,
      status: x.status,
      open: x.status !== "Resolved",
      sortKey: x.createdAt,
      notes: [
        ...(x.reregisteredFrom ? [`Re-registered from ${shortId(x.reregisteredFrom)} after no response within a week.`] : []),
        ...(x.reregistered ? ["Re-registered — see the newer ticket."] : []),
      ],
      reregisterId: x.canReregister ? x.id : undefined,
    })),
    ...s.map<Row>((x) => ({
      id: x.id,
      kind: "swap",
      typeLabel: "Room swap",
      title: x.reason,
      meta: day(x.createdAt),
      status: x.status,
      open: !["Rejected", "RoomAssigned"].includes(x.status),
      sortKey: x.createdAt,
      notes: [
        ...(x.wardenComment ? [`Warden’s note: ${x.wardenComment}`] : []),
        ...(x.assignedRoom ? [`New room assigned: ${x.assignedRoom}`] : []),
        ...(x.attachmentName ? [`Attachment: ${x.attachmentName}`] : []),
      ],
    })),
  ];
  return rows.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

type Loaded = { key: string; rows: Row[]; error: string | null };

export function RequestList({ refreshKey }: { refreshKey: number }) {
  const [tick, setTick] = useState(0);
  const [filter, setFilter] = useState("All");
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const key = `${refreshKey}-${tick}`;

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      apiFetch<{ bookings: CleaningBookingDTO[] }>("/api/cleaning/bookings"),
      apiFetch<{ complaints: ComplaintDTO[] }>("/api/complaints"),
      apiFetch<{ swaps: SwapDTO[] }>("/api/swaps"),
    ])
      .then(([b, c, s]) => !cancelled && setLoaded({ key, rows: buildRows(b.bookings, c.complaints, s.swaps), error: null }))
      .catch((e) => !cancelled && setLoaded({ key, rows: [], error: errorMessage(e) }));
    return () => {
      cancelled = true;
    };
  }, [key]);

  async function reregister(id: string) {
    setActionError(null);
    try {
      await apiFetch(`/api/complaints/${id}/reregister`, { method: "POST" });
      setTick((n) => n + 1);
    } catch (e) {
      setActionError(errorMessage(e));
    }
  }

  const rows = loaded?.rows ?? [];
  const visible = rows.filter((r) => {
    if (filter === "All") return true;
    if (filter === "Cleaning") return r.kind === "cleaning";
    if (filter === "Swap") return r.kind === "swap";
    return r.kind === "complaint" && r.category === filter;
  });
  const openCount = rows.filter((r) => r.open).length;

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-[15px]">My requests</h3>
        <span className="font-mono text-xs text-ink-soft">{openCount} open</span>
      </div>

      <div className="mb-3.5 flex flex-wrap gap-1.5">
        {["All", "Cleaning", "Swap", ...COMPLAINT_CATEGORIES].map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={
              "rounded-full border px-3 py-1 text-xs font-semibold " +
              (filter === f ? "border-ink bg-ink text-white" : "border-line-strong bg-white hover:border-ink")
            }
          >
            {f}
          </button>
        ))}
      </div>

      {loaded?.error && <p className="mb-3 text-sm text-brick">{loaded.error}</p>}
      {actionError && <p className="mb-3 text-sm text-brick">{actionError}</p>}

      {loaded === null ? (
        <p className="text-sm text-ink-soft">Loading your requests…</p>
      ) : visible.length === 0 ? (
        <p className="rounded-[3px] border border-dashed border-line-strong p-[18px] text-center text-[13px] text-ink-soft">
          {rows.length === 0
            ? "No requests yet. Your cleaning bookings, complaints and room-swap requests will appear here."
            : "No requests match this filter."}
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {visible.map((r) => (
            <li key={`${r.kind}-${r.id}`} className="flex items-start justify-between gap-3 rounded-[3px] border border-line bg-white p-3.5">
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11.5px] font-semibold text-ink-soft">{shortId(r.id)}</span>
                  <span className="text-[11.5px] text-ink-soft">{r.typeLabel}</span>
                </div>
                <div className="break-words text-sm font-medium">{r.title}</div>
                <div className="mt-1 text-xs text-ink-soft">{r.meta}</div>
                {r.notes.map((n) => (
                  <div key={n} className="mt-1.5 rounded-[3px] bg-paper px-2.5 py-1.5 text-xs text-ink-soft">
                    {n}
                  </div>
                ))}
                {r.reregisterId && (
                  <button
                    type="button"
                    onClick={() => reregister(r.reregisterId!)}
                    className="mt-2 rounded-[3px] border border-line-strong px-3 py-1.5 text-xs font-semibold hover:border-ink"
                  >
                    Re-register complaint
                  </button>
                )}
              </div>
              <StatusChip status={r.status} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
