---
title: Sjekkliste for ID-porten Integrasjon
description: Krav og anbefalinger for integrasjon mot ID-porten

sidebar: oidc
product: ID-porten
---

# Sjekkliste for ID-porten Integrasjon

Denne sjekklisten gir en oversikt over krav og anbefalinger for integrasjon mot ID-porten.

## Før Oppstart

### Krav

- [ ] **Akseptere bruksvilkår**
  - Les og aksepter bruksvilkår for ID-porten
  - [Les mer: Hvordan få tilgang til ID-porten](https://samarbeid.digdir.no/id-porten/ta-i-bruk-id-porten/94)
  - [Les mer: Overordnet arkitekturbeskrivelse](idporten_overordnet#hvordan-få-tilgang-til-id-porten)

- [ ] **Registrere integrasjon i selvbetjening**
  - Bruk selvbetjeningsløsningen på Samarbeidsportalen til å registrere påkrevd informasjon om integrasjonen
  - [Les mer: Klientregistrering](oidc_func_clientreg)
  - [Les mer: Overordnet arkitekturbeskrivelse](idporten_overordnet#bruk-selvbetjening-til-å-registere-integrasjonen-din)

- [ ] **Sende inn logo**
  - Kunde må sende logo til ID-porten som brukes i innloggingsbildet
  - Filformat: .png, .jpg eller .gif
  - Maksimal høyde: 90 pixel
  - Bredde: ikke overskride 135 pixel
  - Bakgrunnsfarge: #f3f4f4 eller transparent bakgrunn
  - [Les mer: Logo](idporten_logo)
  - [Les mer: Overordnet arkitekturbeskrivelse](idporten_overordnet#send-oss-logoen-din)

## Autentiseringsforespørsel

### Krav

- [ ] **Bruke PKCE (Proof Key for Code Exchange)**
  - Alle klienter må som hovedregel bruke PKCE i autentiseringsforespørselen
  - `code_verifier` må være minst 43 karakterer lang, og ikke lengre enn 128 karakterer
  - Støtter kun `code_challenge_method=S256`
  - [Les mer: PKCE](oidc_func_pkce)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#1-autentiseringsforespørsel-til-autorisasjons-endepunktet)

- [ ] **Inkludere påkrevde parametere i autentiseringsforespørsel**
  - `client_id`: Din registrerte klient-ID
  - `redirect_uri`: Forhåndsregistrert redirect URI
  - `scope`: Minimum `openid`
  - `response_type`: `code` for autorisasjonskode-flyt
  - `code_challenge`: Hash'et versjon av code_verifier
  - `code_challenge_method`: `S256`
  - [Les mer: Autorisasjonsendepunktet](oidc_protocol_authorize)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#1-autentiseringsforespørsel-til-autorisasjons-endepunktet)

- [ ] **Forespørre korrekt sikkerhetsnivå (acr_values)**
  - Spesifiser korrekt sikkerhetsnivå basert på risikovurdering
  - Gyldige verdier: `idporten-loa-substantial`, `idporten-loa-high`
  - [Les mer: Veileder for valg av sikkerhetsnivå](https://www.digdir.no/digital-samhandling/veileder-identifikasjon-og-sporbarhet-i-elektronisk-kommunikasjon-med-og-i-offentlig-sektor/2992#veiledning_for_valg_av_sikkerhetsniv_for_identifikasjon)
  - [Les mer: Autorisasjonsendepunktet](oidc_protocol_authorize)

### Anbefalinger

- [ ] **Bruke state-parameter**
  - Inkluder `state` i autentiseringsforespørselen for å beskytte mot CSRF-angrep
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#1-autentiseringsforespørsel-til-autorisasjons-endepunktet)

- [ ] **Bruke nonce-parameter**
  - Inkluder `nonce` i autentiseringsforespørselen for ekstra beskyttelse mot replay-angrep
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#1-autentiseringsforespørsel-til-autorisasjons-endepunktet)

- [ ] **Vurdere PAR (Pushed Authorization Request)**
  - For tjenester med høye krav til sikkerhet bør du bruke PAR til å POSTe autentiseringsparametrene direkte til ID-porten
  - Dette beskytter parametrene mot manipulasjon i brukers browser
  - [Les mer: PAR](oidc_protocol_par)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#1-autentiseringsforespørsel-til-autorisasjons-endepunktet)

- [ ] **Sette ui_locales for språkvalg**
  - Spesifiser ønsket språk for innloggingsgrensesnittet (nb, nn, en, se)
  - [Les mer: Autorisasjonsendepunktet](oidc_protocol_authorize)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#2-bruker-autentiserer-seg)

## Token-håndtering

### Krav

- [ ] **Implementere korrekt klientautentisering**
  - Velg én av støttede metoder:
    - `client_secret_basic` / `client_secret_post` - basert på client_secret
    - `private_key_jwt` - basert på JWT'er signert med virksomhetssertifikat (anbefalt for høy sikkerhet)
  - [Les mer: Token-endepunktet](oidc_protocol_token)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#4-utstedelse-av-token-fra-token-endepunktet)

- [ ] **Sende code_verifier i token-forespørsel**
  - Inkluder den originale `code_verifier` i token-forespørselen for å fullføre PKCE-flyten
  - [Les mer: PKCE](oidc_func_pkce)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#4-utstedelse-av-token-fra-token-endepunktet)

- [ ] **Validere ID-token korrekt**
  - Følg kapittel 3.1.3.7 i OpenID Connect Core 1.0 spesifikasjonen
  - Kritisk: Validere at faktisk brukt sikkerhetsnivå `acr` matcher forespurt nivå
  - Validere `iss`, `aud`, `exp`, `iat`, `nonce` (hvis brukt)
  - Verifiser signatur
  - [Les mer: OpenID Connect ID Token Validation](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation)
  - [Les mer: ID-token](oidc_protocol_id_token)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#id_token)

- [ ] **Respektere token-levetider**
  - ID-token: Kort levetid, brukes til å opprette lokal sesjon
  - Access-token: Typisk 120 sekunder
  - Refresh-token: Brukes til å fornye access-token uten brukerinteraksjon
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#access_token)

### Anbefalinger

- [ ] **Bruke virksomhetssertifikat for klientautentisering**
  - Anbefalt metode for klienter med høye krav til sikkerhet
  - [Les mer: Bruk av virksomhetssertifikat](idporten_overordnet#bruk-av-virksomhetssertifikat)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#4-utstedelse-av-token-fra-token-endepunktet)

## Sesjonshåndtering

### Krav

- [ ] **Implementere støtte for Single Logout (SLO)**
  - **Kritisk**: Alle tjenester som bruker SSO må implementere SLO
  - Feilkonfigurert logout hos én kunde kan ødelegge for andre kunder
  - Håndtere to scenarier:
    1. Bruker logger ut fra din tjeneste: Redirect til /endsession-endepunktet
    2. Bruker logger ut fra annen tjeneste: Håndtere front_channel_logout-melding
  - [Les mer: Utlogging og single logout](oidc_func_sso)
  - [Les mer: Integrasjonsguide - Krav til utlogging](oidc_guide_idporten#krav-til-utlogging)

- [ ] **Konfigurere lokal sesjon til maksimalt 30 minutters inaktivitet**
  - Lokal timeout skal være maksimalt 30 minutter ved inaktivitet
  - [Les mer: Levetid for kundens lokale sesjon](oidc_guide_idporten#levetid-for-kundens-lokale-sesjon)

- [ ] **Sende bruker til ID-porten ved lokal timeout**
  - Etter lokal timeout skal brukerens nettleser sendes til ID-porten med ny autentiseringsforespørsel
  - [Les mer: Levetid for kundens lokale sesjon](oidc_guide_idporten#levetid-for-kundens-lokale-sesjon)

- [ ] **Håndtere front_channel_logout-meldinger**
  - Identifisere og invalidere lokal brukersesjon basert på `sid` fra logout-melding
  - [Les mer: Backchannel logout](oidc_func_backchannel_logout)
  - [Les mer: Integrasjonsguide - Krav til utlogging](oidc_guide_idporten#krav-til-utlogging)

### Anbefalinger

- [ ] **Bruke samme sesjonstider som ID-porten**
  - ID-porten bruker maksimum 120 minutter fra første autentisering
  - Inaktivitet over 30 minutter vil utløpe SSO-sesjonen
  - [Les mer: Levetid for SSO-sesjonen](oidc_guide_idporten#levetid-for-sso-sesjonen-i-id-porten)

- [ ] **Vurdere tvungen re-autentisering**
  - For sikkerhetskritiske operasjoner: Bruk `prompt=login` for å tvinge aktiv pålogging
  - [Les mer: Tvungen re-autentisering](oidc_guide_idporten#tvungen-re-autentisering)

- [ ] **Vurdere isolert SSO-sesjon**
  - For tjenester som ikke skal delta i felles SSO-sesjon
  - [Les mer: Isolert SSO-sesjon](oidc_func_nosso)
  - [Les mer: Tvungen re-autentisering](oidc_guide_idporten#tvungen-re-autentisering)

## Sikkerhet og Nøkkelhåndtering

### Krav

- [ ] **Etablere sikker nøkkelhåndtering**
  - Beskytte private nøkler (client_secret, asymmetriske nøkler, virksomhetssertifikat)
  - Definere prosedyrer for nøkkeloppbevaring, backup, og tilgangsstyring
  - Dokumentere rutiner for nøkkelfornyelse og kompromitteringshåndtering
  - [Les mer: Sørg for sikker håndtering av nøkler](idporten_overordnet#sørg-for-sikker-håndtering-av-nøkler)

- [ ] **Gjennomføre risikovurdering**
  - Gjøre en risikovurdering av egen løsning
  - Bruk risikovurderingen til å velge riktig sikkerhetsnivå
  - [Les mer: Veileder for valg av sikkerhetsnivå](https://www.digdir.no/digital-samhandling/veileder-identifikasjon-og-sporbarhet-i-elektronisk-kommunikasjon-med-og-i-offentlig-sektor/2992#veiledning_for_valg_av_sikkerhetsniv_for_identifikasjon)
  - [Les mer: Etabler gode IT-sikkerhetsrutiner](idporten_overordnet#etabler-gode-it-sikkerhetsrutiner-i-virksomheten)

- [ ] **Åpne for ID-portens IP-adresser**
  - Dersom utgående brannmur: Åpne for ID-portens IP-adresser
  - [Les mer: IP-adresser](../../general/IP)
  - [Les mer: Åpne for IP-adresser](idporten_overordnet#åpne-for-ip-adresser)

### Anbefalinger

- [ ] **Bruke HSM for nøkkeloppbevaring**
  - For optimal beskyttelse: Oppbevar private nøkler i kryptografisk hardware (HSM)
  - [Les mer: Sørg for sikker håndtering av nøkler](idporten_overordnet#sørg-for-sikker-håndtering-av-nøkler)

- [ ] **Implementere rotasjon av asymmetriske nøkler**
  - For kunder med mange integrasjoner: Bruk virksomhetssertifikat til å automatisere vedlikehold
  - La hver integrasjon bruke asymmetrisk nøkkel som roteres hyppig
  - [Les mer: Bruk av virksomhetssertifikat](idporten_overordnet#bruk-av-virksomhetssertifikat)

- [ ] **Følge anbefalinger for sertifikatbehandling**
  - Les Veileder for virksomhetsautentisering om sertifikatbehandling, logging og sporing
  - [Les mer: Anbefalinger for sertifikatbehandling](https://www.digdir.no/datadeling/sertifikatbehandling-logging-og-sporing/2438)
  - [Les mer: Etabler gode IT-sikkerhetsrutiner](idporten_overordnet#etabler-gode-it-sikkerhetsrutiner-i-virksomheten)

## Logging og Sporing

### Krav

- [ ] **Implementere tilstrekkelig logging**
  - Logg følgende om autentiseringsforsøk:
    - Dato og tidspunkt
    - Hvilken handling som ble forsøkt
    - Resultatet av handlingen
    - Brukerens IP-adresse
    - SessionIndex / sid
    - Fødselsnummer (vurder personvernbetraktninger)
  - [Les mer: Sørg for tilstrekkelig egen logging](idporten_overordnet#sørg-for-tilstrekkelig-egen-logging)

- [ ] **Vurdere personvern i logging**
  - Vurder behovet for logging opp mot personvernbetraktninger
  - [Les mer: Sørg for tilstrekkelig egen logging](idporten_overordnet#sørg-for-tilstrekkelig-egen-logging)

## Testing

### Krav

- [ ] **Gjennomføre verifikasjonstester**
  - Utføre påkrevde verifikasjonstester for å bekrefte at integrasjonen oppfyller ID-portens krav
  - [Les mer: Verifikasjonstester](idporten_verifikasjonstester)
  - [Les mer: Test din egen løsning](idporten_overordnet#test-din-egen-løsning)

- [ ] **Bruke testbrukere**
  - Bruk ID-portens testbrukere i testmiljø
  - [Les mer: Testbrukere](idporten_testbrukere)
  - [Les mer: Test din egen løsning](idporten_overordnet#test-din-egen-løsning)

- [ ] **Teste i riktig testmiljø**
  - I testmiljø tillates redirect tilbake til localhost
  - [Les mer: Integrasjonsguide - Respons](oidc_guide_idporten#authresponse)

## Spesielle Bruksområder

### For Mobilapper

- [ ] **Følge integrasjonsguide for mobilapper**
  - Mobilapper har en litt annen måte å bruke autorisasjonskode-flyten på
  - [Les mer: Autentisering i app](oidc_auth_app)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#overordna-beskrivelse-av-bruksområdet)

### For JavaScript-applikasjoner/SPA

- [ ] **Følge integrasjonsguide for SPA**
  - JavaScript-applikasjoner (Single Page Applications) har spesielle sikkerhetskrav
  - [Les mer: Autentisering i SPA](oidc_auth_spa)
  - [Les mer: Integrasjonsguide](oidc_guide_idporten#overordna-beskrivelse-av-bruksområdet)

### For API-sikring

- [ ] **Implementere brukerstyrt datadeling korrekt**
  - API-tilgangen kan være innloggingsbasert (implisitt samtykke) eller brukerstyrt (eksplisitt samtykke)
  - Autorisasjonen gjelder kun for en enkelt innbygger
  - [Les mer: API-sikring med OAuth2](oidc_auth_oauth2)
  - [Les mer: Overordnet - Brukerstyrt datadeling](idporten_overordnet#brukerstyrt-datadeling)

### For Innlogging på vegne av andre

- [ ] **Implementere fullmaktsstøtte**
  - For tjenester som skal støtte innlogging på vegne av andre
  - [Les mer: Innlogging på vegne av andre](oidc_auth_fullmakt)
  - [Les mer: Overordnet - Introduksjon](idporten_overordnet#introduksjon)

## Tilleggsfunksjonalitet (valgfritt)

### Anbefalinger

- [ ] **Hente brukerinformasjon fra userinfo-endepunkt**
  - Ved å forespørre scopet `profile` kan du hente ytterligere data fra userinfo-endepunktet
  - Gir tilgang til personnummer og valgt språk under innlogging
  - [Les mer: Userinfo-endepunkt](oidc_protocol_userinfo)
  - [Les mer: Integrasjonsguide - Userinfo](oidc_guide_idporten#5-userinfo-endepunkt)

- [ ] **Hente kontaktopplysninger fra KRR**
  - Ved å forespørre `krr:user/kontaktinformasjon.read`-scopet får du tilgang til kontaktopplysninger fra Kontakt- og Reservasjonsregisteret
  - [Les mer: Brukerspesifikt oppslag i KRR](../../Kontaktregisteret/Brukerspesifikt-oppslag_rest)
  - [Les mer: Integrasjonsguide - KRR](oidc_guide_idporten#6-kontaktopplysninger-fra-kontakt--og-reservasjonsregisteret)

- [ ] **Støtte for utenlandske brukere**
  - Vurdere om tjenesten skal støtte utenlandske brukere (eIDAS)
  - [Les mer: Utenlandske brukere](oidc_func_utanlandske_brukarar)
  - [Les mer: eIDAS](oidc_func_eidas)

## Problemer og Support

### Ved problemer

- [ ] **Kontakte servicedesk ved problemer**
  - E-post: servicedesk@digdir.no
  - Oppgi: client_id, miljø og beskrivelse av problemet
  - [Les mer: Problemer?](idporten_overordnet#problemer-)

## Ressurser

- [ID-porten produktside på Samarbeidsportalen](https://samarbeid.digdir.no/id-porten/id-porten/18)
- [Ta i bruk ID-porten](https://samarbeid.digdir.no/id-porten/ta-i-bruk-id-porten/94)
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
