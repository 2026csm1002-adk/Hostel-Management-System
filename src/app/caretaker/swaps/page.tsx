import { ScreenPlaceholder } from "@/components/shared/ScreenPlaceholder";

// TODO: replace the placeholder with the swap queue (src/components/caretaker/).
export default function CaretakerSwapsPage() {
  return (
    <ScreenPlaceholder
      title="Swap requests"
      items={[
        "New requests: Forward to warden",
        "Accepted requests: Assign room, or mark no room available",
      ]}
    />
  );
}
