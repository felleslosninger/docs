---
title: Forberede installasjon
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Før en kan installere eFormidlings integrasjonspunkt trengs noen forberedelser.

## Velg hvordan integrasjonspunktet skal kjøres

eFormidlings integrasjonspunkt kan kjøres ved hjelp av Docker eller ved hjelp av Java direkte.

Docker anbefales dersom en allerede bruker Docker eller Kubernetes i sitt driftsmiljø.

Java anbefales dersom en har et tradisjonelt server-basert driftsmiljø.

- [Hvordan installerer jeg Java-versjonen integrasjonspunktet krever?](../Feilsoking/sporsmal_og_svar#hvordan-installerer-jeg-java-versjonen-integrasjonspunktet-krever)

Dersom eInnsyn-klienten skal brukes sammen med integrasjonspunktet anbefales det at disse installeres på samme server.

## Sett av nødvendige ressurser for integrasjonspunktet

Følgende ressurser kreves av integrasjonspunktet:

- 1 CPU
- 2GB minne
- minst 2 GB tilgjengelig disk (dekker ~ 1 million meldinger)
- ekstra ressurser kreves ved eventuell bruk av ekstern database
- ekstra ressurser kreves ved eventuell bruk av ekstern meldingskø
- ekstra ressurser kan kreves ved høy-volum bruk

## Konfigurer brannmur dersom nødvendig

Dersom integrasjonspunktet skal kjøres i et driftsmiljø beskyttet av brannmur kan det være nødvendig å konfigurere denne
for å tillate utgående trafikk fra eFormidlings integrasjonspunkt til tjenestene integrasjonspunktet bruker.

Se beskrivelser inkludert IP-adresser for tjenestene integrasjonspunktet bruker:

- [eFormidling Produksjon](../Miljo/produksjon)
- [eFormidling QA](../Miljo/qa)

En må også tillate inngående trafikk til integrasjonspunktet fra tjenesten(e) som skal benytte integrasjonspunktet.

## Konfigurer tidssynkronisering dersom det mangler

eFormidling bruker tidsbegrensede JSON web tokens (JWT) for å autentisere virksomhetene. En for gammel autentisering vil
avvises. For å unngå at autentisering avvises på grunn av forskjeller mellom eFormidlings klokke og klokken i
kjøremiljøet for virksomhetens integrasjonspunkt er det viktig at klokken synkroniseres ved hjelp av network time
protocol (NTP). Det er også viktig at klokken er justert korrekt for tidssone og sommertid (CET / CEST i Norge).
Tjenesteleverandør velger selv tidskilde, denne bør være lokalisert internt i datasenteret.

- Du kan sjekke din klokke på [https://time.is/](https://time.is/) (ekstern lenke)
- Les om [Network Time Protocol](https://no.wikipedia.org/wiki/Network_Time_Protocol) (ekstern lenke)

## Neste steg

- [Installasjon](installasjon)
