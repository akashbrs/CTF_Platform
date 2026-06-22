"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    // If they hit /dashboard, redirect them to challenges
    router.replace("/dashboard/challenges");
  }, [router]);

  return null;
}
