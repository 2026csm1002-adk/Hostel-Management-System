import { ScreenPlaceholder } from "@/components/shared/ScreenPlaceholder";

// TODO: replace the placeholder with <ComplaintQueue /> (src/components/caretaker/).
export default function CaretakerComplaintsPage() {
  return (
    <ScreenPlaceholder
      title="Complaint queue"
      items={[
        "Complaints from students of your hostel, with a category filter",
        "Mark in progress / Mark resolved",
        "CSV and PDF download",
      ]}
    />
  );
}
