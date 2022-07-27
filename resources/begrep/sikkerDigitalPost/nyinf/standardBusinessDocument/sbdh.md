---
title: Standard Business Document Header
permalink: dpi_sbdh.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Informasjon relatert til ruting og adressering av en melding. Forkortelse: SBDH. Avsender og mottaker definert i SBDH vil alltid reflektere de tekniske endepunktene i meldingsutvekslingen. |
| Kilde         | [GS1](http://www.gs1.org) |

### Schema
JSON schema for [Standard Business Document Header](schemas/common/sbdh.schema.json)

### Properties

| Identifikator                                    | Kardinalitet | Datatype                                              | Kommentar                                                                                                                                                                                   |
| ------------------------------------------------ | ------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headerVersion                                    | 1..1         | string                                             | “1.0”                                                                                                                                                                                       |
| [sender](dpi_sender.html)                                 | 1..1         | [sbdh:Sender](dpi_sender.html)                                 | Identifikator (organisasjonsnummer) til virksomheten som initierer (er avsender) i meldingsprosessen. Alle kvitteringer skal addresseres til denne parten som mottaker                      |
| [receiver](dpi_receiver.html)                             | 1..1         | [sbdh:Receiver](dpi_receiver.html)                             | Identifikator (organisasjonsnummer) til virksomheten som er sluttmottaker i meldingsprosessen. Ved initiell sending av melding vil dette alltid være en postboks eller utskriftsleverandør. |
| [documentIdentification](dpi_documentidentification.html) | 1..1         | [sbdh:DocumentIdentification](dpi_documentidentification.html) | Unik identifikator for meldingen, generert av Avsender                                                                                                                                      |
| [businessScope](dpi_businessscope.html)                   | 1..1         | [sbdh:BusinessScope](dpi_businessscope.html)                   | Unik identifikator for konversasjonen, knytter meldinger og tilhørende kvitteringer sammen                                                                                                  |

### Kommentar

Sender/Receiver indikerer retning på meldingsprosessen. For eksempel i [FormidleDigitalPostForsendelse](sdp_formidledigitalpostforsendelse.html)
prosessen så vil Sender være [Databehandler](dpi_aktorer.html#roller) og Receiver være [Postkasse](dpi_aktorer.html#roller).

Merk også at Sikker Digital Post sin bruk av SBDH er strengere enn den offisielle standarden (BusinessScope er obligatorisk i Sikker Digital Post). Konsekvesen er at man kan få en [forretningsrelatert feilmelding](sdp_forretningsfeil.html) selv om XML’en validerer mot xsd.

### Eksempel: Digital melding fra Databehandler til Postkasseleverandør

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

### Eksempel: Leveringskvittering fra Postkasseleverandør til Databehandler

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
