import type { Locale } from "@/i18n/locales";

type CaseForms = { genitive?: string; locative?: string };

// Only languages with grammatical case (currently Polish) need declined name
// forms here; other locales fall back to the plain first name untouched.
const PERSONA_NAME_FORMS: Record<string, Partial<Record<Locale, CaseForms>>> = {
  anna: { pl: { genitive: "Anny", locative: "Annie" } },
  lukas: { pl: { genitive: "Lukasa", locative: "Lukasie" } },
  marcus: { pl: { genitive: "Marcusa", locative: "Marcusie" } },
};

export function personaFirstNameGenitive(personaId: string, firstName: string, locale: Locale): string {
  return PERSONA_NAME_FORMS[personaId]?.[locale]?.genitive ?? firstName;
}

export function personaFirstNameLocative(personaId: string, firstName: string, locale: Locale): string {
  return PERSONA_NAME_FORMS[personaId]?.[locale]?.locative ?? firstName;
}
