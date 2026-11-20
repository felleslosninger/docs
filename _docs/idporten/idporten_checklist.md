---
title: Sjekkliste for ID-porten Integrasjon
description: Krav og anbefalinger for integrasjon mot ID-porten

sidebar: oidc
product: ID-porten
---

# Sjekkliste for ID-porten Integrasjon

Kortfattet sjekkliste for integrasjon mot ID-porten. For detaljer, se [integrasjonsguiden](oidc_guide_idporten) og [overordnet arkitekturbeskrivelse](idporten_overordnet).

> 🔒 = sikkerheitsrelatert punkt. **Krav** = må oppfyllast. **Anbefalt** = bør oppfyllast.

## Før oppstart

- [ ] Akseptere [bruksvilkår for ID-porten](https://samarbeid.digdir.no/id-porten/ta-i-bruk-id-porten/94)
- [ ] [Registrere integrasjon](oidc_func_clientreg) i selvbetjening på Samarbeidsportalen
- [ ] [Sende inn logo](idporten_logo) (png/jpg/gif, maks 90x135px, bakgrunn #f3f4f4 eller transparent)

## Autentiseringsforespørsel

- [ ] 🔒 **Krav:** Bruke [PKCE](oidc_func_pkce) med `code_challenge_method=S256` — beskyttar mot autorisasjonskode-avlytting
- [ ] Inkludere påkrevde parametere: `client_id`, `redirect_uri`, `scope` (min. `openid`), `response_type=code`
- [ ] 🔒 **Krav:** Velge riktig [sikkerhetsnivå](oidc_protocol_authorize) (`idporten-loa-substantial` eller `idporten-loa-high`) basert på risikovurdering
- [ ] 🔒 **Krav:** Bruke `state` (CSRF-beskyttelse) og `nonce` (replay-beskyttelse)
- [ ] 🔒 **Anbefalt:** Vurdere [PAR](oidc_protocol_par) for tjenester med høge sikkerheitskrav — beskyttar parametere mot manipulasjon i nettlesar

## Token-håndtering

- [ ] 🔒 **Krav:** Implementere [klientautentisering](oidc_protocol_token) (`client_secret_basic`, `client_secret_post`, eller `private_key_jwt`)
- [ ] 🔒 **Krav:** Sende `code_verifier` i token-forespørselen — fullfører PKCE-flyten
- [ ] 🔒 **Krav:** [Validere ID-token](oidc_protocol_id_token): signatur, `iss`, `aud`, `exp`, `iat`, `nonce`, og at `acr` matcher forespurt nivå — mangelfull validering er ein vanleg sikkerheitsfeil
- [ ] Respektere token-levetider og bruke refresh_token for fornyelse

## Sesjonshåndtering

- [ ] 🔒 **Krav:** **Implementere [Single Logout (SLO)](oidc_func_sso)** — kritisk for alle som bruker SSO. Feilkonfigurert logout hos éin kunde kan øydelegge for andre.
  - Scenario 1: Bruker logger ut hos deg → redirect til /endsession
  - Scenario 2: Bruker logger ut annet sted → håndter `front_channel_logout` basert på `sid`
- [ ] 🔒 **Krav:** Sette lokal sesjon til maks 30 minutter inaktivitet
- [ ] 🔒 **Krav:** Sende bruker til ID-porten med ny autentiseringsforespørsel ved lokal timeout
- [ ] 🔒 **Anbefalt:** Bruk `prompt=login` for [tvungen re-autentisering](oidc_guide_idporten#tvungen-re-autentisering) ved sikkerheitskritiske operasjonar
- [ ] 🔒 **Anbefalt:** Vurder [isolert SSO-sesjon](oidc_func_nosso) for tenester som ikkje skal dele sesjon

## Sikkerhet og nøkkelhåndtering

- [ ] 🔒 **Krav:** Etabler sikker nøkkelhåndtering — beskytt private nøklar (client_secret, asymmetriske nøklar, virksomheitssertifikat). Definer prosedyrar for oppbevaring, backup, tilgangsstyring, fornyelse og kompromitteringshåndtering
- [ ] 🔒 **Krav:** Gjennomfør risikovurdering — bruk til å velje sikkerheitsnivå og autentiseringsmetode
- [ ] 🔒 **Krav:** Åpne utgåande brannmur for [ID-portens IP-adresser](../../general/IP) (om aktuelt)
- [ ] 🔒 **Anbefalt:** Bruk HSM for nøkkeloppbevaring
- [ ] 🔒 **Anbefalt:** Bruk [virksomhetssertifikat](idporten_overordnet#bruk-av-virksomhetssertifikat) for klientautentisering og automatisert nøkkelrotasjon

## Logging

- [ ] 🔒 **Krav:** Logg autentiseringsforsøk: tidspunkt, handling, resultat, IP-adresse, `sid`
- [ ] 🔒 **Krav:** Vurder personvern i logging (fødselsnummer vs. behov)
- [ ] 🔒 **Anbefalt:** Følg [anbefalingar for sertifikatbehandling, logging og sporing](https://www.digdir.no/datadeling/sertifikatbehandling-logging-og-sporing/2438)

## Testing

- [ ] Utfør [verifikasjonstester](idporten_verifikasjonstester) med [testbrukere](idporten_testbrukere)
- [ ] Test i testmiljø (tillater redirect til localhost)

## Spesielle bruksområder

- [ ] **Mobilapper**: Følg [integrasjonsguide for app](oidc_auth_app)
- [ ] **SPA/JavaScript**: Følg [integrasjonsguide for SPA](oidc_auth_spa)
- [ ] **API-sikring**: Implementer [brukerstyrt datadeling](oidc_auth_oauth2) korrekt
- [ ] **Fullmakt**: Implementer [innlogging på vegne av andre](oidc_auth_fullmakt)

## Tilleggsfunksjonalitet (valgfritt)

- [ ] Hente brukerinfo via `profile`-scope fra [userinfo-endepunktet](oidc_protocol_userinfo)
- [ ] Hente kontaktopplysninger fra [KRR](../../Kontaktregisteret/Brukerspesifikt-oppslag_rest) via `krr:user/kontaktinformasjon.read`
- [ ] Vurdere støtte for [utenlandske brukere (eIDAS)](oidc_func_eidas)

## Ved problemer

Kontakt servicedesk@digdir.no — oppgi client_id, miljø og beskrivelse.

## Ressurser

- [Integrasjonsguide for ID-porten](oidc_guide_idporten)
- [Overordnet arkitekturbeskrivelse](idporten_overordnet)
- [Samarbeidsportalen](https://samarbeid.digdir.no/id-porten/id-porten/18)
- [Integrasjonsguide - Autentisering med OpenID Connect](oidc_guide_idporten)
- [Overordnet arkitekturbeskrivelse](idporten_overordnet)
- [Klientregistrering](oidc_func_clientreg)
- [PKCE - Proof Key for Code Exchange](oidc_func_pkce)
- [PAR - Pushed Authorization Request](oidc_protocol_par)
- [ID-token dokumentasjon](oidc_protocol_id_token)
- [Access-token dokumentasjon](oidc_protocol_access_token)
- [Token-endepunkt](oidc_protocol_token)
- [Autorisasjonsendepunkt](oidc_protocol_authorize)
- [Single Sign-On og utlogging](oidc_func_sso)
- [Backchannel logout](oidc_func_backchannel_logout)
- [Verifikasjonstester](idporten_verifikasjonstester)
- [Testbrukere](idporten_testbrukere)
- [OpenID Connect Core 1.0 spesifikasjon](https://openid.net/specs/openid-connect-core-1_0.html)
- [RFC 7636 - PKCE](https://tools.ietf.org/html/rfc7636)
- [Veileder for virksomhetsautentisering](https://www.digdir.no/datadeling/sertifikatbehandling-logging-og-sporing/2438)
- [Veileder for identifikasjon og sporbarhet](https://www.digdir.no/digital-samhandling/veileder-identifikasjon-og-sporbarhet-i-elektronisk-kommunikasjon-med-og-i-offentlig-sektor/2992)
