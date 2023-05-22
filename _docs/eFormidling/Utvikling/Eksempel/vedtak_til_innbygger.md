---
title: Eksempel på vedtak til innbygger
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden viser et eksempel på vedtak til innbygger. Mottaker i eksempelet er en person med fødselsnummer
`06068700602`. Det gjøres først et kapabilitetsoppslag for innbyggeren fordi vedtak til innbygger støttes av en
eller flere meldingstjenester og fordi de ulike meldingstjenestene støtter vedtak til innbygger gjennom ulike
dokumenttyper. Avsenders system må derfor vite hvilke dokumenttype som skal bygges. I tillegg må avsenders system velge
hvilken meldingstjeneste som skal brukes dersom flere støttes.

1. TOC
{:toc}

## Sende meldinger

### Slå opp mottakerens kapabiliteter
```
curl http://localhost:9093/api/capabilities/06068700602?process=urn:no:difi:profile:digitalpost:vedtak:ver1.0
```

### Opprett standard business document (SBD) for meldingen

#### Dersom dokumenttype digital støttes

```
curl -XPOST http://localhost:9093/api/messages/out \
-H 'Content-Type: application/json' -d \
'{
    "standardBusinessDocumentHeader": {
        "headerVersion": "1.0",
        "receiver": [{
                "identifier": {
                    "value": "06068700602",
                    "authority": "iso6523-actorid-upis"
                }
            }
        ],
        "documentIdentification": {
            "standard": "urn:no:difi:digitalpost:xsd:digital::digital",
            "typeVersion": "1.0",
            "type": "digital"
        },
        "businessScope": {
            "scope": [{
                    "type": "ConversationId",
                    "identifier": "urn:no:difi:profile:digitalpost:vedtak:ver1.0"
                }
            ]
        }
    },
    "digital": {
        "sikkerhetsnivaa": 3,
        "hoveddokument": "my.pdf",
        "tittel": "Test 3",
        "spraak": "NO",
        "digitalPostInfo": {
            "virkningsdato": "2022-02-14",
            "aapningskvittering": "false"
        },
        "metadataFiler": {
            "my.pdf": "lenke-utenfor-brev.xml"
        }
    }
}'
```

Dokumenttypen digital støtter utvidelser som kan tas i bruk ved å legge ved metadatafiler.

```
curl -XPUT http://localhost:9093/api/messages/out/93f530e3-0d4f-4273-94cd-e0d64019ea83 \
-H 'Content-Type: application/vnd.difi.dpi.lenke+xml' \
-H 'Content-Disposition: attachment; name=Lenke utenfor brev; filename=lenke-utenfor-brev.xml' \
-d \
'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<lenke xmlns="http://begrep.difi.no/sdp/utvidelser/lenke">
  <url>https://docs.digdir.no</url>
</lenke>'
```

#### Dersom dokumenttype digital_dpv støttes

```
curl -XPOST http://localhost:9093/api/messages/out \
-H 'Content-Type: application/json' -d \
'{
    "standardBusinessDocumentHeader": {
        "headerVersion": "1.0",
        "receiver": [{
                "identifier": {
                    "value": "06068700602",
                    "authority": "iso6523-actorid-upis"
                }
            }
        ],
        "documentIdentification": {
            "standard": "urn:no:difi:digitalpost:xsd:digital::digital_dpv",
            "typeVersion": "1.0",
            "type": "digital_dpv"
        },
        "businessScope": {
            "scope": [{
                    "type": "ConversationId",
                    "identifier": "urn:no:difi:profile:digitalpost:vedtak:ver1.0"
                }
            ]
        }
    },
    "digital_dpv": {
        "tittel": "Informasjon til deg",
        "sammendrag": "Informasjon til deg",
        "innhold": "Informasjon til deg"
    }
}'
```

#### Dersom dokumenttype print støttes

```
curl -XPOST http://localhost:9093/api/messages/out \
-H 'Content-Type: application/json' -d \
'{
    "standardBusinessDocumentHeader": {
        "headerVersion": "1.0",
        "receiver": [{
                "identifier": {
                    "value": "06068700602",
                    "authority": "iso6523-actorid-upis"
                }
            }
        ],
        "documentIdentification": {
            "standard": "urn:no:difi:digitalpost:xsd:fysisk::print",
            "typeVersion": "1.0",
            "type": "print"
        },
        "businessScope": {
            "scope": [{
                    "type": "ConversationId",
                    "identifier": "urn:no:difi:profile:digitalpost:vedtak:ver1.0"
                }
            ]
        }
    },
    "print": {
        "hoveddokument": "my.pdf",
        "mottaker": {
            "navn": "Ola Nordmann",
            "adresselinje1": "Testvegen 2",
            "postnummer": "6853",
            "poststed": "Leikanger",
            "land": "NO"
        },
        "utskriftsfarge": "SORT_HVIT",
        "posttype": "B_OEKONOMI",
        "retur": {
            "mottaker": {
                "navn": "Digitaliseringsdirektoratet avd. Leikanger",
                "adresselinje1": "Skrivarvegen 2",
                "postnummer": "6853",
                "poststed": "Leikanger",
                "land": "NO"
            },
            "returhaandtering": "DIREKTE_RETUR"
        }
    }
}'
```

### Legg ved filen my.pdf

```
curl -XPUT http://localhost:9093/api/messages/out/93f530e3-0d4f-4273-94cd-e0d64019ea83 \
-H 'Content-Type: application/octet-stream' -H 'Content-Disposition: attachment; name=My PDF; filename=my.pdf' \
--data-binary @my.pdf
```

### Send meldingen fra integrasjonspunktet

```
curl -XPOST http://localhost:9093/api/messages/out/93f530e3-0d4f-4273-94cd-e0d64019ea83
```

### Følg med på status for meldingen

```
curl http://localhost:9093/api/statuses/93f530e3-0d4f-4273-94cd-e0d64019ea83
```

## Neste steg

- Funksjonell beskrivelse av [Vedtak til Innbygger](../../Funksjonalitet/vedtak_til_innbygger)
- Dokumenttypen [Digital](../Dokumenttyper/digital)
- Dokumenttypen [Digital DPV](../Dokumenttyper/digital_dpv)
- Dokumenttypen [Print](../Dokumenttyper/print)
- Grensesnittet [eFormidling 2](../integrasjonspunkt_eformidling2_api)
- Flere [Eksempler](./)
