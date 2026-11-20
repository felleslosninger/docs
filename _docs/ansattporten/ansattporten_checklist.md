---
title: Sjekkliste for Ansattporten Integrasjon
description: Krav og anbefalinger for integrasjon mot Ansattporten

sidebar: ansattporten
product: Ansattporten
---

# Sjekkliste for Ansattporten Integrasjon

Kortfattet sjekkliste for integrasjon mot Ansattporten. For detaljer, se [Hva er Ansattporten?](ansattporten_om) og [integrasjonsguiden](ansattporten_guide).

> 🔒 = sikkerheitsrelatert punkt. **Krav** = må oppfyllast. **Anbefalt** = bør oppfyllast.

## Før oppstart

- [ ] Akseptere Digdir sine [bruksvilkår](https://samarbeid.digdir.no) for fellesløsninger
- [ ] [Registrere integrasjon](ansattporten_om#hvordan-administrerer-jeg-ansattporten-) med `integration_type` satt til **`ansattporten`** (ikke `idporten`)
- [ ] Velge [bruksscenario](ansattporten_om#hvilken-bruk-scenario-støttes-): vanlig innlogging, på vegne av virksomhet, eller datadeling

## Autentisering og token

- [ ] 🔒 **Krav:** Bruke [PKCE](../../idporten/oidc/oidc_func_pkce) med `code_challenge_method=S256` — beskyttar mot autorisasjonskode-avlytting
- [ ] Inkludere påkrevde parametere: `client_id`, `redirect_uri`, `scope` (min. `openid`), `response_type=code`
- [ ] 🔒 **Krav:** Bruke `state` og `nonce` for CSRF- og replay-beskyttelse
- [ ] 🔒 **Krav:** Validere at `iss` i ID-token stemmer med **Ansattporten** (ikke ID-porten) — feil issuer kan bety at tokenet ikkje er til deg
- [ ] 🔒 **Anbefalt:** Bruke [well-known endepunkt](ansattporten_wellknown) for dynamisk konfigurasjon og JWK-henting — sikrar kontinuerleg drift ved sertifikatbytte

## Representasjon og organisasjonsvelger (valgfritt)

Ansattporten støttar to [autorative kjelder](ansattporten_om#autorative-kilder-for-representasjon) for representasjon. Vel den som passar ditt bruksscenario:

### Via Altinn Autorisasjon (RAR-type `ansattporten:altinn:resource`)

- [ ] Krever at du er [tjenesteeier i Altinn](ansattporten_om#hvem-kan-bruke-ansattporten-)
- [ ] Brukar personleg eID (BankID o.l.) — gjev sikkerheitsnivå `substantial` eller `high`
- [ ] Tilgang styrast per Altinn-ressurs med handlingar (`read`, `write` osv.) via roller, tilgangspakkar eller direkte delegering
- [ ] Oppgje `resource` (Altinn-ressurs URN) i RAR-forespørselen

### Via Virksomhetsbroen (RAR-type `ansattporten:orgno`)

- [ ] Brukar jobbkonto (Microsoft Entra ID) — gjev sikkerheitsnivå `entraid` (lågare tryggleik enn personleg eID)
- [ ] Arbeidsgjevar styrer tilgang via filterreglar basert på e-postadresse, domene eller Entra ID-gruppe
- [ ] Krev at nokon med Altinn-rolla "Administrere organisasjonstilknytning i Ansattporten" set opp reglane
- [ ] 🔒 **Merk:** Lågare sikkerheitsnivå enn Altinn — eignar seg når høg identitetstryggleik ikkje er påkrevd
- [ ] **Merk:** Framleis i pilot — kontakt Digdir for status

### Felles for begge

- [ ] Følg [guide for representasjon](ansattporten_representasjon) — bruker RAR (`authorization_details`)
- [ ] 🔒 Forstå at Ansattporten kun formidlar representasjon — **den utfører ikkje tilgangskontroll** for tenesta di. Tenesta må sjølv avgjere om brukaren har tilgang

## Sesjonshåndtering

- [ ] Forstå at det **ikke er SSO** mellom tjenester i Ansattporten — [isolert sesjon](ansattporten_om#ingen-sso-funksjonalitet-mellom-tjenester) er tvangssatt
- [ ] Implementere utlogging via /endsession-endepunktet
- [ ] Sette lokal sesjon til maks 30 minutter inaktivitet (maks 120 min total)

## Sikkerhet og nøkkelhåndtering

- [ ] 🔒 **Krav:** Etabler sikker nøkkelhåndtering — beskytt private nøklar (client_secret, asymmetriske nøklar, virksomheitssertifikat). Definer prosedyrar for oppbevaring, backup, tilgangsstyring, fornyelse og kompromitteringshåndtering
- [ ] 🔒 **Krav:** Gjennomfør risikovurdering av eigen løysing
- [ ] 🔒 **Krav:** Åpne utgåande brannmur for [Ansattporten sine IP-adresser](../../general/IP) (om aktuelt)
- [ ] 🔒 **Anbefalt:** Bruk HSM for nøkkeloppbevaring og automatisert nøkkelrotasjon

## Logging og testing

- [ ] 🔒 **Krav:** Logg autentiseringsforsøk: tidspunkt, handling, resultat, IP-adresse, `sid`, valgt organisasjon
- [ ] 🔒 **Krav:** Vurder personvern i logging
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
