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

Metoden gjør det vanskeligere for en angriper å bruke tokens som er blitt stjålet, for eksempel via man-in-the-middle-angrep. Et vanlig token kan brukes av hvem som helst som får tak i det via lekkasje eller lignende, før det går ut på tid.

DPoP er definert i [RFC9449](https://datatracker.ietf.org/doc/html/rfc9449), og vi henviser til denne for detaljert dokumentasjon.

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

### Eksempel 
Et DPoP-bevis skl inkluderes i http headeren med navn DPoP i alle kall til token-endepunktet og i alle kall til API-er som krever DPoP.
DPoP headeren heter DPoP og innholdet er DPoP-beviset i base64-format.
```
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7Imt0eSI6Ik\
 VDIiwieCI6Imw4dEZyaHgtMzR0VjNoUklDUkRZOXpDa0RscEJoRjQyVVFVZldWQVdCR\
 nMiLCJ5IjoiOVZFNGpmX09rX282NHpiVFRsY3VOSmFqSG10NnY5VERWclUwQ2R2R1JE\
 QSIsImNydiI6IlAtMjU2In19.eyJqdGkiOiItQndDM0VTYzZhY2MybFRjIiwiaHRtIj\
 oiUE9TVCIsImh0dSI6Imh0dHBzOi8vc2VydmVyLmV4YW1wbGUuY29tL3Rva2VuIiwia\
 WF0IjoxNTYyMjYyNjE2fQ.2-GxA6T8lP4vfrg8v-FdWP0A0zdrj8igiMLvqRMUvwnQg\
 4PtFLbdLXiOSsX0x7NVY-FNyJK70nfbV37xRZT3Lg
```
Når man dekoder DPoP-beviset ser det slik ut:
```
{
  "typ": "dpop+jwt",
  "alg": "ES256",
  "jwk": {
    "kty": "EC",
    "x": "l8tFrhx-34tV3hRICRDY9zCkDlpBhF42UQUfWVAWBFs",
    "y": "9VE4jf_Ok_o64zbTTlcuNJajHmt6v9TDVrU0CdvGRDA",
    "crv": "P-256"
  }
}.
{
  "jti": "-BwC3ESc6acc2lTc",
  "htm": "POST",
  "htu": "https://server.example.com/token",
  "iat": 1562262616
}.
{
[Signatur]
}

```
* `typ`: skal alltid være `dpop+jwt`
* `alg`: viser hvilken signerings algoritme som ble brukt
* `jwk`: inneholder den offentlige nøkkelen på Json Web Key format
* `htm`: er http-metoden, f.eks POST
* `htu`: er url'en som må matche den ressursen man ønsker å bruke
* `iat`: er en Unix timestamp som forteller når JWT-en ble opprettet

JWT'en signeres med privat-nøkkelen som hører til den offentlige nøkkelen. Man må ta vare på den private nøkkelen på en trygg måte.

Responsen vil se slik ut:
```
{
 "access_token": "Kz~8mXK1EalYznwH-LC-1fBAo.4Ljp~zsPE_NeO.gxU",
 "token_type": "DPoP",
 "expires_in": 2677,
 "refresh_token": "Q..Zkm29lexi8VnWg2zPW1x-tgGad0Ibc3s3EwM_Ni4-g"
}
```
Og i access tokenet vil det være en thumbprint av den offentlige nøkkelen:
```
{
  "sub":"xxx",
  "iss":"https://idporten.no",
  "nbf":1562262611,
  "exp":1562266216,
  "cnf":
  {
    "jkt":"0ZcOCORZNYy-DWpqq30jZyJGHTN0d2HglBV3uiguA4I"
  }
```
Etter token response:
* `ath`: Når man så skal bruke det dpop-bundne tokenet, må man inkludere en hash av tilgangstokenet i claimet 
* `nonce`: Dersom det kommer en nonce-verdi i token responsen, må DPoP-beviset også inneholde det.

Eksempel på API-forespørsel:
```
GET /protectedresource HTTP/1.1
Host: resource.example.org
Authorization: DPoP Kz~8mXK1EalYznwH-LC-1fBAo.4Ljp~zsPE_NeO.gxU
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7Imt0eSI6Ik\
 VDIiwieCI6Imw4dEZyaHgtMzR0VjNoUklDUkRZOXpDa0RscEJoRjQyVVFVZldWQVdCR\
 nMiLCJ5IjoiOVZFNGpmX09rX282NHpiVFRsY3VOSmFqSG10NnY5VERWclUwQ2R2R1JE\
 QSIsImNydiI6IlAtMjU2In19.eyJqdGkiOiJlMWozVl9iS2ljOC1MQUVCIiwiaHRtIj\
 oiR0VUIiwiaHR1IjoiaHR0cHM6Ly9yZXNvdXJjZS5leGFtcGxlLm9yZy9wcm90ZWN0Z\
 WRyZXNvdXJjZSIsImlhdCI6MTU2MjI2MjYxOCwiYXRoIjoiZlVIeU8ycjJaM0RaNTNF\
 c05yV0JiMHhXWG9hTnk1OUlpS0NBcWtzbVFFbyJ9.2oW9RP35yRqzhrtNP86L-Ey71E\
 OptxRimPPToA1plemAgR6pxHF8y6-yqyVnmcw6Fy1dqd-jfxSYoMxhAJpLjA
```
der DPoP-beviset ser slik ut når man dekoder det:
```
{
  "typ":"dpop+jwt",
  "alg":"ES256",
  "jwk": {
    "kty":"EC",
    "x":"l8tFrhx-34tV3hRICRDY9zCkDlpBhF42UQUfWVAWBFs",
    "y":"9VE4jf_Ok_o64zbTTlcuNJajHmt6v9TDVrU0CdvGRDA",
    "crv":"P-256"
  }
}
.
{
  "jti":"e1j3V_bKic8-LAEB",
  "htm":"GET",
  "htu":"https://resource.example.org/protectedresource",
  "iat":1562262618,
  "ath":"fUHyO2r2Z3DZ53EsNrWBb0xWXoaNy59IiKCAqksmQEo"
}
```



Vi anbefaler å bruke et bibliotek. Se eksempler i java [her](https://connect2id.com/products/nimbus-oauth-openid-connect-sdk/examples/oauth/dpop)

---

For hjelp eller spørsmål, ta kontakt via Digdirs supportkanaler. 
