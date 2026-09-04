import { Suspense } from "react";
import DecisioningDemo from "@/components/DecisioningDemo";

export default function DecisioningV1Page() {
  return (
    <Suspense>
      <DecisioningDemo />
    </Suspense>
  );
}
