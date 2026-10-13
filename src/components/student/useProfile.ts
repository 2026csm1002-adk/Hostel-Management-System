"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch, errorMessage } from "@/lib/api-client";
import type { StudentProfile } from "@/types";

type State = { profile: StudentProfile | null; error: string | null } | null; // null = still loading

/** Loads GET /api/profile once. `setProfile` lets a form update it after saving. */
export function useProfile() {
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    let cancelled = false;
    apiFetch<{ profile: StudentProfile | null }>("/api/profile")
      .then((d) => !cancelled && setState({ profile: d.profile, error: null }))
      .catch((e) => !cancelled && setState({ profile: null, error: errorMessage(e) }));
    return () => {
      cancelled = true;
    };
  }, []);

  const setProfile = useCallback(
    (profile: StudentProfile) => setState({ profile, error: null }),
    [],
  );

  return {
    loading: state === null,
    profile: state?.profile ?? null,
    error: state?.error ?? null,
    setProfile,
  };
}
