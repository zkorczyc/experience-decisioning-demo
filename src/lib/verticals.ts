import { Persona, Vertical } from "./types";

const ageParameter: Persona["parameterDefs"][number] = {
  id: "age",
  label: { en: "Age", pl: "Wiek", de: "Alter", it: "Età" },
  description: {
    en: "Older and younger customers respond to different offers — this shifts which one wins.",
    pl: "Starsi i młodsi klienci reagują na różne oferty — to zmienia, która z nich wygrywa.",
    de: "Ältere und jüngere Kunden reagieren auf unterschiedliche Angebote — das verändert, welches gewinnt.",
    it: "Clienti più anziani e più giovani rispondono a offerte diverse — questo cambia quale vince.",
  },
  defaultOptionId: "age_30s",
  options: [
    { id: "age_30s", label: { en: "30s", pl: "30 lat", de: "30er", it: "30 anni" }, signal: "age_30s" },
    { id: "age_50s", label: { en: "50s", pl: "50 lat", de: "50er", it: "50 anni" }, signal: "age_50s" },
  ],
};

const sentimentParameter: Persona["parameterDefs"][number] = {
  id: "sentiment",
  label: { en: "Sentiment toward the brand", pl: "Nastawienie do marki", de: "Einstellung zur Marke", it: "Sentimento verso il brand" },
  description: {
    en: "Reflects signals we already have, like a recent complaint call — dissatisfied customers get a service-recovery offer instead of a sales pitch.",
    pl: "Odzwierciedla sygnały, które już mamy, np. niedawną reklamację — niezadowoleni klienci otrzymują ofertę naprawczą zamiast oferty sprzedażowej.",
    de: "Spiegelt bereits vorhandene Signale wider, wie einen kürzlichen Beschwerdeanruf — unzufriedene Kunden erhalten ein Service-Recovery-Angebot statt eines Verkaufsangebots.",
    it: "Riflette segnali che già abbiamo, come una recente chiamata di reclamo — i clienti insoddisfatti ricevono un'offerta di recupero invece di una proposta commerciale.",
  },
  defaultOptionId: "sentiment_satisfied",
  options: [
    {
      id: "sentiment_satisfied",
      label: { en: "Satisfied", pl: "Zadowolony", de: "Zufrieden", it: "Soddisfatto" },
      signal: "sentiment_satisfied",
    },
    {
      id: "sentiment_dissatisfied",
      label: { en: "Dissatisfied", pl: "Niezadowolony", de: "Unzufrieden", it: "Insoddisfatto" },
      signal: "sentiment_dissatisfied",
    },
  ],
};

const customerStatusParameter: Persona["parameterDefs"][number] = {
  id: "customer_status",
  label: { en: "Customer status", pl: "Status klienta", de: "Kundenstatus", it: "Stato del cliente" },
  description: {
    en: "Whether we already have a relationship with this person changes whether we pitch an acquisition offer or a retention one.",
    pl: "To, czy mamy już relację z tą osobą, decyduje, czy proponujemy ofertę pozyskania, czy utrzymania klienta.",
    de: "Ob bereits eine Beziehung zu dieser Person besteht, entscheidet, ob wir ein Akquise- oder ein Bindungsangebot machen.",
    it: "Se abbiamo già una relazione con questa persona determina se proponiamo un'offerta di acquisizione o di fidelizzazione.",
  },
  defaultOptionId: "customer_existing",
  options: [
    {
      id: "customer_existing",
      label: { en: "Existing customer", pl: "Obecny klient", de: "Bestandskunde", it: "Cliente esistente" },
      signal: "customer_existing",
    },
    {
      id: "customer_prospect",
      label: {
        en: "Prospect (not yet a customer)",
        pl: "Potencjalny klient (jeszcze nie klient)",
        de: "Interessent (noch kein Kunde)",
        it: "Potenziale cliente (non ancora cliente)",
      },
      signal: "customer_prospect",
    },
  ],
};

