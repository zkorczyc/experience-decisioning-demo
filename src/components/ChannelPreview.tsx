"use client";

import { Badge, Flex, Heading, Text, View } from "@adobe/react-spectrum";
import { DecisionResult, Persona, Vertical } from "@/lib/types";
import { buildProfileSummary, shortCollectionLabel } from "@/lib/profileSummary";
import PhoneFrame from "./PhoneFrame";
import WebsiteFrame from "./WebsiteFrame";

export default function ChannelPreview({
  vertical,
  persona,
  paramSelections,
  activeSignals,
  result,
}: {
  vertical: Vertical;
  persona: Persona;
  paramSelections: Record<string, string>;
  activeSignals: Set<string>;
  result: DecisionResult;
}) {
  const summaryParts = buildProfileSummary(persona, paramSelections, vertical, activeSignals);

  return (
    <View>
      <Flex direction="column" gap="size-100" marginBottom="size-200">
        <Text UNSAFE_style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.05em" }}>
          Currently shown to
        </Text>
        <Heading level={3} margin={0}>
          {persona.name}
        </Heading>
        <Flex direction="row" gap="size-100" wrap>
          <Badge variant="indigo">Exploring: {shortCollectionLabel(result.collectionName, vertical.brand)}</Badge>
          {summaryParts.map((part) => (
            <Badge key={part} variant="seafoam">
              {part}
            </Badge>
          ))}
        </Flex>
      </Flex>

      <Flex direction="row" wrap gap="size-300" alignItems="start">
        <PhoneFrame vertical={vertical} persona={persona} paramSelections={paramSelections} result={result} />
        <WebsiteFrame vertical={vertical} persona={persona} paramSelections={paramSelections} result={result} />
      </Flex>
    </View>
  );
}
