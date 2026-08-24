"use client";

import { Flex, Heading, StatusLight, Text, View, Well } from "@adobe/react-spectrum";
import { DecisionCandidate, DecisionResult } from "@/lib/types";
import { motion, animate } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type Trend = "up" | "down" | "same";

function TrendArrow({ trend }: { trend: Trend }) {
  if (trend === "up") return <span style={{ color: "var(--spectrum-global-color-green-700)", fontWeight: "bold" }}>▲</span>;
  if (trend === "down") return <span style={{ color: "var(--spectrum-global-color-red-700)", fontWeight: "bold" }}>▼</span>;
  return <span style={{ color: "var(--spectrum-global-color-gray-500)" }}>–</span>;
}

function CandidateRow({
  candidate,
  isWinner,
  trend,
}: {
  candidate: DecisionCandidate;
  isWinner: boolean;
  trend: Trend;
}) {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const prevTotal = useRef(candidate.total);

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
      <td style={{ padding: "6px 8px", textAlign: "center" }}>
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
      <td style={{ padding: "6px 8px" }}>+{candidate.affinityBonus}</td>
      <td style={{ padding: "6px 8px" }}>+{candidate.recencyBonus}</td>
      <td style={{ padding: "6px 8px", fontWeight: "bold" }}>{candidate.total}</td>
      <td style={{ padding: "6px 8px", color: "var(--spectrum-global-color-gray-700)" }}>{candidate.reason}</td>
    </motion.tr>
  );
}

export default function BehindTheScenesPanel({ result }: { result: DecisionResult }) {
  const prevRankRef = useRef<Record<string, number> | null>(null);

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
        <Text>
          Collection used: <strong>{result.collectionName}</strong>
        </Text>
        <Text UNSAFE_style={{ fontSize: "13px", color: "var(--spectrum-global-color-gray-700)" }}>
          Score = priority + affinity bonus (+20 per matched interest) + recency bonus (+15 if this
          offer was just unlocked by your last change). The highest-scoring eligible offer wins.
        </Text>

        <View overflow="auto" marginTop="size-100">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr>
                {["", "Offer", "Eligible", "Priority", "Affinity", "Recency", "Total", "Why"].map((h, i) => (
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
                />
              ))}
            </tbody>
          </table>
        </View>
      </Flex>
    </Well>
  );
}
