---
title: Representasjon i Ansattporten
description: Ansattporten lar brukere logge inn på vegne av en virksomhet

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_representasjon
---


Ansattporten tilbyr *beriket* autentisering, altså at informasjon om innlogget bruker blir beriket med et representasjonsforhold/autorisasjonsinformasjon fra en ekstern autorativ kilde.  I første versjon av løsningen er det Altinn Autorisasjon som tilbys som autorativ kilde.

Du finner mer overordnet informasjon om Ansattporten ved å klikke [her](ansattporten_om.html)

# Beskrivelse av bruksscenarioet

På denne siden beskriver vi hvordan en tjeneste kan la brukerene velge hvilken virksomhet de ønsker å representere.  Dette scenariet bygger videre på [vanlig punktautentisering](ansattporten_guide.html). 

# Brukerreise

Ved representasjon er brukerreisen følgende:

1. Bruker klikker login-knapp hos tjeneste. Tjenesten ber om en type representasjon.
2. Bruker autentiserer seg med eID gjennom Ansattporten.
3. Bruker velger hvilken virksomhet hen vil representere.
4. Bruker blir sendt tilbake til tjenesten.

I steg 3. viser Ansattporten en organisasjonsvelger etter autentisering, der sluttbruker må velge hvilke(n) organisasjon hen vil representere:

![organsisasjonsvelger](/images/ansattporten/ansattporten_orgvelger2.png)

# Protokoll-flyt

Representasjonspålogging er en [vanlig autorisasjons-kodeflyt ihht Oauth2/OIDC](ansattporten_guide.html) der tjenesten i autorisasjonsforespørselen inkluderer et tillegg som forespør hvilken type representasjonsforhold som brukeren må inneha hos den autorative kilden.

<div class="mermaid">
sequenceDiagram

participant B as Bruker
participant C as Tjeneste
participant A as Ansattporten
participant S as Autorativ kilde

B->>C: Klikker "login" på tjeneste
C-->>A: /authorize med <br/>representasjonstype (redirect)
note over A: sluttbruker autentiserer seg
A->>+S: Har sluttbruker <br/>forespurt representasjonstype(r) ?
S->>-A: Liste med virksomheter
note over A: sluttbruker velger en virksomhet
A-->>C: redirect med code
C->>+A: /token
A->>-C: id_token
note over B,C: innlogget på vegne av valgt virksomhet

</div>

Ansattporten bruker standarden [Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) til å strukturere informasjon om representasjonsforhold, både i forespørsler og tokens.  En oversikt over [støtta RAR-typer i Ansattporten finner du her](ansattporten_rar.html)

Klienten må inkludere claimet `authorization_details` i autorisasjonsforespøreselen for å trigge representasjonspålogging.  Et eksempel er vist her:

```
https://login.test.ansattporten.no/authorize?
  scope=openid&
  client_id=9a99e96d-b56c-4f74-a689-f936f71c8819&
... 
  authorization_details= [
    {
      "type": "ansattporten:altinn:service",
      "resource": "urn:altinn:resource:2480:40"
    }
  ]
```
(merk at eksempelet er forenklet)

`authorization_details`-arrayet inneholdet et JSON-objekt der claimet `type` forteller hvilken autorativ kilde som tjenesten ønsker å benytte. Ulike `type` vil ha egne datamodeller for hvilke andre claims som inngår i request og respons.  Datamodellene er beskrevet [her](ansattporten_rar.html).


Når brukeren blir redirecta tilbakt til klient, [henter klienten tokens på vanlig måte](../../docs/idporten/oidc/oidc_protocol_token.html), og bruker dette til å opprette sin egen, lokal brukersesjon i egen tjeneste.

Klienten finner opplysninger om valgt representasjonsforhold i claimet `authorization_details`. Claimet er både returnert direkte som del av selve token-responsen, men er også inkludert i selve id_tokenet, for fleksibiltet.


*Eksempel på token-response:*
```
200 OK

{
  "id_token"      : "eyJraWQiO...",

  "access_token"  : "eyJraWQiO..."
  "token_type" : "Bearer",
  "expires_in" : 600

  "scope" : "openid profile",

  "authorization_details" : [ {
    "resource" : "urn:altinn:resource:2480:40",
    "type" : "ansattporten:altinn:service",
    "resource_name" : "Produkter og tjenester fra Brønnøysundregistrene",
    "reportees" : [ {
      "Rights" : [ "Read", "ArchiveDelete", "ArchiveRead" ],
      "Authority" : "iso6523-actorid-upis",
      "ID" : "0192:987464291",
      "Name" : "DIGITALISERINGSDIREKTORATET AVD LEIKANGER"
    } ]
  } ],

  "refresh_token" : "eyJlbmMiO...",
  "refresh_token_expires_in" : 7200,
}
```

*Eksempel på id_token med representasjons-informasjon: *
```
{
  "sub" : "z9RuQiLefXmJOBnywa_c75YQMH05nDsHjw0RFzuJC8M",
  "amr" : [ "TestID" ],
  "iss" : "https://test.ansattporten.no",
  "pid" : "45840375084",
...
  "authorization_details" : [ {
    "resource" : "urn:altinn:resource:2480:40",
    "type" : "ansattporten:altinn:service",
    "resource_name" : "Produkter og tjenester fra Brønnøysundregistrene",
    "reportees" : [ {
      "Rights" : [ "Read", "ArchiveDelete", "ArchiveRead" ],
      "Authority" : "iso6523-actorid-upis",
      "ID" : "0192:987464291",
      "Name" : "DIGITALISERINGSDIREKTORATET AVD LEIKANGER"
    } ]
  } ]
}

```

Merk at bruken av `authorization_details` inne i et id_token ikke er beskrevet i RAR-spesifikasjonen. Klienten skal fortrinnsvis bruke token-responsen til å utlede hvilke rettigheter sluttbruker gav til klienten. Vi har valgt å inkludere det for enkelhets skyld.



## Test

Man kan teste løsningen uten å lage en integrasjon ved å bruke vår demo-tjeneste [https://demo-client.test.ansattporten.no/](https://demo-client.test.ansattporten.no/).  Her kan man også studere protokoll-flyten i detalj.   Dersom man ønsker å teste organisasjonsvelger, så kan man bruke `[{"type":"ansattporten:altinn:service","resource": "urn:altinn:resource:2480:40"}]` i authorization_details-feltet (denne tjenestekoden gir ut nøkkelroller).

Vi anbefaler å bruke [Tenor testdata-søk](https://www.skatteetaten.no/skjema/testdata/) til å finne test-brukere. Tenor har mulighet til å filtrere slik at man får bare **daglig leder** fra test-Enhetsregisteret. En annen fordel med Tenor er at det kun er syntetiske testdata her, så man slipper å risikere å blande produksjons- og test-data.

> Ved å bruke **TestID** som innloggingsmetode slipper man å kontakte Digdir for å få opprettet og resatt testbrukere.  TestID har også integrasjon mot Tenor, så du kan hente tilfeldige test-personer derifra.

**MERK:** Dersom testbrukeren ikke finnes fra før i Altinn sitt testmiljø (typisk for syntetiske fødselsnummer), vil ikke organisasjonsvelger fungere. Dette løses enkelt ved å logge inn i TT02 en gang.
