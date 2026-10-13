import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ProfileForm } from "@/components/student/ProfileForm";
import { displayName, parseStudentEmail } from "@/lib/student-identity";

export default async function StudentProfilePage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const id = parseStudentEmail(email);

  // Saved values (hostel, wing, room, course) are loaded by the form from /api/profile.
  return (
    <ProfileForm
      identity={{
        name: displayName(session?.user?.name, id),
        rollNo: id.rollNo,
        email: id.email,
        batch: id.batch,
      }}
    />
  );
}
