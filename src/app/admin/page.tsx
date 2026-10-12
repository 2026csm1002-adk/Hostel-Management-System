import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

// TEMPORARY dummy page: proves the Admin login works. Replace with the real admin home,
// or move into the caretaker / supervisor / warden areas once roles are decided.
export default async function AdminHome() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { name, email } = session.user;

  return (
    <main className="mx-auto max-w-xl p-8">
      <span className="rounded-[3px] bg-[#E6E9F3] px-2 py-1 text-xs font-semibold text-[#3B4C86]">
        Admin
      </span>
      <h1 className="mt-4 text-2xl font-semibold">Admin home (dummy page)</h1>
      <dl className="mt-6 space-y-2 text-sm">
        <div>
          <dt className="text-[#5B6572]">Name</dt>
          <dd className="font-medium">{name ?? "(no name)"}</dd>
        </div>
        <div>
          <dt className="text-[#5B6572]">Email</dt>
          <dd className="font-medium">{email}</dd>
        </div>
      </dl>
      <form
        className="mt-8"
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit" className="rounded-[3px] border border-[#B9C3BD] px-4 py-2 text-sm font-medium">
          Sign out
        </button>
      </form>
    </main>
  );
}
