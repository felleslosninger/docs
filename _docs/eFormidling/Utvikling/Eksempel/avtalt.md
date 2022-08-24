---
title: Eksempel på avtalt meldingsutveksling
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden viser et eksempel på avtalt meldingsutveksling. Mottaker i eksempelet er Direktoratet for Forvaltning og
Økonomistyring (DFØ) med organisasjonsnummer `986 252 932`. Avsender og mottaker har avtalt seg imellom at de skal bruke
avtalt meldingsutveksling til å kommunisere. De har videre avtalt å gi den avtalte meldingstypen identifikatoren
`no.digir.avtalt.test.v1`. Avsender må bygge og sende meldinger med innhold som avtalt for denne meldingstypen. Mottaker
må gjenkjenne denne avtalte meldingstypen og tolke og behandle innkommende meldinger av denne typen slik som avtalt
mellom avsender og mottaker.

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
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:986252932"
                }
            }
        ],
        "documentIdentification": {
            "standard": "urn:no:difi:avtalt:xsd::avtalt",
            "typeVersion": "1.0",
            "type": "avtalt"
        },
        "businessScope": {
            "scope": [{
                    "type": "ConversationId",
                    "identifier": "urn:no:difi:profile:avtalt:avtalt:ver1.0"
                }
            ]
        }
    },
    "avtalt": {
        "identifier": "no.digir.avtalt.test.v1",
        "content": {
            "tekst": "abc",
            "tall": 123,
            "liste": [1, 2, 3],
            "objekt": {}
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

## Motta meldinger

### Sjekk innkommende meldinger

```
curl http://localhost:9093/api/messages/in/peek?process=urn:no:difi:profile:avtalt:avtalt:ver1.0
```

### Last ned melding

```
curl http://localhost:9093/api/messages/in/pop/9e1ad87d-256d-46f6-ae5f-5dfabb0246af
```

### Slett melding

```
curl -XDELETE http://localhost:9093/api/messages/in/9e1ad87d-256d-46f6-ae5f-5dfabb0246af
```

## Neste steg

- Funksjonell beskrivelse av [Avtalt medingsutveksling](../../Funksjonalitet/avtalt)
- Dokumenttypen [Avtalt](../Dokumenttyper/avtalt)
- Grensesnittet [eFormidling 2](../integrasjonspunkt_eformidling2_api)
- Flere [Eksempler](./)
