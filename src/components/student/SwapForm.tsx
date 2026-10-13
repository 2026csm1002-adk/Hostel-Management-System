"use client";

import { useRef, useState } from "react";
import {
  ALLOWED_ATTACHMENT_TYPES,
  MAX_ATTACHMENT_BYTES,
  SWAP_REASON_MAX_CHARS,
  SWAP_REASON_MIN_CHARS,
} from "@/lib/constants";
import { apiFetch, errorMessage } from "@/lib/api-client";

export function SwapForm({ onCreated }: { onCreated: () => void }) {
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  function pickFile(f: File | null) {
    setMessage(null);
    if (f && !(ALLOWED_ATTACHMENT_TYPES as readonly string[]).includes(f.type)) {
      setMessage({ ok: false, text: "Attach a PDF, JPG or PNG file." });
      if (fileInput.current) fileInput.current.value = "";
      return setFile(null);
    }
    if (f && f.size > MAX_ATTACHMENT_BYTES) {
      setMessage({ ok: false, text: `The file is too large (maximum ${MAX_ATTACHMENT_BYTES / 1024 / 1024} MB).` });
      if (fileInput.current) fileInput.current.value = "";
      return setFile(null);
    }
    setFile(f);
  }

  async function submit() {
    setBusy(true);
    setMessage(null);
    try {
      const form = new FormData();
      form.set("reason", reason);
      if (file) form.set("file", file);
      await apiFetch("/api/swaps", { method: "POST", body: form }); // browser sets the multipart header
      setReason("");
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      setMessage({ ok: true, text: "Request submitted. Track it under My requests." });
      onCreated();
    } catch (e) {
      setMessage({ ok: false, text: errorMessage(e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-3.5">
        <label htmlFor="swap-reason" className="mb-1.5 block text-[12.5px] font-semibold">
          Reason for the swap
        </label>
        <textarea
          id="swap-reason"
          rows={4}
          maxLength={SWAP_REASON_MAX_CHARS}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Current room is far from the washroom block; requesting a room closer on the same floor."
          className="w-full rounded-[3px] border border-line-strong bg-white px-[11px] py-[9px]"
        />
      </div>

      <div className="mb-3.5">
        <label htmlFor="swap-file" className="mb-1.5 block text-[12.5px] font-semibold">
          Supporting document (optional)
        </label>
        <input
          id="swap-file"
          ref={fileInput}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
          className="block text-[13px]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={reason.trim().length < SWAP_REASON_MIN_CHARS || busy}
          className="rounded-[3px] bg-teal px-[18px] py-2.5 font-display text-[13.5px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Submitting…" : "Submit request"}
        </button>
        {message && (
          <span role="status" className={"text-[12.5px] " + (message.ok ? "text-green" : "text-brick")}>
            {message.text}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs text-ink-soft">
        Attach a document (PDF, JPG or PNG, up to 5 MB) only if your reason needs proof, for example a medical
        certificate. Your caretaker reviews it first, then forwards it to the warden. If the warden accepts, it goes
        back to your caretaker to assign a room.
      </p>
    </div>
  );
}
