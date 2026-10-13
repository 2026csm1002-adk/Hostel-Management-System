import type { StudentProfile } from "@/types";

type Props = {
  profile: StudentProfile | null;
  fallback: { rollNo: string | null; batch: string | null }; // from the email, used until a profile is saved
};

export function IdStrip({ profile, fallback }: Props) {
  const items = [
    { label: "Roll No", value: profile?.studentId ?? fallback.rollNo },
    { label: "Hostel", value: profile?.hostelName ?? null },
    { label: "Wing", value: profile?.wing ?? null },
    { label: "Room", value: profile?.roomNo ?? null },
    { label: "Floor", value: profile?.floorLabel ?? null },
    { label: "Course", value: profile?.course ?? null },
    { label: "Batch", value: profile?.batch ?? fallback.batch },
  ];

  return (
    <div className="mb-[26px] flex flex-wrap overflow-hidden rounded-[3px] border border-line bg-white">
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-[110px] flex-1 border-r border-dashed border-line-strong px-4 py-[13px] last:border-r-0"
        >
          <div className="mb-[3px] text-[11px] text-ink-soft">{item.label}</div>
          <div className={"font-mono text-sm font-semibold " + (item.value ? "" : "font-medium text-ink-soft")}>
            {item.value ?? "—"}
          </div>
        </div>
      ))}
    </div>
  );
}
