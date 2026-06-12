---
title: Helsemeldingar via NHN
description: "Sending av meldingar til fastlegar og helsepersonell via Norsk Helsenett"
summary: "Korleis sende meldingar til fastlegar og helsepersonell via NHN"
product: eFormidling
sidebar: eformidling_sidebar
---

> ⚠️ **Beta – berre tilgjengeleg i testmiljø**
>
> Denne funksjonaliteten er førebels i **beta** og er per no berre tilgjengeleg i **testmiljø**.  
> Grensesnitt, funksjonalitet og oppførsel kan endre seg før endeleg produksjonssetting.

## Innleiing

eFormidling støttar sending av meldingar til fastlegar via Norsk Helsenett (NHN) sin meldingsinfrastruktur. Meldingane vert sende direkte til fastlegen sitt EPJ-system (Elektronisk pasientjournal).

## Prosessar og dokumenttypar

Det er to måtar å adressere meldingar via NHN:

### 1. Sending til fastlege (via fødselsnummer)

Ved sending til fastlege brukar du **fødselsnummeret til pasienten** som mottakaradresse. Integrasjonspunktet vil automatisk slå opp i Fastlegeregisteret (FLR) for å finne kven som er fastlegen til den aktuelle pasienten, og deretter levere meldinga til fastlegen sitt EPJ-system.

- **Prosess**: `urn:no:difi:profile:helse:helse:ver1.0`
- **Mottakaradresse**: `fastlege-for:<Fødselsnummer (11 siffer)>`. Eksempel: `fastlege-for:17912099997`-  - Authority må settes til `nhn-actorid`
- **Oppslag**: Fastlegeregisteret (FLR), Adresseregisteret (AR) og Folkeregisteret (FREG)

Pasientinformasjon fylles automatisk ut ved oppslag i FREG.

### 2. Sending til HER-id (direkte til helsepersonell)

Ved sending direkte til eit HER-id brukar du **HER-id til mottakaren** som adresse. Dette gjer at du kan sende meldingar direkte til ein spesifikk helsepersonell eller helseinstans som er registrert i Adresseregisteret (AR), utan å gå via fastlegeoppslag.

