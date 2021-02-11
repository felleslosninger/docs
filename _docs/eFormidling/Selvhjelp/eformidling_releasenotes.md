---
title: Endringslogg integrasjonspunktet
description: Endringslogg for integrasjonspunktet
sidebar: eformidling
permalink: eformidling_releasenotes.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

## 2.2.0
09.02.2021

### Hva er endret/nytt?

**Features**

* Tilrettelegging for at integrasjonspunktet skal kunne brukes i fire-hjørners modell, ved å introdusere støtte for plugins. Eksempelprosjekt: https://github.com/felleslosninger/efm-ip-plugin-example - Connect to preview 

* Støtte for FIKS IO

* Validering av eget sertifikat, samt. sertifikat registrert i Virksert, både ved oppstart og sending av melding

* Ny raskere pollingoperasjon mot Altinn

* Asynkron sletteoperasjon i API for innkommende meldinger - mindre sårbar for nettverksfeil

* Innført støtte for JSON appender til stdout. Settes via property app.logger.stdoutAppender=JSON (default CONSOLE)

* Støtte for RFC5987 i name-attributt for filopplasting til utgående meldinger

* Nytt endepunkt for sletting av meldinger i status-API

* Introdusert logging av correlationId for meldingsflyt (og feil-logging)

**Feilrettinger:**

* Oppslag mot KRR hvor mottakere mangler enten mobil eller epost vil ikke føre til feil under forsendelse, så lenge én av verdiene er satt (kun ett av mottakene for varsling er påkrevd)

* Rettet prefetching-feil i forsendelseskø (ActiveMQ), som kunne føre til at feilende forsendelser blokkerte køen

* Filtrering av innkommende meldinger fungerte ikke som forventet (API)

* Error-respons uten melding fra noark-klient førte til feilsituasjon

* Manglende timeout-config for serviceregistry-klient

Fjernet logging-spam fra servicebus AMQP-klient under shutdown



Full endringslogg: [Release notes for 2.2.0](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10196)


## 2.1.3
18.08.2020

### Hva er endret/nytt?

* Validering av felt ved sending av DPF-forsendelser**


**Mindre feilrettinger:**

- Content-Disposition name-field does not support RFC5987


Full endringslogg: [Release notes for 2.1.3](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10191)


## 2.1.2
01.07.2020

### Hva er endret/nytt?

