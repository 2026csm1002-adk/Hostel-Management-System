import { RoleLayout } from "@/components/layout/RoleLayout";
import { HOSTELS } from "@/lib/constants";
import { requirePageRole } from "@/server/page-guards";

export default async function CaretakerLayout({ children }: { children: React.ReactNode }) {
  const user = await requirePageRole("Caretaker");
  const hostel = HOSTELS.find((h) => h.id === user.hostelId)?.name ?? "No hostel assigned";

  return (
    <RoleLayout
      email={user.email!}
      roleLabel="Caretaker"
      accent="amber"
      title="Caretaker queue"
      subtitle="Complaints and room-swap requests from students of your hostel."
      chipText={`Caretaker · ${hostel}`}
      tabs={[
        { href: "/caretaker/complaints", label: "Complaints" },
        { href: "/caretaker/swaps", label: "Swap requests" },
      ]}
    >
      {children}
    </RoleLayout>
  );
}
