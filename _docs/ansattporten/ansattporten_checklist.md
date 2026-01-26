---
title: Sjekkliste for Ansattporten Integrasjon
description: Krav og anbefalinger for integrasjon mot Ansattporten

sidebar: ansattporten
product: Ansattporten
---

# Sjekkliste for Ansattporten Integrasjon

Denne sjekklisten gir en oversikt over krav og anbefalinger for integrasjon mot Ansattporten.

## Om Ansattporten

Ansattporten er en egen innloggingtjeneste med funksjonalitet tilpasset innlogging i ansatt/representasjonskontekst. Den deler samme kildekode-base som ID-porten, men er en selvstendig tjeneste med egne særtrekk.

## Før Oppstart

### Krav

- [ ] **Akseptere bruksvilkår**
  - Alle kunder som har inngått Digdir sine bruksvilkår for fellesløsninger kan bruke Ansattporten
  - [Les mer: Hvem kan bruke Ansattporten?](ansattporten_om#hvem-kan-bruke-ansattporten-)
  - [Les mer: Hvordan administrerer jeg Ansattporten?](ansattporten_om#hvordan-administrerer-jeg-ansattporten-)

- [ ] **Registrere integrasjon i selvbetjening**
  - Bruk selvbetjeningsløsningen på Samarbeidsportalen til å registrere integrasjonen
  - **Kritisk**: Sett `integration_type` til `ansattporten` (ikke `idporten`)
  - [Les mer: Hvordan administrerer jeg Ansattporten?](ansattporten_om#hvordan-administrerer-jeg-ansattporten-)

- [ ] **Forstå forskjellen mellom Ansattporten og ID-porten**
  - Ansattporten er en egen "port" - isolert fra ID-porten
  - Ingen SSO mellom ID-porten og Ansattporten
  - Ingen SSO mellom ulike tjenester i Ansattporten (isolert SSO-sesjon)
  - [Les mer: Egen "port"](ansattporten_om#egen-port)
  - [Les mer: Ingen SSO-funksjonalitet mellom tjenester](ansattporten_om#ingen-sso-funksjonalitet-mellom-tjenester)

### Anbefalinger

- [ ] **Vurdere bruksscenario**
  - Ansattporten støtter tre brukerreiser:
    1. Vanlig innlogging (med isolert SSO)
    2. Innlogging på vegne av virksomhet
    3. Datadeling på vegne av virksomhet
  - [Les mer: Hvilken bruk-scenario støttes?](ansattporten_om#hvilken-bruk-scenario-støttes-)

## Autentiseringsforespørsel

### Krav

- [ ] **Bruke PKCE (Proof Key for Code Exchange)**
  - Alle klienter må som hovedregel bruke PKCE i autentiseringsforespørselen
  - `code_verifier` må være minst 43 karakterer lang, og ikke lengre enn 128 karakterer
  - Støtter kun `code_challenge_method=S256`
  - [Les mer: PKCE](../../idporten/oidc/oidc_func_pkce)

- [ ] **Inkludere påkrevde parametere i autentiseringsforespørsel**
  - `client_id`: Din registrerte klient-ID
  - `redirect_uri`: Forhåndsregistrert redirect URI
  - `scope`: Minimum `openid`
  - `response_type`: `code` for autorisasjonskode-flyt
  - `code_challenge`: Hash'et versjon av code_verifier
  - `code_challenge_method`: `S256`
  - [Les mer: Vanlig innlogging](ansattporten_guide)

- [ ] **Bruke korrekt issuer-verdi**
  - Ansattporten er en egen OAuth2 autorisasjonsserver med egen issuer-verdi
  - Valider at issuer stemmer med Ansattporten (ikke ID-porten)
  - [Les mer: Egen "port"](ansattporten_om#egen-port)

### Anbefalinger

- [ ] **Bruke state-parameter**
  - Inkluder `state` i autentiseringsforespørselen for å beskytte mot CSRF-angrep

- [ ] **Bruke nonce-parameter**
  - Inkluder `nonce` i autentiseringsforespørselen for ekstra beskyttelse mot replay-angrep

- [ ] **Vurdere PAR (Pushed Authorization Request)**
  - For tjenester med høye krav til sikkerhet

## Representasjon og Organisasjonsvelger

### Krav (hvis du bruker representasjonsfunksjonalitet)

- [ ] **Være tjenesteeier i Altinn**
  - Kun kunder som er tjenesteeier i Altinn kan bruke funksjonaliteten med organisasjonsvelger og tilgangstyring
  - [Les mer: Hvem kan bruke Ansattporten?](ansattporten_om#hvem-kan-bruke-ansattporten-)

- [ ] **Forstå autorative kilder for representasjon**
  - Ansattporten har ikke egen database/register over roller/rettigheter
  - Baserer seg på eksterne, autorative kilder (Altinn Autorisasjon)
  - [Les mer: Autorative kilder for representasjon](ansattporten_om#autorative-kilder-for-representasjon)

- [ ] **Håndtere organisasjonsvelger korrekt**
  - Dersom tjenesten krever representasjon, vises organisasjonsvelger til brukeren
  - Velgeren er forhåndspopulert fra autorativ kilde
  - [Les mer: Autorative kilder for representasjon](ansattporten_om#autorative-kilder-for-representasjon)

### Anbefalinger

- [ ] **Implementere innlogging på vegne av virksomhet**
  - Følg guide for representasjonsbasert innlogging
  - [Les mer: Innlogging på vegne av virksomhet](ansattporten_representasjon)

- [ ] **Implementere datadeling på vegne av virksomhet**
  - Følg guide for OAuth2-basert datadeling
  - [Les mer: Datadeling på vegne av virksomhet](ansattporten_oauth2)

## Token-håndtering

### Krav

- [ ] **Implementere korrekt klientautentisering**
  - Velg én av støttede metoder:
    - `client_secret_basic` / `client_secret_post` - basert på client_secret
    - `private_key_jwt` - basert på JWT'er signert med virksomhetssertifikat (anbefalt for høy sikkerhet)

- [ ] **Sende code_verifier i token-forespørsel**
  - Inkluder den originale `code_verifier` i token-forespørselen for å fullføre PKCE-flyten

- [ ] **Validere ID-token korrekt**
  - Følg kapittel 3.1.3.7 i OpenID Connect Core 1.0 spesifikasjonen
  - Validere `iss` (issuer) - må stemme med Ansattporten, ikke ID-porten
  - Validere `aud`, `exp`, `iat`, `nonce` (hvis brukt)
  - Verifiser signatur mot Ansattporten sitt JWK-endepunkt
  - [Les mer: OpenID Connect ID Token Validation](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation)

- [ ] **Respektere token-levetider**
  - ID-token: Kort levetid, brukes til å opprette lokal sesjon
  - Access-token: Typisk 120 sekunder
  - Refresh-token: Brukes til å fornye access-token uten brukerinteraksjon

### Anbefalinger

- [ ] **Bruke virksomhetssertifikat for klientautentisering**
  - Anbefalt metode for klienter med høye krav til sikkerhet

- [ ] **Bruke well-known endepunkt for dynamisk konfigurasjon**
  - Bruk Ansattporten sitt well-known-endepunkt for å finne metadata
  - Hent signeringssertifikat fra JWK-endepunkt dynamisk
  - Sikrer kontinuerlig tjenesteleveranse ved sertifikatbytte
  - [Les mer: Well-known endepunkt](ansattporten_wellknown)

## Sesjonshåndtering

### Krav

- [ ] **Forstå isolert SSO-sesjon**
  - Ansattporten har ikke SSO mellom ulike tjenester
  - Alle klienter får tvangssatt isolert SSO-sesjon
  - [Les mer: Ingen SSO-funksjonalitet mellom tjenester](ansattporten_om#ingen-sso-funksjonalitet-mellom-tjenester)
  - [Les mer: Isolert SSO-sesjon](../../idporten/oidc/oidc_func_nosso)

- [ ] **Implementere utlogging**
  - Siden SSO er isolert, påvirkes ikke andre tjenester ved utlogging
  - Redirect til /endsession-endepunktet ved utlogging

- [ ] **Konfigurere lokal sesjon til maksimalt 30 minutters inaktivitet**
  - Lokal timeout skal være maksimalt 30 minutter ved inaktivitet

### Anbefalinger

- [ ] **Følge samme sesjonstider som ID-porten**
  - Maksimum 120 minutter fra første autentisering
  - Inaktivitet over 30 minutter vil utløpe sesjonen

## Sikkerhet og Nøkkelhåndtering

### Krav

- [ ] **Etablere sikker nøkkelhåndtering**
  - Beskytte private nøkler (client_secret, asymmetriske nøkler, virksomhetssertifikat)
  - Definere prosedyrer for nøkkeloppbevaring, backup, og tilgangsstyring
  - Dokumentere rutiner for nøkkelfornyelse og kompromitteringshåndtering

- [ ] **Gjennomføre risikovurdering**
  - Gjøre en risikovurdering av egen løsning

- [ ] **Åpne for Ansattporten sine IP-adresser**
  - Dersom utgående brannmur: Åpne for Ansattporten sine IP-adresser
  - [Les mer: IP-adresser](../../general/IP)

### Anbefalinger

- [ ] **Bruke HSM for nøkkeloppbevaring**
  - For optimal beskyttelse: Oppbevar private nøkler i kryptografisk hardware (HSM)

- [ ] **Implementere rotasjon av asymmetriske nøkler**
  - For kunder med mange integrasjoner: Bruk virksomhetssertifikat til å automatisere vedlikehold
  - La hver integrasjon bruke asymmetrisk nøkkel som roteres hyppig

## Logging og Sporing

### Krav

- [ ] **Implementere tilstrekkelig logging**
  - Logg følgende om autentiseringsforsøk:
    - Dato og tidspunkt
    - Hvilken handling som ble forsøkt
    - Resultatet av handlingen
    - Brukerens IP-adresse
    - SessionIndex / sid
    - Eventuelt valgt organisasjon (ved representasjon)

- [ ] **Vurdere personvern i logging**
  - Vurder behovet for logging opp mot personvernbetraktninger

## Testing

### Krav

- [ ] **Teste i riktig testmiljø**
  - Test-miljø: `https://test.ansattporten.no`
  - Prod-miljø: `https://ansattporten.no`
  - [Les mer: Well-known endepunkt](ansattporten_wellknown)

- [ ] **Bruke korrekt well-known endepunkt**
  - Test: [https://test.ansattporten.no/.well-known/openid-configuration](https://test.ansattporten.no/.well-known/openid-configuration)
  - Prod: [https://ansattporten.no/.well-known/openid-configuration](https://ansattporten.no/.well-known/openid-configuration)
  - [Les mer: Well-known endepunkt](ansattporten_wellknown)

## Kostnader

### Forstå finansieringsmodell

- [ ] **Kjenne til kostnadsmodell**
  - Ansattporten har samme finansieringsmodell som ID-porten
  - 200.000-innnloggingskvoten er felles for de to portene
  - Finansieringsmodell kan endre seg i fremtiden
  - [Les mer: Hva koster Ansattporten?](ansattporten_om#hva-koster-ansattporten-)

## Problemer og Support

### Ved problemer

- [ ] **Kontakte servicedesk ved problemer**
  - E-post: servicedesk@digdir.no
  - Oppgi: client_id, miljø og beskrivelse av problemet

## Ressurser

- [Ansattporten er nå i produksjon (Samarbeidsportalen)](https://samarbeid.digdir.no/ansattporten/ansattporten-er-no-i-produksjon-som-ei-fullverdig-fellesloysing/2969)
- [Hva er Ansattporten?](ansattporten_om)
- [Vanlig innlogging](ansattporten_guide)
- [Innlogging på vegne av virksomhet](ansattporten_representasjon)
- [Datadeling på vegne av virksomhet](ansattporten_oauth2)
- [Ansattporten protokoll](ansattporten_protocol)
- [Well-known endepunkt](ansattporten_wellknown)
- [Isolert SSO-sesjon](../../idporten/oidc/oidc_func_nosso)
- [PKCE - Proof Key for Code Exchange](../../idporten/oidc/oidc_func_pkce)
- [OpenID Connect Core 1.0 spesifikasjon](https://openid.net/specs/openid-connect-core-1_0.html)
- [Altinn Autorisasjon](https://altinn.github.io/docs/utviklingsguider/sikkerhet-i-eoppslag/tilgangsstyrer/)
