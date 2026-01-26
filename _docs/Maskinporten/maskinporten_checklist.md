---
title: Sjekkliste for Maskinporten Integrasjon
description: Krav og anbefalinger for integrasjon mot Maskinporten

sidebar: maskinporten_sidebar
product: Maskinporten
---

# Sjekkliste for Maskinporten Integrasjon

Denne sjekklisten gir en oversikt over krav og anbefalinger for integrasjon mot Maskinporten for både API-tilbydere og API-konsumenter.

## Om Maskinporten

Maskinporten er en tjeneste som tilbyr en enkel modell for API-sikring basert på OAuth2 protokollen og bruk av JWT-bearer grants. Den lar API-tilbydere definere tilganger til sine API, modellert som scopes, basert på konsumenten sine organisasjonsnummer.

## For API-tilbyder

### Før Oppstart

#### Krav

- [ ] **Få tildelt API-prefiks**
  - Første gang må du bli manuelt satt opp som API-tilbyder
  - Bestem `scope-prefix` du ønsker å bruke for dine APIer
  - Send inn skjema for å få tildelt prefiks
  - [Les mer: Manuell tildeling av prefix](maskinporten_guide_apitilbyder#1-manuell-tildeling-av-prefix)

- [ ] **Akseptere bruksvilkår**
  - Inngå Digdir sine bruksvilkår for fellesløsninger

### Administrasjon av API/Scopes

#### Krav

- [ ] **Følge syntaks for scopes**
  - Syntaks: `scope ::= prefix ':' subscope`
  - Subscope bør beskrive ressursen best mulig (f.eks. `nav:trygdeopplysninger`)
  - Bruk postfix for å skille lese/skrive-tilgang (f.eks. `.write`, `.read`)
  - Fravær av postfix tolkes som kun lese-tilgang
  - [Les mer: Beskrivelse av APIer](maskinporten_guide_apitilbyder#beskrivelse-av-apier)

- [ ] **Sette synlighet på scope**
  - `PUBLIC`: Synlig for alle på /scopes/all endepunkt
  - `PRIVATE`: Kun synlig for API-tilbyder og konsumenter med tilgang
  - `INTERNAL`: Intern bruk i Digitaliseringsdirektoratet
  - [Les mer: Synlighet](maskinporten_guide_apitilbyder#synlighet)

- [ ] **Sette scope-begrensninger**
  - Sett `allowed_integration_types` for å begrense bruken
  - Kan begrenses til kun maskinporten (server-til-server) eller idporten (brukerinnlogging)
  - [Les mer: Scope-begrensninger](maskinporten_guide_apitilbyder#scope-begrensninger)

- [ ] **Opprette scopes via selvbetjening**
  - Bruk enten web-grensesnitt på Samarbeidsportalen eller selvbetjenings-API
  - [Les mer: Opprette et API - via Samarbeidsportalen](maskinporten_guide_apitilbyder#1a-opprette-et-api---via-samarbeidsportalen)
  - [Les mer: Opprette APIer - OAuth2-selvbetjeningsklient](maskinporten_guide_apitilbyder#2a-opprette-apier---oauth2-selvbetjeningsklient)

### Tilgangsstyring

#### Krav

- [ ] **Gi tilgang til konsumenter**
  - Gi tilgang basert på konsumentens organisasjonsnummer
  - Kan gjøres via Samarbeidsportalen eller selvbetjenings-API
  - [Les mer: Tilgangsstyring - via Samarbeidsportalen](maskinporten_guide_apitilbyder#1b-tilgangsstyring---via-samarbeidsportalen)
  - [Les mer: Tilgangsstyring - OAuth2-selvbetjeningsklient](maskinporten_guide_apitilbyder#2b-tilgangsstyring---oauth2-selvbetjeningsklient)

- [ ] **Revokere tilganger ved behov**
  - Trekk tilbake tilganger ved å slette dem i selvbetjening
  - [Les mer: Tilgangsstyring - via Samarbeidsportalen](maskinporten_guide_apitilbyder#1b-tilgangsstyring---via-samarbeidsportalen)

### Token-validering

#### Krav

- [ ] **Validere token korrekt**
  - Sjekk at `issuer` stemmer med Maskinporten ("https://maskinporten.no/" i prod)
  - Validere signering og signeringssertifikat mot JWK-endepunkt
  - Verifisere at `scope` stemmer med ditt API-endepunkt
  - Validere at token ikke er utløpt (`exp`)
  - [Les mer: Validere token](maskinporten_guide_apitilbyder#4-validere-token)

- [ ] **Bruke consumer-claim for tilgangskontroll**
  - Det er `consumer`-claimet som forteller hvilken konsument som har fått tokenet
  - **Ikke** bruk `client_id` eller `client_org` (gamle claims som fjernes)
  - [Les mer: Validere token](maskinporten_guide_apitilbyder#4-validere-token)

- [ ] **Håndtere leverandør-informasjon korrekt (ved delegering)**
  - Ved bruk av leverandør får du `supplier` og `delegation_source` claims
  - Nyttig for logging og sporbarhet
  - [Les mer: Validere token](maskinporten_guide_apitilbyder#4-validere-token)

### Delegering via Altinn (valgfritt)

#### Krav (hvis du bruker Altinn-delegering)

- [ ] **Være tjenesteeier i Altinn**
  - Påkrevd for å kunne bruke Altinn-delegering
  - [Les mer: Bruke delegering i Altinn](maskinporten_guide_apitilbyder#bruke-delegering-i-altinn)

- [ ] **Opprette delegeringsoppsett**
  - Opprett scope med **delegeringskilde**
  - Lag "delegerbar ressurs" i Altinn med det aktuelle scopet
  - Gi tilgang til konsumenter (ikke leverandøren direkte)
  - [Les mer: Bruke delegering i Altinn](maskinporten_guide_apitilbyder#bruke-delegering-i-altinn)
  - [Les mer: Ekstern delegering](maskinporten_func_delegering)

#### Anbefalinger

- [ ] **Forstå begrensninger ved delegering**
  - Scopes uten delegeringskilde kan ikke bruke Altinn-delegering
  - Scopes med delegeringskilde kan ikke bruke interne delegeringsmekanismer (onbehalfof)
  - [Les mer: Bruke delegering i Altinn](maskinporten_guide_apitilbyder#bruke-delegering-i-altinn)

## For API-konsument

### Opprette Integrasjon

#### Krav

- [ ] **Få tilgang til scope fra API-tilbyder**
  - API-tilbyder må gi din organisasjon tilgang til scopet først
  - [Les mer: Overordnet prosedyre](maskinporten_guide_apikonsument#overordnet-prosedyre-for-api-sikring-med-maskinporten)

- [ ] **Opprette Maskinporten-integrasjon**
  - Opprett en OAuth2-klient i Maskinporten
  - Kan gjøres via Samarbeidsportalen eller selvbetjenings-API
  - [Les mer: Opprett en integrasjon](maskinporten_guide_apikonsument#4-opprett-en-integrasjon-i-maskinporten)

- [ ] **Konfigurere integrasjon med riktige egenskaper**
  - `integration_type`: "maskinporten"
  - `token_endpoint_auth_method`: "private_key_jwt"
  - `grant_types`: "urn:ietf:params:oauth:grant-type:jwt-bearer"
  - `scopes`: Scope(s) du har fått tildelt tilgang til
  - `description`: God beskrivelse av tjenesten
  - [Les mer: Opprett en integrasjon](maskinporten_guide_apikonsument#4-opprett-en-integrasjon-i-maskinporten)

- [ ] **Velge autentiseringsmetode**
  - Enten virksomhetssertifikat eller egen asymmetrisk nøkkel
  - Maskinporten aksepterer kun sertifikat og nøkler (ikke client_secret)
  - [Les mer: Opprett en integrasjon](maskinporten_guide_apikonsument#4-opprett-en-integrasjon-i-maskinporten)

#### Anbefalinger

- [ ] **Lage separate klienter for ulike APIer**
  - Sikkerhetsrisiko å la samme klient ha tilgang til for mange APIer
  - [Les mer: Opprett en integrasjon](maskinporten_guide_apikonsument#4-opprett-en-integrasjon-i-maskinporten)

- [ ] **Bruke egen nøkkel fremfor virksomhetssertifikat**
  - Unngå å spre virksomhetssertifikatet til mange systemer
  - Opprett asymmetriske nøkler knyttet til enkelt-integrasjoner
  - [Les mer: Registrere klient som bruker egen nøkkel](maskinporten_guide_apikonsument#registrere-klient-som-bruker-egen-nøkkel)

### Token-forespørsel (JWT-grant)

#### Krav

- [ ] **Generere og signere JWT korrekt**
  - Bruk virksomhetssertifikat eller registrert asymmetrisk nøkkel for signering
  - [Les mer: Be om token](maskinporten_guide_apikonsument#5-be-om-token)

- [ ] **Inkludere påkrevde claims i JWT**
  - `aud`: https://maskinporten.no/ (eller aktuelt miljø fra well-known)
  - `iss`: Din egen client_id
  - `scope`: Space-separert liste over scopes
  - `iat`: Tidspunkt for når JWT ble laget (UTC-tid)
  - `exp`: Utløpstidspunkt (Maks 120 sekunder: exp - iat <= 120)
  - [Les mer: Be om token](maskinporten_guide_apikonsument#5-be-om-token)

- [ ] **Ikke gjenbruke JWT**
  - Hver JWT må være unik
  - Bruk `jti` (JWT ID) for å sikre unikhet
  - [Les mer: Be om token](maskinporten_guide_apikonsument#5-be-om-token)

#### Anbefalinger

- [ ] **Be om ett scope per token**
  - Sikkerhetsmessig problematisk å be om mange scopes i samme token
  - [Les mer: Be om token](maskinporten_guide_apikonsument#5-be-om-token)

### API-kall

#### Krav

- [ ] **Bruke access_token som Authorization-header**
  - Typisk format: `Authorization: Bearer <access_token>`
  - Følg API-tilbyders dokumentasjon
  - [Les mer: Sende API-kall med token](maskinporten_guide_apikonsument#6-sende-api-kall-med-token)

- [ ] **Håndtere token-utløp**
  - Ved 401-respons fra API: Hent nytt token
  - Gjenbruk token for flere API-kall innen levetiden
  - [Les mer: Sende API-kall med token](maskinporten_guide_apikonsument#6-sende-api-kall-med-token)

### Delegering via Altinn (for leverandører)

#### Krav (hvis du er leverandør)

- [ ] **Registrere integrasjon korrekt**
  - **Viktig**: Opprett integrasjon som tilhørende deg selv
  - **Ikke** velg "på vegne av en kunde" eller "på vegne av flere kunder"
  - Hvis du bruker selvbetjenings-API: Bruk `idporten:dcr.write` (ikke `idporten:dcr.supplier`)
  - Ikke sett `client_orgno` i registreringskallet
  - [Les mer: Bruke delegering som leverandør](maskinporten_guide_apikonsument#bruke-delegering-som-leverandør)

- [ ] **Inkludere consumer_org i JWT-grant**
  - Oppgi konsumentens organisasjonsnummer som `consumer_org` claim
  - Maskinporten sjekker Altinn om gyldig delegeringsforhold finnes
  - [Les mer: Bruke delegering som leverandør](maskinporten_guide_apikonsument#bruke-delegering-som-leverandør)

- [ ] **Få delegering fra konsument i Altinn**
  - Konsumentens bemyndiget ansatt må logge inn i Altinn og delegere tilgangen til deg
  - [Les mer: Bruke delegering som konsument](maskinporten_guide_apikonsument#bruke-delegering-som-konsument)
  - [Les mer: Altinns dokumentasjon](https://altinn.github.io/docs/utviklingsguider/sikkerhet-i-eoppslag/tilgangsstyrer/)

## Generelle Krav

### Sikkerhet og Nøkkelhåndtering

#### Krav

- [ ] **Etablere sikker nøkkelhåndtering**
  - Beskytte private nøkler og virksomhetssertifikater
  - Definere prosedyrer for oppbevaring, backup, og tilgangsstyring
  - Dokumentere rutiner for fornyelse og kompromitteringshåndtering

- [ ] **Gjennomføre risikovurdering**
  - Vurder sikkerhet i egen løsning
  - Vurder hvor mange APIer en klient skal ha tilgang til

- [ ] **Åpne for Maskinporten sine IP-adresser**
  - Dersom utgående brannmur: Åpne for Maskinporten sine IP-adresser

### Logging og Sporing

#### Krav

- [ ] **Implementere tilstrekkelig logging**
  - Logg token-forespørsler og API-kall
  - Logg feil og sikkerhetshendelser
  - For API-tilbydere: Logg consumer-informasjon for sporbarhet

### Testing

#### Krav

- [ ] **Teste i riktig testmiljø**
  - Bruk test-miljø før produksjon
  - Verifiser at integrasjon fungerer som forventet

## Ressurser

- [Maskinporten overordnet](maskinporten_overordnet)
- [Maskinporten på Samarbeidsportalen](https://samarbeid.digdir.no)
- [Guide for API-tilbydere](maskinporten_guide_apitilbyder)
- [Guide for API-konsumenter](maskinporten_guide_apikonsument)
- [JWT-grant spesifikasjon](maskinporten_protocol_jwtgrant)
- [Ekstern delegering](maskinporten_func_delegering)
- [Selvbetjenings-API](../../idporten/oidc/oidc_api_admin)
- [Selvbetjenings-API for Maskinporten](../../idporten/oidc/oidc_api_admin_maskinporten)
- [Samtykketoken i Maskinporten](maskinporten_func_samtykke)
- [Sjekkliste for Samtykketoken](maskinporten_samtykke_checklist)
- [Altinn: Sikkerhet i eOppslag](https://altinn.github.io/docs/utviklingsguider/sikkerhet-i-eoppslag/tilgangsstyrer/)
