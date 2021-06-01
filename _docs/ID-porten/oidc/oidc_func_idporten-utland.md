---
title: idporten-utland
description: ID-porten utland
summary: "idporten-utland er en ny nasjonal fellestjeneste for brukere som mangler F/D-nummer i norsk folkeregister. "
permalink: oidc_func_idporten-utland.html
sidebar: oidc
product: ID-porten
---


Løsningen baserer seg på gjenbruk av eID-løsninger som brukeren allerede har, som Google/Apple-ID. På denne måten slipper brukeren å måtte lage nok en brukerkonto med passord som lett kan glemmes.  Alle som har en smart-telefon har en slik eID.

For at løsningen skal kunne brukes i ulike sektorer og kunne støtte den variasjon av fagsystem og identifikatorer som er i bruk i offentlig sektor, kan kunder be om at apple/google-innloggingen blir **beriket** med norske sektor-spesifikke identifikatorer som feks Nasjonal Felles Hjelpenummer fra helsesektoren. Første gang en eID logger på vil idporten-utland rekvirere en ny sektor-identifikator fra forespurt register og lagre en permanent kobling mellom eID og identifikator i idporten-utland sin lokale brukerdatabase.  Ved senere innlogginger med samme eID, mottar derfor kunde samme sektor-identifikator.



## Metadata, endepunkt og klientregistreringer


| Mijlø | Issuer | .well-known |
|-|-|-|
|PROD| tbd | tbd|
|PREPROD| https://idporten-utland-test.digdir.eon.no/c2id | [https://idporten-utland-test.digdir.eon.no/c2id/.well-known/openid-configuration](https://idporten-utland-test.digdir.eon.no/c2id/.well-known/openid-configuration) |


idporten-utland kjører i et eget, Kubernetes-basert on-prem driftsmiljø hos driftsleverandør TietoEvry.

Løsningen er koblet mot Selvbetjening på samarbeidsportalen, slik at det er lett å integrere mot den.  Det er ennå ikke lagt til eget valg for idporten-utland som  `integration_type` i Samarbeidsportalen, slik at alle  integrasjoner som virker i den "vanlige" ID-porten (OIDC) også virker mot id-porten utland.  Vi anbefaler dog at kunder oppretter egne integrasjoner spesifikt for idporten-utland. For testmiljø er det VER2 som gjelder.

**Merk:** Pga. en intern begrensning er det kun klienter registert med 1 og bare 1 redirect-uri som virker i idporten-utland p.t.




## Protokoll

* Bruker OIDC med oauth2.1 i botn,  dvs authorization-code-flow med  PKCE+state+nonce er påkrevd for alle klienter.
  * ikkje støtte for PAR i første versjon

* klienter bruker primært scopes for å få de sektor-spesifikke identifikatorene de ønsker

    * t.d `idporten:utland:fhnummer` dersom klienten ønsker Nasjonalt Felles Hjelpenummer

    * dersom  forespurt informasjon ikkje finst tilknytta brukar-kontoen'en frå før, so vert det rekvirert frå autorativ kjelde der&då.

    * `openid profile` er ein gyldig kombinasjon, dvs. lov å logge inn utan noko beriking eller kobling


* klienter må håndere et bredt mulighetsrom av “sikkerhetsnivå”,  dvs. en innlogget bruker kan ha:

    * svak eller sterk identitetskontroll

    * svake eller sterke autentiseringsmekanismer

    * svake eller sterke koblinger til nasjonale/sektorvise norske identifikatorer


## Authentication request


Følgende scopes støttes utover `openid profile`:


|scope|claims|[IdAA-verified-struktur](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)|Beskrivelse|Forklaring|
|-|-|-|-|-|-|
|idporten:utland:fhnummer|fhnummer|Nei|Nasjonalt Felles Hjelpenummer|FH-nummer finnes i Personregisteret til Norsk Helsenett. idporten-utland vil rekvirere et nytt FH-nummer for hver ny eID første gang den logger på.|
|idporten:utland:contactinfo|mobile <br/> email |Nei|Selv-registrerte kontaktopplysninger | idporten-utland vil spørre brukeren om å oppgi epost og mobilnummer, og lagrer dette. Kontaktopplysningene blir ikke validert, og bruker kan også endre de ifht de som er registert hos eIDen. |



## Claims i id_token

id_tokenet er

|claim|eksempel|Navn|Forklaring|
|-|-|-|-|-|-|
|sub||subject identifier|Basert på klient-konfigurasjon, enten en [pairwise verdi](https://openid.net/specs/openid-connect-core-1_0.html#PairwiseAlg) (dvs forskjellige sub-verdier mellom ulike klienter for samme brukerkonto ), eller [public verdi](https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes) lik bruker-id i idporten-utlands brukerdatabase.
|acr|low| Authentication Context Class Reference. |Sikkerhetsnivå.  Apple/Google-id har verdien `low`.|
|amr| `["apple"]` | Authentication Methods References|Innloggingsmetode / eID.|
|fhnummer| 87012054321| Felles Nasjonal Hjelpenumme| Revirert fra Personregisteret (PREG) til Norsk Helsenett|
|mobile|-|-|-|
|email|-|-|-|



Standard OIDC / oauth2 claims
|claim|eksempel|Navn|Forklaring|
|-|-|-|-|
|iss||issuer|idporten-utland sin issuer-verdi|
|aud||audience| for id_token er dette alltid lik client_id på klienten|
|sid||session id | innloggingssesjon.  Behøves for å kunne støtte utlogging |
|iat|-|issued at| id_token utstedt tidspunkt|
|exp|-|expires at| id_token utløper tidspunkt|


#### Eksempel på id-token

I dette tilfellet har klienten forespurt scope `openid idporten:utland:fhnummer idporten:utland:contactinfo`
```
    {
      "sub" : "en pseodonym identifikator",
      "iss" : "https://idporten-utland-test.digdir.eon.no/c2id",
      "aud" : "b7198ea6-14f0-488f-bb9a-206993ad28bc",
      "iat" : 1616765456,
      "exp" : 1616765576,
      "auth_time" : 1616765455,
      "nonce" : "qDHodUys-yzbA961atMXwfk3gBefUn27i7m4m-bEc_4",
      "sid" : "n3ss5nXYYkLRm8J_KZqP-pjsPli5AuKGDiAwRAn5nxE"
      "locale" : "nb",

      "acr" : "low",
      "amr" : [ "Apple" ],  
      "fhnummer": "17012054321",
      "mobile": "+4799998888"
      "email": "email@example.com"

    }
```     
