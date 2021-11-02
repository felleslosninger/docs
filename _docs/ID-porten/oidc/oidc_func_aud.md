---
title: Audience-begrensning
description: Audience-begrensing
summary: "Audience-begrensning av token motvirker at tokens kan misbrukes mot andre APIer enn de som er tiltenkt."
permalink: oidc_func_aud.html
sidebar: oidc
product: ID-porten
---

Audience-begrensning er aktuelt der flere APIer er sikret av samme `scope`.  Ved å låse tokenet til et spesifikt audience (feks https://api.a.no/ ), så kan ikke tokenet brukes mot andre API (https://api.b.no), gitt at de aktuelle APIene utfører nødvendig validering.

Funksjonaliteten er basert på [RFC 8707 Resource Indicators for Oauth2](https://tools.ietf.org/html/rfc8707).

## Virkemåte

ID-porten og Maskinporten tilbyr en rudimentær støtte for å audience-begrense access-token:  Det er klientens ansvar be om et audience-begrensa token, og klient og API-tilbyder må avtale bilateralt seg imellom hvilke verdier som skal brukes.  

Klienten forespør et audience-begrensa token ved å oppgi en verdi i claimet `resource` i forespørsel.  ID-porten/Maskinporten vil da sette denne verdien som `aud` i det resulterende access_tokenet.

Dersom ingen `resource` blir forespurt, vil access_token ikke innholde `aud`.

API-tilbydere som forventer audience-begrensa tokens, bør forkaste tokens som mangler en `aud`-verdi.

ID-porten/Maskinporten utfører ingen validering på verdien/verdiene som forespørres ut over at de må være gyldige URIer.



## Forhold til id_token

`aud` i id_tokenet har ingen relasjon til `aud` i access_token.  Her opplever vi ofte misforståeler.

* `aud` i id_tokenet er alltid satt til client_i, ihht OIDC spec'en.
* `aud` i access_token er kun tilstede dersom audienc-begrensning er aktivt brukt, og vil normalt ha verdi lik URL til ressurs-serveren.   
