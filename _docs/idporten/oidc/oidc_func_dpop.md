---
title: DPoP
description: ID-portens funksjonalitet for DPoP - Demonstration of Proof of Possession
summary: "DPoP gir beskyttelse mot stjeling og misbruk av tokens ved å binde dem til klienten"
sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_dpop
---

## Om funksjonaliteten

DPoP - Demonstration of Proof of Possession - er en mekanisme som beskytter mot misbruk av tokens ved å binde dem kryptografisk til klienten som hentet dem.

Metoden gjør det vanskeligere for en angriper å bruke tokens som er blitt stjålet, for eksempel via man-in-the-middle-angrep.

DPoP er definert i [RFC9449](https://datatracker.ietf.org/doc/html/rfc9449), og vi henviser til denne for detaljert dokumentasjon.
Vi anbefaler å bruke et bibliotek. Se eksempler i java [her](https://connect2id.com/products/nimbus-oauth-openid-connect-sdk/examples/oauth/dpop)

DPoP brukes slik:

1. Klienten genererer et DPoP JWT med kort levetid (f.eks 1 minutt) som er bundet til metode og url, og klienten signerer det med en privat nøkkel.
2. JWT-en sendes i `DPoP` http header sammen med kall mot /token.
3. ID-porten validerer at DPoP-headeren er korrekt signert og samsvarer med forespørselen.
4. Tilgangstokenet som returneres blir bundet til klientens offentlige nøkkel, og kan bare brukes sammen med gyldig DPoP-header.

DPoP krever at klienten har støtte for:

- Generering og håndtering av nøkkelpar (public/private). Nøkkelen kan autogeneres eller ligge på et trygt område avhengig av klienttype
- Signering av JWT-er
- Inkludering av `jwk`-felt i `DPoP` header

Tilgangstokenet man får i retur skal inneholde `cnf` med en `jkt` som er en "thumbprint" av den offentlige nøkkelen brukt tidligere.

Forespørsler mot API som støtter DPoP må bruke Authorization type DPoP og inkludere DPoP-proof i header.

### Refresh tokens med DPoP

Når DPoP benyttes, vil også refresh tokens være bundet til klientens offentlige nøkkel, *dersom* klienten ikke bruker klientautentisering.

Det innebærer:

- Refresh tokens kan kun brukes sammen med en gyldig DPoP-header som samsvarer med den opprinnelige nøkkelen.
- Ved rotering av nøkkelpar må nytt refresh token hentes med den nye nøkkelen.
- Klienter må derfor sørge for sikker og stabil nøkkelhåndtering over tid.

Dersom DPoP ikke brukes korrekt ved fornyelse av tokens, vil forespørselen bli avvist.

*NB: For klienter som bruker klientautenisering, kan man selv velge å bruke refresh tokenet til å få tilbake et tilgangstoken som er bundet til DPoP eller ikke.*


### API-støtte for DPoP

For at DPoP skal gi full sikkerhet, må også API-ene som tilgangstokenet brukes mot, støtte og validere DPoP-tokenbindingen.

Dette innebærer:

- **Access tokens må være DPoP-bundet**: API-et må forvente at tilgangstokenet kun kan brukes sammen med en gyldig `DPoP`-header i hver forespørsel.
- **Validering av DPoP-header**: API-et bør verifisere at:
    - JWT-en i `DPoP`-headeren er korrekt signert
    - `htm` og `htu`-feltene stemmer med HTTP-metoden og URL-en til API-kallet
    - JWT-en ikke er gjenbrukt (replay protection)
- **Bekreftelse av token-binding**: `cnf`-feltet i access token må inneholde en JWK thumbprint (`jkt`), som skal matche JWK i `DPoP`-headeren.
- **Respons ved feil**: Ved feil i DPoP-validering skal API-et returnere `401 Unauthorized` med `WWW-Authenticate` header som beskriver feilen, f.eks.:
  `WWW-Authenticate: DPoP error="invalid_token", error_description="DPoP proof is missing or invalid" `


API-leverandører må derfor sørge for:

- Biblioteker/verktøy som støtter DPoP-verifisering
- Mulighet til å hente `cnf`-feltet fra token
- Robust validering og feilhåndtering

### DPoP er valgfritt, men anbefales

Bruk av DPoP gir et ekstra lag med sikkerhet og er anbefalt for klienter som håndterer tokens på klientside (for eksempel JavaScript-applikasjoner).

Ingen konfigurering er nødvendig hos ID-Porten for å ta det i bruk foreløpig.

Dersom DPoP benyttes, må det brukes konsekvent – både ved innhenting av tokens og ved bruk av tokens mot API-er.


---

For utviklingshjelp eller spørsmål, ta kontakt via Digdirs supportkanaler. 
