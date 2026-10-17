import { RoleLayout } from "@/components/layout/RoleLayout";
import { requirePageRole } from "@/server/page-guards";

export default async function SupervisorLayout({ children }: { children: React.ReactNode }) {
  const user = await requirePageRole("Supervisor");

  return (
    <RoleLayout
      email={user.email!}
      roleLabel="Cleaning Supervisor"
      accent="green"
      title="Cleaning schedule"
      subtitle="Which rooms are booked, on which floor and in which slot, across all hostels."
      chipText="Supervisor · All hostels"
    >
      {children}
    </RoleLayout>
  );
}
