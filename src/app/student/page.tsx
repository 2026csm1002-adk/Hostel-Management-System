import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { parseStudentEmail } from "@/lib/student-identity";

export default async function StudentHome() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  // Roll no and batch come from the email; everything else comes from the saved profile (/api/profile).
  const id = parseStudentEmail(email);
  return <StudentDashboard fallback={{ rollNo: id.rollNo, batch: id.batch }} />;
}
