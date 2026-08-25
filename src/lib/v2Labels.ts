import type { Dictionary } from "@/i18n/dictionary";

export function v2ParamLabel(paramId: string, fallback: string, dict: Dictionary): string {
  if (paramId === "customer_status") return dict.v2Overrides.relationshipLabel;
  return fallback;
}

export function v2OptionLabel(optionId: string, fallback: string, dict: Dictionary): string {
  if (optionId === "customer_prospect") return dict.v2Overrides.notYetACustomer;
  return fallback;
}

export function v2SignalLabel(signal: string, fallback: string, dict: Dictionary): string {
  if (signal === "customer_prospect") return dict.v2Overrides.notYetACustomer;
  return fallback;
}
