import { ScreenPlaceholder } from "@/components/shared/ScreenPlaceholder";

// TODO: replace the placeholder with <SwapDecisionList /> (src/components/warden/).
export default function WardenSwapsPage() {
  return (
    <ScreenPlaceholder
      title="Forwarded swap requests"
      items={[
        "Accept / Reject / Waiting (a comment is required for Reject and Waiting)",
        "Anonymous counts of requests by batch and by course",
      ]}
    />
  );
}
