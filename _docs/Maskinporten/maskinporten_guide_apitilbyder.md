---
title: API-sikring med Maskinporten
description: API-sikring med Maskinporten
summary: 'Maskinporten tilbyr offentlige etater en enkel måte å sikre sine APIer med virksomhetsautentisering og tilgangstyring.'
permalink: oidc_guide_maskinporten.html
sidebar: oidc
product: ID-porten
---

## Introduksjon


"Maskinporten" er en egenskap ved ID-portens OIDC provider som tilbyr en enkel modell for API-sikring basert på såkalt "2-legged Oauth", inspirert av [Google sine system-kontoer](https://developers.google.com/identity/protocols/OAuth2ServiceAccount).




<div class="mermaid">
graph LR
  subgraph API-tilbyder
    API
  end
  subgraph Difi
    OIDC[OIDC Provider]
  end
  subgraph API-konsument
     ny[Klient]
  end
  OIDC -->|2.utsteder token|ny
  ny -->|1. forspør tilgang|OIDC
  ny -->|3.bruker token mot|API
</div>

API-tilbydere og konsumenter kan bruke denne funksjonaliteten for å styre tilgang i de tilfellene der informasjonsverdiene APIet tilbyr er regulert av lovhjemmel, og ikke krever samtykke av brukeren.

Bruk av Maskinporten krever at begge aktørene bruker ID-porten sin selvbetjeningsfunksjonalitet.

### Overordnet prosedyre for API-sikring

En full verdikjede for API-sikring med Maskinporten består av følgende steg:

1. API-tilbyder blir manuelt provisjonert i Maskinporten
2. API-tilbyder oppretter et API
3. API-tilbyder gir tilgang til en konsument
4. Konsument provisjonerer tilgangen ned til en aktuell oauth2-klient

Provisjonering av tilgang er nå etablert.  Når API'et så skal brukes run-time, gjennomføres følgende steg:

5. Konsumenten sin Oauth2-klient forespør token fra Maskinporten
6. Konsumenten inkluderer token i kall til APIet.
7. API-tilbyder validerer tokenet, utførerer evt. fin-granulert tilgangskontroll og returnerer forespurt ressurs.

Merk at både API-tilbyder og API-konsument må lage en egen selvbetjeningsapplikasjon.  

## Prosedyre for API-tilbyder

### 1: Manuell provisjonering

Først må du bli manuelt provisjonert som API-tilbyder:  Du må bestemme:
* et `scope-prefix` du ønsker bruke for dine APIer
* ønsket `client_id` for din selvbetjenings-applikasjon
* ditt `organisasjonsnummer`

og sende dette til idporten (at) difi.no

Du må så lage en tilhørende Oauth2-klient som benytter selvbetjeningsAPIet til Maskinporten.  Se [oidc_api_admin_maskinporten.html](oidc_api_admin_maskinporten.html) for detaljer.

### 2: Opprette et API

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

### 3: Gi tilgang

Som API-tilbyder trenger du ikke bry deg om hvilken klient ("bruker") hos konsumenten din som skal ha tilgang, du gir kun tilgang på organisasjonsnummer-nivå:

```
PUT /scopes/access/889640782?scope=difi:api3 HTTP/1.1
```
som gir organisasjonsnummer `889640782` tilgang til scopet `difi:api3`.   

Du må nå gi konsumenten din beskjed om utføre steg 4.

### 6: Validere token

Når en konsument bruker Maskinporten-token mot ditt API, må du gjøre en skikkelig validering av dette.  Oauth2 og JWT-spec'ene spesifiserer i detalj hva du skal gjøre.  

Dersom token er self-contained :
- sjekke at 'issuer' stemmer med Maskinporten ("https://oidc.difi.no/idporten-oidc-provider/" i prod)
- validere signering, og at signeringsertifikat stemmer med det Maskinporten publiserer på sitt JWK-endepunkt
- verifisere at scope stemmer med ditt aktuelle  API-endepunktet
- validere at token ikke er utløpt (exp)

Dersom token er by-reference, må du sende dette til  Maskinporten sitt /tokeninfo-endepunkt og verifisere at du får "active:true" tilbake, i tillegg til sjekkene ovenfor.

## Prosedyre for API-konsument

### 4: Konfigurere Oauth2-klient

Når tilgang er gitt i steg 3, må Konsumenten provisjonere tilgangen ned til en aktuell Oauth2 klient, før han kan få utstedt tokens.  Dette gjøres via [ID-porten sitt API for selvbetjening av integrasjoner](oidc_api_admin.html#scopes).

Det kan være en sikkerhetsrisiko  å la samme klient ha tilgang til for mange APIer, så vi anbefaler at konsumenter lager en ny klient ved å POSTe inn konfigurasjonen til denne:
```
POST /clients/
{
  "client_name": "string",
  "client_type": "CONFIDENTIAL",
  "description": "string",
  "scopes": [   "difi:api3"  ],
  "token_reference": "SELF_CONTAINED"
}
```
Dersom du heller ønsker å endre en eksisterende klient, må du først hente ned aktuell klient-konfigurasjon med GET, og tar utgangspunkt i denne for å generere et modifisert objekt  tilbake:

```
PUT /clients/if2018_apikonsument HTTP/1.1

{
	...
    "scopes": [ "difi:api3" ],
	...
}
```

I begge tilfeller betyr dette at konsumenten må manuelt provisjoneres for bruk av selvbetjenings-APIet, dersom dette ikke er etablert fra før.  Konsumenter må bruke "idporten:dcr.write" scopet (evt. "idporten:dcr.supplier" dersom klienten tilhører en leverandør) for bruk av selvbetjenings-APIet.



### 5 og 6: Forespørre token og bruke APIet

I ordinær bruksfase følges flyten som er dokumentert [her](oidc_auth_server-to-server-oauth2.html).


<div class="mermaid">
sequenceDiagram
  note over Klient:  Generer og signer JWT
  Klient ->> OpenID Provider: Bruk JWT til å forespørre token
  note over OpenID Provider: Valider virksomhetssertifikat og utfør tilgangskontroll
  OpenID Provider ->> Klient: Returnere access_token
  Klient ->> API: Bruk token mot API
  note over API: Valider token
  API ->> Klient: Resultat av API-kall

</div>

Konsumenten sin klient forespør et access_token fra Maskinporten ved å generere en **JWT-basert tokenforespørsel** (JWT-bearer authorization grant). JWTen må inneholde scopet som konsumenten fikk tilgang til i steg 3.  De fulle kravene til JWT'en er spesifiert [her](oidc_auth_server-to-server-oauth2.html#grant).

```
POST /token
Content-type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=<jwt>
```

Maskinporten vil først validere gyldigheten av JWT'en. Deretter vil virksomhetssertifikatet (brukt til signering av JWT'en) valideres og dersom klienten har tilgang til de forespurte ressursene returneres et access_token til klienten.

Klienten kan nå aksessere APIet ved bruk av access_tokenet.
