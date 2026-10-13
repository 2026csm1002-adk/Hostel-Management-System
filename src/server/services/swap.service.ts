import { randomUUID } from "node:crypto";
import { ALLOWED_ATTACHMENT_TYPES, MAX_ATTACHMENT_BYTES } from "@/lib/constants";
import type { SubmitSwapInput } from "@/lib/validators/swap.schema";
import type { SwapRequestRow } from "@/server/db/memory-store";
import { ValidationError } from "@/server/errors";
import { attachmentRepo } from "@/server/repositories/attachment.repo";
import { swapRequestRepo } from "@/server/repositories/swap-request.repo";
import { profileService } from "@/server/services/profile.service";
import { fileStorage } from "@/server/storage/file-storage.client";
import type { SwapDTO, SwapStatus } from "@/types";

function checkFile(file: File) {
  if (file.size > MAX_ATTACHMENT_BYTES) {
    throw new ValidationError(`The file is too large (maximum ${MAX_ATTACHMENT_BYTES / 1024 / 1024} MB).`);
  }
  if (!(ALLOWED_ATTACHMENT_TYPES as readonly string[]).includes(file.type)) {
    throw new ValidationError("Attach a PDF, JPG or PNG file.");
  }
}

async function toDTO(row: SwapRequestRow): Promise<SwapDTO> {
  const attachment = row.attachmentId ? await attachmentRepo.findById(row.attachmentId) : undefined;
  return {
    id: row.swapId,
    reason: row.reason,
    status: row.status as SwapStatus,
    createdAt: row.createdAt,
    attachmentName: attachment?.fileName ?? null,
    assignedRoom: row.assignedRoom,
    wardenComment: row.wardenComment,
  };
}

// Only the student side lives here for now. forward / decide / assignRoom / markAwaitingRoom /
// stats are added with the caretaker and warden screens (see the status table in the services README).
export const swapService = {
  async submit(email: string, input: SubmitSwapInput, file?: File | null): Promise<SwapDTO> {
    const student = await profileService.requireProfile(email);

    let attachmentId: string | null = null;
    if (file && file.size > 0) {
      checkFile(file);
      const { storageFileId } = await fileStorage.upload(file);
      const saved = await attachmentRepo.insert({
        attachmentId: randomUUID(),
        storageFileId,
        fileName: file.name.split(/[\\/]/).pop()!.slice(0, 120),
        uploadedAt: new Date().toISOString(),
      });
      attachmentId = saved.attachmentId;
    }

    const row = await swapRequestRepo.insert({
      swapId: randomUUID(),
      studentId: student.studentId,
      reason: input.reason,
      attachmentId,
      status: "Pending",
      assignedRoom: null,
      caretakerId: null,
      wardenId: null,
      wardenComment: null,
      createdAt: new Date().toISOString(),
    });
    return toDTO(row);
  },

  /** My swap requests, newest first. Empty (not an error) while there is no profile. */
  async listMine(email: string): Promise<SwapDTO[]> {
    const profile = await profileService.getProfile(email);
    if (!profile) return [];
    const rows = await swapRequestRepo.listByStudent(profile.studentId);
    return Promise.all(rows.map(toDTO));
  },
};
