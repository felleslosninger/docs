---
title: Integrasjonsguide - Autentisering i ID-porten over OpenID Connect
description: Bruk av ID-porten sin OpenID Connect provider til autentisering med autorisasjonskode-flyten
summary: "Autorisasjonskode-flyten er den vanlige flyten som blir brukt i OpenID Connect, og er anbefalt flyt for de fleste tjenester."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_guide_idporten
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

{% include note.html content="I 2022 kommer det [ikke-bakoverkompatible endringer i ID-porten](oidc_protocol_nye_idporten.html)." %}

<div class="mermaid">
sequenceDiagram
  Sluttbruker ->> Relying Party: Klikker login-knapp
  Relying Party ->> Sluttbruker: Redirect med autentiseringsforespørsel
  Sluttbruker ->> OpenID Provider: følg redirect...
  note over Sluttbruker,OpenID Provider: Sluttbruker autentiserer seg (og evt. samtykker til forespurte scopes)
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



## 1: Autentiseringsforespørsel til autorisasjons-endepunktet

Klienten sender en autentiseringsforespørsel ved å redirecte sluttbrukeren til autorisasjonsendepunktet.

Se [detaljert dokumentasjon for autorisasjonsendepunktet]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_authorize) for valgmuligheter.

Klienten må være forhåndsregistrert i ID-porten, se [klient-registrering]({{site.baseurl}}/docs/idporten/oidc/oidc_func_clientreg).


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
  code_challenge=8B6wE6tV7QzZ_F7-6pLKzMh530HVWAp38kaxcmehZac&
  ui_locales=nb

```

Alle tjenester blir sterkt anbefalt å bruke state, nonce og  [PKCE]({{site.baseurl}}/docs/idporten/oidc/oidc_func_pkce) i kallet. På sikt vil disse bli obligatoriske når ID-porten oppgraderes fra Oauth2.0 til Oauth2.1

For tjenester med høye krav til sikkerhet bør en i tillegg vurdere å bruke [PAR]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_par) til å første POSTe autentiseringsparametrene direkte til ID-porten før en redirecter, slik at disse parametrene ikke blir eksponert i brukers browser.

## 2: Redirect tilbake til tjenesten

Etter at brukeren har logget inn vil det sendes en redirect tilbake til klienten til den forhåndsregistrerte `redirect_uri`.  Redirecten vil vil inneholde et autorisasjonskode-parameter `code` som  brukes til oppslag for å hente tokens.  Koden er base64-enkoda og URL-safe.



### Eksempel på respons: {#authresponse}

```
GET https://min.tjeneste.no/login_callback?code=1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0&state=min_egendefinerte_state_verdi
```


## 3: Utstedelse av token fra token-endepunktet

Token-endepunktet brukes for utstedelse av tokens.


Bruk av endepunktet varierer litt med hvilken klient-autentiseringsmetode som benyttes. Følgende autentiseringsmetoder fra [OIDC kap. 9](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication) støttes:

* **client_secret_basic** / **client_secret_post** - Klientautentisering basert på client_secret
* **private_key_jwt** - Klientautentisering basert på JWT'er signert med virksomhetssertifikater

Sistnevnte metode er anbefalt for klienter med høye krav til sikkerhet.

##### Eksempel på forespørsel:


```
POST /token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic dGVzdF9ycF95dDI6cGFzc3dvcmQ=

grant_type=authorization_code&
  redirect_uri=https%3A%2F%2Feid-exttest.difi.no%2Fidporten-oidc-client%2Fauthorize%2Fresponse&
  code=1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0%3D&
  code_verifier=8B6wE6tV7QzZ_F7-6pLKzMh530HVWAp38kaxcmehZac
