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

- **Prosess**: `urn:no:difi:profile:digitalpost:fastlege:ver1.0`
- **Mottakaradresse**: Fødselsnummer (11 siffer)
- **Oppslag**: Fastlegeregisteret (FLR) og Adresseregisteret (AR)

### 2. Sending til HER-ID (direkte til helsepersonell)

Ved sending direkte til eit HER-ID brukar du **HER-ID til mottakaren** som adresse. Dette gjer at du kan sende meldingar direkte til ein spesifikk helsepersonell eller helseinstans som er registrert i Adresseregisteret (AR), utan å gå via fastlegeoppslag.

- **Prosess**: `urn:no:difi:profile:digitalpost:helse:ver1.0`
- **Mottakaradresse**: HER-ID (tal)
- **Oppslag**: Adresseregisteret (AR)
- **Eksempel**: [Dialogmelding v1.1](https://www.helsedirektoratet.no/standarder/dialogmelding-v1.1)

## Føresetnader

Ved bruk av Helsemeldingar via NHN opptrer ei organisasjon vanlegvis både som avsendar og mottakar.

For at ei organisasjon kan ta i bruk Helsemeldingar via NHN må følgjande føresetnader vere på plass:

- Organisasjonen må vere [medlem av Helsenettet](https://www.nhn.no/medlemskap-i-helsenettet)
- Det må [delegerast rettar til Digitaliseringsdirektoratet](https://www.nhn.no/tjenester/helseid/ta-i-bruk/delegering-av-rettigheter-i-helseid-til-databehandler) for Helsemeldingar via NHN
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
```

### Whitelist av organisasjonsnummer

Integrasjonspunktet kan representere éi eller fleire organisasjonar. Kvar avsendar må vere whitelista på førehand gjennom konfigurasjonsnøkkelen `difi.move.dph.whitelistOrgnum`. Denne er påkravd og skal innehalde eitt eller fleire organisasjonsnummer som kan sende meldingar via integrasjonspunktet.

**Døme med eitt organisasjonsnummer:**

```properties
difi.move.dph.whitelistOrgnum=999888777
```

Døme med fleire organisasjonsnummer:

```properties
difi.move.dph.whitelistOrgnum=999888777,888777666
```

> **Merk:** Dersom `difi.move.dph.whitelistOrgnum` har meir enn eitt organisasjonsnummer, må `difi.move.dph.allowMultitenancy` setjast til `true`.

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
          "authority": "iso6523-actorid-upis",
          "value": "0192:931796003"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "iso6523-actorid-upis",
          "value": "30878199614"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:digitalpost:json:schema::dialogmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "{{messageId}}",
      "type": "dialogmelding",
      "creationDateAndTime": "2019-07-02T15:05:04.7960494+02:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "instanceIdentifier": "{{conversationId}}",
          "identifier": "urn:no:difi:profile:digitalpost:fastlege:ver1.0"
        },
        {
          "type": "SenderRef",
          "instanceIdentifier": "<UUID>",
          "identifier": "AvsenderSystem"
        },
        {
          "type": "ReceiverRef",
          "instanceIdentifier": "<UUID>",
          "identifier": "MottakerSystem"
        },
        {
          "type": "SenderHerId2",
          "instanceIdentifier": "8143154"
        }
      ]
    }
  },
  "dialogmelding": {
    "notat": {
      "subject": "subject",
      "notatinnhold": "notat"
    },
    "sikkerhetsnivaa": "4",
    "vedleggBeskrivelse": "Beskrivelse av vedlegg"
  }
}
```

#### Forklaring av viktige felt

| Felt                                         | Beskrivelse                                                                                                                                                                      |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sender.identifier.value`                    | Organisasjonsnummer til avsendaren, prefiks med `0192:` for norske organisasjonsnummer. Eksempel: `0192:931796003`                                                               |
| `receiver.identifier.value`                  | **Fødselsnummer til pasienten** (11 siffer). Utan prefiks. Eksempel: `30878199614`. Integrasjonspunktet slår opp fastlegen i FLR.                                                |
| `businessScope.scope[].identifier`           | Prosess: `urn:no:difi:profile:digitalpost:fastlege:ver1.0`                                                                                                                       |
| `businessScope.scope[].type: "SenderHerId2"` | HER-ID til avsendarens MSH (Message Service Handler). Dette er ein unik identifikator i Adresseregisteret (AR) som identifiserer avsendarens meldingstjenar. Eksempel: `8143154` |

### Eksempel 2: Sending til HER-ID (direkte til helsepersonell)

Eksempel SBD for sending av helsemelding direkte til eit HER-ID:

```json
{
  "standardBusinessDocumentHeader": {
    "headerVersion": "1.0",
    "sender": [
      {
        "identifier": {
          "authority": "iso6523-actorid-upis",
          "value": "0192:931796003"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "iso6523-actorid-upis",
          "value": "79768"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:digitalpost:json:schema::dialogmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "{{messageId}}",
      "type": "dialogmelding",
      "creationDateAndTime": "2019-07-02T15:05:04.7960494+02:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "instanceIdentifier": "{{conversationId}}",
          "identifier": "urn:no:difi:profile:digitalpost:helse:ver1.0"
        },
        {
          "type": "SenderRef",
          "instanceIdentifier": "<UUID>",
          "identifier": "AvsenderSystem"
        },
        {
          "type": "ReceiverRef",
          "instanceIdentifier": "<UUID>",
          "identifier": "MottakerSystem"
        },
        {
          "type": "SenderHerId2",
          "instanceIdentifier": "8143154"
        }
      ]
    }
  },
  "dialogmelding": {
    "notat": {
      "subject": "subject",
      "notatinnhold": "notat"
    },
    "sikkerhetsnivaa": "4",
    "vedleggBeskrivelse": "Beskrivelse av vedlegg"
  }
}
```

#### Forklaring av viktige felt

| Felt                                         | Beskrivelse                                                                                                                                                                      |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sender.identifier.value`                    | Organisasjonsnummer til avsendaren, prefiks med `0192:` for norske organisasjonsnummer. Eksempel: `0192:931796003`                                                               |
| `receiver.identifier.value`                  | **HER-ID til mottakaren** (tal). Utan prefiks. Eksempel: `79768`. Integrasjonspunktet slår opp adressa i AR (Adresseregisteret).                                                 |
| `businessScope.scope[].identifier`           | Prosess: `urn:no:difi:profile:digitalpost:helse:ver1.0`                                                                                                                          |
| `businessScope.scope[].type: "SenderHerId2"` | HER-ID til avsendarens MSH (Message Service Handler). Dette er ein unik identifikator i Adresseregisteret (AR) som identifiserer avsendarens meldingstjenar. Eksempel: `8143154` |

> **Merk:** HER-ID må vere registrert i Adresseregisteret (AR) og knytt til organisasjonen sin MSH før meldingar kan sendast.

## Sjå òg

- [Relaterte dokumentasjonssider]
