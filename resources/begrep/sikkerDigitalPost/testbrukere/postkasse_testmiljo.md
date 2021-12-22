---
title: Testmiljø for digital postkasse

sidebar: dpi_sidebar
---

Her er en beskrivelse av de testmiljøer som er tilgjengelig for kunder og bruksområdet for disse.

### Funksjonell testing:

Digitaliseringsdirektoratet har ett funksjonelt testmiljø tilgjengelig for kunder. Miljøet er beregnet til funksjonell testing av integrasjoner mot digital
postkasse til innbyggere. Det funksjonelle testmiljøet er knyttet opp mot ID-porten og kontakt- og reservasjonsregisterets testmiljø; verifikasjon 1 (ver1). 
Funksjonelt testmiljø skal benyttes av kunder som skal integrere seg mot Digitaliseringsdirektoratets felleskomponenter og kan også benyttes til feilsøking 
i etablerte integrasjoner. Det funksjonelle testmiljøet har samme versjon av Digitaliseringsdirektoratets felleskomponenter som produksjonsløsningen. Når en 
ny versjon av Digdirs felleskomponenter er satt i produksjon, vil testmiljøet bli oppgradert tilsvarende. For å hindre nedetid og andre problemer i det 
funksjonelle testmiljøet er det etablert noen kjøreregler for hvordan miljøet skal brukes. 

#### Kjøreregler for bruk av det funksjonelle testmiljøet:

- Det skal kun brukes fiktive testdata i funksjonelt testmiljø. Ingen sporbare personopplysninger skal brukes.
- Størrelsen på dokumenter, logoer og annet som brukes bør være som forventet i produksjon.
- Alle forsendelser eldre enn 30 dager slettes automatisk fra funksjonelt testmiljø, unntak fra denne regelen kan avtales. 
- Mengden brev som sendes innenfor en periode skal ligne produksjonsmønsteret. Unngå å sende veldig mange brev innenfor en kort periode med mindre det er planlagt trafikkmønster.
- Det totale antallet brev som sendes over tid bør ikke være for høyt.
- Brev bør fordeles til flere test-mottakere. Unngå å sende veldig mange brev til samme test-mottakere. 

### Ytelsestesting:

Digitaliseringsdirektoratet tilbyr også et eget ytelsestestmiljø som kan bestilles for å utføre test av ytelsen til kundens tjeneste i samspill med digital postkasse. 
Ytelsestesting skal varsles på forhånd, og tilgang til ytelsestest-miljøet må bestilles ved å sende en mail til servicedesk@digdir.no.
Dette er en tilleggstjeneste som er ytterligere beskrevet i tilleggstjenester for Digitaliseringsdirektoratets felleskomponenter. Ved oppgradering av funksjonelt 
testmiljø til nye releaser, vil Digitaliseringsdirektoratet kunne stenge tilgangen i en kortere periode (1-2 dager). Dette blir varslet i forkant på samarbeidsportalen.