function professionParameter(defaultOptionId: string): Persona["parameterDefs"][number] {
  return {
    id: "profession",
    label: { en: "Profession", pl: "Zawód", de: "Beruf", it: "Professione" },
    description: {
      en: "Income and cash-flow patterns differ by job — this shifts which financial products make sense.",
      pl: "Dochody i przepływy pieniężne różnią się w zależności od zawodu — to zmienia, które produkty finansowe mają sens.",
      de: "Einkommen und Cashflow-Muster unterscheiden sich je nach Beruf — das verändert, welche Finanzprodukte sinnvoll sind.",
      it: "I redditi e i flussi di cassa variano in base alla professione — questo cambia quali prodotti finanziari hanno senso.",
    },
    defaultOptionId,
    options: [
      {
        id: "profession_pm",
        label: { en: "Product Manager", pl: "Product Manager", de: "Produktmanager", it: "Product Manager" },
        signal: "profession_pm",
      },
      {
        id: "profession_hairdresser",
        label: { en: "Hairdresser", pl: "Fryzjer", de: "Friseur", it: "Parrucchiere" },
        signal: "profession_hairdresser",
      },
      {
        id: "profession_stay_home",
        label: { en: "Stay-at-home parent", pl: "Rodzic zajmujący się domem", de: "Elternteil in Elternzeit", it: "Genitore a tempo pieno" },
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
        it: "Ha usato il calcolatore di pre-approvazione del mutuo",
      },
      description: {
        en: "Anna ran numbers on the mortgage calculator this week.",
        pl: "Anna w tym tygodniu sprawdzała liczby w kalkulatorze kredytu hipotecznego.",
        de: "Anna hat diese Woche Zahlen im Hypothekenrechner durchgespielt.",
        it: "Questa settimana Anna ha fatto delle simulazioni con il calcolatore del mutuo.",
      },
      signal: "mortgage_calc",
    },
    {
      id: "app_abandoned",
      label: {
        en: "Abandoned a mortgage application",
        pl: "Porzuciła wniosek o kredyt hipoteczny",
        de: "Hat einen Hypothekenantrag abgebrochen",
        it: "Ha abbandonato una domanda di mutuo",
      },
      description: {
        en: "She started a mortgage application but didn't submit it.",
        pl: "Zaczęła wypełniać wniosek o kredyt hipoteczny, ale go nie złożyła.",
        de: "Sie hat einen Hypothekenantrag begonnen, aber nicht abgeschickt.",
        it: "Ha iniziato una domanda di mutuo ma non l'ha inviata.",
      },
      signal: "app_abandoned",
    },
    {
      id: "started_family",
      label: { en: "Started a family", pl: "Założyła rodzinę", de: "Hat eine Familie gegründet", it: "Ha messo su famiglia" },
      description: {
        en: "She recently got married and had a child.",
        pl: "Niedawno wzięła ślub i urodziło jej się dziecko.",
        de: "Sie hat kürzlich geheiratet und ein Kind bekommen.",
        it: "Si è recentemente sposata e ha avuto un figlio.",
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
        it: "Ha visualizzato la proiezione dei risparmi pensionistici",
      },
      description: {
        en: "Lukas checked his projected retirement savings this week.",
        pl: "Lukas w tym tygodniu sprawdzał prognozowane oszczędności emerytalne.",
        de: "Lukas hat diese Woche seine prognostizierte Altersvorsorge geprüft.",
        it: "Questa settimana Lukas ha controllato la proiezione dei suoi risparmi pensionistici.",
      },
      signal: "retirement_interest",
    },
    {
      id: "app_abandoned",
      label: {
        en: "Left an investment application incomplete",
        pl: "Nie dokończył wniosku inwestycyjnego",
        de: "Hat einen Investmentantrag unvollständig gelassen",
        it: "Ha lasciato incompleta una domanda di investimento",
      },
      description: {
        en: "He started opening an investment account but didn't finish.",
        pl: "Zaczął otwierać rachunek inwestycyjny, ale nie dokończył procesu.",
        de: "Er hat begonnen, ein Investmentkonto zu eröffnen, aber nicht abgeschlossen.",
        it: "Ha iniziato ad aprire un conto d'investimento ma non ha completato il processo.",
      },
      signal: "app_abandoned",
    },
    {
      id: "started_family",
      label: { en: "Started a family", pl: "Założył rodzinę", de: "Hat eine Familie gegründet", it: "Ha messo su famiglia" },
      description: {
        en: "He recently got married and had a child.",
        pl: "Niedawno wziął ślub i urodziło mu się dziecko.",
        de: "Er hat kürzlich geheiratet und ein Kind bekommen.",
        it: "Si è recentemente sposato e ha avuto un figlio.",
      },
      signal: "has_family",
    },
  ],
  parameterDefs: [ageParameter, sentimentParameter, professionParameter("profession_pm"), customerStatusParameter],
  audiences: [
    {
      id: "emerging_investors",
      label: { en: "Emerging Investors", pl: "Początkujący inwestorzy", de: "Aufstrebende Investoren", it: "Investitori emergenti" },
      description: {
        en: "Adobe Experience Platform audience of customers building their first investment portfolio.",
        pl: "Grupa odbiorców Adobe Experience Platform: klienci budujący swój pierwszy portfel inwestycyjny.",
        de: "Adobe Experience Platform-Zielgruppe von Kunden, die ihr erstes Anlageportfolio aufbauen.",
        it: "Segmento di Adobe Experience Platform: clienti che costruiscono il loro primo portafoglio di investimenti.",
      },
      signal: "audience_emerging_investors",
    },
    {
      id: "high_digital_engagement",
      label: { en: "High Digital Engagement", pl: "Wysokie zaangażowanie cyfrowe", de: "Hohes digitales Engagement", it: "Alto coinvolgimento digitale" },
      description: {
        en: "Adobe Experience Platform audience of customers who mostly bank through the app and website.",
        pl: "Grupa odbiorców Adobe Experience Platform: klienci korzystający głównie z aplikacji i strony internetowej.",
        de: "Adobe Experience Platform-Zielgruppe von Kunden, die überwiegend über App und Website bankgeschäfte tätigen.",
        it: "Segmento di Adobe Experience Platform: clienti che operano principalmente tramite app e sito web.",
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
        it: "Ha visualizzato più volte scarpe da running",
      },
      description: {
        en: "Marcus has looked at the same running shoes 3+ times.",
        pl: "Marcus przeglądał te same buty do biegania 3 razy lub więcej.",
        de: "Marcus hat sich dieselben Laufschuhe 3-mal oder öfter angesehen.",
        it: "Marcus ha guardato le stesse scarpe da running 3 o più volte.",
      },
      signal: "shoes_interest",
    },
    {
      id: "cart_abandoned",
      label: { en: "Left an item in his cart", pl: "Zostawił produkt w koszyku", de: "Hat einen Artikel im Warenkorb gelassen", it: "Ha lasciato un articolo nel carrello" },
      description: {
        en: "He added a product to his cart but didn't purchase.",
        pl: "Dodał produkt do koszyka, ale go nie kupił.",
        de: "Er hat ein Produkt in den Warenkorb gelegt, aber nicht gekauft.",
        it: "Ha aggiunto un prodotto al carrello ma non l'ha acquistato.",
      },
      signal: "cart_abandoned",
    },
    {
      id: "rainy_climate",
      label: { en: "Lives in a rainy climate", pl: "Mieszka w deszczowym klimacie", de: "Lebt in einer regenreichen Region", it: "Vive in un clima piovoso" },
      description: {
        en: "His shipping address is in a region with frequent rain.",
        pl: "Jego adres dostawy znajduje się w regionie z częstymi opadami deszczu.",
        de: "Seine Lieferadresse liegt in einer Region mit häufigem Regen.",
        it: "Il suo indirizzo di spedizione si trova in una regione con piogge frequenti.",
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
