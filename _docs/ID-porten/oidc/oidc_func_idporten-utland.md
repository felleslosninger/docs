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


### Aktører som inngår:

 <div class="mermaid">
 graph LR
  Sluttbruker ---|1. Vil bruke|ny

   subgraph Kunde
      ny[Tjeneste]
   end
   subgraph Digdir
     OIDC[idporten-utland]
     db[(kobling eid - FH-nummer)]
   end
   subgraph NHN
      reg[(PREG)]
   end
   OIDC -->|5. videresender bruker til |ny
   Sluttbruker ---|2. logger inn i  |OIDC
   OIDC ---|3.sjekker|db
   OIDC ---|4. evt. rekvirerer nytt FH-nummer |reg
 </div>


### Flytskjema:


 <div class="mermaid">
 sequenceDiagram
   participant U as Sluttbruker
   participant C as Tjeneste
   participant I as idporten-utland
   participant P as PREG [[NHN]]

   U ->> C: Klikker login-knapp
   C ->> U: Redirect med autentiseringsforespørsel som etterspør FH-nummer
   U ->> I: følg redirect...
   note over U,I: Sluttbruker autentiserer seg med Apple/Google
   I ->> I: Sjekk om bruker har FH-nummer fra før
   opt Nei
     I ->> P: Rekvirer nytt FH-nummer
     I ->> I: lagre kobling i lokal database
  end

   I ->> U: Sluttbruker: Redirect med autorisasjonscode
   U ->> C: følg redirect...
   C ->> I: forespørre token (/token)
   I ->> C: id_token + access_token (evt. refresh_token)
   note over U,C: Innlogget i tjenesten
 </div>


## Metadata, endepunkt og klientregistreringer


| Mijlø | Issuer | .well-known |
|-|-|-|
|PROD| tbd | tbd|
|PREPROD| https://idporten-utland-test.digdir.eon.no/c2id | [https://idporten-utland-test.digdir.eon.no/c2id/.well-known/openid-configuration](https://idporten-utland-test.digdir.eon.no/c2id/.well-known/openid-configuration) |


idporten-utland kjører i et eget, Kubernetes-basert on-prem driftsmiljø hos driftsleverandør TietoEvry.

Løsningen er koblet mot Selvbetjening på samarbeidsportalen, slik at det er lett å integrere mot den.  Det er ennå ikke lagt til eget valg for idporten-utland som  `integration_type` i Samarbeidsportalen, slik at alle  integrasjoner som virker i den "vanlige" ID-porten (OIDC) også virker mot id-porten utland.  Vi anbefaler dog at kunder oppretter egne integrasjoner spesifikt for idporten-utland. For testmiljø er det VER2 som gjelder.

**Merk:** Pga. en intern begrensning er det kun klienter registert via Selvbetjening med 1 og bare 1 redirect-uri som virker i idporten-utland p.t.

**Merk:** Provideren støtter ikke alle protokoll-varianter som er annonsert på .well-known-endepunktet





### Testbrukere
Man må opprette egne google/apple-brukere for å teste idporten-utland.  

Eventelt kan man bruke "TestID", og fylle ut et norsk syntaktisk gyldig fødselsnummer, så lenge man bruker nummer som ikke er tildelt ekte personer (altså finnes i produksjon i Folkeregisteret). Vi anbefaler å bruke syntetiske fødselsnummer, dvs. nummer som har 80 som verdi for måned.

### Test-tjeneste
Den enkleste måten å teste tjenesten på, er å logge inn til profil-sida med en testbruker: [https://idporten-utland-test.digdir.eon.no/idporten-utland-registration/](https://idporten-utland-test.digdir.eon.no/idporten-utland-registration/)

# Grensesnittsdefinisjon

* Bruker OIDC med oauth2.1 i botn,  dvs authorization-code-flow med  PKCE+state+nonce er påkrevd for alle klienter.

* Klienter bruker primært scopes for å få de sektor-spesifikke identifikatorene de ønsker

    * t.d `idporten:utland:fhnummer` dersom klienten ønsker Nasjonalt Felles Hjelpenummer

    * dersom  forespurt informasjon ikkje finst tilknytta brukar-kontoen'en frå før, so vert det rekvirert frå autorativ kjelde der&då.

    * `openid profile` er ein gyldig kombinasjon, dvs. lov å logge inn utan noko beriking eller kobling


* Klienter må håndere et bredt mulighetsrom av “sikkerhetsnivå”,  dvs. en innlogget bruker kan ha:

    * svak eller sterk identitetskontroll

    * svake eller sterke autentiseringsmekanismer

    * svake eller sterke koblinger til nasjonale/sektorvise norske identifikatorer

* OP-initiert logout (både front-channel og back-channel) er p.t. ikkje støtta

*


## Autentiseringsforespørsel (/authorize)


Følgende scopes støttes utover `openid profile`:


|scope|claims|[IdAA-verified-struktur](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)|Beskrivelse|Forklaring|
|-|-|-|-|-|-|
|idporten:utland:fhnummer|fhnummer|Nei|Nasjonalt Felles Hjelpenummer|FH-nummer finnes i Personregisteret til Norsk Helsenett. idporten-utland vil rekvirere et nytt FH-nummer for hver ny eID første gang den logger på.|


Følgende claims er viktige å få korrekt i requesten:

|claim|eksempel|Navn|Forklaring|
|-|-|-|-|-|-|
|acr|low| Authentication Context Class Reference. |Forespurt sikkerhetsnivå. Apple/Google-id har verdien `low`. |



## Autentiseringsrespons (id_token)


### Claims i id_token

|claim|eksempel|Navn|Forklaring|
|-|-|-|-|-|-|
|sub||subject identifier|Basert på klient-konfigurasjon, enten en [pairwise verdi](https://openid.net/specs/openid-connect-core-1_0.html#PairwiseAlg) (dvs forskjellige sub-verdier mellom ulike klienter for samme brukerkonto ), eller [public verdi](https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes) lik bruker-id i idporten-utlands brukerdatabase.
|acr|`low`| Sikkerhetsnivå | Apple/Google-id har verdien `low`. MinID har `Level3`, og BankID/Buypass/Commfides har `Level4`. Klient må alltid validere at innlogging har det sikkerhetsnivået som man forespurte. |
|amr| `["Apple"]` | Innloggingsmetode | Enten `Google` eller `Apple`.  Merk at klient bør ikke validere på disse verdiene, og heller sjekke acr.|
|fhnummer| `87012054321`| Felles Nasjonalt Hjelpenummer| Revirert fra Personregisteret (PREG) til Norsk Helsenett|
|mobile|`+4799998888`|Mobilnummer|Bruker sitt selv-registrerte mobilnummer.  Alltid inkludert utenlandsprefix (+) og landkode ihht E.164.  Innhentes av idporten-utland ved første gangs innlogging. |
|email| `email@example.com` |Epost| Bruker sitt selv-registrete epost-adresse.  Innhentes av idporten-utland ved første gangs innlogging. |


I tillegg er det selvsagt standard OIDC / oauth2 claims i tokenet, som valideres ihht reglene i spesifikasjonen.

#### Eksempel på id-token

I dette tilfellet har klienten forespurt scope `openid idporten:utland:fhnummer`

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
