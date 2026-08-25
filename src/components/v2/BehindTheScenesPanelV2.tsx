"use client";

import { Flex, Heading, StatusLight, Text, View, Well } from "@adobe/react-spectrum";
import { DecisionCandidate, DecisionResult, Persona, Signal } from "@/lib/types";
import { buildSignalLabels } from "@/lib/decisioning";
import { t } from "@/lib/localized";
import { format, type Dictionary } from "@/i18n/dictionary";
import { personaFirstNameGenitive } from "@/lib/personaNameForms";
import { useLocale } from "@/i18n/LocaleProvider";
import { motion, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Trend = "up" | "down" | "same";

function TrendArrow({ trend }: { trend: Trend }) {
  if (trend === "up") return <span style={{ color: "var(--spectrum-global-color-green-700)", fontWeight: "bold" }}>▲</span>;
  if (trend === "down") return <span style={{ color: "var(--spectrum-global-color-red-700)", fontWeight: "bold" }}>▼</span>;
  return <span style={{ color: "var(--spectrum-global-color-gray-500)" }}>–</span>;
}

function rankingReasonLabel(candidate: DecisionCandidate, signalLabels: Record<Signal, string>, dict: Dictionary): string {
  const parts: string[] = [];
  if (candidate.recencyBonus > 0) parts.push(dict.v2.behindTheScenesPanel.recentBehavior);
  for (const tag of candidate.matchedAffinityTags) {
    const label = signalLabels[tag] ?? tag;
    if (!parts.includes(label)) parts.push(label);
  }
  return parts.join(" + ");
}

function CandidateRow({
  candidate,
  isWinner,
  trend,
  signalLabels,
}: {
  candidate: DecisionCandidate;
  isWinner: boolean;
  trend: Trend;
  signalLabels: Record<Signal, string>;
}) {
  const { locale, dict } = useLocale();
  const rowRef = useRef<HTMLTableRowElement>(null);
  const prevTotal = useRef(candidate.total);
  const ranking = candidate.affinityBonus + candidate.recencyBonus;
  const showRanking = candidate.eligible && ranking > 0;

  useEffect(() => {
    if (prevTotal.current !== candidate.total && rowRef.current) {
      animate(
        rowRef.current,
        { backgroundColor: ["rgba(46, 160, 67, 0.35)", "rgba(46, 160, 67, 0)"] },
        { duration: 2.2, ease: "easeOut" }
      );
    }
    prevTotal.current = candidate.total;
  }, [candidate.total]);

  return (
    <motion.tr
      ref={rowRef}
      layout
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      style={{
        backgroundColor: isWinner ? "var(--spectrum-global-color-celery-100)" : undefined,
      }}
    >
      <td
        style={{
          padding: "6px 8px",
          textAlign: "center",
          borderLeft: isWinner ? "4px solid var(--spectrum-global-color-celery-600)" : "4px solid transparent",
        }}
      >
        <TrendArrow trend={trend} />
      </td>
      <td style={{ padding: "6px 8px", fontWeight: isWinner ? "bold" : "normal" }}>
        {t(candidate.offer.name, locale)}
        {isWinner ? " 🏆" : ""}
      </td>
      <td style={{ padding: "6px 8px" }}>
        <StatusLight variant={candidate.eligible ? "positive" : "neutral"}>
          {candidate.eligible ? dict.common.yes : dict.common.no}
        </StatusLight>
      </td>
      <td style={{ padding: "6px 8px" }}>{candidate.priorityScore}</td>
      <td style={{ padding: "6px 8px" }}>
        {showRanking ? (
          <div>
            <div>+{ranking}</div>
            <div style={{ fontSize: 11, color: "var(--spectrum-global-color-gray-600)" }}>
              {rankingReasonLabel(candidate, signalLabels, dict)}
            </div>
          </div>
        ) : (
          dict.common.dash
        )}
      </td>
      <td style={{ padding: "6px 8px", fontWeight: "bold" }}>{candidate.eligible ? candidate.total : dict.common.dash}</td>
      <td style={{ padding: "6px 8px", color: "var(--spectrum-global-color-gray-700)" }}>{candidate.reason}</td>
    </motion.tr>
  );
}

export default function BehindTheScenesPanelV2({
  result,
  persona,
  brand,
}: {
  result: DecisionResult;
  persona: Persona;
  brand: string;
}) {
  const { locale, dict } = useLocale();
  const firstName = persona.name.split(" ")[0];
  const step3Name = personaFirstNameGenitive(persona.id, firstName, locale);
  const signalLabels = useMemo(() => buildSignalLabels(persona, locale), [persona, locale]);

  const [prevRank, setPrevRank] = useState<Record<string, number> | null>(null);
  const [trackedCandidates, setTrackedCandidates] = useState(result.candidates);
  const [trends, setTrends] = useState<Record<string, Trend>>({});

  if (trackedCandidates !== result.candidates) {
    const rank: Record<string, number> = {};
    const nextTrends: Record<string, Trend> = {};
    result.candidates.forEach((candidate, index) => {
      rank[candidate.offer.id] = index;
      const prevIndex = prevRank?.[candidate.offer.id];
      nextTrends[candidate.offer.id] =
        prevIndex === undefined || prevIndex === index ? "same" : index < prevIndex ? "up" : "down";
    });
    setPrevRank(rank);
    setTrackedCandidates(result.candidates);
    setTrends(nextTrends);
  }

  const panel = dict.v2.behindTheScenesPanel;

  return (
    <Well marginTop="size-200">
      <Flex direction="column" gap="size-150">
        <Heading level={4} margin={0}>
          {dict.common.behindTheScenesHeading}
        </Heading>

        <Flex direction="column" gap="size-50">
          <Text UNSAFE_style={{ fontWeight: 600 }}>{panel.howAdobeDecides}</Text>
          <Text UNSAFE_style={{ fontSize: "13px", color: "var(--spectrum-global-color-gray-700)" }}>
            {format(panel.intro, { brand })}
          </Text>
          <Text UNSAFE_style={{ fontSize: "13px" }}>{format(panel.step1, { firstName })}</Text>
          <Text UNSAFE_style={{ fontSize: "13px" }}>{panel.step2}</Text>
          <Text UNSAFE_style={{ fontSize: "13px" }}>{format(panel.step3, { firstName: step3Name })}</Text>
          <Text UNSAFE_style={{ fontSize: "13px" }}>{panel.step4}</Text>
        </Flex>

        <Text UNSAFE_style={{ fontSize: "13px", color: "var(--spectrum-global-color-gray-700)" }}>
          {format(panel.collection, { name: result.collectionName })}
        </Text>
        <Text UNSAFE_style={{ fontSize: "12px", color: "var(--spectrum-global-color-gray-600)" }}>
          {panel.rankingStrategyNote} <span title={panel.rankingStrategyTooltip}>ⓘ</span>
        </Text>

        <View overflow="auto" marginTop="size-100">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr>
                {[
                  "",
                  panel.tableHeaders.experience,
                  panel.tableHeaders.eligible,
                  panel.tableHeaders.priority,
                  panel.tableHeaders.ranking,
                  panel.tableHeaders.finalScore,
                  panel.tableHeaders.why,
                ].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: "left",
                      padding: "6px 8px",
                      borderBottom: "2px solid var(--spectrum-global-color-gray-300)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.candidates.map((candidate) => (
                <CandidateRow
                  key={candidate.offer.id}
                  candidate={candidate}
                  isWinner={result.winner?.offer.id === candidate.offer.id}
                  trend={trends[candidate.offer.id]}
                  signalLabels={signalLabels}
                />
              ))}
            </tbody>
          </table>
        </View>
      </Flex>
    </Well>
  );
}
