---
title: Slik bruker du Maskinporten som API-tilbyder
description: API-sikring med Maskinporten
summary:
permalink: maskinporten_guide_apitilbyder.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

### Overordnet prosedyre for API-sikring

En full verdikjede for API-sikring med Maskinporten består av følgende steg:

1. API-tilbyder blir manuelt tildelt et API-prefiks i Maskinporten
2. API-tilbyder oppretter et API
3. API-tilbyder gir tilgang til en konsument
4. Konsument oppretter en Maskinporten-integrasjon (oauth2-klient) og provisjonerer tilgangen til denne.

Provisjonering/konfigursjon av tilgang er nå etablert.  Når API'et så skal brukes run-time, gjennomføres følgende steg:

5. Konsumenten sin Oauth2-klient forespør token fra Maskinporten
6. Konsumenten inkluderer token i kall til APIet.
7. API-tilbyder validerer tokenet, utførerer evt. fin-granulert tilgangskontroll og returnerer forespurt ressurs.

## Prosedyre for API-tilbyder

### 1: Manuell provisjonering

Først må du bli manuelt provisjonert som API-tilbyder:  Du må bestemme:
* et `scope-prefix` du ønsker bruke for dine APIer
* ønsket `client_id` for din selvbetjenings-applikasjon
* ditt `organisasjonsnummer`

Send inn skjema: [https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5ka_Oknk2ND5DhEKnqlTuZMlUMVNWWVYwSlhTWlpRTjQwWEVDS09EUFVWWS4u](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5ka_Oknk2ND5DhEKnqlTuZMlUMVNWWVYwSlhTWlpRTjQwWEVDS09EUFVWWS4u)

Du må så lage en tilhørende Oauth2-klient som benytter selvbetjeningsAPIet til Maskinporten.  Se [oidc_api_admin_maskinporten.html](oidc_api_admin_maskinporten.html) for detaljer.

### Beskrivelse av APIer

I Maskinporten-sammenheng er et API det samme som et Oauth2 scope.Digitaliseringsdirektoratet ønsker å gi API-tilbydere stor frihet til å selv bestemme sin semantikk for API-sikring innenfor rammene av Oauth2-standardene. Samtidig er det behov for noen regler for å sikre interoperabilitet.  

Følgende syntax brukes:

```
scope ::= prefix ':' subscope
```

der `prefix` er en tekststreng som blir manuelt tildelt API-tilbyderen. En API-tilbyder kan ha flere prefix.  Eksempel på prefix kan være `nav` eller `skatt`. Å bruke organisasjonnummer som prefix kan i mange sammenhenger være nyttig, siden det kan legge til rette for automatiserte prosesser. I andre sammenhenger vil ikke organisasjonsnummer være tilstrekkelig granulært for store virksomheter.

- Subscope bør beskrive ressursen best mulig (`trygdeopplysninger` eller `adresse`).  
- Subscope kan gjerne ha ulike postfix for å skille på lese- og skrive-tilgang til ressursen (`nav:trygdeopplysninger.write`)
     - fravær av postfix bør i utgangspunktet tolkes som kun lese-tilgang


### Synlighet

Attributtet `visibilty` brukes for å angi scopets synlighet:

|verdi|beskrivelse|
|-|-|
|PUBLIC | Scopet er synlig for alle på /scopes/all endepunkt.    |
|PRIVATE| Scopet er ikke synlig for andre enn API-tilbyder og de konsuementer som har fått tilgang |Konsument må bli fortalt at scopet finnes    |
|INTERAL | Inten bruk iDigitaliseringsdirektoratet   |   

Merk at det er ingen integrasjon med API-katalogen, slik at API-tilbyder selv må sikre at scopet ikke havner i API-katalogen dersom denne benyttes.

### Scope-begrensninger

Det anbefales at man setter en begrensning på bruk av scopet. Ved å sette attributtet  `allowed_integration_types`, vil man begrense bruken til de integrasjonstypene som er inkludert i attributtet. F.eks kan man begrense bruken til kun å kunne brukes med maskinporten- (server til server) eller idportenklienter (brukerinnlogging).

### Inaktive entiteter

For å sikre juridisk logging og statistikk, vilDigitaliseringsdirektoratet aldri slette scopes og tilganer (eller integrasjoner), men heller deaktivere disse ved DELETE-kall.

Deaktiverte entiteter vil ikke komme opp i GET utlistinger som default, men kan hentes ved å sette `inactive=TRUE` som query parameter. Deaktiverte entiteter vil ikke reaktiveres ved POST og man får 409 Conflict isteden.

### Administrasjon av API

API'ene kan administreres på 2 måter. Enten ved bruk av Oauth2-klient eller ved bruk av web-grensesnitt via Samarbeidsportalen.

### 1a: Opprette et API - via Samarbeidsportalen

 - Gå til "Min profil" på https://samarbeid.difi.no/ . Velg "Virksomhetens tjenester" og "Administrasjon av tjenester" på venstresiden i menyen.

- Velg "Mine API" i det miljøet du vil opprette API'et i.

