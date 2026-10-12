// Works out roll number, batch and a name from an institute email address.
//   2026csm1024@iitrpr.ac.in      -> roll 2026CSM1024, batch 2026
//   amul.24csz0016@iitrpr.ac.in   -> roll 24CSZ0016,   batch 2024, name "Amul"
// A roll number looks like: year (2 or 4 digits) + department/degree letters + serial number.

export type StudentIdentity = {
  email: string;
  rollNo: string | null;        // upper-case, e.g. "2026CSM1024"
  batch: string | null;         // admission year, e.g. "2026"
  nameFromEmail: string | null; // e.g. "Amul"; null when the email holds no name
};

const ROLL_TOKEN = /^(\d{4}|\d{2})([a-z]{2,4})(\d{3,5})$/i;

export function parseStudentEmail(email: string): StudentIdentity {
  const clean = email.trim().toLowerCase();
  const local = clean.split("@")[0] ?? "";
  const tokens = local.split(/[._-]+/).filter(Boolean);

  let rollNo: string | null = null;
  let batch: string | null = null;
  const nameTokens: string[] = [];

  for (const token of tokens) {
    const match = rollNo === null ? ROLL_TOKEN.exec(token) : null;
    if (match) {
      rollNo = token.toUpperCase();
      batch = match[1].length === 2 ? "20" + match[1] : match[1];
    } else if (/^[a-z]+$/.test(token)) {
      nameTokens.push(token.charAt(0).toUpperCase() + token.slice(1));
    }
  }

  return {
    email: clean,
    rollNo,
    batch,
    nameFromEmail: nameTokens.length > 0 ? nameTokens.join(" ") : null,
  };
}

/** Best name to show: Google account name, else the name in the email, else the roll number. */
export function displayName(googleName: string | null | undefined, id: StudentIdentity): string {
  return googleName?.trim() || id.nameFromEmail || id.rollNo || id.email;
}
