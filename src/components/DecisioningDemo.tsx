"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Flex, Heading, Item, Switch, TabList, TabPanels, Tabs, Text, View } from "@adobe/react-spectrum";
import { verticals } from "@/lib/verticals";
import { decide } from "@/lib/decisioning";
import { Persona } from "@/lib/types";
import { useLocale } from "@/i18n/LocaleProvider";
import VerticalSwitcher from "./VerticalSwitcher";
import PersonaSwitcher from "./PersonaSwitcher";
import ProfileControls from "./ProfileControls";
import ChannelPreview from "./ChannelPreview";
import BehindTheScenesPanel from "./BehindTheScenesPanel";
import CoverageSummary from "./CoverageSummary";

function findVertical(verticalId: string) {
  return verticals.find((v) => v.id === verticalId) ?? verticals[0];
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

export default function DecisioningDemo() {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialVertical = findVertical(searchParams.get("vertical") ?? verticals[0].id);
  const initialPersona =
    initialVertical.personas.find((p) => p.id === searchParams.get("persona")) ?? initialVertical.personas[0];

  const [verticalId, setVerticalId] = useState(initialVertical.id);
  const [personaId, setPersonaId] = useState(initialPersona.id);
  const [activeSignals, setActiveSignals] = useState<Set<string>>(() => initialSignalsFor(initialPersona));
  const [paramSelections, setParamSelections] = useState<Record<string, string>>(() =>
    defaultParamSelections(initialPersona)
  );
  const [lastChangedSignal, setLastChangedSignal] = useState<string | null>(null);
  const [behindTheScenes, setBehindTheScenes] = useState(false);

  const vertical = findVertical(verticalId);
  const persona = vertical.personas.find((p) => p.id === personaId)!;

  function syncUrl(newVerticalId: string, newPersonaId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("vertical", newVerticalId);
    params.set("persona", newPersonaId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const result = useMemo(
    () => decide(persona, activeSignals, lastChangedSignal, locale, dict),
    [persona, activeSignals, lastChangedSignal, locale, dict]
  );

  function resetToPersona(newVerticalId: string, newPersonaId: string) {
    const newPersona = findVertical(newVerticalId).personas.find((p) => p.id === newPersonaId)!;
    setVerticalId(newVerticalId);
    setPersonaId(newPersonaId);
    setActiveSignals(initialSignalsFor(newPersona));
    setParamSelections(defaultParamSelections(newPersona));
    setLastChangedSignal(null);
    syncUrl(newVerticalId, newPersonaId);
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
            {dict.common.eyebrow}
          </Text>
          <Heading level={1} margin={0}>
            {dict.v1.heading}
          </Heading>
          <Text>{dict.v1.subheading}</Text>
        </View>

        <Tabs>
          <TabList>
            <Item key="demo">{dict.v1.tabs.demo}</Item>
            <Item key="summary">{dict.v1.tabs.summary}</Item>
          </TabList>
          <TabPanels>
            <Item key="demo">
              <Flex direction="column" gap="size-300" marginTop="size-200">
                <Flex direction="row" gap="size-300" wrap alignItems="start" justifyContent="space-between">
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
                        {dict.personaSwitcherLabel}
                      </Text>
                      <PersonaSwitcher personas={vertical.personas} selectedId={personaId} onChange={handlePersonaChange} />
                    </View>
                  </Flex>
                  <Switch isSelected={behindTheScenes} onChange={setBehindTheScenes}>
                    {dict.v1.behindTheScenesToggle}
                  </Switch>
                </Flex>

                <Flex direction={{ base: "column", L: "row" }} gap="size-400" alignItems="start">
                  <View flex="1 1 380px" minWidth="size-4600">
                    <ProfileControls
                      persona={persona}
                      vertical={vertical}
                      activeSignals={activeSignals}
                      paramSelections={paramSelections}
                      onEventToggle={handleEventToggle}
                      onParamChange={handleParamChange}
                    />
                  </View>
                  <View flex="2 1 640px" width="100%">
                    <ChannelPreview
                      vertical={vertical}
                      persona={persona}
                      paramSelections={paramSelections}
                      activeSignals={activeSignals}
                      result={result}
                    />
                    {behindTheScenes && <BehindTheScenesPanel result={result} />}
                  </View>
                </Flex>
              </Flex>
            </Item>
            <Item key="summary">
              <View marginTop="size-200">
                <CoverageSummary />
              </View>
            </Item>
          </TabPanels>
        </Tabs>
      </Flex>
    </View>
  );
}
