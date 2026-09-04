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

const lumaLoyaltyParameter: Persona["parameterDefs"][number] = {
  id: "luma_loyalty",
  label: { en: "Luma+ loyalty status", pl: "Status lojalnościowy Luma+", de: "Luma+ Treuestatus", it: "Stato fedeltà Luma+" },
  description: {
    en: "Whether this person is already a Luma+ member changes whether we prompt them to join or reward them as a member.",
    pl: "To, czy dana osoba jest już członkiem Luma+, decyduje, czy zachęcamy ją do dołączenia, czy nagradzamy jako członka.",
    de: "Ob diese Person bereits Luma+ Mitglied ist, entscheidet, ob wir zum Beitritt einladen oder als Mitglied belohnen.",
    it: "Se questa persona è già membro Luma+ determina se la invitiamo a iscriversi o la premiamo come membro.",
  },
  defaultOptionId: "luma_plus_none",
  options: [
    {
      id: "luma_plus_member",
      label: { en: "Luma+ member", pl: "Członek Luma+", de: "Luma+ Mitglied", it: "Membro Luma+" },
      signal: "luma_plus_member",
    },
    {
      id: "luma_plus_none",
      label: { en: "Not a Luma+ member", pl: "Nie jest członkiem Luma+", de: "Kein Luma+ Mitglied", it: "Non membro Luma+" },
      signal: "luma_plus_none",
    },
  ],
};

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

const frescopaLoyaltyParameter: Persona["parameterDefs"][number] = {
  id: "frescopa_loyalty",
  label: {
    en: "MyBarista membership status",
    pl: "Status członkostwa MyBarista",
    de: "MyBarista-Mitgliedsstatus",
    it: "Stato di iscrizione MyBarista",
  },
  description: {
    en: "Whether this person already subscribes to MyBarista changes whether we prompt them to join or reward them as a member.",
    pl: "To, czy dana osoba subskrybuje już MyBarista, decyduje, czy zachęcamy ją do dołączenia, czy nagradzamy jako członka.",
    de: "Ob diese Person bereits MyBarista abonniert hat, entscheidet, ob wir zum Beitritt einladen oder als Mitglied belohnen.",
    it: "Se questa persona è già abbonata a MyBarista determina se la invitiamo a iscriversi o la premiamo come membro.",
  },
  defaultOptionId: "frescopa_none",
  options: [
    {
      id: "frescopa_member",
      label: { en: "MyBarista member", pl: "Członek MyBarista", de: "MyBarista-Mitglied", it: "Membro MyBarista" },
      signal: "frescopa_member",
    },
    {
      id: "frescopa_none",
      label: { en: "Not a MyBarista member", pl: "Nie jest członkiem MyBarista", de: "Kein MyBarista-Mitglied", it: "Non membro MyBarista" },
      signal: "frescopa_none",
    },
  ],
};

const businessSizeParameter: Persona["parameterDefs"][number] = {
  id: "business_size",
  label: {
    en: "Business size",
    pl: "Wielkość firmy",
    de: "Unternehmensgröße",
    it: "Dimensione dell'azienda",
  },
  description: {
    en: "A one-chair salon and a 600-person office need very different machines and order sizes — this shifts which equipment and quote we recommend.",
    pl: "Jednostanowiskowy salon i biuro na 600 osób potrzebują zupełnie innych ekspresów i wielkości zamówienia — to zmienia, jaki sprzęt i wycenę proponujemy.",
    de: "Ein Ein-Stuhl-Salon und ein Büro mit 600 Mitarbeitenden benötigen sehr unterschiedliche Maschinen und Bestellgrößen — das verändert, welches Gerät und welches Angebot wir empfehlen.",
    it: "Un salone con una sola postazione e un ufficio da 600 persone hanno bisogno di macchine e quantità di ordine molto diverse — questo cambia quale attrezzatura e preventivo proponiamo.",
  },
  defaultOptionId: "business_boutique",
  options: [
    {
      id: "business_boutique",
      label: { en: "Boutique or salon", pl: "Butik lub salon", de: "Boutique oder Salon", it: "Boutique o salone" },
      signal: "business_boutique",
    },
    {
      id: "business_enterprise",
      label: { en: "Large office (500+ employees)", pl: "Duże biuro (500+ pracowników)", de: "Großes Büro (500+ Mitarbeitende)", it: "Grande ufficio (500+ dipendenti)" },
      signal: "business_enterprise",
    },
  ],
};

