---
title: Entra ID i Ansattporten
description: Entra ID i Ansattporten

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_entraid
---



{% include note.html content="Entra ID er i pilotfase.  Vi ønsker virksomheter velkommen til å hjelpe oss med å teste og forbedre funksjonaliteten gjennom en pilotfase i 2025/2026. De som deltar, må være forberedt på at det kan bli løpende endringer i funksjonalitet og tekniske grensesnitt." %}

En tjenesteeier i Ansattporten kan aktivere støtte for at en bruker kan logge inn med sin jobb-konto fra Microsoft til en tjeneste.  Tilsvarende kan arbeidsgivere konfigurere hvilke brukere som skal få lov til å representere virksomheten inn mot slike tjenester. Piloten skal også utforske om og evt. hvordan Ansattporten kan hjelpe med tilgangstyring til tjenester.

## Aktivere EntraID for innlogging

Klienten må legge til verdien `entraid` som del av parameteret `acr_values` i autentiseringsforespørselen.  Da vil Entra ID dukke opp i Ansattportens eID-selector slik:

![skjermbilde av hvordan valgmuligheten for microsoft entra-id ser ut i Ansattporten](/images/ansattporten/entraid_i_eidselector.png)


*Eksempel på request (forenklet)*:

```
https://login.test.ansattporten.no/authorize?
 acr_values=substantial+entraid&
 ...
```

Det er Entra-innstillingene til brukerens organisasjon (Entra-tenanten) som avgjør om brukeren får lov til å logge inn til din tjeneste i Ansattporten eller ikke.  Per vår 2026 vil alle organisasjoner som følger standardinnstillingene i Entra få lov til å logge inn, men brukeren må samtykke første gang.  Entra-administratoren kan deaktivere slikt samtykke, sånn at innloggingen oppleves mer sømløs.   Entra-administratoren kan også blokkere Ansattporten dersom en virksomhet vil forhindre sine ansatte fra å kunne bruke tjenester gjennom Ansattporten.

Dersom brukeren gjennomfører en Entra ID-innlogging, vil id_tokenet som utleveres til klienten inneholde:

| claim | beskrivelse            |
| ----- | ---------------------- |
| acr    | Alltid `entraid` |
| amr    | Hvilke autentiseringsfaktorer som sluttbruker benyttet. Ansattporten returnerer [acr-verdiene den får fra Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference#amr-claim), prefixet med `entraid`. Eksempel på 2-faktor-autentisering: `["entraid_pwd", "entraid_mfa"]`|
| email  | E-postadressen til autentisert bruker |
| family_name | Etternavnet til brukeren slik det er registrert i Entra-tenanten. Utleveres bare med "profile" scope.|
| given_name | Fornavnet til brukeren slik det er registrert i Entra-tenanten. Utleveres bare med "profile" scope. |
| groups | en array med de 20 første AD-gruppene som autentisert bruker inngår i. |  



*Eksempel på id_token i respons*:

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
  "given_name" : "Navn",
  "family_name" : "Navnesen"
}
```


## Representere en organisasjon

Selv om en bruker har benyttet sin Entra jobb-konto til innlogging mot din tjeneste betyr ikke dette nødvendigvis at brukeren har fått lov til å representere den organisasjonen som eier Entra-tenanten.

For å kunne avlede faktisk representasjon med Ansattporten og EntraID, må følgende to vilkår være oppfylt:

- Tjenesteeier må både forespørre og evaluere representasjon.  Dette blir gjort ved å bruke [RAR-elementet `ansattporten:orgno`](ansattporten_rar.html#datamodell-for-arbeidsgivers-organisasjonsnummer-ansattportenorgno).
- Arbeidsgivere må aktivt gi tilganger til sine Entra-brukere ved å konfigurere funksjonaliteten [Virksomhetsbroen](ansattporten_virksomhetsbroen)


*Eksempel på respons som forteller at innlogget bruker representerer en virksomhet*:
```
"authorization_details" : [ {
    "authorized_parties" : [ {
      "orgno" : {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:312206498"
      },
      "name" : "NYBAKT IDIOTSIKKER ISBJØRN SA",
      "rights" : [ "Report", "Write" ]
    } ],
    "type" : "ansattporten:orgno"
  } ]
```

Per i dag er det ingen sentral mekanisme i Ansattporten for å begrense hvilke arbeidsgivere som får lov til å logge inn til din tjeneste.  Alle virksomheter som har konfigurert tilgang gjennom Virksomhetsbroen vil kunne logge inn.

## Konfigurasjon

Ansattporten er implementert som en [publisher verified](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview) app. App-registreringen ligger i en egen tenant, skilt vekk fra Digdir sin ordinære tenant. Appen er en såkalt [multi-tenant app](https://learn.microsoft.com/en-us/entra/identity-platform/single-and-multi-tenant-apps).  Det betyr i praksis at innlogging skal fungere "ut av boksen", og Entra-administrator hos tjenesteeiere og arbeidsgivere normalt ikke behøver å konfigurere noe i egen Entra-tenant for å ta funksjonaliteten i bruk.

### Oppsett for tjenesteeiere

Tjenesteeier trenger ikke å gjøre noe i egen Entra-tenant for å aktivere Ansattporten.

I selve innloggingsrequesten fra din Ansattporten-tjeneste må du aktivere Entra som et innloggingsvalg ved å bruke `acr` og evt. representasjon/tilgangstyring ved å bruke RAR, som forklart ovenfor.

### Oppsett for arbeidsgivere

Arbeidsgiver må konfigurere [Virksomhetsbroen](ansattporten_virksomhetsbroen) før egne Entra-brukere får lov til å representere arbeidsgivers virksomhet.

Som arbeidsgiver trenger du normalt ikke å konfigurere noe i egen Entra-tenant for at dine Entra-brukere skal kunne logge inn gjennom Ansattporten til andre tjenester.  Dette er dog avhengig av eksisterende sikkerhetspolicy.
Dine ansatte må samtykke til bruk av Ansattporten første gang, se [Understand user and admin consent ](https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant#understand-user-and-admin-consent-and-make-appropriate-code-changes). Du som Entra-administrator kan deaktivere samtykke, sånn at innloggingen oppleves mer sømløs.  

Du som Entra-administrator kan også blokkere Ansattporten dersom en virksomhet vil forhindre sine ansatte fra å kunne bruke tjenester gjennom Ansattporten.


## Testing

Man kan teste løsningen uten å lage en integrasjon ved å bruke vår demo-tjeneste [https://demo-client.test.ansattporten.no/](https://demo-client.test.ansattporten.no/).  Legg til rett acr-verdi i forespørsel, og logg inn med din egen AD-bruker.

Microsoft tilbyr ikke noe eget testmiljø, så her må du bruke din ekte Entra-bruker, alternativt få din virksomhet til å sette opp en dedikert Entra-tenant for testformål.

