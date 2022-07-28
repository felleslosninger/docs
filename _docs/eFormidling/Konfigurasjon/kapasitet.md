---
title: Kapasitet
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Ved utsending av stort volum kan det være aktuelt å justere kapasiteten i integrasjonspunktet, feks ved å benytte flere tråder. Dette kan gjerast via properties eller argument til programmet ved oppstart. 

### Properties 

 | **Properties** | **Eksempel verdi** | **Beskrivelse** | **Tjeneste** |
| difi.move.dpi.clientMaxConnectionPoolSize | 10 | Antall tråder som DPI-klienten kan bruke til sending og kvittering | DPI |
|difi.move.feature.enableDsfPrintLookup| false | Skru på / av DSF oppslag for DPI. Settes til false for å skru av. Standard verdien er true. Dette kan gje noe bedre ytelse ved å ikke slå opp i folkeregisteret etter postadresse | DPI |
|difi.move.dpi.mpcConcurrency| 1 | Antall kanaler for å lese DPI-kvitteringer | DPI |
|difi.move.nextmove.statusPollingCron|0 * * * * *|Hvor ofte en sjekker etter meldingsstatus i DPV| DPV|
|difi.move.queue.concurrency| 10 | Antall tråder for ActiveMQ køen | - |


### Minne 

Anbefaler å sette minimum og maximum minne på Java heap til det samme. Vi anbefaler også minimum 2GB ved bruk av eFormidling, se [her for mer informasjon](../Drift/forberede_installasjon#dette-gjør-du-før-installasjon-av-integrasjonspunktet). 

Oppstartsargument til applikasjonen for å sette tilgjengelig minne ```-Xms2G``` og ```-Xmx2G```. Eksempel kommando: ```java -Xms2G -Xmx2G -jar integrasjonspunkt.jar```. 
