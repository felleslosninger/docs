---
title: Sikkerhetskopi
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---


Det er mulig å ta backup eller flytte integrasjonspunktet og samtidig bevare historikken ved å ta vare på følgende filer/mapper. 

## Automatisk genererte filer 

Disse genererte filene/mappene kan du ta vare på for å bevare historikk:

- activemq-data
- integrasjonspunkt.mv.db
- integrasjonspunkt.trace.db
- integrasjonspunkt-logs

Ingen av disse filene er påkrevde for å starte integrasjonspunktet, om det mangler vil det bli generert. Utdyping om hva hver enkelt fil/mappe er lenger nede på siden. 

### Database filer

Integrasjonspunktet benytter H2 fildatabase som standard database, dette kan konfigureres om en ønsker å bruke [egen ekstern database](../Konfigurasjon/tilgjengelige_tjenester#ekstern-database). Ved bruk av standard database så vil integrasjonspunktet opprette to database-filer ved oppstart ( om filene ikke finnes), ```integrasjonspunkt.mv.db``` og ```integrasjonspunkt.trace.db```.

I databasen vil det lagres historikk på utgående og innkommende meldinger og status på disse. 

### Integrasjonspunkt logg

```integrasjonspunkt-logs``` mappen inneholder loggfiler for integrasjonspunktet. Disse kreves ikke for å bevare historikken, men er relevant om en ønsker å se historiske loggmeldinger. .


### Activemq-data

```activemq-data``` innholder meldingskøen internt i integrasjonspunktet, det sørger for ein retry-mekanisme om en ikke får sendt meldingen med en gang. En melding fjernes fra køen når tjenesten meldingen går mot gir http status 200 OK tilbake (status: SENDT), og når vi får kvittering (som er en melding) tilbake (status: MOTTATT/LEVERT).



## Selvopprettede filer

```integrasjonspunkt-local.properties``` og virksomhetens keystore (jks) må tas vare på og **begge er påkrevd for å starte opp integrasjonspunktet.** 

### Konfigurasjonsfil

Konfigurasjonsfilen ```integrasjonspunkt-local.properties``` må tas vare på. Her ligger din virksomhet sine innstillinger knyttet til tjenestene dere bruker, disse er nødvendige for oppstart av integrasjonspunktet.


### Keystore

Keystore inneholder virksomhetssertifikatet til virksomheten, dette må bevares og er påkrevd for å starte integrasjonspunktet. Trenger ikke ligge i samme mappe som integrasjonspunktet. 
Anbefalte filer å ta backup av: 

