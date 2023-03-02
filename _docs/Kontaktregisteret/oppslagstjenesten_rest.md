---
title: Oppslagstjenesten REST
description: REST-API for Kontakt- og Reservasjonsregisteret

sidebar: krr_sidebar
product: KRR
redirect_from: /oppslagstjenesten_rest
---

## Introduksjon

Kontaktregisteret sin oppslagstjeneste tilbys gjennom et OAuth2 beskyttet REST-API, sikret med Maskinporten. Dette gjør det enkelt å implementere integrasjoner mot registeret.

## Bruk av Oauth2

Tilgangskontrollen til api'et benytter seg av  [Maskinporten sin funksjonalitet for maskin-til-maskin API-autorisasjon]({{site.baseurl}}/docs/Maskinporten/maskinporten_auth_server-to-server-oauth2)

Merk at REST-grensesnittet tidligere var sikret med den "innebygde maskinporten" i ID-porten OIDC, men det nå er anbefalt å bruke Maskinporten.

### Lokal kopi (endringsmeldinger)
Funksjonalitet for lokal kopi (endringsmeldinger) er fra november 2022 støttet over Oauth2-grensenittet. SOAP-grensesnittet blir faset ut 01.04.2023. Informasjon og dokumentasjon fås ved å kontakte servicedesk@digdir.no


### Tilgjenglige scopes

API-responsen er avhengig av hvilke scope som er forespurt i tokenet.   Tilgjengelige scopes er:

| scope | beskrivelse |
|-|-|
| krr:global/kontaktinformasjon.read | Returnerer epostadresse og mobilnummer + tidspunkt for sist oppdatering |
| | Returnerer status for om kontaktinfomasjonen kan brukast for varsling iht. eForvaltningsforskriften  §32 |
| | Returnerer brukerens foretrukne språk for kommunikasjon med det offentlige.  |
| krr:global/digitalpost.read | Returnerer adresse for digital post til innbygger |
| | Returnerer brukerens krypteringssertifikat ved sending av digital post |

Det vil alltid returneres reservasjonsstatus for brukeren.

Merk at scopene med `krr:`-prefix er noe konsolidert i forhold til tidligere.

## Endepunkt

Oppslagstjenesten sin REST-tjeneste tilbyr følgende endepunkt for søk på 1...1000 personer:



|miljø|url|
|-|-|

|VER2/TEST|[https://test.kontaktregisteret.no/rest/v1/personer](https://test.kontaktregisteret.no/rest/v1/personer)|
|PROD|[https://kontaktregisteret.no/rest/v1/personer](https://kontaktregisteret.no/rest/v1/personer)|

**Merk:** Man vil oppnå vesentlig bedre ytelse (målt i personer/sekund) ved å slå opp 1000 personer 1 gang kontra 1000 enkelt-oppslag.

Følgende header-parametere må brukes på request:

| Parameter  | Verdi |
| --- | --- |
| Http-metode | POST |
| Authorization | Bearer \<utstedt access_token\> |

Body i requesten er en JSON-struktur med et element `personidentifikatorer` som skal inneholde en liste med inntil 1000 personidentifikatorer.

### Eksempel på forespørsel

```
POST /rest/v1/personer
Content-type: application/json
Authorization: Bearer SWDQ_pVct3HIzsIaC3zHDuMmIqffr4ORr508N3p0Mtg=

{
 "personidentifikatorer" : [ "23079422568" ]
}
```

### Eksempel på respons

```
{
  "personer":
    [
      {
         "personidentifikator": "23079421936",
         "reservasjon": "NEI",
         "status": "AKTIV",
         "kontaktinformasjon":
         {
            "epostadresse": "23079421936-test@minid.norge.no",
            "epostadresse_oppdatert": "2018-06-29T10:14:52+02",
         }
      }
   ]
}
```
## Swagger
OpenAPI-dokumentasjon for endepunkter. 

|miljø|url|
|-|-|
|VER2|[https://oidc-ver2.difi.no//kontaktinfo-oauth2-server/swagger-ui/index.html](https://oidc-ver2.difi.no//kontaktinfo-oauth2-server/swagger-ui/index.html)|
|PROD|[https://oidc.difi.no/kontaktinfo-oauth2-server/swagger-ui/index.html](https://oidc.difi.no/kontaktinfo-oauth2-server/swagger-ui/index.html)|

## Gammel dokumentasjon

Tidligere var REST-APIet sikret med Maskinporten-funksjonaliteten som er "innebygd" i ID-porten OIDC. Som en følge av at Maskinporten ble skilt ut som egen, selvstendig tjeneste (egen Oauth2 issuer) høsten 2019, ble også Oppslagstjensten endret til å være sikret av Maskinporten. Samtidig ble det gjort noen forenklinger:
- Konsolidert antall scopes fra 5 til 2 basert på analyse av faktisk bruk
- Forenklet URL til APIet


Gamle URLer:

 |miljø|url|
 |-|-|
 |VER1|[https://oidc-ver1.difi.no/kontaktinfo-oauth2-server/rest/v1/personer](https://oidc-ver1.difi.no/kontaktinfo-oauth2-server/rest/v1/personer)|
 |VER2|[https://oidc-ver2.difi.no/kontaktinfo-oauth2-server/rest/v1/personer](https://oidc-ver2.difi.no/kontaktinfo-oauth2-server/rest/v1/personer)|
 |YT2|[https://oidc-yt2.difi.eon.no/kontaktinfo-oauth2-server/rest/v1/personer](https://oidc-yt2.difi.eon.no/kontaktinfo-oauth2-server/rest/v1/personer)|
 |PROD|[https://oidc.difi.no/kontaktinfo-oauth2-server/rest/v1/personer](https://oidc.difi.no/kontaktinfo-oauth2-server/rest/v1/personer)|



### Migrering

Dersom du skal migrere fra gammelt OIDC-beskytta endepunkt til nytt Maskinporten-sikra endepunkt, må følgende gjøres:

1. Oppdater klient-registrering til å bruke nye scopes med `krr:`-prefix
2. Klienten må endres til å hente tokens fra Maskinporten isteden for ID-porten OIDC
  - typisk ved å oppdatere url for autorisasjonsserverens oauth2 metadata-endepunkt til `https://maskinporten.no/.well-known/oauth-authorization-server`
  - evt. ved å konfigurere nytt token-endepunkt direkte (`https://maskinporten.no/token`) og oppdatere trust mot Maskinporten sitt signeringssertifikat.
3. Endre API-kall til å gå mot nytt endepunkt
