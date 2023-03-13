---
title: Integrasjonsguide - Autentisering i ID-porten over OpenID Connect
description: Bruk av ID-porten sin OpenID Connect provider til autentisering med autorisasjonskode-flyten
summary: "Autorisasjonskode-flyten er den vanlige flyten som blir brukt i OpenID Connect, og er anbefalt flyt for de fleste tjenester."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_guide_idporten
---

ID-porten tilbyr funksjonalitet for autentisering av sluttbrukere basert på autorisasjonskode-flyten, slik den er spesifisert i OpenID Connect Core 1.0 spesifikasjonen.

**Dette er den foretrukne flyten for de aller fleste tjenester** som skal bruke ID-porten som autentiseringstjeneste. Det kan finnes unntak, som for eksempel [Mobilapp'er](oidc/oidc_auth_app.html) eller [javascript-applikasjoner](oidc/oidc_guide_spa.html), som vil ha en litt annen måte å bruke denne flyten på.

## Overordna beskrivelse av bruksområdet

ID-porten tilbyr autentisering av brukere til sluttbrukertjenester. Autentiseringen blir utført av en OpenID Connect provider som utsteder ID Token til den aktuelle tjenesten.

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
| Nett-tjeneste | Sluttbruker-tjeneste tilbudt av en offentlig etat | Relying Party (RP) / Client (=klient) |
| ID-porten | ID-porten sin autentiseringstjeneste som usteder *ID Token* til aktuelle tjenesten| OpenID Provider (OP) |

## Beskrivelse av autorisasjonskode-flyten

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

* Flyten starter med at en sluttbruker prøver å aksessere en gitt tjeneste ( relying party )
* Tjenesten krever innlogging og en redirect url til OpenID Connect provideren blir generert og returnert til sluttbrukeren. Denne redirecten representerer en [**autentiseringsforespørsel**]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_authorize.html), og har parametere som identifiserer den aktuelle tjenesten for provideren.
* Sluttbrukers browser kommer til **autorisasjonsendepunktet** hos provideren hvor forespørselen blir validert (f.eks. gyldig tjeneste og gyldig redirect_uri tilbake til tjenesten).
* Brukeren gjennomfører **innlogging i provideren**
* Provideren redirect'er brukeren tilbake til tjenestens forhåndsregistrere redirect url med en **autorisasjonskode**.
* Tjenesten bruker den mottatte autorisasjonskoden til å gjøre et direkteoppslag mot providerens [**token-endepunkt**]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_token.html). Tjenesten må autentisere seg mot token-endepunktet (enten med client_secret eller en signert forespørsel)
* Dersom tjenesten kan autentiseres, valideres den mottatte autorisasjonskoden og et **ID token** blir returnert til tjenesten.
* Tjenesten omsetter normalt id_tokenet til en egen, lokal sesjon
* Brukeren er nå autentisert for tjenesten og ønsket handling kan utføres

Merk: OpenID Connect bygger på OAuth2, og denne flyten er derfinert i OAuth2-spesifikasjonen. Siden *autentisering* ikke er et begrep i OAuth2 vil en ofte se at begrepet *autorisasjon* blir brukt selv om man egentlig snakker om *autentisering*


## Sesjonshåndtering

Merk: Kunde og ID-porten holder egne sesjoner mot sluttbruker som ikke er avhengig av hverandre. Men Digitaliseringsdirektoratet anbefaler at kundene bruker samme sesjonstider som ID-porten.

ID-porten sender ikke en forespørsel om utlogging til kunden når en sesjon timer ut pga total lengde eller inaktivitet. Forespørsel om utlogging sendes bare når en bruker foretar en eksplisitt utlogging (ved å klikke på logout-knappen hos en tjeneste innenfor Circle of Trust). En slik forespørsel om utlogging fra ID-porten må resultere i en utlogging fra kunden, ellers vil SingleLogout-mekanismen bli kompromittert.

### Levetid for Sesjoner

I en føderasjon skal medlemmene konfigurere systemene slik at sesjoner utløper ved inaktivitet etter høyst 30 minutter.

I ID-porten måles maksimum sesjonstid for en brukers sesjon og denne settes til 120 minutter.

Det er valgfritt om timeout-perioden nullstilles hver gang brukerens nettleser forespør en av tjenesteleverandørs tjeneste, eller om den er uavhengig av brukeraktivitet (fast timeout periode).

Etter timeout hos en tjenesteleverandør, skal brukerens nettleser ved neste http-forespørsel sendes over til ID-porten med en autentiseringsforespørsel.

