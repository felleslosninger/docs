---
title: Bruk av ID-porten for innlogging til webtjenester
description: 
summary: 

sidebar: idporten_sidebar
product: ID-porten
---

## Overordna beskrivelse av bruksområdet

ID-porten tilbyr funksjonalitet for autentisering av sluttbrukere. Det er to tilgjenglige grensesnitt i ID-porten for dette formålet: 
OpenID Connect og SAML2. OpenID Connect er den anbefalte protokollen for alle nye integrasjoner. SAML2 er tilgjenglig for de som ikke
kan bruke OpenID Connect-grensesnittet. Dokumentasjonen på denne siden vil i hovedsak ta utgangspunkt i OpenID Connect protokollen. 
Se egen beskrivelse av SAML2 grensesnittet for dokumentasjon av dette.

Måten du integrerer mot ID-porten på vil variere alt etter hvilket bruksområde eller type tjeneste du som tjenesteleverandør ønsker å tilby.
Med bruksområdet "innlogging til webjenester" som beskrevet på denne siden mener vi tradisjonelle webtjenester der mesteparten av
applikasjonslogikken blir håndtert på serversiden, i motsetning til single-page javascriptapplikasjoner (SPA'er) eller mobilapplikasjoner.

Autentiseringen blir utført av ID-porten sin OpenID Connect provider som utsteder ID Token til den aktuelle tjenesten.

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

| Aktør | Beskrivelse | Begrep i OpenID Connect |
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

* Flyten starter med at en sluttbruker prøver å aksessere en gitt tjeneste (klient)
* Tjenesten krever innlogging og en redirect url til OpenID Connect provideren blir generert og returnert til sluttbrukeren. Denne redirecten representerer en **autentiseringsforespørsel**, og har parametere som identifiserer den aktuelle tjenesten for provideren.
* Sluttbrukeren kommer til **autorisasjonsendepunktet** hos provideren hvor forespørselen blir validert (f.eks. gyldig tjeneste og gyldig redirect_uri tilbake til tjenesten).
* Brukeren gjennomfører **innlogging i provideren**
* Provideren redirect'er brukeren tilbake til tjenesten. redirect url'en har satt en **autorisasjonskode**.
* Tjenesten bruker den mottatte autorisasjonskoden til å gjøre et direkteoppslag mot providerens **token-endepunkt**. Tjenesten må autentisere seg mot token-endepunktet (enten med client_secret eller en signert forespørsel)
* Dersom tjenesten kan autentiseres, valideres den mottatte autorisasjonskoden og et **ID token** blir returnert til tjenesten.
* Brukeren er nå autentisert for tjenesten og ønsket handling kan utføres

Merk: OpenID Connect bygger på OAuth2, og denne flyten er derfinert i OAuth2-spesifikasjonen. Siden *autentisering* ikke er et begrep i OAuth2 vil en ofte se at begrepet *autorisasjon* blir brukt selv om man egentlig snakker om *autentisering*




## 1: Autentiseringsforespørsel til autorisasjons-endepunktet

Klienten sender en autentiseringsforespørsel ved å redirecter sluttbrukeren til autorisasjonsendepunktet.

Se [detaljert dokumentasjon for autorisasjonsendepunktet]({{site.baseurl}}/docs/ID-porten/oidc/oidc_protocol_authorize) for valgmuligheter.


#### Eksempel på forespørsel

```

GET /authorize

  scope=openid&
  acr_values=Level3&
  client_id=test_rp_yt2&
  redirect_uri=https://eid-exttest.difi.no/idporten-oidc-client/authorize/response&
  response_type=code&
  state=min_fine_state_verdi&
  nonce=min_fine_nonce_verdi&
  ui_locales=nb

```

Etter at brukeren har logget inn vil det sendes en redirect url tilbake til klienten. Denne url'en vil inneholde et autorisasjonskode-parameter `code` som kan brukes til oppslag for å hente tokens.  Koden er base64-enkoda og URL-safe.


#### Eksempel på respons: {#authresponse}

```
{
  "code" : "1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0=",
  "state" : "min_fine_state_verdi"
}
```





## 2: Utstedelse av token fra token-endepunktet

Token-endepunktet brukes for utstedelse av tokens.

Bruk av endepunktet varierer litt med hvilken klient-autentiseringsmetode som benyttes. Følgende autentiseringsmetoder fra [OIDC kap. 9](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication) støttes:

* **client_secret_basic** / **client_secret_post** - Klientautentisering basert på client_secret
* **private_key_jwt** - Klientautentisering basert på JWT'er signert med virksomhetssertifikater (anbefalt)

Se [detaljert dokumentasjon for token-endepunktet]({{site.baseurl}}/docs/ID-porten/oidc/oidc_protocol_token) for valgmuligheter i forespørselen.

##### Eksempel på forespørsel

```
POST /token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic dGVzdF9ycF95dDI6cGFzc3dvcmQ=

grant_type=authorization_code&
  redirect_uri=https%3A%2F%2Feid-exttest.difi.no%2Fidporten-oidc-client%2Fauthorize%2Fresponse&
  code=1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0%3D
```

Dersom forespørselen blir validert som gyldig, vil det returnere et eller flere token:

* **id_token**: Autentiseringsbevis,  "hvem brukeren er"
* **access_token**: Tilgangs-token, forteller "hva brukeren kan få tilgang til"
* **refresh_token**: Brukes av klienten til å fornye access_token uten brukerinteraksjon (så lenge som autorisasjonen er gyldig)


##### Eksempel på respons:

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
  "nonce" : "min_fine_nonce_verdi",
  "jti" : "Hgb3zwO9g0bjmSbCCtQCxMowsZEu00lCJ2Exg4Zhv3g="
}
```

```
OuFJaVWQvLY9... <signaturverdi> ...isvpDMfHM3mkI
```

Se [detaljert dokumentasjon av innholdet i id_token]({{site.baseurl}}/docs/ID-porten/oidc/oidc_protocol_token#the-id_token) for dokumentasjon av de ulike claims i id_tokenet.



## Validering av Id token

Korrekt validering av Id token på klientsiden er kritisk for sikkerheten i løsningen. Tjenesteleverandører som tar i bruk tjenesten må utføre validering i henhold til kapittel *3.1.3.7 - ID Token Validation* i OpenID Connect Core 1.0 spesifikasjonen.


## Userinfo-endepunkt

Ved å forespørre scopet *profile* vil klienttjenesten sammen med id tokenet også få utstedt et access_token (og evnt. refresh_token)
som kan benyttes mot providerens userinfo-endepunkt. Dette endepunktet kan benyttes for å hente ytterligere data om brukeren enn det som blir eksponert via ID tokenet.
Da ID-porten generelt har lite data om sluttbrukeren har dette endepunktet begrenset verdi for denne tjenesten. Personnummer og valgt språk under innlogging er de
dataene som vil bli eksponert her.

Se [/userinfo-endepunktet]({{site.baseurl}}/docs/ID-porten/oidc/oidc_protocol_userinfo) for nærmere dokumentasjon.

#### Eksempel på respons:

```
{
  "sub" : "NR8vTTPrM3T7rWf8dXxeWLZpxEMsug4E7pxqJuh9wIM=",
  "pid" : "23079421936",
  "locale" : "nb"
}
```
