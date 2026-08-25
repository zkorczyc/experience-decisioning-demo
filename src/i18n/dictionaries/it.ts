import type { Dictionary } from "../dictionary";

const it: Dictionary = {
  meta: {
    title: "Demo Decisioning",
    description: "Scopri come il decisioning di Adobe Journey Optimizer sceglie l'offerta giusta.",
  },
  footer: {
    credit: "Creato da zkorczyc@adobe.com · Adobe 2026",
  },
  common: {
    eyebrow: "Adobe Experience Decisioning",
    yes: "Sì",
    no: "No",
    dash: "—",
    noOfferEligible: "Nessuna offerta disponibile",
    noOfferEligibleYet: "Nessuna offerta disponibile.",
    website: "Sito web",
    mobileApp: "App mobile",
    now: "ora",
    behindTheScenesHeading: "Dietro le quinte",
  },
  scenarioSwitcherLabel: "1. Scegli il tuo scenario demo",
  personaSwitcherLabel: "2. Scegli la tua persona demo",
  v1: {
    heading: "Decisioning, senza segreti",
    subheading:
      "Modifica il profilo di un cliente e guarda come Adobe Journey Optimizer decide quale offerta mostrare.",
    tabs: { demo: "Demo interattiva", summary: "Riepilogo copertura" },
    behindTheScenesToggle: "Dietro le quinte",
    channelPreview: { currentlyShownTo: "Attualmente mostrato a", exploringPrefix: "In esplorazione" },
    profileControls: {
      step1Title: "Passo 1 — Imposta i tratti del profilo",
      step1Desc: "Questi rappresentano ciò che già sappiamo sul cliente.",
      step2Title: "Passo 2 — Simula eventi del profilo",
      step2Desc: "Attiva gli eventi per vedere come reagisce l'offerta in tempo reale.",
    },
    coverageSummary: {
      title: "Riepilogo copertura",
      description:
        "Ogni combinazione di tratti del profilo e l'offerta che vince di default (senza eventi aggiuntivi attivati).",
      tableHeaders: { image: "Immagine", title: "Titolo", subtitle: "Sottotitolo", cta: "CTA" },
    },
    behindTheScenesPanel: {
      collectionUsed: "Collezione utilizzata:",
      explanation:
        "Punteggio = priorità + bonus affinità (+20 per ogni interesse corrispondente) + bonus recenza (+15 se questa offerta è stata appena sbloccata dalla tua ultima modifica). Vince l'offerta idonea con il punteggio più alto.",
      tableHeaders: {
        offer: "Offerta",
        eligible: "Idonea",
        priority: "Priorità",
        affinity: "Affinità",
        recency: "Recenza",
        total: "Totale",
        why: "Perché",
      },
    },
  },
  v2: {
    heading: "Scopri come Adobe sceglie l'esperienza migliore successiva",
    subheading: "Cambia cosa sappiamo di un cliente e guarda l'esperienza adattarsi all'istante.",
    tabs: { demo: "Demo interattiva", summary: "Esplora tutte le decisioni" },
    selectedForPrefix: "Adobe ha selezionato per {firstName}",
    noOfferEligible: "Nessuna offerta disponibile",
    decisionUpdatedPrefix: "Decisione aggiornata: {from} → {to}",
    basedOnPrefix: "Basato su: {basedOn}",
    generalBestMatch: "miglior corrispondenza generale",
    currentInterestsPrefix: "Interessi attuali: {label}",
    shownAcrossChannels: "Mostrato su tutti i canali",
    behindTheScenesToggle: "Perché Adobe ha scelto questo? Dietro le quinte",
    profileControls: {
      step1Title: "Passo 1 — Cosa sappiamo di {firstName}?",
      step1Desc: "Cambia cosa {brand} sa di questo cliente.",
      step2Title: "Passo 2 — Cosa è appena successo?",
      step2Desc: "Attiva un'azione recente del cliente e guarda la decisione adattarsi.",
      audiences: "Segmenti di pubblico",
    },
    coverageSummary: {
      title: "Esplora tutti gli scenari",
      description:
        "Ogni combinazione di tratti e cosa sceglierebbe Adobe — utile per esplorare la logica decisionale completa oltre allo scenario che stai attivamente guidando sopra.",
      tableHeaders: { image: "Immagine", title: "Titolo", subtitle: "Sottotitolo", cta: "CTA" },
    },
    behindTheScenesPanel: {
      howAdobeDecides: "Come decide Adobe",
      intro:
        "Adobe utilizza il contesto cliente di {brand} e il comportamento recente per determinare quale esperienza idonea è ora più rilevante.",
      step1: "1. Idoneità — quali esperienze può ricevere {firstName}?",
      step2: "2. Priorità — quanto è importante ogni esperienza per il business?",
      step3: "3. Classifica — adatta la priorità in base a ciò che è rilevante per {firstName} in questo momento.",
      step4: "4. Punteggio finale — vince l'esperienza idonea con il punteggio più alto.",
      collection: "Collezione: {name}",
      rankingStrategyNote: "Strategia di ranking demo: +20 per contesto cliente rilevante · +15 per un comportamento recente",
      rankingStrategyTooltip: "Adobe supporta anche altre strategie di ranking — questo è solo un esempio.",
      recentBehavior: "Comportamento recente",
      tableHeaders: {
        experience: "Esperienza",
        eligible: "Idonea",
        priority: "Priorità",
        ranking: "Ranking",
        finalScore: "Punteggio finale",
        why: "Perché",
      },
    },
  },
  decisioning: {
    notEligibleYet: "Non ancora idonea — richiede: {missing}.",
    prioritySetTo: "Priorità impostata a {priority}/100",
    matchesInterest: "corrisponde all'interesse in {tags} (+{bonus})",
    justTriggered: 'appena attivata da "{label}" (+{bonus})',
  },
  profile: {
    yearsOld: "{years} anni",
    customerSuffix: "Cliente {brand}",
    prospect: "Potenziale cliente",
    dissatisfied: "Insoddisfatto",
    satisfied: "Soddisfatto",
    professionPrefix: "Professione: {label}",
    sentimentPrefix: "Sentimento: {emoji}",
  },
  offersSuffixWord: "Offerte",
  v2Overrides: {
    relationshipLabel: "Relazione",
    notYetACustomer: "Non ancora cliente",
  },
};

export default it;