const businessNeedParameter: Persona["parameterDefs"][number] = {
  id: "business_need",
  label: {
    en: "Business need",
    pl: "Potrzeba biznesowa",
    de: "Geschäftlicher Bedarf",
    it: "Esigenza aziendale",
  },
  description: {
    en: "Whether he's mainly sourcing ongoing coffee and tea supply or new brewing equipment changes which proposition leads.",
    pl: "To, czy szuka głównie stałych dostaw kawy i herbaty, czy nowego sprzętu do parzenia, decyduje, jaka propozycja jest wiodąca.",
    de: "Ob er hauptsächlich laufenden Kaffee- und Teenachschub oder neue Brühgeräte sucht, entscheidet, welches Angebot führt.",
    it: "Se sta cercando principalmente forniture continue di caffè e tè o nuove attrezzature per la preparazione determina quale proposta guida.",
  },
  defaultOptionId: "business_need_coffee_supply",
  options: [
    {
      id: "business_need_coffee_supply",
      label: { en: "Coffee & tea supply", pl: "Dostawy kawy i herbaty", de: "Kaffee- und Teenachschub", it: "Forniture di caffè e tè" },
      signal: "business_need_coffee_supply",
    },
    {
      id: "business_need_equipment",
      label: { en: "Brewing equipment", pl: "Sprzęt do parzenia", de: "Brühgeräte", it: "Attrezzature per la preparazione" },
      signal: "business_need_equipment",
    },
  ],
};

const myBaristaBusinessParameter: Persona["parameterDefs"][number] = {
  id: "mybarista_business",
  label: {
    en: "MyBarista Business subscription",
    pl: "Subskrypcja MyBarista Business",
    de: "MyBarista Business-Abonnement",
    it: "Abbonamento MyBarista Business",
  },
  description: {
    en: "Whether his company already subscribes to MyBarista Business changes whether we pitch an acquisition offer or a retention one.",
    pl: "To, czy firma Lukasa subskrybuje już MyBarista Business, decyduje, czy proponujemy ofertę pozyskania, czy utrzymania klienta.",
    de: "Ob sein Unternehmen bereits MyBarista Business abonniert hat, entscheidet, ob wir ein Akquise- oder ein Bindungsangebot machen.",
    it: "Se l'azienda di Lukas è già abbonata a MyBarista Business determina se proponiamo un'offerta di acquisizione o di fidelizzazione.",
  },
  defaultOptionId: "mybarista_business_subscriber",
  options: [
    {
      id: "mybarista_business_subscriber",
      label: { en: "MyBarista Business subscriber", pl: "Subskrybent MyBarista Business", de: "MyBarista Business-Abonnent", it: "Abbonato MyBarista Business" },
      signal: "mybarista_business_subscriber",
    },
    {
      id: "mybarista_business_none",
      label: { en: "Not a MyBarista Business subscriber", pl: "Nie jest subskrybentem MyBarista Business", de: "Kein MyBarista Business-Abonnent", it: "Non abbonato MyBarista Business" },
      signal: "mybarista_business_none",
    },
  ],
};

const preferredCategoryParameter: Persona["parameterDefs"][number] = {
  id: "preferred_category",
  label: {
    en: "Preferred category",
    pl: "Preferowana kategoria",
    de: "Bevorzugte Kategorie",
    it: "Categoria preferita",
  },
  description: {
    en: "Whether she leans toward coffee or tea changes which product line and offer flavor we lead with.",
    pl: "To, czy skłania się ku kawie, czy herbacie, decyduje, jaką linię produktów i wariant oferty proponujemy.",
    de: "Ob sie eher zu Kaffee oder Tee tendiert, bestimmt, welche Produktlinie und Angebotsvariante wir anführen.",
    it: "Se preferisce il caffè o il tè determina quale linea di prodotti e variante dell'offerta proponiamo.",
  },
  defaultOptionId: "category_coffee",
  options: [
    {
      id: "category_coffee",
      label: { en: "Coffee", pl: "Kawa", de: "Kaffee", it: "Caffè" },
      signal: "category_coffee",
    },
    {
      id: "category_tea",
      label: { en: "Tea", pl: "Herbata", de: "Tee", it: "Tè" },
      signal: "category_tea",
    },
  ],
};

