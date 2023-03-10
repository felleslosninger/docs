---
title: Integrasjonspunktets API (eFormidling 2)
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from:
- /eformidling_dev
- /eformidling_nm_meldingsflyt
- /eformidling_nm_restdocs
- /eformidling_nm_swagger
---

Denne siden beskriver integrasjonspunktets API (`eFormidling 2`) og bruksmønstre for dette.

1. TOC
{:toc}

Se API-definisjon for detaljer:

- [API-dokumentasjon](integrasjonspunkt_eformidling2_api_restdocs) (ekstern lenke)

## Sende meldinger

Grensesnittet støtter to strategier for å sende meldinger. En ettstegs strategi støttes for meldinger opp til 5 MB.
Denne strategien er først og fremst relevant ved masseutsendinger av små meldinger. Maskin-til-maskin meldinger tilhører
ofte denne kategorien. For større meldinger støttes bare en flerstegs-strategi. Implementasjoner der det er
sluttbrukere som styrer innholdet (og dermed meldingsstørrelsen) anbefales å implementere flerstegs strategien slik at
både små og store meldinger støttes. Det anbefales bare å implementere en av strategiene.

Ettstegs strategien medfører færre HTTP-forespørsler og er kanskje litt raskere å implementere. Ettstegs strategien
er ment for små meldinger, mens flerstegs strategien er ment for store. De to strategiene gir for alle praktiske formål tilnærmet lik ytelse.

Når en melding er sendt må implementasjonen vente på meldingsstatusen `LEVERT` før sending kan regnes som vellykket. Det
er flere strategier for å følge med på meldingsstatuser. Disse er beskrevet for seg selv.

### Ettstegs strategi for små meldinger

Ettstegs strategien for små meldinger støtter meldingsstørrelser opp til 5 MB.

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

### Flerstegs strategi for store og små meldinger

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

## Følge med på status for sendt melding

Når en melding er sendt må implementasjonen vente på meldingsstatusen `LEVERT` før sending kan regnes som vellykket.

En utgående melding går gjennom en rekke statuser:

| Verdi     | Beskrivelse                                                       |
|-----------|-------------------------------------------------------------------|
| OPPRETTET | Melding mottatt i integrasjonspunktet fra fagsystem og lagt på kø |
| SENDT     | Melding sendt                                                     |
| MOTTATT   | Melding lastet ned og lagt på kø hos mottaker                     |
| LEVERT    | Melding lastet ned fra mottakers kø                               |
| LEST      | Mottaker har lest meldingen / sendt applikasjonskvittering        |

Avvik:

| Verdi          | Beskrivelse                                                                  |
|----------------|------------------------------------------------------------------------------|
| LEVETID_UTLOPT | Melding har ikke blitt levert og innen leveringsfristen og må sendes på nytt |
| FEIL           | Uventet feilsituasjon oppstått                                               |

Det er flere strategier for å følge med på meldingsstatuser. Den enkleste strategien er å regelmessig slå opp på status
for meldingene som er sendt men ikke ennå bekreftet levert. Ved større mengder meldinger vil dette medføre større mengder
oppslag og dermed kunne begrense hvor ofte en kan slå opp status for en gitt melding. En bruker som har sendt en melding
vil dermed kunne oppleve at det går unødvendig lang tid fra en melding er sendt til brukeren får bekreftet at den er
levert. En mer effektiv strategi er å slå opp alle relevante meldingsstatuser og bla igjennom. En annen strategi er å
slå opp neste innkommende meldingsstatus uten å angi hvilke melding en ønsker status for. Dersom flere klienter deler
samme integrasjonspunkt kan en ikke bruke denne strategien. En kan også sette opp supplerende webhook-abonnement for
statuser.

### Oppslag på statuser for gitt meldingsId

<div class="mermaid">

sequenceDiagram
participant fs as Fagsystem
participant ip as Integrasjonspunkt

    loop Periodisk
        fs->>ip: GET /api/statuses/{messageId 1}
        fs->>ip: GET /api/statuses/{messageId 2}
        fs->>ip: GET /api/statuses/{messageId N}
    end
    
</div>

### Søk på alle relevante statuser

<div class="mermaid">

sequenceDiagram
participant fs as Fagsystem
participant ip as Integrasjonspunkt

    loop Periodisk
        fs->>ip: GET /api/statuses?status={status}
        fs->>ip: GET /api/statuses?status={status}&page={1}
        fs->>ip: GET /api/statuses?status={status}&page={N}
    end

</div>

### Hente neste status til det er tomt

<div class="mermaid">

sequenceDiagram
participant fs as Fagsystem
participant ip as Integrasjonspunkt

    loop Periodisk

        loop Til det er tomt
            fs->>ip: GET /api/statuses/peek
            fs->>ip: DELETE /api/statuses/{id}
        end

    end

