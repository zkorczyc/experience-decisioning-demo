import { offersByPersona } from "./offers";
import { DecisionCandidate, DecisionResult, Persona, Signal } from "./types";

const AFFINITY_BONUS_PER_TAG = 20;
const RECENCY_BONUS = 15;

export function buildSignalLabels(persona: Persona): Record<Signal, string> {
  const labels: Record<Signal, string> = {};
  for (const event of persona.eventDefs) {
    labels[event.signal] = event.label;
  }
  for (const param of persona.parameterDefs) {
    for (const option of param.options) {
      labels[option.signal] = `${param.label}: ${option.label}`;
    }
  }
  for (const audience of persona.audiences ?? []) {
    labels[audience.signal] = `Audience: ${audience.label}`;
  }
  return labels;
}

export function decide(
  persona: Persona,
  activeSignals: Set<Signal>,
  lastChangedSignal: Signal | null
): DecisionResult {
  const { collectionName, offers } = offersByPersona[persona.id];
  const signalLabels = buildSignalLabels(persona);

  const candidates: DecisionCandidate[] = offers.map((offer) => {
    const eligible = offer.requiredSignals.every((s) => activeSignals.has(s));
    const matchedAffinityTags = offer.affinityTags.filter((tag) => activeSignals.has(tag));
    const affinityBonus = matchedAffinityTags.length * AFFINITY_BONUS_PER_TAG;
    const recencyBonus =
      eligible && lastChangedSignal !== null && offer.requiredSignals.includes(lastChangedSignal)
        ? RECENCY_BONUS
        : 0;
    const total = eligible ? offer.priority + affinityBonus + recencyBonus : 0;

    let reason: string;
    if (!eligible) {
      const missing = offer.requiredSignals
        .filter((s) => !activeSignals.has(s))
        .map((s) => signalLabels[s] ?? s);
      reason = `Not eligible yet — needs: ${missing.join(", ")}.`;
    } else {
      const parts = [`Priority set to ${offer.priority}/100`];
      if (affinityBonus > 0) {
        const tags = matchedAffinityTags.map((s) => signalLabels[s] ?? s).join(", ");
        parts.push(`matches interest in ${tags} (+${affinityBonus})`);
      }
      if (recencyBonus > 0) {
        parts.push(`just triggered by "${signalLabels[lastChangedSignal!] ?? lastChangedSignal}" (+${recencyBonus})`);
      }
      reason = parts.join(", ") + ".";
    }

    return {
      offer,
      eligible,
      matchedAffinityTags,
      priorityScore: offer.priority,
      affinityBonus,
      recencyBonus,
      total,
      reason,
    };
  });

  const eligibleCandidates = candidates.filter((c) => c.eligible);
  const winner =
    eligibleCandidates.length > 0
      ? eligibleCandidates.reduce((best, c) =>
          c.total > best.total || (c.total === best.total && c.priorityScore > best.priorityScore)
            ? c
            : best
        )
      : null;

  return {
    collectionName,
    winner,
    candidates: [...candidates].sort((a, b) => b.total - a.total),
    lastChangedSignal,
  };
}
