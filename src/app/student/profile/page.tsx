import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ProfileForm } from "@/components/student/ProfileForm";
import { displayName, parseStudentEmail } from "@/lib/student-identity";

export default async function StudentProfilePage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const id = parseStudentEmail(email);

  return (
    <ProfileForm
      values={{
        name: displayName(session?.user?.name, id),
        rollNo: id.rollNo,
        email: id.email,
        batch: id.batch,
        // Not known yet: filled from the database once the profile can be saved.
        hostel: null,
        wing: null,
        room: null,
        course: null,
      }}
    />
  );
}
