---
title: Eksempel på FIKS IO-meldingsutveksling
description: ""
summary: ""
permalink: eformidling_utvikling_eksempel_fiksio.html
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden viser et eksempel på FIKS IO-meldingsutveksling. Mottaker i eksempelet er en FIKS IO-konto med id
`fe3070c9-6fc9-4342-becb-cc56f1bc11d3`. Avsender og mottaker har avtalt seg imellom at de skal bruke
FIKS IO-meldingsutveksling til å kommunisere. De har videre avtalt å bruke FIKS IO-protokollen
`no.dibk.arkivlett.byggesak.v1`. Avsender må bygge og sende meldinger med innhold som definert for denne protokollen.

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
                    "value": "fe3070c9-6fc9-4342-becb-cc56f1bc11d3"
                }
            }
        ],
        "documentIdentification": {
            "standard": "no.dibk.arkivlett.byggesak.hentbyggesaker.v1",
            "type": "fiksio",
            "typeVersion": "2.0"
        },
        "businessScope": {
            "scope": [{
                    "identifier": "no.dibk.arkivlett.byggesak.hentbyggesaker.v1",
                    "type": "ConversationId"
                }
            ]
        }
    },
    "fiksio": {}
}'
```

### Legg ved filen message.json

```
curl -XPUT http://localhost:9093/api/messages/out/93f530e3-0d4f-4273-94cd-e0d64019ea83 \
-H 'Content-Type: application/json' -H 'Content-Disposition: attachment; name=Message; filename=message.json' -d \
'{
    "matrikkelnummer": {
        "kommunenummer": "3817",
        "gaardsnummer": "49",
        "bruksnummer": "130",
        "festenummer": "0",
        "seksjonsnummer": "0"
    }
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

## Motta meldinger

### Sjekk innkommende meldinger

```
curl http://localhost:9093/api/messages/in/peek?process=no.dibk.arkivlett.byggesak.hentbyggesaker.v1
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

- Funksjonell beskrivelse av [FIKS IO-medingsutveksling](eformidling_funksjonalitet_fiks_io.html)
- Dokumenttypen [FIKS IO](eformidling_utvikling_dokumenttype_fiks_io.html)
- Grensesnittet [eFormidling 2](eformidling_utvikling_integrasjonspunkt_eformidling2_api.html)
- Flere [Eksempler](eformidling_utvikling_eksempler.html)
