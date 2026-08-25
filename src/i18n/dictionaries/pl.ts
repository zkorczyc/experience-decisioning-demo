import type { Dictionary } from "../dictionary";

const pl: Dictionary = {
  meta: {
    title: "Demo Decisioning",
    description: "Zobacz, jak mechanizm decyzyjny Adobe Journey Optimizer wybiera właściwą ofertę.",
  },
  footer: {
    credit: "Stworzone przez zkorczyc@adobe.com · Adobe 2026",
  },
  common: {
    eyebrow: "Adobe Experience Decisioning",
    yes: "Tak",
    no: "Nie",
    dash: "—",
    noOfferEligible: "Brak dostępnej oferty",
    noOfferEligibleYet: "Brak dostępnej oferty.",
    website: "Strona internetowa",
    mobileApp: "Aplikacja mobilna",
    now: "teraz",
    behindTheScenesHeading: "Jak to działa",
  },
  scenarioSwitcherLabel: "1. Wybierz scenariusz dema",
  personaSwitcherLabel: "2. Wybierz bohatera dema",
  v1: {
    heading: "Decisioning bez tajemnic",
    subheading:
      "Zmień profil klienta i zobacz, jak Adobe Journey Optimizer decyduje, którą ofertę wyświetlić.",
    tabs: { demo: "Demo", summary: "Podsumowanie zasięgu" },
    behindTheScenesToggle: "Jak to działa",
    channelPreview: { currentlyShownTo: "Obecnie wyświetlane dla", exploringPrefix: "Przegląda" },
    profileControls: {
      step1Title: "Krok 1 — Ustaw cechy profilu",
      step1Desc: "To rzeczy, które już wiemy o kliencie.",
      step2Title: "Krok 2 — Symuluj zdarzenia profilu",
      step2Desc: "Włączaj zdarzenia, aby zobaczyć, jak oferta reaguje w czasie rzeczywistym.",
    },
    coverageSummary: {
      title: "Podsumowanie zasięgu",
      description:
        "Każda kombinacja cech profilu i oferta, która domyślnie wygrywa (bez dodatkowych włączonych zdarzeń).",
      tableHeaders: { image: "Obraz", title: "Tytuł", subtitle: "Podtytuł", cta: "CTA" },
    },
    behindTheScenesPanel: {
      collectionUsed: "Użyta kolekcja:",
      explanation:
        "Wynik = priorytet + bonus za powinowactwo (+20 za każde dopasowane zainteresowanie) + bonus za aktualność (+15, jeśli ta oferta została właśnie odblokowana przez Twoją ostatnią zmianę). Wygrywa uprawniona oferta z najwyższym wynikiem.",
      tableHeaders: {
        offer: "Oferta",
        eligible: "Uprawniona",
        priority: "Priorytet",
        affinity: "Powinowactwo",
        recency: "Aktualność",
        total: "Suma",
        why: "Dlaczego",
      },
    },
  },
  v2: {
    heading: "Zobacz, jak Adobe wybiera najlepsze kolejne doświadczenie",
    subheading: "Zmień, co wiemy o kliencie, i zobacz, jak doświadczenie natychmiast się dostosowuje.",
    tabs: { demo: "Demo", summary: "Przeglądaj wszystkie decyzje" },
    selectedForPrefix: "Adobe wybrało dla {firstName}",
    noOfferEligible: "Brak dostępnej oferty",
    decisionUpdatedPrefix: "Decyzja zaktualizowana: {from} → {to}",
    basedOnPrefix: "Na podstawie: {basedOn}",
    generalBestMatch: "ogólne najlepsze dopasowanie",
    currentInterestsPrefix: "Aktualne zainteresowania: {label}",
    shownAcrossChannels: "Wyświetlane na wszystkich kanałach",
    behindTheScenesToggle: "Dlaczego Adobe to wybrało? Jak to działa",
    profileControls: {
      step1Title: "Krok 1 — Co wiemy o {firstName}?",
      step1Desc: "Zmień, co {brand} wie o tym kliencie.",
      step2Title: "Krok 2 — Co się właśnie wydarzyło?",
      step2Desc: "Wywołaj niedawną akcję klienta i zobacz, jak zmienia się decyzja.",
      audiences: "Grupy odbiorców",
    },
    coverageSummary: {
      title: "Przeglądaj wszystkie scenariusze",
      description:
        "Każda kombinacja cech i to, co wybrałoby Adobe — przydatne do zbadania pełnej logiki decyzyjnej poza jednym scenariuszem, którym sterujesz powyżej.",
      tableHeaders: { image: "Obraz", title: "Tytuł", subtitle: "Podtytuł", cta: "CTA" },
    },
    behindTheScenesPanel: {
      howAdobeDecides: "Jak decyduje Adobe",
      intro:
        "Adobe wykorzystuje kontekst klienta {brand} oraz ostatnie zachowania, aby ustalić, które uprawnione doświadczenie jest teraz najbardziej trafne.",
      step1: "1. Uprawnienie — jakie doświadczenia może otrzymać {firstName}?",
      step2: "2. Priorytet — jak ważne jest każde doświadczenie dla biznesu?",
      step3: "3. Ranking — dostosuj priorytet na podstawie tego, co jest teraz istotne dla {firstName}.",
      step4: "4. Wynik końcowy — wygrywa uprawnione doświadczenie z najwyższą rangą.",
      collection: "Kolekcja: {name}",
      rankingStrategyNote: "Strategia rankingu w demo: +20 za trafny kontekst klienta · +15 za niedawne zachowanie",
      rankingStrategyTooltip: "Adobe obsługuje też inne strategie rankingu — to tylko jeden z przykładów.",
      recentBehavior: "Niedawne zachowanie",
      tableHeaders: {
        experience: "Doświadczenie",
        eligible: "Uprawnione",
        priority: "Priorytet",
        ranking: "Ranking",
        finalScore: "Wynik końcowy",
        why: "Dlaczego",
      },
    },
  },
  decisioning: {
    notEligibleYet: "Jeszcze nieuprawnione — wymaga: {missing}.",
    prioritySetTo: "Priorytet ustawiony na {priority}/100",
    matchesInterest: "pasuje do zainteresowania {tags} (+{bonus})",
    justTriggered: 'właśnie wywołane przez „{label}” (+{bonus})',
  },
  profile: {
    yearsOld: "{years} lat",
    customerSuffix: "Klient {brand}",
    prospect: "Potencjalny klient",
    dissatisfied: "Niezadowolony",
    satisfied: "Zadowolony",
    professionPrefix: "Zawód: {label}",
    sentimentPrefix: "Nastawienie: {emoji}",
  },
  offersSuffixWord: "Oferty",
  v2Overrides: {
    relationshipLabel: "Relacja",
    notYetACustomer: "Jeszcze nie klient",
  },
};

export default pl;
