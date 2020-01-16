---
title: PKCE
description: ID-portens funksjonalitet for PKCE - Proof Key  for Code Exchange
summary: "PKCE er en standard som beskytter mot stjeling av autorisasjonkoden, typisk ved bruk av mobil-app'er."
permalink: oidc_func_pkce.html
sidebar: oidc
product: ID-porten
---

## Om funksjonaliteten

PKCE - Proof Key  for Code Exchange - (utt. "pixy") er en metode som beskytter public klienter som benytter autorisasjonskodeflyten (typisk mobil-app'er) mot stjeling av autorisasjonskoden.

PKCE er definert i [RFC7636](https://tools.ietf.org/html/rfc7636), og vi henviser til denne for detaljert dokumentasjon av funksjonaliten.

Metoden er basert på at klienten genererer en hemmelighet `code_verifier` ved hver autentiseringsforespørsel og sender en hash'et versjon `t(code_verifier)` av denne som en del av forespørselen. Når autorisasjonskoden etterpå skal utveksles i tokens, må code_verifier sendes med. En eventuell angriper som har snappet opp autorisasjonskoden, kjenner ikke hemmeligheten, og vil derfor ikke får utlevert tokens.

**Merk at code_verifier må vere minst 43 karakterer lang, og ikkje lengre enn 128.**

Dersom `code_verier` er `xyo94uhy3zKvgB0NJwLms86SwcjtWviEOpkBnGgaLlo` så blir utrekna `code_challenge` lik `b7elB7ZyxIXgFyvBznKvxl7wOB-H17Pz0a3B62NIMFI=`.
