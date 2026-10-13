import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createTestDatabase } from "../setup-test-db";
import { hostel, student } from "../../src/server/db/schema";
import { eq } from "drizzle-orm";

describe("Integration: Hostel & Student Records", () => {
  let db: Awaited<ReturnType<typeof createTestDatabase>>["db"];
  let client: Awaited<ReturnType<typeof createTestDatabase>>["client"];

  beforeEach(async () => {
    const env = await createTestDatabase();
    db = env.db;
    client = env.client;

    // Seed hostel
    await db.insert(hostel).values({
      hostelId: "H-01",
      name: "Satluj Hostel",
      type: "Boys",
    });
  });

  afterEach(() => {
    client.close();
  });

  it("inserts student linked to hostel", async () => {
    await db.insert(student).values({
      studentId: "2026CSM1002",
      fullName: "Aditya Kumar",
      googleEmail: "aditya@example.com",
      hostelId: "H-01",
      wing: "B",
      roomNo: "204",
      course: "MTech",
      batch: "2026",
    });

    const [res] = await db
      .select()
      .from(student)
      .where(eq(student.studentId, "2026CSM1002"));

    expect(res.fullName).toBe("Aditya Kumar");
  });
});