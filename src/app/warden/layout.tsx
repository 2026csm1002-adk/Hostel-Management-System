import { RoleLayout } from "@/components/layout/RoleLayout";
import { HOSTELS } from "@/lib/constants";
import { requirePageRole } from "@/server/page-guards";

export default async function WardenLayout({ children }: { children: React.ReactNode }) {
  const user = await requirePageRole("Warden");
  const hostel = HOSTELS.find((h) => h.id === user.hostelId)?.name ?? "No hostel assigned";

  return (
    <RoleLayout
      email={user.email!}
      roleLabel="Warden"
      accent="indigo"
      title="Room-swap decisions"
      subtitle="Review requests forwarded by your caretaker and decide."
      chipText={`Warden · ${hostel}`}
    >
      {children}
    </RoleLayout>
  );
}