const customerTypeConsumerParameter: Persona["parameterDefs"][number] = {
  id: "customer_type",
  label: { en: "Customer type", pl: "Typ klienta", de: "Kundentyp", it: "Tipo di cliente" },
  description: {
    en: "Whether this is an individual shopper or a business buyer determines which Frescopa experience — consumer or business — applies.",
    pl: "To, czy jest to indywidualny klient, czy nabywca biznesowy, decyduje, które doświadczenie Frescopa — konsumenckie czy biznesowe — ma zastosowanie.",
    de: "Ob es sich um einen Einzelkunden oder einen Geschäftskunden handelt, bestimmt, welches Frescopa-Erlebnis — Verbraucher oder Unternehmen — zutrifft.",
    it: "Se si tratta di un acquirente individuale o di un acquirente aziendale determina quale esperienza Frescopa — consumatore o azienda — si applica.",
  },
  defaultOptionId: "customer_type_consumer",
  options: [
    {
      id: "customer_type_consumer",
      label: { en: "Consumer", pl: "Konsument", de: "Verbraucher", it: "Consumatore" },
      signal: "customer_type_consumer",
    },
  ],
};

const customerTypeBusinessParameter: Persona["parameterDefs"][number] = {
  id: "customer_type",
  label: { en: "Customer type", pl: "Typ klienta", de: "Kundentyp", it: "Tipo di cliente" },
  description: {
    en: "Whether this is an individual shopper or a business buyer determines which Frescopa experience — consumer or business — applies.",
    pl: "To, czy jest to indywidualny klient, czy nabywca biznesowy, decyduje, które doświadczenie Frescopa — konsumenckie czy biznesowe — ma zastosowanie.",
    de: "Ob es sich um einen Einzelkunden oder einen Geschäftskunden handelt, bestimmt, welches Frescopa-Erlebnis — Verbraucher oder Unternehmen — zutrifft.",
    it: "Se si tratta di un acquirente individuale o di un acquirente aziendale determina quale esperienza Frescopa — consumatore o azienda — si applica.",
  },
  defaultOptionId: "customer_type_business",
  options: [
    {
      id: "customer_type_business",
      label: { en: "Business", pl: "Firma", de: "Unternehmen", it: "Azienda" },
      signal: "customer_type_business",
    },
  ],
};

const annaFrescopa: Persona = {
  id: "anna_frescopa",
  name: "Anna Kowalska",
  avatarInitials: "AK",
  avatarKey: "anna",
  baselineSignals: [],
  eventDefs: [
    {
      id: "tea_category_browsing",
      label: {
        en: "Browsed the tea category repeatedly",
        pl: "Wielokrotnie przeglądała kategorię herbat",
        de: "Hat wiederholt die Teekategorie durchstöbert",
        it: "Ha visualizzato più volte la categoria tè",
      },
      description: {
        en: "Anna has read tea articles and browsed the tea category 3+ times this week — even though she's a regular coffee shopper.",
        pl: "Anna w tym tygodniu czytała artykuły o herbacie i przeglądała kategorię herbat 3 razy lub więcej — mimo że zwykle kupuje kawę.",
        de: "Anna hat diese Woche Tee-Artikel gelesen und die Teekategorie 3-mal oder öfter durchstöbert — obwohl sie normalerweise Kaffee kauft.",
        it: "Questa settimana Anna ha letto articoli sul tè e ha visualizzato la categoria tè 3 o più volte — anche se di solito acquista caffè.",
      },
      signal: "tea_category_browsing",
    },
    {
      id: "machine_cart_abandoned",
      label: {
        en: "Left an espresso machine in her cart",
        pl: "Zostawiła ekspres do kawy w koszyku",
        de: "Hat eine Espressomaschine im Warenkorb gelassen",
        it: "Ha lasciato una macchina per espresso nel carrello",
      },
      description: {
        en: "She added the Frésco Deluxe to her cart but didn't check out.",
        pl: "Dodała Frésco Deluxe do koszyka, ale nie sfinalizowała zakupu.",
        de: "Sie hat die Frésco Deluxe in den Warenkorb gelegt, aber nicht bezahlt.",
        it: "Ha aggiunto la Frésco Deluxe al carrello ma non ha completato l'acquisto.",
      },
      signal: "machine_cart_abandoned",
    },
  ],
  parameterDefs: [customerTypeConsumerParameter, ageParameter, sentimentParameter, frescopaLoyaltyParameter, preferredCategoryParameter],
};

