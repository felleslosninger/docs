---
title: OAuth2-beskytta bruker-spesifikt REST-API for Kontakt- og Reservasjonsregisteret
description: OAuth2-beskytta bruker-spesifikt REST-API for Kontakt- og Reservasjonsregisteret
summary: "Kontaktinformasjon fra Kontakt- og Reservasjonsregisteret tilhørende  innlogget bruker er tilgjengelig på et eget Oauth2-beskyttet REST-API."
permalink: brukerspesifikt_oppslag_krr_rest.html
sidebar: oidc
product: ID-porten
---

## Introduksjon

Kontaktopplysninger fra Kontakt- og Reservasjonsregisteret er oftest utlevert globalt gjennom [Oppslagstjenesten](https://begrep.difi.no/Oppslagstjenesten/) (eller [Oauth2-varianten](oidc_api_krr.html) av denne).  

Men kunder kan også motta kontaktopplysninger kun tilhørende innlogget bruker, og dette kan i noen sammehenger være mer hensiktsmessig.

## Hvordan få tilgang ?

Kunde må godkjenne bruksvilkår for Kontakt- og Reservasjonsregisteret for å kunne motta kontaktopplysningene.

## Bruk av Oauth2

Tjenesten baserer seg på [autentiseringsnær autorisasjon](oidc_auth_oauth2.html).


Man må forespørre ett eller flere av følgende scopes:


| scope | beskrivelse |
|-|-|
| user/kontaktinformasjon.read | Returnerer epostadresse og mobilnummer + tidspunkt for sist oppdatering |
| user/varslingsstatus.read | Returnerer status for om kontaktinfomasjonen kan brukast for varsling iht. eForvaltningsforskrifta sin §32 |
| user/sikkerdigitalpost.read | Returnerer adresse for digital post til innbygger |
| user/sertifikat.read | Returnerer brukerens krypteringssertifikat ved sending av digital post |
| user/spraak.read | Returnerer brukerens foretrukne språk for kommunikasjon med det offentlige.  |   
| user/spraak.write | Endrer brukerens foretrukne språk for kommunikasjon med det offentlige. |

## API-endepunkt

OpenAPI-dokumentasjon ligg her: [https://oidc-ver2.difi.no/kontaktinfo-oauth2-server/rest/swagger-ui.html#/Person](https://oidc-ver2.difi.no/kontaktinfo-oauth2-server/rest/swagger-ui.html#/Person)

|miljø|url|
|-|-|
|VER1|[https://oidc-ver1.difi.no/kontaktinfo-oauth2-server/rest/v1/person](https://oidc-ver1.difi.no/kontaktinfo-oauth2-server/rest/v1/person)|
|VER2|[https://oidc-ver2.difi.no/kontaktinfo-oauth2-server/rest/v1/person](https://oidc-ver2.difi.no/kontaktinfo-oauth2-server/rest/v1/person)|
|YT2|[https://oidc-yt2.difi.eon.no/kontaktinfo-oauth2-server/rest/v1/person](https://oidc-yt2.difi.eon.no/kontaktinfo-oauth2-server/rest/v1/person)|
|PROD|[https://oidc.difi.no/kontaktinfo-oauth2-server/rest/v1/person](https://oidc.difi.no/kontaktinfo-oauth2-server/rest/v1/person)|


{% include note.html content="Merk den lille forskjellen mellom 'person' (dette endepunktet) og 'personer' ([server-til-server endepunktet](oidc_api_krr.html))" %}


Følgende header-parametere må brukes på request:

| Parameter  | Verdi |
| --- | --- |
| Http-metode: | GET |
| Accept: | application/jose  (evt. application/json ) |
| Authorization: | Bearer \<utstedt access_token\> |

### Eksempel på respons:


Se https://begrep.difi.no/Oppslagstjenesten/Person for definisjon av kodeverket.


```
      {
         "personidentifikator": "23079421936",
         "reservasjon": "NEI",
         "status": "AKTIV",
		 "varslingsstatus" : "KAN_VARSLES",
         "kontaktinformasjon":
         {
            "epostadresse": "23079421936-test@minid.norge.no",
            "epostadresse_oppdatert" : "2018-06-29T10:14:52+02",
         }
      }
```

### Eksempel på endring av språk:

Forspørselen nedenfor vil endre innlogget bruker sitt foretrukne språk i Kontaktregisteret til engelsk:

```
PATCH /rest/v1/person
Content-type: application/json
Authorization: Bearer SWDQ_pVct3HIzsIaC3zHDuMmIqffr4ORr508N3p0Mtg=

{
 "spraak" : "en"
}
```

Det er viktig at kunder som bruker skrive-API informerer brukeren om at endringer skjer i et nasjonalt register, og ikke kun for denne tjenesten.

Se også [OpenAPI-dokumentasjonen](https://oidc-ver2.difi.no/kontaktinfo-oauth2-server/rest/swagger-ui.html#/Person/patchUserUsingPATCH).
