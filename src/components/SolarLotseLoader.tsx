"use client";

import dynamic from "next/dynamic";

// `ssr: false` is only allowed inside a Client Component boundary — this
// thin wrapper exists so layout.tsx (a Server Component) can still code-split
// the Solar-Lotse out of the initial bundle. See SolarLotse.tsx for why.
const SolarLotse = dynamic(() => import("@/components/SolarLotse"), { ssr: false });

export default function SolarLotseLoader() {
  return <SolarLotse />;
}