```

Se [detaljert dokumentasjon for token-endepunktet]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_token) for alle valgmuligheter.  

Dersom forespørselen blir validert som gyldig, vil det returneres et eller flere token:

* **id_token**: Autentiseringsbevis,  "hvem brukeren er"
* **access_token**: Tilgangs-token, forteller "hva brukeren kan få tilgang til"
* **refresh_token**: Brukes av klienten til å fornye access_token uten brukerinteraksjon (så lenge som autorisasjonen er gyldig)


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



### id_token

id_tokenet inneholder identiteten til den autentiserte brukeren - det forteller det hvem brukeren er, men ikke hvilke tilganger brukeren har.

Normal bruker tjenesten id_tokenet kun til å opprette en egen, lokal sesjon.  Id_tokenet har derfor en ganske kort gyldighetsperiode.

#### Eksempel:
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


**Korrekt validering av id_token** av klienten er kritisk for sikkerheten i løsningen. Tjenesteleverandører som tar i bruk tjenesten må utføre validering i henhold til kapittel [3.1.3.7 - ID Token Validation i OpenID Connect Core 1.0 spesifikasjonen](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation).

[Klikk her for full dokumentasjon av id_token i ID-porten]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_id_token).



### access_token

Access_tokenet (tilgangstoken) gir klienten [tilgang til APIer hos tredjepart]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_oauth2) på vegne av den autentiserte brukeren.  

Levetiden på aksess_tokenet er som oftest relativt kort (typisk 120 sekunder). Dersom tokenet er utløpt, kan klienten forespørre nytt acess_token ved å bruke refresh_tokenet. Det gjennomføres da en klient-autentisering, for å sikre at tokens ikke blir utlevert til feil part.

Levetider kan også tilpasses per klient. Men merk at dette kan overstyres alt etter [hvilke oauth2 scopes]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_scope) som er i tokenet. Merk til slutt at levetidene på autorisasjon og tilhørende access/refresh_token har ingen sammenheng med Single-Signon(SSO)-sesjonen i ID-porten.

[Klikk her for full dokumentasjon av access_token-formatet til ID-porten]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_access_token).



## 4: Userinfo-endepunkt

Ved å forespørre scopet *profile* vil klienttjenesten sammen med id tokenet også få utstedt et access_token (og evnt. refresh_token)som kan benyttes mot providerens userinfo-endepunkt.

Dette endepunktet kan i henhold til standarden benyttes for å hente ytterligere data om brukeren enn det som blir eksponert via ID tokenet. Da ID-porten generelt har lite data om sluttbrukeren har dette endepunktet begrenset verdi i de fleste tilfeller. Personnummer og valgt språk under innlogging er de
dataene som vil bli eksponert her.


```
GET https://<<miljø>>/idporten-oidc-provider/userinfo
Authorization: Bearer eyJA...

Respons:
{
  "sub" : "NR8vTTPrM3T7rWf8dXxeWLZpxEMsug4E7pxqJuh9wIM=",
  "pid" : "23079421936",
  "locale" : "nb"
}
```


## 5: Kontaktopplysninger fra Kontakt- og Reservasjonsregisteret

Kontakt-opplysninger knyttet til innlogget bruker, er [tilgjengelig på et eget endepunkt]({{site.baseurl}}/docs/Kontaktregisteret/Brukerspesifikt-oppslag_rest) dersom access_token inneholder `user/kontaktinformasjon.read`-scopet.

## 6: Utlogging

ID-porten tilbyr single signon-funksjonalitet (SSO) mellom alle integrerte tjenester.  **Derfor må alle tjenester også implementere støtte for single logout (SLO).**

Klienten må håndtere to forskjellige utloggings-scenarier:

1. **Brukeren logger ut fra din tjeneste:**  Du må redirecte brukeren til /endsession-endepunktet til ID-porten.  ID-porten sørger for å logge brukeren ut av alle andre tjenester, og redirecter til slutt brukeren tilbake til deg.

2. **Brukeren logger ut fra annen tjeneste:** Du vil motta en front_channel_logout-melding med en sesjons-identifikator `sid` som du tidligere har mottatt i id_token. Basert på denne må du finne lokal brukersesjon og invalidere denne.

[Se full dokumentasjon om utlogging her]({{site.baseurl}}/docs/idporten/oidc/oidc_func_sso).
