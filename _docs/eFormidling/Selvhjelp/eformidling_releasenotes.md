---
title: Endringslogg integrasjonspunktet
description: Endringslogg for integrasjonspunktet

product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_releasenotes
---

## 2.7.0

**Funksjonalitet**
10.05.22

- Utvida kapabilitietsoppslaget til å også innholde informasjon om innbyggers postkasseleverandør. 
- Støtte for eDialog via svarInn med fallback avsender ved manglende organisasjonsnummer på avsender.

**Feilrettinger**

- Rettet feil i conversations-APIet som kunne oppstå ved bruk av PostgreSQL.

## 2.6.2

**Feilrettinger**
- Fjernet bug der Arkivmelding_kvittering blir generert for DPF og DPV selv om BestEdu er i bruk.


## 2.6.0
07.04.2022

**Funksjonalitet**
- Side for meldingsoversikt viser nå kolonner for "MessageId" og "ConversationId", istedenfor berre "ID".

**Feilrettinger**
- Feilretting for manglende statuser i status kø-API.
- Retting av feil relatert til DPI for conversations-API

## 2.5.1
05.04.2022

**Feilrettinger**
- Fjerna validering på senderRef som UUID for å støtte bakoverkompatibilitet med BEST/EDU (eFormidling 1)

## 2.5.0
04.04.2022

**Funksjonalitet**
- Generert arkivmeldingkvittering legges på kø for forsendelser som går mot DPV og DPF.
- Fjerna bruk av Optionals på påkrevde felt i SBD.
- Arkivmeldingkvittering handtering for andre kanalar enn DPO


**Feilrettinger**
- Lagt inn manglande felt ```messageId, system og tidspunkt``` i arkivmelding.xml ved forsendelse frå best/edu (eFormidling 1).  


## 2.4.1
01.04.2022

**Feilrettinger**
- Retta feil der rekkefølge på innholdet i StandardBusinessDocument hadde ei påkrevd rekkefølge, dette var eit brudd med API-et og påverka nokre implementasjonar av REST-APIet ved sending.

## 2.4.0
25.03.2022

**Funksjonalitet**

* Støtte for På-vegne-av funksjonalitet for DPO
* Støtte for DPI på ny infrastruktur. Her kan en velge gammal eller ny infrastruktur vha properties. Gammal infrastruktur er aktivert som standard. Den nye infrastrukturen ikkje er klar per 25.03.22. 
* Støtte for å lese kvitteringer frå gammal og ny DPI-infrastruktur i parallell. 
* Støtte for å konfigurere  kønamn i activemq for å ha 2 integrasjonspunkt som brukar samme activemq. 
* Standardisert/Forenklet avsenderadresse for meldinger sendt på-vegne-av
* Støtte for å sende post til personer utan å oppgi fødselsnummer
* Flyttet BusinessCertificateValidator ut i efm-commons biblioteket for å tilrettelegge for gjenbruk. 
* Støtte for å ekskludere hvilke filer som skal ekskluderes fra print ved bruk av KS SvarUt. 

**Feilrettinger**
* fiksa feil ved oppretting av manifest for DPI

## 2.3.2
27.01.2022

**Funksjonalitet/feilretting**

* Bugfix 2.3.1

***

## 2.3.1
26.01.2022

**Funksjonalitet/feilretting**

* støtte for å spesifisere forsendelsestype for KS SvarUt på meldingsnivå

***

## 2.3.0
17.01.2022

**Funksjonalitet/feilretting**

* støtte for å legge fagsystem og versjon som er i bruk i eFormidling i user-agent header
* Retta feil der Statuser for Avtalt-meldinger blir ikke sendt	
* Retta feil der Hikari konsumerte alle tilgjengelige connections til database	
* Missing default value for property difi.ssl.key-store-type
* Logge utvalgte properties under oppstart i IP	
* Støtte for å sende meldinger over DPO for samme organisasjon fra fleire integrasjonspunkt	
* Justere sending av taushetsbelagt/sensistiv post til Altinn	
* Ryddet i xml/ws-biblioteker	
* Legg inn document_identifier i status logginga	
* Hindre integrasjonspunktet i å starte opp dersom kontakt med Eureka ikkje oppnås	
* Flyttet konfigurasjon fra Eureka til integrasjonspunktet	
* Oppgradert integrasjonspunktet til Spring boot 2.6.2
* Håndtering av meldinger uten vedlegg eller asic ved at /api/messages/in/pop/<id> returnerer 204. 

***
	
## 2.2.6
08.10.2021

**Funksjonalitet/feilretting**
* Håndtere nytt kommende felt "ekstraMetadata" i SvarInn responsen (DPF) for å unngå JSON unmarshalling error. 

## 2.2.5
01.10.21

**Features**

