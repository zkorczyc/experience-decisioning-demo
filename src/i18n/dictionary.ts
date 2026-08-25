export type Dictionary = {
  meta: { title: string; description: string };
  footer: { credit: string };
  common: {
    eyebrow: string;
    yes: string;
    no: string;
    dash: string;
    noOfferEligible: string;
    noOfferEligibleYet: string;
    website: string;
    mobileApp: string;
    now: string;
    behindTheScenesHeading: string;
  };
  scenarioSwitcherLabel: string;
  personaSwitcherLabel: string;
  v1: {
    heading: string;
    subheading: string;
    tabs: { demo: string; summary: string };
    behindTheScenesToggle: string;
    channelPreview: { currentlyShownTo: string; exploringPrefix: string };
    profileControls: { step1Title: string; step1Desc: string; step2Title: string; step2Desc: string };
    coverageSummary: {
      title: string;
      description: string;
      tableHeaders: { image: string; title: string; subtitle: string; cta: string };
    };
    behindTheScenesPanel: {
      collectionUsed: string;
      explanation: string;
      tableHeaders: {
        offer: string;
        eligible: string;
        priority: string;
        affinity: string;
        recency: string;
        total: string;
        why: string;
      };
    };
  };
  v2: {
    heading: string;
    subheading: string;
    tabs: { demo: string; summary: string };
    selectedForPrefix: string;
    noOfferEligible: string;
    decisionUpdatedPrefix: string;
    basedOnPrefix: string;
    generalBestMatch: string;
    currentInterestsPrefix: string;
    shownAcrossChannels: string;
    behindTheScenesToggle: string;
    profileControls: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      audiences: string;
    };
    coverageSummary: {
      title: string;
      description: string;
      tableHeaders: { image: string; title: string; subtitle: string; cta: string };
    };
    behindTheScenesPanel: {
      howAdobeDecides: string;
      intro: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
      collection: string;
      rankingStrategyNote: string;
      rankingStrategyTooltip: string;
      recentBehavior: string;
      tableHeaders: {
        experience: string;
        eligible: string;
        priority: string;
        ranking: string;
        finalScore: string;
        why: string;
      };
    };
  };
  decisioning: {
    notEligibleYet: string;
    prioritySetTo: string;
    matchesInterest: string;
    justTriggered: string;
  };
  profile: {
    yearsOld: string;
    customerSuffix: string;
    prospect: string;
    dissatisfied: string;
    satisfied: string;
    professionPrefix: string;
    sentimentPrefix: string;
  };
  offersSuffixWord: string;
  v2Overrides: {
    relationshipLabel: string;
    notYetACustomer: string;
  };
};

export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}
