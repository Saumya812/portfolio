"use client";

import dynamic from "next/dynamic";

const ImmersivePage = dynamic(
  () => import("@/components/ImmersivePage"),
  { ssr: false }
);

export default function Page() {
  return <ImmersivePage />;
}