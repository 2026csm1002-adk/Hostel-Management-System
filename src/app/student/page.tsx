import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ActionStubs } from "@/components/student/ActionStubs";
import { parseStudentEmail } from "@/lib/student-identity";

export default async function StudentHome() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const id = parseStudentEmail(email);

  // Only roll number and batch are known from the email. The rest comes from the profile later.
  const strip = [
    { label: "Roll No", value: id.rollNo },
    { label: "Hostel", value: null },
    { label: "Wing", value: null },
    { label: "Room", value: null },
    { label: "Course", value: null },
    { label: "Batch", value: id.batch },
  ];

  return (
    <>
      <div className="mb-[26px] flex flex-wrap overflow-hidden rounded-[3px] border border-line bg-white">
        {strip.map((item) => (
          <div
            key={item.label}
            className="min-w-[130px] flex-1 border-r border-dashed border-line-strong px-4 py-[13px] last:border-r-0"
          >
            <div className="mb-[3px] text-[11px] text-ink-soft">{item.label}</div>
            <div
              className={
                "font-mono text-sm font-semibold " + (item.value ? "" : "font-medium text-ink-soft")
              }
            >
              {item.value ?? "—"}
            </div>
          </div>
        ))}
      </div>

      <ActionStubs />

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-[15px]">My requests</h3>
        <span className="font-mono text-xs text-ink-soft">0 open</span>
      </div>
      <p className="rounded-[3px] border border-dashed border-line-strong p-[18px] text-center text-[13px] text-ink-soft">
        No requests yet. Your cleaning bookings, complaints and room-swap requests will appear here.
      </p>
    </>
  );
}
