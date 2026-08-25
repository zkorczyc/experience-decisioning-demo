import "server-only";
import type { Locale } from "./locales";
import type { Dictionary } from "./dictionary";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  pl: () => import("./dictionaries/pl").then((m) => m.default),
  de: () => import("./dictionaries/de").then((m) => m.default),
  it: () => import("./dictionaries/it").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
