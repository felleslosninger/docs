---
title: Automatisk oppgradering
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from:
- /eformidling_auto_update
- /eformidling_kosmos_user_guide
---

Føremålet med denne sida er å gjera det enklast mogleg å installera og konfigurera automatisk
oppgradering av integrasjonspunktet til eFormidling.

> Det er ikkje mogleg å oppgradera automatisk frå versjon 2 til v3 eller v4 av Integrasjonspunktet.
> Du må oppgradera til versjon 4 manuelt, då dette inneber installasjon av nyare Java-versjon
> og endringar i lokal konfigurasjon.  Når du har eit fungerande Integrasjonspunkt v4, kan du velja å installera
> Kosmos, som automatisk lastar ned og oppgraderer til nye versjonar.

1. TOC
{:toc}

## Introduksjon

Automatisk oppgradering av integrasjonspunktet skjer ved hjelp av støtteapplikasjonen Kosmos. Kosmos er ein
Java-applikasjon som kan køyra side om side med integrasjonspunktet.

- [Demo av automatisk oppgradering](../Introduksjon/Demo/automatisk_oppgradering)

Automatisk oppgradering er i grove trekk slik:

1. Samanliknar gjeldande integrasjonspunkt-versjon mot siste tilgjengelege frå Digdir
2. Dersom det er ein nyare versjon tilgjengeleg, vert denne lasta ned til klienten
3. Gjeldande integrasjonspunkt vert forsøkt oppdatert til den nedlasta versjonen (dersom den nye versjonen ikkje startar, rullar KOSMOS attende)

