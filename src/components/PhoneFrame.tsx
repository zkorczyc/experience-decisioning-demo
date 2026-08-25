"use client";

import { Text } from "@adobe/react-spectrum";
import { DecisionResult, Persona, Vertical } from "@/lib/types";
import { t } from "@/lib/localized";
import { personalizedOfferTitle } from "@/lib/profileSummary";
import { useLocale } from "@/i18n/LocaleProvider";
import type { CSSProperties } from "react";
import Image from "next/image";

export default function PhoneFrame({
  vertical,
  persona,
  paramSelections,
  result,
}: {
  vertical: Vertical;
  persona: Persona;
  paramSelections: Record<string, string>;
  result: DecisionResult;
}) {
  const { locale, dict } = useLocale();
  const { winner } = result;
  const mobileOfferName = winner ? t(winner.offer.mobileName ?? winner.offer.name, locale) : null;
  const title = winner && mobileOfferName ? personalizedOfferTitle(mobileOfferName, persona, paramSelections) : null;

  return (
    <div>
      <Text UNSAFE_style={labelStyle}>{dict.common.mobileApp}</Text>
      <div style={phoneBezelStyle}>
        <div style={{ ...phoneScreenStyle, backgroundColor: vertical.colors.dark }}>
          <div style={statusBarStyle}>
            <span>9:41</span>
            <span>●●●</span>
          </div>

          <div style={brandRowStyle}>
            {vertical.logoUrl ? (
              <div style={logoPillStyle}>
                <Image src={vertical.logoUrl} alt={vertical.brand} width={66} height={18} style={{ objectFit: "contain" }} />
              </div>
            ) : (
              <span style={{ color: "white", fontWeight: 700 }}>{vertical.brand}</span>
            )}
          </div>

          <div key={winner?.offer.id ?? "none"} style={notificationCardStyle}>
            {winner ? (
              <>
                {winner.offer.mobileImageUrl && (
                  <div style={notificationImageWrapStyle}>
                    <Image
                      src={winner.offer.mobileImageUrl}
                      alt=""
                      fill
                      sizes="220px"
                      style={{ objectFit: "cover", objectPosition: "center bottom" }}
                    />
                  </div>
                )}
                <div style={notificationTextStyle}>
                  <div style={{ fontSize: 11, color: "#8a94a3", marginBottom: 4 }}>
                    {vertical.brand} · {dict.common.now}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.4, marginBottom: 10 }}>
                    {t(winner.offer.mobileDescription ?? winner.offer.description, locale)}
                  </div>
                  <button style={ctaStyle(vertical.colors.accent, vertical.colors.dark)}>
                    {t(winner.offer.mobileCta ?? winner.offer.cta, locale)}
                  </button>
                </div>
              </>
            ) : (
              <div style={notificationTextStyle}>
                <div style={{ fontSize: 13, color: "#4b5563" }}>{dict.common.noOfferEligibleYet}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: "bold",
  marginBottom: 8,
  color: "var(--spectrum-global-color-gray-700)",
};

const phoneBezelStyle: CSSProperties = {
  width: 280,
  borderRadius: 32,
  border: "10px solid #1a1a1a",
  backgroundColor: "#1a1a1a",
  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  margin: "0 auto",
};

const phoneScreenStyle: CSSProperties = {
  borderRadius: 22,
  overflow: "hidden",
  minHeight: 400,
  color: "white",
  fontFamily: "sans-serif",
};

const statusBarStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 11,
  padding: "10px 16px 4px",
};

const brandRowStyle: CSSProperties = {
  padding: "8px 16px 20px",
};

const logoPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: 6,
  padding: "4px 8px",
};

const notificationCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  margin: "0 12px",
  backgroundColor: "white",
  borderRadius: 14,
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

const notificationImageWrapStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "0.8 / 1",
  flexShrink: 0,
};

const notificationTextStyle: CSSProperties = {
  padding: 12,
};

function ctaStyle(accent: string, dark: string): CSSProperties {
  return {
    backgroundColor: accent,
    color: dark,
    border: "none",
    borderRadius: 999,
    padding: "6px 16px",
    fontWeight: 700,
    fontSize: 12,
    cursor: "pointer",
  };
}
