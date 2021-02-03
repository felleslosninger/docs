---
title: OAuth2 beskytta REST-API for innbyggers påloggingsnivå
description: API for innbyggers høyest brukte påloggingsnivå i ID-porten
summary: "Innbygger sitt høyeste brukte påloggingsnivå i ID-porten kan utleveres over et Oauth2-beskyttet REST-grensesnitt."
permalink: oidc_api_authlevel.html
sidebar: oidc
product: ID-porten
---

## Introduksjon

Kunder kan bestille utlevering av innbyggers høyeste brukte påloggingsnivå i ID-porten. Informasjonen som utleveres er hvorvidt innbygger har gjennomført en nivå-4 innlogging gjennom ID-porten siden en dato kunde oppgir. Oppgis ingen dato, skjer søket innenfor de siste 18 månedene.

Kunden mottar opplysningene for å tilpasse sin dialog med innbygger, basert på kunnskapen om innbyggeren med høy grad av sannsynlighet kan utføre en nivå4-pålogging eller ikke.

## Hvordan få tilgang ?

Denne tjenesten er en tilleggstjeneste i ID-porten. Se [Samarbeidsportalen](https://samarbeid.digdir.no) for generelle vilkår for tilleggstjenester.


## Bruk av Oauth2

REST-grensesnittet er sikret vha. [server-til-server Oauth](https://difi.github.io/idporten-oidc-dokumentasjon//4_server-to-server-oauth2.html).


Følgende scopes aksepteres av grensesnittet:

| scope | beskrivelse |
| - | - |   
| `global/idporten.authlevel.read`  |  Lese ut innbygger  som innlogget bruker har til mine tjenester  |


Kunden må i bestillingen oppi organisasjonsnummeret som brukes i virksomhetssertifikatet som generer JWT-førespørselen.  Sertifikatet må være virksomhetssertifikat fra Buypass eller Commfides, med key usage: Digital Signature.

For test-miljøer brukes virksomshetssertifiakter fra Buypass / Commfides sine TEST verdikjeder.

## REST-grensesnittet

REST-grensesnittet er basert på oppslag på enkelt-personer, og er dokumentert vha. [OpenAPI Specification (Swagger)](https://github.com/OAI/OpenAPI-Specification) på følgende URL:
[https://kontaktinfo-ws-ver2.difi.no/authlevel/swagger-ui.html#!/auth-level-controller-impl/postUsingPOST](https://kontaktinfo-ws-ver2.difi.no/authlevel/swagger-ui.html#!/auth-level-controller-impl/postUsingPOST)

Dersom ikke _fraDato_ er angitt i førespørselen, skjer søket innenfor siste 18 måneder ihht. eForvaltningsforskriftens §32.  

Merk at dersom du søker på en person som ikke finnes i ID-porten, vil du kun få HTTP responskode 404 tilbake.

Personer som eventuelt er sperret i ID-porten vil uteleveres som harbruktnivaa4 = false.

Mulige feilkoder er:

| kode | Beskrivelse|
| --- | --- |
|400 | Bad request – syntaktisk ugyldig request body.|
|401 | Ugyldig access token, f.eks. utløpt|
|403 |  Gyldig access token men bundet til feil scope ( sær feilsituasjon ) |
|404 | Forespurt bruker er ikkje registrert som id-porten bruker|


## Eksempel-kode

Eksempel på bruk av tjenesten kan finnes her:
[https://github.com/difi/idporten-authlevel-example](https://github.com/difi/idporten-authlevel-example)

## Informasjon om miljøer

Tjenesten er tilgjengelig i VER2, YT2 og produksjonsmiljøet til ID-porten
