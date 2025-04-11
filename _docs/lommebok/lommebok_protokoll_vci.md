---
title: Protokoll-flyt for å laga bevis
description: Protokoll-flyt for OpenID4VCI

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_protokoll_vci
---

På denne sida forsøker me å forklara protokoll-flyten du må følgje som utstedar når du skal laga eit bevis som skal inn i lommeboka.   Dersom du er data-eigar 

Protokollen er basert på [OpenID4VCI-standarden](https://openid.github.io/OpenID4VCI/openid-4-verifiable-credential-issuance-wg-draft.html). Standarden er framleis under utvikling, men er planlagd å nå Final innan sumaren 2025.  Firmaet Authlete har publisert ein veldig god og detaljert [tutorial for bruk av VCI-standarden](https://www.authlete.com/developers/oid4vci/).


Ein VCI-flyt er i praksis ein vanleg OpenID Connect-flyt som er utvida med eit ekstra steg der lommeboka hentar sjølve beviset frå ein **Credential Issuer**.   Lommeboka opptrer altså som OIDC-klient.

Standarden opnar for at Credential Issuer anten kan vere ein sjølvstendig komponent, eller den kan vere innbygd funksjonalitet i ein eksisterande autorasasjons-server (som ID-porten).


## I praktisk bruk

Lommeboka må på ein eller annan måte få kunnskap om KVAR den kan få tak i eit bevis av ein gitt type. Dette kan i hovsak skje på to måtar:

1. For "populære" bevis, som t.d. førarkort eller digital pass, so forventer me at lommebøkene vil kome med **førehandskonfigurerte lenker**, slik at brukaren t.d. klikkar på "Hent førarkortet mitt" inni appen for å starte protokoll-flyten. 
2. For andre bevis so må brukaren logge inn til ei nett-teneste tilhøyrande bevis-utstedar.   Lommeboka vil bli trigga til å starte protokoll-flyten anten ved at brukaren scanner ein QR-kode, eller ved direkte-kommunisjon vha. [Digital Credentials](https://wicg.github.io/digital-credentials/) browser-APIet, eventuelt via nærleiksdeteksjon via NFC eller bluetooth-LE. 


## Pre-authorized flow

Me trur at alternativ #2 ovanfor vil verte den mest vanlege måten å utstede bevisa på.  Denne flyten skiljer seg sopass mykje frå vanleg OIDC at den har fått eit eige namn: **pre-authorized code flow**.   Skilnadane er følgjande: 
1) Autentisering med eID skjer normalt før OIDC-flyten startar
2) OIDC-flyten startar ved at utstedaren lagar eit sokalla *Credential Offer* 
3) Lommeboka går direkte på /token-endepunktet til autorisasjonsserveren, det er mao. ingen browser-redirects via /authorize-endepunktet involvert.

Flyten kan illustrerast slik:

<div class="mermaid">

sequenceDiagram

  actor b as Brukar
  participant l as Lommebok
  participant u as Utstedar
  participant a as Autorisasjonsserver

  b-->>u: går til webside
  note over b, a: Autentisering
  b-->>u: Velger bevis
  
  activate u
  u-->>+u: klargjere bevis

  u->>l: Credential Offer 
  l->>+a: /token (pre-auth.code)
  a-->>-l: access_token

  l->>+u: Credential Request (access_token, proofs)
  u-->>-l: utstedt bevis
  deactivate u

</div>

Eit credential offer ser typisk slik ut:
```
{
  "grants" : {
    "urn:ietf:params:oauth:grant-type:pre-authorized_code" : {
      "pre-authorized_code" : "51f7434f-3652-416d-bd7f-daa08d9e401e",
      "tx_code" : {
        "length" : 4,
        "description" : "Please provide the one-time code given to you",
        "input_mode" : "numeric"
      }
    }
  },
  "credential_configuration_ids" : [ "no.digdir.eudiw.pid_mso_mdoc" ],
  "credential_issuer" : "https://demo-vc-issuer.idporten.dev"
}
```

Her kan me merke oss claimet `credential_configuration_ids` som fortel kva bevis som er tilbode.  Verdien peiker på ein førehandsdefinert bevis-type `no.digdir.eudiw.pid_mso_mdoc` (i dette tilfellet norsk variant av ID-dokument i mdoc-format) som saman med `pre_authorized_code` unikt lenkar til akkurat denne brukaren sitt bevis. 

<details><summary>Detaljert definisjon av credential id metadata</summary>
<code>
    "no.digdir.eudiw.pid_mso_mdoc": {
      "doctype": "eu.europa.ec.eudi.pid.1",
      "scope": "no.digdir.eudiw.pid_mso_mdoc",
      "cryptographic_binding_methods_supported": [
        "jwk"
      ],
      "display": [
        {
          "name": "Norwegian PID",
          "locale": "en"
        }
      ],
      "format": "mso_mdoc",
      "claims": {
        "eu.europa.ec.eudi.pid.1": {
          "personal_administrative_number": {
            "display": [
              {
                "name": "Norwegian F-/D-number",
                "locale": "en"
              }
            ],
            "mandatory": true
          },
          "given_name": {
            "display": [
              {
                "name": "Given name",
                "locale": "en"
              }
            ],
            "mandatory": true
          },
          "family_name": {
            "display": [
              {
                "name": "Family name",
                "locale": "en"
              }
            ],
            "mandatory": true
          }
        }
      },
      "proof_types_supported": {
        "jwt": {
          "proof_signing_alg_values_supported": [
            "ES256"
          ]
        }
      },
      "policy": {
        "one_time_use": true
      }
    }
  },
</code>
</details>


TODO: døme

[//]: # (FORSØK Å GJE EI GOD FORKLARING AV CREDENTIAL OFFER.  BØR DEI BRUKE DET, ELLER IKKJE ?)

[//]: # (FORKLARE KEY BINDING OG KORLEIS EIN (KANKSJE) TRENG FUNKSJONELL STØTTE I AS (les ID-porten) FOR Å KUNNE UTSTEDE DETTE.)

 [//]: # (tranction data, kombinert VP+VCI)
 

LEGG FLYTSKJEMA

LAGE EKSEMPLER






