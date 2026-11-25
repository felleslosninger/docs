---
title: Sjekkliste for ID-porten Integrasjon
description: Krav og anbefalinger for integrasjon mot ID-porten

sidebar: oidc
product: ID-porten
---

# Sjekkliste for ID-porten Integrasjon

Kortfattet sjekkliste for integrasjon mot ID-porten. For detaljer, se [integrasjonsguiden]({{site.baseurl}}/docs/idporten/oidc/oidc_guide_idporten.html) og [overordnet arkitekturbeskrivelse]({{site.baseurl}}/docs/idporten/idporten/idporten_overordnet.html).

> 🔒 = sikkerheitsrelatert punkt. **Krav** = må oppfyllast. **Anbefalt** = bør oppfyllast.

## Før oppstart

- [ ] Akseptere [bruksvilkår for ID-porten](https://samarbeid.digdir.no/id-porten/ta-i-bruk-id-porten/94)
- [ ] [Registrere integrasjon]({{site.baseurl}}/docs/idporten/oidc/oidc_func_clientreg.html) i selvbetjening på Samarbeidsportalen
- [ ] Bruke ID-porten sin logo etter [retningslinjene]({{site.baseurl}}/docs/idporten/idporten/idporten_logo.html)

## Autentiseringsforespørsel

- [ ] 🔒 **Krav:** Bruke [PKCE]({{site.baseurl}}/docs/idporten/oidc/oidc_func_pkce.html) med `code_challenge_method=S256` — beskyttar mot autorisasjonskode-avlytting. Nedgradering av PKCE i sjølvbetening er mogleg, men frårådd
- [ ] Registrere `redirect_uris` — `localhost` er berre tillate i test (bruk `127.0.0.1`/`[::1]`), `post_logout_redirect_uris` og `frontchannel_logout_uri` med `frontchannel_logout_session_required` (gjev `sid` i id_token)
- [ ] Inkludere påkrevde parametere: `client_id`, `redirect_uri`, `scope` (min. `openid`), `response_type=code`
- [ ] 🔒 **Krav:** Velge riktig [sikkerheitsnivå]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_authorize.html) (`idporten-loa-substantial` eller `idporten-loa-high`) basert på risikovurdering
- [ ] 🔒 **Krav:** Bruke `state` (CSRF-beskyttelse) og `nonce` (replay-beskyttelse)
- [ ] 🔒 **Anbefalt:** Vurdere [PAR]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_par.html) for tjenester med høge sikkerheitskrav — beskyttar parametere mot manipulasjon i nettlesar

## Token-handtering

- [ ] 🔒 **Krav:** Implementere [klientautentisering]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_token.html) (`client_secret_basic`, `client_secret_post`, eller `private_key_jwt`)
- [ ] 🔒 **Krav:** Sende `code_verifier` i token-forespørselen — fullfører PKCE-flyten
- [ ] 🔒 **Krav:** [Validere ID-token]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_id_token.html): signatur, `iss`, `aud`, `exp`, `iat`, `nonce`, og at `acr` matcher forespurt nivå — mangelfull validering er ein vanleg sikkerheitsfeil
- [ ] Respektere token-levetider og bruke refresh_token for fornyelse

## Sesjonshandtering

- [ ] 🔒 **Krav:** **Implementere [Single Logout (SLO)]({{site.baseurl}}/docs/idporten/oidc/oidc_func_sso.html)** — kritisk for alle som bruker SSO. Feilkonfigurert logout hos éin kunde kan øydelegge for andre.
  - Scenario 1: Bruker logger ut hos deg → redirect til /endsession
  - Scenario 2: Bruker logger ut annet sted → handter `front_channel_logout` basert på `sid`, eller bruk [back-channel logout]({{site.baseurl}}/docs/idporten/oidc/oidc_func_backchannel_logout.html)
