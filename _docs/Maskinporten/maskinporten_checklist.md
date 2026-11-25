---
title: Sjekkliste for Maskinporten Integrasjon
description: Krav og anbefalinger for integrasjon mot Maskinporten

sidebar: maskinporten_sidebar
product: Maskinporten
---

# Sjekkliste for Maskinporten Integrasjon

Kortfattet sjekkliste for integrasjon mot Maskinporten. For detaljer, se [guide for API-tilbydere](maskinporten_guide_apitilbyder) og [guide for API-konsumenter](maskinporten_guide_apikonsument).

> 🔒 = sikkerhetsrelatert punkt. **Krav** = må oppfylles. **Anbefalt** = bør oppfylles.

## For API-tilbyder

- [ ] Akseptere Digdir sine [bruksvilkår](https://samarbeid.digdir.no) for fellesløsninger
- [ ] [Få tildelt API-prefiks](maskinporten_guide_apitilbyder#1-manuell-tildeling-av-prefix)
- [ ] [Opprette scopes](maskinporten_guide_apitilbyder#beskrivelse-av-apier) med riktig syntaks, synlighet og begrensninger
- [ ] [Gi tilgang til konsumenter](maskinporten_guide_apitilbyder#1b-tilgangsstyring---via-samarbeidsportalen) basert på organisasjonsnummer
- [ ] 🔒 [Validere token](maskinporten_guide_apitilbyder#4-validere-token): issuer, signatur (hent nøkler fra [well-known/JWK-endepunktet](maskinporten_func_wellknown)), scope, `aud` og utløpstid
- [ ] 🔒 Bruke `consumer`-claimet for tilgangskontroll — **ikke** `client_id` eller `client_org`
- [ ] 🔒 Ved delegering: [logg `supplier` og `delegation_source` claims](maskinporten_guide_apitilbyder#4-validere-token)

### Delegering via Altinn (valgfritt)

- [ ] [Opprette delegeringsoppsett](maskinporten_guide_apitilbyder#bruke-delegering-i-altinn) (krever at du er tjenesteeier i Altinn)
- [ ] Forstå at scopes med/uten delegeringskilde har [ulike begrensninger](maskinporten_func_delegering)

## For API-konsument

- [ ] Få tilgang til ønsket scope fra API-tilbyder
- [ ] [Opprette integrasjon](maskinporten_guide_apikonsument#4-opprett-en-integrasjon-i-maskinporten) med riktige egenskaper
- [ ] 🔒 [Generere og signere JWT-grant](maskinporten_guide_apikonsument#5-be-om-token) med påkrevde claims (`exp - iat` maks 180 sekunder, anbefalt 120)
- [ ] 🔒 Aldri gjenbruke en JWT-grant — bruk unik `jti`
- [ ] [Sende API-kall](maskinporten_guide_apikonsument#6-sende-api-kall-med-token) med `Authorization: Bearer <access_token>`
- [ ] Håndtere token-utløp (hent nytt ved 401, gjenbruk innen levetiden)

### Anbefalinger

- [ ] 🔒 Bruk separate klienter for ulike APIer — reduserer skadeomfang ved kompromittering
- [ ] 🔒 Foretrekk [egen asymmetrisk nøkkel](maskinporten_guide_apikonsument#registrere-klient-som-bruker-egen-nøkkel) fremfor virksomhetssertifikat — unngå å spre sertifikatet
- [ ] 🔒 Be om [ett scope per token](maskinporten_guide_apikonsument#5-be-om-token) — begrens tilgangen i hvert token

### Delegering via Altinn (for leverandører)

- [ ] [Registrer integrasjon](maskinporten_guide_apikonsument#bruke-delegering-som-leverandør) som tilhørende deg selv — **ikke** «på vegne av kunde»
- [ ] Inkluder `consumer_org` i JWT-grant
- [ ] Sørg for at [konsumenten delegerer tilgang](maskinporten_guide_apikonsument#bruke-delegering-som-konsument) i Altinn

## Generelle krav

### Sikkerhet og nøkkelhåndtering

- [ ] 🔒 **Krav:** Etabler sikker nøkkelhåndtering — beskytt private nøkler, definer prosedyrer for oppbevaring, backup, tilgangsstyring, fornyelse og kompromitteringshåndtering
- [ ] 🔒 **Krav:** Gjennomfør risikovurdering av egen løsning — avgjør hvilke API-er en klient skal ha tilgang til
- [ ] 🔒 **Krav:** Åpne utgående brannmur for [Maskinportens IP-adresser]({{site.baseurl}}/docs/general/IP.html) (om aktuelt)

### Logging og testing

- [ ] 🔒 **Krav:** Logg token-forespørsler, API-kall, feil og sikkerhetshendelser
- [ ] API-tilbydere: Logg consumer-informasjon for sporbarhet
- [ ] Test i riktig testmiljø før produksjon

## Ressurser

- [Maskinporten overordnet](maskinporten_overordnet)
- [Guide for API-tilbydere](maskinporten_guide_apitilbyder)
- [Guide for API-konsumenter](maskinporten_guide_apikonsument)
- [JWT-grant spesifikasjon](maskinporten_protocol_jwtgrant)
- [Ekstern delegering](maskinporten_func_delegering)
- [Sjekkliste for samtykketoken](maskinporten_samtykke_checklist)
- [Selvbetjenings-API]({{site.baseurl}}/docs/idporten/oidc/oidc_api_admin_maskinporten.html)
- [Samarbeidsportalen](https://samarbeid.digdir.no)
