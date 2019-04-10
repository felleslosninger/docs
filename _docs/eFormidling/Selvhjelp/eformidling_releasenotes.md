---
title: Endringslogg integrasjonspunktet
description: Endringslogg for integrasjonspunktet
sidebar: eformidling
permalink: eformidling_releasenotes.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

## 1.7.94
25.01.19
```
MOVE-1125 - Dersom en DPO-melding havner i dlq'en til mottaker, sender mottaker en appreceipt tilbake (dette for å si i fra hvis meldingen stopper opp på vei til sakark f.eks)
MOVE-1246 - Endring av IP-adresser i Difis driftmiljø. Opdaterte logstash URL for staging og produksjon profilene (miljøene)

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


