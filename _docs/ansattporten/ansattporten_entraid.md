---
title: Entra ID i Ansattporten
description: Entra ID i Ansattporten

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_entraid
---



{% include note.html content="Entra ID er beta-funksjonalitet .  Vi ønsker virksomheter velkommen til å hjelpe oss med å teste og forbedre funksjonaliteten gjennom en pilotfase i 2025/2026. De som deltar, må være forberedt på at det kan bli løpende endringer i funksjonalitet og tekniske grensesnitt." %}

En tjensteeier i Ansattporten kan aktivere støtte for at en bruker kan logge inn med sin jobb-konto fra Microsoft til en tjeneste.  Ansattporten kan også berike innlogging med organisasjonsnummeret til konto-eier (som oftest arbeidsgiver).

## Aktivere EntraID for innlogging

Klienten må legge til verdien `entraid` som del av parameteret `acr_values` i autentiseringsforespørselen.  Da vil Entra ID dukke opp i Ansattportens eID-selector slik: 

![skjermbilde av hvordan valgmuligheten for microsoft entra-id ser ut i Ansattporten](/images/ansattporten/entraid_i_eidselector.png)


*Eksempel på request (forenklet)*: 

```
https://login.test.ansattporten.no/authorize?
 acr_values=substantial+entraid&
 ...
```

Det er Entra-innstillingene til brukeren sin organisasjon (Entra tentant) som avgjør om brukeren får lov til å logge inn til din tjeneste i Ansattporten eller ikke.  Per vår 2025 vil alle organisasjoner som følger standardinnstillingene i Entra få lov til logge inn, men brukeren må samtykke første gang.  Entra-administratoren kan deaktivere slikt samtykke, sånn at innloggingen oppleves mer sømløs.   Entra-administratoren kan også blokkere Anstattporten dersom en virksomhet vil forhindre sine ansatte fra å kunne bruke tjenester gjennom Ansattporten. 

Dersom brukeren gjennomfører en Entra ID-innlogging, vil id_tokenet som utleveres til klienten inneholde:

| claim | beskrivelse            |
| ----- | ---------------------- |
| acr    | Alltid `entraid` |
| amr    | Hvilke autentiseringfaktorer som sluttbruker benyttet. Ansattporten returnerer [acr-verdiene den får fra Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference#amr-claim),  prefix'et med `entraid`. Eksempel på 2-faktor-autentisering: `["entraid_pwd", "entraid_mfa"]`|
| email  | Epost-adressen til autentisert bruker |
| name | Navnet til brukeren slik det er registrert i Entra-tentanten |
| groups | en array med de 20 første AD-gruppene som autentisert bruker inngår i. |  



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

Ansattporten bruker standarden [Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) til å inkludere informasjon om sluttbruker sin organisasjonstilhørighet.

RAR-typen `ansattporten:orgno` vil trigge slik berikelse:


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


Datamodellen for respons inneholder alltid claiment "type" som i request, men om bruker har valgt å representere en virksomhet, vil det i tillegg utleveres:

| claim | beskrivelse            |
| ----- | ---------------------- |
| orgno | Norsk organisasjonsnummer  |

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


## Oppsett for arbeidsgivere

Ansattporten er implementert som en [publisher verified](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview) app i Ansattporten sin Entra ID tentant.  Appen er en såkalla [multi-tentant app](https://learn.microsoft.com/en-us/entra/identity-platform/single-and-multi-tenant-apps).

Dine ansatte må samtykke til bruk av Ansattporten første gang, se [Understand user and admin consent ](https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant#understand-user-and-admin-consent-and-make-appropriate-code-changes).Du som Entra-administrator kan deaktivere samtykke, sånn at innloggingen oppleves mer sømløs.  

Du som Entra-administrator kan også blokkere Anstattporten dersom en virksomhet vil forhindre sine ansatte fra å kunne bruke tjenester gjennom Ansattporten. 

Organisasjonsnummeret som dine ansatte blir beriket med, er basert på epost-domenet som du har registrert hos Digdir da du inngikk Digdir sine bruksvilkår.


#### Testbrukere

Man kan teste løsningen uten å lage en integrasjon ved å bruke vår demo-tjeneste [https://demo-client.test.ansattporten.no/](https://demo-client.test.ansattporten.no/).  Legg til rett acr-verdi i forespørsel, og logg inn med din egen AD-bruker.

Microsoft tilbyr ikke noe eget testmiljø, så her må du bruke din ekte Entra-bruker, alternativt få din virksomhet til å sette opp en dedikert Entra-tentant for test-formål.