* Basic auth for alle endepunkter integrasjonspunktet tilbyre (bortsett fra "manage/health"**

* Går over til bruk av JWK(JSON Web Key) for signering i integrasjonspunkt - hentes fra et nytt endepunkt i SR.**

**Mindre feilrettinger:**

- Content-disposition name-felt støtter ikkje support RFC5987

- "0MB" vises som feilmelding når size limit er mindre enn ein megabyte.


Full endringslogg: [Release notes for 2.1.2](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10187)


## 2.1.0
05.03.2020

### Hva er endret/nytt?

**Ny meldingstype - Avtalt:**  
[Les her.](https://difi.github.io/felleslosninger/eformidling_nm_message.html#avtalt)

**Batchoppdatering av DPV/DPF statuser:**  
Istedenfor å sjekke status for en og en melding blir dette gjort som en batchjobb. Øker ytelsen.

**Grafisk statusgrensesnitt:**  
Etter ønske er det nå lagt til avsender orgnr, samt søkbar messageReference. Forenkler oversikten i status GUI.

**Mindre bugfixes:**  
- Spamvarsling av DPV meldinger er fikset
- KS avviser duplikate forsendelser med en gang.
  
  
Full endringslogg: [Release notes for 2.1.0](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10174)

## 2.0.10
16.12.19

[Release notes for 2.0.10](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10173)

## 2.0.9
12.12.19

[Release notes for 2.0.9](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10172)

## 2.0.8
09.12.19

[Release notes for 2.0.8](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10170)

## 2.0.7
18.11.19

[Release notes for 2.0.7](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10169)

## 2.0.6
01.11.19

[Release notes for 2.0.6](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10168)

## 2.0.5
16.10.19

[Release notes for 2.0.5](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10166)

## 2.0.4
07.10.19

[Release notes for 2.0.4](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10165)

## 2.0.3
01.10.19

[Release notes for 2.0.3](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10163)

## 2.0.2
25.09.19

[Release notes for 2.0.2](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10161)

[Release notes for 2.0.1](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10162)

## 2.0.0
20.09.19
Kommer.

## 1.7.94
25.01.19
```
MOVE-1125 - Dersom en DPO-melding havner i dlq'en til mottaker, sender mottaker en appreceipt tilbake (dette for å si i fra hvis meldingen stopper opp på vei til sakark f.eks)
MOVE-1246 - Endring av IP-adresser iDigitaliseringsdirektoratets  driftmiljø. Opdaterte logstash URL for staging og produksjon profilene (miljøene)

Det vil si:
- Dersom en DPO-melding havner i dlq'en til mottaker, sender mottaker en appreceipt tilbake (dette for å si i fra hvis meldingen stopper opp på vei til sakark f.eks)
- dersom avsender ikke får leveringskvittering/kvittering som avslutter "polling" innen den tid timeout er satt (24t), får meldingen feilstatus i statusgrensesnittet. 
```
-->

## Oppdatering av innholdet i veiledningen
24.10.18 


Gjort større endringer i både struktur, format og innhold for å forbedre brukeropplevelse. Dette gjelder blant annet:
```
- Fjernet mye tekst rundt oppretting av bruker/passord DPF. All ikke konfigurasjonsrelatert informasjon er flyttet til Samarbeidsportalen. Siden er fjernet og konfigurasjonsrelatert informasjon ligger på https://difi.github.io/move-integrasjonspunkt/create_users.html
- Oppretting av bruker for dpo/dpf/dpv har fått en egen side
- Fjernet oppretting av dpo bruker fra properties siden
- fjernet loggrotering og minnejustering fra https://difi.github.io/move-integrasjonspunkt/ip_run.html
- lagt til ny side: Selvhjelp
	- Loggrotering
	- eformidling på 2 minutter
	- justere minne
	- øke loggnivået
	- Trafikkflyt
	- typiske feil og hvordan løse de
	
```

## 1.7.93
12.10.2018
```
MOVE-956 setter connect- og sockettimeout i restklienten mot servicebus. For å unngå kø på servicebus. 
```

## 1.7.92
24.09.2018

Dette er endringer fra v1.7.90 t.o.m v.1.7.92. Ingen prod-release på 90 og 91.
```
MOVE-852 endring av databasemodell for å støtte MySQL
MOVE-839 Defaultverdier for jpInnhold, orgnr i SvarInn-melding. Mulighet for å angi "fiktiv" organisasjon dersom 
det mangler; settes via. property: difi.move.fiks.inn.fallbackSenderOrgNr=123...
MOVE-859 SvarSendesTil-felt i SvarUt-melding er nå alltid basert på InfoRecord til mottaker (tidligere hentet fra
 Avsmot)
MOVE-860 Retting av IndexOutOfBounds-feil ifm. polling av kvitteringer mot FIKS
MOVE-858 Manglende xml-tag i AppReceipt fra p360
MOVE-870 Oppgradering av azure-servicebus bibliotek (brukes ifm. batch-lesing av eInnsynsmeldinger)
MOVE-869 Fjernet namespace prefix i AppReceipt xml siden WebSak sliter med å lese disse
MOVE-874 Sikkerhetsnivå for DPF-meldinger blir nå satt basert på oppslaget fra Service registry mot SvarUt. Dersom mottaker har både nivå 3 og 4 velges sistnevnte

```

## 1.7.89
21.08.2018
```
MOVE-794 - AppReceipts på egen kø
MOVE-724 - fjernet personnr som ble logget dersom det oppstod feil
MOVE-796 - Fiks for polling ved exceptions
MOVE-725 - servicebus host flyttet til properties
MOVE-328 - dumping av payload til disk når den når DLQ
MOVE-817 - UUID-validering av sender- og receiver.ref i envelope
MOVE-836 - fiks av kritisk bug som har eksistert siden 1.7.87 
MOVE-837 - feil i mapping av svarSendesTil mot FIKS 
```


