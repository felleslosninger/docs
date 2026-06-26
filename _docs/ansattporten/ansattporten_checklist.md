---
title: Sjekkliste for Ansattporten Integrasjon
description: Krav og anbefalinger for integrasjon mot Ansattporten

sidebar: ansattporten
product: Ansattporten
---

# Sjekkliste for Ansattporten Integrasjon

Kortfattet sjekkliste for integrasjon mot Ansattporten. For detaljer, se [Hva er Ansattporten?](ansattporten_om) og [integrasjonsguiden](ansattporten_guide).

## Før oppstart

- [ ] Akseptere Digdir sine [bruksvilkår](https://samarbeid.digdir.no) for fellesløsninger
- [ ] [Registrere integrasjon](ansattporten_om#hvordan-administrerer-jeg-ansattporten-) med `integration_type` satt til **`ansattporten`** (ikke `idporten`)
- [ ] Velge [bruksscenario](ansattporten_om#hvilken-bruk-scenario-støttes-): vanlig innlogging, på vegne av virksomhet, eller datadeling

## Autentisering og token

- [ ] Bruke [PKCE](../../idporten/oidc/oidc_func_pkce) med `code_challenge_method=S256`
- [ ] Inkludere påkrevde parametere: `client_id`, `redirect_uri`, `scope` (min. `openid`), `response_type=code`
- [ ] Bruke `state` og `nonce` for CSRF- og replay-beskyttelse
- [ ] Validere at `iss` i ID-token stemmer med **Ansattporten** (ikke ID-porten)
- [ ] Bruke [well-known endepunkt](ansattporten_wellknown) for dynamisk konfigurasjon og JWK-henting

## Representasjon og organisasjonsvelger (valgfritt)

- [ ] Krever at du er [tjenesteeier i Altinn](ansattporten_om#hvem-kan-bruke-ansattporten-)
- [ ] Følg [guide for representasjon](ansattporten_representasjon) — bruker RAR (`authorization_details`)
- [ ] Forstå at Ansattporten kun formidler representasjon fra [autorative kilder](ansattporten_om#autorative-kilder-for-representasjon) — den utfører ikke tilgangskontroll

## Sesjonshåndtering

- [ ] Forstå at det **ikke er SSO** mellom tjenester i Ansattporten — [isolert sesjon](ansattporten_om#ingen-sso-funksjonalitet-mellom-tjenester) er tvangssatt
- [ ] Implementere utlogging via /endsession-endepunktet
- [ ] Sette lokal sesjon til maks 30 minutter inaktivitet (maks 120 min total)

## Sikkerhet og nøkkelhåndtering

- [ ] Etabler sikker nøkkelhåndtering: oppbevaring, backup, tilgangsstyring, fornyelse, kompromitteringshåndtering
- [ ] Gjennomfør risikovurdering av egen løsning
- [ ] Åpne utgående brannmur for [Ansattporten sine IP-adresser](../../general/IP) (om aktuelt)
- [ ] Vurder HSM for nøkkeloppbevaring og automatisert nøkkelrotasjon

## Logging og testing

- [ ] Logg autentiseringsforsøk: tidspunkt, handling, resultat, IP-adresse, `sid`, valgt organisasjon
- [ ] Vurder personvern i logging
- [ ] Test i riktig miljø — well-known: [test](https://test.ansattporten.no/.well-known/openid-configuration) / [prod](https://ansattporten.no/.well-known/openid-configuration)

## Kostnader

- [ ] Kjenn til at Ansattporten deler [200.000-innloggingskvoten](ansattporten_om#hva-koster-ansattporten-) med ID-porten

## Ved problemer

Kontakt servicedesk@digdir.no — oppgi client_id, miljø og beskrivelse.

## Ressurser

- [Hva er Ansattporten?](ansattporten_om)
- [Integrasjonsguide (vanlig innlogging)](ansattporten_guide)
- [Representasjon i Ansattporten](ansattporten_representasjon)
- [Well-known endepunkt](ansattporten_wellknown)
- [Samarbeidsportalen](https://samarbeid.digdir.no/ansattporten/ansattporten-er-no-i-produksjon-som-ei-fullverdig-fellesloysing/2969)
