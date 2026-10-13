import { memory, type AttachmentRow } from "@/server/db/memory-store";

// TEMPORARY: in-memory. DB SWAP: Drizzle queries on `attachment`.

export const attachmentRepo = {
  async insert(row: AttachmentRow): Promise<AttachmentRow> {
    memory.attachments.push({ ...row });
    return { ...row };
  },
  async findById(attachmentId: string): Promise<AttachmentRow | undefined> {
    const row = memory.attachments.find((a) => a.attachmentId === attachmentId);
    return row && { ...row };
  },
};
