import { Persona, Vertical } from "./types";

const ageParameter: Persona["parameterDefs"][number] = {
  id: "age",
  label: "Age",
  description: "Older and younger customers respond to different offers — this shifts which one wins.",
  defaultOptionId: "age_30s",
  options: [
    { id: "age_30s", label: "30s", signal: "age_30s" },
    { id: "age_50s", label: "50s", signal: "age_50s" },
  ],
};

const sentimentParameter: Persona["parameterDefs"][number] = {
  id: "sentiment",
  label: "Sentiment toward the brand",
  description:
    "Reflects signals we already have, like a recent complaint call — dissatisfied customers get a service-recovery offer instead of a sales pitch.",
  defaultOptionId: "sentiment_satisfied",
  options: [
    { id: "sentiment_satisfied", label: "Satisfied", signal: "sentiment_satisfied" },
    { id: "sentiment_dissatisfied", label: "Dissatisfied", signal: "sentiment_dissatisfied" },
  ],
};

const customerStatusParameter: Persona["parameterDefs"][number] = {
  id: "customer_status",
  label: "Customer status",
  description:
    "Whether we already have a relationship with this person changes whether we pitch an acquisition offer or a retention one.",
  defaultOptionId: "customer_existing",
  options: [
    { id: "customer_existing", label: "Existing customer", signal: "customer_existing" },
    { id: "customer_prospect", label: "Prospect (not yet a customer)", signal: "customer_prospect" },
  ],
};

function professionParameter(defaultOptionId: string): Persona["parameterDefs"][number] {
  return {
    id: "profession",
    label: "Profession",
    description: "Income and cash-flow patterns differ by job — this shifts which financial products make sense.",
    defaultOptionId,
    options: [
      { id: "profession_pm", label: "Product Manager", signal: "profession_pm" },
      { id: "profession_hairdresser", label: "Hairdresser", signal: "profession_hairdresser" },
      { id: "profession_stay_home", label: "Stay-at-home parent", signal: "profession_stay_home" },
    ],
  };
}

const anna: Persona = {
  id: "anna",
  name: "Anna Kowalska",
  avatarInitials: "AK",
  baselineSignals: [],
  eventDefs: [
    {
      id: "mortgage_calc",
      label: "Used the mortgage pre-approval calculator",
      description: "Anna ran numbers on the mortgage calculator this week.",
      signal: "mortgage_calc",
    },
    {
      id: "app_abandoned",
      label: "Abandoned a mortgage application",
      description: "She started a mortgage application but didn't submit it.",
      signal: "app_abandoned",
    },
    {
      id: "started_family",
      label: "Started a family",
      description: "She recently got married and had a child.",
      signal: "has_family",
    },
  ],
  parameterDefs: [ageParameter, sentimentParameter, professionParameter("profession_hairdresser"), customerStatusParameter],
};

const lukas: Persona = {
  id: "lukas",
  name: "Lukas Bergmann",
  avatarInitials: "LB",
  baselineSignals: [],
  eventDefs: [
    {
      id: "retirement_interest",
      label: "Viewed retirement savings projection",
      description: "Lukas checked his projected retirement savings this week.",
      signal: "retirement_interest",
    },
    {
      id: "app_abandoned",
      label: "Left an investment application incomplete",
      description: "He started opening an investment account but didn't finish.",
      signal: "app_abandoned",
    },
    {
      id: "started_family",
      label: "Started a family",
      description: "He recently got married and had a child.",
      signal: "has_family",
    },
  ],
  parameterDefs: [ageParameter, sentimentParameter, professionParameter("profession_pm"), customerStatusParameter],
  audiences: [
    {
      id: "emerging_investors",
      label: "Emerging Investors",
      description: "Adobe Experience Platform audience of customers building their first investment portfolio.",
      signal: "audience_emerging_investors",
    },
    {
      id: "high_digital_engagement",
      label: "High Digital Engagement",
      description: "Adobe Experience Platform audience of customers who mostly bank through the app and website.",
      signal: "audience_high_digital_engagement",
    },
  ],
};

const marcus: Persona = {
  id: "marcus",
  name: "Marcus Webb",
  avatarInitials: "MW",
  baselineSignals: [],
  eventDefs: [
    {
      id: "shoes_interest",
      label: "Viewed running shoes repeatedly",
      description: "Marcus has looked at the same running shoes 3+ times.",
      signal: "shoes_interest",
    },
    {
      id: "cart_abandoned",
      label: "Left an item in his cart",
      description: "He added a product to his cart but didn't purchase.",
      signal: "cart_abandoned",
    },
    {
      id: "rainy_climate",
      label: "Lives in a rainy climate",
      description: "His shipping address is in a region with frequent rain.",
      signal: "rainy_climate",
    },
  ],
  parameterDefs: [ageParameter, sentimentParameter],
};

export const verticals: Vertical[] = [
  {
    id: "fsi",
    name: "Financial Services - SecurFinancial",
    brand: "SecurFinancial",
    logoUrl: "https://demo-system-next.s3.eu-north-1.amazonaws.com/assets/securfinancial/logo.png",
    colors: { primary: "#1C9C93", dark: "#0F2030", accent: "#CBE7F0" },
    personas: [anna, lukas],
  },
  {
    id: "retail",
    name: "Retail - Luma",
    brand: "Luma",
    colors: { primary: "#3B6B3B", dark: "#1E2B1E", accent: "#DCEEDB" },
    personas: [marcus],
    disabled: true,
  },
  {
    id: "travel",
    name: "Travel - WKND Fly",
    brand: "WKND Fly",
    colors: { primary: "#2A6FB0", dark: "#0E2438", accent: "#CFE6F7" },
    personas: [],
    disabled: true,
  },
];
