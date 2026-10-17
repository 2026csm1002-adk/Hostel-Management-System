import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ROLE_HOME } from "@/lib/constants";
import type { Role } from "@/types";

/** For layouts: the signed-in user if they have this role, otherwise a redirect. */
export async function requirePageRole(role: Role) {
  const session = await auth();
  const user = session?.user;
  if (!user?.email) redirect("/login");
  if (user.role !== role) redirect(ROLE_HOME[user.role]);
  return user;
}
