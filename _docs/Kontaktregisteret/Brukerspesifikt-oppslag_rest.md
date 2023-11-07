---
title: Oppslag ved innlogget bruker (brukerstyrt datadeling)
description: OAuth2-beskytta bruker-spesifikt REST-API for Kontakt- og Reservasjonsregisteret
summary: "Kontaktinformasjon fra Kontakt- og Reservasjonsregisteret tilhørende  innlogget bruker er tilgjengelig på et eget Oauth2-beskyttet REST-API."

sidebar: krr_sidebar
product: KRR
redirect_from: /brukerspesifikt_oppslag_krr_rest
---

## Introduksjon

Kontaktopplysninger fra Kontakt- og Reservasjonsregisteret er oftest utlevert globalt gjennom [Oppslagstjenesten]({{site.baseurl}}/docs/Kontaktregisteret/oppslagstjenesten_rest). Men kunder kan også motta kontaktopplysninger kun tilhørende innlogget bruker, og det er i noen sammenhenger mer hensiktsmessig og bruke denne tjenesten.


## Bruk av Oauth2

Oppslag ved innlogget bruker baserer seg på [brukerstyrt datadeling]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_oauth2). I tillegg til idporten-scopene openid og profile, må det forespørres ett eller flere av følgende scopes:


| scope | beskrivelse |
|-|-|
| krr:user/kontaktinformasjon.read | Returnerer epostadresse og mobilnummer + tidspunkt for sist oppdatering |
|  | Returnerer status for om kontaktinfomasjonen kan brukast for varsling iht. eForvaltningsforskrifta sin §32 |
| | Returnerer brukerens foretrukne språk for kommunikasjon med det offentlige.  |  
| krr:user/digitalpost.read | Returnerer adresse for digital post til innbygger |
| | Returnerer brukerens krypteringssertifikat ved sending av digital post |
| krr:user/spraak.write | Endrer brukerens foretrukne språk for kommunikasjon med det offentlige. |

## API-endepunkt

|miljø|url|
|-|-|
|TEST|[https://test.kontaktregisteret.no/rest/v1/person](https://test.kontaktregisteret.no/rest/v1/person)|
|PROD|[https://kontaktregisteret.no/rest/v1/person](https://kontaktregisteret.no/rest/v1/person)|


{% include note.html content="Merk den lille forskjellen mellom 'person' (dette endepunktet) og 'personer' ([maskin-til-maskin endepunktet](oppslagstjenesten_rest.html)). De to tjenestene har også forskjellige domene-navn." %}


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

### Eksempel på endring av språk: {#spraak}

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

## Swagger
OpenAPI-dokumentasjon.

|miljø|url|
|-|-|
|TEST|[https://test.kontaktregisteret.no/swagger-ui/index.html](https://test.kontaktregisteret.no/swagger-ui/index.html)|
|PROD|[https://kontaktregisteret.no/swagger-ui/index.html](https://kontaktregisteret.no/swagger-ui/index.html)|
