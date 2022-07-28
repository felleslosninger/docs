---
title: Oppgradering
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Her finner du informasjon om hvordan oppgradere integrasjonspunktet ditt.

## Manuell oppgradering 

For å oppdatere integrasjonspunktet må en bytte ut ```integrasjonspunkt-[versjon].jar``` fila med en nyare versjon. [Her finner du nedlasting av nyeste versjon. ](../Introduksjon/last_ned#last-ned-integrasjonspunktet)
Last ned og legg den nye .jar filen i mappen der du har installert integrasjonspunktet.

### Windows tjeneste

Om du har installert integrasjonspunktet som en Windows tjeneste så må du bytte versjonsnummer i ```integrasjonspunkt-service.xml``` filen din, lagre den og reinstallere tjenesten. 

Det er denne linjen som må oppdateres med tilsvarende versjon som ```integrasjonspunkt-[versjon].jar``` filen du lastet ned.
```
<argument>%BASE%/integrasjonspunkt-2.9.0.jar</argument>
```

[Se hvordan reinstallere windows tjenesten](start_og_stopp#reinstallasjon-av-tjenesten)

### Kommando

Oppdater oppstart kommandoen din med versjon tilsvarende ```integrasjonspunkt-[versjon].jar``` du lastest ned. [Se hvordan her](start_og_stopp#alt-2-kj%C3%B8re-integrasjonspunktet-fra-kommandovindu)

## Docker

Om du kjører integrasjonspunktet som Docker container eller pod i Kubernetes så trenger du bare bytte til nyeste image tag og starte container/pod med denne. 
[Lenke til siste versjon av Docker bildet finner du her](../Introduksjon/last_ned#integrasjonspunktet)

## Automatisk oppgradering

Det er mulig å benytte KOSMOS ([Kontinuerlige oppdateringar for sikker meldingsutveksling i offentleg](automatisk_oppgradering#installasjon-av-kosmos)) for å automatisk oppdatere integrasjonspunktet.
Ved å bruke KOSMOS trenger en ikke lenger å manuelt oppdatere integrasjonspunktet om du drifter på server eller VM. [Installasjonsveiledning for KOSMOS finner du her.](installasjon#kosmos)

