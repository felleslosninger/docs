---
title: Meldingsflyt
description: Beskrivelse av forretningsmeldinger
summary: ""

product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_nm_meldingsflyt
---

## Sende melding
eFormidling 2.0 APIet lar deg sende filer på to måter. Hvilke av de du velger avhenger av størrelsen på meldingen du skal sende. 

Dersom meldingen er opp til 5 MB brukes multipart sending, der en kan sende forretningsmelding og payload i samme kall. 
Ved meldinger større enn 5 MB må en for å oppnå god ytelse bruke metoden for store meldinger


### Små meldinger

<div class="mermaid">

sequenceDiagram
    participant fs as Fagsystem
    participant ip as Integrasjonspunkt
    participant sr as ServiceRegistry
    participant mf  as Meldingsformidler

    
    fs->>ip: GET api/capabilities/{receiverid}
    ip->>sr: GET /identifier/{receiverid}
    sr-->>ip: capabilities
    ip-->>fs: capabilities
    fs->>fs: select capability  

    fs->>fs: Create message   
    fs->>ip: POST api/messages/out/multipart
    ip-->>fs: conversationresponse
    
    ip->>mf: Upload
    loop 
        ip->>mf: GetStatus
        mf-->>ip: status
    end
    fs->>ip: GET api/statuses/{messageId}
    ip-->>fs: statuses

</div>

### Store meldinger

<div class="mermaid">

sequenceDiagram
    participant fs as Fagsystem
    participant ip as Integrasjonspunkt
    participant sr as ServiceRegistry
    participant mf  as Meldingsformidler

    
    fs->>ip: GET api/capabilities/{receiverid}

    ip->>sr: GET /identifier/{receiverid}
    sr-->>ip: capabilities

    ip-->>fs: capabilities
    fs->>fs: select capability   
    fs->>fs: Create message      
    fs->>ip: POST api/messages/
    ip-->>fs: conversationresponse
    fs->>ip: PUT api/messages/out/{messageId}
    fs->>ip: POST api/messages/out/{messageId}
    
    ip->>mf: Upload
    loop 
        ip->>mf: GetStatus
        mf-->>ip: status
    end

    fs->>ip: GET api/statuses/{conversationId}
    ip-->>fs: statuses

</div>


## Motta melding

Når en skal laste ned meldinger fra integrasjonspunktet må dette initieres med en peek, som låser førte meldingen i køen. Dersom en er ute etter meldinger av en bestemt type kan dette gjøres ved å sende med filter for denne 
Etter man har låst meldingen kan denne deretter lastes ned via endepunktet
/api/messages/in/{messageId}.

Etter meldingen er lastet ned kan denne slettes via å kalle DELETE mot 
/api/messages/in/pop/{messageId} eller den kan låses opp igjen (hva med unlock batch)


<div class="mermaid">

sequenceDiagram
    participant fs as Fagsystem
    participant ip as Integrasjonspunkt
    participant mf  as Meldingsformidler

    loop
        ip->>mf: GetMessages
        mf-->>ip: messages
    end
    
    fs->>ip: GET /api/messages/in/peek[?process={processName}]
    ip-->>fs: messageMetaData
    fs->>ip: GET /api/messages/in/pop/{messageId}
    ip-->>fs: ASiC
    fs->>ip: DELETE /api/messages/in/{messageId}

</div>

## Status 

En kan finne status på sendte meldinger med GET mot /api/statuses/{messageId}
Returen vil da være en liste med statuser en melding har vært gjennom.
Statusene vil avhenge av de underliggende meldingsformidlingstjenestene.

Sending

|Verdi|Beskrivelse|
|-----|-----------|
|OPPRETTET|Melding mottatt i integrasjonspunktet fra fagsystem og lagt på kø|
|SENDT|Melding sendt |
|MOTTATT|Melding lastet ned og lagt på kø hos mottaker|
|LEVERT|Melding lastet ned fra mottakers kø|
|LEST|Mottaker har lest medlingen / sendt applikasjonskvittering|

Avvik

{% include eformidling/nextmove/levetidUtlopt.txt %}

## WebHooks

Integrasjonspunktet har støtte for webhooks, slik at man kan abonnere på hendelser i integrasjonspunktet.
I første omgang støttes status endringer på meldinger. Dette gjelder ved både sending og mottak.

Integrasjonspunktet garanterer *ikke* leveranse av webhook-hendelser ved nettverksproblemer eller liknende. 

### Abonnement

Et abonnement kan opprettes ved bruk av subscription APIet. Disse blir lagret i en database, så de fortsetter å fungere etter en eventuell omstart av Integrasjonspunktet. 
Tanken er at man oppretter et mindre antall webhooks, som skal leve lenge. Ofte vil det holde med en webhook. Det er *ikke* meningen at man skal opprette en webhook per melding.

Eksempel:

```text
POST /api/subscriptions/ 
```
```json
{
  "name" : "Min webhook",
  "pushEndpoint" : "https://min.webhook.url",
  "resource" : "messages",
  "event" : "all"
}
```

Her velger man å motta alle webhook-hendelser knyttet til meldinger. Hendelsene skal POSTes til [https://min.webhook.url](https://min.webhook.url)
Ved opprettelse av et abonnement, så vil det sendes en *ping* hendelse til URLen man velger, for å sjekke at Integrasjonspunktet får kontakt.

Dersom man ønsker å teste ut webhooks før man har et endepunkt klart, så kan man bruke en tjeneste slik som [https://webhook.site](https://webhook.site). 
Denne nettsiden genererer en egen URL som man kan bruke som pushEndpoint. Da vil man kunne se hendelsene som mottas i nettleseren. 

### Hendelser

Hendelsene leveres i JSON format. Event-feltet skiller på de ulike typene hendelser.

#### Ping

```json
{
  "createdTs" : "2019-08-20T10:13:58.6798029+02:00",
  "event" : "ping"
}
```

#### Status

```json
{
  "createdTs" : "2019-08-20T10:15:14.3379076+02:00",
  "resource" : "messages",
  "event" : "status",
  "messageId" : "a188eb00-c322-11e9-9326-0f4902c490ea",
  "conversationId" : "a1893920-c322-11e9-9326-0f4902c490ea",
  "direction" : "OUTGOING",
  "serviceIdentifier" : "DPO",
  "status" : "SENDT"
}
```






