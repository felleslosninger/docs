---
title: Server-to-server API-autorisasjon med Oauth2
description: Server-to-server API-autorisasjon med Oauth2
summary: 'Maskinporten brukes til å autorisere tilgang til API-er mellom virksomheter.  Dette er basert på såkalt "server-to-server oauth2"-oppførsel.'
permalink: maskinporten_auth_server-to-server-oauth2.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

## Introduksjon

ID-porten sin OpenID Connect provider tilbyr funksjonalitet for server-til-server autorisasjon av API'er basert på [RFC7523 JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants](https://tools.ietf.org/html/rfc7523).

<div class="mermaid">
graph LR
  subgraph 3djepart
    API
  end
  subgraph Difi
    OIDC[OIDC Provider]
  end
  subgraph Kunde
     ny[Tjeneste]
  end
  OIDC -->|2.utsteder token|ny
  ny -->|1. forspør tilgang|OIDC
  ny -->|3.bruker token mot|API
</div>

Kunder og API-eiere kan bruke denne funksjonaliteten for å styre tilgang i de tilfellene der informasjonsverdiene APIet tilbyr er regulert av lovhjemmel, og ikke krever samtykke av brukeren.

## Beskrivelse av flyt

<div class="mermaid">
sequenceDiagram
  note over Klient:  Generer og signer JWT
  Klient ->> OpenID Provider: Bruk JWT til å forespørre token
  note over OpenID Provider: Valider virksomhetssertifak og utfør tilgangskontroll
  OpenID Provider ->> Klient: Returnere access_token
  Klient ->> API: Bruk token mot API
  opt eventuelt
    API ->> OpenID Provider: validere token
    OpenID Provider ->> API: token info
  end
  API ->> Klient: Resultat av API-kall

</div>


I dette scenariet ønsker en **klient** å bruke en **ressurs (API)** tilbudt av en **ressursserver**. Tilgangen (autorisasjonen) til api'et blir utstedt av en **autorisasjonsserver**, i dette tilfellet ID-portens OpenID Connect Provider. For å aksessere ressursen må klienten forespørre et access_token fra autorisasjonsserveren som klienten så kan bruke til aksessere den aktuelle ressursen.

* Flyten starter med at klienten må generere en **JWT-basert tokenforespørsel** (JWT-bearer authorization grant). Denne inneholder informasjon om hvilke ressurser (*scope*) klienten ønsker å aksessere og blir signert med klienten sitt virksomhetssertifikat.

* Når autorisasjonsserveren mottar tokenforespørselen vil den først **validere gyldigheten av JWT'en**. Deretter vil virksomhetssertifikatet (brukt til signering av JWT'en) valideres og en **klientautentisering** utføres på bakgrunn av dette.

* Dersom den autentiserte klienten har tilgang til de forespurte ressursene returneres et **access_token** til klienten

* Klienten kan nå aksessere den ønska ressursen ved bruk av access_tokenet.

* Ressursserveren må nå validere det mottatte access_tokenet mot autorisasjonsservern sitt tokeninfo-endepunkt.  Dersom tokenet er såkalt self-contained, er dette steget unødvendig.

* Dersom access_tokenet er gyldig kan det forespurte ressursen returneres til klienten.

## 1. Generere JWT

Klienten må generere og signere ein JWT for å forespørre tokens fra autorisasjonsserveren.  For komplett dokumentasjon, se [grensesnittspesifikasjon for JWT-grant](maskinporten_protocol_jwtgrant.html)

Selve grantet kan se slik ut:

```
{
  "x5c": [ "MIIFETCCA/mgAwIB``````EefETzAxjqBHM=" ],
  "alg": "RS256"
}
.
{
  "aud": "https://oidc-test1.difi.eon.no/idporten-oidc-provider/",
  "scope": "global/kontaktinformasjon.read global/varslingsstatus.read global/navn.read global/postadresse.read global/sertifikat.read",
  "iss": "test_rp",
  "exp": 1520589928,
  "iat": 1520589808,
  "jti": "415ec7ac-33eb-4ce3-bc86-6ad40e29768f"
}
.
<<signaturverdi>>
```


## 2. Send JWT til /token-endepunktet

Se [detaljert grensesnittspesifikasjon  av /token-endepunktet](maskinporten_protocol_token.html).


Eksempel på forespørsel:

```
POST /token
Content-type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=<jwt>
```

&nbsp;


Dersom OIDC-provideren godtok forespørselen, får klienten et access_token tilbake, tokenet er bundet til organisasjonsnummeret til klienten.   Tokenet er enten by-reference eller self-contained, dette avhenger av hvilke scopes som be forespurt:

#### Eksempel på by-reference access token respons:

