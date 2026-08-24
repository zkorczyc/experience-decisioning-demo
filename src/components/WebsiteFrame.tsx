"use client";

import { Text } from "@adobe/react-spectrum";
import { DecisionResult, Persona, Vertical } from "@/lib/types";
import { hexToRgba } from "@/lib/color";
import { personalizedOfferTitle } from "@/lib/profileSummary";
import type { CSSProperties } from "react";
import Image from "next/image";

export default function WebsiteFrame({
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
  const { winner } = result;
  const title = winner ? personalizedOfferTitle(winner.offer.name, persona, paramSelections) : null;

  return (
    <div style={{ flex: 1, minWidth: 320 }}>
      <Text UNSAFE_style={labelStyle}>Website</Text>
      <div style={browserChromeStyle}>
        <div style={browserTopBarStyle}>
          <span style={dotStyle("#ff5f57")} />
          <span style={dotStyle("#febc2e")} />
          <span style={dotStyle("#28c840")} />
          <div style={addressBarStyle}>{vertical.brand.toLowerCase().replace(/\s+/g, "")}.com</div>
        </div>

        <div style={siteNavStyle}>
          {vertical.logoUrl ? (
            <Image
              src={vertical.logoUrl}
              alt={vertical.brand}
              width={73}
              height={20}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <span style={{ fontWeight: 700, color: vertical.colors.dark }}>{vertical.brand}</span>
          )}
        </div>

        <div key={winner?.offer.id ?? "none"} style={heroStyle(vertical.colors.dark)}>
          {winner?.offer.imageUrl && (
            <>
              <Image src={winner.offer.imageUrl} alt="" fill sizes="(max-width: 640px) 100vw, 640px" style={heroImageStyle} />
              <div style={heroScrimStyle(vertical.colors.dark)} />
            </>
          )}
          <div style={heroOverlayStyle}>
            {winner ? (
              <>
                <div style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", marginBottom: 14, maxWidth: 380 }}>
                  {winner.offer.description}
                </div>
                <button style={ctaStyle(vertical.colors.accent, vertical.colors.dark)}>{winner.offer.cta}</button>
              </>
            ) : (
              <div style={{ color: "white" }}>No offer eligible yet.</div>
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

const browserChromeStyle: CSSProperties = {
  borderRadius: 10,
  overflow: "hidden",
  border: "1px solid var(--spectrum-global-color-gray-300)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
};

const browserTopBarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 10px",
  backgroundColor: "#e5e5e5",
};

const addressBarStyle: CSSProperties = {
  marginLeft: 10,
  flex: 1,
  backgroundColor: "white",
  borderRadius: 6,
  padding: "3px 10px",
  fontSize: 11,
  color: "#555",
};

const siteNavStyle: CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "white",
  borderBottom: "1px solid var(--spectrum-global-color-gray-200)",
};

function heroStyle(dark: string): CSSProperties {
  return {
    position: "relative",
    minHeight: 260,
    aspectRatio: "2.33 / 1",
    backgroundColor: dark,
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  };
}

const heroImageStyle: CSSProperties = {
  objectFit: "cover",
};

function heroScrimStyle(dark: string): CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(65deg, ${hexToRgba(dark, 0.9)} 0%, ${hexToRgba(dark, 0.5)} 30%, ${hexToRgba(dark, 0)} 60%)`,
  };
}

const heroOverlayStyle: CSSProperties = {
  position: "relative",
  padding: 24,
};

function ctaStyle(accent: string, dark: string): CSSProperties {
  return {
    backgroundColor: accent,
    color: dark,
    border: "none",
    borderRadius: 999,
    padding: "10px 20px",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
  };
}

function dotStyle(color: string): CSSProperties {
  return { width: 10, height: 10, borderRadius: "50%", backgroundColor: color, display: "inline-block" };
}
