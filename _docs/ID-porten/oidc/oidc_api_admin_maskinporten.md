---
title: "API for administrasjon av APIer / scopes"
description: "API som gir brukere av ID-porten/Maskinporten  mulighet til å administrere API-sikring"
summary: "Oauth2-beskyttet REST-grensesnitt som gir utvalgte kunder mulighet til å selv-administrere APIer og -tilgang"
permalink: oidc_api_admin_maskinporten.html
sidebar: oidc
product: ID-porten
---

## Introduksjon

"Maskinporten" er en egenskap ved ID-portens OIDC provider som tilbyr en enkel modell for API-sikring basert på såkalt "2-legged Oauth", se [server-to-server Oauth2](oidc_auth_server-to-server-oauth2.html), inspirert av [Google sine system-kontoer](https://developers.google.com/identity/protocols/OAuth2ServiceAccount).

På denne siden dokumenterer vi hvordan  API-tilbydere gir mulighet til selvbetjening av egen API-sikring.

Les gjerne [integrasjonsguide for Maskinporten](oidc_guide_maskinporten.html) først.  API-konsumenter bør se på [selvbetjenings-API for integrasjoner](oidc_api_admin.html).


## Om selvbetjenings-APIet

### Hvordan få tilgang ?

Ta kontakt med idporten@difi.no for å få tilgang til å bruke APIet.

### Bruk av Oauth2

APIet er også selv sikret vha. [server-til-server Oauth](oidc_auth_server-to-server-oauth2.html), dvs. med bruk av virksomhetssertifikat, og virksomheten sin administrasjons-klient må manuelt få tildelt scopes for å få tilgang til selvbetjeningsAPIet:

API-tilbydere må ha:

| scope | beskrivelse |
|-|-|
|idporten:scopes.write|Gir tilgang til å opprette/endre APIer, og gi/fjerne tilgang til konsumenter|

Vi krever at virksomhetene oppretter en egen administrasjons-klient som kun får lov til å utføre selvbetjening.


### OpenAPI-dokumentasjon

REST-grensesnittet er [dokumentert her](https://integrasjon-ver2.difi.eon.no/swagger-ui.html#).

Merk at du må manuelt velge riktig spec' oppe i høyre hjørne.  For Maskinporten er det "Scopes" du skal se på.



## Grunnleggende prosedyre for API-sikring

Se [integrasjonsguide for Maskinporten](oidc_guide_maskinporten.html).


### Beskrivelse av APIer

I Maskinporten-sammenheng er et API det samme som et Oauth2 scope. Difi ønsker å gi API-tilbydere stor frihet til å selv bestemme sin semantikk for API-sikring innenfor rammene av Oauth2-standardene. Samtidig er det behov for noen regler for å sikre interoperabilitet.  

Følgende syntax brukes:

```
scope ::= prefix ':' subscope
```

der `prefix` er en tekststreng som blir manuelt tildelt API-tilbyderen. En API-tilbyder kan ha flere prefix.  Eksempel på prefix kan være `nav` eller `skatt`. Å bruke organisasjonnummer som prefix kan i mange sammenhenger være nyttig, siden det kan legge til rette for automatiserte prosesser. I andre sammenhenger vil ikke organisasjonsnummer være tilstrekkelig granulært for store virksomheter.

- Subscope bør beskrive ressursen best mulig (`trygdeopplysninger` eller `adresse`).  
- Subscope kan gjerne ha ulike postfix for å skille på lese- og skrive-tilgang til ressursen (`nav:trygdeopplysninger.write`)
     - fravær av postfix bør i utgangspunktet tolkes som kun lese-tilgang


### Synlighet

Attributtet `visibility` brukes for å angi scopets synlighet:

|verdi|beskrivelse|
|-|-|
|PUBLIC | Scopet er synlig for alle på /scopes/all endepunkt.    |
|PRIVATE| Scopet er ikke synlig for andre enn API-tilbyder og de konsuementer som har fått tilgang |Konsument må bli fortalt at scopet finnes    |
|INTERAL | Inten bruk i Difi   |   

Merk at det er ingen integrasjon med API-katalogen, slik at API-tilbyder selv må sikre at scopet ikke havner i API-katalogen dersom denne benyttes.

### Scope-begrensinger

Attributtet "allowed_integration_types" legger føringer på bruken av et scope. En eller flere integrasjonstyper kan være tillatt. Dersom dette attributtet er satt, må en av verdiene inkludere "maskinporten" for at du skal kunne bruke scopet med en maskinporten klient.


### Inaktive entiteter

For å sikre juridisk logging og statistikk, vil Difi aldri slette scopes og tilganer (eller integrasjoner), men heller deaktivere disse ved DELETE-kall.

Deaktiverte entiteter vil ikke komme opp i GET utlistinger som default, men kan hentes ved å sette `inactive=TRUE` som query parameter. Deaktiverte entiteter vil ikke reaktiveres ved POST og man får 409 Conflict isteden.



### 1. Opprette APIer

Når prefix er blitt manuelt tildelt, er følgdende operasjoner tilgjengelige:

| Operasjon | inndata | beskrivelse |
|-|-|-|
|`GET    /scopes/all `| |Åpent endepunkt som gir liste over alle synlige scopes beskyttet av ID-porten (evt. filtrering)|
|`GET    /scopes `| |Beskyttet endepunkt som lister alle scopes for min organisasjon, både public og private|
|`POST   /scopes ` | prefix*, subscope*, description, token_egenskaper  | Oppretter et nytt scope (lik prefix+subscope)    |
|`GET    /scopes?scope={scope} `  |   | Hent et scope.  |
|`PUT    /scopes?scope={scope} `  |  description, token_egenskaper | Endrer et scope. Selve scope-navnet kan ikke endres.   |
|`DELETE /scopes?scope={scope} `   |   | Deaktiverer et scope. (scopet beholdes for konsistens i audit-log)  Konsumenters tilgang beholdes.   |

Vi har valgt å legge scope som query-parameter, da det innen noen sektorer finnes spesifikke standarder som krever bruk av slash "/" i scope-definisjonen, og dette vil bli unødig tungvindt for brukere av APIet å skulle støtte dette som del av path-komponenten.

`token-egenskaper` er tekniske egenskaper som API-tilbyder forventer/krever. Dette kan være max tillatt levetid, self-contained eller ikke, minste sikkerhetsnivå, etc.  Dette vil bli implmentert ila. 2019.

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


### 2. Tilgangsstyring

API-tilbyder kan bruke følgende operasjoner for tilgangsstyring:

| Operasjon| inndata |beskrivelse |
|-|-|-|
|`PUT    /scopes/access/{consumer_orgno}` | scope | Gir konsument consumer_orgno tilgang til aktuelt scope |
|`DELETE /scopes/access/{consumer_orgno}` | scope | Fjerner tilgangen konsumenten har til scopet |
|`GET    /scopes/access?scope={scope}`||liste alle tilganger for gitt scope|

#### Eksempel på å gi tilgang

```
PUT /scopes/access/889640782?scope=difi:api3 HTTP/1.1
```
som gir organisasjonsnummer `889640782` tilgang til scopet `difi:api3`.

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

### 3. Provisjonering av konsument

Konsumenten må provisjonere tilgangen ned til en aktuell klient, før han kan få utstedt tokens.  Dette gjøres ved å oppdatere Oauth2 klienten som skal ha tilgangen med det nye scopet, via [ID-porten sitt API for selvbetjening av integrasjoner](oidc_api_admin.html#scopes).

#### Eksempel på provisjonering

Først henter du aktuell klient-konfigurasjon med GET, og tar utgangspunkt i denne for å generere en modifisert objekt  tilbake:

```
PUT /clients/if2018_apikonsument HTTP/1.1

{
	...
    "scopes": [ "difi:api3" ],
	...
}
```
(fjern created_date, last_updated)
