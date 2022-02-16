---
title: Eksempel på innsynskrav fra eInnsyn
description: ""
summary: ""
permalink: eformidling_utvikling_eksempel_innsynskrav.html
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden viser et eksempel på innsynskrav fra eInnsyn.

1. TOC
{:toc}

## Motta meldinger

### Sjekk innkommende meldinger
```
curl http://localhost:9093/api/messages/in/peek?process=urn:no:difi:profile:einnsyn:innsynskrav:ver1.0
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

- Funksjonell beskrivelse av [Innsynskrav fra eInnsyn](eformidling_funksjonalitet_innsynskrav.html)
- Dokumenttypen [Innsynskrav](eformidling_utvikling_dokumenttype_innsynskrav.html)
- Grensesnittet [eFormidling 2](eformidling_utvikling_integrasjonspunkt_eformidling2_api.html)
- Flere [Eksempler](eformidling_utvikling_eksempler.html)