```
{
    "access_token": "fK0dhs5vQsuAUguLL2wxbXEQSE91XbOAL3foY5VR0Uk=",
    "expires_in": 599,
    "scope": "global/kontaktinformasjon.read"
}
```

#### Eksempel på self-contained access-token :
Dersom klienten derimot er konfigurert til å motta self-contained access-tokenet, vil access_tokenet være en JWT:
```
eyJraWQiOiJIdFlaMU1UbFZXUGNCV0JQVWV3TmxZd1RCRklicU1Hb081OFJ4bmN6TWJNIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJ0ZXN0X3JwIiwic2NvcGUiOiJnbG9iYWxcL2tvbnRha3RpbmZvcm1hc2pvbi5yZWFkIGdsb2JhbFwvcG9zdGFkcmVzc2UucmVhZCBnbG9iYWxcL3NlcnRpZmlrYXQucmVhZCBnbG9iYWxcL3ZhcnNsaW5nc3N0YXR1cy5yZWFkIGdsb2JhbFwvbmF2bi5yZWFkIiwiaXNzIjoiaHR0cHM6XC9cL29pZGMtdGVzdDEuZGlmaS5lb24ubm9cL2lkcG9ydGVuLW9pZGMtcHJvdmlkZXJcLyIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJleHAiOjE1MjA1OTA0MDksImlhdCI6MTUyMDU4OTgwOSwiY2xpZW50X29yZ25vIjoiOTkxODI1ODI3IiwianRpIjoid1RCWUM3RTJ6RjZ2bWZsaFFtOE9ZRjlXUXlZUkFpMkV1SmVuUXNJbzlraz0ifQ.TyhXLD-ibFjtVWQuXaEdnXbX9bJ0FBomscjudVNeFbGVYXTeJ7pe-Z7mxINgiiWjYE1U9ochMMyNAsqYmnZu7rZOOi_nQ_2c_E4hVFdOtv4NAwGDxXFUXlPUdcbpOdaW0Hint6Izd1xKwW3wzt7uG_RR1xdNw9JAUiZj0cHO4Rlgy2EJI6xL2DdGWSX7E4oD5bdEetj4aeqrWuV0CEob-demfe5stRs6PS93MPgQydKcX4RLFAsoY44Q5skF_k53md9Lq4pcyAzEg8so4A_Q96rj8gGuprtQI6t_9fRkeZAbBqRV8YQalAS0czXqRCg4Onc4XQdZSODKzqwyMIn6wQ
```
som typisk vil se slik ut etter dekoding:
```
{
  "kid": "HtYZ1MTlVWPcBWBPUewNlYwTBFIbqMGoO58RxnczMbM",
  "alg": "RS256"
}
.
{
  "aud": "test_rp",
  "scope": "global/kontaktinformasjon.read global/postadresse.read global/sertifikat.read global/varslingsstatus.read global/navn.read",
  "iss": "https://oidc-test1.difi.eon.no/idporten-oidc-provider/",
  "token_type": "Bearer",
  "exp": 1520590409,
  "iat": 1520589809,
  "client_orgno": "991825827",
  "jti": "wTBYC7E2zF6vmflhQm8OYF9WQyYRAi2EuJenQsIo9kk="
}.
<<signaturverdi>>
```

#### Eksempel på self-contained acces token ved bruk av leverandør:

TODO:


### 3. Validering av token mot /tokeninfo-endepunkt

Se [detaljert dokumentasjon av /tokeninfo-endepunktet](oidc_protocol_tokeninfo.html).
#### Eksempel på request:

```
POST /tokeninfo
Content-type: application/x-www-form-urlencoded

token=fK0dhs5vQsuAUguLL2wxbXEQSE91XbOAL3foY5VR0Uk=
```


#### Eksempel på en respons ved suksessfull validering av token:

```
{
    "active": true,
    "token_type": "Bearer",
    "expires_in": 556,
    "exp": 1477990301,
    "iat": 1477989701,
    "scope": "global/kontaktinformasjon.read",
    "client_id": "test_rp",
    "client_orgno": "991825827"
}
```


#### Eksempel på en respons ved feilet validering av token:

```
{
    "active": false
}  
```

## Eksempel på generering av JWT for token-forespørsel i Java

Nimbus JOSE + JWT er et hendig bibliotekt for å håndtere jwt'er i JAVA , se [http://connect2id.com/products/nimbus-jose-jwt](http://connect2id.com/products/nimbus-jose-jwt)

Venligst se [https://github.com/difi/jwt-grant-generator](https://github.com/difi/jwt-grant-generator)  for eksempel på hvordan korrekt generer en slik JWT i Java.

For .net og andre platformer gir [jwt.io](http://jwt.io) en fin oversikt over tilgjengelige biblioteker
