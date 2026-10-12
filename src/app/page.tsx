import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Only routes people. TEMPORARY: everyone goes to /student.
// Later: send each role to its own home (see ROLE_HOME in src/lib/constants.ts).
export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  redirect("/student");
}
