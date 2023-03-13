---
title: Server-to-server API-autorisasjon med Oauth2
description: Server-to-server API-autorisasjon med Oauth2
summary: 'ID-porten sin OpenID Connect Provider kan også brukes til å autorisere tilgang til API-er uten en bruker-kontekst, såkalt  "server-to-server oauth2" (eller two-legged oauth2)'

sidebar: oidc
product: ID-porten
redirect_from: /oidc_auth_server-to-server-oauth2
---

## Introduksjon

ID-porten tilbyr ikke lenger støtte for "Maskinporten-i-ID-porten".

Ved innføring av ID-portens OIDC-grensenitt i 2017 var Maskinporten en egenskap ved ID-porten.  Senere, i 2019, ble Maskinporten etablert som egen oauth2 issuer.

Kunder som fremdeles bruker JWT-grants mot den gamle ID-porten må gå over til å benytte Maskinporten.
