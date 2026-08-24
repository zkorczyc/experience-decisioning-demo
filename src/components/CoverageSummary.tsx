"use client";

import { Heading, Text, View, Well } from "@adobe/react-spectrum";
import { verticals } from "@/lib/verticals";
import { decide } from "@/lib/decisioning";
import { Persona, ParameterDef } from "@/lib/types";

type Combo = { paramId: string; optionId: string; label: string }[];

function cartesianOptions(paramDefs: ParameterDef[]): Combo[] {
  let combos: Combo[] = [[]];
  for (const param of paramDefs) {
    const next: Combo[] = [];
    for (const combo of combos) {
      for (const option of param.options) {
        next.push([...combo, { paramId: param.id, optionId: option.id, label: option.label }]);
      }
    }
    combos = next;
  }
  return combos;
}

function buildRows(persona: Persona) {
  const combos = cartesianOptions(persona.parameterDefs);
  return combos.map((combo) => {
    const signals = new Set<string>(persona.baselineSignals);
    for (const c of combo) {
      const param = persona.parameterDefs.find((p) => p.id === c.paramId)!;
      const option = param.options.find((o) => o.id === c.optionId)!;
      signals.add(option.signal);
    }
    const result = decide(persona, signals, null);
    return { combo, result };
  });
}

export default function CoverageSummary() {
  const sections = verticals
    .filter((vertical) => !vertical.disabled)
    .flatMap((vertical) => vertical.personas.map((persona) => ({ vertical, persona })));

  return (
    <Well>
      <Heading level={3} margin={0}>
        Coverage summary
      </Heading>
      <Text UNSAFE_style={{ fontSize: "13px", color: "var(--spectrum-global-color-gray-700)", display: "block", marginTop: 4 }}>
        Every combination of profile traits, and which offer wins by default (no extra events toggled on).
      </Text>

      {sections.map(({ vertical, persona }) => {
        const rows = buildRows(persona);
        const paramLabels = persona.parameterDefs.map((p) => p.label);

        return (
          <View key={`${vertical.id}-${persona.id}`} marginTop="size-300">
            <Heading level={4} margin={0}>
              {persona.name} — {vertical.brand}
            </Heading>
            <View overflow="auto" marginTop="size-100">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr>
                    {[...paramLabels, "Image", "Title", "Subtitle", "CTA"].map((h) => (
                      <th
                        key={h}
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
                            <span style={{ color: "var(--spectrum-global-color-gray-500)" }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: "6px 8px", fontWeight: "bold" }}>{offer?.name ?? "No offer eligible"}</td>
                        <td style={{ padding: "6px 8px", color: "var(--spectrum-global-color-gray-700)" }}>
                          {offer?.description ?? "—"}
                        </td>
                        <td style={{ padding: "6px 8px" }}>{offer?.cta ?? "—"}</td>
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
