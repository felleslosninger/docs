---
title: 20-06 Maskinporten
description: 20-06 Maskinporten
permalink: 20-06_Maskinporten.html
sidebar: oidc
---


Vedlikeholdsrelease for Maskinporten



Releasen vart produksjonssatt Jun 23, 2020

## Forbetringar:

#### fjerne client_orgno frå maskinporten-tokens (PBLEID-20254)

Ved ein glipp så blei claimet "client_orgno" inkluderte i access_token i første versjon av  Maskinporten.  Det er på nasjonalt arkitekturnivå beslutta at det er claimet "consumer" som skal brukes av API-tilbyder for å finne kven som er den juridiske konsumenten av eit API (sjå: https://difi.github.io/felleslosninger/19-09_OIDC.html#tokenformat-for-eoppslag).

Dessverre er det fleire aktører som bruker dette claimet sjølv om dokumentasjon seier at det ikkje finst. 
"client_orgno" fjernes difor frå Maskinporten for å sikre korrekt bruk.




## Feilrettingar:

#### Respons frå token-endepunktet i maskinporten bruker autorisasjonslevetida for å sette expires_in feltet (PBLEID-20596)

Maskinporten skal bruke levetida på access_tokenet, og ikkje autorisasjonslevetida for klienten, for å sette expires_in - feltet på responsen frå token-endepunktet