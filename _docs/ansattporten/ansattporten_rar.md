---
title: RAR-typer i Ansattporten
description: Ansattporten bruker RAR til kommunisere representasjonsforhold

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_rar
---


Ansattporten bruker standarden [Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) til å strukturere informasjon om representasjonsforhold, både i forespørsler og tokens. 


RAR er en ny OAuth2-utvidelse for transaksjonsspesifikke autorisasjoner. Der "basic" OAuth2 kun gir tilgang til et såkalt "scope" (tekst-streng), åpner RAR for tilgang til mer utvidede datamodeller i form av autorisasjonstyper. Autorisasjonstypen(e) blir utlevert i token som et nytt hierarkisk claim kalt `authorization_details` som igjen er en array av autorisasjonsobjekter, der hvert objekt består av:

* Standardisert påkrevd felt:
    * `type` definerer den aktuelle autorisasjonstypen

* Egendefinert datamodell
    * til en gitt `type` vil det være definert og dokumentert en tilhørende gyldig datamodell. Ansattporten sine datamodeller er definert på denne siden.


## Forhold mellom RAR og scope

Det er ingen teknisk sammenheng mellom et OAuth2 scope og RAR, de to mekanismene er disjunkte.  

En kan derfor ikke legge til grunn at en klient som ikke har fått et gitt scope, heller ikke kan motta en rar-struktur i token.

## Tilgangstyring av RAR-typer

Det er p.t. ingen tilgangstyring av RAR-typer. Alle klienter fra alle kunder kan sende inn en RAR-struktur i autorisasjonsforespørselen, og den vil trigge organisasjonsvelger.


## RAR-typer støttet i Ansattporten

Følgende RAR-typer er støttet i Ansattporten:

