---
title: Eksempel på journalpost til eInnsyn
description: ""
summary: ""
permalink: eformidling_utvikling_eksempel_journalpost.html
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden viser et eksempel på journalpost til eInnsyn.

1. TOC
{:toc}

## Sende meldinger

### Opprett standard business document (SBD) for meldingen

```
curl -XPOST http://localhost:9093/api/messages/out \
-H 'Content-Type: application/json' -d \
'{
    "standardBusinessDocumentHeader": {
        "headerVersion": "1.0",
        "receiver": [{
                "identifier": {
                    "value": "0192:991825827",
                    "authority": "iso6523-actorid-upis"
                }
            }
        ],
        "documentIdentification": {
            "standard": "urn:no:difi:einnsyn:xsd::publisering",
            "typeVersion": "1.0",
            "type": "publisering"
        },
        "businessScope": {
            "scope": [{
                    "type": "ConversationId",
                    "identifier": "urn:no:difi:profile:einnsyn:journalpost:ver1.0"
                }
            ]
        }
    },
    "publisering": {
        "orgnr": "986252932",
    }
}'
```

### Legg ved filen journalpost.json

```
curl -XPUT http://localhost:9093/api/messages/out/93f530e3-0d4f-4273-94cd-e0d64019ea83 \
-H 'Content-Type: application/json' \
-H 'Content-Disposition: attachment; name=Journalpost; filename=journalpost.json' -d \
'{
    "@context": {
        "arkivstruktur": "http://www.arkivverket.no/standarder/noark5/arkivstruktur/",
        "@base": "http://data.einnsyn.no/noark5/",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "arkivstruktur:tilknyttetRegistreringSom": {
            "@type": "@id"
        },
        "arkivstruktur:offentligTittel_LIST": {
            "@container": "@list"
        },
        "arkivstruktur:tittel_LIST": {
            "@container": "@list"
        },
        "arkivstruktur:soekbar": {
            "@type": "xsd:boolean"
        },
        "arkivstruktur:parent": {
            "@type": "@id"
        },
        "arkivstruktur:versjonsnummer": {
            "@type": "xsd:integer"
        },
        "arkivstruktur:versjonsformat": {
            "@type": "@id"
        },
        "arkivstruktur:dokumentnummer": {
            "@type": "xsd:integer"
        },
        "arkivstruktur:dokumentobjekt": {
            "@type": "@id"
        },
        "arkivstruktur:dokumentstatus": {
            "@type": "@id"
        },
        "arkivstruktur:opprettetDato": {
            "@type": "xsd:dateTime"
        },
        "arkivstruktur:tilknyttetDato": {
            "@type": "xsd:dateTime"
        },
        "arkivstruktur:korrespondansepartNavn_LIST": {
            "@container": "@list"
        },
        "arkivstruktur:korrespondanseparttype": {
            "@type": "@id"
        },
        "arkivstruktur:saksaar": {
            "@type": "xsd:integer"
        },
        "arkivstruktur:saksdato": {
            "@type": "xsd:date"
        },
        "arkivstruktur:saksansvarlig_LIST": {
            "@container": "@list"
        },
        "arkivstruktur:sakssekvensnummer": {
            "@type": "xsd:integer"
        },
        "arkivstruktur:saksstatus": {
            "@type": "@id"
        },
        "arkivstruktur:dokumentbeskrivelse": {
            "@type": "@id"
        },
        "arkivstruktur:dokumentetsDato": {
            "@type": "xsd:date"
        },
        "arkivstruktur:journalaar:": {
            "@type": "xsd:integer"
        },
        "arkivstruktur:journaldato": {
            "@type": "xsd:date"
        },
        "arkivstruktur:journalpostnummer:": {
            "@type": "xsd:integer"
        },
        "arkivstruktur:journalposttype": {
            "@type": "@id"
        },
        "arkivstruktur:journalstatus:": {
            "@type": "@id"
        },
        "arkivstruktur:journalsekvensnummer:": {
            "@type": "xsd:integer"
        },
        "arkivstruktur:korrespondansepart": {
            "@type": "@id"
        },
        "arkivstruktur:variantformat": {
            "@type": "@id"
        }
    },
    "@graph": [{
            "@id": "474b3d2c-5894-486a-92f1-f4f66514901e",
            "@type": "arkivstruktur:Dokumentobjekt",
            "arkivstruktur:format": "PDF",
            "arkivstruktur:formatDetaljer": "Arkivformat",
            "arkivstruktur:referanseDokumentfil": "dokumenter\\52588bec-3760-4e30-8d7b-0560fd79d1e6\\991381_1_1.PDF",
            "arkivstruktur:variantformat": "arkivstruktur:arkivformat",
            "arkivstruktur:versjonsnummer": 1
        }, {
            "@id": "52588bec-3760-4e30-8d7b-0560fd79d1e6",
            "@type": "arkivstruktur:Dokumentbeskrivelse",
            "arkivstruktur:dokumentnummer": 2,
            "arkivstruktur:dokumentobjekt": "474b3d2c-5894-486a-92f1-f4f66514901e",
            "arkivstruktur:dokumentstatus": "arkivstruktur:dokumentetErFerdigstilt",
            "arkivstruktur:dokumenttype": "Inngående eksternt produsert",
            "arkivstruktur:opprettetAv": "Administrator",
            "arkivstruktur:opprettetDato": "2016-03-04T18:28:45",
            "arkivstruktur:systemID": "9f58bae3-afd7-4f5f-b22d-9d1890da6267",
            "arkivstruktur:tilknyttetAv": "360 Administrator",
            "arkivstruktur:tilknyttetDato": "2016-03-04T09:00:00",
            "arkivstruktur:tilknyttetRegistreringSom": "arkivstruktur:vedlegg",
            "arkivstruktur:tittel": "Vedlegg.pdf",
            "arkivstruktur:tittel_LIST": [
                "Vedlegg.pdf"
            ],
            "arkivstruktur:tittel_SENSITIV": "Vedlegg.pdf"
        }, {
            "@id": "5a3c3800-d10a-4e42-97ac-41338f7f971b",
            "@type": "arkivstruktur:Korrespondansepart",
            "arkivstruktur:korrespondansepartNavn": "Digdir",
            "arkivstruktur:korrespondansepartNavn_LIST": [
                "Digdir"
            ],
            "arkivstruktur:korrespondansepartNavn_SENSITIV": "Digdir",
            "arkivstruktur:korrespondanseparttype": "arkivstruktur:mottaker"
        }, {
            "@id": "bb802b0e-2cd6-411c-b2f2-11ce4a8fb537",
            "@type": "arkivstruktur:Saksmappe",
            "arkivstruktur:administrativEnhet": "FSU",
            "arkivstruktur:mappeID": "16/00011",
            "arkivstruktur:offentligTittel": "Søknad om ny parykk",
            "arkivstruktur:offentligTittel_LIST": [
                "Søknad om ny parykk"
            ],
            "arkivstruktur:offentligTittel_SENSITIV": "Søknad om ny parykk",
            "arkivstruktur:saksaar": "2020",
            "arkivstruktur:saksansvarlig": "Meg",
            "arkivstruktur:saksansvarlig_LIST": [
                "Meg"
            ],
            "arkivstruktur:saksansvarlig_SENSITIV": "Meg",
            "arkivstruktur:saksdato": "2020-08-06",
            "arkivstruktur:sakssekvensnummer": "24",
            "arkivstruktur:saksstatus": "arkivstruktur:saksstatus_avsluttet",
            "arkivstruktur:systemID": "bb802b0e-2cd6-411c-b2f2-11ce4a8fb537",
            "arkivstruktur:tittel": "Søknad om ny parykk",
            "arkivstruktur:tittel_LIST": [
                "Søknad om ny parykk"
            ],
            "arkivstruktur:tittel_SENSITIV": "Søknad om ny parykk"
        }, {
            "@id": "bc7d4f0f-00d9-44ee-8fbd-7980f2d582a8",
            "@type": "arkivstruktur:Journalpost",
            "arkivstruktur:dokumentbeskrivelse": [
                "52588bec-3760-4e30-8d7b-0560fd79d1e6"
            ],
            "arkivstruktur:dokumentetsDato": "2016-03-04",
            "arkivstruktur:journalaar": 2016,
            "arkivstruktur:journaldato": "2016-03-04",
            "arkivstruktur:journalpostnummer": 1,
            "arkivstruktur:journalposttype": "arkivstruktur:inngåendeDokument",
            "arkivstruktur:journalsekvensnummer": 25,
            "arkivstruktur:journalstatus": "arkivstruktur:arkivert",
            "arkivstruktur:korrespondansepart": [
                "5a3c3800-d10a-4e42-97ac-41338f7f971b"
            ],
            "arkivstruktur:offentligTittel": "Søknad om ny parykk",
            "arkivstruktur:offentligTittel_LIST": [
                "Søknad om ny parykk"
            ],
            "arkivstruktur:offentligTittel_SENSITIV": "Søknad om ny parykk",
            "arkivstruktur:parent": {
                "@id": "bb802b0e-2cd6-411c-b2f2-11ce4a8fb537"
            },
            "arkivstruktur:registreringsID": "16/00011-1",
            "arkivstruktur:systemID": "bc7d4f0f-00d9-44ee-8fbd-7980f2d582a8",
            "arkivstruktur:tittel": "Søknad om ny parykk",
            "arkivstruktur:tittel_LIST": [
                "Søknad om ny parykk"
            ],
            "arkivstruktur:tittel_SENSITIV": "Søknad om ny parykk"
        }
    ]
}'
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

- Funksjonell beskrivelse av [Journalpost til eInnsyn](eformidling_funksjonalitet_journalpost.html)
- Dokumenttypen [Publisering](eformidling_utvikling_dokumenttype_publisering.html)
- Grensesnittet [eFormidling 2](eformidling_utvikling_integrasjonspunkt_eformidling2_api.html)
- Flere [Eksempler](eformidling_utvikling_eksempler.html)
