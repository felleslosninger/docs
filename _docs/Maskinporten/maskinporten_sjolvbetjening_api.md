---
title: Selvbetjening av Maskinporten via API
description:  Selvbetjening av Maskinporten via API
summary: 'Her finn du guidar og tutorials på korleis du kan sjølvbetjene Maskinporten via API'
permalink: maskinporten_sjolvbetjening_api.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

Dette dokumentet viser hvordan du kan selvbetjene i Maskinporten som API-tilbyder og API-konsument.

---
* TOC
{:toc}

## Innlogging og tilgang

### Tilgang (Administrasjon av API)

For å kunne bruke selvbetjening via API, så må virksomheten få utdelt en administrasjons-klient fra Digdir. API'et er sikret med oAuth2 med bruk av virksomhetssertifikat. Merk at i testmiljøene må det benyttes gyldig test-virksomhetssertifikat.

For å administrere API'er må administrasjons-klienten ha tilgang til scopet idporten:scopes.write.

Ta kontakt med servicedesk@digdir.no for å få tilgang.

Les også ["Grunnleggende prosedyre for API-sikring".](oidc_api_admin_maskinporten.html#grunnleggende-prosedyre-for-api-sikring)

### Opprette API - Oauth2-selvbetjeningsklient

Dersom du vil automatisere administrasjonen av scopes og tilganger fra egen API management-løsning, må du lage en Oauth2-klient som benytter selvbetjeningsAPIet til Maskinporten.  Se [oidc_api_admin_maskinporten.html](oidc_api_admin_maskinporten.html) for detaljer.

#### Eksempel på å opprette scope

```
POST /scopes HTTP/1.1
Host: integrasjon-ver2.difi.no
Content-Type: application/json
Authorization: Bearer 0pLY6hwU6tkzBPoGTVlObex-QfIBw_yU9tXy7SKrgOU=
cache-control: no-cache
{
	"prefix": "difi",
	"subscope": "api3",
	"description": "Difi sitt API nummer 3 for demo-formål"
}
```

### Tilgangsstyring

Tilgang gis og fjernes ved enkle REST-kall:  

#### Eksempel på å gi tilgang

```
PUT /scopes/access/889640782?scope=difi:api3 HTTP/1.1
```
som gir organisasjonsnummer `889640782` tilgang til scopet `difi:api3`.

Send DELETE for å trekke tilbake en tilgang.

#### Eksempel på å se tilganger
Request:
```
GET /scopes/access?scope=difi:api3 HTTP/1.1
```
Respons:
```
[
    {
        "scope": "difi:api3",
        "state": "APPROVED",
        "prefix": null,
        "created": "2018-11-28T14:11:35+01:00",
        "consumer_orgno": "889640782",
        "last_updated": "2018-11-28T14:11:35+01:00",
        "owner_orgno": "991825827"
    }
]
```


Vi har valgt å legge scope som query-parameter, da det innen noen sektorer finnes spesifikke standarder som krever bruk av slash "/" i scope-definisjonen, og dette vil bli unødig tungvindt for brukere av APIet å skulle støtte dette som del av path-komponenten.


### Vedlikehald av merkantile data

Vedlikehold av fakturainformasjon og varslingspunkter er viktig for at vi hele tiden skal ha oppdatert informasjon om dette. Varslingspunkt(er) får eposter ved kritiske hendelser i løsningen og om det ikke er registrert noe her, så kan man gå glipp av viktig informasjon.

For å administrere merkantile data:

1. Logg inn på Samarbeidsportalen
2. Trykk på "Virksomhetens tjenester" i venstremenyen
3. Finn integrasjonen av type "API-tilbyder" og trykk på den.
4. Trykk på "Rediger integrasjon"
5. Legg inn informasjon og trykk "Lagre" når du er ferdig.

Tutorial:


## Selvbetjening som API-konsument

For å kunne bruke selvbetjening via API, så må virksomheten få utdelt en administrasjons-klient fra Digdir. API'et er sikret med oAuth2 med bruk av virksomhetssertifikat. Merk at i testmiljøene må det benyttes gyldig test-virksomhetssertifikat.

For å administrere integrajoner/klienter må administrasjons-klienten ha tilgang til ett eller flere scopes:

| scope | beskrivelse |
|-|-|
|idporten:dcr.read|Gir tilgang til å lese klientregistreringer for klienter bundet mot samme org.nr. som gitt i access_token. Gir også lesetilgang til onbehalfof-registreringer|
|idporten:dcr.modify|Gir tilgang til å endre klientregistreringer for klienter bundet mot samme org.nr. som gitt i access_token. Gir også lesetilgang til onbehalfof-registreringer|
|idporten:dcr.write|Gir tilgang til å opprette nye klientregistreringer for klienter bundet mot samme org.nr. som gitt i access_token. Gir også lesetilgang til onbehalfof-registreringer|
|idporten:dcr/onbehalfof:write|Gir tilgang til å vise, opprette, endre og slette onbehalfofregistreringer tilhørende en gitt klient. Gir ikke mulighet til å endre andre parametere på selve klienten.|
|idporten:dcr.supplier|Gir leverandører tilgang til å vise, opprette, endre og slette selvstendige OIDC-integrasjoner for andre organisasjoner. Eget org.no blir koblet til disse integrasjonene.  |

Ta kontakt med servicedesk@digdir.no for å få tilgang.

### Registrere klient

#### Registrere klient som bruker virksomhetssertifikat

For å kunne registrere en klient via vår selvbetjenings-APi, må du først opprette en selvbetjeningsklient.  Se [oidc_api_admin.html.](oidc_api_admin.html)

Deretter kan du opprette Maskinporten-integrasjonen slik:

```
POST https://integrasjon.difi.no/clients/
{
   "integration_type": "maskinporten",
    "client_name": "oidc_difi_jb_test",
    "description": "ny integrajson igjen.",
    "token_endpoint_auth_method": "private_key_jwt",
    "grant_types": [
        "urn:ietf:params:oauth:grant-type:jwt-bearer"
    ],
    "scopes": [  "difitest:api3", "difitest:api4"]
}

```

Maskinporten vil svare med en auto-generert client_id, for eksempel  `238259d7-f0ab-4bd5-b253-0f0159375096`

#### Registrere klient som bruker egen nøkkel

For å slippe å spre virksomhetssertifikatet rundt til mange systemer, kan du opprette dine egne asymmetriske nøkler knyttet til en enkelt integrasjon.

Dette må gjøres i to steg: først oppretter du en klient som i eksempelet over, for så å oppretter du et nøkkel-sett på denne:
```
POST /clients/238259d7-f0ab-4bd5-b253-0f0159375096/jwks

{
  "keys": [
    {
      "kty": "RSA",
      "e": "AQAB",
      "use": "sig",
      "kid": "min_egen_nokkel",
      "alg": "RS256",
      "n": "lGc-dGnl9l9pCSb6eW5Mf23Aiss09q7Mxre9q9dazSiN9IjQJmkWDySpoYW3g_rSX2a74cg_q3iTSM0Co9iJ0LQp8gjoIi9I8syi6anBKK6fISr1adZbsGGrM1-zMRRNVsJ811snTdkbgx8ZxVRJM4F6D2KwL3TEnv0CRRVtphO0sRmimKBVVBdawPYQC64SQDvARy6xIlPhD-Da2n2Cl6vRQbVns7dYD8-C2TeYGgB_tAsrVSorx9GF5cZ-hlNHfIgg2qQYZzaljyfOWPPG5rybp9bAWg9vFllUFd_Y6vvZ0tqVfAyj67nFz_w4Rxy-MdRgERKHJcq81GkmVzq5fQ"
    }
  ]
}
```
'kid'-verdien må være unik blant alle Maskinportens kunder.


### Vedlikehald av merkantile data

Vedlikehold av fakturainformasjon og varslingspunkter er viktig for at vi hele tiden skal ha oppdatert informasjon om dette. Varslingspunkt(er) får eposter ved kritiske hendelser i løsningen og om det ikke er registrert noe her, så kan man gå glipp av viktig informasjon.

For å administrere merkantile data:

1. Logg inn på Samarbeidsportalen
2. Trykk på "Virksomhetens tjenester" i venstremenyen
3. Finn klienten i listen og trykk på den.
4. Trykk på "Rediger integrasjon"
5. Legg inn informasjon og trykk "Lagre" når du er ferdig.

Tutorial:

## Ofte stillte spørsmål

### Jeg får 401 unauthorized når jeg prøver å poste en endring via API'et.
