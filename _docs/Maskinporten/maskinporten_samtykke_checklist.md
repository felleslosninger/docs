---
title: Sjekkliste for Samtykketoken i Maskinporten
description: Krav og anbefalinger for bruk av samtykketoken

sidebar: maskinporten_sidebar
product: Maskinporten
---

# Sjekkliste for Samtykketoken i Maskinporten

Kortfattet sjekkliste for bruk av samtykketoken. For detaljer, se [Samtykketoken i Maskinporten](maskinporten_func_samtykke).

> 🔒 = sikkerheitsrelatert punkt. **Krav** = må oppfyllast. **Anbefalt** = bør oppfyllast.

## For API-tilbyder/Tjenesteeier

- [ ] [Opprette samtykkeressurs](https://docs.altinn.studio/nb/authorization/guides/resource-owner/consent/) i Altinn 3 og oppbevare uuid
- [ ] Sikre at sluttbruker aksepterer samtykket før bruk
- [ ] 🔒 **Krav:** Validere `id`, `from`, `to` og `scope` i samtykke-tokenet — sikrar at tokenet gjeld rett samtykke, rett person/org og rett API
- [ ] 🔒 **Krav:** Oppfylle [datatilsynets krav til samtykke](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/behandlingsgrunnlag/veileder-om-behandlingsgrunnlag/?id=176)

## For Datakonsument/Tjenesteleverandør

- [ ] Opprette Maskinporten-integrasjon via [Samarbeidsportalen](https://samarbeid.digdir.no)
- [ ] Ha tilgang til API-tilbyders scope (direkte eller via [delegering](maskinporten_func_delegering))
- [ ] Bruke [RAR-forespørsel](maskinporten_func_samtykke#grensesnittsdefinisjon) av type `urn:altinn:consent` med påkrevde claims (`type`, `id`, `from`)
- [ ] Kun forespørre ett samtykke per token-request
- [ ] Alltid inkludere ett eller flere OAuth2 scopes i JWT-grantet
- [ ] 🔒 **Krav:** Sikre at `consumer` matcher `to`-claim i responsen — forhindrar uautorisert tilgang
- [ ] 🔒 **Krav:** Ved delegerte scopes: samtykket må vere gitt til den som har delegert scopet

## Generelt

- [ ] Forstå [samtykke-tokenets innhold](maskinporten_func_samtykke#respons): `id`, `from`, `to`, `consented`, `validTo`, `consentRights`
- [ ] 🔒 Sjekk `validTo` — bruk ikkje samtykke som er utløpt

## Ressurser

- [Samtykketoken i Maskinporten](maskinporten_func_samtykke)
- [Altinn: Samtykke for tjenesteeier](https://docs.altinn.studio/nb/authorization/guides/resource-owner/consent/)
- [Altinn: Kom igang med samtykke](https://docs.altinn.studio/nb/authorization/getting-started/consent/)
- [RFC 9396: Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/rfc9396/)
- [Maskinporten: Delegering](maskinporten_func_delegering)
