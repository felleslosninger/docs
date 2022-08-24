---
title: Slik bruker du Maskinporten som API-konsument
description:  Maskinporten som API-konsument
summary: 'API-konsumenter må lage en Maskinporten-integrasjon som har det aktuelle APIet sitt scope registrert.'

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_guide_apikonsument
---

Dette dokumentet viser de stegene som en API-konsument må gjøre for å bruke Maskinporten.


### Overordnet prosedyre for API-sikring med Maskinporten

En full verdikjede for API-sikring med Maskinporten består av følgende steg:

1. API-tilbyder blir manuelt tildelt et API-prefiks i Maskinporten
2. API-tilbyder oppretter et API (scope)
3. API-tilbyder gir tilgang til en konsument
4. Konsument oppretter en Maskinporten-integrasjon (oauth2-klient) og registrerer  scopet til denne.

Tilgang er nå etablert.  Når API'et så skal brukes run-time, gjennomføres følgende steg:

5. Konsumenten sin Oauth2-klient forespør token fra Maskinporten
6. Konsumenten inkluderer token i kall til APIet.
7. API-tilbyder validerer tokenet, utførerer evt. fin-granulert tilgangskontroll og returnerer forespurt ressurs.


## Prosedyre for API-konsument



### 4. Opprett en integrasjon i Maskinporten

Du må opprette en integrasjon (en såkalt oauth2-klient) i Maskinporten.

Klienten må autentisere seg mot Maskinporten enten med virksomhetssertifikat, eller med en  asymmetrisk nøkkel som konsumenten selv lager.

Klienten må registreres med følgende Oauth2 egenskaper:

| Egenskap   | Verdi   |   Forklaring |
|-|-|-|
|integration_type  | "Maskinporten"   |  Dette feltet forteller Digitaliseringsdirektoratet hvilken integrasjon dette er.   |
| token_endpoint_auth_method  | "private_key_jwt"  | Maskinporten aksepterer kun sertifikat og nøkler, og ikke client_secret for å autentisere klienter |
| grant_types   | "urn:ietf:params:oauth:grant-type:jwt-bearer"  | Maskinporten aksepterer kun signerte JWTer som grants.  |
| client_id  | auto-tildelt  | Blir satt av Digitaliseringsdirektoratet ved registrering  |
| description  |  string | Du må skrive inn en god beskrivelse av tjenesten. Denne blir synlig for Digitaliseringsdirektoratets  personell.  |
| scopes | string, space-separert | Ett eller flere API/scopes som din organisasjon har fått tildelt tilgang til av API-tilbyder.


Dersom du er leverandør som skal bruke APIer som krever at din kunde aktivt delegerer tildelt API-tilgang i Altinn, så må du opprette en klient og legge det korrekt scopet på klienten. Alle scopes som bruker Altinn-delegering er tilgjengelig dersom du trykker på "Scopes tilgjengelig for alle" når du skal legge til scopes på en klient.

Noen APIer kan aksesseres av alle Maskinporten sine konsumenter (såkalt whitelisting). Det er da ikke mulig å forhåndsregistere slike scopes på klienten.

Det kan være en sikkerhetsrisiko  å la samme klient ha tilgang til for mange APIer, så vi anbefaler at konsumenter lager en ny klient ved å POSTe inn konfigurasjonen til denne:


#### Registrering via Samarbeidsportalen

