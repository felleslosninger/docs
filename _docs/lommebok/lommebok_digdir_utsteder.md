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
- Autentisering og autorisasjon av lommebøker basert på WUA
- verifisering mot [OpenID conformance test suites](https://openid.net/certification/conformance-testing-for-openid-for-verifiable-credential-issuance/)


## Bruksmønster 1: pre-authorization code flow med push 


<div class="mermaid">

sequenceDiagram

  actor b as Brukar
  participant l as Lommebok
  participant u as Utstedar
  participant a as Autorisasjonsserver

  b-->>u: går til webside
  note over b, a: Autentisering
  b-->>u: Velger bevis
  
  activate u
  u-->>+u: klargjere bevis

  u->>l: Credential Offer 
  l->>+a: /token (pre-auth.code)
  a-->>-l: access_token

  l->>+u: Credential Request (access_token, proofs)
  u-->>-l: utstedt bevis
  deactivate u

</div>


## Metadata

Du bør finne alt som trengs for å kunne samhandle med utstederen via credential metadata-endepunktet:
[https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer)