</div>

### Supplerende webhook-abonnement for statuser

Supplerende webhook-abonnement for statuser for utgående måte kan brukes på samme måte som for innkommende meldinger. Se
gjerne:

- [Supplerende webhook-abonnement for innkommende meldinger](#supplerende-webhook-abonnement-for-innkommende-meldinger)

## Motta meldinger

Grensesnittet støtter en hovedstrategi for å motta meldinger: regelmessig henting. I tillegg kan denne strategien
suppleres med webhook-abonnement slik at integrasjonspunktet aktivt sender meldinger videre til et endepunkt på
klienten. Webhook-implementasjonen garanterer ikke leveranse i tilfeller der integrasjonspunktet startes på nytt eller
der videresending av meldinger feiler (for eksempel dersom klientens endepunkt er nede). Denne strategien er derfor
bare et mulig supplement til regelmessig henting.

Begge strategiene støtter filtrering for hvilke typer meldinger som skal hentes slik at ett integrasjonspunkt kan ha
flere konsumenter for ulike formål. For eksempel kan en motta innsynskrav fra eInnsyn mens en annen klient kan motta
meldinger knyttet til saksbehandling. Dette krever at alle klientene bare konsumerer de meldingene den enkelte klient
skal ha (og ikke meldingene de andre klientene skal ha). 

### Regelmessig henting av meldinger

Når en skal laste ned meldinger fra integrasjonspunktet må dette initieres med en peek, som låser førte meldingen i
køen. Dersom en er ute etter meldinger av en bestemt type kan dette gjøres ved å sende med filter for denne.

Etter man har låst meldingen kan denne deretter lastes ned via endepunktet `/api/messages/in/{messageId}`.

Etter meldingen er lastet ned kan denne slettes via å kalle DELETE mot `/api/messages/in/pop/{messageId}` eller den kan
låses opp igjen.

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
    ip-->>fs: SBD
    fs->>ip: GET /api/messages/in/pop/{messageId}
    ip-->>fs: ASiC
    fs->>ip: DELETE /api/messages/in/{messageId}

</div>

### Supplerende webhook-abonnement for innkommende meldinger

Ved å sette opp et supplerende webhook-abonnement for innkommende meldinger oppnår en bedre responsivitet enn om en
bare baserer seg på regelessig henting av innkommende meldinger. Når en får beskjed om en innkommende melding må en
gjennom hovedstrategien for å hente meldingen.

Et abonnement opprettes ved bruk av subscription APIet. Disse blir lagret i en database, så de fortsetter å fungere
etter en eventuell omstart av integrasjonspunktet. Tanken er at man oppretter et mindre antall webhooks, som skal leve
lenge. Ofte vil det holde med en webhook. Det er *ikke* meningen at man skal opprette en webhook per melding.

Ved opprettelse av et abonnement, så vil det sendes en *ping* hendelse til URLen man velger, for å sjekke at
integrasjonspunktet får kontakt.

Dersom man ønsker å teste ut webhooks før man har et endepunkt klart, så kan man bruke en tjeneste slik som
[https://webhook.site](https://webhook.site). Denne nettsiden genererer en egen URL som man kan bruke som pushEndpoint.
Da vil man kunne se hendelsene som mottas i nettleseren.
<div class="mermaid">

sequenceDiagram
participant fs as Fagsystem
participant ip as Integrasjonspunkt
participant mf  as Meldingsformidler

    fs->>ip: Opprette abonnement: POST /api/subscriptions

    loop
        ip->>mf: GetMessages
        mf-->>ip: messages
    end

    ip->>fs: POST http://my.webhook.no/my-endpoint
    
    fs->>ip: GET /api/messages/in/peek?messageId={messageId}]
    ip-->>fs: SBD
    fs->>ip: GET /api/messages/in/pop/{messageId}
    ip-->>fs: ASiC
    fs->>ip: DELETE /api/messages/in/{messageId}

</div>

Se:

- [Eksempel på opprettelse av webhook-abonnement](integrasjonspunkt_eformidling2_api_restdocs#_example_1_create_a_subscription)

## Legge til rette for feilsøking

For å legge til rette for feilsøking oppfordres det til å oppgi HTTP-header `User-Agent` ved bruk av integrasjonspunktets API. Det er ønskelig å oppgi navn og versjon for systemet som integrerer, samt plattformen det kjører på. `User-Agent` behandles som fritekst, men noen eksempler som bruker vanlig konvensjon er:

- `Acos Websak/1.1 (X11; Linux x86_64)`
- `Public 360/1.1 (Windows NT 10.0; Win64; x64)`