const lukasFrescopa: Persona = {
  id: "lukas_frescopa",
  name: "Lukas Bergmann",
  avatarInitials: "LB",
  avatarKey: "lukas",
  baselineSignals: [],
  eventDefs: [
    {
      id: "bulk_quote_requested",
      label: {
        en: "Requested a bulk office coffee quote",
        pl: "Poprosił o wycenę hurtową kawy do biura",
        de: "Hat ein Großmengenangebot für Bürokaffee angefragt",
        it: "Ha richiesto un preventivo all'ingrosso per il caffè in ufficio",
      },
      description: {
        en: "Lukas asked for pricing on a 50-unit office coffee subscription for his company.",
        pl: "Lukas poprosił o wycenę subskrypcji kawy do biura na 50 jednostek dla swojej firmy.",
        de: "Lukas hat um ein Angebot für ein 50er-Bürokaffee-Abonnement für sein Unternehmen gebeten.",
        it: "Lukas ha chiesto un preventivo per un abbonamento caffè da 50 unità per l'ufficio della sua azienda.",
      },
      signal: "bulk_quote_requested",
    },
    {
      id: "subscription_renewal_due",
      label: {
        en: "Office coffee subscription renewal is due",
        pl: "Zbliża się odnowienie subskrypcji kawy do biura",
        de: "Erneuerung des Bürokaffee-Abonnements steht an",
        it: "Il rinnovo dell'abbonamento al caffè per l'ufficio è in scadenza",
      },
      description: {
        en: "His company's 50-unit office coffee subscription renews in two weeks.",
        pl: "Firmowa subskrypcja kawy do biura na 50 jednostek odnawia się za dwa tygodnie.",
        de: "Das 50er-Bürokaffee-Abonnement seines Unternehmens verlängert sich in zwei Wochen.",
        it: "L'abbonamento aziendale al caffè per l'ufficio da 50 unità si rinnova tra due settimane.",
      },
      signal: "subscription_renewal_due",
    },
    {
      id: "office_machine_research",
      label: {
        en: "Researched commercial brewing machines",
        pl: "Sprawdzał komercyjne ekspresy do kawy",
        de: "Hat gewerbliche Kaffeemaschinen recherchiert",
        it: "Ha valutato macchine da caffè professionali",
      },
      description: {
        en: "He's been comparing the Frésco Original and Frésco Deluxe for a higher-capacity break room machine.",
        pl: "Porównywał modele Frésco Original i Frésco Deluxe, szukając ekspresu o większej wydajności do pokoju socjalnego.",
        de: "Er hat die Frésco Original und die Frésco Deluxe für eine leistungsfähigere Maschine im Pausenraum verglichen.",
        it: "Ha confrontato la Frésco Original e la Frésco Deluxe per una macchina più capiente per la sala break.",
      },
      signal: "office_machine_research",
    },
  ],
  parameterDefs: [customerTypeBusinessParameter, ageParameter, sentimentParameter, myBaristaBusinessParameter, businessSizeParameter, businessNeedParameter],
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
  parameterDefs: [ageParameter, sentimentParameter, lumaLoyaltyParameter],
};

