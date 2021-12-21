---
title: Integrasjonsguide - Ansattporten
description: Ansattporten er en kopi av ID-porten men der funksjonaliteten er tilpasset innlogging i ansatt/representasjonskontekst.
permalink: ansattporten_guide.html
sidebar: oidc
product: ID-porten
---

Ansattporten er en egen innloggingtjeneste med funksjonalitet som skiller seg noe fra ID-porten, slik at den skal være mer hensiktmessig å bruke i ansattkontekst eller i andre situasjoner der det er ønskelig å opptre i et representasjonsforhold på vegne av andre virksomheter eller personer.

Nøkkelfunksjonalitet er:
- Er egen Oauth2 issuer
- Har ikke Single-Signon (SSO) mellom tjenester
- Valgfri *organisasjonsvelger* som lar sluttbruker bestemme representasjonsforhold (kommer 1 kvartal '22)
- Integrasjoner må opprettes med `integration_type=ansattporten` i selvbetjening

## Overordna beskrivelse av støtta brukerreiser

Ansattporten tilbyr per nå to brukerreiser:

### Brukerreise 1:  Innlogging uten SSO

Dette er den enkleste brukerreisen.  I dette scenariet utfører brukeren en engangs punktautentisering til en tjeneste. 

1. Bruker klikker login-knapp hos tjeneste.  
2. Bruker autentiserer seg med sterk eID gjennom Ansattporten. Det opprettes ikke en SSO-sesjon.
4. Bruker blir sendt tilbake til tjenesten.

Teknisk er dette løst som en helt standard [OpenID Connect code flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth), som vist i sekvensdiagrammet nedenfor:

<div class="mermaid">
sequenceDiagram

participant B as Bruker
participant C as Tjeneste
participant A as Ansattporten

B->>C: Klikker "login" på tjeneste
C->>A: /authorize (redirect)
note over B, A: sluttbruker autentiserer seg
A->>C: redirect med code
C->>A: /token  
note over B,C: innlogget i tjenesten

</div>

Ulikt ID-porten så vil ikke brukeren få opprettet en SSO-sesjon i Ansattporten.  Dersom brukeren forsøker å logge på samme eller en annen tjeneste rett etterpå, med samme browser, så må brukeren autentisere seg på nytt.



### Brukerreise 2: Innlogging på vegne av andre

Ansattporten tilbyr *beriket* autentisering, altså at informasjon om innlogget bruker blir beriket med et representasjonsforhold/autorisasjonsinformasjon fra en ekstern autorativ kilde.  I første versjon av løsningen er det Altinn Autorisasjon som tilbys som autorativ kilde.

En tjeneste aktiverer støtte for beriket autentering ved å inkludere informasjon om påkrevd representasjonsforhold (="avgiver") i autentiseringforespørselen.  Ansattporten vil da vise en organisasjonsvelger etter autentisering, der sluttbruker må velge hvilke(n) organisasjon hen vil representere:

![organsisasjonsvelger](/images/idporten/oidc/ansattporten_orgvelger.png)

Brukerreise blir da som følger:

1. Bruker klikker login-knapp hos tjeneste.  Kallet til ansattporten inneholder informasjon om hvilket representasjonsforhold som tjenesten trenger
2. Bruker autentiserer seg med sterk eID.  Det opprettes ikke SSO-sesjon i Ansattporten.
3. Bruker vises en organisasjonsvelger, der hen kan velge hvilken avgiver (organisasjon, person) som denne innloggingen skal være på vegne av,  
4. Bruker blir sendt tilbake til tjenesten, med informasjon om valgt avgiver

Dette er detaljert i sekvensdiagrammet under:


<div class="mermaid">
sequenceDiagram

participant B as Bruker
participant C as Tjeneste
participant A as Ansattporten
participant AA as Altinn Autorisasjon

B->>C: Klikker "login" på tjeneste
C->>A: /authorize inkl forespurt representasjonstype  (redirect)
note over B, A: sluttbruker autentiserer seg
  A->>AA: hente avgivere for bruker for ønska representasjon
  A->>A: vise organisasjonsvelger
  note over B, A: Bruker velger en eller flere organisasjoner
A->>C: redirect med code
C->>A: /token  
note over B,C: innlogget i tjenesten

</div>




## Metadata

Følgende miljøer er tilgjengelige for kunder:

|Miljø|Metadata | Kommentar|
|-|-|-|
|TEST|https://test.ansattporten.no/.well-known/openid-configuration| Testmiljø (samme som VER2) |
|PROD|https://ansattporten.no/.well-known/openid-configuration | |







## Protokoll-flyt


### 1: Autentiseringsforespørsel til autorisasjons-endepunktet

Klienten sender en autentiseringsforespørsel ved å redirecte sluttbrukeren til autorisasjonsendepunktet.

Se [detaljert dokumentasjon for autorisasjonsendepunktet](oidc_protocol_authorize.html) for valgmuligheter.  Merk at i Ansattporten følger vi Oauth2.1, slik at bruk av PKCE, state og nonce er påkrevd for alle klienter.

Klienten må være forhåndsregistrert i Ansattporten, se [klient-registrering](oidc_func_clientreg.html).


For tjenester med høye krav til sikkerhet bør en i tillegg vurdere å bruke [PAR](oidc_protocol_par.html) til å først POSTe autentiseringsparametrene direkte til ID-porten før en redirecter, slik at disse parametrene ikke blir eksponert i brukers browser.

Dersom klienten ønsker å vise organisasjonsvelger, må forespørselen inkludere et RAR-element som ytterligere detaljerer forespørselen, se detaljer lenger nedenfor.

Eksempel på request:
```
https://login.test.ansattporten.no/authorize?
  scope=openid&
  client_id=9a99e96d-b56c-4f74-a689-f936f71c8819&
  acr_values=low&
  response_type=code&
  redirect_uri=https%3A%2F%2Ftest-client.test.ansattporten.no%2Fcallback&
  state=Hocd3Rs77Jw1BYOFJ_PP87XPza-MdrC0M9MeL33cmqE&
  nonce=KUXk5WlVwgz-YYf0UkhLuquqaJSRr7BcmwwPC22IC1o&
  code_challenge_method=S256&
  code_challenge=YhKJpC67w6qB2KupfDuKocVarvxL8vb9WSmSB6-p-Zc&
  authorization_details= [
    {
      "type": "ansattporten:altinnressurs",
      "ressurs": "urn:altinn:resource:skd:sirius"
    }
```
(merk at eksempelet er vist i klartekst for lesbarhet og ikke riktig enkoda)



### 2: Redirect tilbake til tjenesten

Etter at brukeren har logget inn vil det sendes en redirect tilbake til klienten til den forhåndsregistrerte `redirect_uri`.  Redirecten vil vil inneholde et autorisasjonskode-parameter `code` som  brukes til oppslag for å hente tokens.  Koden er base64-enkoda og URL-safe.

Redirecten vil også inneholde `state`.  Klienten MÅ validere at mottatt state-verdi stemmer med det den sendte i forespørsel, for å detektere replay attacks.  Klienten MÅ også validere at `iss` stemmer med forventa utsteder.


Eksempel på respons:

```
https://test-client.test.ansattporten.no/callback?
 code=ERnHqwptnS9t3nGyad09Jw.og36LcOit1CaoxHSASE4_w&
 iss=https%253A%252F%252Ftest.ansattporten.no&
 state=Hocd3Rs77Jw1BYOFJ_PP87XPza-MdrC0M9MeL33cmqE
```




### 3: Utstedelse av token fra token-endepunktet

Token-endepunktet brukes for utstedelse av tokens.


Bruk av endepunktet varierer litt med hvilken klient-autentiseringsmetode som benyttes. Følgende autentiseringsmetoder fra [OIDC kap. 9](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication) støttes:

* **client_secret_basic** / **client_secret_post** - Klientautentisering basert på client_secret
* **private_key_jwt** - Klientautentisering basert på JWT'er signert med virksomhetssertifikater

Sistnevnte metode er anbefalt for klienter med høye krav til sikkerhet.

Eksempel på forespørsel:

```
POST https://test.ansattporten.no/token
Authorization: Basic ***
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

code=ERnHqwptnS9t3nGyad09Jw.og36LcOit1CaoxHSASE4_w&
grant_type=authorization_code&
redirect_uri=https://test-client.test.ansattporten.no/callback&
code_verifier=oQEG5SwL-dQlUL2ZkteJV8v0Fxz9z6j4Y1Q_86gEq78
```

Se [detaljert dokumentasjon for token-endepunktet](oidc_protocol_token.html) for alle valgmuligheter.  

Dersom forespørselen blir validert som gyldig, vil det returneres et eller flere token:

* **id_token**: Autentiseringsbevis,  "hvem brukeren er"
* **access_token**: Tilgangs-token, forteller "hva brukeren kan få tilgang til"
* **refresh_token**: Brukes av klienten til å fornye access_token uten brukerinteraksjon (så lenge som autorisasjonen er gyldig)


```

{
  "access_token" : "eyJ4NWMiOlsiTUlJRktqQ0NCQktnQXdJQkFnSUxBbGxMZ01Dd1NMVnFaeTR3RFFZSktvWklodmNOQVFFTEJRQXdVVEVMTUFrR0ExVUVCaE1DVGs4eEhUQWJCZ05WQkFvTUZFSjFlWEJoYzNNZ1FWTXRPVGd6TVRZek16STNNU013SVFZRFZRUUREQnBDZFhsd1lYTnpJRU5zWVhOeklETWdWR1Z6ZERRZ1EwRWdNekFlRncweU1EQTJNVGd4TVRReE1qVmFGdzB5TXpBMk1UZ3lNVFU1TURCYU1IRXhDekFKQmdOVkJBWVRBazVQTVNRd0lnWURWUVFLREJ0RVNVZEpWRUZNU1ZORlVrbE9SMU5FU1ZKRlMxUlBVa0ZVUlZReEVqQVFCZ05WQkFzTUNWVjBkbWxyYkdsdVp6RVVNQklHQTFVRUF3d0xSR2xuWkdseUlIUmxjM1F4RWpBUUJnTlZCQVVUQ1RrNU1UZ3lOVGd5TnpDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTXZya2lFeU1JWnJhYnJ0aDl5R3pMT2JoM3ZBS2FmdExJMFlrWFNEVUcyTVQrK2NMNTZRTFRHVU82WmJaTGtWYVRXclIranFuczJabmN0T2xqc1dsVXBkYllIaE5ET3lWU2ZRelh3SDl6THIreG1kUk9jUGRxbmZIU2dUWDU3Y0NNb2ZQd3ZySjJxMzBNQm5OZ3ZndUIwdUlPb1ZNUytBanJQaEwzS0MyWTlWcFhQWXcwdTJydjJUOUVlNDhjd2gyMzVTU1JUUXZWb0ZuY0c0Q3dpeXRiUnZXVWhoU3VkbXZqVlVUdnhQXC84OWl1eUg4M1JMOFJIMHVVQUx4NThGaGJcL2JUbVhQVFZDcEhieDhBanVOQ0wwVlhkU2pxcDIrUkphZzJYdlRkOVlkcUgwYUQyTnpITHFMeHZrSEpUdURWemtZbXdoNnNiSE5YWVhrb09BbVdyWTBDQXdFQUFhT0NBZUV3Z2dIZE1Ba0dBMVVkRXdRQ01BQXdId1lEVlIwakJCZ3dGb0FVUDY3MWVBdVNvM0FnTlY5YSt2Y2tvRklCOEVFd0hRWURWUjBPQkJZRUZEdDl5VDFQazI2UEQ4ZkhsR2JoVDZ6MXRiaFlNQTRHQTFVZER3RUJcL3dRRUF3SUdRREFkQmdOVkhTVUVGakFVQmdnckJnRUZCUWNEQWdZSUt3WUJCUVVIQXdRd0ZnWURWUjBnQkE4d0RUQUxCZ2xnaEVJQkdnRUFBd0l3Z2JzR0ExVWRId1NCc3pDQnNEQTNvRFdnTTRZeGFIUjBjRG92TDJOeWJDNTBaWE4wTkM1aWRYbHdZWE56TG01dkwyTnliQzlDVUVOc1lYTnpNMVEwUTBFekxtTnliREIxb0hPZ2NZWnZiR1JoY0RvdkwyeGtZWEF1ZEdWemREUXVZblY1Y0dGemN5NXVieTlrWXoxQ2RYbHdZWE56TEdSalBVNVBMRU5PUFVKMWVYQmhjM01sTWpCRGJHRnpjeVV5TURNbE1qQlVaWE4wTkNVeU1FTkJKVEl3TXo5alpYSjBhV1pwWTJGMFpWSmxkbTlqWVhScGIyNU1hWE4wTUlHS0JnZ3JCZ0VGQlFjQkFRUitNSHd3T3dZSUt3WUJCUVVITUFHR0wyaDBkSEE2THk5dlkzTndMblJsYzNRMExtSjFlWEJoYzNNdWJtOHZiMk56Y0M5Q1VFTnNZWE56TTFRMFEwRXpNRDBHQ0NzR0FRVUZCekFDaGpGb2RIUndPaTh2WTNKMExuUmxjM1EwTG1KMWVYQmhjM011Ym04dlkzSjBMMEpRUTJ4aGMzTXpWRFJEUVRNdVkyVnlNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJBUUN1NXUzVUg5REV4ZVI4QVdsUklNSml2SXN0NUs1WWJYRzNqVklEanFqbVdmMVFkb3hrN3NUNkNWZnFYaGFiZTRxUUxqVUxZZ0xMNkVSbWNkbytQcWlQMW45OFhRZ3pPVXpjUGhQcFZoMUNjYlpXZityZ3RjZWlhTUYzcG54MEpXeEtXS3owU2lvbGlOMlJJSGdhbSszRkQwRjBIVmpOSWFyM3RTNHE5OFlyWE1ydit0TkRNakYyS2wzamRDSmJnNTA0MFJ3eEphc2FpXC9vR21Kd3FkVWtJcmFoWldKVTlxZHJQK0ZBNldoSXJxRnpWMFVlXC92YVdvWXJSSEhvVkp1dXFHRmJSd0h6N3F4TFVTeHJVWWJJeGdqbVg0WmhrQlhPdjJtUEdYdFl4cG5ja1hrUHZDXC9MXC9qdStONGpHdVJzSnpRSWd2R080bExWbHVyNjc5SVpvTVQiXSwia2lkIjoiaGdfRlVIdW1RRVhlTWR0LXZpMnJNdXRBMGJ1eFlIa3F5SGhYYUx6TGRidyIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJoSGtBd0l2UE5wbWtLaEx5SWpUOHpzUS14MjkxVC1Tekt2Zy1LWlpCeUxNIiwiYWNyIjoic3Vic3RhbnRpYWwiLCJzY29wZSI6Im9wZW5pZCIsImlzcyI6Imh0dHBzOlwvXC90ZXN0LmFuc2F0dHBvcnRlbi5ubyIsImNsaWVudF9hbXIiOiJjbGllbnRfc2VjcmV0X2Jhc2ljIiwiZXhwIjoxNjQwMDczNjIxLCJpYXQiOjE2NDAwNzMwMjEsImp0aSI6IkJDQUFoM2I3WktVIiwiY2xpZW50X2lkIjoiOWE5OWU5NmQtYjU2Yy00Zjc0LWE2ODktZjkzNmY3MWM4ODE5IiwiY29uc3VtZXIiOnsiYXV0aG9yaXR5IjoiaXNvNjUyMy1hY3RvcmlkLXVwaXMiLCJJRCI6IjAxOTI6OTkxODI1ODI3In19.qa1wiD9DUVGcGTpKUrhJM30Rku2M3R5c7f9kT2vpm6GF0SmnILVPaa6Dbh7vZ4KGrX9L4X5eLRQVncV965L3CSmpAo8p5TrMoDTi6C0zUZ0NT0ApCfHcng_t-BAdrIz_wvuWmy8R59QF4g8tXIzho-j64edh8hcQmOAmcNrGu39j7cXscUDdWXcV38f-ycV1ofErYTJ9ht78Ss6WFIlvxl0VfcN4n_5AC-araYrgk5ATJNafjE9WRx1T3emqhD80oGV_nFIi3wDEPYubZOByaKNcZptmA3EK9emAZJGDVBkLOHxGLDLT24QiJkzMw1NXNtwo_rG7EUeo2t1FpAU5Dw",
  "refresh_token" : "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..5NU7Dag_catErRI28d7AlQ.I1vjZf9Ec6XgvYfIKU-xasIO4ul7sGpg5X039W62qDiLjX_ogfBc7dBiH5bqrqClsdeCjKaUuYoJJTxo9VrcDIIzZBLZWOnO7RcV0YtLch7INqYzD-0jag0CfL0N0Wkcyu6EMSZpBuGtKFthIGEjhT3oGG6C3hYACbsgMNHiE-SAJu1SioYj3ZDfyFcr0Lbp1utSLJvHV-q-W5-7pppw9AOSpDNh_AcCHw_-a-joDOfWqqADkRpjpCCwVXg4lOsmNXFIKZVZFASVil5-FR-AUJE5lIZfTAgqzNc-wdnUId_MeuF8GTrDu0qKfB6bf8N37EkBGxoWd53hfopXlE3JvfHTHcwLkAs-eCnuc8oKxAyCDHOFb12O2fTJtAgEl8fYWQsvg_sTnMK3319qXlNwzJretR5YFd_xT_2owMlRcriqkcXLSocIW2yNRYHnmS1rBCQjr27kJPo5gJElTc78NUABqjOJr8_YFkb4OKpej-opiWfwdYfXyjdyixgCL17aFVUL5NMF1nz_ynwvzonM50khbbDexJ5J5L51_yIK3Vlt8yEgjp4wzIjSLHHqeQm1JV877PmKeW7IPm0Ga_fEqtNICz3wJh-9B-eJcnbRBFeT0m6W1QKpPfwc44d3diq02b-6-DgakdibcfhFRZUWgnuV29cZt_BXMEm-YwmWHGDSJv1Zv-J6Gk1ZSp_2Yy5i3rvnd_1lDNAHIKBmWuRT9TRCHDx31K3xCzVO113M-qzHNO4h1ZJOTugaRzXt5GPOcw522Dov_IoVvYq7oDVxe6rRitbAvWcv1HHpUS3aClYm8iq7yWVKsytIEYIY5P_z9AU8nYpYDPGE-I1ikrmRvqgJEB8QJhcEcfogKxkrIey4iL3Hw-OY3e2So6ecWdc--684TM1URjRYezN83whRq5Gz8_3uBpWifmN84RKkslAN68CYB4ZrnaBNSBclfWPvhu55irX1AI2SDJt1nofUJ7DsWF0E-YZD0z_rImoimSZkuSnMNYNkgJgX0XC2Dbvl7lfobFCd5zJ3OQblRyeSUt-Pi7duoCfI0LnAmoWWw4gRneUqMMaY_OHHKvYDXVz1GsvHO6YgANeAW4qZdwCBtdyqi3Ipg32yY9Bz7blCLSAUvM8coZpPeZoYOqPzTw_5uBF-xv7ACBDYSSwUgzZloJsHSM6QLLrVjVh06o-XXgNuYBpwGQRmUSkTj7IBRaKVfSHthi3Mnpko6BbBoE0Tsg3ZEMc6YhAV8Q1vBqse1UYgmFIYEWBE6HuvwgeNLTruWx44_N4Y_NGHTsp-ztoSeTSyshFysJB2zQFtVhxWRcUiuBRFrlfm5wmyFm20VTE1ViE6L_WCXe68yQEJ26u8AtUmnO-iwYPeNFkVPrZDx1xtE2LYq7ICczWX_TCrJCcpqRsfKBlZmepKLVI4SU7q6-UaEdfJCtijzx-FiPivxg5I-NzUH1cN-iYDLHRAYugty4dyEJrepsjKTbRaNsROoEtI9S4S-lu4vxHtw2NMIEroxwWLdxyybmkTsLGcoIUS9VpKCLf5OVVT50tAHdYw9G7JbdOFSNKwRmEXmnvtbe6ZgSd77Ph-RQbpXkMNMA9xiBbQRjI6MhZlcrQQanV3PUvNM2ub3a2J7U7KQ_3i-jjt3GFbQfc717gvRwZztk98RJiwqwDxw_Oa4SWVf30oGJQ6HXPpDIn-L8xjYsNSeqYXUK_1eZlXy3e5m2pLwtqw.Rm9i1ismJDQUs3NItuxefw",
  "scope" : "openid",
  "id_token" : "eyJ4NWMiOlsiTUlJRktqQ0NCQktnQXdJQkFnSUxBbGxMZ01Dd1NMVnFaeTR3RFFZSktvWklodmNOQVFFTEJRQXdVVEVMTUFrR0ExVUVCaE1DVGs4eEhUQWJCZ05WQkFvTUZFSjFlWEJoYzNNZ1FWTXRPVGd6TVRZek16STNNU013SVFZRFZRUUREQnBDZFhsd1lYTnpJRU5zWVhOeklETWdWR1Z6ZERRZ1EwRWdNekFlRncweU1EQTJNVGd4TVRReE1qVmFGdzB5TXpBMk1UZ3lNVFU1TURCYU1IRXhDekFKQmdOVkJBWVRBazVQTVNRd0lnWURWUVFLREJ0RVNVZEpWRUZNU1ZORlVrbE9SMU5FU1ZKRlMxUlBVa0ZVUlZReEVqQVFCZ05WQkFzTUNWVjBkbWxyYkdsdVp6RVVNQklHQTFVRUF3d0xSR2xuWkdseUlIUmxjM1F4RWpBUUJnTlZCQVVUQ1RrNU1UZ3lOVGd5TnpDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTXZya2lFeU1JWnJhYnJ0aDl5R3pMT2JoM3ZBS2FmdExJMFlrWFNEVUcyTVQrK2NMNTZRTFRHVU82WmJaTGtWYVRXclIranFuczJabmN0T2xqc1dsVXBkYllIaE5ET3lWU2ZRelh3SDl6THIreG1kUk9jUGRxbmZIU2dUWDU3Y0NNb2ZQd3ZySjJxMzBNQm5OZ3ZndUIwdUlPb1ZNUytBanJQaEwzS0MyWTlWcFhQWXcwdTJydjJUOUVlNDhjd2gyMzVTU1JUUXZWb0ZuY0c0Q3dpeXRiUnZXVWhoU3VkbXZqVlVUdnhQXC84OWl1eUg4M1JMOFJIMHVVQUx4NThGaGJcL2JUbVhQVFZDcEhieDhBanVOQ0wwVlhkU2pxcDIrUkphZzJYdlRkOVlkcUgwYUQyTnpITHFMeHZrSEpUdURWemtZbXdoNnNiSE5YWVhrb09BbVdyWTBDQXdFQUFhT0NBZUV3Z2dIZE1Ba0dBMVVkRXdRQ01BQXdId1lEVlIwakJCZ3dGb0FVUDY3MWVBdVNvM0FnTlY5YSt2Y2tvRklCOEVFd0hRWURWUjBPQkJZRUZEdDl5VDFQazI2UEQ4ZkhsR2JoVDZ6MXRiaFlNQTRHQTFVZER3RUJcL3dRRUF3SUdRREFkQmdOVkhTVUVGakFVQmdnckJnRUZCUWNEQWdZSUt3WUJCUVVIQXdRd0ZnWURWUjBnQkE4d0RUQUxCZ2xnaEVJQkdnRUFBd0l3Z2JzR0ExVWRId1NCc3pDQnNEQTNvRFdnTTRZeGFIUjBjRG92TDJOeWJDNTBaWE4wTkM1aWRYbHdZWE56TG01dkwyTnliQzlDVUVOc1lYTnpNMVEwUTBFekxtTnliREIxb0hPZ2NZWnZiR1JoY0RvdkwyeGtZWEF1ZEdWemREUXVZblY1Y0dGemN5NXVieTlrWXoxQ2RYbHdZWE56TEdSalBVNVBMRU5PUFVKMWVYQmhjM01sTWpCRGJHRnpjeVV5TURNbE1qQlVaWE4wTkNVeU1FTkJKVEl3TXo5alpYSjBhV1pwWTJGMFpWSmxkbTlqWVhScGIyNU1hWE4wTUlHS0JnZ3JCZ0VGQlFjQkFRUitNSHd3T3dZSUt3WUJCUVVITUFHR0wyaDBkSEE2THk5dlkzTndMblJsYzNRMExtSjFlWEJoYzNNdWJtOHZiMk56Y0M5Q1VFTnNZWE56TTFRMFEwRXpNRDBHQ0NzR0FRVUZCekFDaGpGb2RIUndPaTh2WTNKMExuUmxjM1EwTG1KMWVYQmhjM011Ym04dlkzSjBMMEpRUTJ4aGMzTXpWRFJEUVRNdVkyVnlNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJBUUN1NXUzVUg5REV4ZVI4QVdsUklNSml2SXN0NUs1WWJYRzNqVklEanFqbVdmMVFkb3hrN3NUNkNWZnFYaGFiZTRxUUxqVUxZZ0xMNkVSbWNkbytQcWlQMW45OFhRZ3pPVXpjUGhQcFZoMUNjYlpXZityZ3RjZWlhTUYzcG54MEpXeEtXS3owU2lvbGlOMlJJSGdhbSszRkQwRjBIVmpOSWFyM3RTNHE5OFlyWE1ydit0TkRNakYyS2wzamRDSmJnNTA0MFJ3eEphc2FpXC9vR21Kd3FkVWtJcmFoWldKVTlxZHJQK0ZBNldoSXJxRnpWMFVlXC92YVdvWXJSSEhvVkp1dXFHRmJSd0h6N3F4TFVTeHJVWWJJeGdqbVg0WmhrQlhPdjJtUEdYdFl4cG5ja1hrUHZDXC9MXC9qdStONGpHdVJzSnpRSWd2R080bExWbHVyNjc5SVpvTVQiXSwia2lkIjoiaGdfRlVIdW1RRVhlTWR0LXZpMnJNdXRBMGJ1eFlIa3F5SGhYYUx6TGRidyIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJoSGtBd0l2UE5wbWtLaEx5SWpUOHpzUS14MjkxVC1Tekt2Zy1LWlpCeUxNIiwiYW1yIjpbIlRlc3RJRCJdLCJpc3MiOiJodHRwczpcL1wvdGVzdC5hbnNhdHRwb3J0ZW4ubm8iLCJwaWQiOiI0NTg0MDM3NTA4NCIsImxvY2FsZSI6ImVuIiwibm9uY2UiOiJLVVhrNVdsVndnei1ZWWYwVWtoTHVxdXFhSlNScjdCY213d1BDMjJJQzFvIiwic2lkIjoiNGZWU3BzWC16STkzcGxwSFgxOUNrZk84NUxYZ3JoaWJaMnBvWGtPSTZybyIsImF1ZCI6IjlhOTllOTZkLWI1NmMtNGY3NC1hNjg5LWY5MzZmNzFjODgxOSIsImFjciI6InN1YnN0YW50aWFsIiwiYXV0aF90aW1lIjoxNjQwMDczMDIwLCJleHAiOjE2NDAwNzMxNDAsImlhdCI6MTY0MDA3MzAyMCwianRpIjoiYldBY0pMTXBKZnMifQ.qx6PZvjnvo5k-diaOb97IlyMymWnkd-SQZTU3w21XQskV2k-mVNCn6EHWO1E2qaO82LxbpirITt-zWz8KAhwW6PyVWHCx6O-M664chRkxKOFd8qaaNRgu7Nn7iAPA8xUZqlegx6R3_R4QUPrJoiUvwXMFQVaGF8uZ2bnG8IuAA8kSwFVT_aiIjegK519QxbJg0xqIk6yHNi2Vfwr5Fr6Mh8drOjDM-IbLUgg4XSdKxoSM3Fuy0kFSg2hmfhEWbKApdLv7fjnUXFXZc5gYIavj50yvQ_AYm4SCClsFSsEv7yUXF75mLePkzjnj5SI85upBbFtXjUPYSEVneDISpY_uw",
  "token_type" : "Bearer",
  "expires_in" : 600
}
```



#### id_token

id_tokenet inneholder identiteten til den autentiserte brukeren - det forteller det hvem brukeren er, men ikke hvilke tilganger brukeren har.

Normal bruker tjenesten id_tokenet kun til å opprette en egen, lokal sesjon.  id_tokenet har derfor en ganske kort gyldighetsperiode.

Eksempel:
```
{
  "sub" : "hHkAwIvPNpmkKhLyIjT8zsQ-x291T-SzKvg-KZZByLM",
  "amr" : [ "TestID" ],
  "iss" : "https://test.ansattporten.no",
  "pid" : "45840375084",
  "locale" : "en",
  "nonce" : "KUXk5WlVwgz-YYf0UkhLuquqaJSRr7BcmwwPC22IC1o",
  "sid" : "4fVSpsX-zI93plpHX19CkfO85LXgrhibZ2poXkOI6ro",
  "aud" : "9a99e96d-b56c-4f74-a689-f936f71c8819",
  "acr" : "substantial",
  "auth_time" : 1640073020,
  "exp" : 1640073140,
  "iat" : 1640073020,
  "jti" : "bWAcJLMpJfs"
}
```


**Korrekt validering av id_token** av klienten er kritisk for sikkerheten i løsningen. Tjenesteleverandører som tar i bruk tjenesten må utføre validering i henhold til kapittel [3.1.3.7 - ID Token Validation i OpenID Connect Core 1.0 spesifikasjonen](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation).

I utgangspunktet er id_token frå Ansattporten like med [id_token fra ID-porten](oidc_protocol_id_token.html), men det kan være verdt å merke seg følgende forskjeller:

|claim|beskrivelse
|-|-|
|acr| Ansattporten bruker de nye verdiene: `substantial` og `high`|
|authorization_details| Informasjon om representasjonsforhold. Se detaljer nedenfor|




#### access_token

Access_tokenet (tilgangstoken) gir klienten [tilgang til APIer hos tredjepart](oidc_auth_oauth2.html) på vegne av den autentiserte brukeren.  

Levetiden på aksess_tokenet er som oftest relativt kort (typisk 120 sekunder). Dersom tokenet er utløpt, kan klienten forespørre nytt acess_token ved å bruke refresh_tokenet. Det gjennomføres da en klient-autentisering, for å sikre at tokens ikke blir utlevert til feil part.

Levetider kan også tilpasses per klient. Men merk at dette kan overstyres alt etter [hvilke oauth2 scopes](oidc_protocol_scope.html) som er i tokenet.

Ansattporten sine access_token er svært like [ID-porten sine access token](oidc_protocol_access_token.html), men med samme unntakene som i avsnittet over.




### 4: userinfo og utlogging
Ansattporten tilbyr ikke et /userinfo-endepunkt.

Siden Ansattporten ikke tilbyr SSO, er det heller ikke behov for å logge brukeren ut, eller måtte håndtere utloggingsforsepørsler initiert fra andre tjenester i circle-of-trust.


## Representasjonsforhold og RAR

Ansattporten bruker [Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) til å strukturere informasjon om representasjonsforhold, både i forespørsler og tokens.

RAR er ein ny Oauth2-utvidelse for transaksjonsspesifikke autorisasjonar.  Der "basic" Oauth2 kun gir tilgang til eit såkalt "scope" (tekst-streng), opnar RAR for tilgang til meir utvida datamodeller i form av **autorisasjonstyper**.  Autorisasjonstypen(e) blir utlevert i token som eit nytt hierarkisk claim kalla `authorization_details` som igjen er ein array av autorisasjonsobjekter, der kvart objekt består av:
- standardiserte felt:
  - type (påkrevd felt, definerer den aktuelle autorisasjonstypen)
  - action
  - locations (tiltenkt mottakar =audience for tokenet)
  - identifier  (kan peike på ein konkret ressurs hjå APIet)
  - datatypes (ein array med datatyper klient ønsker å få frå APIet)
- eigendefinerte felt,
  - til ein gitt `type` vil det normalt vere definert og dokumentert ein tilhøyrande gyldig datamodell


#### Etterspørre en autorisasjon

```
authorization_details= [
  {
    "type": "ansattporten:altinnressurs",
    "ressurs": "urn:altinn:resource:skd:sirius"
  }
```

På sikt vil det lages støtte for å etterspørre flere autorisasjonstyper i samme forespørsel.

#### Respons i token

Dersom den innlogga brukeren har valgt en organisasjon, vil token inneholde `authorization_details` slik:

```
"sub": "WE0DjFv9ygb2rjS7s_tXsg-fez2Co3Q8oxUmcvQ0mzQ=",
"iss": "https://ansattporten.no/",
"pid": "<fødselsnummer til sluttbruker>",
...
"authorization_details": [
  {
    "type": "ansattporten:altinnressurs",
    "ressurs": "urn:altinn:resource:3906:141205"
    "ressurs_name": "A01 a-melding",
    "avgiver": [{
        "Authority": "iso6523-actorid-upis",
        "ID": "0192:999888777"  // org.no til arbeidsgiveren som den innlogga brukeren har valgt i org.velger
    }]
  }
]
```




### Støtta representasjonsforhold i Ansattporten

Følgende `authorization_type` er støttet i Ansattporten:

| `authorization_type` | Skildring |
|-|-|
|ansattporten:altinnressurs| Bruker Altinn Autorisasjon som autorativ kilde for representasjonsforhold |



#### 1: Altinn Autorisasjon

I første omgang er datamodellen ganske enkel, det er gjort tanker om potensielle forbedringer på sikt [her](https://github.com/joergenb/oauth/edit/main/ansattporten_rar.md).



Datamodell:

| claim | beskrivelse |
|-|-|
|ressurs | Hvilken ressurs i Altinn som etterspørres. Se kodeverk nedenfor. |


der `ressurs` må følgje desse reglane:

|Ressurs-identifikator| Beskrivelse|Eksempel|
|-|-|-|
|urn:altinn:resource:{tjenestekode}:{tjenesteutgave} | Altinn 2 [tenestekode/utgåve](https://www.altinn.no/api/metadata?language=1044) | altinn:resource:3906:141205
|urn:altinn:resource:{org}:{appname} | Altinn 3 [org/app](https://www.altinn.no/api/metadata?language=1044) | altinn:resource:skd:sirius

De konkrete ressurs-definisjonene kan finnes på metadata-endepunktet til Altinn.

> **Mange av dagens standard Altinn-roller gir veldig breie tilganger ("Post/arkiv", "Utfyller/innsender").**  Dette er problematisert med at de ikke følger gode dataminimeringsprinsipp, og vanskeliggjør det å skulle holde oversikt over hva en gitt rolle faktisk gir tilgang til.  Derfor er ikke rolle tilbudt som mulig ressurs i Ansattporten i første runde.  Vi vurderer dette løpende, inkludert å innføre støtte for nøkkelroller fra Enhetsregisteret.
