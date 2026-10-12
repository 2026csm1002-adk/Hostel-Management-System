import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Navbar } from "@/components/layout/Navbar";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentTabs } from "@/components/student/StudentTabs";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  return (
    <>
      <Navbar userEmail={email} roleLabel="Student" tabColor="#2E8C7B" />
      <main className="mx-auto max-w-[1140px] px-5 pb-20 pt-7">
        <PageHeader
          title="My hostel"
          subtitle="Book a cleaning slot, raise a complaint, or request a room swap — using the hostel details already on your profile."
        >
          <span className="inline-flex items-center gap-[7px] rounded-[3px] border border-teal/35 bg-teal-soft px-2.5 py-1.5 font-mono text-xs font-semibold text-teal">
            <span className="h-[7px] w-[7px] rounded-full bg-teal" />
            Student
          </span>
        </PageHeader>
        <StudentTabs />
        {children}
      </main>
    </>
  );
}