const annaRetail: Persona = {
  id: "anna_retail",
  name: "Anna Kowalska",
  avatarInitials: "AK",
  avatarKey: "anna",
  baselineSignals: [],
  eventDefs: [
    {
      id: "yoga_interest",
      label: {
        en: "Viewed yoga gear repeatedly",
        pl: "Wielokrotnie przeglądała sprzęt do jogi",
        de: "Hat wiederholt Yoga-Ausrüstung angesehen",
        it: "Ha visualizzato più volte l'attrezzatura da yoga",
      },
      description: {
        en: "Anna has looked at the same yoga mat and blocks 3+ times.",
        pl: "Anna przeglądała tę samą matę i klocki do jogi 3 razy lub więcej.",
        de: "Anna hat sich dieselbe Yogamatte und -blöcke 3-mal oder öfter angesehen.",
        it: "Anna ha guardato lo stesso tappetino e blocchi da yoga 3 o più volte.",
      },
      signal: "yoga_interest",
    },
    {
      id: "apparel_cart_abandoned",
      label: {
        en: "Left workout apparel in her cart",
        pl: "Zostawiła odzież sportową w koszyku",
        de: "Hat Trainingskleidung im Warenkorb gelassen",
        it: "Ha lasciato abbigliamento sportivo nel carrello",
      },
      description: {
        en: "She added workout apparel to her cart but didn't purchase.",
        pl: "Dodała odzież sportową do koszyka, ale jej nie kupiła.",
        de: "Sie hat Trainingskleidung in den Warenkorb gelegt, aber nicht gekauft.",
        it: "Ha aggiunto abbigliamento sportivo al carrello ma non l'ha acquistato.",
      },
      signal: "apparel_cart_abandoned",
    },
    {
      id: "attended_free_class",
      label: {
        en: "Attended a free studio class",
        pl: "Wzięła udział w bezpłatnych zajęciach",
        de: "Hat an einem kostenlosen Studiokurs teilgenommen",
        it: "Ha partecipato a una lezione gratuita in studio",
      },
      description: {
        en: "Anna recently tried a free yoga class in store.",
        pl: "Anna niedawno wypróbowała bezpłatne zajęcia jogi w sklepie.",
        de: "Anna hat kürzlich einen kostenlosen Yoga-Kurs im Geschäft ausprobiert.",
        it: "Anna ha recentemente provato una lezione di yoga gratuita in negozio.",
      },
      signal: "attended_free_class",
    },
  ],
  parameterDefs: [ageParameter, sentimentParameter, lumaLoyaltyParameter],
};

const lukasRetail: Persona = {
  id: "lukas_retail",
  name: "Lukas Bergmann",
  avatarInitials: "LB",
  avatarKey: "lukas",
  baselineSignals: [],
  eventDefs: [
    {
      id: "cycling_interest",
      label: {
        en: "Viewed the men's cycling collection repeatedly",
        pl: "Wielokrotnie przeglądał męską kolekcję kolarską",
        de: "Hat wiederholt die Herren-Radsportkollektion angesehen",
        it: "Ha visualizzato più volte la collezione ciclismo uomo",
      },
      description: {
        en: "Lukas has looked at the same cycling gear 3+ times.",
        pl: "Lukas przeglądał ten sam sprzęt kolarski 3 razy lub więcej.",
        de: "Lukas hat sich dieselbe Radsportausrüstung 3-mal oder öfter angesehen.",
        it: "Lukas ha guardato lo stesso equipaggiamento da ciclismo 3 o più volte.",
      },
      signal: "cycling_interest",
    },
    {
      id: "gear_cart_abandoned",
      label: {
        en: "Left cycling gear in his cart",
        pl: "Zostawił sprzęt kolarski w koszyku",
        de: "Hat Radsportausrüstung im Warenkorb gelassen",
        it: "Ha lasciato attrezzatura da ciclismo nel carrello",
      },
      description: {
        en: "He added cycling gear to his cart but didn't purchase.",
        pl: "Dodał sprzęt kolarski do koszyka, ale go nie kupił.",
        de: "Er hat Radsportausrüstung in den Warenkorb gelegt, aber nicht gekauft.",
        it: "Ha aggiunto attrezzatura da ciclismo al carrello ma non l'ha acquistata.",
      },
      signal: "gear_cart_abandoned",
    },
    {
      id: "luma_plus_gold",
      label: {
        en: "Reached Luma+ Gold member status",
        pl: "Osiągnął status członka Luma+ Gold",
        de: "Hat den Luma+ Gold-Mitgliedsstatus erreicht",
        it: "Ha raggiunto lo status di membro Luma+ Gold",
      },
      description: {
        en: "Lukas just reached Gold status in the Luma+ program.",
        pl: "Lukas właśnie osiągnął status Gold w programie Luma+.",
        de: "Lukas hat gerade den Gold-Status im Luma+ Programm erreicht.",
        it: "Lukas ha appena raggiunto lo status Gold nel programma Luma+.",
      },
      signal: "luma_plus_gold",
    },
  ],
  parameterDefs: [ageParameter, sentimentParameter, lumaLoyaltyParameter],
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
    colors: { primary: "#4674D3", dark: "#1A1A1A", accent: "#DCE6FA" },
    personas: [marcus, annaRetail, lukasRetail],
  },
  {
    id: "frescopa",
    name: "Retail - Frescopa",
    brand: "Frescopa",
    colors: { primary: "#C1440E", dark: "#2E1A12", accent: "#F5E6D3" },
    personas: [annaFrescopa, lukasFrescopa],
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
