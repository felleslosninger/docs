---
title: PKCE
description: ID-portens funksjonalitet for PKCE - Proof Key  for Code Exchange
summary: "PKCE er en standard som beskytter mot stjeling av autorisasjonkoden, typisk ved bruk av mobil-app'er."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_pkce
---

## Om funksjonaliteten

PKCE - Proof Key  for Code Exchange - (uttales "pixy") er en metode som beskytter public klienter som benytter autorisasjonskodeflyten (typisk mobil-app'er) mot stjeling av autorisasjonskoden.

PKCE er definert i [RFC7636](https://tools.ietf.org/html/rfc7636), og vi henviser til denne for detaljert dokumentasjon av funksjonaliten.

Metoden er basert på  følgende steg:

1. klienten genererer en hemmelighet `code_verifier` ved hver innlogging.  
2. I /authorize-kallet sendes en hash'et versjon `code_challenge` av hemmeligheten som en del av forespørselen
3. I /token-kallet må `code_verifier` sendes med. En eventuell angriper som har snappet opp autorisasjonskoden, kjenner ikke hemmeligheten, og vil derfor ikke få utlevert tokens.

Vi støtter bare `code_challenge_method=S256`

Alle klienter i ID-porten kan og bør bruke PKCE, men det er påkrevd for browser- og native klienter.

**Merk at code_verifier må vere minst 43 karakterer lang, og ikkje lengre enn 128.**

Dersom `code_verifier` er `xyo94uhy3zKvgB0NJwLms86SwcjtWviEOpkBnGgaLlo` så blir utrekna `code_challenge` lik `b7elB7ZyxIXgFyvBznKvxl7wOB-H17Pz0a3B62NIMFI=`.

[Her er et verktøy for å rekne ut challenges:](https://gist.github.com/tonyxu-io/21eb57ab2a4aeb2a3ee10f77542abe64)
