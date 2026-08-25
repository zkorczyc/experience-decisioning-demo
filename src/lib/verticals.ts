import { Persona, Vertical } from "./types";

const ageParameter: Persona["parameterDefs"][number] = {
  id: "age",
  label: { en: "Age", pl: "Wiek", de: "Alter" },
  description: {
    en: "Older and younger customers respond to different offers — this shifts which one wins.",
    pl: "Starsi i młodsi klienci reagują na różne oferty — to zmienia, która z nich wygrywa.",
    de: "Ältere und jüngere Kunden reagieren auf unterschiedliche Angebote — das verändert, welches gewinnt.",
  },
  defaultOptionId: "age_30s",
  options: [
    { id: "age_30s", label: { en: "30s", pl: "30 lat", de: "30er" }, signal: "age_30s" },
    { id: "age_50s", label: { en: "50s", pl: "50 lat", de: "50er" }, signal: "age_50s" },
  ],
};

const sentimentParameter: Persona["parameterDefs"][number] = {
  id: "sentiment",
  label: { en: "Sentiment toward the brand", pl: "Nastawienie do marki", de: "Einstellung zur Marke" },
  description: {
    en: "Reflects signals we already have, like a recent complaint call — dissatisfied customers get a service-recovery offer instead of a sales pitch.",
    pl: "Odzwierciedla sygnały, które już mamy, np. niedawną reklamację — niezadowoleni klienci otrzymują ofertę naprawczą zamiast oferty sprzedażowej.",
    de: "Spiegelt bereits vorhandene Signale wider, wie einen kürzlichen Beschwerdeanruf — unzufriedene Kunden erhalten ein Service-Recovery-Angebot statt eines Verkaufsangebots.",
  },
  defaultOptionId: "sentiment_satisfied",
  options: [
    {
      id: "sentiment_satisfied",
      label: { en: "Satisfied", pl: "Zadowolony", de: "Zufrieden" },
      signal: "sentiment_satisfied",
    },
    {
      id: "sentiment_dissatisfied",
      label: { en: "Dissatisfied", pl: "Niezadowolony", de: "Unzufrieden" },
      signal: "sentiment_dissatisfied",
    },
  ],
};

const customerStatusParameter: Persona["parameterDefs"][number] = {
  id: "customer_status",
  label: { en: "Customer status", pl: "Status klienta", de: "Kundenstatus" },
  description: {
    en: "Whether we already have a relationship with this person changes whether we pitch an acquisition offer or a retention one.",
    pl: "To, czy mamy już relację z tą osobą, decyduje, czy proponujemy ofertę pozyskania, czy utrzymania klienta.",
    de: "Ob bereits eine Beziehung zu dieser Person besteht, entscheidet, ob wir ein Akquise- oder ein Bindungsangebot machen.",
  },
  defaultOptionId: "customer_existing",
  options: [
    {
      id: "customer_existing",
      label: { en: "Existing customer", pl: "Obecny klient", de: "Bestandskunde" },
      signal: "customer_existing",
    },
    {
      id: "customer_prospect",
      label: {
        en: "Prospect (not yet a customer)",
        pl: "Potencjalny klient (jeszcze nie klient)",
        de: "Interessent (noch kein Kunde)",
      },
      signal: "customer_prospect",
    },
  ],
};

