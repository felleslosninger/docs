---
title: Digdir sin utsteder
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_digdir_utsteder
---

Digdir tilbyr ein enkel utsteder i sandkassen.  

Den er laga både for å utstede PID-dokumentet, men har ein modulær arktiktur slik at den skal vere lett å integere mot andre datakjelder for å utstede bevis på deira vegne.

## Brukargrensesnitt:

Utstedaren vil på sikt tilby eit web-grensesnitt der sluttbrukar kan logge inn og få utstedt bevis til seg sjølv.

Inntil dette er klart, so har me ein [teknisk retta demo-klient](https://demo-ui-utsteder.test.eidas2sandkasse.net/) der du kan pushe inn json og få eit bevis tilbake.

## Funksjonalitet
Me ynskjer at utstedaren skal følge Fina-versjonen av OpenID4VCI.  Dog testar me primært mot  EU sin demolommebok, og denne ligg litt "bakpå", so det kan vere at noko av vår protokoll-støtte enno er for gamal.

Features som er støtta no:
- ISO mdoc bevis-format
- pre-authorization code flow med push av bevis-data

Framtidig funksjonalitet:
- SD-JWT bevis-format
- code flow
- rammeverk for pull-basert henting av bevis-data
- rammeverk for generering av bevis-data basert på token-innhold
- Web-grensesnitt for sluttbrukar
- Autentisering og autorisasjon av lommebøker basert på WUA
- verifisering mot [OpenID conformance test suites](https://openid.net/certification/conformance-testing-for-openid-for-verifiable-credential-issuance/)


## Bruksmønster 1: pre-authorization code flow med push 

I dette bruksmønsteret so er det datakjelda so styrer prosessen:
- sluttbrukar er innlogga på ei nett-teneste hjå datakjelda og ynskjer få eit bevis. 
- Datakjelda klargjer bevis-innhalde og sender til utstedar
- Responsen er eit Credential Offer som datakjelda rendrar som ein QR-kode
- Brukaren scanner QR-koden med lommeboka si og får beviset utlevert

Flyten ser slik ut:

<div class="mermaid">
sequenceDiagram

  actor b as Brukar
  participant l as Lommebok
  participant t as Teneste
  participant u as Utstedar

  note over b,t: loggar inn på teneste og startar bevis-utstedelse

  t->>+u: /start-issuance-transaction(bevis-type, {bevis-innhald})
  u-->>-t: Credential Offer m/ pre-auth code
  t-->>t: rendre QR 

  note over b,t: scann QR med lommebok
  l->>+u: /token (pre-auth.code)
  u-->>-l: access_token

  l->>+u: Credential Request (access_token)
  u-->>-l: utstedt bevis

</div>

I praksis treng du som data-kjelde berre sende eitt enkelt backend-kall til utstedar sitt [/start_issuance-endepunkt](https://utsteder.test.eidas2sandkasse.net/swagger-ui/index.html#/eudiw-issuer-api-v1/startIssuanceEndpoint) for å setje igang flyten.

Dette endepunktet er sikra med access-token frå anten Maskinporten eller ID-porten alt etter bevis-type. Det er også ulike scopes for ulike bevis-typar, desse finn du i [credential metadata](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer). 

Sidan utstedaren i dette bruksmønsteret ikkje har noko browser-interaksjon med sluttbrukar, betyr det at utstedar stoler fullt og heilt på at datakjelda tek ansvar for at sluttbrukaren er innlogga hjå dei, og at sluttbrukar er informert om og har til hensikt å utstede bevis av aktuell type. 

Ta kontakt med oss for å avtale at me legger til støtte for nye bevis-typar.


## Metadata

Du bør finne alt som trengs for å kunne samhandle med utstederen via credential metadata-endepunktet:
[https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer)

