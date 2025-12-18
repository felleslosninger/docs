---
title: Samtykketoken i Maskinporten
description: Samtykketoken i Maskinporten

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_func_samtykke
---

Funksjonaliteten lar en datakonsument hente ut og inkludere et samtykke i et Maskinporten accesstoken. Tjenesteeier må definere samtykket, og samtykke må gis av sluttbruker, eller det kan gis på vegne av en organisasjon av en bruker med nødvendige rettigheter.

## Status

Funksjonaliteten er lansert i 2025.  

## Bakgrunn

Samtykkeløsningen er utformet med hensikt om å oppfylle [datatilsynets krav til samtykke for å behandle personopplysninger.](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/behandlingsgrunnlag/veileder-om-behandlingsgrunnlag/?id=176)


#### Hva inneholder et samtykke-token ?

Rent teknisk vil maskinporten spørre Altinn 3 om et gitt samtykke eksisterer. Samtykker definert av Tjenesteeier kan identifiseres med en uuid, det må også oppgis hvem som har gitt samtykket. (En org/person) Samtykket må være gitt til den organisasjonen som eier maskinporten klienten. 
Ved bruk av delegerte scopes, må samtykket være gitt til den som har delegert scopet til gitt maskinporten klient.

#### For API-tilbyder/Tjenesteeier

For å kunne bruke et samtykke-token til tilgangstyring må API-tilbyder opprette et samtykke i Altinn 3, og dette må sluttbruker så akseptere. Mer informasjon i Altinn sin dokumentasjon av [samtykke for tjenesteier.](https://docs.altinn.studio/nb/authorization/guides/resource-owner/consent/)
Det er viktig at tjenesteeier validerer id og from/to felta for samtykket i tokenet.

## Grensesnittsdefinisjon

Funksjonaliteten er basert på Oauth2-utvidelesen for [fin-granulert autorisasjon (Rich Authorization Requests, RAR)](https://datatracker.ietf.org/doc/rfc9396/), der vi har definert en ny type `urn:altinn:systemuser` for systembruker-mønsteret.

Leverandøren ber om å få et token for en påstått kunde ved å oppgi kundens organisasjonsnummer, og dersom en systembruker-delegering foreligger i Altinn, vil det returneres et Maskinporten-token med systembruker-identifikator som API-tilbyder i sin tur kan benytte til å konstruere spørringer mot Altinn Autorisasjon PDP for å finne detaljert ut hva leverandørens system er autorisert til å utføre. 

<div class="mermaid">
sequenceDiagram
    Fagsystem->>+Maskinporten: forespørre token (kundes orgno)
    Maskinporten->>Altinn Autorisasjon: Hent systembrukerinformasjon 
    Altinn Autorisasjon-->>Maskinporten: systembrukerinformasjon
    Maskinporten-->>-Fagsystem: systembruker-token
    Fagsystem->>+API: API-kall m/systembrukertoken
    note over API: validerer scope, konstruerer PDP-spørring
    API->>Altinn Autorisasjon: PDP-kall med systembruker, part, ressurs, action
    Altinn Autorisasjon-->>API: Ja/nei
    API->>-Fagsystem:API Result 
</div>

### Forespørsel

Et fagsystem ber om å få systembruker-token på vegne av en part ved å inkludere en RAR-forespørsel av type `urn:altinn:systemuser` med partens organisasjonsidentifikator, i [JWT-grantet](maskinporten_protocol_jwtgrant):

Datamodellen for request ser slik ut:

| claim | kardinalitet | beskrivelse |
| ----- | ------------ | ----------- |
| `type`| Påkrevd | Alltid `urn:altinn:systemuser` |
| `systemuser_org` | Påkrevd | Organisasjonsidentifikator i ISO6523-format på eier av systembrukeren (leverandørens kunde) |
| `externalRef` | Valgfri | Nødvendig dersom leverandørens kunde har flere systembrukere som peker på samme system, eller dersom den ene systembrukeren er opprettet med en externalRef |


*Forenklet eksempel på JWT-grant i token-request*
```
{
  "aud": "https://maskinporten.no",
  "scope": "api-tilbyders scope",
  "iss":   "my_client_id",

  "authorization_details": [ {
    "type": "urn:altinn:systemuser",
    "systemuser_org": {
       "authority" : "iso6523-actorid-upis",  
       "ID": "0192:999888777"  
    },
    "externalRef": "systembruker #1"
}]
```

Merk 1: man kan kun spørre på en kunde/part i gangen. 

Merk 2: grantet må også alltid forespørre et eller flere Oauth2 scopes.

### Respons

Tokenet vil innehold en liste med systembrukere som tilhører kundens organisasjonnummer, og er knyttet mot leverandørens fagsystem gjennom det autentiserte fagsystemet (client_id):

Datamodellen for respons ser slik ut:

| claim | beskrivelse |
| ----- |  ----------- |
| `type`|  Alltid `urn:altinn:systemuser` |
| `systemuser_org` | Organisasjonsidentifikator i ISO6523-format på eier av systembrukeren (leverandørens kunde) |
| `systemuser_id` | Identifikatoren til systembrukeren |
| `system_id` | Identifikatoren til leverandøren sitt system i systemregisteret |

Merk at `externalRef` ikke er returnert, det brukes kun for å identifisere rett systembruker i de tilfeller der det er flere kandidater.
Leverandøren sitt organisasjonsnummer finner du i claimet `consumer` som vanlig.

*Forenklet eksempel på access token:*
```
{
  "iss":         "https://maskinporten.no",
  "scope":       "api-tilbyders scope",
  "client_id":   "leverandøren sin client_id",
  "consumer":    {"authority" : "iso6523-actorid-upis",  "ID": "0192:leverandøren sitt orgno" },
  
  "authorization_details": [ {
    "type": "urn:altinn:systemuser",
    "systemuser_id": [ "id for systembrukeren hos kunden" ], 
    "systemuser_org": {"authority" : "iso6523-actorid-upis",  "ID": "0192:systembrukeren sitt orgno" },
    "system_id": "id for systemet i systemregisteret",
  }],

  "exp": 1520589928,
  "iat": 1520589808,
  "jti": "asdjkl5434jlkfds"

}
```



## Oppsett

Leverandøren må først opprette en vanlig Maskinporten-integrasjon gjennom selvbetjening på Samarbeidsportalen. Deretter må leverandøren opprette et fagsystem i systemregisteret i Altinn, og knytte det mot Maskinporten-integrasjonen sin `client_id`.

Deretter må leverandøren opprette et fagsystem i systemregisteret i Altinn, og knytte det mot Maskinporten-integrasjonen sin `client_id`.  Dette er dokumentert nærmere på [Autorisasjon sin dokumentasjon av systembruker for systemleverandører](https://docs.altinn.studio/nb/authorization/guides/system-vendor/system-user/⁩).
