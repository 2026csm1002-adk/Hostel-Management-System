import { randomUUID } from "node:crypto";
import { REREGISTER_AFTER_DAYS } from "@/lib/constants";
import { daysBetween, isoDateInZone, todayISO } from "@/lib/dates";
import type { CreateComplaintInput } from "@/lib/validators/complaint.schema";
import type { ComplaintRow } from "@/server/db/memory-store";
import { ConflictError, NotFoundError, ValidationError } from "@/server/errors";
import { complaintRepo } from "@/server/repositories/complaint.repo";
import { profileService } from "@/server/services/profile.service";
import type { ComplaintCategory, ComplaintDTO, ComplaintStatus } from "@/types";

function daysOld(row: ComplaintRow): number {
  return daysBetween(isoDateInZone(new Date(row.createdAt)), todayISO());
}

function toDTO(row: ComplaintRow, reregistered: boolean): ComplaintDTO {
  const days = daysOld(row);
  return {
    id: row.complaintId,
    category: row.category as ComplaintCategory,
    description: row.description,
    status: row.status as ComplaintStatus,
    createdAt: row.createdAt,
    daysOld: days,
    canReregister: row.status !== "Resolved" && days >= REREGISTER_AFTER_DAYS && !reregistered,
    reregisteredFrom: row.reregisteredFrom,
    reregistered,
  };
}

function newComplaint(studentId: string, input: CreateComplaintInput, from: string | null): ComplaintRow {
  return {
    complaintId: randomUUID(),
    studentId,
    category: input.category,
    description: input.description,
    status: "Open",
    createdAt: new Date().toISOString(),
    resolvedAt: null,
    reregisteredFrom: from,
  };
}

export const complaintService = {
  async create(email: string, input: CreateComplaintInput): Promise<ComplaintDTO> {
    const student = await profileService.requireProfile(email);
    const row = await complaintRepo.insert(newComplaint(student.studentId, input, null));
    return toDTO(row, false);
  },

  /** My complaints, newest first. Empty (not an error) while there is no profile. */
  async listMine(email: string): Promise<ComplaintDTO[]> {
    const profile = await profileService.getProfile(email);
    if (!profile) return [];
    const rows = await complaintRepo.listByStudent(profile.studentId);
    const replaced = new Set(rows.map((r) => r.reregisteredFrom).filter(Boolean));
    return rows.map((r) => toDTO(r, replaced.has(r.complaintId)));
  },

  /** Not resolved, at least 7 days old, and not already re-registered. */
  async reregister(email: string, complaintId: string): Promise<ComplaintDTO> {
    const student = await profileService.requireProfile(email);
    const old = await complaintRepo.findById(complaintId);
    if (!old || old.studentId !== student.studentId) throw new NotFoundError("Complaint not found.");

    if (old.status === "Resolved") throw new ValidationError("This complaint is already resolved.");
    if (daysOld(old) < REREGISTER_AFTER_DAYS) {
      throw new ValidationError(`A complaint can be re-registered after ${REREGISTER_AFTER_DAYS} days.`);
    }
    if (await complaintRepo.hasBeenReregistered(old.complaintId)) {
      throw new ConflictError("This complaint was already re-registered.");
    }

    const row = await complaintRepo.insert(
      newComplaint(
        student.studentId,
        { category: old.category as ComplaintCategory, description: old.description },
        old.complaintId,
      ),
    );
    return toDTO(row, false);
  },
};
