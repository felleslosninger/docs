---
title: Integrasjonsguide - Autentisering i ID-porten over OpenID Connect
description: Bruk av ID-porten sin OpenID Connect provider til autentisering med autorisasjonskode-flyten

product: ID-porten
---

ID-porten sin OpenID Connect provider tilbyr funksjonalitet for autentisering av sluttbrukere basert på autorisasjonskode-flyten, slik den er spesifisert i OpenID Connect Core 1.0 spesifikasjonen.

**Dette er den foretrukne flyten for de aller fleste tjenester** som skal bruke Id-porten som autentiseringstjeneste. Det kan finnes unntak, som for eksempel Mobilapp'er, som vil ha en litt annen måte å bruke denne flyten på.

## Overordna beskrivelse av bruksområdet

OpenID Connect tilbyr autentisering av brukere til sluttbrukertjenester. Autentiseringen blir utført av en OpenID Connect provider som utsteder ID Token til den aktuelle tjenesten.

<div class="mermaid">
graph LR
  end_user(Sluttbruker)
  OP(OpenID Connect provider)
  RP(Nett-tjeneste)
  end_user -. autentiserer seg hos .-> OP
  OP -. utsteder id_token .-> RP
  end_user -. logger inn i  .-> RP
</div>

Følgende aktører inngår:

| Aktør | Beskrivelse | Begrep OIDC |
| -|-|-|
| Sluttbruker | Ønsker å logge inn til en offentlig tjeneste | End User |
| Nett-tjeneste | Sluttbruker-tjeneste tilbudt av en offentlig etat | Relying Party (RP) / Client |
| ID-porten | ID-porten sin autentiseringstjeneste som usteder *ID Token* til aktuelle tjenesten| OpenID Provider (OP) |

## Beskrivelse av autorisasjonskode-flyten

<div class="mermaid">
sequenceDiagram
  Sluttbruker ->> Relying Party: Klikker login-knapp
  Relying Party ->> Sluttbruker: Redirect med autentiseringsforespørsel
  Sluttbruker ->> OpenID Provider: følg redirect...
  note over Sluttbruker,OpenID Provider: Sluttbruker autentiserer seg (og evt. samtykker til førespurte scopes)
  OpenID Provider ->> Sluttbruker: Redirect med autorisasjonscode
  Sluttbruker ->> Relying Party: følg redirect...
  Relying Party ->> OpenID Provider: forespørre token (/token)
  OpenID Provider ->> Relying Party: id_token (evt. flere tokens)
  note over Sluttbruker,Relying Party: Innlogget i tjenesten
</div>

* Flyten starter med at en sluttbruker prøver å aksessere en gitt tjeneste ( relaying party )
* Tjenesten krever innlogging og en redirect url til OpenID Connect provideren blir generert og returnert til sluttbrukeren. Denne redirecten representerer en **autentiseringsforespørsel**, og har parametere som identifiserer den aktuelle tjenesten for provideren.
* Sluttbrukeren kommer til **autorisasjonsendepunktet** hos provideren hvor forespørselen blir validert (f.eks. gyldig tjeneste og gyldig redirect_uri tilbake til tjenesten).
* Brukeren gjennomfører **innlogging i provideren**
* Provideren redirect'er brukeren tilbake til tjenesten. redirect url'en har satt en **autorisasjonskode**.
* Tjenesten bruker den mottatte autorisasjonskoden til å gjøre et direkteoppslag mot providerens **token-endepunkt**. Tjenesten må autentisere seg mot token-endepunktet (enten med client_secret eller en signert forespørsel)
* Dersom tjenesten kan autentiseres, valideres den mottatte autorisasjonskoden og et **ID token** blir returnert til tjenesten.
* Brukeren er nå autentisert for tjenesten og ønsket handling kan utføres

Merk: OpenID Connect bygger på OAuth2, og denne flyten er derfinert i OAuth2-spesifikasjonen. Siden *autentisering* ikke er et begrep i OAuth2 vil en ofte se at begrepet *autorisasjon* blir brukt selv om man egentlig snakker om *autentisering*


## Sesjonshåndtering

