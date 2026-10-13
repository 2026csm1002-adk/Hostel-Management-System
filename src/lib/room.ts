// Floor is worked out from the room number, never typed in by the student.
//   105 -> floor 0 (Ground)      207 -> floor 1 (First)      309 -> floor 2 (Second)
// Formula: floor = floor(roomNumber / 100) - 1
//
// Room numbers such as "A-112" are allowed: the LAST run of digits is used (112).

/** Returns the floor number (0 = ground floor), or null when it cannot be worked out. */
export function floorFromRoom(roomNo: string | null | undefined): number | null {
  if (!roomNo) return null;
  const runs = roomNo.match(/\d+/g);
  if (!runs) return null;
  const n = parseInt(runs[runs.length - 1], 10);
  if (n < 100) return null; // 1xx is the lowest valid room (ground floor)
  return Math.floor(n / 100) - 1;
}

/** 0 -> "Ground floor", 1 -> "1st floor", 2 -> "2nd floor", 11 -> "11th floor", null -> "—" */
export function floorLabel(floor: number | null | undefined): string {
  if (floor === null || floor === undefined) return "—";
  if (floor === 0) return "Ground floor";
  const lastTwo = floor % 100;
  const suffix =
    lastTwo >= 11 && lastTwo <= 13
      ? "th"
      : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[floor % 10] ?? "th";
  return `${floor}${suffix} floor`;
}
