---
title: API-sikring med Maskinporten
description: API-sikring med Maskinporten
summary: 
permalink: oidc_guide_maskinporten.html
sidebar: maskinporten_sidebar
product: ID-porten
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

Send inn skjema: <Lenke her>

Du må så lage en tilhørende Oauth2-klient som benytter selvbetjeningsAPIet til Maskinporten.  Se [oidc_api_admin_maskinporten.html](oidc_api_admin_maskinporten.html) for detaljer.

### 2: Administrasjon av API

API'ene kan administreres på 2 måter. Enten ved bruk av Oauth2-klient eller ved bruk av web-grensesnitt via Samarbeidsportalen.

#### 2a: Opprette et API - Selvbetjeningsklient

Et API i Maskinporten-sammenheng er et Oauth2 `scope` . Når du skal opprette et scope, sender du scope-definisjon sammen med en beskrivelse, slik:

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
Autorization-headeren i eksempelet er et access_token som selvbetjeningsklienten din først har fått fra Maskinporten. Dette tokenet må ha "idporten:scopes.write" scope.

Prefix må matche det du tidligere fikk tildelt i steg 1.

#### 2b: Opprette et API - Web-grensesnitt

### 3: Gi tilgang

Som API-tilbyder trenger du ikke bry deg om hvilken klient ("bruker") hos konsumenten din som skal ha tilgang, du gir kun tilgang på organisasjonsnummer-nivå:

```
PUT /scopes/access/889640782?scope=difi:api3 HTTP/1.1
```
som gir organisasjonsnummer `889640782` tilgang til scopet `difi:api3`.   

Du må nå gi konsumenten din beskjed om utføre steg 4.

### : Validere token

Når en konsument bruker Maskinporten-token mot ditt API, må du gjøre en skikkelig validering av dette.  Oauth2 og JWT-spec'ene spesifiserer i detalj hva du skal gjøre.  

Dersom token er self-contained :
- sjekke at 'issuer' stemmer med Maskinporten ("https://oidc.difi.no/idporten-oidc-provider/" i prod)
- validere signering, og at signeringsertifikat stemmer med det Maskinporten publiserer på sitt JWK-endepunkt
- verifisere at scope stemmer med ditt aktuelle  API-endepunktet
- validere at token ikke er utløpt (exp)

Dersom token er by-reference, må du sende dette til  Maskinporten sitt /tokeninfo-endepunkt og verifisere at du får "active:true" tilbake, i tillegg til sjekkene ovenfor.
