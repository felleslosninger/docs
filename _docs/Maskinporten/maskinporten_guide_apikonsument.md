---
title: Slik bruker du Maskinporten som API-konsument
description:  Maskinporten som API-konsument
summary: 'API-konsumenter må lage en Oauth2-integrasjon mot Maskinporten og så videreføre/provisjonere en tildelt API-tilgang til denne integrasjonen.'
permalink: maskinporten_guide_apikonsument.html
sidebar: maskinporten
product: Maskinporten
---

Dette dokumentet viser de stegene som en API-konsument må gjøre for å bruke Maskinporten.


### Overordnet prosedyre for API-sikring med Maskinporten

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



### 4. Opprett en integrasjon i Maskinporten

Du må opprette en såkalt oauth2-klient i Maskinporten.

Klienten må autentisere seg mot Maskinporten enten med virksomhetssertifikat, eller med en  asymmetrisk nøkkel som konsumenten selv lager.

Klienten må registreres med følgende Oauth2 egenskaper:

| Egenskap   | Verdi   |   Forklaring |
|-|-|-|
|integration_type (TBD)   | "Maskinporten"   |  Dette feltet forteller Difi hvilken integrasjon dette er.   |
| token_endpoint_auth_method  | "private_key_jwt"  | Maskinporten aksepterer kun sertifikat og nøkler, og ikke client_secret for å autentisere klienter |
| grant_types   | "urn:ietf:params:oauth:grant-type:jwt-bearer"  | Maskinporten aksepterer kun signerte JWTer som grants.  |
| client_id  | auto-tildelt  | Blir satt at Difi ved registrering  |
| description  |  string | Du må skrive inn en god beskrivelse av tjenesten. Denne blir synlig for Difis personell,  |
| scopes | string, space-separert | Ett eller flere API/scopes som din organisasjon har fått tildelt tilgang til av API-tilbyder.

```
(eksemple på registrering med sertifikat)
```

```
(eksemple på registrering med nøkkel)
```

### 5: Be om token

For å få et access_token, må du sende et såkalt JWT-grant til Maskinportens /token-endepunkt.

Følgende claims er vesentlige å ha med i grantet:


| Claim  |  Verdi | Beskrivelse  |
| --- | --- |--- |
|aud| httsp://maskinporten.no/ | Audience - issuer-identifikatoren til  Maskinporten. Verdi for aktuelt miljøå finner du på .well-known-endpunkt. |
|iss| client_id |issuer - Din egen client_id.  |
|scope| forespurte scopesRequired| Whitepace-separated liste over scopes requested.  When using JWT grants, the client must have pre-registered with rights to all the scopes. |
|iat| Required| issued at - Timestamp when generating this jwt.  **NOTE:** UTC-time|
|exp| Required| expiration time - Timestamp for the expiry of this jwt,  in UTC-time. **NOTE:** Maximum 120 seconds allowed. (exp - iat <= 120 )|
|jti|Recommended | JWT ID - unique id for this jwt. **NOTE:** A JWT cannot be reused. |
| resource   | optional  | *Currently only array supported.*  The indended audience for token. If included, the value will be transparantly set as the `aud`-claim in the access token. See [Oauth2 Resource Indicators](https://tools.ietf.org/html/draft-ietf-oauth-resource-indicators-05) |   




### 6: Sende API-kall med token

Dette steget vil variere alt etter hvilken API-tilbyder du skal bruk


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
