---
title: Systembruker for virksomheter
description: Systembruker for virksomheter

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_func_systembruker
---

Funksjonaliteten lar leverandører definere sine Maskinporten-integrasjoner som fagsystemer i Altinn, som leverandørens kunder i sin tur kan tildele bare de rettighetene som fagsystemet trenger for å kunne opptre på vegne av kunden for bestemte formål.

## Status

Funksjonaliteten blir lansert i en pilotfase tidlig Q2 2024.  

## Bakgrunn

Maskinporten i sin enkleste form tilbyr grovkornet tilgangstyring mellom to virksomheter; en API-konsument og en API-tilbyder. 

Videre tilbyr Maskinporten to ulike delegerings-utvidelser for bruk i kunde-leverandør-forhold på konsument-sida:

* [Delegering av API-tilgang til en annen organisasjon](maskinporten_func_delegering)
* Delegering av rettigheter i Altinn til et Maskinporten-system (dokumentert på denne sida)

For begge utvidelsene så utfører kunden selve delegeringshandlingen gjennom brukervennlige dialoger i Altinn, og trenger ikke måtte inngå et kundeforhold til Digdir eller bruke Samarbeidsportalen.  Tilganger i Altinn bestemmer hvem som får lov til å utføre delegeringshandlinga på vegne av kundens virksomhet. Typisk oppstår delegeringen som et naturlig steg ved etablering av kundeforholdet når kunden velger å ta i bruk leverandøren sitt system.

*Systembruker for virksomhet* passer bedre i scenarioer der standard API-delegering ville ført til at leverandøren ville fått altfor vide rettigheter.  

#### Hva er forskjellen på systembruker-delegering og API-delegering?

API-delegering gjelder en hel API-tilgang (dvs. et Oauth2 scope) og delegeres til et organisasjonsnummer (leverandør).

Ved systembruker-delegering får kunder mulighet til å delegere et mer spisset / avgrenset sett med "Altinn-rettigheter", og rettighetene kan bare delegeres til ett spesifikt system hos leverandøren, istedet til leverandørens organisasjonnummer. 
Systemet må være forhåndsregistrert i Systemregisteret i Altinn.  

De to delegeringsmekanismene er uavhengig av hverandre, og det er ingen sentral validering av at systemet i systemregisteret har bestemte scope registert på seg, som skulle "passe" med de rettighetene som blir delegert.  Normalt vil dog APIet validere både hvilke scopes som systemet må ha, samt hvilke type delegerte rettigheter som trengs for å kunne bruke APIet. 


#### Hva inneholder et systembruker-token ?

Rent teknisk i Autorisasjon så blir ikke de delegerte rettighetene gitt direkte til systemet, men er delegert til en såkalt **systembruker** knyttet til kunden. Systembrukeren peker i sin tur på leverandøren sitt system i Systemregisteret, og system-registreringa er kobla mot en og bare en client_id i Maskinporten.

Et systembruker-token skiller seg fra et vanlig Maskinporten-token ved at det inneholder en referanse til systembrukeren hos kunden, og kundens organisasjonsnummer.  Leverandøren sitt organisasjonummer framkommer i `consumer`-claimet på vanlig måte.


#### For API-tilbyder

For å kunne bruke et systembruker-token til tilgangstyring må API-tilbyder konstruere et kall mot Altinn Autorisasjon 3.0 sitt PDP-endepunkt for å hente ut hvilke detaljerte rettigheter som er delegert fra kunde til leverandør.

API-tilbyder bør også validere scope på sitt API.

## Grensesnittsdefinisjon

Funksjonaliteten er basert på Oauth2-utvidelesen for [fin-granulert autorisasjon (Rich Authorization Requests, RAR)](https://datatracker.ietf.org/doc/rfc9396/), der vi har definert en ny type `urn:altinn:systemuser` for systembruker-mønsteret.

Leverandøren ber om å få et token for en påstått kunde ved å oppgi kundens organisasjonsnummer, og dersom en systembruker-delegering foreligger i Altinn, vil det returneres et Maskinporten-token med systembruker-identifikator som API-tilbyder i sin tur kan benytte til å konstruere spørringer mot Altinn Autorisasjon PDP for å finne detaljert ut hva leverandørens system er autorisert til å utføre. 

<div class="mermaid">
sequenceDiagram
    Fagsystem->>+Maskinporten: JWTGrant(orgNoCustomer)
    Maskinporten->>Altinn Autorisasjon: GetSystemUser(client_id, orgNoCustomer)
    Altinn Autorisasjon-->>Maskinporten: SystemUserID (systemUserId)
    Maskinporten-->>Fagsystem: Token (SystemUserId, consumerId, supplier)
    Fagsystem->>API: AllAPIOpperations(part, resoureId, token)
    API->>Altinn Autorisasjon: Authorize(SystemUserId, res, action, part)
    Altinn Autorisasjon-->API: AuthorizationResponse
    API->>Fagsystem:API Result 
</div>

### Forespørsel

Et fagsystem ber om å få systembruker-token på vegne av en part ved å inkludere en RAR-forespørsel av type `urn:altinn:systemuser` med partens organisasjonsidentifikator, i [JWT-grantet](maskinporten_protocol_jwtgrant):

```
{
  "aud": "https://maskinporten.no",
  "scope": "some_scope",
  "iss":   "my_client_id",
  "exp": 1520589928,
  "iat": 1520589808,
  "jti": "415ec7ac-33eb-4ce3-bc86-6ad40e29768f"

  "authorization_details": [ {
    "type": "urn:altinn:systemuser",
    "systemuserorg": {
       "authority" : "iso6523-actorid-upis",  
       "ID": "0192:999888777"  
    }
}]
```

Merk 1: man kan kun spørre på en part i gangen. 

Merk 2: grantet må også alltid forespørre et eller flere Oauth2 scopes.

### Respons

Tokenet vil innehold en liste med systembrukere som tilhører kundens organisasjonnummer, og er knyttet mot leverandørens fagsystem gjennom det autentiserte fagsystemet (client_id):

```
{
  "iss": "https://maskinporten.no",
  "scope":       "some_scope",
  "client_id":   "my_client_id",
  "exp": 1520589928,
  "iat": 1520589808,
  "jti": "asdjkl5434jlkfds"
  
  "authorization_details": [ {
    "type": "urn:altinn:systemuser",
    "systemuserid": "a_unique_identifier_for_the_system",
    "systemuserorg": {
       "authority" : "iso6523-actorid-upis",  
       "ID": "0192:999888777"  
    }
  }]
}
```



## Oppsett

Leverandøren må først opprette en vanlig Maskinporten-integrasjon gjennom selvbetjening på Samarbeidsportalen. Deretter må leverandøren opprette et fagsystem i Altinn, og knytte det mot Maskinporten-integrasjonen sin `client_id`.

På sikt vurderer vi å opprettes en egen integrasjonstype (`integration_type`) i Maskinporten selvbetjening for slike systemer, og det vil bli muligheter for automatisert oppsett av slike gjennom Altinn direkte.

