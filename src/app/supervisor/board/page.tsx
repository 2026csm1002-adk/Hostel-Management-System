import { ScreenPlaceholder } from "@/components/shared/ScreenPlaceholder";

// TODO: replace the placeholder with <CapacityBoard /> (src/components/supervisor/).
export default function SupervisorBoardPage() {
  return (
    <ScreenPlaceholder
      title="Capacity board"
      items={[
        "Slots by floor, with how many of the 3 seats are taken",
        "Hostel and date selection",
        "Download the schedule as CSV or PDF for the cleaning staff",
      ]}
    />
  );
}
