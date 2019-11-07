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


Dersom du er leverandør som skal bruke APIer som krever at din kunde aktivt delegerer tildelt API-tilgang i Altinn av din , så vil du ikke kunne lagre API-scopet som del av klient-registreringa, men må aktivt forespørre det
Noen scopes krever


```
(eksemple på registrering med sertifikat)
```
Det kan være en sikkerhetsrisiko  å la samme klient ha tilgang til for mange APIer, så vi anbefaler at konsumenter lager en ny klient ved å POSTe inn konfigurasjonen til denne:
#### Registrere klient med sertifikat
```
POST /clients/
{
    "client_name": "Min maskinporten-integrasjon",
    "description": "ny integrajson som er tenkt brukt til masse lure ting",
    "token_endpoint_auth_method": "private_key_jwt",
    "grant_types": [
        "urn:ietf:params:oauth:grant-type:jwt-bearer"
    ],
}

```
#### Registrere klient med egen nøkkel
For å slippe å spre virksomhetssertifikatet rundt til mange systemer, kan du opprette dine egne asymmetriske nøkler knyttet til en enkelt integrasjon.

Dette må gjøres i to steg: først oppretter du en klient, og så oppretter du et nøkkel-sett på denne.
```
(eksemple på registrering med nøkkel)
```

#### Registrere klient som leverandør

- skrive om delegering i altinn

### 5: Be om token


I ordinær bruksfase følges flyten under:

<div class="mermaid">
sequenceDiagram
  note over Klient:  Generer og signer JWT
  Klient ->> Maskinporten: Bruk JWT til å forespørre token
  note over Maskinporten: Valider virksomhetssertifikat og utfør tilgangskontroll
  Maskinporten ->> Klient: Returnere access_token
  Klient ->> API: Bruk token mot API
  note over API: Valider token
  API ->> Klient: Resultat av API-kall

</div>

Konsumenten sin klient forespør et access_token fra Maskinporten ved å generere en **JWT-basert tokenforespørsel** (JWT-bearer authorization grant). Dersom forespørselen er godkjent, vil Maskinporten utstede et access_token som konsumenten kan bruke i kall mot API-tilbyder.


Følgende claims er vesentlige å ha med i grantet:


| Claim  |  Verdi | Beskrivelse  |
| --- | --- |--- |
|aud| httsp://maskinporten.no/ | Audience - issuer-identifikatoren til  Maskinporten. Verdi for aktuelt miljøå finner du på .well-known-endpunkt. |
|iss| client_id |issuer - Din egen client_id.  |
|scope| <string>| Space-separert liste over scopes som klienten forespør. Se nedenfor for forklaring |
|iat| Required| issued at - Timestamp when generating this jwt.  **NOTE:** UTC-time|
|exp| Required| expiration time - Timestamp for the expiry of this jwt,  in UTC-time. **NOTE:** Maximum 120 seconds allowed. (exp - iat <= 120 )|
|jti|Anbefalt | JWT ID - unique id for this jwt. **NOTE:** A JWT cannot be reused.

JWTen må inneholde scopet som konsumenten fikk tilgang til i steg 3.  De fulle kravene til JWT'en er spesifiert [her](oidc_auth_server-to-server-oauth2.html#grant).


```
POST /token
Content-type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=<jwt>
```
Maskinporten vil først validere gyldigheten av JWT'en. Deretter vil virksomhetssertifikatet (brukt til signering av JWT'en) valideres og dersom klienten har tilgang til de forespurte ressursene returneres et access_token til klienten.




Generelt er det sikkerhetsmessig problematisk å be om mange scopes i samme token.  
I tillegg er det noen andre begrensninger i Maskinporten:
Normal
- dersom du er leverandør, vil
Klienten har ikke full frihet til

### 6: Sende API-kall med token

Klienten kan nå aksessere APIet ved bruk av access_tokenet.  Hvordan dette gjøres, vil fremgå av API-tilbyder sin dokumentasjon, men for et "standard" REST-API brukes access_tokenet som en Authorization-header, typisk slik:

```
GET https://api.example.com/some-resource
Authorization: Bearer  <access_token>
```
De fleste API tillater flere API-kall med samme token, slik at man trenger ikke hente nytt token ved hvert kall.

Når tokenet er utløpt, vil klient typisk få 401-respons fra APIet, og steg 5 må repeteres.
