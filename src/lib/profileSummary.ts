import type { Locale } from "@/i18n/locales";
import { format, type Dictionary } from "@/i18n/dictionary";
import { t } from "./localized";
import { Persona, Vertical } from "./types";

function formatAge(optionId: string, dict: Dictionary): string {
  const years = optionId.replace("age_", "").replace("s", "");
  return format(dict.profile.yearsOld, { years });
}

export function shortCollectionLabel(collectionName: string, brand: string, dict: Dictionary): string {
  return collectionName
    .replace(new RegExp(`^${brand}\\s+`), "")
    .replace(new RegExp(`\\s+${dict.offersSuffixWord}$`), "");
}

export function buildProfileSummary(
  persona: Persona,
  paramSelections: Record<string, string>,
  vertical: Vertical,
  locale: Locale,
  dict: Dictionary,
  activeSignals?: Set<string>
): string[] {
  const parts: string[] = [];

  for (const param of persona.parameterDefs) {
    const optionId = paramSelections[param.id];
    const option = param.options.find((o) => o.id === optionId);
    if (!option) continue;

    switch (param.id) {
      case "age":
        parts.push(formatAge(option.id, dict));
        break;
      case "customer_status":
        parts.push(
          option.id === "customer_existing"
            ? format(dict.profile.customerSuffix, { brand: vertical.brand })
            : dict.profile.prospect
        );
        break;
      case "profession":
        parts.push(format(dict.profile.professionPrefix, { label: t(option.label, locale) }));
        break;
      case "sentiment":
        parts.push(
          format(dict.profile.sentimentPrefix, { emoji: option.id === "sentiment_dissatisfied" ? "😟" : "😊" })
        );
        break;
      default:
        parts.push(t(option.label, locale));
    }
  }

  if (activeSignals) {
    for (const event of persona.eventDefs) {
      if (activeSignals.has(event.signal)) {
        parts.push(t(event.label, locale));
      }
    }
  }

  return parts;
}

export function buildProfileSentence(
  persona: Persona,
  paramSelections: Record<string, string>,
  vertical: Vertical,
  locale: Locale,
  dict: Dictionary,
  prospectOverride?: string
): string {
  const parts: string[] = [];
  const ageOption = persona.parameterDefs
    .find((p) => p.id === "age")
    ?.options.find((o) => o.id === paramSelections.age);
  if (ageOption) parts.push(formatAge(ageOption.id, dict));

  const hasCustomerStatus = persona.parameterDefs.some((p) => p.id === "customer_status");
  const isProspect = paramSelections.customer_status === "customer_prospect";
  if (hasCustomerStatus) {
    parts.push(
      isProspect
        ? prospectOverride ?? dict.profile.prospect
        : format(dict.profile.customerSuffix, { brand: vertical.brand })
    );
  }

  const isDissatisfied = paramSelections.sentiment === "sentiment_dissatisfied";
  parts.push(isDissatisfied ? dict.profile.dissatisfied : dict.profile.satisfied);

  const professionOption = persona.parameterDefs
    .find((p) => p.id === "profession")
    ?.options.find((o) => o.id === paramSelections.profession);
  if (professionOption) parts.push(format(dict.profile.professionPrefix, { label: t(professionOption.label, locale) }));

  return parts.join(", ");
}

export function isKnownExistingCustomer(persona: Persona, paramSelections: Record<string, string>): boolean {
  const hasCustomerStatus = persona.parameterDefs.some((p) => p.id === "customer_status");
  return hasCustomerStatus && paramSelections.customer_status === "customer_existing";
}

export function personalizedOfferTitle(
  title: string,
  persona: Persona,
  paramSelections: Record<string, string>
): string {
  if (!isKnownExistingCustomer(persona, paramSelections)) return title;
  const firstName = persona.name.split(" ")[0];
  return `${firstName}, ${title}`;
}
