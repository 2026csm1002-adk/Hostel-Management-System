import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ForbiddenError } from "@/server/errors";
import { requireHostel, requireRole, resolveRole } from "@/server/services/auth.service";

// Use a throw-away staff list instead of scripts/seed-staff.json.
const file = path.join(tmpdir(), `hms-staff-${process.pid}.json`);
writeFileSync(
  file,
  JSON.stringify([
    { name: "C", email: "Care@iitrpr.ac.in", role: "Caretaker", hostel: "satluj" },
    { name: "W", email: "ward@iitrpr.ac.in", role: "Warden", hostel: "beas" },
    { name: "S", email: "sup@iitrpr.ac.in", role: "Supervisor" },
    { name: "Bad", email: "bad@iitrpr.ac.in", role: "Caretaker" }, // caretaker without hostel: ignored
    { name: "Bad2", email: "bad2@iitrpr.ac.in", role: "Janitor", hostel: "beas" }, // unknown role: ignored
  ]),
);
process.env.DEV_STAFF_FILE = file;

describe("Integration: role lookup and guards", () => {
  it("staff emails get their role and hostel (email match ignores case)", async () => {
    expect(await resolveRole("care@iitrpr.ac.in")).toMatchObject({ role: "Caretaker", hostelId: "satluj" });
    expect(await resolveRole("WARD@iitrpr.ac.in")).toMatchObject({ role: "Warden", hostelId: "beas" });
    expect(await resolveRole("sup@iitrpr.ac.in")).toMatchObject({ role: "Supervisor", hostelId: null });
  });

  it("anyone else, and invalid staff entries, are students", async () => {
    expect((await resolveRole("2026csm1099@iitrpr.ac.in")).role).toBe("Student");
    expect((await resolveRole("bad@iitrpr.ac.in")).role).toBe("Student");
    expect((await resolveRole("bad2@iitrpr.ac.in")).role).toBe("Student");
  });

  it("requireRole allows listed roles and refuses the rest with 403", () => {
    const user = { email: "a@b.c", role: "Warden" as const, userId: "x", hostelId: "beas" };
    expect(() => requireRole(user, ["Warden"])).not.toThrow();
    expect(() => requireRole(user, ["Caretaker", "Supervisor"])).toThrow(ForbiddenError);
    expect(() => requireRole(null, ["Student"])).toThrow(ForbiddenError);
  });

  it("requireHostel refuses staff without a hostel", () => {
    expect(requireHostel({ hostelId: "beas" })).toBe("beas");
    expect(() => requireHostel({ hostelId: null })).toThrow(ForbiddenError);
  });
});