## Føresetnader
{: #forutsetninger}

Konfigurasjon av automatisk oppgradering føreset:

- [Installasjon av integrasjonspunktet](installasjon) og bruk av Java (vil ikkje fungera med Docker/Container)
- Støttetenestene `info`, `health` og `shutdown` er tilgjengelege i integrasjonspunktet. Frå integrasjonspunkt v4.2.2
  er ikkje `shutdown` open som standard, og **må opnast i `integrasjonspunkt-local.properties`**. Sjå
  [Opna shutdown-endepunktet i integrasjonspunktet](#shutdown-endepunkt)
- Java 21 for Kosmos v4. Kommandoen `java` må vera tilgjengeleg på PATH for brukaren som køyrer Kosmos, sidan Kosmos
  startar integrasjonspunktet med `java -jar`
- Utgåande HTTPS (port 443) frå serveren til `github.com` og `raw.githubusercontent.com`. Kosmos hentar versjonsliste,
  JAR-fil, sjekksum og signatur derfrå. GitHub vidaresender nedlasting av release-filer til eit eige domene
  (`release-assets.githubusercontent.com`), som også må vera ope. Kosmos må nå GitHub kvar gong integrasjonspunktet
  skal startast, ikkje berre ved oppgradering

## Opna shutdown-endepunktet i integrasjonspunktet
{: #shutdown-endepunkt}

Kosmos stoppar integrasjonspunktet via støttetenesta `/manage/shutdown` når det skal oppgraderast. Frå
integrasjonspunkt v4.2.2 er berre `health`, `info`, `metrics`, `prometheus`, `caches`, `logfile` og `loggers` opne
som standard. `shutdown` er ikkje med, og må opnast av deg.

Denne innstillinga skal stå i **`integrasjonspunkt-local.properties`**, ikkje i `kosmos-local.properties`:

```
management.endpoints.web.exposure.include=health,info,metrics,prometheus,caches,logfile,loggers,shutdown
```

- Verdien erstattar standardverdien. Støttetenester du ikkje tek med i lista, vert utilgjengelege. Kosmos treng
  `info`, `health` og `shutdown`.
- Har du alt sett `management.endpoints.web.exposure.include` til ei eiga liste, legg til `shutdown` i den.
- Start integrasjonspunktet på nytt etter endringa.

Utan `shutdown` klarer ikkje Kosmos å stoppa integrasjonspunktet som køyrer. Den nye versjonen kan då ikkje starta,
t.d. fordi porten eller databasen framleis er i bruk, og oppgraderinga feilar.

Sjå også [Støttetenester](installasjon#støttetjenester) i installasjonsrettleiinga.

## Konfigurasjon

Automatisk oppgradering av integrasjonspunktet vert konfigurert ved hjelp av to konfigurasjonsfiler:
`kosmos-local.properties` for Kosmos, og `integrasjonspunkt-local.properties` for
[shutdown-endepunktet](#shutdown-endepunkt) i integrasjonspunktet.

1. Start med å finna mappa integrasjonspunktet er installert i, til dømes `c:\integrasjonspunkt`
2. Last så ned [kosmos-local.properties]({{site.baseurl}}/resources/eformidling/kosmos-local.txt) og lagra ho i mappa nemnd ovanfor
3. Last ned [kosmos-[versjon].jar](../Introduksjon/last_ned#kosmos)
4. Last ned [den offentlege nøkkelen til eFormidling](../Introduksjon/last_ned#eformidlings-offentlige-kodesigneringsnøkkel)

eFormidling tilrår å verifisera at `kosmos-[versjon].jar` er frå Digitaliseringsdirektoratet.

- [Hvordan verifiserer jeg at jar-filen er fra Digitaliseringsdirektoratet?](../Selvhjelp/sporsmal_og_svar#hvordan-verifiserer-jeg-at-jar-filen-er-fra-digitaliseringsdirektoratet)

Når du er ferdig, skal strukturen på området sjå slik ut:

```
c:/
|-- integrasjonspunkt/
   |-- eformidling-key.asc
   |-- integrasjonspunkt-local.properties
   |-- integrasjonspunkt-[versjon].jar
   |-- kosmos-local.properties
   |-- kosmos-[versjon].jar
```

I tillegg må Kosmos køyrast med naudsynte tilgangar til å oppretta filer og mapper på dette filområdet.

Kode i denne mappa vert køyrd under tenestekontoen til Kosmos. Mappa, filene i ho og den offentlege nøkkelen skal
derfor **berre vera skrivbare for tenestekontoen** som køyrer Kosmos:

- Linux: til dømes `chown -R <tenestekonto> <mappe>` og `chmod -R go-w <mappe>`
- Windows: fjern skrivetilgang for andre enn tenestekontoen og administratorar

Ved bruk av Java direkte vert det tilrådd å konfigurera ei bakgrunnsteneste som startar og stoppar Kosmos når
operativsystemet startar og stoppar, og som ved behov kan startast og stoppast manuelt. Døme:

- [Køyra Kosmos som ei teneste (Windows)](Eksempel/start_og_stopp#starte-som-windows-teneste)
- `systemctl`, `upstart` eller liknande, avhengig av distribusjon (Linux)

Det er også mogleg å starta og stoppa integrasjonspunktet manuelt:

- [Køyra integrasjonspunktet frå kommandovindauge](Eksempel/start_og_stopp#starte-frå-kommandolinja)

## Minimumskonfigurasjon

| **Eigenskap**                         | **Beskriving**                                                                                    | **Standardverdi**        |
|---------------------------------------|---------------------------------------------------------------------------------------------------|--------------------------|
| kosmos.integrasjonspunkt.baseURL      | Vert og port til integrasjonspunktet ditt                                                         | http://localhost:9093    |
| difi.move.org.number                  | Påkravd. Same organisasjonsnummer som i integrasjonspunkt-local.properties                        | (ingen)                  |
| kosmos.mail.recipient                 | Valfri. Få varsel på e-post når Kosmos har forsøkt ei oppdatering                                 | (ingen)                  |
| kosmos.mail.from                      | Avsendar av varsel                                                                                | (ingen)                  |
| spring.mail.host                      | SMTP-serveren din for utsending av e-post                                                         | (ingen)                  |
| spring.mail.port                      | Port som SMTP-serveren din nyttar                                                                 | (ingen)                  |
| kosmos.verification.publicKeyPaths[0] | Den offentlege nøkkelen til Digitaliseringsdirektoratet, for å verifisera signaturen på .jar-fila | file:eformidling-key.asc |

Døme:

```
# Replace hosts and ports of URL with the location
# of your integrasjonspunkt.
kosmos.integrasjonspunkt.baseURL=http://localhost:9093

# Your organisationnumber. Should be the same as in integrasjonspunkt-local.properties
difi.move.org.number=991825827

# E-mail is optional. Please specify these properties 
# to receive e-mails when KOSMOS updates the integrasjonspunkt-application.
kosmos.mail.recipient=someone@yourdomain.no
kosmos.mail.from=noreply@yourdomain.no

spring.mail.host=smtp.yourdomain.no
spring.mail.port=25

# Digitaliseringsdirektoratet public key paths. i.e: file:keyname.asc
kosmos.verification.publicKeyPaths[0]=file:eformidling-key.asc
```

**NB!**
Dersom ein ønskjer å bruka integrasjonspunktet med transportsikring, må ein endra til
*kosmos.integrasjonspunkt.baseURL=https://servernavn.no:portnummer*.
Sjå meir her: [Transportsikring](installasjon#transportsikring)

## Valfri konfigurasjon
{: #valgfri-konfigurasjon}

### Setje tidspunkt for oppdatering
*Valfritt*

Ein kan setje tidspunkt for kor tid applikasjonen vil forsøke å oppdatere integrasjonspunktet om ein ikkje ynskjer å
bruke standard-verdiane. Standard verdiane er kl. 05:30, 19:30 og 21:30 måndag til fredag. Tidspunkta gjeld norsk tid
(Europe/Oslo). I tillegg køyrer KOSMOS alltid ein sjekk når applikasjonen startar.

Namnet på innstillinga må skrivast nøyaktig slik: `kosmos.schedulerCronExpression`.

Her er nokre døme som viser korleis ein kan styre tidspunkt for oppdatering.

```
#Standard verdi: Sjekkar etter oppdatering måndag-fredag kl. 05:30, 19:30 og 21:30.
kosmos.schedulerCronExpression=0 30 5,19,21 * * MON-FRI

#Sjekkar etter oppdatering kvar dag kl. 06:00.
kosmos.schedulerCronExpression=0 0 6 * * ?

#Sjekkar etter oppdatering kvar dag kl. 23:15.
kosmos.schedulerCronExpression=0 15 23 ? * *

#Sjekkar etter oppdatering kvar laurdag og søndag kl. 12:00.
kosmos.schedulerCronExpression=0 0 12 ? * SAT,SUN

#Sjekkar etter oppdatering kvart tredje minutt kvar time.
kosmos.schedulerCronExpression=0 0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57 * ? * *
```

### Blokkere versjonar
*Valfritt*
Det finst funksjonalitet for å la applikasjonen blokklista versjonar om dei ikkje er godkjende eller ikkje klarer å starta. Standard-verdien til denne er false, men han kan aktiverast ved å endra properties. Det kan vera fornuftig å bruka om ein ynskjer hyppig polling på kor ofte applikasjonen skal sjekka etter ny versjon.

```
kosmos.blocklist.enabled=true
```

Ein kan fjerne ein blokklista versjon ved å slette den frå katalogen. Filnamn er til dømes ```integrasjonspunkt-versjonsnr.blocklisted```. Denne har standard levetid på 2 timar om aktivert, så etter levetid er utløpt vil applikasjonen fjerne den og forsøke å oppdatere igjen ved neste schedulerte tidspunkt.

### Konfigurasjon for logging
*Valfritt*

Denne er ikkje sett som standard og må leggast inn manuelt

| Namn                               | Tilrådd verdi  | Beskriving                                                                            |
|------------------------------------|----------------|---------------------------------------------------------------------------------------|
| logging.level.no.difi.move.kosmos  | TRACE          | Auke loggnivået på KOSMOS for å få ekstra informasjon ved oppstart eller feilsøking.  |

### Diverse konfigurasjon
*Valfritt*

| **Namn**                                               | **Standard-verdi**                                                                                          | **Beskriving**                                                                                                                                                                                                                                                                                                                                                                                         |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| kosmos.actuator-connect-timeout-in-ms                  | 5000                                                                                                        | Kor lenge KOSMOS ventar på å få kontakt med info-, helse- og shutdown-endepunkt på integrasjonspunkt.                                                                                                                                                                                                                                                                                                  |
| kosmos.actuator-read-timeout-in-ms                     | 5000                                                                                                        | Kor lenge KOSMOS ventar på svar frå info-, helse- og shutdown-endepunkt på integrasjonspunkt.                                                                                                                                                                                                                                                                                                          |
| kosmos.artifact-id                                     | efm-integrasjonspunkt/                                                                                      | Namnet på GitHub-repositoriet som integrasjonspunktet vert lasta ned frå.                                                                                                                                                                                                                                                                                                                              |
| kosmos.blocklist.duration-in-hours                     | 2                                                                                                           | Levetid på blockliste over feilande versjonar.                                                                                                                                                                                                                                                                                                                                                         |
| kosmos.blocklist.enabled                               | false                                                                                                       | Flagg som styrer aktivering av blockliste.                                                                                                                                                                                                                                                                                                                                                             |
| kosmos.environment.prefixes-removed-from-child-process | [spring, kosmos]                                                                                            | Prefiks for miljøvariablar som ikkje skal vidareførast til oppdaterte integrasjonspunkt. Hindrar at KOSMOS sine eigne innstillingar forårsakar aktivering av uønska bean-ar i integrasjonspunktet.                                                                                                                                                                                                     |
| kosmos.group-id                                        | felleslosninger/                                                                                            | GitHub-organisasjonen som eig repositoriet integrasjonspunktet vert lasta ned frå.                                                                                                                                                                                                                                                                                                                     |
| kosmos.integrasjonspunkt.autoRefresh                   | true                                                                                                        | Hentar versjonslista frå `versionsURL` ved kvar synkronisering. Kan lista ikkje hentast, vert den sist gyldige lista brukt. Med false oppgraderer ikkje KOSMOS: den held fram med versjonen som køyrer, eller startar den sist brukte versjonen (.allowlisted) dersom JAR-fila for han kan verifiserast.                                                                                               |
| kosmos.integrasjonspunkt.baseURL                       | http://localhost:9093                                                                                       | URL-en integrasjonspunktet køyrer på hjå klienten. Fungerar som snarveg for å setja info-, helse- og shutdownURL-innstillingane. Ikkje påkravd i seg sjølv, aktuator-endepunkta kan konfigurerast individuelt.                                                                                                                                                                                         |
| kosmos.integrasjonspunkt.earlybird                     | false                                                                                                       | Flagg som styrer aktivering av early-bird-funksjonalitet.                                                                                                                                                                                                                                                                                                                                              |
| kosmos.integrasjonspunkt.healthURL                     | ${kosmos.integrasjonspunkt.baseURL}/manage/health                                                           | Helse-endepunktet til integrasjonspunktet hjå klienten. Fortel om programmet fungerar.                                                                                                                                                                                                                                                                                                                 |
| kosmos.integrasjonspunkt.home                          | ${user.dir}                                                                                                 | Mappa integrasjonspunktet vert lasta ned til og køyrer frå. Standard-verdien er mappa KOSMOS vert starta frå. Manglar mappa, lagar KOSMOS ho. Sjå [Køyra KOSMOS og Integrasjonspunktet frå forskjellige mapper](#køyra-kosmos-og-integrasjonspunktet-frå-forskjellige-mapper) for konfigurasjon som trengst dersom dei skal vera i forskjellige mapper, og kva som hender når stien ikkje kan brukast. |
| kosmos.integrasjonspunkt.include-log                   | false                                                                                                       | Styrer importering av logg frå oppdaterte integrasjonspunkt.                                                                                                                                                                                                                                                                                                                                           |
| kosmos.integrasjonspunkt.infoURL                       | ${kosmos.integrasjonspunkt.baseURL}/manage/info                                                             | Info-endepunktet til integrasjonspunktet hjå klienten. Gir informasjon om bla. køyrande versjon av programmet.                                                                                                                                                                                                                                                                                         |
| kosmos.integrasjonspunkt.profile                       | staging                                                                                                     | Profil som det oppdaterte integrasjonspunktet vert starta opp med, og som avgjer kva versjon som vert henta frå versjonslista. Gyldige verdiar: dev, itest, staging og production. Vert sett til same verdi som KOSMOS-profilen når KOSMOS vert starta med t.d. `--spring.profiles.active=production`.                                                                                                 |
| kosmos.integrasjonspunkt.shutdownURL                   | ${kosmos.integrasjonspunkt.baseURL}/manage/shutdown                                                         | Shutdown-endepunktet til integrasjonspunktet hjå klienten. Nytta for å stoppa utdaterte versjonar.                                                                                                                                                                                                                                                                                                     |
| kosmos.integrasjonspunkt.supported-major-version       | (ingen)                                                                                                     | Høgaste major-versjon KOSMOS får oppgradera til. Sjå [Sjekk av versjon-kompatibilitet](#sjekk-av-versjon-kompatibilitet).                                                                                                                                                                                                                                                                              |
| kosmos.integrasjonspunkt.versionsURL                   | https://raw.githubusercontent.com/felleslosninger/efm-integrasjonspunkt/refs/heads/main/latest-versions.yml | Fila KOSMOS hentar siste versjon av integrasjonspunktet frå.                                                                                                                                                                                                                                                                                                                                           |
| kosmos.java-archive-repository-url                     | https://github.com                                                                                          | Adressa integrasjonspunktet vert lasta ned frå.                                                                                                                                                                                                                                                                                                                                                        |
| kosmos.java-archive-repository-connect-timeout-in-ms   | 5000                                                                                                        | Kor lenge KOSMOS ventar på å få kontakt ved nedlasting av JAR-fil, sjekksum og signatur.                                                                                                                                                                                                                                                                                                               |
| kosmos.java-archive-repository-read-timeout-in-ms      | 60000                                                                                                       | Kor lenge KOSMOS ventar på data ved nedlasting av JAR-fil, sjekksum og signatur.                                                                                                                                                                                                                                                                                                                       |
| kosmos.launch-poll-interval-in-ms                      | 1000                                                                                                        | Kor lenge KOSMOS ventar mellom kvar gong den spør helse-endepunktet om status.                                                                                                                                                                                                                                                                                                                         |
| kosmos.launch-timeout-in-ms                            | 150000                                                                                                      | Kor lenge KOSMOS ventar på informasjon om integrasjonspunktet køyrer eller ikkje.                                                                                                                                                                                                                                                                                                                      |
| kosmos.mail.append-subject                             | (ingen)                                                                                                     | Valfri tekst som vert lagt til i emnefeltet på e-postvarsla, t.d. namnet på serveren.                                                                                                                                                                                                                                                                                                                  |
| kosmos.orgnumber                                       | ${difi.move.org.number}                                                                                     | Påkravd. Organisasjonsnummeret, henta frå `difi.move.org.number`. KOSMOS startar ikkje utan eit gyldig organisasjonsnummer på ni siffer.                                                                                                                                                                                                                                                               |
| kosmos.schedulerCronExpression                         | 0 30 5,19,21 * * MON-FRI                                                                                    | Kor ofte KOSMOS køyrer synkronisering. Tidspunkta gjeld norsk tid (Europe/Oslo). Namnet må skrivast nøyaktig slik.                                                                                                                                                                                                                                                                                     |
| kosmos.shutdown-poll-interval-in-ms                    | 5000                                                                                                        | Kor lenge det går mellom kvar førespurnad mot helse-endepunktet etter at KOSMOS har bede integrasjonspunktet om å stoppa.                                                                                                                                                                                                                                                                              |
| kosmos.shutdown-retries                                | 3                                                                                                           | Kor mange gonger KOSMOS sjekkar om integrasjonspunktet har stoppa (i påvente av at helse-endepunktet ikkje svarar) før den gir opp.                                                                                                                                                                                                                                                                    |
| kosmos.verification.publicKeyPaths                     | [0]=file:${user.dir}/eformidling-key.asc                                                                    | Liste med stiar til offentlege nøklar for Digdir sitt GPG-signeringssertifikat. Brukarar lastar ned frå dokumentasjonen vår, og me tilrår dei å verifisera fingeravtrykk før dei set opp nøkkelen i KOSMOS. Standard-verdien peikar på mappa KOSMOS vert starta frå, også når `kosmos.integrasjonspunkt.home` er endra.                                                                                |
| app.scheduling.enable                                  | true                                                                                                        | Med false køyrer ikkje KOSMOS dei periodiske sjekkane, berre sjekken ved oppstart.                                                                                                                                                                                                                                                                                                                     |
| app.logger.enableLogstash                              | false                                                                                                       | Styrer om KOSMOS sender loggane sine til Digdir si loggløysing.                                                                                                                                                                                                                                                                                                                                        |
| app.logger.destination                                 | test-logs.eformidling.no:80 (logs.eformidling.no:80 med production-profil)                                  | Adressa loggane vert sende til når `app.logger.enableLogstash` er true.                                                                                                                                                                                                                                                                                                                                |
| spring.config.additional-location                      | -                                                                                                           | Mogleg å overstyra kor integrasjonspunkt-local.properties-fila skal liggja ved å setja denne verdien, t.d. file:%BASE%\integrasjonspunkt-local.properties på Windows eller file:./integrasjonspunkt-local.properties på Linux.                                                                                                                                                                         |

## Korleis fungerer automatisk oppgradering?
{: #hvordan-fungerer-automatisk-oppgradering}

KOSMOS køyrer periodiske sjekkar i rekkefølga beskriven her. Innstillinga ```kosmos.schedulerCronExpression``` avgjer kor ofte dette skjer. Ein sjekk vert i tillegg køyrt kvar gong KOSMOS startar.

### Finna noverande versjon av integrasjonspunktet

Den versjonen av integrasjonspunktet som ev. køyrer, vert henta frå info-endepunktet (Spring Boot Actuator) til det køyrande integrasjonspunktet. URL-en til info-endepunktet er avleia frå verdien på `kosmos.integrasjonspunkt.baseURL`. Dersom KOSMOS ikkje mottek informasjon frå info-endepunktet, eller det ikkje finst - noko som er godt mogleg - antek me at det ikkje køyrer noko integrasjonspunkt hjå klienten. Applikasjonen held då fram med neste steg.

### Finna siste versjon av integrasjonspunktet

Siste versjon av integrasjonspunktet vert publisert i [ei fil](https://github.com/felleslosninger/efm-integrasjonspunkt/blob/main/latest-versions.yml) som vert lasta ned frå repositoriet til Digdir. Det finst konfigurasjonar for dev-, itest- staging- og production-profilar, der sistnemnde er relevant i ein produksjons-omgjevnad.

#### Early-Bird-versjon

For interne test-miljø (som endå ikkje er på føtene) og klientar som ev. ønskjer å hjelpa oss med testing, kan siste lanserte versjon overstyrast til den såkalla “early-bird-versjonen”. Dette er versjonar som har vorte testa i mindre grad enn siste offisielle versjon ovanfor. Early-bird-versjon kan aktiverast mha. ```kosmos.integrasjonspunkt.earlybird``` (true/false).

### Sjekk av versjon-kompatibilitet

Semantisk versjonering er nytta i eFormidling. Applikasjonar som nyttar denne versjoneringa vert gjort tilgjengelege  i major-, minor- og patch-versjonar som er reflektert i namnet på distribusjonane i form av `<applikasjon>-v<major>.<minor>.<patch>`, t.d. `integrasjonspunkt-v4.2.3`. Oppgradering av ein større eller mindre versjon inneber alltid ein inkrement i namnet på distribusjonen. 

Ein oppgradert major-versjon (t.d. frå `integrasjonspunkt-v4.2.3` til `integrasjonspunkt-v5.0.0`) inneheld endringar som bryt med førre versjon. Oppgraderingar av major-versjonar kan føra med seg større eller mindre endringar hjå klientane. Eit døme på dette kan vera oppgradering av Java-versjonen som integrasjonspunktet køyrer på, som medfører at klienten må gjera oppgraderingar før det nye integrasjonspunktet kan takast i bruk. For å sikra at KOSMOS sin automatiske oppgradering ikkje lagar krøll for klientar som ikkje er klare for ein ny major-versjon endå, har me innført eit “setebelte” i form av ```kosmos.integrasjonspunkt.supported-major-version```. Denne verdien kan setjast lokalt hjå klientar, og sikrar at KOSMOS ikkje utfører oppgraderingar til ein nyare major-versjon enn den som er angjeven.

### Nedlasting av siste lanserte versjon

JAR-fila med siste integrasjonspunkt-versjon vert lasta ned til mappa angjeve i ```kosmos.integrasjonspunkt.home```, som har mappa KOSMOS køyrer frå som standard-verdi. Dersom eit tidlegare forsøk på å starta den siste versjonen har feila (dvs. versjonen er blocklista), vil KOSMOS avbryta nedlastinga og skriva ut ein beskjed om tilfellet. Sjå meir om block- og allow-listing av versjonar seinare.

Ligg det alt ei JAR-fil for siste versjon i mappa, vert ho berre brukt dersom ho kan verifiserast mot signaturen for versjonen. Elles vert versjonen lasta ned på nytt. Nedlastinga vert lagra som `integrasjonspunkt-<versjon>.jar.download`, og får namnet `integrasjonspunkt-<versjon>.jar` først når ho er validert.

Artefaktar vert lasta ned frå GitHub Releases. Adressa er sett saman av innstillingane ```kosmos.java-archive-repository-url```, ```kosmos.group-id``` og ```kosmos.artifact-id```, og vert med standard-verdiane:

```
https://github.com/felleslosninger/efm-integrasjonspunkt/releases/download/<versjon>/integrasjonspunkt-<versjon>.jar
```

Versjonen er lik release-taggen, t.d. `v4.2.3`. Alle versjonar kan [sjåast her](https://github.com/felleslosninger/efm-integrasjonspunkt/releases).

### Validering av nedlasta artefakt

Etter nedlasting vert SHA1-sjekksummen til JAR-fila samanlikna med sjekksummen som er publisert saman med releasen på GitHub (`integrasjonspunkt-<versjon>.jar.sha1`).

Deretter vert signaturen verifisert. Integrasjonspunkt-distribusjonane er signerte med eFormidling sin kodesigneringsnøkkel, og signaturen (`integrasjonspunkt-<versjon>.jar.asc`) vert lasta ned frå same release. Brukarar av KOSMOS må lasta ned den offentlege nøkkelen frå [dokumentasjonen vår](../Introduksjon/last_ned#eformidlings-offentlige-kodesigneringsnøkkel), der også fingeravtrykket til nøkkelen er publisert. Etter å ha lasta ned offentleg nøkkel, kan brukarar rekna ut fingeravtrykket frå den nedlasta fila og samanlikna med den publiserte verdien frå Digdir. Dersom verdiane er like, kan dei nytta nøkkelen til å verifisera integrasjonspunkt-distribusjonar. Verifiseringa vert gjort av KOSMOS, og det einaste brukarane treng å gjera er å legga nøkkelen i mappa KOSMOS vert starta frå.

Krav til signaturen og nøkkelen:

- Signaturen må vera ein frittståande (detached) GPG-signatur av typen binærdokument.
- Hash-algoritmen må vera SHA-256, SHA-384, SHA-512, SHA3-256 eller SHA3-512. SHA-1, MD5, RIPEMD-160 og SHA-224 vert avviste.
- Nøkkelen som har signert, må finnast i ei av nøkkelfilene i ```kosmos.verification.publicKeyPaths```.
- Nøkkelen kan ikkje vera utgått eller tilbakekalla. Er signaturen laga med ein undernøkkel, gjeld det same for undernøkkelen.
- Nøkkelen må ha lov til å signera data.

Ei JAR-fil som ikkje kan verifiserast vert aldri starta, og ei ny nedlasting som ikkje kan verifiserast vert sletta. Dersom signaturen ikkje stemmer og blocklist er aktivert, vert versjonen blocklista. Andre feil under valideringa, t.d. utgått nøkkel, avvist hash-algoritme eller feil sjekksum, fører ikkje til blocklisting.

Er den offentlege nøkkelen utgått eller tilbakekalla, kan ingen JAR-filer verifiserast. Integrasjonspunktet vert då ikkje starta, heller ikkje ved rollback. Last ned gjeldande nøkkel frå [dokumentasjonen vår](../Introduksjon/last_ned#eformidlings-offentlige-kodesigneringsnøkkel) og erstatt nøkkelfila.

JAR-fila vert i tillegg verifisert på nytt før kvar oppstart, også ved rollback og når ein tidlegare brukt versjon vert starta oppatt. Signaturen vert lasta ned frå GitHub kvar gong og vert ikkje lagra lokalt. Det betyr at KOSMOS må nå GitHub for å kunna starta integrasjonspunktet. Etter oppstart vert SHA-256 for JAR-fila samanlikna med innhaldet som vart verifisert. Er fila endra, vert integrasjonspunktet stoppa.

Dersom namnet på nøkkel-fila har vorte endra, eller brukarane ønskjer å legga den offentlege nøkkelen i ei anna mappe, må dei setja ein konfigurasjonsverdi: ```kosmos.verification.publicKeyPaths[0]```. Talet i klammeparentes er påkravd fordi publicKeyPaths er ei liste - noko me nyttar oss av i overgangsperiodar når ein nøkkel er i ferd med å gå ut på tid. To offentlege nøklar med tilhøyrande fingeravtrykk vil då vera publiserte i Digdir sin dokumentasjon, og brukarane må setja publicKeyPaths[0] og -[1] for å bruka begge til å verifisera integrasjonspunkt-distribusjonar.

### Stopp av gammalt integrasjonspunkt

Dersom valideringa av den nye versjonen passerer, vert eit ev. køyrande integrasjonspunkt stoppa via ein førespurnad til shutdown-endepunktet. Endepunktet må vera opna i integrasjonspunktet, sjå [Opna shutdown-endepunktet i integrasjonspunktet](#shutdown-endepunkt). Deretter sjekkar KOSMOS helse-endepunktet inntil status ikkje lenger returnerer “UP” eller operasjonen timar ut. Innstillingane ```kosmos.shutdown-retries``` og ```kosmos.shutdown-poll-interval-in-ms``` har sentrale rollar i denne funksjonaliteten. Dersom integrasjonspunktet ikkje stoppar innan det resulterande vindauget, loggar KOSMOS ei åtvaring om at den ikkje kunne stoppa integrasjonspunktet, og forsøker likevel å starta den nye versjonen. Det kan då henda at den nye versjonen ikkje startar, t.d. fordi porten eller databasen framleis er i bruk.

### Oppstart av ny versjon

Når den førre versjonen er stoppa, vil det nye integrasjonspunktet verta forsøkt starta opp. JAR-fila vert verifisert mot signaturen rett før oppstart, sjå [Validering av nedlasta artefakt](#validering-av-nedlasta-artefakt). Den nye versjonen køyrer som ein child-prosess av KOSMOS, med profil angjeven i innstillinga ```kosmos.integrasjonspunkt.profile```.

Ei relevant innstilling å nemna i denne samanheng er ```kosmos.environment.prefixes-removed-from-child-process```, som inneheld ei liste med prefiks på miljøvariablar som ikkje skal vidareførast til child-prosessen - då dei kan skapa utfordringar i det oppdaterte integrasjonspunktet. Sluttbrukarar skal ikkje ha noko forhald til denne innstillinga, så den er derfor ikkje framheva.

Innstillingane ```kosmos.launch-poll-interval-in-ms``` og ```kosmos.launch-timeout-in-ms``` definerar eit vindauge der KOSMOS sjekkar helse-endepunktet til det nyleg starta integrasjonspunktet. Dersom helse-endepunktet ikkje svarar innan dette vindauget, eller prosessen avsluttar, antek KOSMOS at oppdateringa feila. Ved tidsavbrot stoppar KOSMOS prosessen den starta. Den vil då starta oppatt førre versjon, dersom klienten hadde eit køyrande integrasjonspunkt før oppdateringsforsøket.

#### Meldingar til brukarane

Dersom brukarane har sett innstillingane ```kosmos.mail.recipient``` og ```kosmos.mail.from```, vil KOSMOS senda e-postar ved vellykka og feilande oppgraderingar. Elles er informasjonen tilgjengeleg i loggane til applikasjonen, som kan sendast til Digdir dersom kunden ønskjer det.

#### Blocklisting av versjon som ikkje starta

Dersom ```kosmos.blocklist.enabled``` har verdien 'true', og eit forsøk på oppdatering av integrasjonspunktet feilar innan vindauget beskrive i førre seksjon, vil versjonen verta blocklista. Dette medfører at KOSMOS ikkje vil forsøka å oppdatera til denne versjonen innan eit vindauge som er bestemt av innstillinga ```kosmos.blocklist.duration-in-hours```. Ved kvar periodiske køyring vil KOSMOS sjekka levetida på ei ev. blocklisting av siste versjon, som beskrive i ein tidlegare seksjon av dette dokumentet.

#### Logg frå oppdaterande integrasjonspunkt

Integrasjonspunktet loggar mykje under oppstart, noko som kan vera nyttig medan ein prøver å setja opp KOSMOS for første gong. Ein kan setja innstillinga ```kosmos.integrasjonspunkt.include-log=true``` for å importera loggane frå det nye integrasjonspunktet i KOSMOS-loggen. Resultatet er at det vert litt enklare å få tak i loggen til den integrasjonspunkt-versjonen ein prøver å oppdatera til, sidan den vert tilgjengeleg saman med annan nyttig KOSMOS-logg. Ulempa er at det vert meir logg å forhalda seg til, samt at ein kan risikera dobbel-logging dersom både integrasjonspunktet og KOSMOS sender loggar til same aggregeringsløysing, t.d. logstash. Logg-linjene som vert importerte frå integrasjonspunktet vil ha eit gjenkjenneleg prefiks ([INCLUDED]) for å skilla dei frå KOSMOS-linjer.

#### Allowlisting av versjon som har vore starta før

Som eit tiltak for å sikre at applikasjonen vil starte opp integrasjonspunktet etter at applikasjonen har vore skrudd av, så vart allowlisting innført. Etter at integrasjonspunktet har starta, lagar applikasjonen ei fil `integrasjonspunkt-<versjon>.allowlisted` for versjonen som køyrer. Denne vert automatisk fjerna ved oppgradering, og ny fil for gjeldande versjon vert oppretta. Innhaldet er tidspunktet den vart oppretta.

Fila fortel kva versjon som sist vart starta, og vert brukt når KOSMOS startar utan at det køyrer noko integrasjonspunkt, t.d. etter omstart av serveren:

- Den allowlista versjonen vert rekna som gjeldande versjon. Finst det ein nyare versjon, oppgraderer KOSMOS til denne, og brukar den allowlista versjonen til rollback dersom oppgraderinga feilar.
- Dersom ```kosmos.integrasjonspunkt.supported-major-version``` er sett, og det har vore releasa ein “latest-version” som har høgare major enn det som er konfigurert til å vera støtta, startar KOSMOS den allowlista versjonen i staden.

Ei .allowlisted-fil er ikkje nok åleine. Versjonen vert berre brukt dersom JAR-fila for han kan verifiserast mot signaturen.

## Køyra KOSMOS

### Køyra som Windows-teneste
Me brukar [WinSW](https://github.com/winsw/winsw) som Windows-service-wrappar. Følg standard-installasjonsinstruksane med denne konfigurasjonsfila:

```
<configuration>
  
  <!-- Identifikator for tenesta. Bør vera unik innanfor Windows-systemet. -->
  <id>kosmossvc</id>
  <!-- Namn på tenesta -->
  <name>Kosmos Service</name>
  <!-- Beskriving av tenesta -->
  <description>Keeps the integrasjonspunkt application up-to-date.</description>
  
  <!-- Sti til det køyrbare programmet som skal startast. -->
  <executable>java</executable>
    <arguments>-jar %BASE%\kosmos-vX.Y.Z.jar --spring.profiles.active=production</arguments>
    <!-- For å køyra med staging-profil: Erstatt 'production' med 'staging' i linja ovanfor. -->
  <logpath>%BASE%\kosmos-logs</logpath>
  
  <log mode="roll-by-size">
    <sizeThreshold>10240</sizeThreshold>
    <keepFiles>8</keepFiles>
  </log>
</configuration>
```

**Legg merke til at ein treng å vera lokal administrator-brukar når ein installerar tenesta.**

#### Lokal property-fil for KOSMOS
Det trengst ei fil med namn kosmos-local.properties i mappa KOSMOS vert starta frå. Med WinSW er dette same mappe som WinSW ligg i. Her er eit døme på ei slik fil. Erstatt verdiane i innstillingane med tilsvarande for din organisasjon.

```
difi.move.org.number=<organisasjonsnummer-med-ni-siffer>

# Erstatt vert og port i URL-en med plasseringa til Integrasjonspunktet ditt:
kosmos.integrasjonspunkt.baseURL=http://localhost:9093

# E-post-varse er frivillig. Spesifiser desse innstillingane for å motta e-postar når KOSMOS oppdaterar Integrasjonspunktet ditt:
kosmos.mail.recipient=nokon@domenet-ditt.no
kosmos.mail.from=ikkjesvar@domenet-ditt.no

spring.mail.host=<adressa-til-smtp-servaren-din>
spring.mail.port=<porten-på-servaren-din>
```

#### Andre antakingar i oppsettet i denne seksjonen
* `shutdown` er opna i integrasjonspunkt-local.properties, sjå [Opna shutdown-endepunktet i integrasjonspunktet](#shutdown-endepunkt)
* KOSMOS og Integrasjonspunktet sine JAR-filer er plasserte i same mappe
* Den offentlege nøkkelen til GPG-signeringssertifikat ligg i same mappe

#### Køyra KOSMOS og Integrasjonspunktet frå forskjellige mapper
Det tilrådde oppsettet (treng mindre konfigurasjon) er å ha både KOSMOS- og Integrasjonspunkt-JAR-filene i same mappe. Dersom ein skulle føretrekka å køyra applikasjonane frå forskjellige mapper, må følgjande innstillingar leggast til:

I kosmos-local.properties:

```
kosmos.integrasjonspunkt.home={sti-til-mappa-der-integrasjonspunktet-køyrer}
```

I XML-konfigurasjonsfila for WinSW:

```
<arguments>-jar %BASE%\kosmos-vX.Y.Z.jar --spring.profiles.active=production --spring.config.additional-location=file:{sti-til-mappa-der-integrasjonspunktet-køyrer}\integrasjonspunkt-local.properties</arguments>
```

Om mappa i ```kosmos.integrasjonspunkt.home``` gjeld følgjande:

- Manglar mappa, lagar KOSMOS ho, saman med foreldremapper som manglar.
- Kan stien ikkje brukast (han finst, men er ei fil, eller mappa kan ikkje lagast eller lesast), stoppar synkroniseringa med ein ERROR i loggen. Integrasjonspunktet vert då verken lasta ned eller starta.
- Integrasjonspunktet vert starta med denne mappa som arbeidsmappe. Filer som integrasjonspunktet les med relative stiar, t.d. integrasjonspunkt-local.properties, må derfor liggja der.
- Den offentlege nøkkelen vert framleis lesen frå mappa KOSMOS vert starta frå. Skal nøkkelen liggja i ei anna mappe, må ```kosmos.verification.publicKeyPaths[0]``` setjast.

### Køyra KOSMOS på Linux
Ein kan nytta den same konfigurasjonsfila som i førre seksjon. Følgande filer bør vera på plass i installasjonsmappa:

* kosmos-local.properties
* kosmos-vX.Y.Z.jar
* integrasjonspunkt-local.properties
* integrasjonspunkt-keystore.jks (di eiga JKS som Integrasjonspunktet nyttar)
* eformidling-key.asc (kan finnast [HER](../Introduksjon/last_ned#eformidlings-offentlige-kodesigneringsnøkkel))

Ein kan velja mellom å køyra i noverande skal eller som oppgåve vha. desse kommandoane, køyrt frå installasjonsmappa.

Køyra i noverande skal med staging-profil:

```
java -jar kosmos-vX.Y.Z.jar --spring.profiles.active=staging --spring.config.additional-location=file:./integrasjonspunkt-local.properties
```

Køyra som oppgåve med staging-profil:

```
java -jar kosmos-vX.Y.Z.jar --spring.profiles.active=staging --spring.config.additional-location=file:./integrasjonspunkt-local.properties &
```

* For å køyra med produksjonsprofil: Erstatt 'staging' med 'production' i linjene ovanfor.
* Innstillingane må stå etter JAR-fila og starta med `--`. Utan `--spring.profiles.active` køyrer både KOSMOS og integrasjonspunktet med staging-profil.

Når denne kommandoen er køyrt, vert PID-en til prosessen returnert. Denne kan nyttast dersom du treng å stoppa prosessen. (Kan også finnast vha. htop eller top.) Integrasjonspunktet startar som ein eigen Java-prosess, og vert ikkje stoppa dersom KOSMOS-prosessen (eller Windows-tenesta som omsluttar den) stoppar.

## Endringar frå KOSMOS v1.x

Desse endringane kom i KOSMOS v2 og gjeld framleis:

- `kosmos.integrasjonspunkt.latest-version` er ikkje lenger i bruk, og kan fjernast frå lokal konfigurasjon.
- `kosmos.integrasjonspunkt.earlybird-version` er ikkje lenger i bruk, og kan fjernast frå lokal konfigurasjon.
- Siste versjon vert i staden henta frå fila som ```kosmos.integrasjonspunkt.versionsURL``` peikar på.

## Kjeldekode
KOSMOS' kjeldekode er tilgjengeleg på [GitHub](https://github.com/felleslosninger/efm-kosmos).

## Neste steg

- [Sikkerhetskopi](sikkerhetskopi) (tilrådd)
- [Overvåking](overvaking) (tilrådd)
