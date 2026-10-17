import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ROLE_HOME } from "@/lib/constants";

// Only routes people: each role goes to its own home (ROLE_HOME in src/lib/constants.ts).
export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  redirect(ROLE_HOME[session.user.role]);
}
