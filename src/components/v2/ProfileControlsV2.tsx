"use client";

import { Flex, Heading, Item, Picker, Switch, Text, View, Well } from "@adobe/react-spectrum";
import { Persona, Vertical } from "@/lib/types";
import { getPersonaAvatarUrl } from "@/lib/personaAvatars";
import { buildProfileSentence } from "@/lib/profileSummary";
import { t } from "@/lib/localized";
import { v2ParamLabel, v2OptionLabel } from "@/lib/v2Labels";
import { personaFirstNameLocative } from "@/lib/personaNameForms";
import { format } from "@/i18n/dictionary";
import { useLocale } from "@/i18n/LocaleProvider";
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
  const { locale, dict } = useLocale();
  const firstName = persona.name.split(" ")[0];
  const step1Name = personaFirstNameLocative(persona.id, firstName, locale);
  const profileSentence = buildProfileSentence(
    persona,
    paramSelections,
    vertical,
    locale,
    dict,
    dict.v2Overrides.notYetACustomer
  );
  const avatarUrl =
    getPersonaAvatarUrl(persona.avatarKey ?? persona.id, paramSelections.age, paramSelections.sentiment, activeSignals.has("has_family")) ??
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
          {format(dict.v2.profileControls.step1Title, { firstName: step1Name })}
        </Heading>
        <Text>{format(dict.v2.profileControls.step1Desc, { brand: vertical.brand })}</Text>
        <Flex direction="column" gap="size-200" marginTop="size-150">
          {persona.parameterDefs.map((param) => (
            <View key={param.id}>
              <Picker
                label={v2ParamLabel(param.id, t(param.label, locale), dict)}
                selectedKey={paramSelections[param.id]}
                onSelectionChange={(key: Key | null) => key !== null && onParamChange(param.id, String(key))}
              >
                {param.options.map((option) => (
                  <Item key={option.id}>{v2OptionLabel(option.id, t(option.label, locale), dict)}</Item>
                ))}
              </Picker>
              <Text
                UNSAFE_style={{ display: "block", fontSize: "12px", color: "var(--spectrum-global-color-gray-600)", marginTop: 4 }}
              >
                {t(param.description, locale)}
              </Text>
            </View>
          ))}
        </Flex>

        {persona.audiences && persona.audiences.length > 0 && (
          <View marginTop="size-250">
            <Text UNSAFE_style={{ fontSize: "13px", fontWeight: 600 }}>{dict.v2.profileControls.audiences}</Text>
            <Flex direction="column" gap="size-150" marginTop="size-100">
              {persona.audiences.map((audience) => (
                <View key={audience.id}>
                  <Switch
                    isSelected={activeSignals.has(audience.signal)}
                    onChange={(isOn) => onEventToggle(audience.signal, isOn)}
                  >
                    {t(audience.label, locale)}
                  </Switch>
                  <Text
                    UNSAFE_style={{ display: "block", fontSize: "12px", color: "var(--spectrum-global-color-gray-600)" }}
                  >
                    {t(audience.description, locale)}
                  </Text>
                </View>
              ))}
            </Flex>
          </View>
        )}
      </Well>

      <Well>
        <Heading level={4} margin={0}>
          {dict.v2.profileControls.step2Title}
        </Heading>
        <Text>{dict.v2.profileControls.step2Desc}</Text>
        <Flex direction="column" gap="size-150" marginTop="size-150">
          {persona.eventDefs.map((event) => (
            <View key={event.id}>
              <Switch
                isSelected={activeSignals.has(event.signal)}
                onChange={(isOn) => onEventToggle(event.signal, isOn)}
              >
                {t(event.label, locale)}
              </Switch>
              <Text
                UNSAFE_style={{ display: "block", fontSize: "12px", color: "var(--spectrum-global-color-gray-600)" }}
              >
                {t(event.description, locale)}
              </Text>
            </View>
          ))}
        </Flex>
      </Well>
    </Flex>
  );
}
