---
title: Server-to-server API-autorisasjon med Oauth2
description: Server-to-server API-autorisasjon med Oauth2
summary: 'Maskinporten brukes til å autorisere tilgang til API-er mellom virksomheter.  Dette er basert på såkalt "server-to-server oauth2"-oppførsel.'

sidebar: maskinporten_sidebar
product: Maskinporten
---

## Introduksjon

Maskinporten tilbyr funksjonalitet for server-til-server autorisasjon av API'er basert på [RFC7523 JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants](https://tools.ietf.org/html/rfc7523).

<div class="mermaid">
graph LR
  subgraph API-tilbyder
    API
  end
  subgraph Difi
    Maskinporten[Maskinporten]
  end
  subgraph Konsument
     ny[Tjeneste]
  end
  Maskinporten -->|2.utsteder token|ny
  ny -->|1. forspør tilgang|Maskinporten
  ny -->|3.bruker token mot|API
</div>

Konsumenter og API-tilbydere kan bruke denne funksjonaliteten for å styre tilgang i de tilfellene der informasjonsverdiene APIet tilbyr er regulert av lovhjemmel, og ikke krever samtykke av brukeren.

## Beskrivelse av flyt

<div class="mermaid">
sequenceDiagram
  note over Klient:  Generer og signer JWT
  Klient ->> Maskinporten: Bruk JWT til å forespørre token
  note over Maskinporten: Valider virksomhetssertifikat og utfør tilgangskontroll
  Maskinporten ->> Klient: Returnere access_token
  Klient ->> API: Bruk token mot API
  API ->> Klient: Resultat av API-kall

</div>


I dette scenariet ønsker en **klient** å bruke en **ressurs (API)** tilbudt av en **ressursserver**. Tilgangen (autorisasjonen) til api'et blir utstedt av en **autorisasjonsserver**, i dette tilfellet Maskinporten. For å aksessere ressursen må klienten forespørre et access_token fra autorisasjonsserveren som klienten så kan bruke til aksessere den aktuelle ressursen.

* Flyten starter med at klienten må generere en **JWT-basert tokenforespørsel** (JWT-bearer authorization grant). Denne inneholder informasjon om hvilke ressurser (*scope*) klienten ønsker å aksessere og blir signert med klienten sitt virksomhetssertifikat.

* Når autorisasjonsserveren mottar tokenforespørselen vil den først **validere gyldigheten av JWT'en**. Deretter vil virksomhetssertifikatet (brukt til signering av JWT'en) valideres og en **implisitt klientautentisering** utføres på bakgrunn av dette.

* Dersom den autentiserte klienten har tilgang til de forespurte ressursene returneres et **self-contained access_token** til klienten

* Klienten kan nå aksessere den ønska ressursen ved bruk av access_tokenet.

* Ressursserveren må nå validere det mottatte access_tokenet lokalt.

* Dersom access_tokenet er gyldig kan det forespurte ressursen returneres til klienten.

## 1. Generere JWT

Klienten må generere og signere ein JWT for å forespørre tokens fra autorisasjonsserveren.  For komplett dokumentasjon, se [grensesnittspesifikasjon for JWT-grant]({{site.baseurl}}/docs/Maskinporten/maskinporten_protocol_jwtgrant)

Selve grantet kan se slik ut:

```
{
  "x5c": [ "MIIFETCCA/mgAwIB``````EefETzAxjqBHM=" ],
  "alg": "RS256"
}
.
{
  "aud": "https://ver2.maskinporten.no/",
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

Se [detaljert grensesnittspesifikasjon  av /token-endepunktet]({{site.baseurl}}/docs/Maskinporten/maskinporten_protocol_token).


Eksempel på forespørsel:

```
POST /token
Content-type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=<jwt>
```

&nbsp;


Dersom Maskinporten godtok forespørselen, får klienten et access_token tilbake, tokenet er bundet til organisasjonsnummeret til klienten.   Tokenet er alltid en self-contained JWT, og body vil typisk vil se slik ut etter dekoding:
```
{
  "iss" : "https://ver2.maskinporten.no/",
  "client_amr" : "virksomhetssertifikat",
  "token_type" : "Bearer",
  "aud" : "unspecified",
  "consumer" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:910753614"
  }
  "scope" : "difitest:test2",
  "exp" : 1578924303,
  "iat" : 1578923303,
  "jti" : "QPdTeNlE-RtrNczkCIZ0yAoSzJSIC3Jo7L6B_PmY2X4",
  ...
}
```

#### Eksempel på self-contained acces token ved bruk av delegering i Altinn:

TODO:


## Eksempel på generering av JWT for token-forespørsel i Java

Nimbus JOSE + JWT er et hendig bibliotekt for å håndtere jwt'er i JAVA , se [http://connect2id.com/products/nimbus-jose-jwt](http://connect2id.com/products/nimbus-jose-jwt)

Venligst se [https://github.com/difi/jwt-grant-generator](https://github.com/difi/jwt-grant-generator)  for eksempel på hvordan korrekt generer en slik JWT i Java.

For .net og andre platformer gir [jwt.io](http://jwt.io) en fin oversikt over tilgjengelige biblioteker