Du kan logge inn på [https://samarbeid.digdir.no/](https://samarbeid.digdir.no/) og registrere den nye integrasjonen. Merk at Samarbeidsportalen p.t. kun lar deg opprette integrasjoner som kan bruke virksomhetssertifikat, ikke asymmetriske nøkler.

Alle organisasjoner som har inngått Digitaliseringsdirektoratets  bruksvilkår skal ha tilgang til Samarbeidsportalen i testmiljø.  Du må selv-registrere en bruker med din organisasjon sitt registrerte epost-domene.

For selvbetjening i Produksjon, kreves innlogging med ID-porten og at bemyndiget person for din organisasjon godkjenner hvilke fødselsnummer som skal ha tilgang.

<!-- 
[![Opprette integrasjon](https://samarbeid.difi.no/sites/samarbeid2/files/opprette_integrasjon_png.png)](https://samarbeid.difi.no/sites/samarbeid2/files/opprette_integrasjon.mp4 "Opprette integrasjon") 
-->



#### Registrere klient som bruker virksomhetssertifikat

For å kunne registrere en klient via vår selvbetjenings-API, må du først opprette en selvbetjeningsklient.  Se [https://difi.github.io/felleslosninger/oidc_api_admin.html](https://docs.digdir.no/docs/idporten/oidc/oidc_api_admin).

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

Dette må gjøres i to steg: først oppretter du en klient som i eksempelet over, for så å opprette et nøkkel-sett på denne:
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

#### Registrere klient som leverandør for ekstern delegering

Leverandører som bruke ekstern delegering registerer sin integrasjon på samme måte som over.


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


Grantet kan inneholde mange forskjellige claims. Disse er de mest vesentlige:

| Claim  |  Verdi | Beskrivelse  |
| --- | --- |--- |
|aud| https://maskinporten.no/ | Audience - issuer-identifikatoren til  Maskinporten. Verdi for aktuelt miljø finner du på .well-known-endpunkt. |
|iss| client_id |issuer - Din egen client_id.  |
|scope| <string>| Space-separert liste over scopes som klienten forespør. |
|iat| 1573132283| issued at - Tidspunkt for når JWTen ble laget. **Merk:** UTC-tid|
|exp| 1573132383| expiration time - Tidspunkt for utløp av JWTen.  **Merk:** Max 120 sekund tillatt.  (exp - iat <= 120 )|
|jti|Anbefalt | JWT ID - unique id for denne jwt. **Merk:** A JWT kan ikke gjenbrukes.  |


Se gjerne [den fullstendige grensesnittspesifikasjonen for JWT-grants]({{site.baseurl}}/docs/Maskinporten/maskinporten_protocol_jwtgrant) for utfyllende dokumentasjon.

Slik kan en forspørsel se ut:
```
POST /token
Content-type: application/x-www-form-urlencoded

  grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&
  assertion=<jwt>
```
der payload i JWT kan se slik ut:
```
{
  "aud" : "https://ver2.maskinporten.no/",
  "scope" : "difitest:test2",
  "iss" : "min_egen_clientid",
  "exp" : 1584693183,
  "iat" : 1584693063,
  "jti" : "b1197d5a-0c68-4c4a-a95c-dc07c1194600"
}
```

Maskinporten vil først validere gyldigheten av JWT'en. Deretter vil virksomhetssertifikatet (brukt til signering av JWT'en) valideres og dersom klienten har tilgang til de forespurte ressursene returneres et access_token til klienten.

Dersom du er leverandør opp mot et API som krever ekstern delegering, må du inkludere claimet `consumer_orgno` i grantet. Maskinporten vil da sjekke mot Altinn om du har lov til å opptre på vegne av den aktuelle konsumenten, for det aktuelle scopet.

Generelt er det sikkerhetsmessig problematisk å be om mange scopes i samme token, så vi anbefaler ett scope per token.


### 6: Sende API-kall med token

Klienten kan nå aksessere APIet ved bruk av access_tokenet.  Hvordan dette gjøres, vil fremgå av API-tilbyder sin dokumentasjon, men for et "standard" REST-API brukes access_tokenet som en Authorization-header, typisk slik:

```
GET https://api.example.com/some-resource
Authorization: Bearer  <access_token>
```
De fleste API tillater flere API-kall med samme token, slik at man trenger ikke hente nytt token ved hvert kall.

Når tokenet er utløpt, vil klient typisk få 401-respons fra APIet, og steg 5 må repeteres.



## Bruke delegering via Altinn autorisasjon



### Bruke delegering som konsument

Bemyndiget person må logge inn i Altinn og delegere tilgangen videre til en leverandør:

1. Etter innlogging, velg å representere foretaket
2. Klikk så "profil" i toppmenyen, og klikk panelet "Andre med rettigheter".
1. Klikk "Legge til ny person eller virksomhet", og velg "Ekstern virksomhet"
1. Søk opp leverandøren din, ved å oppgi orgnr + første 4 tegn av navnet:
![delgering-gi tilgang]({{site.baseurl}}/images/maskinporten/altinn_delegering_leggtil.png)
1. I feltet "Gi nye rettigheter", søk opp navnet på delegation-schemaet, og klikk dette
![delgering-gi tilgang]({{site.baseurl}}/images/maskinporten/altinn_delegering_soek_delegeringsoppsett.png)

1. Bekreft med å klikk "Gi rettigheter"
![delgering-gi tilgang]({{site.baseurl}}/images/maskinporten/altinn_delegering_bekreftelse.png)

### Bruke delegering som leverandør

Leverandør-integrasjoner som skal bruke ekstern delegering, er litt forskjellige fra andre integrasjoner i ID-porten/Maskinporten, og det er derfor viktig å få de registrert korrekt.

ID-porten/Maskinporten har allerede to eksisterende interne delegeringsmekanismer, som ikke er kompatible med delegering i Altinn. For å oppnå korrekt registrering, må du da:

* For leverandører som bruker selvbetjeningsløsningen på samarbeidsportalen, er det viktig å merke seg at du må opprette integrasjonen som tilhørende deg selv, og ikke velge "på vegne av en kunde" eller "på vegne av flere kunder".
* For leverandører som bruker selvbetjenings-API, må de ikke bruke tokens med `idporten:dcr.supplier`-scopet, men derimot `idporten:dcr.write`: leverandøren skal altså ikke sette client_orgno i registrerings-kallet.

Når integrasjonen din så skal forespørre tokens på vegne av konsumenter, må du oppgi konsumentens organisasjonsnummer som `consumer_org`-claim i JWT-grantet. Maskinporten vil da sjekke Altinn, om et gyldig delegeringsforhold finnes mellom konsument og leverandør for aktuelt scope.

#### Eksempel på bruk  av altinn:
JWT Grant i request:
```
{
  "aud" : "https://ver2.maskinporten.no/",
  "scope" : "difitest:test2",
  "iss" : "oidc_difi_delegering_altinn",
  "exp" : 1584693183,
  "consumer_org" : "910753614",
  "iat" : 1584693063,
  "jti" : "b1197d5a-0c68-4c4a-a95c-dc07c1194600"
}
```
som gir respons:
```
{
  "iss" : "https://ver2.maskinporten.no/",
  "client_amr" : "virksomhetssertifikat",
  "token_type" : "Bearer",
  "client_id" : "oidc_difi_delegering_altinn",
  "aud" : "unspecified",
  "scope" : "difitest:test2",
  "supplier" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:991825827"
  },
  "exp" : 1584694406,
  "delegation_source" : "https://tt02.altinn.no/",
  "iat" : 1584693406,
  "jti" : "U8E9-Zu8qVyAOLfm_M0UbalbVYjMt3kakanvE5dV9zk",
  "consumer" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:910753614"
  }
}
```