Det må bemerkes at timeout hos en tjenesteleverandør ikke nødvendigvis medfører at brukeren blir tvunget til å logge på ID-porten. Hvis brukeren har en aktiv sesjon hos ID-porten, kan denne svare på forespørselen fra tjenesteleverandør uten brukerdialog (dvs. foreta single sign-on). Brukeren vil dermed ikke oppdage at sesjonen blir fornyet (bortsett fra at hans nettleser muligens ”blinker” et kort øyeblikk).

Hvis en tjenesteleverandør av sikkerhetsmessige grunner vil sikre seg at brukeren blir tvunget til aktiv pålogging i ID-porten, kan man sette parameteren prompt=login i autentiseringsforespørselen til ID-porten.  Det er også mulig å konfigurere tjenesten sin slik at den ikke deltar i felles SSO-sesjon (se [SSO-fri innlogging]({{site.baseurl}}/docs/idporten/oidc/oidc_func_ssofri.html)).

Merk: id_tokenet returnert fra ID-porten vil inneholde en "expire (exp)" verdi. Denne verdien angir kun levetid for selve tokenet, dvs. en klient skal ikke akseptere et id_token etter at det utløpt. Denne verdien er ikke koblet mot den sentrale sesjonen hos id_porten og gir ingen indikasjon på levetid på denne.



## 1: Autentiseringsforespørsel til autorisasjons-endepunktet

Tjenesten/klienten sender en autentiseringsforespørsel ved å redirecte sluttbrukeren til autorisasjonsendepunktet.

Se [detaljert dokumentasjon for autorisasjonsendepunktet]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_authorize) for valgmuligheter.

Klienten må være forhåndsregistrert i ID-porten, se [klient-registrering]({{site.baseurl}}/docs/idporten/oidc/oidc_func_clientreg).


### Eksempel på forespørsel

```

GET https://login.idporten.no/authorize?

  client_id=min_tjeneste&
  redirect_uri=https%3A%2F%2Fmin.tjeneste.no%2Flogin_callback&

  scope=openid+profile&
  acr_values=idporten-loa-substantial&
  response_type=code&
  ui_locales=nb&

  state=sV-423vokts9_CZdO9KZSV9xb35mlgzj_7BPTt-_khQ&
  nonce=S6tRrJ3tWsilRZl7hqySoORosHDDq4l6du3dxDhXoWc&
  code_challenge=HC9NRzz4QUaVMvl2TUYrWg_L54PBleKON4hapcIOydk
  code_challenge_method=S256&

```

Alle tjenester må bruke [PKCE]({{site.baseurl}}/docs/idporten/oidc/oidc_func_pkce), og blir sterkt anbefalt å bruke state og nonce i kallet.

For tjenester med høye krav til sikkerhet bør en i tillegg vurdere å bruke [PAR]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_par) til å første POSTe autentiseringsparametrene direkte til ID-porten før en redirecter, slik at disse parametrene ikke blir eksponert for manipulasjon av brukers browser.

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
Authorization: Basic bWluX3RqZW5lc3RlOnBhc3N3b3Jk

grant_type=authorization_code&
  redirect_uri=https%3A%2F%2Fmin.tjeneste.no%2Flogin_callback&
  code=1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0%3D&
  code_verifier=gEVARFlOi5LNYfVGSMHvhZCXoG_TPzdmXQQGqzKJkz0
