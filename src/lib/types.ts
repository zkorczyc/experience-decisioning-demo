export type Signal = string;

export type EventDef = {
  id: string;
  label: string;
  description: string;
  signal: Signal;
};

export type ParameterOption = {
  id: string;
  label: string;
  signal: Signal;
};

export type ParameterDef = {
  id: string;
  label: string;
  description: string;
  options: ParameterOption[];
  defaultOptionId: string;
};

export type Offer = {
  id: string;
  name: string;
  description: string;
  cta: string;
  requiredSignals: Signal[];
  priority: number;
  affinityTags: Signal[];
  imageUrl?: string;
  mobileImageUrl?: string;
  mobileName?: string;
  mobileDescription?: string;
  mobileCta?: string;
};

export type AudienceDef = {
  id: string;
  label: string;
  description: string;
  signal: Signal;
};

export type Persona = {
  id: string;
  name: string;
  avatarInitials: string;
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
