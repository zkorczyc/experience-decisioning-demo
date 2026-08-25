"use client";

import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { locales, localeFlags, type Locale } from "./locales";
import { useLocale } from "./LocaleProvider";

export default function LanguageSwitcher() {
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(nextLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || "/");
  }

  return (
    <div style={containerStyle}>
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          aria-label={`Switch to ${code.toUpperCase()}`}
          aria-pressed={code === locale}
          style={flagButtonStyle(code === locale)}
        >
          {localeFlags[code]}
        </button>
      ))}
    </div>
  );
}

const containerStyle: CSSProperties = {
  position: "fixed",
  top: 16,
  right: 16,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: 6,
  borderRadius: 10,
  backgroundColor: "var(--spectrum-global-color-gray-50, white)",
  border: "1px solid var(--spectrum-global-color-gray-300, #d5d5d5)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

function flagButtonStyle(active: boolean): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    padding: 0,
    fontSize: 17,
    lineHeight: 1,
    borderRadius: 6,
    border: active ? "1px solid var(--spectrum-global-color-gray-500, #909090)" : "1px solid transparent",
    backgroundColor: active ? "var(--spectrum-global-color-gray-200, #eaeaea)" : "transparent",
    cursor: "pointer",
    opacity: active ? 1 : 0.6,
  };
}
