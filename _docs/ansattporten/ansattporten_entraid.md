---
title: Entra ID i Ansattporten
description: Entra ID i Ansattporten

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_entraid
---



{% include note.html content="Entra ID er beta-funksjonalitet .  Vi ønsker virksomheter velkommen til å hjelpe oss med å teste og forbedre funksjonaliteten gjennom en pilotfase i 2025/2026. De som deltar, må være forberedt på at det kan bli løpende endringer i funksjonalitet og tekniske grensesnitt." %}

En kunde i Ansattporten kan aktivere støtte for at eksterne brukere hos andre virksomheter kan logge inn med sin jobb-konto fra Microsoft til en tjeneste.  Ansattporten kan berike innlogginga med organisasjonsnummeret til konto-eier (som oftest brukeren sin arbeidsgiver). 

Piloten skal også utforske om og evt. hvordan Ansattporten kan hjelpe med tilgangstyring til tjenester.

## Aktivere EntraID for innlogging

Klienten må legge til verdien `entraid` som del av parameteret `acr_values` i autentiseringsforespørselen.  Da vil Entra ID dukke opp i Ansattportens eID-selector slik: 

![skjermbilde av hvordan valgmuligheten for microsoft entra-id ser ut i Ansattporten](/images/ansattporten/entraid_i_eidselector.png)


*Eksempel på request (forenklet)*: 

```
https://login.test.ansattporten.no/authorize?
 acr_values=entraid+substantial&
 ...
```

Det er tillatt å sende `entraid` enten alene, eller i kombinasjon med andre eID-løsninger.


Det er Entra-innstillingene til brukeren sin organisasjon (Entra tentant) som avgjør om brukeren får lov til å logge inn til din tjeneste i Ansattporten eller ikke.  Per vår 2025 vil alle organisasjoner som følger standardinnstillingene i Entra få lov til logge inn, men brukeren må gi et samtykke første gang.  Entra-administratoren kan deaktivere slikt samtykke, sånn at innloggingen oppleves mer sømløs.   Entra-administratoren kan også blokkere Ansattporten fullstendig, dersom virksomheten vil forhindre sine ansatte fra å kunne bruke tjenester gjennom Ansattporten. 

Dersom brukeren gjennomfører en Entra ID-innlogging, vil id_tokenet som utleveres til klienten inneholde:

| claim | beskrivelse            |
| ----- | ---------------------- |
| acr    | Alltid `entraid` |
| amr    | Hvilke autentiseringfaktorer som sluttbruker benyttet. Ansattporten returnerer [amr-verdiene den får fra Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference#amr-claim),  prefix'et med `entraid`. Eksempel på 2-faktor-autentisering: `["entraid_pwd", "entraid_mfa"]`|
| email  | Epost-adressen til autentisert bruker |
| name | Navnet til brukeren slik det er registrert i Entra-tentanten |
| groups | en array med AD-gruppene som autentisert bruker inngår i. Merk: ikke fullstendig for brukere med mange grupper. |  



*Eksempel på id_token i repons*: 

```
{
  "kid" : "bdXLEWnDjLHjpE8OfyyMJxRRKmZ71LB8u1yDDmPiuT0",
  "alg" : "RS256"
}
.
{
  "sub" : "_xxxxxx",
  "iss" : "https://test.ansattporten.no",

  "acr" : "entraid",
  "amr" : [ "entraid_pwd", "entraid-mfa" ],
  "groups" : [ "83aa7a53-ff60-47e4-8940-0c73573b0130", "b699bbbe-df5b-434a-97cc-246c9a992614", .... ],
  "email" : "xxxxx@digdir.no",
  "name" : "Navn Navnesen" 
}
```



## Berike token med organisasjonsnummer

Basert på epost-domenet til innlogget bruker, kan Ansattporten også utlevere organisasjonsnummeret til eier av domenet.  Den autorative kilden for organisasjonsnummer er Digdir sin kundedatabase: alle virksomheter som har inngått Digdirs bruksvilkår registrerte samtidig et epost-domene, og det er denne mappingen som blir gjenbrukt av Ansattporten. 

Vi vurderer funksjonalitet for å kunne koble brukere til under-enheter basert på AD-grupper, ta kontakt dersom du har synspunkter her.

Ansattporten bruker standarden [Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) til å inkludere informasjon om sluttbruker sin organisasjonstilhørighet. RAR-typen `ansattporten:orgno` vil trigge slik berikelse:

*Eksempel på request (forenklet)*: 
```
https://login.test.ansattporten.no/authorize?
  acr_values=entraid ...&
 ...
  authorization_details= [
    {
      "type": "ansattporten:orgno"
    }
  ]
```


Datamodellen for respons inneholder alltid samme "type" som i request, men om dersom bruker kommer fra en organisasjon som er registrert som kunde av Digdir, vil det i tillegg utleveres:

| claim | beskrivelse            |
| ----- | ---------------------- |
| orgno | Organisasjonsidentifikator  |

*Eksempel på respons*:
```
  "authorization_details" : [ {
    "type" : "ansattporten:orgno",
    "orgno:" : {
        "Authority" : "iso6523-actorid-upis",
        "ID" : "0192:987464291"
      } 
  } ]
```

Organisasjonsidentifikatoren følger ISO6523-standarden, der verdien 0192 angir norske organisasjonsnummer.

## Tilgangstyring

I første versjon utfører ikke Ansattporten noe sentral tilgangstyring. Alle brukere får logge inn, og vil bli beriken med organisasjosnummeret.
Det er et mål for piloten å utforske hvordan tilgangstyring kan implementeres mest effektivt, og vi ønsker dialog med virksomheter om dette.

Dersom klienten, eller arbeidsgiverne som skal logge inn, ønsker å begrense hvem hos arbeidsgiver som skal kunne logge inn til en klient, må de p.t. sette opp lokal tilgangstyring basert på AD-grupper. Man må be alle arbeidsgiverne om å opprette en dedikert AD-gruppe for sin tjeneste og så utveksle guid'en som identifiserer gruppa.  Ansattporten vil videreformidle brukers AD-grupper ved innlogging. Tjenesteeier kan da  allow-liste alle guid'er fra alle arbeidsgivere. 



## Konfigurasjon 

Entra er aktivert i både TEST og PROD-miljø.

### Oppsett for tjenesteeiere

Som tjenesteeier trenger du ikke gjøre noe i egen Entra-tenant for å aktivere Entra-innlogging til din klient i Ansattporten.

Dersom du ønsker tilgangstyring, må du implementere dette selv, basert på utleverte AD-grupper som du utveklser bilateralt med de arbeidsgiverene som skal logge inn til deg.

### Oppsett for arbeidsgivere/virksomheter

Ansattporten er implementert som en [publisher verified](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview) app. App-registreringen ligger i en egen tentant, skilt vekk fra Digdir sin ordinære tentant. Appen er en såkalla [multi-tentant app](https://learn.microsoft.com/en-us/entra/identity-platform/single-and-multi-tenant-apps).  Det betyr i praksis at innlogging skal fungere "ut av boksen", og Entra-administrator hos arbeidsgiver skal normalt ikke behøve å konfigurere noe i egen Entra tentant.  Dette er dog avhengig av eksisterende sikkerhetspolicy.

Dine ansatte må samtykke til bruk av Ansattporten første gang, se [Understand user and admin consent](https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant#understand-user-and-admin-consent-and-make-appropriate-code-changes). Du som Entra-administrator kan deaktivere samtykke, sånn at innloggingen oppleves mer sømløs.  

Du som Entra-administrator kan også blokkere Anstattporten dersom din virksomhet vil forhindre ansatte fra å kunne bruke tjenester gjennom Ansattporten. 

Organisasjonsnummeret som dine ansatte blir beriket med, er basert på epost-domenet som du har registrert hos Digdir da du inngikk Digdir sine bruksvilkår, se ovenfor.


## Testing 

Man kan teste løsningen uten å lage en integrasjon ved å bruke vår demo-tjeneste [https://demo-client.test.ansattporten.no/](https://demo-client.test.ansattporten.no/).  Legg til rett acr-verdi i forespørsel, og logg inn med din egen AD-bruker.

Microsoft tilbyr ikke noe eget testmiljø, så her må du bruke din ekte Entra-bruker, alternativt få din virksomhet til å sette opp en dedikert Entra-tentant for test-formål.

