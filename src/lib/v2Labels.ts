export const V2_PARAM_LABEL_OVERRIDES: Record<string, string> = {
  customer_status: "Relationship",
};

export const V2_SIGNAL_LABEL_OVERRIDES: Record<string, string> = {
  customer_prospect: "Not yet a customer",
};

export function v2ParamLabel(paramId: string, fallback: string): string {
  return V2_PARAM_LABEL_OVERRIDES[paramId] ?? fallback;
}

export function v2OptionLabel(optionId: string, fallback: string): string {
  return V2_SIGNAL_LABEL_OVERRIDES[optionId] ?? fallback;
}

export function v2SignalLabel(signal: string, fallback: string): string {
  return V2_SIGNAL_LABEL_OVERRIDES[signal] ?? fallback;
}