* Støtte for difi.* prefix for ofte benytta spring/javax/server-properties. Desse [finn du her](https://docs.digdir.no/eformidling_properties_config.html#valgfrie-properties)

**Feilrettinger**

* Visning av kvittering LEVERT dukker nå opp i statusnettsiden på /conversations.
* rettet optistimistisk låsefeil ved handtering av flere forespørsler mot tom database.
* Fikset trådsikkerhet i RestTemplate benyttet til uthenting av token frå Maskinporten.
* PostgreSQL - rettet transaksjonsfeil som førte til problem med uthenting av store objekter.
* Tilkoblinger til DPV har nå begrenset levetid. 


## 2.2.4
20.08.21

**Funksjonalitet/feilretting**

* Fikset: Peek i eFormidling 2 tar ikke hensyn til mer enn en query parameter"



## 2.2.3
28.06.21

**Funksjonalitet/feilretting**

* Rettet utilsiktet endring som førte til krav om gyldig UUID for senderRef for best/edu grensesnittet.
* Utvidet forretningsmelding med støtte for eInnsyn-kvittering. 
* Rettet en feil ved låsing mot database ved bruk av flere einnsyn-klient konsumenter mot integrasjonspunktet. 
* Lagt til mulighet for å konfigurere om en vil sette frist ved sending av post til Altinn postboks.
* Added curl to Docker image.

***

## 2.2.2
14.06.2021

### Hva er endret/nytt?

**Features**

I denne versjonen er det gjort flere endringer for å bedre paralellitet ved sending og lesing fra kø vha konfigurerbare verdier for antall tråder og kanaler. Det er også innført en ytelsestest-profil og målinger for svartider på forespørsler. 

* Innført valgfri prosess-parameter for capabilities oppslag.  
* Måling av svartider for utgående forespørsler.
* Innført ytelsestest-profil(YT)
* Støtte for å deaktivere cache i YT-profil
* Forbedret throughput på uthenting av kvitteringer for DPI. 
* Mulighet for å konfigurere hvor mange tråder som skal brukes til sending. Standard er 10.
* Konfigurerbar property for å ikke slå opp i DSF ved sending til DPI.
* Konfigurerbar tråd pool for Sikker Digital Post klient i integrasjonspunktet.
* Konfigurerbart hvor regelmessig meldingsstatuser skal hentes i DPV og DPF.
* Innført paging for å redusere minnebruke ved oppslag av meldingsstatuser i DPV og DPF. 

*Alle nye properties finner du [her](https://docs.digdir.no/eformidling_properties_config.html#eformidling---digital-post-til-innbyggere)*

***

## 2.2.1
05.05.2021

### Hva er endret/nytt?

**Features**

Denne versjonen markerer overgangen fra OIDC-provider til Maskinporten, da det er en forutsetning for bl.a. bruk av på-vegne-av funksjonalitet (delegering) for DPO. I tillegg inneholder den flere mindre feilrettinger og endringer:

* Ved bruk av DPF, kan SvarInn nå skrus av separat via property “difi.move.fiks.inn.enable”. Denne har standardverdi tilsvarende “difi.move.feature.enableDPF“.
* På-vegne-av DPV hadde feil avsender i varseltekst. Denne settes nå til organisasjonen som blir sendt på vegne av.
* Egendefinert DPV varslingstekst støtter nå substitusjonsvariabelen “$reporterName$“ (i tillegg til allerede eksisterende “$reporteeName$“) .
* Ifm. overgangen til Maskinporten, benyttes nå en nyere versjon av DSF som støtter flere adresselinjer. Integrasjonspunktet vil automatisk tilordne adresselinjene til feltene i forretningsmeldingen “urn:no:difi:digitalpost:xsd:fysisk::print“, men det er ikke gjort endringer i grensesnittet til kapabilitetsoppslag. Her vil adresselinjene ligge separert med semikolon (;) i “street”-feltet.
* For å støtte en enklere overgangsfase for sakarkiv-leverandører ved implementasjon av eFormidling 2.0-grensesnittet, har vi fjernet kravet om UUID i ReceiverRef i SBDH. Denne valideringen vil bli gjeninnført ved et senere tidspunkt.
* [OBS. For å ta i bruk versjonen må en ha ny brannmuråpning](https://docs.digdir.no/eformidling_forutsetninger.html#brannmur%C3%A5pninger-i-produksjon) 	146.192.252.50:443 - maskinporten.no (TCP)

***

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

***

## 2.1.3
18.08.2020

### Hva er endret/nytt?

* Validering av felt ved sending av DPF-forsendelser**


**Mindre feilrettinger:**

- Content-Disposition name-field does not support RFC5987


Full endringslogg: [Release notes for 2.1.3](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10191)
 
***

## 2.1.2
01.07.2020

### Hva er endret/nytt?

* Basic auth for alle endepunkter integrasjonspunktet tilbyre (bortsett fra "manage/health"**

* Går over til bruk av JWK(JSON Web Key) for signering i integrasjonspunkt - hentes fra et nytt endepunkt i SR.**

**Mindre feilrettinger:**

- Content-disposition name-felt støtter ikkje support RFC5987

- "0MB" vises som feilmelding når size limit er mindre enn ein megabyte.


Full endringslogg: [Release notes for 2.1.2](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10187)

***

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

***

## 2.0.10
16.12.19

[Release notes for 2.0.10](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10173)

***

## 2.0.9
12.12.19

[Release notes for 2.0.9](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10172)

***

## 2.0.8
09.12.19

[Release notes for 2.0.8](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10170)

***

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


