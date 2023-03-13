---
title: OAuth2 beskytta REST-API for innloggingshistorikk i ID-porten
description: API for innloggingshistorikk i ID-porten
summary: "Innbygger sin innloggingshistorikk fra ID-porten kan konsumeres via API og synliggjøres for innbygger i andre tjenester. Dette gir innbygger innsyn i bruk av egne data fraDigitaliseringsdirektoratets  løsninger"

sidebar: oidc
product: ID-porten
redirect_from: /oidc_api_logghistorikk
---

## Introduksjon

{% include note.html content="Dette APIet gir p.t. bare ut logghistorikk på gammel platform. " %}

Innbygger sin innloggingshistorikk fra ID-porten kan konsumeres via API og synliggjøres for innbygger i andre tjenester.

Kunden mottar opplysningene for at innbyggeren kan lettere deteketere misbruk av eID.

## Hvordan få tilgang ?

Denne tjenesten er en tilleggstjeneste i ID-porten. Se [Samarbeidsportalen](https://samarbeid.digdir.no) for generelle vilkår for tilleggstjenester.

## Brukergrensesnitt

Innbyggere kan gå til [https://brukerprofil.idporten.no/](https://brukerprofil.idporten.no/) for å se sin innloggingshistorikk.

## REST-grensesnittet

REST-grensesnittet er beskyttet med Oauth2 og er basert på at innkommende access token tilhører innlogget bruker,  såkalt  [autentiseringsnær autorisasjon](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_auth_oauth2.html), kunden skal derfor ikke oppgi fødselsnummer selv.

Følgende Oauth2 scopes aksepteres av grensesnittet:

| scope | beskrivelse |
| - | - |   
| `idporten:user.log.read`  |  Lese ut innloggingshistorikk  som innlogget bruker har til mine tjenester  |


Kunden får kun se innloggingshistorikk til tjenester tilknyttet eget organisasjonsnummer.

Grensesnittet er dokumenter vha. Swagger [https://api.idporten-ver2.difi.no/innlogginger/swagger-ui.html#/](https://api.idporten-ver2.difi.no/innlogginger/swagger-ui.html#/).

URL til tjenesten:

| Miljø | URL |
|-|-|
|PROD  | https://api.idporten.difi.no/innlogginger/logg/idporten  |
|VER1  | https://api.idporten-ver1.difi.no/innlogginger/logg/idporten |
|VER2  | https://api.idporten-ver2.difi.no/innlogginger/logg/idporten  |
|YT2   | https://api.idporten-yt2.difi.eon.no/innlogginger/logg/idporten |

## Eksempel

```
GET /innlogginger/logg/idporten?maxhits=5 HTTP/1.1
Authorization: Bearer U_3uI4GjxKbhc4jo54mbnozbSZdHLyw28ZQGnxsScmI=

[
    {
        "tidspunkt": "2019-03-07T09:26:36",
        "tjeneste": "DIREKTORATET FOR FORVALTNING OG IKT",
        "eid": "MinID PIN",
        "integrasjon_id": "oidc_authorization_api_client_test",
        "orgno": "991825827"
    },
    {
        "tidspunkt": "2019-03-06T16:04:40",
        "tjeneste": "DIREKTORATET FOR FORVALTNING OG IKT",
        "eid": "Federated",
        "integrasjon_id": "oidc_authorization_api_client_test",
        "orgno": "991825827"
    }
]

```