- Trykk på "Nytt scope"

- Velg prefix fra nedtrekksmenyen, om denne er tom, så er det ikke tildelt noe prefix til organiasjonsnummeret du representerer. Ta da kontakt på idporten@difi.no. Organisasjonsnummeret for virksomheten din vil være pre-utfyllt i skjemaet.

- Fyll ut resten av parameterene og trykk "lagre". Subscopet vil nå vise i listen over "Mine API".

[![Opprette API](https://samarbeid.difi.no/sites/samarbeid2/files/opprette-api.png)](https://samarbeid.difi.no/sites/samarbeid2/files/opprette_api.mp4 "Opprette API")

### 1b: Tilgangsstyring - via Samarbeidsportalen

 - Gå til "Min profil" på https://samarbeid.difi.no/ . Velg "Virksomhetens tjenester" og "Administrasjon av tjenester" på venstresiden i menyen.

- Velg "Mine API" i det miljøet du vil tilgangsstyre i.

- Velg API'et du vil tilgangsstyre.

- Gå til "Tilganger" under skjemaet.

- For å legge til ny tilgang, trykk på "+ legg til ny tilgang" og registrer organisasjonsnummeret til virksomheten som skal få tilgang.

- For å revokere tilgang, trykk på "Slette" i listen over tilganger.

[![Tilgangsstyre API](https://samarbeid.difi.no/sites/samarbeid2/files/tilgangsstyre-api-png.png)](https://samarbeid.difi.no/sites/samarbeid2/files/tilgangsstyre_api.mp4 "Tilgangsstyre API")

### 2a. Opprette APIer - Oauth2-selvbetjeningsklient

Når prefix er blitt manuelt tildelt, er følgdende operasjoner tilgjengelige:

| Operasjon | inndata | beskrivelse |
|-|-|-|
|`GET    /scopes/all `| |Åpent endepunkt som gir liste over alle synlige scopes beskyttet av ID-porten/Maskinporten (evt. filtrering)|
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



### 2b. Tilgangsstyring - Oauth2-selvbetjeningsklient

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


### 4: Validere token

Når en konsument bruker Maskinporten-token mot ditt API, må du gjøre en skikkelig validering av dette.  Oauth2 og JWT-spec'ene spesifiserer i detalj hva du skal gjøre.  

Dersom token er self-contained :
- sjekke at 'issuer' stemmer med Maskinporten ("https://maskinporten.no/" i prod)
- validere signering, og at signeringsertifikat stemmer med det Maskinporten publiserer på sitt JWK-endepunkt
- verifisere at scope stemmer med ditt aktuelle  API-endepunktet
- validere at token ikke er utløpt (exp)


## Bruke delegering i Altinn

Dersom du ønsker at konsumenter av ditt API skal kunne bruke Altinn til å delegere tilgangen videre til en systemleverandør, må du opprette et såkalt delegeringsoppsett (delegationScheme) som må tilknyttes et eller flere av dine Oauth2 scopes i Maskinporten.  Dette fordrer at du er tjenesteeier i Altinn.

Prosedyre:


1. Du må lage en "delegerbar ressurs" i Altinn:
  * Be Altinn om å få tilgang til `altinn:maskinporten/delegationschemes.write` scope.
  * Lag en maskinporten-klient som har dette admin-scopet provisjonert.
  * Denne klienten må be et token fra Maskinporten, og så opprette ressursen slik:

```
POST /maskinporten-api/delegationSchemes HTTP/1.1
Host: tt02.altinn.no
Content-Type: application/json
Authorization: Bearer  <mitt maskinporten-token>

{
    "owner_org": "991825827",
    "scopes": [
        "difitest:test2"
    ],
    "title": [
        {
            "code": "nb_NO",
            "value": "Difi tester delegering"
        }
    ],
    "description": [
        {
            "code": "nb_NO",
            "value": "Bla bla bla bla bla og enno meir blah"
        }
    ],
    "default_language": "nb_NO"
}
```

Du vil få en ID til delegeringoppsettet i retur.

TODO: link til swagger-dok


2. Så må du opprette scopet i Maskinporten på vanlig måte (se ovenfor), men passe på å sette at dette scopet har en **delegeringskilde** knyttet til seg:

```
POST /scopes HTTP/1.1
Host: integrasjon.difi.no
Content-Type: application/json
Authorization: Bearer 0pLY6hwU6tkzBPoGTVlObex-QfIBw_yU9tXy7SKrgOU=
cache-control: no-cache
{
  "prefix": "difitest",
  "subscope": "test2",
  "description": "scope som krever ekstern delegeringskilde",
  "delegation_source": "https://www.altinn.no"
}
```

3. Til slutt gir du tilgang til konsumenter på vanlig måte.


Merk:
* Maskinporten-scopes som mangler delegeringskilde, vil ikke kunne benytte Altinn til delegering
* Maskinporten-scopes som har delegeringskilde, vil ikke kunne konsumeres av leverandører som benytter ID-porten/Maskinportens interne delegeringsfunksjonalitet (onbehalfof)
