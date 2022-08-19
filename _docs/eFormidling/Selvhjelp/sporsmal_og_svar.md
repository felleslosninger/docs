---
title: Spørsmål og svar
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

1. TOC
{:toc}

## Virksomhetssertifikat

### Hvordan henter jeg den offentlige delen av virksomhetssertifikatet fra en keystore (`JKS` eller `P12`)?

Eksportere public key fra Keystore Explorer:

1. Åpne opp keystoren i keystore explorer.
2. Høgreklikk på valgt sertifikat og velg "export->Certificate" eller "certificate chain" i menyen.
    - Om du velger Certificate Chain så må du markere for "head only" i det neste vinduet.
    - Marker også av for export format "X.509"
3. Marker for PEM format.
4. Naviger til valgt mappe og lagre som .cer fil.

Eksportere public key fra jks-keystore med keytool:

```
keytool -export -keystore [MY_KEYSTORE.jks] -alias [ALIAS] -file [FILENAME.cer]
```

Eksportere public key fra p12-keystore med keytool:
```
keytool -export -keystore [MY_KEYSTORE.p12] -alias [ALIAS] -file [FILENAME.cer] -storetype PKCS12
```

### Hvordan bytter jeg passord for virksomhetssertifikatet?

Det er viktig at passordet på keystore er likt passordet på sertifikatet for at integrasjonspunktet skal fungere. Her er veiledning for å endre passord på begge to.

Endre keystore passord:

1. Åpne opp keystoren i JKS.
2. På arbeidslinjen på toppen av vinduet:
    - Tools
    - Set KeyStore password
    - skriv inn nytt passord

Endre sertifikat passord:

1. Åpne opp keystore i JKS.
2. Høgreklikk på valgt sertifikat og velg "set password" i menyen.
3. Skriv inn nytt passord.

### Hvordan oppdaterer jeg virksomhetssertifikatet som brukes i eFormidling?

Når en bytter virksohetssertifikat kan en følge samme fremgangsmåte som ved første gangs installasjon:

- [virksomhetssertifikat](../installasjon/virksomhetssertifikat)


### Hvordan kan jeg beskytte sertifikat, passord og annet som integrasjonspunktet trenger?

En kan bruke HashiCorp Vault eller injisering av miljøvariable. Se beskrivelse på:

