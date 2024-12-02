---
title: Datadeling i Ansattporten
description: Et API beskyttet med Ansattporten kan kreve at innlogga bruker må representere en virksomhet

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_datadeling
---

Bruksområdet for innlogging på vegne av virksomhet til nett-tjeneste kan også enkelt utnyttes til å støtte representasjon også i datadeling / mot APIer.  Tjenesten som brukeren har logget inn til, vil kunne utveksle data på vegne av valgt organisasjon mot et API hos en API-tilbyder. 

Du finner mer overordnet informasjon om Ansattporten ved å klikke [her](ansattporten_om.html)

# Beskrivelse av bruksscenarioet

På denne siden beskriver vi hvordan en API-tilbyder kan kreve at en sluttbruker må kunne representere en virksomhet ved innlogging i et eksternt fagsystem som skal bruke APIet. 

 Dette scenariet bygger videre på [innlogging på vegne av virksomhet til nett-tjeneste](ansattporten_representasjon.html)
 
# Brukerreise

Ved representasjon i datadeling er brukerreisen identisk som ved representasjons-innlogging, men det er blir lagt på to steg til slutt i flyten:

1. Bruker klikker login-knapp hos en ekstern tjeneste. Tjenesten ber om en type representasjon.
2. Bruker autentiserer seg med eID gjennom Ansattporten.
3. Bruker velger hvilken virksomhet hen vil representere.
4. Bruker blir sendt tilbake til tjenesten.
5. Tjenesten sender et API-kall mot et API.   
6. API-et validerer at brukeren har representasjon av påkrevd type

Ved å kreve at tjenesten sender et Ansattporten-token i steg 5 for å få tilgang til APIet, så kan API-tilbyder være sikker på at brukeren som logget inn i tjenesten har lov til å representere virksomheten. Merk dog at valgt virksomhet ikke nødvendigvis trenger å samsvare med den organisasjonen som eier tjenesten:

> Eksempel: Ola logger inn på vegen av Oslo Kommune til en tjeneste fra Visma som skal bruke et API hos Skatteetaten

# Protokoll-flyt

<div class="mermaid">
sequenceDiagram

participant B as Bruker
participant C as Tjeneste
participant A as Ansattporten
participant S as Autorativ kilde
participant T as API

B->>C: Klikker "login" på tjeneste
C-->>A: /authorize med <br/>representasjonstype (redirect)
note over A: sluttbruker autentiserer seg
A->>+S: Har sluttbruker <br/>denne representasjonstypen ?
S->>-A: Liste med virksomheter
note over A: sluttbruker velger en virksomhet
A-->>C: redirect med code
C->>+A: /token
A->>-C: id_token, access_token
note over B,C: innlogget på vegne av valgt virksomhet

C->>+T: API-kall m/access token
note over T: validere representasjonstype
T->>-C: data

</div>

På akkurat samme måte som ved representasjons-innlogging, så er representasjon ved datadeling kommunisert vha. såkalte [Rich Authorization Request (RAR)](ansattporten_rar.html)-strukturer, dvs. claimet `authorization_details`.

Det er viktig å merke seg følgende:

- Tjenesten (oauth2-klienten) skal sende videre access_tokenet og ikke id_tokenet.
- APIet må validere at access_tokenet har den forespurte typen representasjon. 


