export const locales = ["en", "pl", "de", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  pl: "Polski",
  de: "Deutsch",
  it: "Italiano",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  pl: "🇵🇱",
  de: "🇩🇪",
  it: "🇮🇹",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
