"use client";

import { useState } from "react";
import { COURSES, HOSTELS } from "@/lib/constants";
import { apiFetch, errorMessage } from "@/lib/api-client";
import { floorFromRoom, floorLabel } from "@/lib/room";
import type { StudentProfile } from "@/types";
import { useProfile } from "./useProfile";

export type ProfileIdentity = {
  name: string;           // best name guess (Google name / email)
  rollNo: string | null;  // from the email, null when the email has none
  email: string;
  batch: string | null;
};

const inputClass =
  "w-full rounded-[3px] border border-line-strong bg-white px-[11px] py-[9px] disabled:bg-paper disabled:text-ink-soft";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[12.5px] font-semibold">{label}</label>
      {children}
    </div>
  );
}

function ReadOnly({ value, placeholder = "—" }: { value: string; placeholder?: string }) {
  return (
    <input type="text" readOnly disabled value={value} placeholder={placeholder} className={inputClass} />
  );
}

export function ProfileForm({ identity }: { identity: ProfileIdentity }) {
  const { profile, loading, error, setProfile } = useProfile();
  if (loading) return <p className="text-sm text-ink-soft">Loading your profile…</p>;
  if (error) return <p className="text-sm text-brick">{error}</p>;
  return <ProfileFields identity={identity} profile={profile} onSaved={setProfile} />;
}

function ProfileFields({
  identity,
  profile,
  onSaved,
}: {
  identity: ProfileIdentity;
  profile: StudentProfile | null;
  onSaved: (p: StudentProfile) => void;
}) {
  const [fullName, setFullName] = useState(profile?.fullName ?? identity.name);
  const [hostelId, setHostelId] = useState(profile?.hostelId ?? "");
  const [wing, setWing] = useState(profile?.wing ?? "");
  const [roomNo, setRoomNo] = useState(profile?.roomNo ?? "");
  const [course, setCourse] = useState<string>(profile?.course ?? "");
  const [rollNo, setRollNo] = useState(identity.rollNo ?? "");
  const [batch, setBatch] = useState(identity.batch ?? "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  // Roll no / batch are typed only when the email does not contain them (and never after the first save).
  const rollEditable = !profile && !identity.rollNo;
  const batchEditable = !profile && !identity.batch;
  const floor = floorFromRoom(roomNo);

  async function save() {
    setBusy(true);
    setMessage(null);
    try {
      const data = await apiFetch<{ profile: StudentProfile }>("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          hostelId,
          wing,
          roomNo,
          course,
          ...(rollEditable ? { rollNo } : {}),
          ...(batchEditable ? { batch } : {}),
        }),
      });
      onSaved(data.profile);
      setMessage({ ok: true, text: "Profile saved." });
    } catch (e) {
      setMessage({ ok: false, text: errorMessage(e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-[3px] border border-line bg-white p-[18px]">
      <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
        <Field label="Full name">
          <input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </Field>
        <Field label="Roll No">
          {rollEditable ? (
            <input className={inputClass} value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
          ) : (
            <ReadOnly value={profile?.studentId ?? identity.rollNo ?? ""} />
          )}
        </Field>
        <Field label="Institute email">
          <ReadOnly value={identity.email} />
        </Field>
        <Field label="Batch">
          {batchEditable ? (
            <input className={inputClass} value={batch} placeholder="e.g. 2026" onChange={(e) => setBatch(e.target.value)} />
          ) : (
            <ReadOnly value={profile?.batch ?? identity.batch ?? ""} />
          )}
        </Field>
        <Field label="Hostel">
          <select className={inputClass} value={hostelId} onChange={(e) => setHostelId(e.target.value)}>
            <option value="">Select hostel</option>
            {(["Boys", "Girls"] as const).map((type) => (
              <optgroup key={type} label={`${type}' hostels`}>
                {HOSTELS.filter((h) => h.type === type).map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field label="Wing">
          <input className={inputClass} value={wing} placeholder="e.g. SE" onChange={(e) => setWing(e.target.value)} />
        </Field>
        <Field label="Room number">
          <input className={inputClass} value={roomNo} placeholder="e.g. 207" onChange={(e) => setRoomNo(e.target.value)} />
        </Field>
        <Field label="Floor (from room number)">
          <ReadOnly value={floor === null ? "" : floorLabel(floor)} placeholder="Enter a room number" />
        </Field>
        <Field label="Course">
          <select className={inputClass} value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Select course</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="rounded-[3px] bg-teal px-[18px] py-2.5 font-display text-[13.5px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save profile"}
        </button>
        {message && (
          <span role="status" className={"text-[12.5px] " + (message.ok ? "text-green" : "text-brick")}>
            {message.text}
          </span>
        )}
      </div>
    </div>
  );
}