Merk: Tjenesteleverandør og ID-porten holder egne sesjoner mot sluttbruker som ikke er avhengig av hverandre. Men Digitaliseringsdirektoratet anbefaler at tjenesteleverandør bruker samme sesjonstider som ID-porten.

ID-porten sender ikke en forespørsel om utlogging til tjenesteleverandør når en sesjon timer ut pga total lengde eller inaktivitet. Forespørsel om utlogging sendes bare når en bruker foretar en eksplisitt utlogging (ved å klikke på logout-knappen hos en tjenesteinnenfor Circle of Trust). En slik forespørsel om utlogging fra ID-porten må resultere i en utlogging fra tjenesteeier, ellers vil SingleLogout-mekanismen bli kompromittert.

### Levetid for Sesjoner

I en føderasjon skal medlemmene konfigurere systemene slik at sesjoner utløper ved inaktivitet etter høyst 30 minutter.

I ID-porten måles maksimum sesjonstid for en brukers sesjon og denne settes til 120 minutter.

Det er valgfritt om timeout-perioden nullstilles hver gang brukerens nettleser forespør en av tjenesteleverandørs tjeneste, eller om den er uavhengig av brukeraktivitet (fast timeout periode).

Etter timeout hos en tjenesteleverandør, skal brukerens nettleser ved neste http-forespørsel sendes over til ID-porten med en autentiseringsforespørsel.

Det må bemerkes at timeout hos en tjenesteleverandør ikke nødvendigvis medfører at brukeren blir tvunget til å logge på ID-porten. Hvis brukeren har en aktiv sesjon hos ID-porten, kan denne svare på forespørselen fra tjenesteleverandør uten brukerdialog (dvs. foreta single sign-on). Brukeren vil dermed ikke oppdage at sesjonen blir fornyet (bortsett fra at hans nettleser muligens ”blinker” et kort øyeblikk).

Hvis en tjenesteleverandør av sikkerhetsmessige grunner vil sikre seg at brukeren blir tvunget til aktiv pålogging i ID-porten, kan man sette parameteren prompt=login i autentiseringsforespørselen til ID-porten.

Merk: Id-tokenet returnert fra ID-porten vil inneholde en "expire (exp)" verdi. Denne verdien angir kun levetid for selve tokenet, dvs. en klient skal ikke akseptere et ID-token etter at det utløpt. Denne verdien er ikke koblet mot den sentrale sesjonen hos ID-porten og gir ingen indikasjon på levetid på denne.



## Autentiseringsforespørsel til autorisasjons-endepunktet

Klienten sender en autentiseringsforespørsel ved å redirecter sluttbrukeren til autorisasjonsendepunktet.



Følgende header-parametere må brukes på request:

| Parameter  | Verdi |
| --- | --- |
|Http-metode|GET|

&nbsp;

Følgende attributter må settes på request:

| Parameter  | Verdi |
| --- | --- |
| response_type | Her støtter vi kun 'code'|
| client\_id | Klientens tildelte id |
| redirect\_uri | URI som sluttbruker skal redirectes tilbake til etter fullført authentisering. Kun forhåndsregistrerte url'er kan brukes |
| scope | Scope som forespørres. Kan være en liste separert med whitespace. For autentiseringer må _openid_ brukes |
| state | Verdi som settes av klient og returneres i callback-responsen etter fullført autentisering. Bør benyttes til å implementere CSRF-beskyttelse |
| nonce | Verdi som settes av klient og returneres som en del av ID token. Bør brukes til å binde en klient-sesjon til et gitt ID-token, og hindre replay attacks  |
| acr\_values | Ønsket sikkerhetsnivå, kan være *Level3* eller *Level4* |
| ui\_locales | Ønsket språk brukt i Id-porten. støtter *nb*, *nn*, *en* eller *se* |
| prompt | Brukes til å styre providerens interaksjon med sluttbrukeren. Foreløpig er dette parameteret lite relevant da piloten ikke ivaretar noen sentral brukersesjon |


Etter at brukeren har logget inn vil det sendes en redirect url tilbake til klienten. Denne url'en vil inneholde et autorisasjonskode-parameter `code` som kan brukes til oppslag for å hente tokens.  Koden er base64-enkoda og URL-safe.


