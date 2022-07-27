---
title: ID-porten for innlogging til SPA
description: 
summary: 

sidebar: idporten_sidebar
product: ID-porten
redirect_from: /idporten_bruksomrade_spa
---

## Overordna beskrivelse av bruksområdet

Single-page applikasjoner (SPA) har økende popularitet. Disse skiller seg fra tradisjonelle nettjenester ved at SPAen er realisert som en ren javascript-applikasjon i brukers browser, kontra tradisjonelle nettjtenester der en sentral applikasjonserver generer HTML som blir vist i browseren.

En utfordring med SPAer er at de ikke klarer å beskytte klient-hemmeligheten (evt. virksomhetssertifikatets privatnøkkel) siden hele klienten lever i brukers nettleser. SPAer er altså det som i Oauth2-verdenen kalles **public klienter**. For slike klienter var det tidligere anbefalt å bruke _implicit flow_, men **de nyeste anbefalingen går på å bruke code flow sammen med PKCE og state**.


## Anbefalinger / krav til bruk av SPAer

Trusselbildet er forskjellig ved bruk av SPA  kontra tjenester som bruker ordinær autorisasjonskodeflyt.  Siden access_token blir eksporert ut i brukers browser, er det øka risiko for at token lettere kan komme på avveie eller byttes ut/manipuleres.

Tjenesteeiere må:
 * Lese [de siste anbefalingene fra IETF](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-00) og følge anbefalingene i denne
 * Gjennomføre en risikovurdering av de dataene som blir eksport av APIet og vurdere om de sikringsmekanismer som ovennevte tilbyr,gir tilstrekkelig beskyttelse.

## Flyt

I praksis er flyten den samme som [ordinær autorisasjonskodeflyt]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_codeflow), men der:

- Klienten må registreres som "public" klient i ID-porten (se [klientregistrering]({{site.baseurl}}/docs/idporten/oidc/oidc_func_clientreg))
- Det registreres ingen client-secret
- Bruk av [PKCE]({{site.baseurl}}/docs/idporten/oidc/oidc_func_pkce) er påkrevd
- Bruk av `state`-claimet i autorisasjonsforespørsel er påkrevd

## Example

Sjå [eksempel med React-klient]({{site.baseurl}}/docs/idporten/oidc/oidc_sample_react)
