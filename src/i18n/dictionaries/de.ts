import type { Dictionary } from "../dictionary";

const de: Dictionary = {
  meta: {
    title: "Decisioning-Demo",
    description: "Sehen Sie, wie das Adobe Journey Optimizer Decisioning das passende Angebot auswählt.",
  },
  footer: {
    credit: "Erstellt von zkorczyc@adobe.com · Adobe 2026",
  },
  common: {
    eyebrow: "Adobe Experience Decisioning",
    yes: "Ja",
    no: "Nein",
    dash: "—",
    noOfferEligible: "Kein Angebot verfügbar",
    noOfferEligibleYet: "Noch kein Angebot verfügbar.",
    website: "Website",
    mobileApp: "Mobile App",
    now: "jetzt",
    behindTheScenesHeading: "Blick hinter die Kulissen",
  },
  scenarioSwitcherLabel: "1. Demo-Szenario wählen",
  personaSwitcherLabel: "2. Demo-Persona wählen",
  v1: {
    heading: "Decisioning, entmystifiziert",
    subheading:
      "Ändern Sie das Profil eines Kunden und sehen Sie, wie Adobe Journey Optimizer entscheidet, welches Angebot angezeigt wird.",
    tabs: { demo: "Interaktive Demo", summary: "Abdeckungsübersicht" },
    behindTheScenesToggle: "Blick hinter die Kulissen",
    channelPreview: { currentlyShownTo: "Wird aktuell angezeigt für", exploringPrefix: "Erkundet" },
    profileControls: {
      step1Title: "Schritt 1 — Profilmerkmale festlegen",
      step1Desc: "Das sind Dinge, die wir bereits über den Kunden wissen.",
      step2Title: "Schritt 2 — Profilereignisse simulieren",
      step2Desc: "Aktivieren Sie Ereignisse, um zu sehen, wie das Angebot in Echtzeit reagiert.",
    },
    coverageSummary: {
      title: "Abdeckungsübersicht",
      description:
        "Jede Kombination von Profilmerkmalen und das Angebot, das standardmäßig gewinnt (ohne zusätzlich aktivierte Ereignisse).",
      tableHeaders: { image: "Bild", title: "Titel", subtitle: "Untertitel", cta: "CTA" },
    },
    behindTheScenesPanel: {
      collectionUsed: "Verwendete Sammlung:",
      explanation:
        "Punktzahl = Priorität + Affinitätsbonus (+20 pro passendem Interesse) + Aktualitätsbonus (+15, wenn dieses Angebot gerade durch Ihre letzte Änderung freigeschaltet wurde). Das berechtigte Angebot mit der höchsten Punktzahl gewinnt.",
      tableHeaders: {
        offer: "Angebot",
        eligible: "Berechtigt",
        priority: "Priorität",
        affinity: "Affinität",
        recency: "Aktualität",
        total: "Gesamt",
        why: "Warum",
      },
    },
  },
  v2: {
    heading: "So wählt Adobe das nächstbeste Erlebnis",
    subheading: "Ändern Sie, was wir über einen Kunden wissen, und sehen Sie, wie sich das Erlebnis sofort anpasst.",
    tabs: { demo: "Interaktive Demo", summary: "Alle Entscheidungen erkunden" },
    selectedForPrefix: "Adobe hat für {firstName} ausgewählt",
    noOfferEligible: "Kein Angebot verfügbar",
    decisionUpdatedPrefix: "Entscheidung aktualisiert: {from} → {to}",
    basedOnPrefix: "Basierend auf: {basedOn}",
    generalBestMatch: "allgemein beste Übereinstimmung",
    currentInterestsPrefix: "Aktuelle Interessen: {label}",
    shownAcrossChannels: "Angezeigt über alle Kanäle",
    behindTheScenesToggle: "Warum hat Adobe das gewählt? Blick hinter die Kulissen",
    profileControls: {
      step1Title: "Schritt 1 — Was wissen wir über {firstName}?",
      step1Desc: "Ändern Sie, was {brand} über diesen Kunden weiß.",
      step2Title: "Schritt 2 — Was ist gerade passiert?",
      step2Desc: "Lösen Sie eine kürzliche Kundenaktion aus und sehen Sie, wie sich die Entscheidung anpasst.",
      audiences: "Zielgruppen",
    },
    coverageSummary: {
      title: "Alle Szenarien erkunden",
      description:
        "Jede Kombination von Merkmalen und was Adobe wählen würde — nützlich, um die vollständige Entscheidungslogik über das oben aktiv gesteuerte Szenario hinaus zu erkunden.",
      tableHeaders: { image: "Bild", title: "Titel", subtitle: "Untertitel", cta: "CTA" },
    },
    behindTheScenesPanel: {
      howAdobeDecides: "Wie Adobe entscheidet",
      intro:
        "Adobe nutzt den Kundenkontext von {brand} und das jüngste Verhalten, um festzustellen, welches berechtigte Erlebnis gerade am relevantesten ist.",
      step1: "1. Berechtigung — welche Erlebnisse kann {firstName} erhalten?",
      step2: "2. Priorität — wie wichtig ist jedes Erlebnis für das Geschäft?",
      step3: "3. Ranking — Priorität anpassen basierend darauf, was für {firstName} gerade relevant ist.",
      step4: "4. Endpunktzahl — das am höchsten eingestufte berechtigte Erlebnis gewinnt.",
      collection: "Sammlung: {name}",
      rankingStrategyNote: "Demo-Rankingstrategie: +20 für relevanten Kundenkontext · +15 für ein kürzliches Verhalten",
      rankingStrategyTooltip: "Adobe unterstützt auch andere Rankingstrategien — dies ist nur ein Beispiel.",
      recentBehavior: "Kürzliches Verhalten",
      tableHeaders: {
        experience: "Erlebnis",
        eligible: "Berechtigt",
        priority: "Priorität",
        ranking: "Ranking",
        finalScore: "Endpunktzahl",
        why: "Warum",
      },
    },
  },
  decisioning: {
    notEligibleYet: "Noch nicht berechtigt — erforderlich: {missing}.",
    prioritySetTo: "Priorität auf {priority}/100 gesetzt",
    matchesInterest: "entspricht dem Interesse an {tags} (+{bonus})",
    justTriggered: 'gerade ausgelöst durch „{label}" (+{bonus})',
  },
  profile: {
    yearsOld: "{years} Jahre alt",
    customerSuffix: "{brand}-Kunde",
    prospect: "Interessent",
    dissatisfied: "Unzufrieden",
    satisfied: "Zufrieden",
    professionPrefix: "Beruf: {label}",
    sentimentPrefix: "Stimmung: {emoji}",
  },
  offersSuffixWord: "Angebote",
  v2Overrides: {
    relationshipLabel: "Beziehung",
    notYetACustomer: "Noch kein Kunde",
  },
};

export default de;
