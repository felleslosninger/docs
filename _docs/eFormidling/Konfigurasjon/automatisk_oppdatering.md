---
title: Automatisk oppdatering
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

KOSMOS - Kontinuerlege oppdateringar for sikker meldingsutveksling i offentleg sektor er ein applikasjon som sørger for å automatisk oppdatere, eller eventuelt rulle tilbake integrasjonspunktet. Meir informasjon er tilgjengeleg [her](../Introduksjon/#kosmos) og installasjonsveiledning finner du [her](../Drift/installasjon#kosmos).

## Minimal konfigurasjon
Minimum konfigurasjon for å kjøre KOSMOS. Denne skal ligge i ```kosmos-local.properties```filen.

| **Properties** | **Eksempel** | **Beskrivelse**|
| kosmos.integrasjonspunkt.baseURL | http://localhost:9093 | Host og port til ditt integrasjonspunkt| 
| difi.move.org.number | 991825827 | Samme organisasjonsnummer som i integrasjonspunkt-local.properties| 
| kosmos.mail.recipient | someone@yourdomain.no | Motta varsler på e-post når Kosmos har forsøkt en oppdatering| 
| kosmos.mail.from | noreply@yourdomain.no | Avsender av varsler | 
| spring.mail.host | smtp.yourdomain.no | Din SMTP-server for utsending av e-post | 
| spring.mail.port | 25 | Port benyttet av din SMTP-server | 
| kosmos.verification.publicKeyPaths[0] | file:eformidling-key.asc | Digitaliseringsdirektoratet sin offentlige nøkkel for å verifisere signatur på .jar filen| 



## Tilgjengelig konfigurasjon


|**Namn**|**Standard-verdi**|**Beskriving**|
|----|--------------|----------|
|kosmos.actuator-connect-timeout-in-ms|5000|Kor lenge KOSMOS ventar på å få kontakt med info-, helse- og shutdow-endepunkt på integrasjonspunkt.|
|kosmos.actuator-read-timeout-in-ms|5000|Kor lenge KOSMOS ventar på svar frå info-, helse- og shutdown-endepunkt på integrasjonspunkt.|
|kosmos.artifact-id|integrasjonspunkt|Namnet på applikasjonen som er handtert av KOSMOS.|
|kosmos.blocklist.duration-in-hours|2|Levetid på blockliste over feilande versjonar.|
|kosmos.blocklist.enabled|true|Flagg som styrer aktivering av blockliste.|
|kosmos.environment.prefixes-removed-from-child-process|[spring, kosmos]|Prefiks for innstillingar som ikkje skal vidareførast til oppdaterte integrasjonspunkt. Gjer at t.d. spring.mail.host ikkje vert vidareført og forårsakar aktivering av uønska bean-ar i integrasjonspunktet.|
|kosmos.group-id|no.difi.meldingsutveksling|Maven-group-ID-en til artefakten som er handtert av KOSMOS.|
|kosmos.integrasjonspunkt.baseURL|http://localhost:9093|URL-en integrasjonspunktet køyrer på hjå klienten. Fungerar som snarveg for å setja info-, helse- og shutdownURL-innstillingane. Ikkje påkrevd i seg sjølv, aktuator-endepunkta kan konfigurerast individuelt.|
|kosmos.integrasjonspunkt.early-bird|false|Flagg som styrer aktivering av early-bird-funksjonalitet.|
|kosmos.integrasjonspunkt.early-bird-version|-|Early-bird-versjon: Ein nyare versjon enn siste offisielle.|
|kosmos.integrasjonspunkt.healthURL|${kosmos.integrasjonspunkt.baseURL}/manage/health|Helse-endepunktet til integrasjonspunktet hjå klienten. Fortel om programmet fungerar.|
|kosmos.integrasjonspunkt.home|${user.dir}|Mappa integrasjonspunktet køyrer frå. Standard-verdien mappar til der KOSMOS køyrer frå. Sjå README for konfigurasjon som trengs dersom dei skal vera i forskjellige mapper.|
|kosmos.integrasjonspunkt.include-log|false|Styrer importering av logg frå oppdaterte integrasjonspunkt.|
|kosmos.integrasjonspunkt.infoURL|${kosmos.integrasjonspunkt.baseURL}/manage/info|Info-endepunktet til integrasjonspunktet hjå klienten. Gir informasjon om bla. køyrande versjon av programmet.|
|kosmos.integrasjonspunkt.latest-version|Avhengig av profil som applikasjonen køyrer med.|Siste offisielle versjon av integrasjonspunktet. Vert overstyrt av konfigurasjon frå efm-eureka (Spring Cloud Config Server).|
|kosmos.integrasjonspunkt.profile|Avhengig av profil.|Angir profil som det oppdaterte integrasjonspunktet vert starta opp med.|
|kosmos.integrasjonspunkt.shutdownURL|${kosmos.integrasjonspunkt.baseURL}/manage/shutdown|Shutdown-endepunktet til integrasjonspunktet hjå klienten. Nytta for å stoppa utdaterte versjonar.|
|kosmos.launch-poll-interval-in-ms|1000|Kor lenge KOSMOS ventar mellom kvar gong den spør helse-endepunktet om status.|
|kosmos.launch-timeout-in-ms|100000|Kor lenge KOSMOSventar på informasjon om integrasjonspunktet køyrer eller ikkje.|
|kosmos.mavenCentral|(https://repo1.maven.org/)|Maven central repository for nedlasting av artifakter.|
|kosmos.nexus-connect-timeout-in-ms|5000|Kor lenge KOSMOS ventar på å få kontakt med artefakt-repositoriet.|
|kosmos.read-timeout-in-ms|60000|Kor lenge KOSMOS ventar på data frå artefakt-repositoriet.|
|kosmos.orgnumber|${difi.move.org.number}|Henta frå integrasjonspunkt-konfigurasjonen.|
|kosmos.scheduler-cron-expression|0 0 5,19,21 * * MON-FRI|Kor ofte KOSMOS køyrer synkronisering.|
|kosmos.shutdown-poll-interval-in-ms|5000|Kor lenge det går mellom kvar førespurnad mot shutdown-endepunktet.|
|kosmos.shutdown-retries|3|Kor mange gonger KOSMOS prøver å skru av integrasjonspunktet (i påvente av at helse-endepunktet ikkje svarar) før den gir opp.|
|kosmos.verification.publicKeyPaths|[0]=file:${user.dir}/eformidling-key.asc|Liste med stiar til offentlege nøklar for Digdir sitt GPG-signeringssertifikat. Brukarar lastar ned frå dokumentasjonen vår, og me anbefalar dei å verifisera fingeravtrykk før dei set opp nøkkelen i KOSMOS.|
| spring.config.additional-location | -  | Mulig å overstyre kor integrasjonspunkt-local.properties fila skal ligge ved å sette denne verdien file:%BASE%\integrasjonspunkt-local.properties |


### Konfigurasjon for logging

Denne er ikkje satt som default og må leggast inn manuelt

|Namn|Anbefalt-verdi|Beskriving|
|----|--------------|----------|
|logging.level.no.difi.move.kosmos|TRACE| Auke loggnivået på KOSMOS for å få ekstra informasjon ved oppstart eller feilsøking.|
