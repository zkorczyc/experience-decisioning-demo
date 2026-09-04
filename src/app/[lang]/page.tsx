import { Suspense } from "react";
import DecisioningDemoV2 from "@/components/v2/DecisioningDemoV2";

export default function Home() {
  return (
    <Suspense>
      <DecisioningDemoV2 />
    </Suspense>
  );
}