function professionParameter(defaultOptionId: string): Persona["parameterDefs"][number] {
  return {
    id: "profession",
    label: { en: "Profession", pl: "Zawód", de: "Beruf" },
    description: {
      en: "Income and cash-flow patterns differ by job — this shifts which financial products make sense.",
      pl: "Dochody i przepływy pieniężne różnią się w zależności od zawodu — to zmienia, które produkty finansowe mają sens.",
      de: "Einkommen und Cashflow-Muster unterscheiden sich je nach Beruf — das verändert, welche Finanzprodukte sinnvoll sind.",
    },
    defaultOptionId,
    options: [
      {
        id: "profession_pm",
        label: { en: "Product Manager", pl: "Product Manager", de: "Produktmanager" },
        signal: "profession_pm",
      },
      {
        id: "profession_hairdresser",
        label: { en: "Hairdresser", pl: "Fryzjer", de: "Friseur" },
        signal: "profession_hairdresser",
      },
      {
        id: "profession_stay_home",
        label: { en: "Stay-at-home parent", pl: "Rodzic zajmujący się domem", de: "Elternteil in Elternzeit" },
        signal: "profession_stay_home",
      },
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
      label: {
        en: "Used the mortgage pre-approval calculator",
        pl: "Skorzystała z kalkulatora zdolności kredytowej",
        de: "Hat den Hypotheken-Vorabgenehmigungsrechner genutzt",
      },
      description: {
        en: "Anna ran numbers on the mortgage calculator this week.",
        pl: "Anna w tym tygodniu sprawdzała liczby w kalkulatorze kredytu hipotecznego.",
        de: "Anna hat diese Woche Zahlen im Hypothekenrechner durchgespielt.",
      },
      signal: "mortgage_calc",
    },
    {
      id: "app_abandoned",
      label: {
        en: "Abandoned a mortgage application",
        pl: "Porzuciła wniosek o kredyt hipoteczny",
        de: "Hat einen Hypothekenantrag abgebrochen",
      },
      description: {
        en: "She started a mortgage application but didn't submit it.",
        pl: "Zaczęła wypełniać wniosek o kredyt hipoteczny, ale go nie złożyła.",
        de: "Sie hat einen Hypothekenantrag begonnen, aber nicht abgeschickt.",
      },
      signal: "app_abandoned",
    },
    {
      id: "started_family",
      label: { en: "Started a family", pl: "Założyła rodzinę", de: "Hat eine Familie gegründet" },
      description: {
        en: "She recently got married and had a child.",
        pl: "Niedawno wzięła ślub i urodziło jej się dziecko.",
        de: "Sie hat kürzlich geheiratet und ein Kind bekommen.",
      },
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
      label: {
        en: "Viewed retirement savings projection",
        pl: "Przeglądał prognozę oszczędności emerytalnych",
        de: "Hat die Prognose der Altersvorsorge angesehen",
      },
      description: {
        en: "Lukas checked his projected retirement savings this week.",
        pl: "Lukas w tym tygodniu sprawdzał prognozowane oszczędności emerytalne.",
        de: "Lukas hat diese Woche seine prognostizierte Altersvorsorge geprüft.",
      },
      signal: "retirement_interest",
    },
    {
      id: "app_abandoned",
      label: {
        en: "Left an investment application incomplete",
        pl: "Nie dokończył wniosku inwestycyjnego",
        de: "Hat einen Investmentantrag unvollständig gelassen",
      },
      description: {
        en: "He started opening an investment account but didn't finish.",
        pl: "Zaczął otwierać rachunek inwestycyjny, ale nie dokończył procesu.",
        de: "Er hat begonnen, ein Investmentkonto zu eröffnen, aber nicht abgeschlossen.",
      },
      signal: "app_abandoned",
    },
    {
      id: "started_family",
      label: { en: "Started a family", pl: "Założył rodzinę", de: "Hat eine Familie gegründet" },
      description: {
        en: "He recently got married and had a child.",
        pl: "Niedawno wziął ślub i urodziło mu się dziecko.",
        de: "Er hat kürzlich geheiratet und ein Kind bekommen.",
      },
      signal: "has_family",
    },
  ],
  parameterDefs: [ageParameter, sentimentParameter, professionParameter("profession_pm"), customerStatusParameter],
  audiences: [
    {
      id: "emerging_investors",
      label: { en: "Emerging Investors", pl: "Początkujący inwestorzy", de: "Aufstrebende Investoren" },
      description: {
        en: "Adobe Experience Platform audience of customers building their first investment portfolio.",
        pl: "Grupa odbiorców Adobe Experience Platform: klienci budujący swój pierwszy portfel inwestycyjny.",
        de: "Adobe Experience Platform-Zielgruppe von Kunden, die ihr erstes Anlageportfolio aufbauen.",
      },
      signal: "audience_emerging_investors",
    },
    {
      id: "high_digital_engagement",
      label: { en: "High Digital Engagement", pl: "Wysokie zaangażowanie cyfrowe", de: "Hohes digitales Engagement" },
      description: {
        en: "Adobe Experience Platform audience of customers who mostly bank through the app and website.",
        pl: "Grupa odbiorców Adobe Experience Platform: klienci korzystający głównie z aplikacji i strony internetowej.",
        de: "Adobe Experience Platform-Zielgruppe von Kunden, die überwiegend über App und Website bankgeschäfte tätigen.",
      },
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
      label: {
        en: "Viewed running shoes repeatedly",
        pl: "Wielokrotnie przeglądał buty do biegania",
        de: "Hat wiederholt Laufschuhe angesehen",
      },
      description: {
        en: "Marcus has looked at the same running shoes 3+ times.",
        pl: "Marcus przeglądał te same buty do biegania 3 razy lub więcej.",
        de: "Marcus hat sich dieselben Laufschuhe 3-mal oder öfter angesehen.",
      },
      signal: "shoes_interest",
    },
    {
      id: "cart_abandoned",
      label: { en: "Left an item in his cart", pl: "Zostawił produkt w koszyku", de: "Hat einen Artikel im Warenkorb gelassen" },
      description: {
        en: "He added a product to his cart but didn't purchase.",
        pl: "Dodał produkt do koszyka, ale go nie kupił.",
        de: "Er hat ein Produkt in den Warenkorb gelegt, aber nicht gekauft.",
      },
      signal: "cart_abandoned",
    },
    {
      id: "rainy_climate",
      label: { en: "Lives in a rainy climate", pl: "Mieszka w deszczowym klimacie", de: "Lebt in einer regenreichen Region" },
      description: {
        en: "His shipping address is in a region with frequent rain.",
        pl: "Jego adres dostawy znajduje się w regionie z częstymi opadami deszczu.",
        de: "Seine Lieferadresse liegt in einer Region mit häufigem Regen.",
      },
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
