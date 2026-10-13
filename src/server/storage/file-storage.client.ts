import { randomUUID } from "node:crypto";

// TEMPORARY stub: the file is accepted and checked, but its bytes are not stored yet.
// DB/STORAGE SWAP: upload to Google Drive or Vercel Blob here and return the real file id
// as `storageFileId`. Nothing else in the project needs to change.

export const fileStorage = {
  async upload(_file: File): Promise<{ storageFileId: string }> {
    void _file;
    return { storageFileId: `dev-${randomUUID()}` };
  },
};
