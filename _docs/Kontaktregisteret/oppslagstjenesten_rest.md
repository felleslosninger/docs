---
title: Oppslagstjenesten REST
description: REST-API for Kontakt- og Reservasjonsregisteret

sidebar: krr_sidebar
product: KRR
redirect_from: /oppslagstjenesten_rest
---

## Introduksjon

Oppslagstjenesten gir offentlig forvaltning tilgang til innbyggers registrerte kontaktinformasjon. Tjenesten kan benyttes av offentlige virksomheter og virksomheter som utfører tjenester på vegne av det offentlige. 

Kontaktregisterets oppslagstjeneste tilbys gjennom et OAuth2 beskyttet REST-API, sikret med Maskinporten. Dette gjør det enkelt å implementere integrasjoner mot registeret.

## Bruk av Oauth2

Tilgangskontrollen til api'et benytter seg av  [Maskinporten sin funksjonalitet for maskin-til-maskin API-autorisasjon]({{site.baseurl}}/docs/Maskinporten/maskinporten_auth_server-to-server-oauth2)

Merk at REST-grensesnittet tidligere var sikret med den "innebygde maskinporten" i ID-porten OIDC, men det nå er anbefalt å bruke Maskinporten.

> I testmiljøet støtter oppslagstjenesten token fra [test.maskinporten.no](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_wellknown) (ikke ver2.maskinporten.no) 


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



|miljø|url|dato gyldig|
|-|-|-|
|TEST|[https://test.kontaktregisteret.no/rest/v1/personer](https://test.kontaktregisteret.no/rest/v1/personer)|
|TEST|[https://test.kontaktregisteret.no/rest/v2/personer](https://test.kontaktregisteret.no/rest/v2/personer)| |
|PROD|[https://kontaktregisteret.no/rest/v1/personer](https://kontaktregisteret.no/rest/v1/personer)|
|PROD|[https://kontaktregisteret.no/rest/v2/personer](https://kontaktregisteret.no/rest/v2/personer)| f.o.m. 22.08.23|


**Merk:** Man vil oppnå vesentlig bedre ytelse (målt i personer/sekund) ved å slå opp 1000 personer 1 gang kontra 1000 enkelt-oppslag.



### header-parametere

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
 "personidentifikatorer" : [ "20914695016" ]
}
```

### Eksempel på respons

```
{
  "personer":
    [
      {
         "personidentifikator": "20914695016",
         "reservasjon": "NEI",
         "status": "AKTIV",
         "kontaktinformasjon":
         {
            "epostadresse": "NULLstillt@default.digdir.no",
            "epostadresse_oppdatert": "2023-06-29T10:14:52+02",
         }
      }
   ]
}
```


## IP-adresser og brannmurkonfigurasjon
Utgående brannmur må være åpen mot disse adressene:

### Produksjon

| DNS-navn                      | IPv4-adresse                   | Port | Tjeneste | Beskrivelse                                                                       | Inn-/utgående trafikk |
|-------------------------------|--------------------------------|------|----------|-----------------------------------------------------------------------------------|-----------------------|
| kontaktregisteret.no                |  139.105.36.169          | 443  | Oppslagstjenesten KRR     | I bruk f.o.m 30.08.2023 | utgående| 

| DNS-navn                      | IPv6-adresse                   | Port | Tjeneste | Beskrivelse                                                                       | Inn-/utgående trafikk |
|-------------------------------|--------------------------------|------|----------|-----------------------------------------------------------------------------------|-----------------------|
| kontaktregisteret.no           | 2a02:9cc::206    | 443 | Oppslagstjenesten KRR | I bruk f.o.m 29.10.2024             | utgående | 

### Test

| DNS-navn                      | IPv4-adresse                   | Port | Tjeneste | Beskrivelse                                                                       | Inn-/utgående trafikk |
|-------------------------------|--------------------------------|------|----------|-----------------------------------------------------------------------------------|-----------------------|
| test.kontaktregisteret.no           | 139.105.36.137    | 443 | Oppslagstjenesten KRR | I bruk f.o.m 27.06.2023             | utgående | 

| DNS-navn                      | IPv6-adresse                   | Port | Tjeneste | Beskrivelse                                                                       | Inn-/utgående trafikk |
|-------------------------------|--------------------------------|------|----------|-----------------------------------------------------------------------------------|-----------------------|
| test.kontaktregisteret.no           | 2a02:9cc::306    | 443 | Oppslagstjenesten KRR | I bruk f.o.m 13.05.2024             | utgående | 

## Swagger
OpenAPI-dokumentasjon. 

|miljø|url|
|-|-|
|TEST|[https://test.kontaktregisteret.no/swagger-ui/index.html](https://test.kontaktregisteret.no/swagger-ui/index.html)|
|PROD|[https://kontaktregisteret.no/swagger-ui/index.html](https://kontaktregisteret.no/swagger-ui/index.html)|
