import { existsSync, readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { db } from "../src/server/db/client";
import { hostel, staffUser } from "../src/server/db/schema";
import { HOSTELS } from "../src/lib/constants";

type SeedStaff = {
  name: string;
  email: string;
  role: "Caretaker" | "Supervisor" | "Warden";
  hostel?: string; // hostel id such as "satluj"; leave out for the Supervisor
};

async function main() {
  await db
    .insert(hostel)
    .values(HOSTELS.map((h) => ({ hostelId: h.id, name: h.name, type: h.type })))
    .onConflictDoNothing();
  console.log(`Hostels ready (${HOSTELS.length}).`);

  const file = "scripts/seed-staff.json"; // git-ignored: real emails stay out of Git
  if (!existsSync(file)) {
    console.log(`${file} not found, staff skipped.`);
    return;
  }
  const rows = JSON.parse(readFileSync(file, "utf8")) as SeedStaff[];
  for (const r of rows) {
    await db
      .insert(staffUser)
      .values({
        staffId: randomUUID(),
        fullName: r.name,
        googleEmail: r.email.trim().toLowerCase(),
        role: r.role,
        hostelId: r.role === "Supervisor" ? null : (r.hostel ?? null),
      })
      .onConflictDoNothing(); // safe to run twice: the email is unique
  }
  console.log(`Staff rows processed: ${rows.length}.`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
