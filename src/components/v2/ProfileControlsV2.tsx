"use client";

import { Flex, Heading, Item, Picker, Switch, Text, View, Well } from "@adobe/react-spectrum";
import { Persona, Vertical } from "@/lib/types";
import { getPersonaAvatarUrl } from "@/lib/personaAvatars";
import { buildProfileSentence } from "@/lib/profileSummary";
import { v2ParamLabel, v2OptionLabel } from "@/lib/v2Labels";
import { Key } from "react";

export default function ProfileControlsV2({
  persona,
  vertical,
  activeSignals,
  paramSelections,
  onEventToggle,
  onParamChange,
}: {
  persona: Persona;
  vertical: Vertical;
  activeSignals: Set<string>;
  paramSelections: Record<string, string>;
  onEventToggle: (signal: string, isOn: boolean) => void;
  onParamChange: (paramId: string, optionId: string) => void;
}) {
  const firstName = persona.name.split(" ")[0];
  const profileSentence = buildProfileSentence(persona, paramSelections, vertical).replace(
    /\bProspect\b/,
    "Not yet a customer"
  );
  const avatarUrl =
    getPersonaAvatarUrl(persona.id, paramSelections.age, paramSelections.sentiment, activeSignals.has("has_family")) ??
    `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#5258e4"/><text x="32" y="40" font-size="24" fill="white" text-anchor="middle" font-family="Arial">${persona.avatarInitials}</text></svg>`
    )}`;

  return (
    <Flex direction="column" gap="size-300">
      <Well>
        <Flex direction="row" gap="size-200" alignItems="center">
          <img
            src={avatarUrl}
            alt={persona.name}
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <Flex direction="column">
            <Heading level={3} margin={0}>
              {persona.name}
            </Heading>
            <Text UNSAFE_style={{ fontSize: "13px", color: "var(--spectrum-global-color-gray-700)" }}>
              {profileSentence}
            </Text>
          </Flex>
        </Flex>
      </Well>

      <Well>
        <Heading level={4} margin={0}>
          Step 1 — What do we know about {firstName}?
        </Heading>
        <Text>Change what {vertical.brand} knows about this customer.</Text>
        <Flex direction="column" gap="size-200" marginTop="size-150">
          {persona.parameterDefs.map((param) => (
            <View key={param.id}>
              <Picker
                label={v2ParamLabel(param.id, param.label)}
                selectedKey={paramSelections[param.id]}
                onSelectionChange={(key: Key | null) => key !== null && onParamChange(param.id, String(key))}
              >
                {param.options.map((option) => (
                  <Item key={option.id}>{v2OptionLabel(option.id, option.label)}</Item>
                ))}
              </Picker>
              <Text
                UNSAFE_style={{ display: "block", fontSize: "12px", color: "var(--spectrum-global-color-gray-600)", marginTop: 4 }}
              >
                {param.description}
              </Text>
            </View>
          ))}
        </Flex>

        {persona.audiences && persona.audiences.length > 0 && (
          <View marginTop="size-250">
            <Text UNSAFE_style={{ fontSize: "13px", fontWeight: 600 }}>Audiences</Text>
            <Flex direction="column" gap="size-150" marginTop="size-100">
              {persona.audiences.map((audience) => (
                <View key={audience.id}>
                  <Switch
                    isSelected={activeSignals.has(audience.signal)}
                    onChange={(isOn) => onEventToggle(audience.signal, isOn)}
                  >
                    {audience.label}
                  </Switch>
                  <Text
                    UNSAFE_style={{ display: "block", fontSize: "12px", color: "var(--spectrum-global-color-gray-600)" }}
                  >
                    {audience.description}
                  </Text>
                </View>
              ))}
            </Flex>
          </View>
        )}
      </Well>

      <Well>
        <Heading level={4} margin={0}>
          Step 2 — What just happened?
        </Heading>
        <Text>Trigger a recent customer action and watch the decision adapt.</Text>
        <Flex direction="column" gap="size-150" marginTop="size-150">
          {persona.eventDefs.map((event) => (
            <View key={event.id}>
              <Switch
                isSelected={activeSignals.has(event.signal)}
                onChange={(isOn) => onEventToggle(event.signal, isOn)}
              >
                {event.label}
              </Switch>
              <Text
                UNSAFE_style={{ display: "block", fontSize: "12px", color: "var(--spectrum-global-color-gray-600)" }}
              >
                {event.description}
              </Text>
            </View>
          ))}
        </Flex>
      </Well>
    </Flex>
  );
}