- **Prosess**: `urn:no:difi:profile:helse:helse:ver1.0`
- **Mottakaradresse**: `HER-id:<HER-id (tal)>`. Eksempel: `HER-id:8144796` - Authority må settes til `nhn-actorid`
- **Oppslag**: Adresseregisteret (AR)
- **Eksempel**: [Dialogmelding v1.1](https://www.helsedirektoratet.no/standarder/dialogmelding-v1.1)

Pasientinformasjon må fylles ut i dette tilfellet.

## Føresetnader

Ved bruk av Helsemeldingar via NHN opptrer ei organisasjon vanlegvis både som avsendar og mottakar.

For at ei organisasjon kan ta i bruk Helsemeldingar via NHN må følgjande føresetnader vere på plass:

- Organisasjonen må vere [medlem av Helsenettet](https://www.nhn.no/medlemskap-i-helsenettet)
- Det må [delegerast rettar til Digitaliseringsdirektoratet](https://www.nhn.no/tjenester/helseid/ta-i-bruk/delegering-av-rettigheter-i-helseid-til-databehandler) for Helsemeldingar via NHN
- Dersom Integrasjonspunktet skal sende/motta på vegne av andre organisasjoner, så må det delegerast rettar i Altinn til å sende DPH-meldinger.
- Maskinporten-klienten som benyttes av Integrasjonspunktet må ha scopet `eformidling:dph` 
- Organisasjonen og helserelaterte tenester den tilbyr må vere registrert i Adresseregisteret (AR)

## Teknisk implementering

Helsemeldingar via NHN brukar kommunikasjon over **EDI 2.0**, der integrasjonspunktet vert brukt for å automatisere tilgang til AR og FLR, og i tillegg tilbyr sikker transport.

Integrasjonspunktet pakkar meldingane og sender desse vidare til NHN sin EDI 2.0-teneste. Meldingane vert deretter ruta til mottakarens MSH (Message Service Handler / meldingstjenar) basert på informasjon frå Adresseregisteret (AR) og Fastlege-registeret (FLR).

## Konfigurasjon

For å ta i bruk Helsemeldingar via NHN må integrasjonspunktet konfigurerast med følgjande:

### Aktivere NHN-meldingar

Først må NHN-meldingar aktiverast i integrasjonspunktet:

```properties
difi.move.feature.enableDPH=true
# Denne er midlertidig nødvendig inntil løsningen er klar for produksjon
difi.move.feature.enable-beta-features=true
```

### Liste av HER-ider som det skal sendes og motta meldinger for

Integrasjonspunktet kan representere éi eller fleire organisasjonar. 
Kvar organisasjon må ha delegert rettighet til organisasjonsnummeret som IP kjører med på førehand.
Alle HER-ider som skal sende eller motta meldinger i Integrasjonspunktet, må være registrert i Adresseregisteret under en av disse organisasjonene.
Man må liste opp alle HER-ider som man skal sende eller motta meldinger for. 
Disse HER-idene må være på det laveste nivået, slik at de ikke har noen under seg i AR. 
En HER-id til en organisasjon kan ikke benyttes, da den typisk har en liste med HER-ider under seg.

Døme med fleire HER-ider.   

```properties
difi.move.dph.her-ids[0]=8143548
difi.move.dph.her-ids[1]=8144717
```
## Applikasjonskvitteringer

Normalt sett ønsker Norsk Helsenett at mottakende system leser og lager applikaskjonskvitteringer, slik at man kan fortelle avsender om meldingen har kommer helt frem til mottakeren.
Integrasjonspunktet har imidlertid en mulighet til automatisk å ta seg av dette selv ved å sette følgende property:

```properties
difi.move.feature.enable-receipts=false
```
I dette tilfellet vil ikke kvitteringene hentes ut av Integrasjonspunktet som egne meldinger.
Ulempen er at avsendere da får beskjed om at en melding er lest, så snart den er mottatt av IP.
Ideelt sett bør derfor mottakene system ta seg av denne biten selv.

## Meldingsflyt

Diagrammet under viser flyten av meldingar og statusar ved sending av helsemeldingar via NHN. Meldingar går frå avsendarens fagsystem, gjennom integrasjonspunktet og EDI 2.0, til mottakarens MSH (Message Service Handler / meldingstjenar) og vidare til EPJ-systemet (Elektronisk pasientjournal).

Statusmeldingar vert returnert på fleire nivå for å informere avsendar om meldingsutvekslinga:

- **OPPRETTET**: Bekreftelse på at meldinga er oppretta i integrasjonspunktet
- **SENDT**: Bekreftelse på at meldinga er sendt vidare i kjeda
- **MOTTATT**: Bekreftelse på at meldinga er mottatt av msh-systemet hos mottakaren
- **LEST**: Bekreftelse på at meldinga er lest/behandla i mottakarens EPJ-system
- **FEIL**: Feilmelding dersom noko går gale, anten på applikasjonsnivå eller transportnivå

<div class="mermaid">
graph LR
A("fa:fa-desktop Fagsystem")
B("fa:fa-server Integrasjonspunkt")
C("fa:fa-server EDI 2.0")
D("fa:fa-hospital-o Mottaker<br>MSH")
E("fa:fa-hospital-o Mottaker<br>EPJ")

A --> |Melding til fastlege| B
B --> |Melding til fastlege| C
C --> |Melding til fastlege| D
D --> |Melding til fastlege| E
B --> |Status: OPPRETTET| A
B --> |Status: SENDT| C
B --> |Status: FEIL| A
C --> |Status: FEIL| B
C --> |Status: FEIL - applikasjonsnivå| B
C --> |Status: FEIL - transportnivå| B
D --> |Status: FEIL - applikasjonsnivå| C
B --> |Status: MOTTATT| A
C --> |Status: MOTTATT| B
D --> |Status: MOTTATT| C
B --> |Status: LEST| A
C --> |Status: LEST| B
D --> |Status: LEST| C
E --> |Status: LEST| D

</div>

## Eksempel på bruk

### Eksempel 1: Sending til fastlege (via fødselsnummer)

Eksempel SBD for sending av helsemelding til fastlege via pasientens fødselsnummer:

```json
{
  "standardBusinessDocumentHeader": {
    "headerVersion": "1.0",
    "sender": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:8144717"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "fastlege-for:30878199614"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:helse:xsd::dialogmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "{{messageId}}",
      "type": "dialogmelding",
      "creationDateAndTime": "2019-07-02T15:05:04.7960494+02:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "identifier": "urn:no:difi:profile:helse:helse:ver1.0"
        }
      ]
    }
  },
  "dialogmelding": {
    "hoveddokument": "dialogmelding.xml",
    "metadataFiler": {
      "test.pdf": {
        "description" : "Dette er en test"
      }
    }
  }
}
```

Filen dialogmelding.xml skal inneholde en [Dialogmelding v1.1](https://www.helsedirektoratet.no/standarder/dialogmelding-v1.1).

Eksempel:

```xml
<Dialogmelding xmlns="http://www.kith.no/xmlstds/dialog/2013-01-23">
<Notat>
<TemaKodet V="6" S="2.16.578.1.12.4.1.1.7322" DN="Henvendelse om pasient"/>
<Tema>Test tema</Tema>
<TekstNotatInnhold xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Testing 1 2 3 </TekstNotatInnhold>
</Notat>
</Dialogmelding>
```

#### Forklaring av viktige felt

| Felt                                         | Beskrivelse                                                                                                                                                                      |
| -------------------------------------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sender.identifier.value`                    | HER-iden til avsendaren, prefiks med `her-id:`. Eksempel: `her-id:8144717`                                                                        |
| `receiver.identifier.value`                  | **Fødselsnummer til pasienten** (11 siffer), prefiked med `fastlege-for:`. Eksempel: `fastlege-for:30878199614`. Integrasjonspunktet slår opp fastlegen i FLR.                   |
| `businessScope.scope[].identifier`           | Prosess: `urn:no:difi:profile:helse:helse:ver1.0`                                                                                                                                |

> **Merk:** Scopet `ConversationId` skal referere til første melding i en dialog. Siden dette er den første meldingen, så settes den lik dokumentIden automatisk.   

### Eksempel 2: Sending til HER-id (direkte til helsepersonell) - Første melding i en dialog

Eksempel SBD for sending av helsemelding direkte til eit HER-id:

```json
{
  "standardBusinessDocumentHeader": {
    "headerVersion": "1.0",
    "sender": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:8144717"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:12345"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:helse:xsd::dialogmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "{{messageId}}",
      "type": "dialogmelding",
      "creationDateAndTime": "2019-07-02T15:05:04.7960494+02:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "identifier": "urn:no:difi:profile:helse:helse:ver1.0"
        }
      ]
    }
  },
  "dialogmelding": {
    "hoveddokument": "dialogmelding.xml",
    "pasient": {
      "fnr": "30878199614",
      "fornavn": "OVERSIKTLIG",
      "etternavn": "KARAFFEL"
    },
    "metadataFiler": {
      "test.pdf": {
        "description" : "Dette er en test"
      }
    }
  }
}
```

#### Forklaring av viktige felt

| Felt                                         | Beskrivelse                                                                                                                                                                      |
| -------------------------------------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sender.identifier.value`                    | HER-iden til avsendaren, prefiks med `her-id:`. Eksempel: `her-id:8144717`                                                                        |
| `receiver.identifier.value`                  | **HER-id til mottakaren** (tal), med prefiks `her-id:`. Eksempel: `her-id:12345`. Integrasjonspunktet slår opp adressa i AR (Adresseregisteret).                            |
| `businessScope.scope[].identifier`           | Prosess: `urn:no:difi:profile:helse:helse:ver1.0`                                                                                                                                |

> **Merk:** HER-id må vere registrert i Adresseregisteret (AR) og knytt til organisasjonen sin MSH før meldingar kan sendast.

> **Merk:** Scopet `ConversationId` skal referere til første melding i en dialog. Siden dette er den første meldingen, så settes den lik dokumentIden autimatisk.

### Eksempel 2: Sending til HER-id (direkte til helsepersonell) - Svar på en dialog

Eksempel SBD for sending av helsemelding direkte til eit HER-id:

```json
{
  "standardBusinessDocumentHeader": {
    "headerVersion": "1.0",
    "sender": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:8144717"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:12345"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:helse:xsd::dialogmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "{{messageId}}",
      "type": "dialogmelding",
      "creationDateAndTime": "2019-07-02T15:05:04.7960494+02:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "instanceIdentifier": "{{Referanse til første melding i en dialog}}",  
          "identifier": "urn:no:difi:profile:helse:helse:ver1.0"
        },
        {
          "type": "ParentId",
          "instanceIdentifier": "{{Referanse til forrige melding i en dialog}}"
        }
      ]
    }
  },
  "dialogmelding": {
    "hoveddokument": "dialogmelding.xml",
    "pasient": {
      "fnr": "30878199614",
      "fornavn": "OVERSIKTLIG",
      "etternavn": "KARAFFEL"
    },
    "metadataFiler": {
      "test.pdf": {
        "description" : "Dette er en test"
      }
    }
  }
}
```

> **Merk:** Scopene `ConversationId` og `ParentId` brukes til å refere til en samtale. ConversationId skal referere til første melding i dialogen. ParentId skal referere til forrige melding i dialogen.   

## Sjå òg

- [Relaterte dokumentasjonssider]
