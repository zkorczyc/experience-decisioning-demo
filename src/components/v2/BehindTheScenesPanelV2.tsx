"use client";

import { Flex, Heading, StatusLight, Text, View, Well } from "@adobe/react-spectrum";
import { DecisionCandidate, DecisionResult, Persona, Signal } from "@/lib/types";
import { buildSignalLabels } from "@/lib/decisioning";
import { motion, animate } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type Trend = "up" | "down" | "same";

function TrendArrow({ trend }: { trend: Trend }) {
  if (trend === "up") return <span style={{ color: "var(--spectrum-global-color-green-700)", fontWeight: "bold" }}>▲</span>;
  if (trend === "down") return <span style={{ color: "var(--spectrum-global-color-red-700)", fontWeight: "bold" }}>▼</span>;
  return <span style={{ color: "var(--spectrum-global-color-gray-500)" }}>–</span>;
}

function rankingReasonLabel(candidate: DecisionCandidate, signalLabels: Record<Signal, string>): string {
  const parts: string[] = [];
  if (candidate.recencyBonus > 0) parts.push("Recent behavior");
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
        {candidate.offer.name}
        {isWinner ? " 🏆" : ""}
      </td>
      <td style={{ padding: "6px 8px" }}>
        <StatusLight variant={candidate.eligible ? "positive" : "neutral"}>
          {candidate.eligible ? "Yes" : "No"}
        </StatusLight>
      </td>
      <td style={{ padding: "6px 8px" }}>{candidate.priorityScore}</td>
      <td style={{ padding: "6px 8px" }}>
        {showRanking ? (
          <div>
            <div>+{ranking}</div>
            <div style={{ fontSize: 11, color: "var(--spectrum-global-color-gray-600)" }}>
              {rankingReasonLabel(candidate, signalLabels)}
            </div>
          </div>
        ) : (
          "—"
        )}
      </td>
      <td style={{ padding: "6px 8px", fontWeight: "bold" }}>{candidate.eligible ? candidate.total : "—"}</td>
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
  const prevRankRef = useRef<Record<string, number> | null>(null);
  const firstName = persona.name.split(" ")[0];
  const signalLabels = useMemo(() => buildSignalLabels(persona), [persona]);

  const trends = useMemo(() => {
    const prev = prevRankRef.current;
    const next: Record<string, Trend> = {};
    result.candidates.forEach((candidate, index) => {
      const prevIndex = prev?.[candidate.offer.id];
      if (prevIndex === undefined || prevIndex === index) next[candidate.offer.id] = "same";
      else next[candidate.offer.id] = index < prevIndex ? "up" : "down";
    });
    return next;
  }, [result.candidates]);

  useEffect(() => {
    const rank: Record<string, number> = {};
    result.candidates.forEach((candidate, index) => {
      rank[candidate.offer.id] = index;
    });
    prevRankRef.current = rank;
  }, [result.candidates]);

  return (
    <Well marginTop="size-200">
      <Flex direction="column" gap="size-150">
        <Heading level={4} margin={0}>
          Behind the scenes
        </Heading>

        <Flex direction="column" gap="size-50">
          <Text UNSAFE_style={{ fontWeight: 600 }}>How Adobe decides</Text>
          <Text UNSAFE_style={{ fontSize: "13px", color: "var(--spectrum-global-color-gray-700)" }}>
            Adobe uses {brand}&apos;s customer context and recent behavior to determine which eligible experience is
            most relevant right now.
          </Text>
          <Text UNSAFE_style={{ fontSize: "13px" }}>
            1. <strong>Eligibility</strong> — which experiences can {firstName} receive?
          </Text>
          <Text UNSAFE_style={{ fontSize: "13px" }}>
            2. <strong>Priority</strong> — how important is each experience to the business?
          </Text>
          <Text UNSAFE_style={{ fontSize: "13px" }}>
            3. <strong>Ranking</strong> — adjust priority based on what&apos;s relevant to {firstName} right now.
          </Text>
          <Text UNSAFE_style={{ fontSize: "13px" }}>
            4. <strong>Final score</strong> — the highest-ranked eligible experience wins.
          </Text>
        </Flex>

        <Text UNSAFE_style={{ fontSize: "13px", color: "var(--spectrum-global-color-gray-700)" }}>
          Collection: <strong>{result.collectionName}</strong>
        </Text>
        <Text UNSAFE_style={{ fontSize: "12px", color: "var(--spectrum-global-color-gray-600)" }}>
          Demo ranking strategy: +20 for relevant customer context · +15 for a recent behavior{" "}
          <span title="Adobe supports other ranking strategies too — this is one example.">ⓘ</span>
        </Text>

        <View overflow="auto" marginTop="size-100">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr>
                {["", "Experience", "Eligible", "Priority", "Ranking", "Final score", "Why"].map((h, i) => (
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
