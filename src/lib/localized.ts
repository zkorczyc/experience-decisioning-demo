import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}
