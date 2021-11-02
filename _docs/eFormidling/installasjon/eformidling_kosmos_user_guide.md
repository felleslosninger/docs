---
title: Ei guide til KOSMOS
description: Bruksrettleiing for Kontinuerlege oppdateringar for sikker meldingsutveksling i offentleg sektor - KOSMOS
permalink: eformidling_kosmos_user_guide.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

> Visst du ser etter installasjonsveiledning for KOSMOS må du leite [her i staden](https://docs.digdir.no/eformidling_auto_update.html)

## Introduksjon

Kontinuerlege oppdateringar for sikker meldingsutveksling i offentleg sektor - KOSMOS er ein Java Spring Boot-støtta applikasjon (JAR) som køyrer som ei teneste, side om side med eit integrasjonspunkt (også JAR). Den fungerar i grove trekk slik:

1. Samanliknar gjeldande integrasjonspunkt-versjon mot siste tilgjengelege i Maven-repositoriet til Digdir.

2. Dersom det er ein nyare versjon tilgjengeleg, vert denne lasta ned til klienten. 

3. Gjeldande integrasjonspunkt vert forsøkt oppdatert til den nedlasta versjonen. Dersom den nye versjonen ikkje startar, rullar KOSMOS attende.

Vidare følgjer ei grundigare beskriving av korleis KOSMOS fungerar.

### Relevant versjon

Denne dokumentasjonen gjeld KOSMOS-1.1.0 og nyare.

### Krav til integrasjonspunkt som skal verta oppdatert

- Integrasjonspunktet har alle naudsynte portåpningar definert, jf. tilhøyrande dokumentasjon.

- Shutdown-endepunktet til det køyrande integrasjonspunktet må vera eksponert hjå klienten (ikkje eksternt mot Internett). Dette gjer at KOSMOS kan stoppa integrasjonspunktet når ein ny versjon er tilgjengeleg.

- Info-endepunktet til integrasjonspunktet må vera internt eksponert, for bestemming av inneværande versjon.

- Helse-endepunktet til integrasjonspunktet må vera internt eksponert, for at KOSMOS skal kunna avgjera om applikasjonen køyrer eller ikkje.

## Funksjonalitet

KOSMOS køyrer periodiske sjekkar i rekkefølga beskriven her. Innstillinga ```kosmos.scheduler-cron-expression``` avgjer kor ofte dette skjer.

### Finna noverande versjon av integrasjonspunktet

Den versjonen av integrasjonspunktet som ev. køyrer, vert henta frå info-endepunktet (Spring Boot Actuator) til det køyrande integrasjonspunktet. URL-en til info-endepunktet er avleia frå verdien på ```kosmos.integrasjonspunkt.baseURL```. Dersom KOSMOS ikkje mottek informasjon frå info-endepunktet, eller det ikkje finst - noko som er godt mogleg - antek me at det ikkje køyrer noko integrasjonspunkt hjå klienten. Applikasjonen held då fram med neste steg.

### Finna siste versjon av integrasjonspunktet

Siste versjon av integrasjonspunktet vert bestemt av konfigurasjonar frå efm-eureka, som er Spring Cloud Config Server-applikasjonen vår. Ved kvar periodiske køyring vil KOSMOS henta ned oppdaterte konfigurasjonar frå efm-eureka. Innstillinga ```kosmos.integrasjonspunkt.latest-version``` angir siste offisielle versjon som er lansert av Digdir. Det finst konfigurasjonar for dev-, test- staging- og production-profilar, der sistnemnde er relevant i ein produksjons-omgjevnad.

#### Early-Bird-versjon

For interne test-miljø (som endå ikkje er på føtene) og klientar som ev. ønsker å hjelpa oss med testing, kan siste lanserte versjon overstyrast til den såkalla “early-bird-versjonen”. Dette er versjonar som har vorte testa i mindre grad enn siste offisielle versjon ovanfor. Early-bird-versjon kan aktiverast vha. ```kosmos.integrasjonspunkt.early-bird``` (true/false). Dersom denne er aktivert, vil versjonen i ```kosmos.integrasjonspunkt.early-bird-version``` overstyra ```kosmos.integrasjonspunkt.latest-version```. Early-bird-versjonen skal også konfigurerast vha. efm-eureka (dvs. utan lokal overstyring hjå klienten).

### Sjekk av versjon-kompatibilitet

Semantisk versjonering er nytta i eFormidling. Applikasjonar som nyttar denne versjoneringa vert gjort tilgjengelege  i major-, minor- og patch-versjonar som er reflektert i namnet på distribusjonane i form av <applikasjon>-<major>.<minor>.<patch>, t.d. integrasjonspunkt-1.9.2. Oppgradering av ein større eller mindre versjon inneber alltid ein inkrement i namnet på distribusjonen. 

Ein oppgradert major-versjon (t.d. frå integrasjonspunkt-1.9.2 til integrasjonspunkt-2.0.0 inneheld endringar som bryt med førre versjon. Oppgraderingar av major-versjonar kan føra med seg større eller mindre endringar hjå klientane. Eit døme på dette kan vera oppgradering av Java-versjonen som integrasjonspunktet køyrer på, som medfører at klienten må gjera oppgraderingar før det nye integrasjonspunktet kan takast i bruk. For å sikra at KOSMOS sin automatiske oppgradering ikkje lagar krøll for klientar som ikkje er klare for ein ny major-versjon endå, har me innført eit “setebelte” i form av ```kosmos.integrasjonspunkt.supported-major-version```. Denne verdien kan setjast lokalt hjå klientar, og sikrar at KOSMOS ikkje utfører oppgraderingar til ein nyare major-versjon enn den som er angjeven.

### Nedlasting av siste lanserte versjon

JAR-fila med siste integrasjonspunkt-versjon vert lasta ned til mappa angjeve i ```kosmos.integrasjonspunkt.home```, som har mappa KOSMOS køyrer frå som standard-verdi. Dersom eit tidlegare forsøk på å starta den siste versjonen har feila (dvs. versjonen er blocklista), vil KOSMOS avbryta nedlastinga og skriva ut ein beskjed om tilfellet. Sjå meir om block- og allow-listing av versjonar seinare.

Artefaktar vert lasta ned frå lokasjonen som er angjeven i innstillinga ```kosmos.mavenCentral``` . Innstillingane , ```kosmos.group-id``` og ```kosmos.artifact-id``` bidreg vidare med å plukka ut den ønska distribusjonen for klienten. Nedlastinga skjer frå MavenCentral repositoriet til Digdir, døme kan [sjåast her](https://repo1.maven.org/maven2/no/difi/meldingsutveksling/integrasjonspunkt/2.2.1/)



### Validering av nedlasta artefakt

MD5- og SHA1-sjekksummar vert samanlikna etter nedlasting av JAR-filer frå Maven-repositoriet. 

Kodesignering og validering er innført. Den offentlege delen av eFormidling sitt GPG-signeringssertifikat er gjort tilgjengeleg for kundane på [maven central](https://repo1.maven.org/maven2/no/difi/meldingsutveksling/integrasjonspunkt/)  . Dette vil nyttast til verifikasjon av at JAR-filene som vert lasta ned er signert av Digdir. Brukarar av KOSMOS må lasta ned den offentlege nøkkelen til eFormidling sitt GPG-signeringssertifikat frå ei sikker nettside (dokumentasjonen vår/ HTTPS). Dokumentasjonen vil også innehalda fingeravtrykket til den offentlege nøkkelen. Etter å ha lasta ned offentleg nøkkel, kan brukarar rekna ut fingeravtrykket frå den nedlasta fila og samanlikna med den publiserte verdien frå Digdir. Dersom verdiane er like, kan dei nytta nøkkelen til å verifisera integrasjonspunkt-distribusjonar. Verifiseringa vert gjort av deploymanager, og det einaste brukarane treng å gjera er å legga nøkkelen i samme mappe som deploymanager-JAR-fila. 

Dersom namnet på nøkkel-fila har vorte endra, eller brukarane ønsker å legga den offentlege nøkkelen i ei anna mappe, må dei setja ein konfigurasjonsverdi: ```kosmos.verification.publicKeyPaths[0]```. Talet i klammeparantes er påkrevd fordi publicKeyPaths er ei liste - noko me nyttar oss av i overgangsperiodar når ein nøkkel er i ferd med å gå ut på tid. To offentlege nøklar med tilhøyrande fingeravtrykk vil då vera publiserte i Digdir sin dokumentasjon, og brukarane må setja publicKeyPaths[0] og -[1] for å bruka begge til å verifisera integrasjonspunkt-distribusjonar.

### Stopp av gammalt integrasjonspunkt

Dersom valideringa av den nye versjonen passerar, vert eit ev. køyrande integrasjonspunkt stoppa via ein førespurnad til shutdown-endepunktet. Deretter sjekkar KOSMOS helse-endepunktet inntil status ikkje lenger returnerar “UP” eller operasjonen timar ut. Innstillingane ```kosmos.shutdown-retries``` og ```kosmos.shutdown-poll-interval-in-ms``` har sentrale rollar i denne funksjonaliteten. Dersom integrasjonspunktet ikkje stoppar innan det resulterande vindauget, vil KOSMOS logga at den ikkje kunne stoppa integrasjonspunktet. Operasjonen vil då avbryta, og integrasjonspunktet vil vera i inneverande tilstand fram til neste periodiske KOSMOS-køyring.

### Oppstart av ny versjon

Når den førre versjonen er stoppa, vil det nye integrasjonspunktet verta forsøkt starta opp. Den nye versjonen køyrer som ein child-prosess av KOSMOS, med profil angjeven i innstillinga ```kosmos.integrasjonspunkt.profile```.

Ei relevant innstilling å nemna i denne samanheng er ```kosmos.environment.prefixes-removed-from-child-process```, som inneheld ei liste med prefiks på innstillingar som ikkje skal vidareførast til child-prosessen - då dei kan skapa utfordringar i det oppdaterte integrasjonspunktet. Sluttbrukarar skal ikkje ha noko forhald til denne innstillinga, så den er derfor ikkje fremheva.

Innstillingane ```kosmos.launch-poll-interval-in-ms``` og ```kosmos.launch-timeout-in-ms``` definerar eit vindauge der KOSMOS sjekkar helse-endepunktet til det nyleg starta integrasjonspunktet. Dersom helse-endepunktet ikkje svarar innan dette vindauget, antek KOSMOS at oppdateringa feila. Den vil då starta oppatt førre versjon, dersom klienten hadde eit køyrande integrasjonspunkt før oppdateringsforsøket.

#### Meldingar til brukarane

Dersom brukarane har sett innstillingane ```kosmos.mail.recipient``` og ```kosmos.mail.from```, vil KOSMOS senda e-postar ved vellykka og feilande oppgraderingar. Elles er informasjonen tilgjengeleg i loggane til applikasjonen, som kan sendast til Digdir dersom kunden ønsker det.

#### Blocklisting av versjon som ikkje starta

Dersom ```kosmos.blocklist.enable``` har verdien 'true', og eit forsøk på oppdatering av integrasjonspunktet feilar innan vindauget beskrive i førre seksjon, vil versjonen verta blocklista. Dette medfører at KOSMOS ikkje vil forsøka å oppdatera til denne versjonen innan eit vindauge som er bestemt av innstillinga ```kosmos.blocklist.duration-in-hours```. Ved kvar periodiske køyring vil KOSMOS sjekka levetida på ei ev. blocklisting av siste versjon, som beskrive i ein tidlegare seksjon av dette dokumentet.

#### Logg frå oppdaterande integrasjonspunkt

Integrasjonspunktet loggar mykje under oppstart, noko som kan vera nyttig medan ein prøver å setja opp KOSMOS for første gang. Ein kan setja innstillinga ```kosmos.integrasjonspunkt.include-log=true``` for å importera loggane frå det nye integrasjonspunktet i KOSMOS-loggen. Resultatet er at det vert litt enklare å få tak i loggen til den integrasjonspunkt-versjonen ein prøver å oppdatera til, sidan den vert tilgjengeleg saman med annan nyttig KOSMOS-logg. Ulempa er at det vert meir logg å forhalda seg til, samt at ein kan risikera dobbel-logging dersom både integrasjonspunktet og KOSMOS sender loggar til samme aggregeringsløysing, t.d. logstash. Logg-linjene som vert importerte frå integrasjonspunktet vil ha eit gjenkjenneleg prefiks ([INCLUDED]) for å skilla dei frå KOSMOS-linjer.

#### Allowlisting av versjon som har vore starta før

Som eit tiltak for å sikre at applikasjonen vil starte opp integrasjonspunktet etter at applikasjonen har vore skrudd av så vart allowlisting innført og denne lagar .allowlisted filer. Til dømes om applikasjonen og integrasjonspunktet begge er av så vil den ikkje forsøker å oppdatere integrasjonspunktet om det allereie eksisterer ei .allowlisted fil. Dette var også eit behov i ein spesiell case der ```kosmos.integrasjonspunkt.supported-major-version``` var satt lik køyrande versjon og det har vore releasa ein “latest-version” som har høgare major enn det som er konfigurert til å være støtta.  Etter at integrasjonspunktet har starta så vil applikasjonen lage denne .allowlisted fila, denne vert automatisk fjerna ved oppgradering og ny fil for gjeldande versjon vert oppretta. Innhaldet er tidspunktet den vart oppretta. 

## Innstillingar
 
|Namn|Standard-verdi|Beskriving|
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

## Innstillingar for logging

Denne er ikkje satt som default og må leggast inn manuelt

|Namn|Anbefalt-verdi|Beskriving|
|----|--------------|----------|
|logging.level.no.difi.move.kosmos|TRACE| Auke loggnivået på KOSMOS for å få ekstra informasjon ved oppstart eller feilsøking.|

## Kjeldekode og tilhøyrande dokumentasjon

> [Kjeldekode på Github](https://github.com/felleslosninger/efm-deploy-manager)
 

