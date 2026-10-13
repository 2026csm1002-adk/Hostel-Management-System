import { beforeEach, describe, expect, it } from "vitest";
import { addDays, todayISO } from "@/lib/dates";
import { memory, resetMemoryStore } from "@/server/db/memory-store";
import { cleaningService } from "@/server/services/cleaning.service";
import { complaintService } from "@/server/services/complaint.service";
import { profileService } from "@/server/services/profile.service";
import { swapService } from "@/server/services/swap.service";

const profile = (n: number, room = "207") => ({
  fullName: `Student ${n}`, hostelId: "satluj", wing: "se", roomNo: room, course: "MTech" as const,
});
const email = (n: number) => `2026csm10${String(n).padStart(2, "0")}@iitrpr.ac.in`;
const date = () => addDays(todayISO(), 2);

describe("Integration: student services (in-memory store)", () => {
  beforeEach(resetMemoryStore);

  it("profile: derives floor, keeps roll no read-only, rejects bad rooms", async () => {
    const p = await profileService.upsertProfile(email(1), profile(1, "105"));
    expect(p.studentId).toBe("2026CSM1001");
    expect(p.floor).toBe(0);
    expect(p.floorLabel).toBe("Ground floor");
    expect(p.wing).toBe("SE");
    const again = await profileService.upsertProfile(email(1), { ...profile(1, "309"), rollNo: "HACKED0001" });
    expect(again.studentId).toBe("2026CSM1001");
    expect(again.floor).toBe(2);
    await expect(profileService.upsertProfile(email(2), profile(2, "45"))).rejects.toThrow();
  });

  it("everything needs a profile first", async () => {
    await expect(complaintService.create(email(9), { category: "Plumbing", description: "x" })).rejects.toThrow(/profile/i);
    expect(await cleaningService.listMine(email(9))).toEqual([]);
  });

  it("cleaning: window, seats 1-3, fourth student gets 'full', same room cannot double-book", async () => {
    for (let n = 1; n <= 4; n++) await profileService.upsertProfile(email(n), profile(n, `20${n}`));
    await expect(cleaningService.bookSlot(email(1), { date: todayISO(), slotStart: "09:00" })).rejects.toThrow(/2 to 4/);

    const results = await Promise.allSettled(
      [1, 2, 3, 4].map((n) => cleaningService.bookSlot(email(n), { date: date(), slotStart: "09:00" })),
    );
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(3);
    const seats = results.flatMap((r) => (r.status === "fulfilled" ? [r.value.seat] : [])).sort();
    expect(seats).toEqual([1, 2, 3]);
    const rejected = results.find((r) => r.status === "rejected") as PromiseRejectedResult;
    expect(rejected.reason.message).toMatch(/full/i);

    const slots = await cleaningService.getAvailability(email(1), date());
    expect(slots[0]).toMatchObject({ filled: 3, status: "Full" });
    await expect(cleaningService.bookSlot(email(1), { date: date(), slotStart: "09:00" })).rejects.toThrow(/already/);
  });

  it("cleaning: different floors have separate capacity", async () => {
    await profileService.upsertProfile(email(1), profile(1, "105")); // ground
    await profileService.upsertProfile(email(2), profile(2, "305")); // 2nd
    await cleaningService.bookSlot(email(1), { date: date(), slotStart: "10:00" });
    const slots = await cleaningService.getAvailability(email(2), date());
    expect(slots[1].filled).toBe(0);
  });

  it("complaints: create, list, re-register rules", async () => {
    await profileService.upsertProfile(email(1), profile(1));
    const c = await complaintService.create(email(1), { category: "Electrical", description: "Fan broken" });
    expect(c.status).toBe("Open");
    await expect(complaintService.reregister(email(1), c.id)).rejects.toThrow(/7 days/);

    memory.complaints[0].createdAt = new Date(Date.now() - 8 * 86_400_000).toISOString();
    expect((await complaintService.listMine(email(1)))[0].canReregister).toBe(true);
    const fresh = await complaintService.reregister(email(1), c.id);
    expect(fresh.reregisteredFrom).toBe(c.id);
    await expect(complaintService.reregister(email(1), c.id)).rejects.toThrow(/already/);

    const list = await complaintService.listMine(email(1));
    expect(list.find((x) => x.id === c.id)?.reregistered).toBe(true);

    await profileService.upsertProfile(email(2), profile(2));
    await expect(complaintService.reregister(email(2), c.id)).rejects.toThrow(/not found/i);
  });

  it("swap: submits as Pending with optional attachment; rejects bad files", async () => {
    await profileService.upsertProfile(email(1), profile(1));
    const plain = await swapService.submit(email(1), { reason: "Need a quieter room" });
    expect(plain).toMatchObject({ status: "Pending", attachmentName: null });

    const pdf = new File(["x"], "certificate.pdf", { type: "application/pdf" });
    const withFile = await swapService.submit(email(1), { reason: "Medical reason" }, pdf);
    expect(withFile.attachmentName).toBe("certificate.pdf");

    await expect(
      swapService.submit(email(1), { reason: "Medical reason" }, new File(["x"], "a.exe", { type: "application/x-msdownload" })),
    ).rejects.toThrow(/PDF, JPG or PNG/);
    expect(await swapService.listMine(email(1))).toHaveLength(2);
  });
});