- [ ] 🔒 **Krav:** Sette lokal sesjon til maks 30 minutter inaktivitet
- [ ] 🔒 **Krav:** Sende brukar til ID-porten med ny autentiseringsforespørsel ved lokal timeout
- [ ] 🔒 **Anbefalt:** Bruk `prompt=login` for [tvungen re-autentisering]({{site.baseurl}}/docs/idporten/oidc/oidc_guide_idporten.html#tvungen-re-autentisering) ved sikkerheitskritiske operasjonar
- [ ] 🔒 **Anbefalt:** Vurder [isolert SSO-sesjon]({{site.baseurl}}/docs/idporten/oidc/oidc_func_nosso.html) for tenester som ikkje skal dele sesjon

## Tryggleik og nøkkelhandtering

- [ ] 🔒 **Krav:** Etabler sikker nøkkelhandtering — beskytt private nøklar (client_secret, asymmetriske nøklar, virksomheitssertifikat). Definer prosedyrar for oppbevaring, backup, tilgangsstyring, fornyelse og kompromitteringshandtering
- [ ] 🔒 **Krav:** Gjennomfør risikovurdering — bruk til å velje sikkerheitsnivå og autentiseringsmetode
- [ ] 🔒 **Krav:** Åpne utgåande brannmur for [ID-portens IP-adresser]({{site.baseurl}}/docs/general/IP.html) (om aktuelt)
- [ ] 🔒 **Anbefalt:** Bruk HSM for nøkkeloppbevaring
- [ ] 🔒 **Anbefalt:** Bruk [virksomhetssertifikat]({{site.baseurl}}/docs/idporten/idporten/idporten_overordnet.html#bruk-av-virksomhetssertifikat) for klientautentisering og automatisert nøkkelrotasjon

## Logging

- [ ] 🔒 **Krav:** Logg autentiseringsforsøk: tidspunkt, handling, resultat, IP-adresse, `sid`
- [ ] 🔒 **Krav:** Vurder personvern i logging (fødselsnummer vs. behov)
- [ ] 🔒 **Anbefalt:** Følg [anbefalingar for sertifikatbehandling, logging og sporing](https://www.digdir.no/datadeling/sertifikatbehandling-logging-og-sporing/2438)

## Testing

- [ ] Utfør [verifikasjonstester]({{site.baseurl}}/docs/idporten/idporten/idporten_verifikasjonstester.html) med [testbrukere]({{site.baseurl}}/docs/idporten/idporten/idporten_testbrukere.html)
- [ ] Test i testmiljø (tillater redirect til localhost)

## Spesielle bruksområder

- [ ] **Mobilapper**: Følg [integrasjonsguide for app]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_app.html)
- [ ] **SPA/JavaScript**: Følg [integrasjonsguide for SPA]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_spa.html)
- [ ] **API-sikring**: Implementer [brukerstyrt datadeling]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_oauth2.html) korrekt
- [ ] **Fullmakt**: Implementer [innlogging på vegne av andre]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_fullmakt.html)

## Tilleggsfunksjonalitet (valgfritt)

- [ ] Hente brukerinfo via `profile`-scope fra [userinfo-endepunktet]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_userinfo.html)
- [ ] Hente kontaktopplysninger fra [KRR]({{site.baseurl}}/docs/Kontaktregisteret/Brukerspesifikt-oppslag_rest.html) via `krr:user/kontaktinformasjon.read`
- [ ] Vurdere støtte for [utenlandske brukere (eIDAS)]({{site.baseurl}}/docs/idporten/oidc/oidc_func_eidas.html)

## Ved problemer

Kontakt servicedesk@digdir.no — oppgi client_id, miljø og beskrivelse.

## Ressurser

- [Integrasjonsguide for ID-porten]({{site.baseurl}}/docs/idporten/oidc/oidc_guide_idporten.html)
- [Overordnet arkitekturbeskrivelse]({{site.baseurl}}/docs/idporten/idporten/idporten_overordnet.html)
- [Samarbeidsportalen](https://samarbeid.digdir.no/id-porten/id-porten/18)
- [Klientregistrering]({{site.baseurl}}/docs/idporten/oidc/oidc_func_clientreg.html)
- [PKCE - Proof Key for Code Exchange]({{site.baseurl}}/docs/idporten/oidc/oidc_func_pkce.html)
- [PAR - Pushed Authorization Request]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_par.html)
- [ID-token dokumentasjon]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_id_token.html)
- [Access-token dokumentasjon]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_access_token.html)
- [Token-endepunkt]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_token.html)
- [Autorisasjonsendepunkt]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_authorize.html)
- [Single Sign-On og utlogging]({{site.baseurl}}/docs/idporten/oidc/oidc_func_sso.html)
- [Backchannel logout]({{site.baseurl}}/docs/idporten/oidc/oidc_func_backchannel_logout.html)
- [Verifikasjonstester]({{site.baseurl}}/docs/idporten/idporten/idporten_verifikasjonstester.html)
- [Testbrukere]({{site.baseurl}}/docs/idporten/idporten/idporten_testbrukere.html)
- [OpenID Connect Core 1.0 spesifikasjon](https://openid.net/specs/openid-connect-core-1_0.html)
- [RFC 7636 - PKCE](https://tools.ietf.org/html/rfc7636)
- [Veileder for virksomhetsautentisering](https://www.digdir.no/datadeling/sertifikatbehandling-logging-og-sporing/2438)
- [Veileder for identifikasjon og sporbarhet](https://www.digdir.no/digital-samhandling/veileder-identifikasjon-og-sporbarhet-i-elektronisk-kommunikasjon-med-og-i-offentlig-sektor/2992)