| RAR-type | Skildring |
|-|-|
| [`ansattporten:altinn:resource`](#datamodell-for-altinn-3-ressurser-ansattportenaltinnresource) |Støtter bruk av Altinn 3-ressurser som autorativ kilde for representasjon. Bruker må ha fått tildelt tilgang til enkelttjeneste i Altinn. Støtte for tilgang gjennom roller er p.t. ikke mulig i Altinn 3. [Se backlog-sak](https://github.com/orgs/digdir/projects/8/views/38?pane=issue&itemId=75426143&issue=digdir%7Croadmap%7C400) |
| [`ansattporten:orgno`](#datamodell-for-arbeidsgivers-organisasjonsnummer-ansattportenorgno) | Gir organisasjonnummer-kobling for bruker logget inn med sin jobb-konto, typisk en Microsoft-konto (Entra ID). [Se backlog-sak](https://github.com/orgs/digdir/projects/8/views/38?pane=issue&itemId=87373562&issue=digdir%7Croadmap%7C438) |
| [`ansattporten:altinn:service`](#datamodell-for-altinn-2-lenketjenester-ansattportenaltinnservice)  |Bruker lenketjenester (ServiceCode) fra Altinn 2 som autorativ kilde for representasjonsforhold |


Det er p.t. ikke mulig å be om ulike RAR-typer i samme påloggingsforespørsel. Klienten må i stedet implementere flere login-knapper i sin egen løsning.


## Datamodell for Altinn 3 ressurser (`ansattporten:altinn:resource`)

Dersom kunden ønsker å bruke Altinn 3 ressurser som autorativ kilde for representasjonsforhold, må klienten oppgi `ansattporten:altinn:resource` som RAR-type. I tillegg må det spesifiseres hvilken Altinn-ressurs som kreves.

Detaljer om, og utlisting av, Altinn-ressurser kan finnes ved å bruke Altinn sitt [Ressursregister API](https://docs.altinn.studio/en/api/resourceregistry/spec/#/Resource) - Her kan du f.eks. finne url for å [Liste ut alle ressurser](https://platform.altinn.no/resourceregistry/api/v1/resource/resourcelist?includeAltinn2=false&includeMigratedApps=true)

Følgende claims kan sendes inn i request: 

| Claim | Kardinalitet | Beskrivelse | Gyldighet |
|-|-|-|-|
|resource | Påkrevd |Hvilken ressurs i Altinn som etterspørres. Må formatteres slik: `urn:altinn:resource:{resource_id} `. ID må være en ressurs-identifier i Altinn ressursregister.| Spesifiseres pr autorisasjonsobjekt |
|organizationform | Valgfri | Begrense organisasjonsvelger til at sluttbruker bare kan velge hovedenheter (`enterprise`) eller underenheter (`business`). Default så er begge mulig å velge. | Gjelder på tvers av alle autorisasjonsobjekter - må ha samme verdi dersom spesifisert i flere autorisasjonsobjekter |
|allow_multiple_organizations| Valgfri | Dersom `true` så kan sluttbruker velge flere virksomheter i organisasjonsvelgeren. Default er false.|Gjelder på tvers av alle autorisasjonsobjekter. Blir `true` om satt true i et autorisasjonsobjekt |
|allow_deleted_organizations | Ikke implementert | Dersom `true` så vil organisasjonsvelger vise slettede virksomheter. Default er false.|Gjelder på tvers av alle autorisasjonsobjekter - må ha samme verdi dersom  spesifisert i flere autorisasjonsobjekter |
|representation_is_required | Valgfri | Krev at bruker må representere en virksomhet . Default er false. |Gjelder på tvers av alle autorisasjonsobjekter. Blir `true` om satt true i et autorisasjonsobjekt |

*Eksempel på request som krever representasjon, og tillater å velge flere virksomheter*: 
```
  authorization_details= [
    {
      "type": "ansattporten:altinn:resource",
      "resource": "urn:altinn:resource:resource_enkeltrettighet",
      "allow_multiple_organizations": true,
      "representation_is_required": true
    }
  ]
```

Dersom det er forespurt flere ressurser, så vil `authorization_details` inneholde et json-objekt per ressurs som brukeren har fått tildelt tilgang til. 
Datamodellen for respons inneholder alltid claiment "type" som i request, men om bruker har valgt å representere en virksomhet, vil det i tillegg utleveres:

| claim | beskrivelse            |
| ----- | ---------------------- |
| resource | Samme som i request (full urn) |
| resource-name | Namn på etterspurt representasjonsforhold |
| authorized_parties | Array med valgte virksomheter. |
| orgno | For hver virksomhet, objekt med orgno representert ihht iso6523 standard.  |
| resource | For hver virksomhet, ressurs-id, skal matche id i etterspurt ressurs |
| name | For hver virksomhet, navn på virksomhet |
| unit-type | For hver virksomhet, angir organisasjonstypen ihht https://www.brreg.no/bedrift/organisasjonsformer/ |


*Eksempel på respons*:
```
  "authorization_details" : [ {
    "authorized_parties" : [ {
      "orgno" : {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:314758625"
      },
      "resource" : "resource_enkeltrettighet",
      "name" : "UGJENNOMSIKTIG MINIMALISTISK APE",
      "unit_type" : "BEDR"
    }, {
      "orgno" : {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:311094688"
      },
      "resource" : "resource_enkeltrettighet",
      "name" : "UKJENT ETTERPÅKLOK STRUTS LTD",
      "unit_type" : "NUF"
    } ],
    "resource" : "urn:altinn:resource:resource_enkeltrettighet",
    "type" : "ansattporten:altinn:resource",
    "resource_name" : "Ressurs for enkeltrettigheter testing"
  } ],
```

Dersom det er forespurt flere representasjonsforhold, så vil authorization_details inneholde et json-objekt per lenketjeneste som brukeren har rettighet til.

### Testbrukere

Man kan teste løsningen uten å lage en integrasjon ved å bruke vår demo-tjeneste [https://demo-client.test.ansattporten.no/](https://demo-client.test.ansattporten.no/). Her kan man også studere protokoll-flyten i detalj.  
Dersom man ønsker å teste organisasjonsvelger, så kan man bruke `[{"type":"ansattporten:altinn:resource","resource":"urn:altinn:resource:app_ttd_apps-test"}]` i authorization_details-feltet.  
Det er mulig å finne oversikt over registrerte ressurser i test i [Altinn sitt ressursregister](https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/resourcelist?includeAltinn2=false&includeMigratedApps=true) 

Velg TestID til autentisering, og bruk gjerne "Hent tilfeldig Daglig leder" om du ikke allerede har en syntetisk bruker du vil teste med.

> **MERK:** Dersom testbrukeren ikke finnes fra før i Altinn sitt testmiljø (typisk for syntetiske fødselsnummer), vil ikke organisasjonsvelger fungere. Dette løses enkelt ved å logge inn i [TT02](https://info.tt02.altinn.no) en gang med det syntetiske fødselsnummeret.  
  

## Datamodell for arbeidsgivers organisasjonsnummer (`ansattporten:orgno`)

Basert på epost-domenet til innlogget bruker, vil Ansattporten utlevere organisasjonsnummeret til eier av domenet. Datakilden er p.t. Digdir sin kundedatabase, dvs. alle virksomheter som har inngått Digdirs bruksvilkår vil bli beriket med organisasjonsnummer.

Arbeidsgivers pålogging er som oftest basert på epost-adresse som identifikator, som oftest er dette [Microsoft-konto (Entra ID)](ansattporten_entraid.html).

Dersom sluttbruker har valgt en eID som ikke har epost som identifikator, vil ikke denne RAR-typen kunne virke, og det vil utleveres et tomt RAR-element. 

Følgende claims kan sendes inn i request i tillegg til `type`: 

| Claim | Kardinalitet | Beskrivelse | Gyldighet |
|-|-|-|-|
|organizationform | Valgfri | Begrense organisasjonsvelger til at sluttbruker bare kan velge hovedenheter (`enterprise`) eller underenheter (`business`). Default så er begge mulig å velge. | Gjelder på tvers av alle autorisasjonsobjekter - må ha samme verdi dersom spesifisert i flere autorisasjonsobjekter |
|allow_multiple_organizations| Valgfri | Dersom `true` så kan sluttbruker velge flere virksomheter i organisasjonsvelgeren. Default er false.|Gjelder på tvers av alle autorisasjonsobjekter. Blir `true` om satt true i et autorisasjonsobjekt |
|representation_is_required | Valgfri | Krev at bruker må representere en virksomhet . Default er false. |Gjelder på tvers av alle autorisasjonsobjekter. Blir `true` om satt true i et autorisasjonsobjekt |

*Eksempel på request (forenklet)*: 
```
https://login.test.ansattporten.no/authorize?
  acr_values=entraid ...&
 ...
  authorization_details= [
    {
      "type": "ansattporten:orgno",
      "representation_is_required": true
    }
  ]
  ...
```


Datamodellen for respons inneholder alltid claiment "type" som i request, men om bruker har valgt å representere en virksomhet, vil det i tillegg utleveres:

| claim | beskrivelse            |
| ----- | ---------------------- |
| authorized_parties | Et objekt for hver virksomhet bruker har valgt å representere  |
| orgno | For hver authorized_party - Organisasjonsidentifikator ihht ISO6523  |
| name | For hver authorized_party - Registrert navn på valgt virksomhet |
| rights | Hvilke rettigheter bruker har for valgt virksomhet. Bare inkludert om bruker har fått tildelt spesifikke rettigheter. |

*Eksempel på respons*:
```
  "authorization_details" : [ {
    "authorized_parties" : [ {
      "orgno" : {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:314758625"
      },
      "name" : "UGJENNOMSIKTIG MINIMALISTISK APE",
      "rights" : ["Read","Write"]
    },{
      "orgno" : {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:312206498"
      },
      "name" : "NYBAKT IDIOTSIKKER ISBJØRN SA",
      "rights" : ["Report"]
    } ],
    "type" : "ansattporten:orgno"
  } ]
```



## Datamodell for Altinn 2 Lenketjenester (`ansattporten:altinn:service`)

Bare kunder som er tjenesteeier i Altinn kan benytte Altinn Autorisasjon som autorativ kilde.

Dersom kunden ønsker å bruke Altinn 2 lenketjenester (ServiceCode) som autorativ kilde for representasjonsforhold, må klienten oppgi  `ansattporten:altinn:service` som RAR-type. 

Følgende claims kan sendes inn i request: 

| Claim | Kardinalitet | Beskrivelse | Gyldighet |
|-|-|-|-|
|resource | Påkrevd |Hvilken lenketjeneste i Altinn som etterspørres. Må formatteres slik: `urn:altinn:resource:{tjenestekode}:{tjenesteutgave} `| Spesifiseres pr autorisasjonsobjekt |
|organizationform | Valgfri | Begrense organisasjonsvelger til at sluttbruker bare kan velge hovedenheter (`enterprise`) eller underenheter (`business`). Default så er begge mulig å velge. | Gjelder på tvers av alle autorisasjonsobjekter - må ha samme verdi dersom spesifisert i flere autorisasjonsobjekter |
|allow_multiple_organizations| Valgfri | Dersom `true` så kan sluttbruker velge flere virksomheter i organisasjonsvelgeren. Default er false.|Gjelder på tvers av alle autorisasjonsobjekter. Blir `true` om satt true i et autorisasjonsobjekt |
|allow_deleted_organizations | Valgfri | Dersom `true` så vil organisasjonsvelger vise slettede virksomheter. Default er false.|Gjelder på tvers av alle autorisasjonsobjekter - må ha samme verdi dersom  spesifisert i flere autorisasjonsobjekter |
|representation_is_required | Valgfri | Krev at bruker må representere en virksomhet . Default er false. |Gjelder på tvers av alle autorisasjonsobjekter. Blir `true` om satt true i et autorisasjonsobjekt |

[Her finner du en liste over alle tjenestekoder i Altinn 2](https://www.altinn.no/api/metadata?language=1044) 

> **Mange av dagens standard Altinn-roller gir veldig breie tilganger ("Post/arkiv", "Utfyller/innsender").**  Dette er problematisert med at de ikke følger gode dataminimeringsprinsipp, og vanskeliggjør det å skulle holde oversikt over hva en gitt rolle faktisk gir tilgang til.  Derfor tilbyr vi ikke innlogging på vegne av Altinn-roller i Ansattporten, tjenesten må spesifisere en lenketjeneste. 


*Eksempel på request med 2 autorisasjonobjekter*: 
```
  authorization_details= [
    {
      "type": "ansattporten:altinn:service",
      "resource": "urn:altinn:resource:2480:40"
    },
    {
      "type": "ansattporten:altinn:service",
      "resource": "urn:altinn:resource:5900:1",
      "allow_multiple_organizations": true
    }
  ]
```

Datamodellen for respons inneholder alltid claimet "type" som i request, men om bruker har valgt å representere en virksomhet, vil det i tillegg utleveres:

| claim | beskrivelse            |
| ----- | ---------------------- |
| resource | Samme som i request |
| resource_name | Navn på etterspurt representasjonsforhold |
| reportees | Array med valgte virksomheter. |
| Rights | For hver virksomhet, et array med rettigheter som innlogget bruker har for aktuell tjenestekode.  |
| Name | For hver virksomhet, navnet på valgt virksomhet|

*Eksempel på respons*:
```
  "authorization_details" : [ {
    "resource" : "urn:altinn:resource:2480:40",
    "type" : "ansattporten:altinn:service",
    "resource_name" : "Produkter og tjenester fra Brønnøysundregistrene",
    "reportees" : [ 
      {
        "Authority" : "iso6523-actorid-upis",
        "ID" : "0192:987464291",
        "Name" : "DIGITALISERINGSDIREKTORATET AVD LEIKANGER"
        "Rights" : [ "Read", "ArchiveDelete", "ArchiveRead" ],
      } ]
  } ]
```

### Testbrukere

Man kan teste løsningen uten å lage en integrasjon ved å bruke vår demo-tjeneste [https://demo-client.test.ansattporten.no/](https://demo-client.test.ansattporten.no/). Her kan man også studere protokoll-flyten i detalj. Dersom man ønsker å teste organisasjonsvelger, så kan man bruke `[{"type":"ansattporten:altinn:service","resource": "urn:altinn:resource:2480:40"}]` i authorization_details-feltet (denne tjenestekoden gir ut nøkkelroller).

Velg TestID til autentisering, og bruk gjerne "Hent tilfeldig Daglig leder" om du ikke allerede har en syntetisk bruker du vil teste med.

> **MERK:** Dersom testbrukeren ikke finnes fra før i Altinn sitt testmiljø (typisk for syntetiske fødselsnummer), vil ikke organisasjonsvelger fungere. Dette løses enkelt ved å logge inn i [TT02](https://info.tt02.altinn.no) en gang med det syntetiske fødselsnummeret.

