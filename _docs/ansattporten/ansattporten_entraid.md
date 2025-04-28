---
title: Entra ID i Ansattporten
description: Entra ID i Ansattporten

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_entraid
---



{% include note.html content="Entra ID er beta-funksjonalitet .  Vi ønsker virksomheter velkommen til å hjelpe oss med å teste og forbedre funksjonaliteten gjennom en pilotfase i 2025/2026. De som deltar, må være forberedt på at det kan bli løpende endringer i funksjonalitet og tekniske grensesnitt." %}

En tjensteeier i Ansattporten kan aktivere støtte for at en bruker kan logge inn med sin jobb-konto fra Microsoft til en tjeneste.

## Aktivere EntraID for innlogging

Klienten må legge til verdien `entraid` som del av parameteret `acr_values` i autentiseringsforespørselen.  Da vil Entra ID dukke opp i Ansattportens eID-selector slik: 

![skjermbilde av hvordan valgmuligheten for microsoft entra-id ser ut i Ansattporten](entraid_i_eidselector.png.png)


*Eksempel på request (forenklet)*: 

```
https://login.test.ansattporten.no/authorize?
 acr_values=substantial+entraid&
 ...
```


Dersom brukeren gjennomfører en Entra ID-innlogging, vil id_tokenet som utleveres til klienten inneholde:

| claim | beskrivelse            |
| ----- | ---------------------- |
| acr    | Alltid `entraid` |
| amr    | Enten `entraid_pwd`  dersom bruker bare har autentisert seg med 1-faktor, som passord, eller `entraid_mfa`  dersom brukeren har autentisert seg med 2-faktor. |
| email  | Epost-adressen til autentisert bruker |
| groups | en array med de 20 første AD-gruppene som autentisert bruker inngår i. |  


## Berike token med organisasjonsnummer

Ansattporten bruker standarden [Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) til å inkludere informasjon om sluttbruker sin organisasjonstilhørighet.

RAR-typen `ansattporten:organisasjonsnummer` vil trigge slik berikelse:


*Eksempel på request (forenklet)*: 
```
https://login.test.ansattporten.no/authorize?
  acr_values=entraid ...&
 ...
  authorization_details= [
    {
      "type": "ansattporten:organisasjonsnummer"
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
    "type" : "ansattporten:organisasjonsnummer",
    "orgno:" : {
        "Authority" : "iso6523-actorid-upis",
        "ID" : "0192:987464291"
      } 
  } ]
```



#### Testbrukere

Man kan teste løsningen uten å lage en integrasjon ved å bruke vår demo-tjeneste [https://demo-client.test.ansattporten.no/](https://demo-client.test.ansattporten.no/).  Legg til rett acr-verdi i forespørsel, og logg inn med din egen AD-bruker.

Microsoft tilbyr ikke noe eget testmiljø, så her må du bruke din ekte Entra-bruker, alternativt få din virksomhet til å sette opp en dedikert Entra-tentant for test-formål.
