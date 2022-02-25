---
title: Standard Business Document
permalink: dpi_sbd_index.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Forretningsmeldingen i en forsendelse inkludert adresseringsinformasjon. |
| Forkortelse   | SBD |
| Kilde         | [GS1](http://www.gs1.org) |

### Standard Business Document (SBD)

[Standard Business
Document](http://www.gs1.org/ecom/standards/guidelines#s2) er en
[GS1](http://www.gs1.org) standard utviklet for å forenkle utveksling av
dokumenter i en B2B kontekst.  


For å senke risiko ved overngang har vi valt å beholde denne strukturen på forretningsmeldingen, men "oversatt" den om til JSON.

Standardkonvolutten inneholder informasjon for identifisering,
adressering og ruting av forretningsmeldingen. SBD er obligatorisk i
neste versjon av PEPPOL infrastrukturen for fakturaformidling.

I sikker digital post blir Standard Business Document brukt til å sende:

* informasjonen som meldingsformidler trenger for å formidle
meldingen
* identifisering og knytningen mellom forretningsmeldingen
* informasjon som postboksen trenger for å presentere og håndtere
dokumentpakken

### Klassediagram

[![](uml_diagram.jpg)](uml_diagram.jpg)

### Properties

| Identifikator                                                    | Kardinalitet | Datatype                    | Kommentar                                                                          |
| ---------------------------------------------------------------- | ------------ | --------------------------- | ---------------------------------------------------------------------------------- |
| [standardBusinessDocumentHeader](dpi_sbdh.html) | 1..1         | sh:StandardBusinessDocument | Informasjon for å formidle postforsendelsen                                        |
| [melding](dpi_forretiningsmelding_index.html)      | 1..1         | [Melding](dpi_forretiningsmelding_index.html) | Forretningsmelding identifisert i [documentIdentification](dpi_documentidentification.html) |


### Eksempel
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
