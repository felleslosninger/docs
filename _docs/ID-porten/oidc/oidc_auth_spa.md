---
title: Autentisering til SPA'er
description: Bruk av Idporten sin OpenID Connect provider til autentisering til Single  Page Applikasjoner
summary: "Ved innlogging til en SPA, er det anbefalt å bruke code flow med PKCE og state"
permalink: oidc_auth_spa.html
sidebar: oidc
product: ID-porten
---

## Overordna beskrivelse av bruksområdet

Single-page applikasjoner (SPA) har økende popularitet. Disse skiller seg fra tradisjonelle nettjenester ved at SPAen er realisert som en ren javascript-applikasjon i brukers browser, kontra tradisjonelle nettjtenester der en sentral applikasjonserver generer HTML som blir vist i browseren.

En utfordring med SPAer er at de ikke klarer å beskytte klient-hemmeligheten (evt. virksomhetssertifikatets privatnøkkel) siden hele klienten lever i brukers nettleser. SPAer er altså det som i Oauth2-verdenen kalles **public klienter**. For slike klienter var det tidligere anbefalt å bruke _implicit flow_, men **de nyeste anbefalingen går på å bruke code flow sammen med PKCE og state**.



## Anbefalinger / krav til bruk av SPAer

Trusselbildet er forskjellig ved bruk av SPA  kontra tjenester som bruker ordinær autorisasjonskodeflyt.  Siden access_token blir eksporert ut i brukers browser, er det øka risiko for at token lettere kan komme på avveie eller byttes ut/manipuleres.

Tjenesteeiere må:

 * Dersom SPA kun skal aksessere egne API (1st party API), bør man vurdere en backend-for-frontend (BFF) arkitektur, dvs. etablere en tynn API-gateway-komponent som operer som oauth2-klient og omsetter ID-portens id_token til egen sesjon (egne cookies) mellom BFF og SPA.

 * APIer som blir sikret av ID-portens access_token direkte, må bruke egne scopes og ikke bare `openid profile` (ellers så kan alle gyldige ID-porten-innlogginger til alle andre tjenester også brukes mot ditt API)

 * APIer som blir sikret av ID-portens access_token direkte bør bruke [audience-begrensa tokens](oidc_func_aud.html), der `aud`-verdien settes lik URL til API-endepunktet


Forøvrig anbefaler vi å lese [de siste anbefalingene fra IETF](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-00) og følge anbefalingene i denne.  Dette bør være del av egen isikovurdering av de dataene som blir eksport av APIet og vurdere om de sikringsmekanismer som ovennevte tilbyr gir tilstrekkelig beskyttelse.

## Flyt

I praksis er flyten den samme som [ordinær autorisasjonskodeflyt](oidc_auth_codeflow.html), men der:

- Klienten må registreres med klient-autentiseringsmetode `none`  i ID-porten (se [klientregistrering](oidc_func_clientreg.html)) (dersom ikke BFF-mønster)
- Bruk av [PKCE](oidc_func_pkce.html) er påkrevd
- Bruk av `state`-claimet i autorisasjonsforespørsel er påkrevd

## Example

Sjå [eksempel med React-klient](oidc_sample_react.html)
