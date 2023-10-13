---
title: Integrasjonstype og scopes
description: 
summary: 

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_scopes
---


## Tillatte integrasjonstyper
Du må registrere integrasjonstype til klienten din i selvbetjeningsløsningen. Hvilken integrasjonstype du velger, vil legge føringer på hvilke scopes du kan bruke med klienten. En klient kan kun ha en integrasjonstype.

I KRR-sammenheng er følgende integrasjonstyper aktuelle:

| Integrasjonstype |Beskrivelse|
|-|-|
|api_klient    | ID-porten integrasjoner som skal hente data fra et tredjparts-API på vegne av innlogget bruker. |
|krr   | Kontaktregisteret (server-til-server)   |


Ved Oppslagstjenesten REST må du velge “KRR” som “Difi-tjeneste”. Du vil da få automatisk tildelt de riktige scopene. Ved Oppslag ved brukerinnlogging må du velge “Api-klient” som “Difi-tjeneste”. 
Deretter må du manuelt sette de riktige scopene: krr:user/kontaktinformasjon.read, openid, profile

{% include note.html content="Det er ikke mulig å endre  integrasjonstype etter opprettelse." %}

## Liste over aktuelle scopes for KRR 

|Scope|Beskrivelse| Tillatte integrasjonstyper|
|-|-|-|
|openid   | Trigger en OpenID Connect autentisering  | idporten, api_klient |
|profile  | Gir tilgang til /userinfo endepunktet   |  idporten, api_klient|
|krr:global/*    | Scopes for global tilgang til krr|  krr,maskinporten |
|krr:user/*      | Scopes som gir krr data for innlogget bruker| api_klient|

Generelt må api-konsumenter spørre api-tilbyder (eier av scopet) om tilgang til å bruke deres scope. Les mer her om [hvordan du som kunde kan få tilgang](https://docs.digdir.no/docs/Kontaktregisteret/krr_opprette_tilgang) til scopene over. 

Lenke til [mer om scopes](https://docs.digdir.no/docs/idporten/oidc/oidc_protocol_scope.html).