### Eksempel på forespørsel

```

GET /authorize?
  scope=openid&
  acr_values=Level3&
  client_id=test_rp_yt2&
  redirect_uri=https://eid-exttest.difi.no/idporten-oidc-client/authorize/response&
  response_type=code&
  state=min_egendefinerte_state_verdi&
  nonce=min_egendefinerte_nonce_verdi&
  ui_locales=nb

```

### Eksempel på respons: {#authresponse}

```json
{
  "code" : "1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0=",
  "state" : "min_egendefinerte_state_verdi"
}
```


## Utstedelse av token fra token-endepunktet

Token-endepunktet brukes for utstedelse av tokens.

Bruk av endepunktet varierer litt med hvilken klient-autentiseringsmetode som benyttes. Følgende autentiseringsmetoder fra [OIDC kap. 9](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication) støttes:

* **client_secret_basic** / **client_secret_post** - Klientautentisering basert på client_secret
* **private_key_jwt** - Klientautentisering basert på JWT'er signert med virksomhetssertifikater

Felles for alle metoder er at følgende header-parametere må brukes på request:

| Parameter  | Verdi |
| --- | --- |
| Http-metode | POST |
| Content-type | application/x-www-form-urlencoded |

&nbsp;

samt at følgende attributter må sendes inn i requesten:

