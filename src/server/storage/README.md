# `src/server/storage/`

> File storage for swap documents.

| Layer | Owner |
|---|---|
| Storage | Shahid (Drive/Blob setup and deployment keys) |

## What this folder is for

Keeps uploaded files (for example medical certificates) outside the database.

## Files that go in this folder

### `file-storage.client.ts`

**What it does:** Uploads a file to Google Drive or Vercel Blob and later returns a way to download it.

**Called by:** `swap.service`.

**Calls:** Google Drive API or Vercel Blob.

**Details:**

- `uploadFile(file)` returns `{ storageFileId, fileName }` which is saved in the `attachment` table.
- `getFileUrl(storageFileId)` returns a short-lived download link.
- Only the student, their caretaker and the warden handling the request may open the file.
- Hide the provider behind these two functions so switching Drive and Blob later changes only this file.
