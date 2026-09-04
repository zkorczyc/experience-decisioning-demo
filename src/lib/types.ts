import type { LocalizedText } from "./localized";

export type Signal = string;

export type EventDef = {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  signal: Signal;
};

export type ParameterOption = {
  id: string;
  label: LocalizedText;
  signal: Signal;
};

export type ParameterDef = {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  options: ParameterOption[];
  defaultOptionId: string;
};

export type Offer = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  cta: LocalizedText;
  requiredSignals: Signal[];
  priority: number;
  affinityTags: Signal[];
  imageUrl?: string;
  mobileImageUrl?: string;
  mobileName?: LocalizedText;
  mobileDescription?: LocalizedText;
  mobileCta?: LocalizedText;
};

export type AudienceDef = {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  signal: Signal;
};

export type Persona = {
  id: string;
  name: string;
  avatarInitials: string;
  /** Reuse another persona's avatar photo set (e.g. the same person appearing in multiple verticals). Defaults to `id`. */
  avatarKey?: string;
  baselineSignals: Signal[];
  eventDefs: EventDef[];
  parameterDefs: ParameterDef[];
  audiences?: AudienceDef[];
};

export type BrandColors = {
  primary: string;
  dark: string;
  accent: string;
};

export type Vertical = {
  id: string;
  name: string;
  brand: string;
  logoUrl?: string;
  colors: BrandColors;
  personas: Persona[];
  disabled?: boolean;
};

export type DecisionCandidate = {
  offer: Offer;
  eligible: boolean;
  matchedAffinityTags: Signal[];
  priorityScore: number;
  affinityBonus: number;
  recencyBonus: number;
  total: number;
  reason: string;
};

export type DecisionResult = {
  collectionName: string;
  winner: DecisionCandidate | null;
  candidates: DecisionCandidate[];
  lastChangedSignal: Signal | null;
};
