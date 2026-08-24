"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { Badge, Flex, Heading, Text, View } from "@adobe/react-spectrum";
import { DecisionResult, Persona, Vertical } from "@/lib/types";
import { buildProfileSummary, shortCollectionLabel } from "@/lib/profileSummary";
import { buildSignalLabels } from "@/lib/decisioning";
import { v2SignalLabel } from "@/lib/v2Labels";
import PhoneFrame from "../PhoneFrame";
import WebsiteFrame from "../WebsiteFrame";
import BehindTheScenesPanelV2 from "./BehindTheScenesPanelV2";

function basedOnLine(
  winner: DecisionResult["winner"],
  signalLabels: Record<string, string>,
  lastChangedSignal: string | null
): string {
  if (!winner) return "";
  const affinityLabels = winner.matchedAffinityTags.map((s) => v2SignalLabel(s, signalLabels[s] ?? s));
  const recencyLabel =
    winner.recencyBonus > 0 && lastChangedSignal
      ? v2SignalLabel(lastChangedSignal, signalLabels[lastChangedSignal] ?? lastChangedSignal)
      : null;
  const parts = [...new Set([...affinityLabels, ...(recencyLabel ? [recencyLabel] : [])])];
  return parts.length > 0 ? parts.join(" · ") : "general best match";
}

type PrevWinner = { personaKey: string; offerId: string | null; offerName: string | null };

function DecisionHeadline({
  firstName,
  personaKey,
  winnerOfferId,
  winnerOfferName,
  basedOn,
}: {
  firstName: string;
  personaKey: string;
  winnerOfferId: string | null;
  winnerOfferName: string | null;
  basedOn: string;
}) {
  const [banner, setBanner] = useState<{ from: string; to: string } | null>(null);
  const prevRef = useRef<PrevWinner | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    const samePersona = prev !== null && prev.personaKey === personaKey;
    const offerChanged = samePersona && prev!.offerId !== winnerOfferId;

    if (offerChanged && prev!.offerId !== null && winnerOfferId !== null) {
      setBanner({ from: prev!.offerName!, to: winnerOfferName! });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setBanner(null), 2500);
    }

    prevRef.current = { personaKey, offerId: winnerOfferId, offerName: winnerOfferName };
  }, [personaKey, winnerOfferId, winnerOfferName]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Flex direction="column" gap="size-50">
      <Text
        UNSAFE_style={{
          textTransform: "uppercase",
          fontSize: "11px",
          fontWeight: "bold",
          letterSpacing: "0.06em",
          color: "var(--spectrum-global-color-gray-600)",
        }}
      >
        Adobe selected for {firstName}
      </Text>
      <Heading level={2} margin={0}>
        {winnerOfferName ? `${winnerOfferName} 🏆` : "No offer eligible"}
      </Heading>
      <AnimatePresence>
        {banner && (
          <motion.div
            key="decision-updated-banner"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={bannerStyle}
            role="status"
            aria-live="polite"
          >
            Decision updated: {banner.from} → {banner.to}
          </motion.div>
        )}
      </AnimatePresence>
      {winnerOfferName && (
        <Text UNSAFE_style={{ fontSize: "13px", color: "var(--spectrum-global-color-gray-800)" }}>
          Based on: {basedOn}
        </Text>
      )}
    </Flex>
  );
}

const disclosureButtonStyle: CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  fontSize: 14,
  fontWeight: 600,
  color: "var(--spectrum-global-color-gray-800)",
  cursor: "pointer",
};

const bannerStyle: CSSProperties = {
  display: "inline-block",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--spectrum-global-color-blue-700)",
  backgroundColor: "var(--spectrum-global-color-blue-100)",
  border: "1px solid var(--spectrum-global-color-blue-300)",
  borderRadius: 6,
  padding: "4px 10px",
};

function InterestBadge({
  label,
  lastChangedSignal,
  eventSignals,
}: {
  label: string;
  lastChangedSignal: string | null;
  eventSignals: Set<string>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prevSignal = useRef<string | null>(null);

  useEffect(() => {
    const isNewEventSignal =
      lastChangedSignal !== null && lastChangedSignal !== prevSignal.current && eventSignals.has(lastChangedSignal);
    if (isNewEventSignal && ref.current) {
      animate(
        ref.current,
        { scale: [1, 1.08, 1] },
        { duration: 0.8, ease: "easeOut" }
      );
    }
    prevSignal.current = lastChangedSignal;
  }, [lastChangedSignal, eventSignals]);

  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <Badge variant="indigo">{label}</Badge>
    </div>
  );
}

export default function ChannelPreviewV2({
  vertical,
  persona,
  paramSelections,
  activeSignals,
  result,
  behindTheScenes,
  onToggleBehindTheScenes,
}: {
  vertical: Vertical;
  persona: Persona;
  paramSelections: Record<string, string>;
  activeSignals: Set<string>;
  result: DecisionResult;
  behindTheScenes: boolean;
  onToggleBehindTheScenes: () => void;
}) {
  const summaryParts = buildProfileSummary(persona, paramSelections, vertical, activeSignals);
  const signalLabels = buildSignalLabels(persona);
  const { winner, lastChangedSignal } = result;
  const personaKey = `${vertical.id}:${persona.id}`;
  const firstName = persona.name.split(" ")[0];
  const eventSignals = new Set(persona.eventDefs.map((e) => e.signal));

  return (
    <View>
      <View marginBottom="size-200">
        <DecisionHeadline
          firstName={firstName}
          personaKey={personaKey}
          winnerOfferId={winner?.offer.id ?? null}
          winnerOfferName={winner?.offer.name ?? null}
          basedOn={basedOnLine(winner, signalLabels, lastChangedSignal)}
        />
      </View>

      <Flex direction="column" gap="size-100" marginBottom="size-200">
        <Text UNSAFE_style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.05em" }}>
          {persona.name}
        </Text>
        <Flex direction="row" gap="size-100" wrap>
          <InterestBadge
            label={`Current interests: ${shortCollectionLabel(result.collectionName, vertical.brand)}`}
            lastChangedSignal={lastChangedSignal}
            eventSignals={eventSignals}
          />
          {summaryParts.map((part) => (
            <Badge key={part} variant="seafoam">
              {part}
            </Badge>
          ))}
        </Flex>
      </Flex>

      <Text UNSAFE_style={{ display: "block", fontSize: "12px", color: "var(--spectrum-global-color-gray-600)", marginBottom: 8 }}>
        Shown across channels
      </Text>

      <Flex direction="row" wrap gap="size-300" alignItems="start">
        <PhoneFrame vertical={vertical} persona={persona} paramSelections={paramSelections} result={result} />
        <WebsiteFrame vertical={vertical} persona={persona} paramSelections={paramSelections} result={result} />
      </Flex>

      <View
        marginTop="size-300"
        paddingTop="size-200"
        borderTopWidth="thin"
        borderTopColor="gray-300"
      >
        <button
          onClick={onToggleBehindTheScenes}
          style={disclosureButtonStyle}
          aria-expanded={behindTheScenes}
        >
          Why did Adobe choose this? Behind the scenes {behindTheScenes ? "▾" : "▸"}
        </button>
        <AnimatePresence>
          {behindTheScenes && (
            <motion.div
              key="behind-the-scenes-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: "hidden" }}
            >
              <BehindTheScenesPanelV2 result={result} persona={persona} brand={vertical.brand} />
            </motion.div>
          )}
        </AnimatePresence>
      </View>
    </View>
  );
}
