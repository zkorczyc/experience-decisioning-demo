import { Suspense } from "react";
import DecisioningDemoV2 from "@/components/v2/DecisioningDemoV2";

export default function DecisioningV2Page() {
  return (
    <Suspense>
      <DecisioningDemoV2 />
    </Suspense>
  );
}
