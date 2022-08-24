---
title: Sikkerhetskopi
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden hva som skal til for å ta sikkerhetskopi av integrasjonspunktet.

Det er mulig å ta backup eller flytte integrasjonspunktet og samtidig bevare historikken ved å ta en kopi av innholdet i mappen. 

1. Stopp integrasjonspunktet
2. Ta en kopier av alt innholdet i mappen
3. Start integrasjonspunktet på nytt

En del av innholdet produseres og brukes av integrasjonspunktet:

| Fil                        | Beskrivelse                                               | Konsekvens av eventuelt tap                                                           |
|----------------------------|-----------------------------------------------------------|---------------------------------------------------------------------------------------|
| activemq-data/             | Innhold i den interne meldingskøen dersom denne er i bruk | Eventuelle ubehandlede utgående og innkommende meldinger går tapt                     |
| integrasjonspunkt.mv.db    | Innhold i den interne databasen dersom denne er i bruk    | Eventuelle ubehandlede utgående og innkommende meldinger går tapt, samt all historikk |
| integrasjonspunkt.trace.db | Feilsøkingsinformasjon for den interne databasen          | Ingen                                                                                 |
| integrasjonspunkt-logs/    | Logger produsert av integrasjonspunktet                   | Mister logg                                                                           |
| messages/                  | Mellomlagring av innkommende og utgående meldinger        | Eventuelle ubehandlede utgående og innkommende meldinger går tapt                     |

Ingen av disse filene er påkrevde for å starte integrasjonspunktet, om det mangler vil det bli generert.

`integrasjonspunkt-local.properties` og virksomhetens keystore (p12 eller jks) må tas vare på og kreves for å starte opp integrasjonspunktet.

`integrasjonspunkt-[versjon].jar` kan lastes ned på nytt ved behov.

## Neste steg

- [Automatisk oppgradering](automatisk_oppgradering) (anbefalt)
- [Overvåking](overvaking) (anbefalt)
