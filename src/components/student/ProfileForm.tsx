export type ProfileValues = {
  name: string;
  rollNo: string | null;
  email: string;
  hostel: string | null;
  wing: string | null;
  room: string | null;
  course: string | null;
  batch: string | null;
};

type FieldProps = { label: string; value: string | null };

// Filled fields are shown read-only; missing ones are greyed out with "Not set yet".
function Field({ label, value }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[12.5px] font-semibold">{label}</label>
      <input
        type="text"
        readOnly
        disabled={value === null}
        value={value ?? ""}
        placeholder="Not set yet"
        className="w-full rounded-[3px] border border-line-strong bg-paper px-[11px] py-[9px] disabled:cursor-not-allowed disabled:text-ink-soft"
      />
    </div>
  );
}

// TEMPORARY: display only. Saving (PUT /api/profile) is added when profiles are connected to the database.
export function ProfileForm({ values }: { values: ProfileValues }) {
  return (
    <div className="rounded-[3px] border border-line bg-white p-[18px]">
      <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
        <Field label="Full name" value={values.name} />
        <Field label="Roll No" value={values.rollNo} />
        <Field label="Institute email" value={values.email} />
        <Field label="Batch" value={values.batch} />
        <Field label="Hostel" value={values.hostel} />
        <Field label="Wing" value={values.wing} />
        <Field label="Room number" value={values.room} />
        <Field label="Course" value={values.course} />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-[3px] bg-line-strong px-[18px] py-2.5 font-display text-[13.5px] font-semibold text-white"
        >
          Save profile
        </button>
        <span className="text-[12.5px] text-ink-soft">
          Hostel, wing, room and course can be filled in once profiles are saved to the database.
        </span>
      </div>
    </div>
  );
}
