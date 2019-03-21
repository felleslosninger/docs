---
title: REST-API for autorisasjoner i OIDC-provider
description: API for autorisasjoner i OIDC provider
summary: "Innbygger sine autorisasjoner i ID-portens OIDC provider er tilgjengelig på et REST-api, for kundens egen oversikt.  Typiske autorisasjoner er såkalte langt-levende innlogginger til mobil-apper."
permalink: oidc_api_autorisasjoner.html
sidebar: oidc
product: ID-porten
---

## Introduksjon

Enkelte av innbygger sine autorisasjoner i ID-porten OIDC provider er tilgjengelig på et enkelt REST-api.

Typiske autorisasjoner som er tilgjengelig over APIet er såkalte langt-levende innlogginger til mobil-apper, men teknisk er det slik at ethvert Oauth2 scope kan "tagges" for å synes på lista av scope-eier, og vil da bli tilgjengelig.

Kunden mottar opplysningene for å vise disse til innbygger i egne løsninger, og evt. gi innbygger anledning til å revokere en autorisasjonen.  Et annet typisk bruksmønster er der innbygger tar kontakt med kundens brukerstøtte, som da trenger å fjerne en autorisasjon på vegne av innbyggeren.

## Hvordan få tilgang ?

Denne tjenesten er en tilleggstjeneste i ID-porten. Se [https://samarbeid.difi.no/difis-felleslosninger/tilleggstjenester](https://samarbeid.difi.no/difis-felleslosninger/tilleggstjenester) for generelle vilkår for tilleggstjenester.


## REST-grensesnittet

REST-grensesnittet er beskyttet med Oauth2 og er basert på at innkommende access token tilhører innlogget bruker,  såkalt  [autentiseringsnær autorisasjon](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_auth_oauth2.html), kunden skal derfor ikke oppgi fødselsnummer selv.

Følgende Oauth2 scopes aksepteres av grensesnittet:

| scope | beskrivelse |
| - | - |   
| `idporten:authorizations.read`  |  Lese ut alle autorisasjoner som innlogget bruker har til mine tjenester  |
| `idporten:authorizations.revoke`  | Som over, men fir i tillegg mulighet til å slette en autorisasjon  |


Grensesnittet er dokumentert ihht OpenAPI her: [https://api.idporten-ver2.difi.no/authorizations#swagger-ui.html](https://api.idporten-ver2.difi.no/authorizations#swagger-ui.html).

URL til tjenesten:

| Miljø | URL |
|-|-|
|PROD  | https://api.idporten.difi.no/authorizations  |
|VER1  | https://api.idporten-ver1.difi.no/authorizations |
|VER2  | https://api.idporten-ver2.difi.no/authorizations  |
|YT2   | https://api.idporten-yt2.difi.eon.no/authorizations |

REST-grensesnittet tilbyr to hovedmetoder:

### Hente innbyggers autorisasjoner

Dette kallet henter alle innbyggers synlige autorisasjoner til klienter (tjenester) som tilhører kundens organisasjonsnummer.  Eksempel:

```
GET /authorizations
Authorization: Bearer xxxxx

[
    {
        "authorization_id": "oHZZlFkupHTerMfC6uyHPMHXF_stX7wFwFMvq4reaC4=",
        "client_id": "oidc_authorization_api_client_test",
        "client_name": "En eksempel-tjeneste hos Difi",
        "authorized_at": 1551358681942,
        "expires": 1581358681942,
        "scopes": [
            {
                "name": "idporten:authorizationstest.read",
                "description": "Hei, jeg er en synlig autorisasjon!"
            }
        ],
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36"
    }
]

```

Autorisasjonene kan tilhøre scopes som kunden selv eier, samt scopes som eies av en tredjepart.


### Slette en autorisasjon

Normalt vil en kunde slette en autorisasjon ved at klienten som fikk utstedt det aktuelle tokenet kaller /revoke-endepunktet til ID-porten med tokenet (access eller fortrinnvis refresh) som skal slettes.

Dette API-kallet gir derimot kunden anledning til å revokere fra en annen klient enn den som fikk tokenet utdelt.  Ved sletting av autorisasjon, blir alle tilhørende aktive access_token og refresh_token invalideret.   (Merk at evt. allerede utstedte self-contained access_token fremdeles vil fremstå som gyldige, dersom de ikke valideres via nettverkskall mot ID-portens /tokeninfo-endepunkt).

```
DELETE /authorizations/{authorization_id}
Authorization: Bearer yyyyy
```
Bearer-tokenet i forespørselen må ha `idporten:authorizations.revoke` scope.
