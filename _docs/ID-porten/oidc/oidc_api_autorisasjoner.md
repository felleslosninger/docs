---
title: REST-API for autorisasjoner i OIDC-provider
description: API for autorisasjoner i OIDC provider
summary: "Innbygger sine autorisasjoner i ID-portens OIDC provider er tilgjengelig på et REST-api, for kundens egen oversikt.  Typiske autorisasjoner er såkalte langt-levende innlogginger til mobil-apper."
permalink: oidc_api_autorisasjoner.html
sidebar: oidc
product: ID-porten
---

## Introduksjon

Innbygger sine aktive autorisasjoner i ID-porten OIDC provider er tilgjengelig på et enkelt REST-api.

Typiske autorisasjoner som er tilgjengelig over APIet er autorisasjoner der innbygger har gjennom gitt eksplisitt tilgang til brukerstyrt datadeling, dvs. har innbygger har blitt vist en tilgangsdialog og trykket "godkjenn".  API-tilbyr dog filtreringsmuligheter slik at kunde kan hente andre typer autorisasjoner.

Kunden mottar opplysningene for å vise disse til innbygger i egne løsninger, og evt. gi innbygger anledning til å revokere en aktiv autorisasjonen fra kundens egen selvbetjeningsløsning.  Et annet typisk bruksmønster er der innbygger tar kontakt med kundens brukerstøtte, som da trenger å fjerne en autorisasjon på vegne av innbyggeren.

#### Bruk av fellesløsning

Dersom ikke kunden ønsker å bygge eget brukergrensesnitt, kan de lenke til [https://brukerprofil.idporten.no/](https://brukerprofil.idporten.no/).  Her kan innbygger se sine aktive innlogginger og autorisasjoner til alle tjenester, samt trekke de tilbake.



## Hvordan få tilgang ?

Kunde oppretter selv en integrasjon mot ID-porten med riktig scope.


## REST-grensesnittet


REST-grensesnittet tilbyr to hovedmetoder:

|endepunkt|beskrivelse|
|-|-|
| `/clients/authorizations` | Henter alle autorisasjoner som bruker har gitt til integrasjoner (klienter) som tilhører kundens organisasjonsnummer |
| `/api-provider/authorizations` | Henter alle autorisasjoner som bruker har gitt til APIer (scopes) som tilhører kundens organisasjonsnummer |



Endepunktene er beskyttet med Oauth2 access_token fra enten ID-porten eller Maskinporten.   Korrekt HTTP-verb må benyttes alt etter hvilket token man har:

| HTTP verb| beskrivelse|
|-|-|
| GET | Forventer at access_token tilhører innlogget bruker (såkalt [autentiseringsnær autorisasjon](oidc_auth_oauth2.html)) |
| POST | Forventer [maskinporten-basert tilgang](maskinporten_auth_server-to-server-oauth2.html) og at personidentifikator er del av request-body |
| DELETE | Støtter begge token-typer.  |


Følgende Oauth2 scopes aksepteres av grensesnittet:

| scope | beskrivelse |
| - | - |   
| `idporten:authorizations`  |  Lese ut alle autorisasjoner som bruker har til mine tjenester eller mine APIer, samt trekke de tilbake.  |


Grensesnittet er dokumentert ihht OpenAPI her: [https://api.idporten-ver2.difi.no/authorizations#swagger-ui.html](https://api.idporten-ver2.difi.no/authorizations#swagger-ui.html).

URL til tjenesten:

| Miljø | URL |
|-|-|
|PROD  | https://api.idporten.difi.no/authorizations  |
|VER1  | https://api.idporten-ver1.difi.no/authorizations |
|VER2  | https://api.idporten-ver2.difi.no/authorizations  |
|YT2   | https://api.idporten-yt2.difi.eon.no/authorizations |


### Filtrering

Som standard returner APIet kun autorisasjoner gitt til scopes som har `requires_user_consent` lik true.  Det er mulig utvide søket ved inkludere "require_user_consent=false" som query-parameter.  Man kan også søke på scope-egenskapen `visibility`.

MERK at det alltid er den komplette autorisasjonsrepresentasjonen slik den var reflektrert i det utstedte tokenet som blir returnert, selv om man bruker søk.  Det er altså tilstrekkelig at ett av scopene tilhørende en autorisasjon har treff på søkekriteriene.

### Eksempler

Med bruk av ID-porten token:

```
GET /clients/authorizations
Authorization: Bearer <idporten-token med idporten:authorizatons-scope og personidentifikator>

[
    {
        "authorization_id": "AeTQv82Acy5SFN5gfB5mv38z6C3c5p1T7WtLYwn0lMU",
        "client_id": "test_rp_systest",
        "client_name": "ID-porten testklient",
        "description": "En fantastisk sluttbruker-tjeneste"
        "authorized_at": 1611555774085,
        "expires": 1611559375085,
        "scopes": [
            {
                "name": "digdir:test2",
                "description": "Digdir test scope with user consent",
                "long_description": "",
                "requires_user_consent": true,
                "visibility": "PUBLIC",
                "owner_orgno": "991825827"
            }

        ],
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        "consumer": {
            "authority": "iso6523-actorid-upis",
            "ID": "0192:991825827"
        }
    }
]

```

Tilsvarende request ved bruk av Maskinporten-token (gir samme respons som over)

```
POST /clients/authorizations
Authorization: Bearer <maskinporten med idporten:authorizatons-scope>
Content-Type: application/json

{
    "pid": "23079417653"
}

```


### Slette en autorisasjon

Normalt vil en kunde slette en autorisasjon ved at klienten som fikk utstedt det aktuelle tokenet kaller /revoke-endepunktet til ID-porten med tokenet (access eller fortrinnvis refresh) som skal slettes.

Dette API-kallet gir derimot kunden anledning til å revokere fra en annen klient enn den som fikk tokenet utdelt.  Ved sletting av autorisasjon, blir alle tilhørende aktive access_token og refresh_token invalideret.   (Merk at evt. allerede utstedte self-contained access_token fremdeles vil fremstå som gyldige, dersom de ikke valideres via nettverkskall mot ID-portens /tokeninfo-endepunkt).

```
DELETE /authorizations/{authorization_id}
Authorization: Bearer yyyyy
```
Bearer-tokenet i forespørselen må ha `idporten:authorizations` scope.

### Revokasjonsliste
Endepunktet /revokelist gir oversikt over kva autorisasjoner som har blitt revokert den siste tida. Typisk bruk er klientar med mange langt-levande token der ein ynskjer å redusere antall kall mot /tokeninfo. Normal bruk av /tokeninfo er foretrukken for dei aller fleste. Endepunktet er åpent og krever ikkje autentisering.

URL til revokelist endepunktet: https://oidc.difi.no/idporten-oidc-provider/revokelist

```
GET /idporten-oidc-provider/revokelist?client_id=testklient
{
    "created": 1580303929800,
    "revoked_access_tokens": [
        {
            "expires": 1581306298998,
            "revoked": 1580302929704,
            "access_token_id": "gWbJcYm54F4Tf5-iQXVyyy1FHI2CnAlZPLx6ChvWnyu"
        },
        {
            "expires": 1581306299998,
            "revoked": 1580302929707,
            "access_token_id": "gWbJcYm54F4Tf5-iQXVyyy1FHI2CnAlZPLx625vWnop"
        }
    ]
}
```
