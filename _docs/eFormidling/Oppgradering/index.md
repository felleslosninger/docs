---
title: Oppgradering
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_ip_upgrade
---

Formålet med denne siden er å gjøre det enklest mulig å oppgradere eFormidlings integrasjonspunkt.

1. TOC
{:toc}

## Docker

Om du kjører integrasjonspunktet som Docker container eller pod i Kubernetes så trenger du bare bytte til nyeste image
tag og starte container/pod med denne. Hva som er siste versjon kan du se på:

- [Last ned integrasjonspunktet](../Introduksjon/last_ned#integrasjonspunktet)

## Java 

> For de som bruker Java anbefales det å ta i bruk automatisk oppgradering:
>
> - [Automatisk oppgradering](../installasjon/automatisk_oppgradering)

For å oppdatere integrasjonspunktet må du bytte ut filen `integrasjonspunkt-[versjon].jar` med en nyere versjon.

1. [Last ned integrasjonspunktet](../Introduksjon/last_ned#last-ned-integrasjonspunktet)
2. Legg den nye .jar filen i mappen der du har installert integrasjonspunktet
3. Stopp integrasjonspunktet
4. Oppdater versjonsnummer i din tjeneste (xml-fil), scheduled task eller kommando i konsollvindu
5. Start integrasjonspunktet på nytt

Eksempel på hvordan oppgradering gjøres:

- [Oppgradere integrasjonspunkt som kjører som en tjeneste](../installasjon/Eksempel/start_og_stopp#oppgradere-integrasjonspunkt-som-kjører-som-en-tjeneste)
- [Oppgradere integrasjonspunkt som kjører fra kommandovindu](../installasjon/Eksempel/start_og_stopp#oppgradere-integrasjonspunkt-som-kjører-fra-kommandovindu)
- [Oppgradere integrasjonspunkt som kjører via task scheduler](../installasjon/Eksempel/start_og_stopp#oppgradere-integrasjonspunkt-som-kjører-via-task-scheduler)

## Verifiser vellykket oppgradering

Sjekk integrasjonspunktets helse-status:

```
http://localhost:<port-til-integrasjonspunkt>/manage/health
```
