---
title: Automatisk oppgradering
description: ""
summary: ""
permalink: eformidling_drift_automatisk_oppgradering.html
product: eFormidling
sidebar: eformidling_sidebar
---

Djupdykk i KOSMOS der me ser på kva applikasjonen er og korleis den fungerer. 

> Visst du ser etter installasjonsveiledning for KOSMOS må du leite [her i staden](eformidling_drift_installasjon.html#kosmos)

## Introduksjon

Kontinuerlege oppdateringar for sikker meldingsutveksling i offentleg sektor - KOSMOS er ein Java Spring Boot-støtta applikasjon (JAR) som køyrer som ei teneste, side om side med eit integrasjonspunkt (også JAR). Den fungerar i grove trekk slik:

1. Samanliknar gjeldande integrasjonspunkt-versjon mot siste tilgjengelege i Maven-repositoriet til Digdir.

2. Dersom det er ein nyare versjon tilgjengeleg, vert denne lasta ned til klienten. 

3. Gjeldande integrasjonspunkt vert forsøkt oppdatert til den nedlasta versjonen. Dersom den nye versjonen ikkje startar, rullar KOSMOS attende.

Vidare følgjer ei grundigare beskriving av korleis KOSMOS fungerar.

### Relevant versjon

Denne dokumentasjonen gjeld KOSMOS-1.1.0 og nyare.

### Krav til integrasjonspunkt som skal verta oppdatert

Det anbefales å begynne med eit fungerande oppsett for integrasjonspunktet, men ved nyinstallasjon av både KOSMOS og integrasjonspunktet er det også mulig å bruke KOSMOS til å laste ned integrasjonspunktet for så å konfigurere både integrasjonspunkt og KOSMOS.
+ Alle nødvendige portopningar for integrasjonspunktet er satt opp i brannmur(ar) som beskytter dette. [Sjå dokumentasjon](eformidling_drift_forberede_installasjon.html#brannmur%C3%A5pninger). Om du allereie køyrer integrasjonspunktet er desse på plass og du treng ikkje åpne noko nytt for å bruke KOSMOS.
+ Følgande endepunkt må være internt eksponerte i integrasjonspunktet. 
  1. Shutdown-endepunktet: ```/manage/shutdown```. Dette gjer at KOSMOS kan stoppa integrasjonspunktet når ein ny versjon er tilgjengeleg.
  2. Info-endepunktet: ```/manage/info```. For bestemming av inneværande versjon.
  3. Helse-endepunktet: ```/manage/health```. For at KOSMOS skal kunna avgjera om applikasjonen køyrer eller ikkje.

Om du har skrudd desse av i integrasjonspunktet kan du skru det på ved denne propertyen ```management.endpoints.enabled-by-default=true```


## Funksjonalitet

KOSMOS køyrer periodiske sjekkar i rekkefølge beskriven her. Innstillinga ```kosmos.schedulerCronExpression``` avgjer kor ofte dette skjer. 

1. Finne noværande versjon av integrasjonspunktet.
2. Finne siste versjon av integrasjonspunktet.
3. Sjekk av versjon-kompabilitet.
4. Nedlasting av siste lanserte versjon.
5. Validere autentisitet på nedlasta versjon.
6. Stopp av gammalt integrasjonspunkt.
7. Oppstart av ny versjon.

Ein kan sjølv velge tidspunkt for når ny versjon skal starte opp. Standard verdiane er kl 05:30, 19:30 og 21:30.

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

Artefaktar vert lasta ned frå lokasjonen som er angjeven i innstillinga ```kosmos.mavenCentral``` . Innstillingane , ```kosmos.group-id``` og ```kosmos.artifact-id``` bidreg vidare med å plukka ut den ønska distribusjonen for klienten. Nedlastinga skjer frå MavenCentral repositoriet til Digdir, døme kan [sjåast her](https://repo1.maven.org/maven2/no/difi/meldingsutveksling/integrasjonspunkt/)



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

[Tilgjengelig konfigurasjon finn du her ](eformidling_konfigurasjon_automatisk_oppdatering.html#tilgjenglig-konfigurasjon)


## Kjeldekode og tilhøyrande dokumentasjon

> [Kjeldekode på Github](https://github.com/felleslosninger/efm-kosmos)



## KOSMOS demo 

Demo som viser KOSMOS startes opp og oppdaterer integrasjonspunktet. 

<iframe src="https://player.vimeo.com/video/648594394?h=d13da10af1" width="640" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>