- [Konfigurer integrasjonspunktet](../installasjon/installasjon#konfigurer-integrasjonspunktet)

## Java

### Hvordan installerer jeg Java-versjonen integrasjonspunktet krever?

> Fra 01.01.19 vil Oracle Java være lisensbasert. Denne kan brukes, eller en kan bruke gratisalternativ som OpenJDK. [Les mer](https://www.oracle.com/corporate/pressrelease/java-se-subscription-offering-062118.html)

Integrasjonspunktet er en Java applikasjon og krever derfor at man har Java(JDK) kjøremiljø installert på serveren den skal kjøre.
For å verifisere om java er installert og hvilken versjon kan du i et kommandolinjevindu bruke kommandoen

```
java -version
```

Integrasjonspunktet krever minimum versjon 1.8.0

**OpenJDK Java 8 (gratis)**
Digitaliseringsdirektoratet har valgt å bruke JDK 8 fra [https://adoptopenjdk.net/](https://adoptopenjdk.net/) med HotSpot som JVM. Denne vil integrasjonspunktet støtte. Det finnes mange ulike tilbydere av OpenJDK for å laste ned en gratisversjon av Java. Her kan en velge den tilbyderen en selv ønsker, men versjon må være Java 8.

Installasjonsveiledning for OpenJDK finner du her [https://adoptopenjdk.net/installation.html#x64_win-jdk](https://adoptopenjdk.net/installation.html#x64_win-jdk) . Om du bruker et annet OS enn Windows x64 bit kan du velge din platform inne på lenken.

> **NB!** 32-bits Java kan skape utfordringer for minnebruken til integrasjonspunktet, så 64-bits er å foretrekke!

**Oracle Java 8 (lisensbasert)**
Dersom Java ikke er installert eller versjonen er for gammel, kan ny versjon lastes ned [her](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) og installeres. Denne vil integrasjonspunktet støtte.

> **NB!** Husk å installere 64-bit Java om du har 64-bit operativsystem!

**Installere Java Cryptography Extension (JCE)**

Bruker du ny versjon av Java, må ny JCE installeres. Last ned JCE fra [Oracles sider](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html)

Det er ikke noen enkel måte å sjekke om Java Cryptography Extension er installert. Ofte kan det enkleste være å bare laste ned og installere JCE, men en du ønsker å sjekke, kan du gå til mappen ```$JAVA_HOME/jre/lib/security``` og sjekke om filene ```US_export_policy.jar``` og ```local_policy.jar``` har nyere dato enn øvrige filer. Hvis datoen er lik, må du installere JCE.
Dersom JCE mangler vil integrasjonspunket stoppe under oppstart og skrive loggmelding om manglende JCE. På nyere Java versjoner må en legge JCE-filene inn i både ```$JAVA_HOME/jre/lib/security/unlimited ``` og ```$JAVA_HOME/jre/lib/security/limited```.

## Integrasjonspunktet

### Hvor mye diskplass trenger integrasjonspunktet?

1 million meldinger medfører:

- omtrent 200 MB til integrasjonspunktet
- omtrent 100 MB loggdata
- omtrent 1400 MB fildatabase dersom denne er brukes
- mellomlagring av innkommende meldinger før de er konsumert
- mellomlagring av utgående meldinger før de er sendt

### Hvorfor kommer det ikke meldinger på webhook-abonnementet jeg har satt opp?

Ingen meldinger blir videreformidlet til webhook-abonnement som standard. Dette må konfigureres. Se:

- [Webhook-abonnement](../installasjon/installasjon#webhook-abonnement)

## Digital Post til Innbyggere via proxy-klientbibliotek

### Hva skal til for at proxy-klientbiblioteket for Digital Post til Innbyggere skal fungere?

Proxy-klientbiblioteket krever spesiell konfigurasjon av integrasjonspunktet, se under:

```
difi.move.feature.enableDPI=true
difi.move.dpi.client-type=json
difi.move.dpi.receipt-type=xmlsoap
difi.move.feature.statusQueueIncludes=DPI
```

## Diverse

### Hvordan verifiserer jeg at jar-filen er fra Digitaliseringsdirektoratet?

Last ned ønsket jar-fil med tilhørende signatur og eFormidlings offentlige kodesigneringsnøkkel:

- [Last ned](../Introduksjon/last_ned)

En kan verifisere at jar-filen er fra Digitaliseringsdirektoratet ved hjelp av GnuPG-kommandoen under:

```
gpg --verify "integrasjonspunkt-X.Y.Z.jar.asc" "integrasjonspunkt-X.Y.Z.jar"
```

Resultatet skal inneholde `Good signature from...` og `Primary key fingerprint` skal samsvare med eksempelet under:

```
gpg: Signature made tir. 29. jun 2021 12:26:03
gpg:                using RSA key CA5643393753ECE3
gpg: Good signature from "Kodesignering eFormidling (Digitaliseringsdirektoratets nøkkel for kodesignering for eFormidling) <servicedesk@digdir.no>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: AEF2 7AA6 948A 3856 932A  F98E CA56 4339 3753 ECE3
```

### Hva er KOSMOS?

KOSMOS står for kontinuerlige oppdateringar for sikker meldingsutveksling i offentleg sektor. KOSMOS er en støtte-
applikasjon som automatisk holder integrasjonspunktet oppgradert.

- [Automatisk oppgradering](../installasjon/automatisk_oppgradering)

### Hva betyr versjonsnummeret?

eFormidling følger [semantisk versjonering] (https://semver.org) for å vise endringer mellom forskjellige versjoner.

En distribusjon av integrasjonspunktet inneholder navnet på komponenten, versjonsnummer og filtype som i dette eksemplet:
integrasjonspunkt-2.0.7.jar

Versjonsnummer er angitt i formatet MAJOR.MINOR.PATCH

**PATCH** inneholder bakoverkompatible feilrettelser. Med feilretting menes intern endring av uønsket oppførsel eller feil. Dette er versjoner man kan installere uten at man vil merke endringer

**MINOR** har ny funksjonalitet, men er bakover-kompatibel. Her er det lagt til ny funksjonalitet eller gjort endring på eksisterende funksjonalitet uten at dette påvirker konsumenter av API'et. Denne vil også økes dersom det det er funksjonalitet som er ønsket fjernet i senere versjon (deprecated). En MINOR-oppdatering vil ikke endre eksisterende integrasjoner, men det kan være nyttig å teste ny funksjonalitet dersom dette er tilgjengelig gjennom integrasjonen man bruker.

**MAJOR** har endringer som ikke er bakover-kompatible. Dette kan være endringer i hvordan API'et brukes eller fjerning av funksjonalitet, som tidligere er signalisert at vil fjernes gjennom Minor-release og API-kommentar. En Major-oppdatering vil føre til at hele eller deler av funksjonaliteten man bruker ikke lenger virker og vil derfor være viktig å forsikre seg om at det man trenger virker som forventet gjennom testing eller dialog med leverandør av fagsystemet som integrerer mot integrasjonspunktet.

### Hva betyr MOVE, NEXTMOVE og MIIF?

MOVE, NEXTMOVE og MIIF er tidligere arbeidsnavn for eFormidling.