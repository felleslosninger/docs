---
title: Oppgradering
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Her finner du informasjon om hvordan oppgradere integrasjonspunktet ditt.

> For de som ikke bruker Docker anbefales det å ta i bruk automatisk oppgradering:
>
> - [Automatisk oppgradering](../Drift/automatisk_oppgradering) 

## Docker

Om du kjører integrasjonspunktet som Docker container eller pod i Kubernetes så trenger du bare bytte til nyeste image tag og starte container/pod med denne.
[Lenke til siste versjon av Docker bildet finner du her](../Introduksjon/last_ned#integrasjonspunktet)

## Java 

For å oppdatere integrasjonspunktet må en bytte ut ```integrasjonspunkt-[versjon].jar``` fila med en nyare versjon. [Her finner du nedlasting av nyeste versjon. ](../Introduksjon/last_ned#last-ned-integrasjonspunktet)
Last ned og legg den nye .jar filen i mappen der du har installert integrasjonspunktet.

### Windows tjeneste

Om du har installert integrasjonspunktet som en Windows tjeneste så må du bytte versjonsnummer i ```integrasjonspunkt-service.xml``` filen din, lagre den og reinstallere tjenesten. 

Det er denne linjen som må oppdateres med tilsvarende versjon som ```integrasjonspunkt-[versjon].jar``` filen du lastet ned.

```
<argument>%BASE%/integrasjonspunkt-2.9.0.jar</argument>
```

[Se hvordan reinstallere windows tjenesten](../Drift/Eksempel/start_og_stopp#reinstallasjon-av-tjenesten)

### Kommando

Oppdater oppstart kommandoen din med versjon tilsvarende ```integrasjonspunkt-[versjon].jar``` du lastest ned. [Se hvordan her](../Drift/Eksempel/start_og_stopp#alt-2-kj%C3%B8re-integrasjonspunktet-fra-kommandovindu)
