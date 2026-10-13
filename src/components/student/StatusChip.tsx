// One chip for every status of every request type. Full class names are written out
// so Tailwind can see them.
const STYLES: Record<string, { label: string; className: string }> = {
  Open: { label: "Open", className: "bg-amber-soft text-amber" },
  InProgress: { label: "In progress", className: "bg-indigo-soft text-indigo" },
  Resolved: { label: "Resolved", className: "bg-green-soft text-green" },
  Confirmed: { label: "Confirmed", className: "bg-teal-soft text-teal" },
  Done: { label: "Done", className: "bg-green-soft text-green" },
  Pending: { label: "Pending", className: "bg-amber-soft text-amber" },
  Forwarded: { label: "Forwarded", className: "bg-indigo-soft text-indigo" },
  Accepted: { label: "Accepted", className: "bg-green-soft text-green" },
  AwaitingRoom: { label: "Awaiting room", className: "bg-amber-soft text-amber" },
  RoomAssigned: { label: "Room assigned", className: "bg-green-soft text-green" },
  Rejected: { label: "Rejected", className: "bg-brick-soft text-brick" },
  Waiting: { label: "Waiting", className: "bg-amber-soft text-amber" },
};

export function StatusChip({ status }: { status: string }) {
  const s = STYLES[status] ?? { label: status, className: "bg-paper text-ink-soft" };
  return (
    <span className={"whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[11.5px] font-semibold " + s.className}>
      {s.label}
    </span>
  );
}
