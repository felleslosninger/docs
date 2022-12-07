---
title: StandardBusinessDocument
permalink: dpi_standardbusinessdocument_index.html
sidebar: dpi_new_sidebar
---


1. TOC
{:toc}

## Standard Business Document (SBD)

[Standard Business
Document](http://www.gs1.org/ecom/standards/guidelines#s2) er en
[GS1](http://www.gs1.org) standard utviklet for å forenkle utveksling av
dokumenter i en B2B kontekst.  


For å senke risiko ved overgang har vi valt å beholde denne strukturen på forretningsmeldingen, men "oversatt" den til JSON.

Standardkonvolutten inneholder informasjon for identifisering,
adressering og ruting av forretningsmeldingen. SBD er obligatorisk i
neste versjon av PEPPOL infrastrukturen for fakturaformidling.

I sikker digital post blir Standard Business Document brukt til å sende:

* informasjonen som meldingsformidler trenger for å formidle
meldingen
* identifisering og knytningen mellom forretningsmeldingen
* informasjon som postboksen trenger for å presentere og håndtere
dokumentpakken

**Klassediagram**

[![](uml_diagram.jpg)](uml_diagram.jpg)

**Properties**

| Identifikator                                                    | Kardinalitet | Datatype                    | Kommentar                                                                          |
| ---------------------------------------------------------------- | ------------ | --------------------------- | ---------------------------------------------------------------------------------- |
| [standardBusinessDocumentHeader](dpi_sbdh.html) | 1..1         | sh:StandardBusinessDocument | Informasjon for å formidle postforsendelsen                                        |
| [melding](dpi_forretiningsmelding_index.html)      | 1..1         | [Melding](dpi_forretiningsmelding_index.html) | Forretningsmelding identifisert i [documentIdentification](dpi_documentidentification.html) |


**Eksempel**
```json
{
    "standardBusinessDocument": {
        "standardBusinessDocumentHeader": {
            "headerVersion": "1.0",
            "sender": [
                {
                    "identifier": {
                        "authority": "iso6523-actorid-upis",
                        "value": "0192:<orgnr>"
                    }
                }
            ],
            "receiver": [
                {
                    "identifier": {
                        "authority": "iso6523-actorid-upis",
                        "value": "0192:<orgnr>"
                    }
                }
            ],
            "documentIdentification": {
                "standard": "urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::digital##urn:fdc:digdir.no:2020:innbyggerpost:schema:digital::1.0",
                "typeVersion": "1.0",
                "instanceIdentifier": "ff88849c-e281-4809-8555-7cd54952b916",
                "type": "digital",
                "creationDateAndTime": "2021-04-11T15:29:58.753+02:00"
            },
            "businessScope": {
                "scope": [
                    {
                        "type": "ConversationId",
                        "instanceIdentifier": "37efbd4c-413d-4e2c-bbc5-257ef4a65a45",
                        "identifier": "urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:digital:ver1.0"
                    }
                ]
            }
        },
        "digital": {
            "avsender": {
                "virksomhetsidentifikator": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:999888999"
                }
            },
            "mottaker": {
                "personidentifikator": {
                    "authority": "iso3166-1-alfa2",
                    "value": "NO:17050411111"
                },
                "postkasseadresse": "ola.nordmann#9YDT"
            },
            "dokumentpakkefingeravtrykk": {
                "digestMethod": "",
                "digestValue": "5f2652040b33bccfd8c5f06e2beffc1ab822830807e8d0f0b721503e60df0eb6"
            },
            "maskinportentoken": "aølkdsølkdsj==",
            "sikkerhetsnivaa": 3,
            "virkningsdato": "2021-01-01",
            "aapningskvittering": false,
            "ikkesensitivtittel": {
                "tittel": "ikkeSensitivTittel",
                "spraak": "NO"
            },
            "varsler": {
                "epostvarsel": {
                    "epostadresse": "test@epost.no",
                    "varslingstekst": "Dette er en varslingstekst",
                    "spraak": "NO",
                    "repetisjoner": [
                        1,
                        7
                    ]
                },
                "smsvarsel": {
                    "mobiltelefonnummer": "12345678",
                    "varslingstekst": "Dette er en varslingstekst",
                    "spraak": "NO",
                    "repetisjoner": [
                        1,
                        7
                    ]
                }
            }
        }
    }
}
```

## Standard Business Document Header

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Informasjon relatert til ruting og adressering av en melding. Forkortelse: SBDH. Avsender og mottaker definert i SBDH vil alltid reflektere de tekniske endepunktene i meldingsutvekslingen. |
| Kilde         | [GS1](http://www.gs1.org) |

**Schema**
JSON schema for [Standard Business Document Header](schemas/common/sbdh.schema.json)

**Properties**

| Identifikator                                    | Kardinalitet | Datatype                                              | Kommentar                                                                                                                                                                                   |
| ------------------------------------------------ | ------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headerVersion                                    | 1..1         | string                                             | “1.0”                                                                                                                                                                                       |
| [sender](dpi_sender.html)                                 | 1..1         | [sbdh:Sender](dpi_sender.html)                                 | Identifikator (organisasjonsnummer) til virksomheten som initierer (er avsender) i meldingsprosessen. Alle kvitteringer skal addresseres til denne parten som mottaker                      |
| [receiver](dpi_receiver.html)                             | 1..1         | [sbdh:Receiver](dpi_receiver.html)                             | Identifikator (organisasjonsnummer) til virksomheten som er sluttmottaker i meldingsprosessen. Ved initiell sending av melding vil dette alltid være en postboks eller utskriftsleverandør. |
| [documentIdentification](dpi_documentidentification.html) | 1..1         | [sbdh:DocumentIdentification](dpi_documentidentification.html) | Unik identifikator for meldingen, generert av Avsender                                                                                                                                      |
| [businessScope](dpi_businessscope.html)                   | 1..1         | [sbdh:BusinessScope](dpi_businessscope.html)                   | Unik identifikator for konversasjonen, knytter meldinger og tilhørende kvitteringer sammen                                                                                                  |

**Kommentar**

Sender/Receiver indikerer retning på meldingsprosessen. For eksempel i [FormidleDigitalPostForsendelse](sdp_formidledigitalpostforsendelse.html)
prosessen så vil Sender være [Databehandler](dpi_aktorer.html#roller) og Receiver være [Postkasse](dpi_aktorer.html#roller).

Merk også at Sikker Digital Post sin bruk av SBDH er strengere enn den offisielle standarden (BusinessScope er obligatorisk i Sikker Digital Post). Konsekvesen er at man kan få en [forretningsrelatert feilmelding](sdp_forretningsfeil.html) selv om XML’en validerer mot xsd.

**Eksempel: Digital melding fra Databehandler til Postkasseleverandør**

**** En melding fra [Databehandler](sdp_aktorer.html#rollerl) med orgnummer: 123456789
til [Postkasseleverandør](sdp_aktorer.html) med orgnummer: 987654321

**** [Databehandler](sdp_aktorer.html#roller) har generert en unik
DocumentIdentification.InstanceIdentifier for denne meldingen:
“35e21e33-22b3-4554-9707-5fa829ee8bc0”

**** [Databehandler](hsdp_aktorer.html#roller) har generert en unik
BusinessScope.InstanceIdentifier for hele konversasjonen:
“37efbd4c-413d-4e2c-bbc5-257ef4a65a45”

****\* Dette vil brukes for å knytte seinere meldinger i samme
konversasjon sammen.


```json
{
    "standardBusinessDocumentHeader": {
        "headerVersion": "1.0",
        "sender": [
            {
                "identifier": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:123456789"
                }
            }
        ],
        "receiver": [
            {
                "identifier": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:987654321"
                }
            }
        ],
        "documentIdentification": {
            "standard": "urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::digital##urn:fdc:digdir.no:2020:innbyggerpost:schema:digital::1.0",
            "typeVersion": "1.0",
            "instanceIdentifier": "35e21e33-22b3-4554-9707-5fa829ee8bc0",
            "type": "digital",
            "creationDateAndTime": "2021-04-11T15:29:58.753+02:00"
        },
        "businessScope": {
            "scope": [
                {
                    "type": "ConversationId",
                    "instanceIdentifier": "37efbd4c-413d-4e2c-bbc5-257ef4a65a45",
                    "identifier": "urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:digital:ver1.0"
                }
            ]
        }
    }
}

```

**Eksempel: Leveringskvittering fra Postkasseleverandør til Databehandler**

****En melding fra [Postkasseleverandør](../Aktorer.md) med orgnummer:
987654321 til [Databehandler](sdp_aktorer.html) med orgnummer: 123456789

****[Postkasseleverandør](sdp_aktorer.html) har generert en unik
DocumentIdentification.InstanceIdentifier for denne meldingen:
“12e57bde-ea5d-43ee-96b6-e2cf73f8311e”

****[Postkasseleverandør](sdp_aktorer.html) bruker den
BusinessScope.InstanceIdentifier som [Databehandler](sdp_aktorer.html) har
generert.


```json
{
    "standardBusinessDocumentHeader": {
        "headerVersion": "1.0",
        "sender": [
            {
                "identifier": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:987654321"
                }
            }
        ],
        "receiver": [
            {
                "identifier": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:123456789"
                }
            }
        ],
        "documentIdentification": {
            "standard": "urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::leveringskvittering##urn:fdc:digdir.no:2020:innbyggerpost:schema:leveringskvittering::1.0",
            "typeVersion": "1.0",
            "instanceIdentifier": "12e57bde-ea5d-43ee-96b6-e2cf73f8311e",
            "type": "digital",
            "creationDateAndTime": "2021-04-11T15:29:58.753+02:00"
        },
        "businessScope": {
            "scope": [
                {
                    "type": "ConversationId",
                    "instanceIdentifier": "37efbd4c-413d-4e2c-bbc5-257ef4a65a45",
                    "identifier": "urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:digital:ver1.0"
                }
            ]
        }
    }
}
```

## Sender

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Avsender som har initiert en meldingsprosess mot meldingsutvekslingsrammeverket. |
| Kilde         | GS1 |
| Kommentar     | Sender den som har signert [Standard Business Document](dpi_sbd_index.html). Regler for hvem som opptrer som Sender er beskrevet under. |

\*For [digital post meldinger](../../meldinger/DigitalPostMelding.md) er
[Sender](sdp_sender.html)

  - [Behandlingsansvarlig](dpi_aktorer.html) eller en
    [databehandler](hdpi_aktorer.html) på veien av
    [behandlingsansvarlig](dpi_aktorer.html)
  - Den som vil motta alle
    [kvitteringer](dpi_kvittering.html) tilbake fra
    [Receiver](dpi_receiver.html)

\*For [digital post kvitteringer](dpi_kvittering.html) er
[Sender](dpi_sender.html)

  - [Postkasseleverandør](dpi_aktorer.html)

**Properties**

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| authority     | 1..1         |Henviser til identitesautoritet. For orgnr angi iso6523-actorid-upis, for personnummer iso3166-1| [Peppol ICD List](https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/)|
| identifier    | 1..1         | https://difi.github.io/felleslosninger/virksomhetsidentifikator.html | Angis i på formen <ICD>:<Organisasjonsnummer>           |


**Eksempel**
  
```json
{
    "sender": [
            {
                "identifier": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:123456789"
                }
            }
        ],
}
```


## Receiver

|---|---|
| Identifikator |  |
| Term          | {{page.title}} |
| Definisjon    | Sluttmottaker i en meldingsprosess. |
| Kilde         | GS1 |
| Kommentar     | Regler for hvem som opptrer som [Receiver](dpi_receiver.html) er beskrevet under. |


\*For [digtal](dpi_digital.html) meldinger er
[Receiver](dpi_receiver.html)

  - [Postkasseleverandør](dpi_aktorer.html)

\*For [kvitteringer](dpi_kvitteringer.md) er
[Receiver](dpi_receiver.html)

  - Den [Aktør](dpi_aktorer.html) som sto som [Sender](dpi_sender.html) for [digital](dpi_digital.html) meldingen.

**Properties**

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| authority     | 1..1         |Henviser til identitesautoritet. For orgnr angi iso6523-actorid-upis, for personnummer iso3166-1| [Peppol ICD List](https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/)|
| identifier    | 1..1         | https://difi.github.io/felleslosninger/virksomhetsidentifikator.html | Angis i på formen <ICD>:<Organisasjonsnummer>           |

**Eksempel**

```json
{
    "receiver": [
            {
                "identifier": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:987654321"
                }
            }
        ],
}
```
  
## DocumentIdentification

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | inneholder identifikasjon om dokumentet |
| Kilde         | [GS1](http://www.gs1.org/docs/gsmp/xml/sbdh/CEFACT_SBDH_TS_version1.3.pdf) |

**Attributer**

| Identifikator       | Kardinalitet | Datatype    | Verdi                                                                                                                      |
| ------------------- | ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| Standard            | 1..1         | string   | Id til en av de gyldige [meldingstypene](dpi_forretiningsmelding_index.html)                                                |
| TypeVersion         | 1..1         | string   | “1.0”                                                                                                                      |
| InstanceIdentifier  | 1..1         | string - uuid   | Unik identifikator for meldingen ([UUID](https://datatracker.ietf.org/doc/html/rfc4122)). Opprettet av Databehandler|
| Type                | 1..1         | string   | Type forretningsmelding. Skal alltid være “local-name” melding objektet Melding. Se kodeverk under |
| MultipleType        | 0..0         | boolean  | brukes ikke                                                                                                                |
| CreationDateAndTime | 1..1         | string - dateTime | Tidspunkt for oppretting av [Standard Business Document](dpi_sbd.md)                                                       |


**Kodeverk: Type**

I Sikker Digital Post vil type være en av følgende:

  - digital
  - utskrift
  - flyttet
  - feil
  - levertkvittering
  - varslingfeiletkvittering
  - aapningskvittering
  - mottakskvitteirng
  - returpostkvittering

**Eksempel**

```json 
{
  "documentIdentification": {
      "standard": "urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::digital##urn:fdc:digdir.no:2020:innbyggerpost:schema:digital::1.0",
      "typeVersion": "1.0",
      "instanceIdentifier": "35e21e33-22b3-4554-9707-5fa829ee8bc0",
      "type": "digital",
      "creationDateAndTime": "2021-04-11T15:29:58.753+02:00"
  }
}
```
  
## BusinessScope
  
|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | inneholder identifikasjon om dokumentet |
| Kilde         | [GS1](http://www.gs1.org/docs/gsmp/xml/sbdh/CEFACT_SBDH_TS_version1.3.pdf) |

**Properties**

| Identifikator      | Kardinalitet | Datatype  | Verdi                                                                                                                                                                   |
| ------------------ | ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type               | 1..1         | string | “ConversationId”                                                                                                                                                        |
| instanceIdentifier | 1..1         | string - uuid | Unik identifikator for konversasjonen ([UUID](https://datatracker.ietf.org/doc/html/rfc4122)). Identifikator som binder meldinger og tilhørende kvitteringer/feilmeldinger sammen. Opprettet av Databehandler. Se format under. |
| identifier         | 1..1         | string | Prosess meldingen tilhører i hennold til [meldingstypene](dpi_forretningsmelding_index.html)|




**Eksempel**

```json
{
    "businessScope": {
            "scope": [
                {
                    "type": "ConversationId",
                    "instanceIdentifier": "37efbd4c-413d-4e2c-bbc5-257ef4a65a45",
                    "identifier": "urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:digital:ver1.0"
                }
            ]
        }
}
```