```

Se [detaljert dokumentasjon for token-endepunktet]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_token) for alle valgmuligheter.  

Dersom forespørselen blir validert som gyldig, vil det returneres et eller flere token:

* **id_token**: Autentiseringsbevis,  "hvem brukeren er"
* **access_token**: Tilgangs-token, forteller "hva brukeren kan få tilgang til"
* **refresh_token**: Brukes av klienten til å fornye access_token uten brukerinteraksjon (så lenge som autorisasjonen er gyldig)


```
{
  "access_token" : "eyJ4NWMiOlsiTUlJQ3NqQ0NBWnFnQXdJQkFnSUVZbSt1L3pBTkJna3Foa2lHOXcwQkFRc0ZBREFiTVJrd0Z3WURWUVFEREJCcFpIQnZjblJsYmkxemVYTjBaWE4wTUI0WERUSXlNRFV3TWpFd01UUXlNMW9YRFRJek1EVXdNakV3TVRReU0xb3dHekVaTUJjR0ExVUVBd3dRYVdSd2IzSjBaVzR0YzNsemRHVnpkRENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUEFEQ0NBUW9DZ2dFQkFMZTVuN3lXNFh2Y1J0d3RMazFVUEllakN5U3RmMUQ1akhCNnNQaUpSK3haR3JmejR4dXJJRlA4ekorbnI1OXRoblQrdVpuaFQwNzNwVUlNdkJsRCt1bjFiTWxENm9TZjJ6UTZpWmhFQ0V3bTBxdUk3RHpRcW93dGxGSUdxUTgzQ2Y4NEZjZDBVbVJiT0ZOUnJicDg3QkY2dkZzL3JsM0x0RHo4dXlWbVFXaGhubS9jR3F5ZGkxQWhXWi92YTVYdzR1SFoxYVNDOTgzK1EySllkSFZYRU45SXV4bWIvZVdlVmhzTVRXQ0FPbU4xMklvWVZHODFFOXMvMzJQZy82cFEyMkFNWjRqZzgwdGVMZTBZeWZGS2ppbUtWQnJkRTBnUXJmWThnemlBR3kwYnhhQTRBNTlneUZmcldKRTNhOE5tSHZxTHhhTE4yQ0hzcXhsQVhuRkNZd2NDQXdFQUFUQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFqY3NOVk43T0R2K1VDdlhGSVdnck0xQll4TGR0QTkvZ0QvU3ZzcGdIcjY5dUlPcHRxVTY1cklrMmllMDhPcjZRZXpTVnVRdkJ5a1U3cXgrZVFmV1N1OG1rWDRZa0VWcXBzYnh6Q0hneWEvTXJINzd2ZmV2UlhNRkk1QUlaVDU4TDdjSGovOWFYelpsRXhEVGo5bE5makFjcktCNm5kRS9rZVErUkUrdGdvM0c1Q0srVktINkJaMFJtOXQySDZBKzZxbEFZS0FCTFZ2dGFjekdKU3BQNUxrcGw0T1BscE5pY2M3MDVuQnpzYnBvMGd1WThNQjdqQnlKVWJRcXd6MCtkd3NNMWNQNkNTbFNUc3FNUWJaVjAzd1lCT014Si93dUt1Nnlyc0ZUV21sUi8rSGhvU3VkNUVBSnJHSGwvbnR6RmNBTExIcUk0dG92UFRkcGJTTVlnOXc9PSJdLCJraWQiOiJ1clFQU1pDU1hYSkhiTm9XMFZFbmtCcWJOZDFDeXdmT1RJZGNxQlRISk9FIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJFUklGdnBEN3BNNmo2WHZybnowbWw1M1YtTF9XNVpEU3Mza1lNczZkVFZjIiwiYWNyIjoiaWRwb3J0ZW4tbG9hLXN1YnN0YW50aWFsIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImlzcyI6Imh0dHBzOi8vaWRwb3J0ZW4uZGV2IiwiY2xpZW50X2FtciI6ImNsaWVudF9zZWNyZXRfYmFzaWMiLCJwaWQiOiIyMTg3OTQ5ODAxMiIsImV4cCI6MTY3ODM3NjA5MiwiaWF0IjoxNjc4Mzc1NDkyLCJqdGkiOiJVUHc4YTYtdUtHbyIsImNsaWVudF9pZCI6ImRlbW9jbGllbnRfaWRwb3J0ZW5fc3lzdGVzdCIsImNvbnN1bWVyIjp7ImF1dGhvcml0eSI6ImlzbzY1MjMtYWN0b3JpZC11cGlzIiwiSUQiOiIwMTkyOjk5MTgyNTgyNyJ9fQ.CD2j7-F3GCggX0Owh_dm-hZzLxq8RIj2Ry51B2-KrIBD4QzmsHQ9KrsNgtL9YFBLajcUqEm2QPTniTo8_JZqP_DyjiaOFV0mati84ifoIEziuHH9MXb0MiFtO0hlpFdic-i_zoiO7IBal0htCkt2kTrSKokYMp2U4dnuMkw32aK45HCHt2h1P2HWuI4EBk_KAFsOEdO2wCAJHS9jH4WTf7Q-Xx1TyzEbnsb8LuvJ8vOxKCzHgPkR5LCgdXq7gYUOxSuORYa_9MEhAnLi0riRTAMxngB3pk8ZvrrJTscC0zE0a5-xjqA0BJ9bqaHrobP13LKXRR-ol1WHTb4QHH1-qg",
  "refresh_token" : "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..WES9oML4Je5S3qxXSPZOXg.5dJtItCTk7920ihGtylDL3ytHmA-yjaN1F0FDa2zn560A6RPga5R9BUYDEZDCVzAHtaewsdg4W_b79daTjVinTY5wqSfi5fb4JnwATx1ecxu2Pjo4QronnfZrBSD3ezCrvgcxtAFJ1w9uJymYhCbWc8rqL7X7H5wdHmNTbUzaT_WGL1Ymvqe4KDgF2XLuvpxs81sWJtgW5P1vaTrf58sA_oDUJZC9qZHNrIgW4JNp7E9au0cX5H0kF1wrGnkgiALAPVYqRJsd9IDc0kLnUKvtVKKRAja098CgpmPRSs61KVz-nPmtNvVMZJXmqsQnvW9qimkxPtnTUnxyFtKiHdB-wc2Q8Gv5bUC3w7BZR5-F_DfCVzcxlraay2fSN1gWpSdR7nFqsJI4TQNBUcPEKvV3wKxdAcQgrxgYtP0jQnZ14NvaNzO5eVE1DILXznWICZ5LGpzXb7vd7Sfk23kXX7xs7beGQ5dqRnnK9hH5NEBsW1rbDOlbPES5fDrWII0n9i9-aKWBVBbi34qkQL-nKtl-WxH1bJD2FhPZw3LEfuKk_XUDkMFGfP2uoFtf7KUjb7pfqFf9d8R_ZswFH6jYDd-ohzS6p-04GC71Sw8uWCpTraYtNNkOhkqVapOKN-K2U_6oquqqJXInrXZ0Ng-PL4UOdA75I_ccGTtKd-9jjnzwoxF3wDLRy0OwwkHPdvMSYo-KEK4fBcaOFQXCu7wU-IbzF96vOESDtPi4Xho2iuTsb-NSl2WpW4P7rVxFhJsjH0g7a64278vgYx5b9nvpQkjnh-42B-xgvcQsfATnW4cffa4xGQ-QpnxI2U9FRSWBcI_7vdkdVPpilum39ub-8Qv5V-cDje6cuOLj-izJDhHtT8GisRxOAzUlkBkkonmMyxgJaCR4L0QjSBpQpemD44sKQxIOYFNjT7AcAOR5EsHwiABzAgiJIe1erZpno8Zrbh2RWg7mUs4__Kvhzpxr8hjqbldUJI4okhg9SrWpFqoJoa7syNKv_lfm8twCDGAUmfRlk8TTdXrkhEr1bXpS3Q54kLtfVbKfkGWdHVanv1aIeTFCGbN2PXGk29Q2B6yAvyVoHFLm7gniZJKmZByYDtCvF5qwbVkmPi3vNOOQma9kOo_y8Gx--FVoZ0l5ST2MJx0T3FadspcR75HCP5WEARyktuYlJG2PxvPtNBNf7E6Tak3yS8p3pQzyeeVwYgNFkGpMdmax7aCAQEAm-5x7uXmX_1b6S7SX94uqh4pxYWvy0eLHmD3mtmfzfSQBgLEr7VSZVskM8MPHsUrO4wIhwXWjyV_NTRN9Jeofb3Zvmw1jsqK3vxVdHhc6iZwpRrbyWkQdb-MN9uv3cR4Dki1yXo3p50xL21BZMJB1SH_eHwTpWMJhZ1MjMV2VTRooJ3Nh4MiMMkZ7UTRPjLsI9UwsaonzexM1ApE7eT2UxxGUZNUd5JE0--7WDcowp45E0Hb2r6EFH2wLrFOAPuzhsYG3d88x_-VySUhvnzGV8C-9bjGZKoH1cdvq_ToqejytTpYzZ9QwOSwaPIypOauSGX6W7ruCKy9YbZgIngD8z0uxlXmQzm8v6jIVAZmLktVjHfY5gUm94hNF7HckDahlmtz2izYhSaVZA3vsaNPDDTmqNAalyD2zuelD-084_UdoKBRoSBFf1WaDBO1c0-SBqeBDFfM45EaYsAUZaYb133XM78W-MYA0xLGGQ1yLsqB7GQjlPRIK9HtO9YfpXIeSJ2culmPIopSBwkrvhCFOi5lZdkj2_Q.h25pAv8_-iKYQgxPtcF5iQ",
  "scope" : "openid profile",
  "id_token" : "eyJ4NWMiOlsiTUlJQ3NqQ0NBWnFnQXdJQkFnSUVZbSt1L3pBTkJna3Foa2lHOXcwQkFRc0ZBREFiTVJrd0Z3WURWUVFEREJCcFpIQnZjblJsYmkxemVYTjBaWE4wTUI0WERUSXlNRFV3TWpFd01UUXlNMW9YRFRJek1EVXdNakV3TVRReU0xb3dHekVaTUJjR0ExVUVBd3dRYVdSd2IzSjBaVzR0YzNsemRHVnpkRENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUEFEQ0NBUW9DZ2dFQkFMZTVuN3lXNFh2Y1J0d3RMazFVUEllakN5U3RmMUQ1akhCNnNQaUpSK3haR3JmejR4dXJJRlA4ekorbnI1OXRoblQrdVpuaFQwNzNwVUlNdkJsRCt1bjFiTWxENm9TZjJ6UTZpWmhFQ0V3bTBxdUk3RHpRcW93dGxGSUdxUTgzQ2Y4NEZjZDBVbVJiT0ZOUnJicDg3QkY2dkZzL3JsM0x0RHo4dXlWbVFXaGhubS9jR3F5ZGkxQWhXWi92YTVYdzR1SFoxYVNDOTgzK1EySllkSFZYRU45SXV4bWIvZVdlVmhzTVRXQ0FPbU4xMklvWVZHODFFOXMvMzJQZy82cFEyMkFNWjRqZzgwdGVMZTBZeWZGS2ppbUtWQnJkRTBnUXJmWThnemlBR3kwYnhhQTRBNTlneUZmcldKRTNhOE5tSHZxTHhhTE4yQ0hzcXhsQVhuRkNZd2NDQXdFQUFUQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFqY3NOVk43T0R2K1VDdlhGSVdnck0xQll4TGR0QTkvZ0QvU3ZzcGdIcjY5dUlPcHRxVTY1cklrMmllMDhPcjZRZXpTVnVRdkJ5a1U3cXgrZVFmV1N1OG1rWDRZa0VWcXBzYnh6Q0hneWEvTXJINzd2ZmV2UlhNRkk1QUlaVDU4TDdjSGovOWFYelpsRXhEVGo5bE5makFjcktCNm5kRS9rZVErUkUrdGdvM0c1Q0srVktINkJaMFJtOXQySDZBKzZxbEFZS0FCTFZ2dGFjekdKU3BQNUxrcGw0T1BscE5pY2M3MDVuQnpzYnBvMGd1WThNQjdqQnlKVWJRcXd6MCtkd3NNMWNQNkNTbFNUc3FNUWJaVjAzd1lCT014Si93dUt1Nnlyc0ZUV21sUi8rSGhvU3VkNUVBSnJHSGwvbnR6RmNBTExIcUk0dG92UFRkcGJTTVlnOXc9PSJdLCJraWQiOiJ1clFQU1pDU1hYSkhiTm9XMFZFbmtCcWJOZDFDeXdmT1RJZGNxQlRISk9FIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJFUklGdnBEN3BNNmo2WHZybnowbWw1M1YtTF9XNVpEU3Mza1lNczZkVFZjIiwiYW1yIjpbIlRlc3RJRCJdLCJpc3MiOiJodHRwczovL2lkcG9ydGVuLmRldiIsInBpZCI6IjIxODc5NDk4MDEyIiwibG9jYWxlIjoibmIiLCJub25jZSI6IlM2dFJySjN0V3NpbFJabDdocXlTb09Sb3NIRERxNGw2ZHUzZHhEaFhvV2MiLCJzaWQiOiJpWlpicC1hX3dTVWZmT1N3bW4xV2VvOUVvYXV5eVFMNnBxdjBfLThiUkhrIiwiYXVkIjoiZGVtb2NsaWVudF9pZHBvcnRlbl9zeXN0ZXN0IiwiYWNyIjoiaWRwb3J0ZW4tbG9hLXN1YnN0YW50aWFsIiwiYXV0aF90aW1lIjoxNjc4Mzc1NDkxLCJleHAiOjE2NzgzNzU2MTIsImlhdCI6MTY3ODM3NTQ5MiwianRpIjoicHJrUW91Y1FKZjgifQ.rRaBSFextSifr-VsClfaJzHW9Eb5eg_BKw5OLf6MOvAU8S4C1sqz-R0y7eCPk4zPbj6H2ZLB5MVbFEa-vy1Io9COqU9-9Uh1gi0Qg58ECoMjb5tXyWA5_Vg9IiGhiAC3EfqF5L1gyMd84KNbkNF22Bx-atI1IZq2hsW6FkfK5fn2tWHfYdofOL8oiQRlwU78JaoMxRq_buc3jKf8pc0fB08VGT-RDJKlEr6ha7Z3K5Q7i-EUwLmlqRoW1Hi-PQhSgPYEVjSJ1FcB1V-R24AGCu6NF6Ax3F24Su4WLw_cEWYDu6FAbefvQrg6lBVdpN029-O1OZlLduembjOB96UgMg",
  "token_type" : "Bearer",
  "expires_in" : 600
}
```



### id_token

id_tokenet inneholder identiteten til den autentiserte brukeren - det forteller det hvem brukeren er, men ikke hvilke tilganger brukeren har.

Normal bruker tjenesten id_tokenet kun til å opprette en egen, lokal sesjon.  Id_tokenet har derfor en ganske kort gyldighetsperiode.

#### Eksempel:
```
{
  "sub": "ERIFvpD7pM6j6Xvrnz0ml53V-L_W5ZDSs3kYMs6dTVc",
  "amr": [
    "TestID"
  ],
  "iss": "https://idporten.no",
  "pid": "21879498012",
  "locale": "nb",
  "nonce": "S6tRrJ3tWsilRZl7hqySoORosHDDq4l6du3dxDhXoWc",
  "sid": "iZZbp-a_wSUffOSwmn1Weo9EoauyyQL6pqv0_-8bRHk",
  "aud": "min_tjeneste",
  "acr": "idporten-loa-substantial",
  "auth_time": 1678375491,
  "exp": 1678375612,
  "iat": 1678375492,
  "jti": "prkQoucQJf8"
}
```


**Korrekt validering av id_token** av klienten er kritisk for sikkerheten i løsningen. Det er spesielt viktig å validere at faktisk brukt sikkerhetsnivå `acr` er ihenhold til forespurt nivå.

Tjenesteleverandører som tar i bruk tjenesten må utføre validering i henhold til kapittel [3.1.3.7 - ID Token Validation i OpenID Connect Core 1.0 spesifikasjonen](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation).

[Klikk her for full dokumentasjon av id_token i ID-porten]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_id_token).



### access_token

Access_tokenet (tilgangstoken) gir klienten [tilgang til APIer hos tredjepart]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_oauth2) på vegne av den autentiserte brukeren.  

Levetiden på aksess_tokenet er som oftest relativt kort (typisk 120 sekunder). Dersom tokenet er utløpt, kan klienten forespørre nytt acess_token ved å bruke refresh_tokenet. Det gjennomføres da en klient-autentisering, for å sikre at tokens ikke blir utlevert til feil part.

Levetider kan også tilpasses per klient. Men merk at dette kan overstyres alt etter [hvilke oauth2 scopes]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_scope) som er i tokenet. Merk til slutt at levetidene på autorisasjon og tilhørende access/refresh_token har ingen sammenheng med Single-Signon(SSO)-sesjonen i ID-porten.

[Klikk her for full dokumentasjon av access_token-formatet til ID-porten]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_access_token).



## 4: Userinfo-endepunkt

Ved å forespørre scopet *profile* vil klienttjenesten sammen med id tokenet også få utstedt et access_token (og evnt. refresh_token) som kan benyttes mot providerens userinfo-endepunkt.

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

Kontakt-opplysninger knyttet til innlogget bruker, er [tilgjengelig på et eget endepunkt]({{site.baseurl}}/docs/Kontaktregisteret/Brukerspesifikt-oppslag_rest) dersom access_token inneholder `krr:user/kontaktinformasjon.read`-scopet.

## 6: Utlogging

ID-porten tilbyr single signon-funksjonalitet (SSO) mellom alle integrerte tjenester.  **Derfor må alle tjenester også implementere støtte for single logout (SLO).**

Klienten må håndtere to forskjellige utloggings-scenarier:

1. **Brukeren logger ut fra din tjeneste:**  Du må redirecte brukeren til /endsession-endepunktet til ID-porten.  ID-porten sørger for å logge brukeren ut av alle andre tjenester, og redirecter til slutt brukeren tilbake til deg.

2. **Brukeren logger ut fra annen tjeneste:** Du vil motta en front_channel_logout-melding med en sesjons-identifikator `sid` som du tidligere har mottatt i id_token. Basert på denne må du finne lokal brukersesjon og invalidere denne.

[Se full dokumentasjon om utlogging her]({{site.baseurl}}/docs/idporten/oidc/oidc_func_sso).
