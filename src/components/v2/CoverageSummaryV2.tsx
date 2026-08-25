"use client";

import { Heading, Text, View, Well } from "@adobe/react-spectrum";
import { verticals } from "@/lib/verticals";
import { decide } from "@/lib/decisioning";
import { t } from "@/lib/localized";
import { Persona, ParameterDef } from "@/lib/types";
import { useLocale } from "@/i18n/LocaleProvider";

type Combo = { paramId: string; optionId: string; label: string }[];

function cartesianOptions(paramDefs: ParameterDef[], locale: ReturnType<typeof useLocale>["locale"]): Combo[] {
  let combos: Combo[] = [[]];
  for (const param of paramDefs) {
    const next: Combo[] = [];
    for (const combo of combos) {
      for (const option of param.options) {
        next.push([...combo, { paramId: param.id, optionId: option.id, label: t(option.label, locale) }]);
      }
    }
    combos = next;
  }
  return combos;
}

function buildRows(persona: Persona, locale: ReturnType<typeof useLocale>["locale"], dict: ReturnType<typeof useLocale>["dict"]) {
  const combos = cartesianOptions(persona.parameterDefs, locale);
  return combos.map((combo) => {
    const signals = new Set<string>(persona.baselineSignals);
    for (const c of combo) {
      const param = persona.parameterDefs.find((p) => p.id === c.paramId)!;
      const option = param.options.find((o) => o.id === c.optionId)!;
      signals.add(option.signal);
    }
    const result = decide(persona, signals, null, locale, dict);
    return { combo, result };
  });
}

export default function CoverageSummaryV2() {
  const { locale, dict } = useLocale();
  const sections = verticals
    .filter((vertical) => !vertical.disabled)
    .flatMap((vertical) => vertical.personas.map((persona) => ({ vertical, persona })));

  return (
    <Well>
      <Heading level={3} margin={0}>
        {dict.v2.coverageSummary.title}
      </Heading>
      <Text UNSAFE_style={{ fontSize: "13px", color: "var(--spectrum-global-color-gray-700)", display: "block", marginTop: 4 }}>
        {dict.v2.coverageSummary.description}
      </Text>

      {sections.map(({ vertical, persona }) => {
        const rows = buildRows(persona, locale, dict);
        const paramLabels = persona.parameterDefs.map((p) => t(p.label, locale));
        const { image, title, subtitle, cta } = dict.v2.coverageSummary.tableHeaders;

        return (
          <View key={`${vertical.id}-${persona.id}`} marginTop="size-300">
            <Heading level={4} margin={0}>
              {persona.name} — {vertical.brand}
            </Heading>
            <View overflow="auto" marginTop="size-100">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr>
                    {[...paramLabels, image, title, subtitle, cta].map((h, i) => (
                      <th
                        key={i}
                        style={{
                          textAlign: "left",
                          padding: "6px 8px",
                          borderBottom: "2px solid var(--spectrum-global-color-gray-300)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ combo, result }, i) => {
                    const offer = result.winner?.offer;
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid var(--spectrum-global-color-gray-200)" }}>
                        {combo.map((c) => (
                          <td key={c.paramId} style={{ padding: "6px 8px", whiteSpace: "nowrap" }}>
                            {c.label}
                          </td>
                        ))}
                        <td style={{ padding: "6px 8px" }}>
                          {offer?.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={offer.imageUrl}
                              alt=""
                              style={{ width: 64, height: 36, objectFit: "cover", borderRadius: 4 }}
                            />
                          ) : (
                            <span style={{ color: "var(--spectrum-global-color-gray-500)" }}>{dict.common.dash}</span>
                          )}
                        </td>
                        <td style={{ padding: "6px 8px", fontWeight: "bold" }}>
                          {offer ? t(offer.name, locale) : dict.common.noOfferEligible}
                        </td>
                        <td style={{ padding: "6px 8px", color: "var(--spectrum-global-color-gray-700)" }}>
                          {offer ? t(offer.description, locale) : dict.common.dash}
                        </td>
                        <td style={{ padding: "6px 8px" }}>{offer ? t(offer.cta, locale) : dict.common.dash}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </View>
          </View>
        );
      })}
    </Well>
  );
}
