---
title: Endringslogg
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from:
  - /eformidling_releasenotes
  - /eformidling_releasenotes_sentrale_komp
  - /eformidling_nm_changelog
---

## Innhold

1. [Integrasjonspunktet](#integrasjonspunktet)
2. [Sentrale komponenter](#sentrale-komponenter)
3. [KOSMOS](#kosmos)

## Integrasjonspunktet

## 2.22.0

18.09.2023

**Funksjonalitet**

- Ny DPI-infrastruktur innført som standard-innstilling i eFormidling

**Feilrettingar**
- Korrelasjons-ID vert kun tilordna på relevante logginnslag
- Meir forståelege feilmeldingar ved feilresponar frå FIKS/SvarUt

## 2.21.0

29.08.2023

**Funksjonalitet**

- Innføring av ny URL og IP-adresse hjå Kontakt- og Reservasjonsregisteret ([krever brannmuråpning hos DPI-avsendarar som sender til utskrifttenesta](https://status.digdir.no/incidents/7x95zny40r8c))
- Utskriving av sky-konfigurasjon

**Feilrettingar**

- Vedlegg på avtalt-meldingar vert mottekne

## 2.20.0

28.06.2023

**Feilrettingar**

- Integrasjonspunktet slår ikkje opp json-schema.org og annet ved oppstart
- Mottakers løsning krasjer ikkje dersom for store filer blir sendt til mottaker som har har BEST/EDU
- Hovuddokumentet kjem først i lista over vedlegg ved mottak av SvarInn-meldingar

## 2.19.0

06.06.2023

**Feilrettingar**

- setTidspunkt i SvarInnconverter returnerer no data på rett format.

## 2.18.0

23.05.2023

**Funksjonalitet**

- Lagt til støtte for SEID 2.0-test-verksemdssertifikat i test og QA

## 2.17.1

11.05.2023

**Funksjonalitet**

- Støtte for Seid 2.0-sertifikat i DPI-klienten til Integrasjonpunktet

## 2.17.0

09.05.2023

**Funksjonalitet**

- Innføring av utskriftsteneste frå Skatteetaten som standard-val i eFormidling

## 2.16.2

05.05.2023

**Feilrettingar**

- Ved sending av DPI blir det registrert dobbel MOTTATT når MOTTATT kjem etter LEVERT: Proxy-klienten vil ikkje motta MOTTATT-statusar, kun LEVERT.

---

## 2.16.1

03.05.2023

**Feilrettingar**

- Dobbel mottatt vert ikkje registrert ved sending av digital post til innbyggarar.

---

## 2.16.0

25.04.2023

**Funksjonalitet**

- Overgang til nytt Maskinporten-test-miljø i eFormidling sitt staging-/QA-miljø
- Støtte for test-verksemdssertifikat SEIDv2 frå Buypass og Commfides

**Vedlikehald**

- Oppgradering av avhengigheitar i Docker-biletet

---

## 2.15.0

31.03.2023

**Funksjonalitet**

- Muligheit for å sette egen levetid per meldingstype: https://docs.digdir.no/docs/eFormidling/installasjon/installasjon#levetid-for-meldinger

**Feilrettinger**

- Hindre at status MOTTATT kommer etter LEVERT for DPI meldinger
- Ved bruk av proxyklient for DPI fortsetter ikke polling av meldingsstatus etter at melding er levert
- DPI kvitteringer følger nå konfigurert intervall
- Arkivmelding-kvittering med receiptType ERROR får ikke lenger status LEST
- Integrasjonspunktet slår opp på json-schema.org (og sikkert andre ved behov) ved oppstart
- Sletting av tempfiler utføres nå som forventet

---

## 2.14.0

07.02.2023

- Retta autentiseringsfeil som oppstod ved mottak av meldingar fra KS SvarInn ved bruk av mottakersystem med fleire organisasjonsnummer

## 2.13.0

06.02.2023

- Retta ein ny og sjelden feilsituasjon for DPI-meldingar som førte til at integrasjonspunktet kom i ein tilstand der ein ikkje fekk henta inn kvitteringar
- Retta problem med at sletting av filer feila ved mottak med BEST/EDU

## 2.12.0

09.12.2022

- Ugyldig korrespondanseparttype skal bli ignorert ved sending av DPF-meldingar
- Klikk på messageID vil no åpne statusen til gitt melding i ny fane i grensesnittet.
- Tilrettelegging for ny DPI-utskriftsteneste

## 2.11.0

07.11.2022

- Tilgjengeliggjere rawReceipt for meldingsstatuser på DPIs gamle XML-format også ved FEIL fra H2
- Sjelden feilsituasjon i DPI fører til at integrasjonspunktet kjem i ei tilstand der ein ikkje klarer å hente inn kvitteringar
- Feil ved pop av melding ved bruk av Postgres
- Opplasting av arkivmelding.xml til integrasjonspunktet feiler ved bruk av MySQL
- Sporadisk NullPointerException ved innhenting av status for sendt melding fra KS SvarUt
- Setja spring.datasource.hikari.autoCommit=false som standard
- Skille mellom arkivmelding og arkivmelding_kvittering i brukargrensesnittet for integrasjonspunktet
- Oppdatere Azure Service Bus biblioteket
- På vegne av DPF:

  NB! Dersom du har underorgnr registret på mottakersystemet ditt må dei leggast inn slik i propertiesfila (samme username/password som allerede er i bruk):

  difi.move.fiks.inn.paa-vegne-av.orgnr-til-undervirksomhet.username=username

  difi.move.fiks.inn.paa-vegne-av.orgnr-til-undervirksomhet.password=password

- IOException frå blob-parsing vert fanga i NextMoveMessageInService
- Feil DPI property i prod mot hj2
- efm-mocks oppdatert iht nyeste integrasjonspunkt
- Innhenting av meldingsstatuser stopper ikke opp ved meir enn 2100 uteståande meldingsstatuser ved bruk av MSSQL
- IP-pop av avtaltmelding uten ASIC gir ikkje feil lenger
- Skru av OSIV i integrasjonspunktet

## 2.8.4

25.10.2022

- Oppgradert Apache Commons Text til versjon 1.10.0

## 2.8.3

08.09.2022

- Fikset feil der integrasjonspunktet i enkelte tilfeller produserte ugyldige arkivmeldinger ved mottak fra KS SvarInn: manglende systemId, manglende journaldato og journaldato fra før kristus
- Lagt til støtte for å ekskludere alle filer bortsett fra PDF fra print ved bruk av KS SvarUt

## 2.8.2

01.07.2022

**Funksjonalitet**

- Lagt til indeks i databasetabell (conv_id indeks i message_status). Reduserer behovet for iterasjon igjennom tabeller og aukar fart på oppslag i database.

**Feilrettinger**

- Rettet feil ved duplikate innslag i databasetabell. (next_move_message_entry)

---

## 2.8.1

30.05.2022

**Feilrettinger**

- Manglande transaksjon på status-grensesnittet.

---

## 2.8.0

24.05.2022

**Funksjonalitet**

- Lagt til støtte for DPI-kvitteringer på gammelt format for å støtte proxy klient funksjonalitet.

**Feilrettinger**

- Lagt til manglande felt i arkivmelding etter mapping frå SvarInn.
- Manglande transaksjon ved håndtering av kvitteringer for DPI.

---

## 2.7.0

10.05.2022

**Funksjonalitet**

- Utvida kapabilitietsoppslaget til å også innholde informasjon om innbyggers postkasseleverandør.
- Støtte for eDialog via svarInn med fallback avsender ved manglende organisasjonsnummer på avsender.

**Feilrettinger**

- Rettet feil i conversations-APIet som kunne oppstå ved bruk av PostgreSQL.

---

## 2.6.2

11.04.2022

**Feilrettinger**

- Fjernet bug der Arkivmelding_kvittering blir generert for DPF og DPV selv om BestEdu er i bruk.

---

## 2.6.0

07.04.2022

**Funksjonalitet**

- Side for meldingsoversikt viser nå kolonner for "MessageId" og "ConversationId", istedenfor berre "ID".

**Feilrettinger**

- Feilretting for manglende statuser i status kø-API.
- Retting av feil relatert til DPI for conversations-API

---

## 2.5.1

05.04.2022

**Feilrettinger**

- Fjerna validering på senderRef som UUID for å støtte bakoverkompatibilitet med BEST/EDU (eFormidling 1)

---

## 2.5.0

04.04.2022

**Funksjonalitet**

- Generert arkivmeldingkvittering legges på kø for forsendelser som går mot DPV og DPF.
- Fjerna bruk av Optionals på påkrevde felt i SBD.
- Arkivmeldingkvittering handtering for andre kanalar enn DPO

**Feilrettinger**

- Lagt inn manglande felt `messageId, system og tidspunkt` i arkivmelding.xml ved forsendelse frå best/edu (eFormidling 1).

---

## 2.4.1

01.04.2022

**Feilrettinger**

- Retta feil der rekkefølge på innholdet i StandardBusinessDocument hadde ei påkrevd rekkefølge, dette var eit brudd med API-et og påverka nokre implementasjonar av REST-APIet ved sending.

---

## 2.4.0

25.03.2022

**Funksjonalitet**

- Støtte for På-vegne-av funksjonalitet for DPO
- Støtte for DPI på ny infrastruktur. Her kan en velge gammal eller ny infrastruktur vha properties. Gammal infrastruktur er aktivert som standard. Den nye infrastrukturen ikkje er klar per 25.03.22.
- Støtte for å lese kvitteringer frå gammal og ny DPI-infrastruktur i parallell.
- Støtte for å konfigurere kønamn i activemq for å ha 2 integrasjonspunkt som brukar samme activemq.
- Standardisert/Forenklet avsenderadresse for meldinger sendt på-vegne-av
- Støtte for å sende post til personer utan å oppgi fødselsnummer
- Flyttet BusinessCertificateValidator ut i efm-commons biblioteket for å tilrettelegge for gjenbruk.
- Støtte for å ekskludere hvilke filer som skal ekskluderes fra print ved bruk av KS SvarUt.

**Feilrettinger**

- fiksa feil ved oppretting av manifest for DPI

---

## 2.3.2

27.01.2022

**Funksjonalitet/feilretting**

- Bugfix 2.3.1

---

## 2.3.1

26.01.2022

**Funksjonalitet/feilretting**

- støtte for å spesifisere forsendelsestype for KS SvarUt på meldingsnivå

---

## 2.3.0

17.01.2022

**Funksjonalitet/feilretting**

- støtte for å legge fagsystem og versjon som er i bruk i eFormidling i user-agent header
- Retta feil der Statuser for Avtalt-meldinger blir ikke sendt
- Retta feil der Hikari konsumerte alle tilgjengelige connections til database
- Missing default value for property difi.ssl.key-store-type
- Logge utvalgte properties under oppstart i IP
- Støtte for å sende meldinger over DPO for samme organisasjon fra fleire integrasjonspunkt
- Justere sending av taushetsbelagt/sensistiv post til Altinn
- Ryddet i xml/ws-biblioteker
- Legg inn document_identifier i status logginga
- Hindre integrasjonspunktet i å starte opp dersom kontakt med Eureka ikkje oppnås
- Flyttet konfigurasjon fra Eureka til integrasjonspunktet
- Oppgradert integrasjonspunktet til Spring boot 2.6.2
- Håndtering av meldinger uten vedlegg eller asic ved at /api/messages/in/pop/<id> returnerer 204.

### 2.2.6

08.10.2021

**Feilrettinger**

- Håndtere nytt kommende felt "ekstraMetadata" i SvarInn responsen (DPF) for å unngå JSON unmarshalling error.

---

### 2.2.5

01.10.21

**Features**

- Støtte for difi.\* prefix for ofte benytta spring/javax/server-properties. Desse [finn du her](../installasjon/installasjon#konfigurer-integrasjonspunktet)

**Feilrettinger**

- Visning av kvittering LEVERT dukker nå opp i statusnettsiden på /conversations.
- rettet optistimistisk låsefeil ved handtering av flere forespørsler mot tom database.
- Fikset trådsikkerhet i RestTemplate benyttet til uthenting av token frå Maskinporten.
- PostgreSQL - rettet transaksjonsfeil som førte til problem med uthenting av store objekter.
- Tilkoblinger til DPV har nå begrenset levetid.

---

### 2.2.4

20.08.21

### Hva er endret/nytt?

- Fikset: Peek i eFormidling 2 tar ikke hensyn til mer enn en query parameter"

---

### 2.2.3

28.06.21

### Hva er endret/nytt?

**Features**

- Rettet utilsiktet endring som førte til krav om gyldig UUID for senderRef for best/edu grensesnittet.
- Utvidet forretningsmelding med støtte for eInnsyn-kvittering.
- Rettet en feil ved låsing mot database ved bruk av flere einnsyn-klient konsumenter mot integrasjonspunktet.
- Lagt til mulighet for å konfigurere om en vil sette frist ved sending av post til Altinn postboks.
- Added curl to Docker image.

---

## 2.2.2

14.06.2021

### Hva er endret/nytt?

**Features**

I denne versjonen er det gjort flere endringer for å bedre paralellitet ved sending og lesing fra kø vha konfigurerbare verdier for antall tråder og kanaler. Det er også innført en ytelsestest-profil og målinger for svartider på forespørsler.

- Innført valgfri prosess-parameter for capabilities oppslag.
- Måling av svartider for utgående forespørsler.
- Innført ytelsestest-profil(YT)
- Støtte for å deaktivere cache i YT-profil
- Forbedret throughput på uthenting av kvitteringer for DPI.
- Mulighet for å konfigurere hvor mange tråder som skal brukes til sending. Standard er 10.
- Konfigurerbar property for å ikke slå opp i DSF ved sending til DPI.
- Konfigurerbar tråd pool for Sikker Digital Post klient i integrasjonspunktet.
- Konfigurerbart hvor regelmessig meldingsstatuser skal hentes i DPV og DPF.
- Innført paging for å redusere minnebruke ved oppslag av meldingsstatuser i DPV og DPF.

_Alle nye properties finner du [her](../installasjon/forberede_installasjon#brannmuråpninger)_

---

## 2.2.1

05.05.2021

### Hva er endret/nytt?

**Features**

Denne versjonen markerer overgangen fra OIDC-provider til Maskinporten, da det er en forutsetning for bl.a. bruk av på-vegne-av funksjonalitet (delegering) for DPO. I tillegg inneholder den flere mindre feilrettinger og endringer:

- Ved bruk av DPF, kan SvarInn nå skrus av separat via property “difi.move.fiks.inn.enable”. Denne har standardverdi tilsvarende “difi.move.feature.enableDPF“.
- På-vegne-av DPV hadde feil avsender i varseltekst. Denne settes nå til organisasjonen som blir sendt på vegne av.
- Egendefinert DPV varslingstekst støtter nå substitusjonsvariabelen “$reporterName$“ (i tillegg til allerede eksisterende “$reporteeName$“) .
- Ifm. overgangen til Maskinporten, benyttes nå en nyere versjon av DSF som støtter flere adresselinjer. Integrasjonspunktet vil automatisk tilordne adresselinjene til feltene i forretningsmeldingen “urn:no:difi:digitalpost:xsd:fysisk::print“, men det er ikke gjort endringer i grensesnittet til kapabilitetsoppslag. Her vil adresselinjene ligge separert med semikolon (;) i “street”-feltet.
- For å støtte en enklere overgangsfase for sakarkiv-leverandører ved implementasjon av eFormidling 2.0-grensesnittet, har vi fjernet kravet om UUID i ReceiverRef i SBDH. Denne valideringen vil bli gjeninnført ved et senere tidspunkt.
- [OBS. For å ta i bruk versjonen må en ha ny brannmuråpning](../installasjon/forberede_installasjon#brannmuråpninger-i-produksjon) 146.192.252.50:443 - maskinporten.no (TCP)

---

## 2.2.0

09.02.2021

### Hva er endret/nytt?

**Features**

- Tilrettelegging for at integrasjonspunktet skal kunne brukes i fire-hjørners modell, ved å introdusere støtte for plugins. Eksempelprosjekt: https://github.com/felleslosninger/efm-ip-plugin-example - Connect to preview

- Støtte for FIKS IO

- Validering av eget sertifikat, samt. sertifikat registrert i Virksert, både ved oppstart og sending av melding

- Ny raskere pollingoperasjon mot Altinn

- Asynkron sletteoperasjon i API for innkommende meldinger - mindre sårbar for nettverksfeil

- Innført støtte for JSON appender til stdout. Settes via property app.logger.stdoutAppender=JSON (default CONSOLE)

- Støtte for RFC5987 i name-attributt for filopplasting til utgående meldinger

- Nytt endepunkt for sletting av meldinger i status-API

- Introdusert logging av correlationId for meldingsflyt (og feil-logging)

**Feilrettinger:**

- Oppslag mot KRR hvor mottakere mangler enten mobil eller epost vil ikke føre til feil under forsendelse, så lenge én av verdiene er satt (kun ett av mottakene for varsling er påkrevd)

- Rettet prefetching-feil i forsendelseskø (ActiveMQ), som kunne føre til at feilende forsendelser blokkerte køen

- Filtrering av innkommende meldinger fungerte ikke som forventet (API)

- Error-respons uten melding fra noark-klient førte til feilsituasjon

- Manglende timeout-config for serviceregistry-klient

Fjernet logging-spam fra servicebus AMQP-klient under shutdown

Full endringslogg: [Release notes for 2.2.0](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10196)

---

## 2.1.3

18.08.2020

### Hva er endret/nytt?

- Validering av felt ved sending av DPF-forsendelser\*\*

**Mindre feilrettinger:**

- Content-Disposition name-field does not support RFC5987

Full endringslogg: [Release notes for 2.1.3](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10191)

---

## 2.1.2

01.07.2020

### Hva er endret/nytt?

- Basic auth for alle endepunkter integrasjonspunktet tilbyre (bortsett fra "manage/health"\*\*

- Går over til bruk av JWK(JSON Web Key) for signering i integrasjonspunkt - hentes fra et nytt endepunkt i SR.\*\*

**Mindre feilrettinger:**

- Content-disposition name-felt støtter ikkje support RFC5987

- "0MB" vises som feilmelding når size limit er mindre enn ein megabyte.

Full endringslogg: [Release notes for 2.1.2](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10187)

---

## 2.1.0

05.03.2020

### Hva er endret/nytt?

**Ny meldingstype - Avtalt:**

**Batchoppdatering av DPV/DPF statuser:**  
Istedenfor å sjekke status for en og en melding blir dette gjort som en batchjobb. Øker ytelsen.

**Grafisk statusgrensesnitt:**  
Etter ønske er det nå lagt til avsender orgnr, samt søkbar messageReference. Forenkler oversikten i status GUI.

**Mindre bugfixes:**

- Spamvarsling av DPV meldinger er fikset
- KS avviser duplikate forsendelser med en gang.

Full endringslogg: [Release notes for 2.1.0](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10174)

---

## 2.0.10

16.12.19

[Release notes for 2.0.10](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10173)

---

## 2.0.9

12.12.19

[Release notes for 2.0.9](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10172)

---

## 2.0.8

09.12.19

[Release notes for 2.0.8](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10170)

---

## 2.0.7

18.11.19

[Release notes for 2.0.7](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10169)

---

## 2.0.6

01.11.19

[Release notes for 2.0.6](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10168)

---

## 2.0.5

16.10.19

[Release notes for 2.0.5](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10166)

---

## 2.0.4

07.10.19

[Release notes for 2.0.4](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10165)

---

## 2.0.3

01.10.19

[Release notes for 2.0.3](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10163)

---

## 2.0.2

25.09.19

[Release notes for 2.0.2](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10161)

---

## 2.0.1

[Release notes for 2.0.1](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10162)

---

## 2.0.0

20.09.19

- eFormidling 2.0 API
- mm.

---

### 1.7.94

25.01.19

```
MOVE-1125 - Dersom en DPO-melding havner i dlq'en til mottaker, sender mottaker en appreceipt tilbake (dette for å si i fra hvis meldingen stopper opp på vei til sakark f.eks)
MOVE-1246 - Endring av IP-adresser iDigitaliseringsdirektoratets  driftmiljø. Opdaterte logstash URL for staging og produksjon profilene (miljøene)

Det vil si:
- Dersom en DPO-melding havner i dlq'en til mottaker, sender mottaker en appreceipt tilbake (dette for å si i fra hvis meldingen stopper opp på vei til sakark f.eks)
- dersom avsender ikke får leveringskvittering/kvittering som avslutter "polling" innen den tid timeout er satt (24t), får meldingen feilstatus i statusgrensesnittet.
```

---

## 1.7.93

12.10.2018

```
MOVE-956 setter connect- og sockettimeout i restklienten mot servicebus. For å unngå kø på servicebus.
```

---

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

---

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

---

## Sentrale komponenter

## ServiceRegistry 2.15.0

31.08.2023

**Feilrettingar**

- Ustabilitet i sending av digital post til innbyggar fom. 30.08.2023 grunna endra respons frå andre interne tenester

## ServiceRegistry 2.12.0

09.05.2023

**Endringar**

- Innføring av utskriftsteneste frå Skatteetaten som standard-val i eFormidling

## ServiceRegistry 2.10.0

27.03.2023

**Endringar**

- MOVE-2851 Ny implementasjon mot moderne folkeregister

## ServiceRegistry 2.9.0

**Endringar**

- MOVE-3059 La tausheitsbelagte meldingar verta sende til FIKS

## ServiceRegistry 2.8.0

**Endringar**

- MOVE-3067 Oppgradering av efm-common (delt bibliotek i portefølja)

## ServiceRegistry 2.7.0

22.11.2022

**Endringer**

- MOVE-2946 Retting av av service registry tolker TCP timeout mot ELMA som "participant not found"
- MOVE-3003 Oppgradere peppol-biblioteker i SR

## ServiceRegistry 2.6.1

03.11.2022

**Endringer**

- MOVE-2993 Integrasjonspunkt startar ikkje opp med Seid 2.0-sertifikat

## ServiceRegistry 2.6.0

12.10.2022

**Endringer**

- MOVE-2916 Taushetsbelagte meldinger må ikkje sendes til FIKS
- MOVE-2914 Legge inn retry mot KRR/MF

## ServiceRegistry 2.5.0

22.03.2022

**Endringer**

- MOVE-2783 Bruk av OSIV kan potensielt gi ytelesproblem. Skrudde av OSIV og fikset lasting av documenttype fra process.

## ServiceRegistry 2.4.0

28.02.2022

**Endringer**

- MOVE-2728 Utvide mock for virksomheter med statisk returadresse
- MOVE-2742 Feilretting logging

## ServiceRegistry 2.3.0

17.02.2022

**Endringer**

- MOVE-1992 Støtte for på-vegne-av DPO

## ServiceRegistry 2.2.0

11.01.2022

**Endringer**

- MOVE-2192 Meir spesifikk feilmelding ved utgått sertifikat

## ServiceRegistry 2.1.5

10.11.2021

**Endringer**

- støtte for ny utgave av virksomhetssertifikatstandard (SEID v2) for Buypass-sertifikat.

### ServiceRegistry 2.1.4

14.06.2021

**Endringer**

- Utvidet oppslag til å kunne signalisere at DSF-oppslag ikke er nødvendig.
- Lagt til ytelsestest profil
- Støtte for å deaktivere cache ved ytelsetesting
- Måling av svartider for utgåande forespørsler.

### ServiceRegistry 2.1.3

29.04.2021

**Endringer**

- Versjonen legger til støtte for bruk av maskinporten-autentisering (i tillegg til OIDC-provider), da det er Maskinporten som vil benyttes fra integrasjonspunktet fom. versjon 2.2.1. Som en konsekvens av dette, måtte det også gjøres en endring i bruk av KRR og DSF, da endepunktene brukt frem til nå (oppslagstjenesten-rest) kun støttet OIDC provider. SR vil nå rute forespørsler med OIDC-provider- og maskinporten-tokens til henholdsvis oppslagstjenesten-rest og oppslagstjenesten-maskinporten, basert på hvilken issuer tokenet har.

---

### ServiceRegistry 2.1.1

20.01.2021

**Endringer**

- Tilrettelegging for at integrasjonspunktet skal kunne brukes i fire-hjørners modell, ved å introdusere støtte for plugins. Eksempelprosjekt: https://github.com/felleslosninger/efm-ip-plugin-example - Connect to preview
- Støtte for FIKS IO
- Validering av eget sertifikat, samt. sertifikat registrert i Virksert, både ved oppstart og sending av melding
- Ny raskere pollingoperasjon mot Altinn
- Asynkron sletteoperasjon i API for innkommende meldinger - mindre sårbar for nettverksfeil
- Innført støtte for JSON appender til stdout. Settes via property app.logger.stdoutAppender=JSON (default CONSOLE)
- Støtte for RFC5987 i name-attributt for filopplasting til utgående meldinger
- Nytt endepunkt for sletting av meldinger i status-API
- Introdusert logging av correlationId for meldingsflyt (og feil-logging)

**Feilrettinger**

- Oppslag mot KRR hvor mottakere mangler enten mobil eller epost vil ikke føre til feil under forsendelse, så lenge én av verdiene er satt (kun ett av mottakene for varsling er påkrevd)
- Rettet prefetching-feil i forsendelseskø (ActiveMQ), som kunne føre til at feilende forsendelser blokkerte køen
- Filtrering av innkommende meldinger fungerte ikke som forventet (API)
- Error-respons uten melding fra noark-klient førte til feilsituasjon
- Manglende timeout-config for serviceregistry-klient
- Fjernet logging-spam fra servicebus AMQP-klient under shutdown

[Detaljer](https://)

---

### ServiceRegistry 2.1.0

25.11.2020

**Endringer**:
Versjonen inneholder to primærendringer:

- Ny versjon av virksert klient som kun gjør CRL-validering (og ikke OCSP)
- FIKS IO-integrasjon

FIKS IO-integrasjonen vil ligge latent til den faktisk skal taes i bruk. Denne har et eget administrasjonsAPI for å håndtere mapping mellom eFormidlingsprosesser og FIKS-protokoller.

[Detaljer](https://)

---

### ServiceRegistry 2.0.8

01.07.2020

**Sertifikat**:
Legge til rette for nytt sertifikat i Serviceregistry fra 1. september 2020. Sertifikatendringa krever også minimum Integrasjonspunktet 2.1.2 for å unngå å måtte restarte integrasjonspunktet etter endring til det nye sertifikatet i Serviceregistry.

**Diverse**: Mindre endringer.

[Detaljer](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10178)

---

### ServiceRegistry 2.0.6

05.03.2020

**Bugfix DPI**: Oppslag av personnummer for DPI via eFormidling feilet i 2.0.5. Feilretting.

[Detaljer](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10175)

---

### ServiceRegistry 2.0.5

04.03.2020

**Avtalt-melding**:
Støtte for avtalt-melding i eFormidling. Krever også minimum Integrasjonspunktet 2.1.0

**Diverse**: Mindre endringer.

[Detaljer](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10175)

---

### ServiceRegistry 2.0.4

28.01.2020

[Detaljer](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10175)

---

## Virksert

### Virksert 1.8.0

22.11.2022

**Endringer**

- MOVE-2991 Commfides-test-sertifikat (Seid 2.0) vert ikkje aksepterte i test-profilen til VirkSert
- MOVE-3002 Oppgradere peppol-biblioteker i virksert

### Virksert 1.7.1

01.11.2022

**Endringer**

- MOVE-2987 Seid 2.0-sertifikat vert ikkje godteke av VirkSert

### Virksert 1.7.0

20.10.2022

**Endringer**

- MOVE-2967 Opplasting av verksemdssertifikat feilar

### Virksert 1.6.0

17.02.2022

**Endringer**

- MOVE-1992 Støtte for på-vegne-av DPO
- Diverse tekniske oppgaver

## Valgfrie komponenter

## KOSMOS

### KOSMOS 1.2.0

07.11.2022

- Add option to append text to email subject

### KOSMOS 1.1.0

29.06.2021

KOSMOS lansert. "Kontinuerlige oppdateringar for sikker meldingsutveksling i offentleg sektor". Denne applikasjonen kan brukes i tradisjonelle servermiljø for å holde integrasjonspunktet oppdatert automatisk.

---
