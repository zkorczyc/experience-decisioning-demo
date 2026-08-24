"use client";

import { useMemo, useState } from "react";
import { Flex, Heading, Item, TabList, TabPanels, Tabs, Text, View } from "@adobe/react-spectrum";
import { verticals } from "@/lib/verticals";
import { decide } from "@/lib/decisioning";
import { Persona } from "@/lib/types";
import VerticalSwitcher from "../VerticalSwitcher";
import PersonaSwitcher from "../PersonaSwitcher";
import ProfileControlsV2 from "./ProfileControlsV2";
import ChannelPreviewV2 from "./ChannelPreviewV2";
import CoverageSummaryV2 from "./CoverageSummaryV2";

function findVertical(verticalId: string) {
  return verticals.find((v) => v.id === verticalId)!;
}

function defaultParamSelections(persona: Persona): Record<string, string> {
  const selections: Record<string, string> = {};
  for (const param of persona.parameterDefs) {
    selections[param.id] = param.defaultOptionId;
  }
  return selections;
}

function initialSignalsFor(persona: Persona): Set<string> {
  const defaultSignals = persona.parameterDefs.map(
    (param) => param.options.find((o) => o.id === param.defaultOptionId)!.signal
  );
  return new Set([...persona.baselineSignals, ...defaultSignals]);
}

export default function DecisioningDemoV2() {
  const [verticalId, setVerticalId] = useState(verticals[0].id);
  const [personaId, setPersonaId] = useState(verticals[0].personas[0].id);
  const [activeSignals, setActiveSignals] = useState<Set<string>>(() =>
    initialSignalsFor(verticals[0].personas[0])
  );
  const [paramSelections, setParamSelections] = useState<Record<string, string>>(() =>
    defaultParamSelections(verticals[0].personas[0])
  );
  const [lastChangedSignal, setLastChangedSignal] = useState<string | null>(null);
  const [behindTheScenes, setBehindTheScenes] = useState(false);

  const vertical = findVertical(verticalId);
  const persona = vertical.personas.find((p) => p.id === personaId)!;

  const result = useMemo(
    () => decide(persona, activeSignals, lastChangedSignal),
    [persona, activeSignals, lastChangedSignal]
  );

  function resetToPersona(newVerticalId: string, newPersonaId: string) {
    const newPersona = findVertical(newVerticalId).personas.find((p) => p.id === newPersonaId)!;
    setVerticalId(newVerticalId);
    setPersonaId(newPersonaId);
    setActiveSignals(initialSignalsFor(newPersona));
    setParamSelections(defaultParamSelections(newPersona));
    setLastChangedSignal(null);
  }

  function handleVerticalChange(newVerticalId: string) {
    resetToPersona(newVerticalId, findVertical(newVerticalId).personas[0].id);
  }

  function handlePersonaChange(newPersonaId: string) {
    resetToPersona(verticalId, newPersonaId);
  }

  function handleEventToggle(signal: string, isOn: boolean) {
    setActiveSignals((prev) => {
      const next = new Set(prev);
      if (isOn) next.add(signal);
      else next.delete(signal);
      return next;
    });
    setLastChangedSignal(isOn ? signal : null);
  }

  function handleParamChange(paramId: string, optionId: string) {
    const param = persona.parameterDefs.find((p) => p.id === paramId)!;
    const newOption = param.options.find((o) => o.id === optionId)!;
    setActiveSignals((prev) => {
      const next = new Set(prev);
      for (const option of param.options) next.delete(option.signal);
      next.add(newOption.signal);
      return next;
    });
    setParamSelections((prev) => ({ ...prev, [paramId]: optionId }));
    setLastChangedSignal(newOption.signal);
  }

  return (
    <View padding="size-400" width="100%" maxWidth="1800px" marginX="auto">
      <Flex direction="column" gap="size-300">
        <View>
          <Text
            UNSAFE_style={{
              textTransform: "uppercase",
              fontSize: "11px",
              fontWeight: "bold",
              letterSpacing: "0.08em",
              color: "var(--spectrum-global-color-gray-600)",
            }}
          >
            Adobe Experience Decisioning
          </Text>
          <Heading level={1} margin={0}>
            See how Adobe chooses the next best experience
          </Heading>
          <Text>Change what we know about a customer and see how the experience adapts instantly.</Text>
        </View>

        <Tabs>
          <TabList>
            <Item key="demo">Interactive demo</Item>
            <Item key="summary">Explore all decisions</Item>
          </TabList>
          <TabPanels>
            <Item key="demo">
              <Flex direction="column" gap="size-300" marginTop="size-200">
                <Flex direction="column" gap="size-200">
                  <VerticalSwitcher verticals={verticals} selectedId={verticalId} onChange={handleVerticalChange} />
                  <View>
                    <Text
                      UNSAFE_style={{
                        display: "block",
                        fontSize: "14px",
                        color: "var(--spectrum-global-color-gray-800)",
                        marginBottom: 4,
                      }}
                    >
                      2. Choose your demo persona
                    </Text>
                    <PersonaSwitcher personas={vertical.personas} selectedId={personaId} onChange={handlePersonaChange} />
                  </View>
                </Flex>

                <Flex direction={{ base: "column", L: "row" }} gap="size-400" alignItems="start">
                  <View flex="1 1 380px" minWidth="size-4600">
                    <ProfileControlsV2
                      persona={persona}
                      vertical={vertical}
                      activeSignals={activeSignals}
                      paramSelections={paramSelections}
                      onEventToggle={handleEventToggle}
                      onParamChange={handleParamChange}
                    />
                  </View>
                  <View flex="2 1 640px" width="100%">
                    <ChannelPreviewV2
                      vertical={vertical}
                      persona={persona}
                      paramSelections={paramSelections}
                      activeSignals={activeSignals}
                      result={result}
                      behindTheScenes={behindTheScenes}
                      onToggleBehindTheScenes={() => setBehindTheScenes((prev) => !prev)}
                    />
                  </View>
                </Flex>
              </Flex>
            </Item>
            <Item key="summary">
              <View marginTop="size-200">
                <CoverageSummaryV2 />
              </View>
            </Item>
          </TabPanels>
        </Tabs>
      </Flex>
    </View>
  );
}
