import { describe, it, expect } from "vitest";
import { floorFromRoom, floorLabel } from "@/lib/room";

describe("Unit: floor from room number", () => {
  it("105 is the ground floor, 207 the 1st, 309 the 2nd", () => {
    expect(floorFromRoom("105")).toBe(0);
    expect(floorFromRoom("207")).toBe(1);
    expect(floorFromRoom("208")).toBe(1);
    expect(floorFromRoom("309")).toBe(2);
    expect(floorFromRoom("1204")).toBe(11);
  });
  it("uses the last run of digits for rooms like A-112", () => {
    expect(floorFromRoom("A-112")).toBe(0);
    expect(floorFromRoom("B-310")).toBe(2);
  });
  it("returns null when no floor can be worked out", () => {
    expect(floorFromRoom("")).toBeNull();
    expect(floorFromRoom("ABC")).toBeNull();
    expect(floorFromRoom("45")).toBeNull();
    expect(floorFromRoom(null)).toBeNull();
  });
  it("labels floors", () => {
    expect(floorLabel(0)).toBe("Ground floor");
    expect(floorLabel(1)).toBe("1st floor");
    expect(floorLabel(2)).toBe("2nd floor");
    expect(floorLabel(3)).toBe("3rd floor");
    expect(floorLabel(4)).toBe("4th floor");
    expect(floorLabel(11)).toBe("11th floor");
    expect(floorLabel(null)).toBe("—");
  });
});
