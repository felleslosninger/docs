---
title: Protokoll-flyt for å motta bevis
description: Protokoll-flyt for OpenID4VP

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_protokoll_vp
---

På denne sida forsøker me å forklara protokoll-flyt du må følgje som eit brukastad, når du ynskjer at innbyggeren skal presentere eit bevis til deg.

Protokollen er basert på [OpenID4VP-standarden](https://openid.github.io/OpenID4VP/openid-4-verifiable-presentations-wg-draft.html).

Overordna så består flyten av fylgjande steg:

1. Brukerstaden (relying party) må først registrere seg hjå ein Registrar 
2. Brukerstaden konstruerer ein sokalla VP-request og sender denne til lommeboka.  Dette kan skje på 2 måtar.
3. Brukaren opnar lommeboka og godkjenner presentasjon av beviset
4. Lommeboka sender bevis-presentasjonen til brukerstaden

## Oppsett og registrering

Alle brukerstader skal vere registrert på førehand. Krava rundt registrering finn me i [rettsakt for RP-registerering, C/2025/2621](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32025R0848&qid=1749119392688), og der informasjonen som skal registrerast finn du i Annex I.  I praksis er dette verksemdsnamn, orgnummer, og eit par andre felt. 

Ein kan spesielt merke seg at det skal registrerast kva **persondata** (bevistype, eller enkeltattributter frå bevis) som brukerstaden kjem til å førespørje, og **formålet** ved å etterspørje desse dataene. 

For sandkassen registrerer du deg førebels ved å sende epost til Digdir (servicedesk@...), men på sikt vil det kome ei sjølvbetjeningsløysing.  Som del av registreringsprosessen vil du motta to sertifikater som må brukast når du etterspør bevis frå lommebøkene til innbyggarane:  

 - Eitt **tilgangssertifikat** (Relying Party Access Certificate, RPAC) som vert nytta til å autentisere deg opp mot lommeboka
 - Eitt **registreringssertikat** (Relying Party Registration Certificate, RPRC)  som fortel kva data du har registrert at du vil førespørje.

Du må sjølv lage privatnøkkel til desse sertifikata før du gjennomfører registreringa, og basert på denne lage ei [CSR-fil](https://en.wikipedia.org/wiki/Certificate_signing_request) som du inkluderer med søknaden.

TODO: openssl-kommandoar for å lage CSR slik Digdir vil ha den.


## Lage VP-request


skriv om 
cross device
same device

rendrer denne til dømes som ein QR-kode på eiga nettside


Her er eit døme på å etterspørre kun "er over 18 år"-attributtet frå ID-beviset til innbyggaren:

```
  // Kva attributter og bevis du vil ha ?
  "presentation_definition" : {
    "input_descriptors" : [ {
      "purpose" : "We need to verify your identity",
      "name" : "EUDI PID",
      "format" : {
        "mso_mdoc" : {
          "alg" : [ "RS256", "ES256", "ES384" ]
        }
      },
      "id" : "eu.europa.ec.eudi.pid.1",
      "constraints" : {
        "fields" : [ {
          "intent_to_retain" : false,
          "path" : [ "$['eu.europa.ec.eudi.pid.1']['age_over_18']" ]
        } ]
      }
    } ],
    "id" : "3787345f-9460-4d14-acff-28e3b2217e1a"
  },

  // metadata for ditt brukersted:
  "client_metadata" : {
    "authorization_encrypted_response_alg" : "ECDH-ES",
    "authorization_encrypted_response_enc" : "A128CBC-HS256",
    "jwks_uri" : "https://demo-brukersted.test.eidas2sandkasse.net/jwks",
    "vp_formats" : {
      "mso_mdoc" : {
        "alg" : [ "RS256", "ES256", "ES384" ]
      }
    },
    "id_token_signed_response_alg" : "RS256"
  },

  //oauth-spesifikke claims for 

  "client_id" : "x509_san_dns:demo-brukersted.test.eidas2sandkasse.net",
  "response_uri" : "https://demo-brukersted.test.eidas2sandkasse.net/response",
  "client_id_scheme" : "x509_san_dns",
  "aud" : "https://self-issued.me/v2",

  "iss" : "issuer",
  "response_type" : "vp_token",
  "nonce" : "nonceval",
  "response_mode" : "direct_post.jwt",

  // oauth2-spesifikke claims for akkurat denne forespørselen:
  "state" : "2c7e983b-ebde-49ff-974e-7aea1dbd0189",
  "exp" : 1749120685,
  "iat" : 1749120565,
  "jti" : "f376e4a1-2c2e-4976-b322-f9c1a115f66d"



}
```


