---
title: RAR-typer i Ansattporten
description: Ansattporten bruker RAR til å kommunisere representasjonsforhold

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

En kan derfor ikke legge til grunn at en klient som ikke har fått et gitt scope, heller ikke kan motta en RAR-struktur i token.

## Tilgangstyring av RAR-typer

Det er p.t. ingen tilgangstyring av RAR-typer. Alle klienter fra alle kunder kan sende inn en RAR-struktur i autorisasjonsforespørselen, og den vil trigge organisasjonsvelger.


## RAR-typer støttet i Ansattporten

Følgende RAR-typer er støttet i Ansattporten:

| RAR-type | Beskrivelse | ACR |
|-|-|-|
| `ansattporten:altinn:resource` |Støtter bruk av Altinn 3-ressurser som autoritativ kilde for representasjon. Bruker må ha fått tildelt tilgang til enkelttjeneste i Altinn, enten direkte eller gjennom rolle/tilgangspakke | Substantial,High |
| `ansattporten:orgno` | Gir organisasjonsnummerkobling for bruker logget inn med sin jobbkonto, typisk en Microsoft-konto (Entra ID). [Se backlog-sak](https://github.com/orgs/digdir/projects/8/views/38?pane=issue&itemId=87373562&issue=digdir%7Croadmap%7C438) | `entraid` |


## Datamodell for Altinn 3 ressurser (`ansattporten:altinn:resource`)

Dersom kunden ønsker å bruke Altinn 3 ressurser som autoritativ kilde for representasjonsforhold, må klienten oppgi `ansattporten:altinn:resource` som RAR-type. I tillegg må det spesifiseres hvilken Altinn-ressurs som kreves.

> **MERK:** Ansattporten bruker Altinn 3 som autoritativ kilde for representasjonsforhold. Ved bruk av ressurser som har tilgangslister må `actions` være med i request.  

Detaljer om, og en oversikt over, Altinn-ressurser kan finnes ved å bruke Altinn sitt [Ressursregister API](https://docs.altinn.studio/en/api/resourceregistry/spec/#/Resource) - her kan du f.eks. finne URL for å [liste ut alle ressurser](https://platform.altinn.no/resourceregistry/api/v1/resource/resourcelist?includeAltinn2=false&includeMigratedApps=true)

Følgende claims kan sendes inn i request: 

| Claim | Kardinalitet | Beskrivelse | Gyldighet |
|-|-|-|-|
|resource | Påkrevd | Hvilken ressurs i Altinn som etterspørres. Må formatteres slik: `urn:altinn:resource:{resource_id} `. ID må være en ressurs-identifier i Altinn ressursregister.| Spesifiseres pr autorisasjonsobjekt |
|actions | Valgfri/Påkrevd | Angi hvilke actions sluttbruker må ha tilgang til for etterspurt ressurs. Påkrevd ved etterspørsel av ressurser som bruker tilgangslister | Spesifiseres pr autorisasjonsobjekt |
|organizationform | Valgfri | Begrense organisasjonsvelger til at sluttbruker bare kan velge hovedenheter (`enterprise`) eller underenheter (`business`). Default så er begge mulig å velge. | Gjelder på tvers av alle autorisasjonsobjekter - må ha samme verdi dersom spesifisert i flere autorisasjonsobjekter |
|allow_multiple_organizations| Valgfri | Dersom `true` så kan sluttbruker velge flere virksomheter i organisasjonsvelgeren. Default er false.|Gjelder på tvers av alle autorisasjonsobjekter. Blir `true` om satt true i et autorisasjonsobjekt |
|allow_deleted_organizations | Valgfri | Dersom `true` så vil organisasjonsvelger vise slettede virksomheter. Default er false.|Spesifiseres pr autorisasjonsobjekt |
|representation_is_required | Valgfri | Krev at bruker må representere en virksomhet . Default er false. |Gjelder på tvers av alle autorisasjonsobjekter. Blir `true` om satt true i et autorisasjonsobjekt |

*Eksempel på request som krever representasjon, med action "write" eller "report", og tillater å velge flere virksomheter*: 
```
  authorization_details= [
    {
      "type": "ansattporten:altinn:resource",
      "actions": "write,report",
      "resource": "urn:altinn:resource:resource_enkeltrettighet",
      "allow_multiple_organizations": true,
      "representation_is_required": true
    }
  ]
```

Dersom det er forespurt flere ressurser, så vil `authorization_details` inneholde et JSON-objekt per ressurs som brukeren har fått tildelt tilgang til. 
Datamodellen for respons inneholder alltid claimet "type" som i request, men om bruker har valgt å representere en virksomhet, vil det i tillegg utleveres:

| claim | beskrivelse            |
| ----- | ---------------------- |
| resource | Samme som i request (full urn) |
| resource_name | Navn på etterspurt representasjonsforhold |
| authorized_parties | Array med valgte virksomheter. |
| orgno | For hver virksomhet, objekt med orgno representert ihht iso6523 standard.  |
| resource | For hver virksomhet, ressurs-id, skal matche id i etterspurt ressurs |
| actions | For hver virksomhet, aggregert liste over hvilke forespurte actions bruker har for gitt ressurs |
| name | For hver virksomhet, navn på virksomhet |
| unit_type | For hver virksomhet, angir organisasjonstypen ihht https://www.brreg.no/bedrift/organisasjonsformer/ |


*Eksempel på respons*:
```
  "authorization_details" : [ {
    "authorized_parties" : [ {
      "orgno" : {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:314758625"
      },
      "resource" : "resource_enkeltrettighet",
      "actions" : [ "write" ],
      "name" : "UGJENNOMSIKTIG MINIMALISTISK APE",
      "unit_type" : "BEDR"
    }, {
      "orgno" : {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:311094688"
      },
      "resource" : "resource_enkeltrettighet",
      "actions" : [ "write", "report" ],
      "name" : "UKJENT ETTERPÅKLOK STRUTS LTD",
      "unit_type" : "NUF"
    } ],
    "resource" : "urn:altinn:resource:resource_enkeltrettighet",
    "type" : "ansattporten:altinn:resource",
    "resource_name" : "Ressurs for enkeltrettigheter testing"
  } ],
```

Dersom det er forespurt flere representasjonsforhold, så vil authorization_details inneholde et JSON-objekt per ressurs som brukeren har rettighet til.

### Testbrukere

Man kan teste løsningen uten å lage en integrasjon ved å bruke vår demo-tjeneste [https://demo-client.test.ansattporten.no/](https://demo-client.test.ansattporten.no/). Her kan man også studere protokoll-flyten i detalj.  
Dersom man ønsker å teste organisasjonsvelger, så kan man bruke `[{"type":"ansattporten:altinn:resource","resource":"urn:altinn:resource:app_ttd_apps-test"}]` i authorization_details-feltet.  
Det er mulig å finne oversikt over registrerte ressurser i test i [Altinn sitt ressursregister](https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/resourcelist?includeAltinn2=false&includeMigratedApps=true) 
En god ressurs for å finne ressurser, tilgangspakker osv er [tjenesteoversikten.no](https://tjenesteoversikten.no/search)

Velg TestID til autentisering, og bruk gjerne "Hent tilfeldig Daglig leder" om du ikke allerede har en syntetisk bruker du vil teste med.

> **MERK:** Dersom testbrukeren ikke finnes fra før i Altinn sitt testmiljø (ikke uvanlig for syntetiske fødselsnummer), vil ikke organisasjonsvelger fungere. Dette løses enkelt ved å logge inn i [TT02](https://info.tt02.altinn.no) en gang med det syntetiske fødselsnummeret.  
  

## Datamodell for arbeidsgivers organisasjonsnummer (`ansattporten:orgno`)

> **ansattporten:orgno er i pilotfase** og er pr. nå bare tilgjengelig i test.

Basert på e-postdomenet til innlogget bruker, vil Ansattporten utlevere organisasjonsnummeret til eier av domenet. Datakilden i test er p.t. Digdir sin kundedatabase, dvs. alle virksomheter som har inngått Digdirs bruksvilkår vil bli beriket med registrert organisasjonsnummer. 

Arbeidsgivers pålogging er som oftest basert på e-postadresse som identifikator, som oftest er dette [Microsoft-konto (Entra ID)](ansattporten_entraid.html).

Dersom sluttbruker har valgt en eID som ikke har e-post som identifikator, vil ikke denne RAR-typen kunne virke, og det vil utleveres et tomt RAR-element. 

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


Datamodellen for respons inneholder alltid claimet "type" som i request, men om bruker har valgt å representere en virksomhet, vil det i tillegg utleveres:

| claim | beskrivelse            |
| ----- | ---------------------- |
| authorized_parties | Et authorized_party objekt for hver virksomhet bruker har valgt å representere  |
| orgno | I hver authorized_party - Organisasjonsidentifikator ihht ISO6523  |
| name | I hver authorized_party - Registrert navn på valgt virksomhet |
| rights | I hver authorized_party - Hvilke rettigheter bruker har for valgt virksomhet. Bare inkludert om bruker har fått tildelt spesifikke rettigheter. |

*Eksempel på respons*:
```
  "authorization_details" : [ {
    "authorized_parties" : [ {
      "orgno" : {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:314758625"
      },
      "name" : "UGJENNOMSIKTIG MINIMALISTISK APE"
    },{
      "orgno" : {
        "authority" : "iso6523-actorid-upis",
        "ID" : "0192:312206498"
      },
      "name" : "NYBAKT IDIOTSIKKER ISBJØRN SA",
      "rights" : ["Report","Write"]
    } ],
    "type" : "ansattporten:orgno"
  } ]
```
