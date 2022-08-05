---
title: Overvåking
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden hva som skal til for å overvåke integrasjonspunktet.

Integrasjonspunktets støttetjenester inkluderer tjenester som kan brukes for å overvåke integrasjonspunktet:

| Tjeneste                 | Beskrivelse                                          |
|--------------------------|------------------------------------------------------|
| /manage/health           | Helsestatus UP (`HTTP 200`) eller DOWN (`HTTP 503` ) |
| /manage/health/liveness  | Status for Kubernetes liveness probe                 |
| /manage/health/readiness | Status for Kubernetes readiness probe                |
| /manage/metrics          | Diverse målinger                                     |
| /manage/prometheus       | Diverse målinger for Prometheus                      |

Integrasjonspunktet logg kan også overvåkes. Integrasjonspunktet logger både til fil og til standard output (STDOUT).