| Attributt  | Verdi |
| --- | --- |
| client_id | Klientens ID |
| grant_type | Valgt grant-metode, en av: <ul><li>`authorization_code`</li><li>`refresh_token`</li></ul>|
| code | autorisasjonskode (*code*) motatt i [autentiseringsresponsen](#authresponse).   |
| redirect_uri | ønsket redirect_uri, skal være identisk med verdi brukt i autentiseringsforespørsel |



### Klientautentisering med statisk klienthemmelighet

Her benyttes tidligere utlevert statisk hemmelighet(*client_secret*) til autentisering ved å legge på en standard HTTP Basic autentiserings-header (base64-enkoda sammensatt streng av client_id, kolon og client_secret).

MERK: Digitaliseringsdirektoratet vil på sikt innføre levetid på client_secret, slik at ikke disse blir evigvarende som idag. Kunde har selv ansvaret for å få rotert sin client_secret før den utløper for å unngå avbrudd i tjenesteleveransen.

##### Eksempel på forespørsel

```
POST /token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic dGVzdF9ycF95dDI6cGFzc3dvcmQ=

grant_type=authorization_code&
  redirect_uri=https%3A%2F%2Feid-exttest.difi.no%2Fidporten-oidc-client%2Fauthorize%2Fresponse&
  code=1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0%3D
```



### Klientautentisering med JWT token

Klienten må generere et JWT token med claims som definert under `private_key_jwt`-avsnittet i  [kapittel 9 av OIDC-spesifikasjonen](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication), og signere dette med et gyldig virksomhetssertifikat ihht [Rammeverk for autentisering og uavviselighet i elektronisk kommunikasjon med og i offentlig sektor](https://www.regjeringen.no/no/dokumenter/rammeverk-for-autentisering-og-uavviseli/id505958/).

Forespørselen må utvides med følgende attributter:

| Attributt  | Verdi |
| --- | --- |
| client_assertion_type | `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`|
| client_assertion | JWT ihht. kravene under   |

#### Krav til JWT for token-forespørsel

Klienten må generere og signere ein jwt med følgende elementer for å forespørre tokens fra autorisasjonsserveren:


**Header:**

| Parameter  | Verdi |
| --- | --- |
| x5c | Inneholde klientens virksomhetssertifikat som er brukt for signering av JWT'en |
| alg | RS256 - Vi støtter kun RSA-SHA256 som signeringsalgoritme |

&nbsp;

**Body:**

| Parameter  | Verdi |
| --- | --- |
|aud| Audience - identifikator for ID-portens OIDC Provider.  Se ID-portens `well-known`-endepunkt for aktuelt miljø for å finne riktig verdi. |
|iss| issuer - client ID som er registert hos ID-porten OIDC-provider|
|iat| issued at - tidsstempel for når jwt'en ble generert - **MERK:** Tidsstempelet tar utgangspunkt i UTC-tid|
|exp| expiration time - tidsstempel for når jwt'en utløper - **MERK:** Tidsstempelet tar utgangspunkt i UTC-tid **MERK:** ID-porten godtar kun maks levetid på jwt'en til 120 sekunder (exp - iat <= 120 )|
|jti| Optional - JWT ID - unik id på jwt'en som settes av klienten. **MERK:** JWT'er kan ikke gjenbrukes. ID-porten håndterer dette ved å sammenligne en hash-verdi av jwt'en mot tidligere brukte jwt'er. Dette impliserer at dersom klienten ønsker å sende mer enn en token-request i sekundet må jti elementet benytttes.|

#### Eksempel på forespørsel:

```
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
   code=n0esc3NRze7LTCu7iYzS6a5acc3f0ogp4&
   client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
   client_assertion=< jwt >
```


### Eksempel på respons fra token-endepunktet:

```
{
  "access_token" : "IxC0B76vlWl3fiQhAwZUmD0hr_PPwC9hSIXRdoUslPU=",
  "id_token" : "eyJraWQiOiJtcVQ1QTNMT1NJSGJwS3JzY2IzRUhHcnItV0lGUmZMZGFxWl81SjlHUjlzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiItdi1sY2FlNXJHRy1qbHZ6dXY5WTlIN1I4Tm1BZU0yLWtoMHFXYi12UElFPSIsImF1ZCI6InRlc3RfcnBfeXQyIiwiYWNyIjoiTGV2ZWw0IiwiYXV0aF90aW1lIjoxNDk3NjA1MjE4LCJhbXIiOiJCYW5rSUQiLCJpc3MiOiJodHRwczpcL1wvb2lkYy15dDIuZGlmaS5lb24ubm9cL2lkcG9ydGVuLW9pZGMtcHJvdmlkZXJcLyIsInBpZCI6IjIzMDc5NDEwOTE4IiwiZXhwIjoxNDk3NjA1MzgyLCJsb2NhbGUiOiJuYiIsImlhdCI6MTQ5NzYwNTI2Miwibm9uY2UiOiJtaW5fZmluZV9ub25jZV92ZXJkaSIsImp0aSI6IkhnYjN6d085ZzBiam1TYkNDdFFDeE1vd3NaRXUwMGxDSjJFeGc0Wmh2M2c9In0.Pl9APC3_GGJBLYR3AqZRC8-fjOWdIW3eQAn2zbqstGEyv8AJ6yPLiH0EA4e1RgHxK-dPwtydJF0fV-1aiPjDGYM8d-saN26WBlRyvBRH1j8A9smQv5XxJoXssfxMr-t1ZB5wDM37MOkwMF4zTNPVmyeQ0qM0PAudG7ZpT0gWPksQIWOoSk4A--MoOHPBy41xXWSpOvUh3jBqrnWEcZpqS785Ufofc6cDfXk_wM_-EMAlS-UExMq-hH60nPwXmR0cBNW3GV2xm_frYyqBYnxXoELmzREijpeSyiELTqn2k4nwCjeiGDXXs_Nw12D2KpWLDctqqsUtTTRUhsnCPSoDng",
  "token_type" : "Bearer",
  "expires_in" : 599,
  "refresh_token" : "yBtapz3ThC3uVWufWhxsLtbEidPnEsL7atvfHSBANDs=",
  "scope" : "openid"
}
```


## Struktur på Id token {#idtoken}

Det returnerte ID tokenet er en signert JWT struktur i henhold til OpenID Connect spesifikasjonen:

```
{
  "kid" : "mqT5A3LOSIHbpKrscb3EHGrr-WIFRfLdaqZ_5J9GR9s",
  "alg" : "RS256"
}
```

```
{
  "sub" : "-v-lcae5rGG-jlvzuv9Y9H7R8NmAeM2-kh0qWb-vPIE=",
  "aud" : "test_rp_yt2",
  "acr" : "Level4",
  "auth_time" : 1497605218,
  "amr" : "BankID",
  "iss" : "https://oidc-yt2.difi.eon.no/idporten-oidc-provider/",
  "pid" : "23079410918",
  "exp" : 1497605382,
  "locale" : "nb",
  "iat" : 1497605262,
  "nonce" : "min_egendefinerte_nonce_verdi",
  "jti" : "Hgb3zwO9g0bjmSbCCtQCxMowsZEu00lCJ2Exg4Zhv3g="
}
```

```
OuFJaVWQvLY9... <signaturverdi> ...isvpDMfHM3mkI
```


### ID tokenets header:

| claim | verdi |
| --- | --- |
| kid | "Key identifier" - unik identifikator for signeringsnøkkel brukt av provideren. Nøkkel og sertifikat hentes fra providerens JWK-endepunkt |
| alg | "algorithm" - signeringsalgoritme, Id-porten støtter kun RS256 (RSA-SHA256)


### ID tokenets body:

| claim | verdi |
| --- | --- |
| sub | "subject identifier" - unik identifikator for den aktuelle brukeren. Verdien er her *pairwise* - dvs en klient får alltid samme verdi for samme bruker. Men ulike klienter vil få ulik verdi for samme bruker |
| aud | "audience" - client_id til klienten som er mottaker av dette tokenet |
| acr | "Authentication Context Class Reference" - Angir sikkerhetsnivå for utført autentisering. I ID-porten sammenheng er mulige verdier "Level3" (dvs. MinID) eller "Level4" (De andre eID'ene), denne skal brukes for å sikre at brukeren er autentisert på tilstrekkelig nivå |
| auth_time | Tidspunktet for når autentiseringen ble utført. Dvs tidspunktet når brukeren logget inn i ID-porten |
| amr | "Authentication Methods References" - Autentiseringsmetode. For ID-porten er mulige verdier her *Minid-PIN*, *Minid-OTC*, *Commfides*, *Buypass*, *BankID* eller *BankID-mobil*, dette kan endre seg med avtaler og tilgjengelige e-IDer |
| iss | Identifikator for provideren som har utstedt token'et. For ID-porten sitt ext-test miljø er dette *https://eid-exttest.difi.no/idporten-oidc-provider/* |
| pid | Personidentifikator - Id-porten spesifikt claim som gir brukerens norske personidentifikator (fødselsnummer eller d-nummer) |
| exp | Expire - Utløpstidspunktet for Id tokenet. Klienten skal ikke akseptere token'et etter dette tidspunktet |
| locale | Språk valgt av sluttbrukeren under innlogging i Id-porten |
| iat | Tidspunkt for utstedelse av tokenet |
| jti | jwt id - unik identifikator for det aktuelle Id tokenet |
| sid | sesjonsid - en unik identifikator for brukerens sesjon med ID-porten OIDC Provider |


## Validering av Id token

Korrekt validering av Id token på klientsiden er kritisk for sikkerheten i løsningen. Tjenesteleverandører som tar i bruk tjenesten må utføre validering i henhold til kapittel *3.1.3.7 - ID Token Validation* i OpenID Connect Core 1.0 spesifikasjonen.


## Userinfo-endepunkt

Ved å forespørre scopet *profile* vil klienttjenesten sammen med id tokenet også få utstedt et access_token (og evnt. refresh_token)
som kan benyttes mot providerens userinfo-endepunkt. Dette endepunktet kan benyttes for å hente ytterligere data om brukeren enn det som blir eksponert via ID tokenet.
Da ID-porten generelt har lite data om sluttbrukeren har dette endepunktet begrenset verdi for denne tjenesten. Personnummer og valgt språk under innlogging er de
dataene som vil bli eksponert her.


```
URL: https://<<miljø>>/idporten-oidc-provider/userinfo
```

&nbsp;

Følgende header-parametere må brukes på request:

| Parameter  | Verdi |
| --- | --- |
| Http-metode: | GET |
| Authorization: | Bearer \<utstedt access_token\> |

### Eksempel på respons:

```
{
  "sub" : "NR8vTTPrM3T7rWf8dXxeWLZpxEMsug4E7pxqJuh9wIM=",
  "pid" : "23079421936",
  "locale" : "nb"
}
```
