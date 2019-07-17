---

title: Arkitektur  
permalink: sdp_arkitektur.html
sidebar:

---

## Arkitektur

Løsningen består av fem sentral komponenter (aktører) foruten avsendere
(Offentlige virksomheter) og mottakere (Innbyggere). Disse aktørene er:

  - **Oppslagstjeneste for kontaktinformasjon:** Offentlig virksomheters
    (avsenders) grensesnitt mot kontakt- og reservasjonsregisteret.
  - **Kontakt- og reservasjonsregistre:** Register for innbyggernes
    digitale kontaktinformasjon og reservasjonsstatus. Offentlig
    virksomhet har tilgang via Oppslagstjeneste for kontaktinformasjon.
  - **Meldingsformidler**: Offentlig virksomheters grensesnitt mot
    posttjenesten og som har ansvaret for å formidle post til innbygger,
    enten som digitale brev til innbyggers selvvalgte digitale
    postkasse, eller som papirbrev til innbyggers postadresse.
  - **Digital postkasse**: Innbyggernes grensesnitt mot posttjenesten og
    som har ansvaret for å gjøre tilgjengelig og oppbevare innbyggers
    digitale brev fra det offentlige.
  - **Utskrift- og posttjeneste**: Ivaretar sikker digital posttjeneste
    som en totalleverandør for post til innbygger fra det offentlige,
    ved å sende papirbrev til innbygger som ikke kan eller ønsker å
    motta digitale brev.

Figuren under viser en detaljering av posttjenesteaktørene, og flyten av
informasjonsobjekter mellom aktørene.

[![Figuren viser en detaljering av posttjenesteaktørene, og flyten av
informasjonsobjekter mellom aktørene](arkitektur.png
"Figuren viser en detaljering av posttjenesteaktørene, og flyten av informasjonsobjekter mellom aktørene")](arkitektur.png)

Offentlige virksomheter (avsendere) henter kontaktinformasjon til
innbygger via oppslagstjeneste for kontaktinformasjon. Oppslagstjenesten
henter kontaktinformasjon fra kontakt- og reservasjonsregisteret.
Innbygger er ansvarlig for at kontaktinformasjonen i registrene er
oppdatert, og at de ikke legger inn skjermingsverdig kontaktinformasjon.

Når avsender har hentet kontaktinformasjon til innbygger, adresseres
postforsendelsen helt frem til innbygger. Dette kan gjøres enten som
digital post som krypteres ende-til-ende og adresseres til innbyggers
digitale postkasse, eller som post som krypteres til utskrift- og
posttjenesten og adresseres til innbyggers postadresse. Begge typer post
sendes til meldingsformidler for videre transport.

### Sende (ekspedere) post:

Stegene for Offentlige virksomheter for å sende (ekspedere) post er som
følger:

1.  Post (informasjon) produseres i f.eks. fag~~, sak~~ eller
    arkivsystem.
2.  Mottaker identifiseres med fødselsnummer eller d-nummer og mottakers
    kontaktinformasjon hentes ved bruk av Oppslagstjenesten.
    Forsendelsen adresseres og kontaktinformasjon legges til på bakgrunn
    av:  
    \#\* reservasjonsstatus  
    \#\* digital postkasseadresse  
    \#\* varslingsadresse (epost og mobilnummer)  
    \#\* sertifikatinformasjon (enten postkasseleverandørens eller
    postmottakerens sertifikat)  
    \#\* postadresse brukes dersom mottaker har reservert seg eller ikke
    har en digital postkasse (postadresse leveres ikke av
    Oppslagstjenesten)
3.  Posten klargjøres gjennom at Avsender:  
    \#\* tilpasser postforsendelsen til Sikker digital posttjenestens
    meldingsspesifikasjoner  
    \#\* signerer postforsendelsen med Avsenders private nøkkel.  
    \#\* sikrer postforsendelsen mot uautorisert innsyn ved å kryptere
    posten med sertifikatinformasjon fra Oppslagstjenesten.
4.  Postforsendelsen sendes til Meldingsformidleren
5.  Ekspedering av post avsluttes ved at utgående post loggføres

Prosessene for ekspedering og formidling av post er ytterligere
detaljert i [Arkitekturbeskrivelsen for Sikker Digital
Posttjeneste](ArkitekturbeskrivelseforSikkerdigitalposttjenestev1.0.pdf).
