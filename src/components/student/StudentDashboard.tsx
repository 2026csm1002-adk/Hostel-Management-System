"use client";

import Link from "next/link";
import { useState } from "react";
import { IdStrip } from "./IdStrip";
import { RequestList } from "./RequestList";
import { StudentActions } from "./StudentActions";
import { useProfile } from "./useProfile";

export function StudentDashboard({ fallback }: { fallback: { rollNo: string | null; batch: string | null } }) {
  const { profile, loading, error } = useProfile();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <IdStrip profile={profile} fallback={fallback} />

      {error && <p className="mb-4 text-sm text-brick">{error}</p>}
      {!loading && !profile && !error && (
        <p className="mb-5 rounded-[3px] border border-amber/35 bg-amber-soft p-3 text-[13px] text-amber">
          Your hostel details are not saved yet.{" "}
          <Link href="/student/profile" className="font-semibold underline">
            Complete your profile
          </Link>{" "}
          to book cleaning, raise complaints and request a room swap.
        </p>
      )}

      <StudentActions profile={profile} onCreated={() => setRefreshKey((n) => n + 1)} />
      <RequestList refreshKey={refreshKey} />
    </>
  );
}
