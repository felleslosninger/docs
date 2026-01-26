---
title: Sjekkliste for Samtykketoken i Maskinporten
description: Krav og anbefalinger for bruk av samtykketoken

sidebar: maskinporten_sidebar
product: Maskinporten
---

# Sjekkliste for Samtykketoken i Maskinporten

Denne sjekklisten gir en oversikt over krav og anbefalinger for bruk av samtykketoken i Maskinporten.

## For API-tilbyder/Tjenesteeier

### Krav

- [ ] **Opprette samtykkeressurs i Altinn 3**
  - Samtykkeressursen må opprettes i Altinn 3 før løsningen kan tas i bruk
  - [Les mer om samtykke for tjenesteeier](https://docs.altinn.studio/nb/authorization/guides/resource-owner/consent/)
  - [Les mer: Oppsett](maskinporten_func_samtykke#oppsett)

- [ ] **Validere ID-claim i tokenet**
  - API-tilbyder må validere at `id` (samtykkets uuid) i tokenet er korrekt
  - [Les mer: For API-tilbyder/Tjenesteeier](maskinporten_func_samtykke#for-api-tilbydertjenesteeier)

- [ ] **Validere from-claim i tokenet**
  - API-tilbyder må validere at `from` (hvem som har gitt samtykket) i tokenet er korrekt
  - [Les mer: For API-tilbyder/Tjenesteeier](maskinporten_func_samtykke#for-api-tilbydertjenesteeier)

- [ ] **Validere to-claim i tokenet**
  - API-tilbyder må validere at `to` (organisasjonen samtykket er gitt til) i tokenet er korrekt
  - [Les mer: For API-tilbyder/Tjenesteeier](maskinporten_func_samtykke#for-api-tilbydertjenesteeier)

- [ ] **Validere scope i tokenet**
  - API må validere at riktig scope er inkludert i tokenet
  - [Les mer: Respons](maskinporten_func_samtykke#respons)

- [ ] **Sikre at sluttbruker aksepterer samtykket**
  - Samtykket må aksepteres av sluttbruker før det kan brukes
  - [Les mer: Oppsett](maskinporten_func_samtykke#oppsett)

- [ ] **Følge datatilsynets krav til samtykke**
  - Samtykkeløsningen må oppfylle [datatilsynets krav til samtykke for å behandle personopplysninger](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/behandlingsgrunnlag/veileder-om-behandlingsgrunnlag/?id=176)
  - [Les mer: Bakgrunn](maskinporten_func_samtykke#bakgrunn)

### Anbefalinger

- [ ] **Bruke uuid fra Altinn ved oppretting**
  - Oppbevar den uuid som returneres fra Altinn ved oppretting av samtykkeressurs
  - [Les mer: Oppsett](maskinporten_func_samtykke#oppsett)

- [ ] **Les Altinns dokumentasjon**
  - Les grundig gjennom [Altinns guide - Kom igang med samtykke](https://docs.altinn.studio/nb/authorization/getting-started/consent/) for mer detaljer
  - [Les mer: Oppsett](maskinporten_func_samtykke#oppsett)

## For Datakonsument/Tjenesteleverandør

### Krav

- [ ] **Opprette Maskinporten-integrasjon**
  - Datakonsument må opprette en Maskinporten-integrasjon gjennom selvbetjening på [Samarbeidsportalen](https://samarbeid.digdir.no)
  - [Les mer: Oppsett](maskinporten_func_samtykke#oppsett)

- [ ] **Ha tilgang til API-tilbyders scope**
  - Klienten må ha tilgang til å knytte API-tilbyders/tjenesteeiers scope til klienten
  - [Les mer: Oppsett](maskinporten_func_samtykke#oppsett)

- [ ] **Bruke RAR-forespørsel av type `urn:altinn:consent`**
  - Forespørselen må bruke riktig type i henhold til OAuth2-utvidelsen for Rich Authorization Requests (RAR)
  - [Les mer: Grensesnittsdefinisjon](maskinporten_func_samtykke#grensesnittsdefinisjon)

- [ ] **Inkludere påkrevde claims i forespørselen**
  - `type`: Må alltid være `urn:altinn:consent`
  - `id`: Samtykkeressursens uuid
  - `from`: Orgno eller pid på den som har gitt samtykket (format: `urn:altinn:person:identifier-no:12345678910` eller `urn:altinn:organization:identifier-no:123456789`)
  - [Les mer: Forespørsel](maskinporten_func_samtykke#forespørsel)

- [ ] **Forespørre ett eller flere OAuth2 scopes**
  - JWT-grantet må alltid inkludere ett eller flere OAuth2 scopes
  - [Les mer: Forespørsel](maskinporten_func_samtykke#forespørsel)

- [ ] **Kun spørre på ett samtykke om gangen**
  - Det er kun mulig å forespørre ett samtykke per token-request
  - [Les mer: Forespørsel](maskinporten_func_samtykke#forespørsel)

- [ ] **Sikre at consumer matcher to-claim**
  - Leverandørens organisasjonsnummer i `consumer`-claimet må matche verdien i `to` for å få et samtykketoken
  - [Les mer: Respons](maskinporten_func_samtykke#respons)

- [ ] **Håndtere delegering ved bruk av delegerte scopes**
  - Ved bruk av delegerte scopes må samtykket være gitt til den som har delegert scopet til den gitte Maskinporten-klienten
  - [Les mer om delegering](maskinporten_func_delegering)
  - [Les mer: Hva inneholder et samtykke-token?](maskinporten_func_samtykke#hva-inneholder-et-samtykke-token-)

### Anbefalinger

- [ ] **Les dokumentasjon om delegering**
  - Hvis tilgang til scope ikke er gitt direkte til tjenesteleverandør, les nærmere om [delegering](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_delegering.html)
  - [Les mer: Oppsett](maskinporten_func_samtykke#oppsett)

## Generelle anbefalinger

- [ ] **Forstå samtykke-tokenets innhold**
  - Gjør deg kjent med alle claims som inkluderes i responsen: `type`, `id`, `from`, `to`, `consented`, `validTo`, `consentRights`
  - [Les mer: Respons](maskinporten_func_samtykke#respons)

- [ ] **Sjekk validTo-tidsstempel**
  - Vær oppmerksom på at samtykket har et utløpstidspunkt (`validTo`)
  - [Les mer: Respons](maskinporten_func_samtykke#respons)

- [ ] **Forstå samtykkerettigheter (consentRights)**
  - Sjekk at du forstår strukturen på `consentRights` som inneholder `action`, `resource` og eventuelt `metadata`
  - [Les mer: Respons](maskinporten_func_samtykke#respons)

## Ressurser

- [Samtykketjenesten på Samarbeidsportalen](https://samarbeid.digdir.no/altinn/samtykketjenesten/2337)
- [Datatilsynets krav til samtykke](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/behandlingsgrunnlag/veileder-om-behandlingsgrunnlag/?id=176)
- [Altinn: Samtykke for tjenesteeier](https://docs.altinn.studio/nb/authorization/guides/resource-owner/consent/)
- [Altinn: Kom igang med samtykke](https://docs.altinn.studio/nb/authorization/getting-started/consent/)
- [RFC 9396: Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/rfc9396/)
- [Maskinporten: JWT-grant](maskinporten_protocol_jwtgrant)
- [Maskinporten: Delegering](maskinporten_func_delegering)
