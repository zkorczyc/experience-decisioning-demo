type AvatarState = "satisfied" | "dissatisfied" | "family";

const avatarsByPersona: Record<string, Record<string, Record<AvatarState, string>>> = {
  anna: {
    age_30s: {
      satisfied: "/personas/anna-30-satisfied.jpg",
      dissatisfied: "/personas/anna-30-dissatisfied.jpg",
      family: "/personas/anna-30-family.jpg",
    },
    age_50s: {
      satisfied: "/personas/anna-50-satisfied.jpg",
      dissatisfied: "/personas/anna-50-dissatisfied.jpg",
      family: "/personas/anna-50-family.jpg",
    },
  },
  lukas: {
    age_30s: {
      satisfied: "/personas/lukas-30-satisfied.jpg",
      dissatisfied: "/personas/lukas-30-dissatisfied.jpg",
      family: "/personas/lukas-30-family.jpg",
    },
    age_50s: {
      satisfied: "/personas/lukas-50-satisfied.jpg",
      dissatisfied: "/personas/lukas-50-dissatisfied.jpg",
      family: "/personas/lukas-50-family.jpg",
    },
  },
};

export function getPersonaAvatarUrl(
  personaId: string,
  ageOptionId: string | undefined,
  sentimentOptionId: string | undefined,
  hasFamily: boolean
): string | undefined {
  const byAge = avatarsByPersona[personaId]?.[ageOptionId ?? ""];
  if (!byAge) return undefined;
  const state: AvatarState = hasFamily ? "family" : sentimentOptionId === "sentiment_dissatisfied" ? "dissatisfied" : "satisfied";
  return byAge[state];
}
