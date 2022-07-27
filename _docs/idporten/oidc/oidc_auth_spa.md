---
title: Autentisering til SPA'er
description: Bruk av Idporten sin OpenID Connect provider til autentisering til Single Page Applikasjoner
summary: "Ved innlogging til en SPA, er det anbefalt å bruke code flow med PKCE og state"

sidebar: oidc
product: ID-porten
redirect_from: /oidc_auth_spa
---

## Overordna beskrivelse av bruksområdet

Single-page applikasjoner (SPA) har økende popularitet. Disse skiller seg fra tradisjonelle nettjenester ved at SPAen er realisert som en ren javascript-applikasjon i brukers browser, kontra tradisjonelle nett-tjenester der en sentral applikasjonserver generer HTML som blir vist i browseren.

En utfordring med SPAer er at de ikke klarer å beskytte klient-hemmeligheten (evt. virksomhetssertifikatets privatnøkkel) siden hele klienten lever i brukers nettleser. SPAer er altså det som i Oauth2-verdenen kalles **public klienter**. For slike klienter var det tidligere anbefalt å bruke implicit flow, men **de nyeste anbefalingen går på å bruke code flow sammen med PKCE og state**.

**Merk også at den ofte brukte metoden for "silent renewal" ikke støttes av ID-porten.**  Denne metoden er også på vei "ut", da de store browser-aktørene er i ferd med å sperre tilgang til 3djparts-cookies som ødelegger for silent renewal.


## Anbefalinger / krav til bruk av SPAer

Trusselbildet er forskjellig ved bruk av SPA  kontra tjenester som bruker ordinær autorisasjonskodeflyt. Siden access_token blir eksponert ut i brukers browser, er det økt risiko for at token lettere kan komme på avveie eller byttes ut/manipuleres.

Tjenesteeiere må:

 * Vurdere en backend-for-frontend (BFF) arkitektur, dvs. etablere en tynn API-gateway-komponent som opererer som oauth2-klient og omsetter ID-portens id_token til egen sesjon (egne cookies) mellom BFF og SPA. Dette er det anbefalte arkitekturmønsteret ved bruk av ID-porten.

 * Dersom man heller velger at SPAens backend-APIer blir sikret av ID-portens access_token direkte, må kunden opprette et egen oauth2-scope for formålet og ikke bare bruke `openid profile` (ellers så kan alle gyldige ID-porten-innlogginger til alle andre tjenester også brukes mot ditt API)

 * Man bør bruke kortlevede access_token, og relativt kort_levede refresh-tokens


Forøvrig anbefaler vi å lese [de siste anbefalingene fra IETF](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-07) og følge anbefalingene i denne.  Dette bør være del av egen risikovurdering av de dataene som blir eksport av APIet og vurdere om de sikringsmekanismer som ovennevte tilbyr gir tilstrekkelig beskyttelse.

## Oppsett i selvbetjening

SPA-er som bruker ID-portens access_tokens som sikringsmekanisme mot eget API, må opprettast som `integration_type=API_KLIENT` i Sjølvbetjeningsløsninga.  Då får ein mogelegheit til å sjølv styre levetid på autorisasjon, access_token og refresh_token.

Fram til release 21-06 må klienten opprettast som `application-type=web` (og client_secret må anses som kjent) dersom den skal få refresh_token.


## Flyt

I praksis er flyten den samme som [ordinær autorisasjonskodeflyt]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_codeflow), men der:

- Klienten må registreres med klient-autentiseringsmetode `none`  i ID-porten (se [klientregistrering]({{site.baseurl}}/docs/idporten/oidc/oidc_func_clientreg)) (dersom ikke BFF-mønster)
- Bruk av [PKCE]({{site.baseurl}}/docs/idporten/oidc/oidc_func_pkce) er påkrevd
- Bruk av `state`-claimet i autorisasjonsforespørsel er påkrevd

## Example

Sjå [eksempel med React-klient]({{site.baseurl}}/docs/idporten/oidc/oidc_sample_react)
