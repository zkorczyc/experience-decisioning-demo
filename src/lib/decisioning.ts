import type { Locale } from "@/i18n/locales";
import { format, type Dictionary } from "@/i18n/dictionary";
import { offersByPersona } from "./offers";
import { t } from "./localized";
import { DecisionCandidate, DecisionResult, Persona, Signal } from "./types";

const AFFINITY_BONUS_PER_TAG = 20;
const RECENCY_BONUS = 15;

export function buildSignalLabels(persona: Persona, locale: Locale): Record<Signal, string> {
  const labels: Record<Signal, string> = {};
  for (const event of persona.eventDefs) {
    labels[event.signal] = t(event.label, locale);
  }
  for (const param of persona.parameterDefs) {
    for (const option of param.options) {
      labels[option.signal] = `${t(param.label, locale)}: ${t(option.label, locale)}`;
    }
  }
  for (const audience of persona.audiences ?? []) {
    labels[audience.signal] = t(audience.label, locale);
  }
  return labels;
}

export function decide(
  persona: Persona,
  activeSignals: Set<Signal>,
  lastChangedSignal: Signal | null,
  locale: Locale,
  dict: Dictionary
): DecisionResult {
  const { collectionName, offers } = offersByPersona[persona.id];
  const signalLabels = buildSignalLabels(persona, locale);

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
      reason = format(dict.decisioning.notEligibleYet, { missing: missing.join(", ") });
    } else {
      const parts = [format(dict.decisioning.prioritySetTo, { priority: offer.priority })];
      if (affinityBonus > 0) {
        const tags = matchedAffinityTags.map((s) => signalLabels[s] ?? s).join(", ");
        parts.push(format(dict.decisioning.matchesInterest, { tags, bonus: affinityBonus }));
      }
      if (recencyBonus > 0) {
        parts.push(
          format(dict.decisioning.justTriggered, {
            label: signalLabels[lastChangedSignal!] ?? lastChangedSignal!,
            bonus: recencyBonus,
          })
        );
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
    collectionName: t(collectionName, locale),
    winner,
    candidates: [...candidates].sort((a, b) => b.total - a.total),
    lastChangedSignal,
  };
}
