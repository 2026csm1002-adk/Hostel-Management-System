import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { HOSTELS, STAFF_ROLES } from "@/lib/constants";
import type { staffUser } from "@/server/db/schema";

type StaffRow = typeof staffUser.$inferSelect;

// TEMPORARY: staff come from scripts/seed-staff.json (git-ignored; copy
// scripts/seed-staff.example.json and put real emails in it). The file is read on every
// call, so edits show up without restarting the server. Set DEV_STAFF_FILE to use another file.
//
// DB SWAP: delete loadStaff() and turn each method into a Drizzle query on `staff_user`:
//   findByEmail: db.select().from(staffUser).where(eq(staffUser.googleEmail, email)).limit(1)
//   findById:    ... where(eq(staffUser.staffId, id))
//   findWardenOfHostel: ... where(and(eq(role, "Warden"), eq(hostelId, hostelId))).limit(1)
// `npm run db:seed` loads the same JSON file into the table.

type SeedStaff = { name: string; email: string; role: string; hostel?: string };

// The file is re-read on every call, so warn about a problem only once.
const warned = new Set<string>();
function warn(message: string) {
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(`[staff] ${message}`);
}

function loadStaff(): StaffRow[] {
  const file = process.env.DEV_STAFF_FILE ?? path.join(process.cwd(), "scripts", "seed-staff.json");
  if (!existsSync(file)) return [];

  let raw: SeedStaff[];
  try {
    raw = JSON.parse(readFileSync(file, "utf8"));
  } catch {
    warn(`${file} is not valid JSON. No staff loaded.`);
    return [];
  }

  const rows: StaffRow[] = [];
  for (const r of raw) {
    const email = r.email?.trim().toLowerCase();
    if (!email || !(STAFF_ROLES as readonly string[]).includes(r.role)) {
      warn(`skipped an entry with a missing email or unknown role: ${JSON.stringify(r)}`);
      continue;
    }
    if (r.role !== "Supervisor" && !HOSTELS.some((h) => h.id === r.hostel)) {
      warn(`${email}: ${r.role} needs a valid "hostel" id. Skipped.`);
      continue;
    }
    rows.push({
      staffId: "staff-" + createHash("sha1").update(email).digest("hex").slice(0, 12),
      fullName: r.name,
      googleEmail: email,
      role: r.role,
      hostelId: r.role === "Supervisor" ? null : (r.hostel ?? null),
    });
  }
  return rows;
}

export const staffUserRepo = {
  async findById(staffId: string): Promise<StaffRow | undefined> {
    return loadStaff().find((s) => s.staffId === staffId);
  },
  async findByEmail(email: string): Promise<StaffRow | undefined> {
    return loadStaff().find((s) => s.googleEmail === email);
  },
  async findWardenOfHostel(hostelId: string): Promise<StaffRow | undefined> {
    return loadStaff().find((s) => s.role === "Warden" && s.hostelId === hostelId);
  },
};
