---
title: Spørsmål og svar
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from:
- /eform_terms
- /eformidling_veiledning_sakark
- /eformidling_selfhelp
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

Når en bytter virksomhetssertifikat kan en følge samme fremgangsmåte som ved første gangs installasjon:

- [Tilgjengeliggjøre virksomhetssertifikatet i eFormidlings sertifikatkatalog](../installasjon/forberede_installasjon#tilgjengeliggjøre-virksomhetssertifikatet-i-eformidlings-sertifikatkatalog)
- [Tilgjengeliggjøre virksomhetssertifikatet for virksomhetens integrasjonspunkt](../installasjon/forberede_installasjon#tilgjengeliggjøre-virksomhetssertifikatet-for-virksomhetens-integrasjonspunkt)

> **NB!** Dersom dere bruker meldingstypen DPF må public del av sertifikatet lastet opp hos svarut.ks.no under ["Mottakersystem"](../installasjon/opprette_brukere#konfigurering-av-svarinn-mottakersystem)!


## Integrasjonspunktet

### Hvordan kan jeg beskytte sertifikat, passord og annet som integrasjonspunktet trenger?

En kan bruke HashiCorp Vault eller injisering av miljøvariable. Se beskrivelse på:

- [Konfigurer integrasjonspunktet](../installasjon/installasjon#konfigurer-integrasjonspunktet)

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

Installasjonsveiledning for OpenJDK finner du her [https://adoptopenjdk.net/installation.html#x64_win-jdk](https://adoptopenjdk.net/installation.html#x64_win-jdk) . Om du bruker et annet OS enn Windows x64 bit kan du velge din plattform inne på lenken.

> **NB!** 32-bits Java kan skape utfordringer for minnebruken til integrasjonspunktet, så 64-bits er å foretrekke!

**Oracle Java 8 (lisensbasert)**
Dersom Java ikke er installert eller versjonen er for gammel, kan ny versjon lastes ned [her](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) og installeres. Denne vil integrasjonspunktet støtte.

> **NB!** Husk å installere 64-bit Java om du har 64-bit operativsystem!

**Installere Java Cryptography Extension (JCE)**

Bruker du ny versjon av Java, må ny JCE installeres. Last ned JCE fra [Oracles sider](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html)

Det er ikke noen enkel måte å sjekke om Java Cryptography Extension er installert. Ofte kan det enkleste være å bare laste ned og installere JCE, men en du ønsker å sjekke, kan du gå til mappen ```$JAVA_HOME/jre/lib/security``` og sjekke om filene ```US_export_policy.jar``` og ```local_policy.jar``` har nyere dato enn øvrige filer. Hvis datoen er lik, må du installere JCE.
Dersom JCE mangler vil integrasjonspunket stoppe under oppstart og skrive loggmelding om manglende JCE. På nyere Java versjoner må en legge JCE-filene inn i både ```$JAVA_HOME/jre/lib/security/unlimited ``` og ```$JAVA_HOME/jre/lib/security/limited```.

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

### Hvilke meldingsmetadata lagres av integrasjonspunktet?

Et eksempel av hvilke meldingsmetadata som lagres av integrasjonspunktet kan sees under:
```
{
    "id": 30,
    "conversationId": "d4b37bf7-367a-4167-8fd8-0dba0e448e8e",
    "messageId": "d4b37bf7-367a-4167-8fd8-0dba0e448e8e",
    "sender": "0192:991825827:991825827",
    "senderIdentifier": "991825827",
    "receiver": "06068700602",
    "receiverIdentifier": "06068700602",
    "processIdentifier": "urn:no:difi:profile:digitalpost:vedtak:ver1.0",
    "documentIdentifier": "urn:no:difi:digitalpost:xsd:digital::digital",
    "messageReference": "d4b37bf7-367a-4167-8fd8-0dba0e448e8e",
    "messageTitle": "Test DPI proxy client",
    "lastUpdate": "2022-05-19T23:03:36.146+02:00",
    "finished": true,
    "expiry": "2022-05-20T23:01:54.781+02:00",
    "direction": "OUTGOING",
    "serviceIdentifier": "DPI",
    "messageStatuses": [{
            "id": 31,
            "lastUpdate": "2022-05-19T23:01:54.787+02:00",
            "status": "OPPRETTET"
        }, {
            "id": 50,
            "lastUpdate": "2022-05-19T23:01:56.02+02:00",
            "status": "SENDT"
        }, {
            "id": 58,
            "lastUpdate": "2022-05-19T23:03:00.471+02:00",
            "status": "MOTTATT",
            "description": "Hjørne 3 ha mottatt meldingen"
        }, {
            "id": 70,
            "lastUpdate": "2022-05-19T23:02:15.485+02:00",
            "status": "LEVERT",
            "description": "Kvittering på at digital post er tilgjengeliggjort eller at en fysisk post er postlagt"
        }
    ]
}
```

### Hvordan sjekker jeg om integrasjonspunktet har startet?

Dersom integrasjonspunktets helse-status svarer OK har integrasjonspunktet startet. Helse-status er tilgjengelig på
`/manage/health` (f.eks. `http://localhost:9093/manage/health`)

I tillegg produseres følgende logg-linje etter en vellykket start:

```
Started IntegrasjonspunktApplication ...
```

### Hvordan kan jeg nullstille integrasjonspunktet?

Etter oppgraderinger kan det skje at det blir liggande igjen gamle kvitteringer i integrasjonspunktet. Dette kan føre til warnings og i nokre tilfeller errors. For å få en fersk installasjon av integrasjonspunktet bør du gjere følgande:

1. Stopp integrasjonspunktet.
2. Ta backup av ```activemq-data``` mappa og ```receipts.mv.db``` fila.
3. Flytt så desse utav mappa. Sørg for at dei er fjerna frå integrasjonspunktmappa før du går vidare.
4. Start integrasjonspunktet igjen. Nå vil desse filene bli lasta ned på nytt.

### Hvordan kan jeg manuelt laste ned en innkommende melding fra integrasjonspunktet?

For å manuelt laste ned en innkommende melding fra integrasjonspunktet trenger du en HTTP-klient med GUI (for eksempel Postman) eller en kommandolinje/terminal som støtter kommandoen `curl`.

1. Lås meldingen: `curl 'http://localhost:9093/api/messages/in/peek/?messageID=2f553592-1ebc-4b56-b5bd-73479300fe8c' -i -X GET`
2. Last ned meldingen: `curl 'http://localhost:9093/api/messages/in/pop/2f553592-1ebc-4b56-b5bd-73479300fe8c' -i -X GET > asic.zip`
3. EVENTUELT - marker meldingen som ferdig behandla: `curl 'http://localhost:9093/api/messages/in/2f553592-1ebc-4b56-b5bd-73479300fe8c' -i -X DELETE`

### Hvordan migrerer jeg data fra den medfølgene H2-fildatabasen?

Det er dessverre ingen rett frem måte å gjøre dette på, men det finnes ett communitydrevet migreringsverktøy en kan prøve:
[H2 Migration Tool](https://github.com/manticore-projects/H2MigrationTool)

## Digital Post til Innbyggere

### Hva skal til for at proxy-klientbiblioteket for Digital Post til Innbyggere skal fungere?

Proxy-klientbiblioteket krever spesiell konfigurasjon av integrasjonspunktet, se under:

```
difi.move.feature.enableDPI=true
difi.move.dpi.client-type=json
difi.move.dpi.receipt-type=xmlsoap
difi.move.feature.statusQueueIncludes=DPI
```

### Sending uten fødselsnummer

Dersom av en eller annen grunn mangler fødselsnummer eller vil tvinge sending til print. Eksempel SBD:
```
curl -XPOST http://localhost:9093/api/messages/out \
-H 'Content-Type: application/json' -d \
'{
    "standardBusinessDocumentHeader": {
        "headerVersion": "1.0",
        "sender": [
      {
        "identifier": {
          "value": "0192:991825827",
          "authority": "iso6523-actorid-upis"
        }
      }
    ],
        "documentIdentification": {
            "standard": "urn:no:difi:digitalpost:xsd:fysisk::print",
            "typeVersion": "1.0",
            "type": "print"
        },
        "businessScope": {
            "scope": [{
                    "type": "ConversationId",
                    "identifier": "urn:no:difi:profile:digitalpost:vedtak:ver1.0"
                }
            ]
        }
    },
    "print": {
        "hoveddokument": "my.pdf",
        "mottaker": {
            "navn": "Ola Nordmann",
            "adresselinje1": "Testvegen 2",
            "postnummer": "6853",
            "poststed": "Leikanger",
            "land": "NO"
        },
        "utskriftsfarge": "SORT_HVIT",
        "posttype": "B_OEKONOMI",
        "retur": {
            "mottaker": {
                "navn": "Digitaliseringsdirektoratet avd. Leikanger",
                "adresselinje1": "Skrivarvegen 2",
                "postnummer": "6853",
                "poststed": "Leikanger",
                "land": "NO"
            },
            "returhaandtering": "DIREKTE_RETUR"
        }
    }
}'
```
**NB!** Verdier for mottaker og returpostmottaker må fylles inn slik som i SBDen over ellers vil sendingen feile!

## Diverse

### Hvordan verifiserer jeg at jar-filen er fra Digitaliseringsdirektoratet?

En kan verifisere at jar-filen er fra Digitaliseringsdirektoratet ved hjelp av GnuPG:

1. Last ned ønsket jar-fil med tilhørende signatur og eFormidlings offentlige kodesigneringsnøkkel:

- [Last ned](../Introduksjon/last_ned#eformidlings-offentlige-kodesigneringsnøkkel)

2. eFormidlings offentlige kodesigneringsnøkkel må legges inn i nøkkelringen på maskina hvor signaturen skal verifiseres:
```
gpg --import <sti-til-nedlastet-signeringsnøkkel>
```

3. Deretter kan signaturen verifiseres vha. kommandoen under:

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

## Begrep

### Hva betyr MOVE, NEXTMOVE og MIIF?

MOVE, NEXTMOVE og MIIF er tidligere arbeidsnavn for eFormidling.

### Hva betyr DPO?

DPO er en teknisk kode for eFormidlings meldingstjeneste. DPO oppstod som en forkortelse for Digital Post til Offentlig
Virksomhet. At ikke alle offentlige virksomheter bruker eFormidlings meldingstjeneste har medført en del misforståelser.
Bruken av begrepet blir tonet ned.

### Hva betyr DPV?

DPV er en teknisk kode for Altinn Digital Post. DPV oppstod som en forkortelse for Digital Post til Virksomhet. At
Altinn Digital Post også kan brukes til å sende til innbyggere har medført en del misforståelser. Bruken av begrepet
blir tonet ned til fordel for Altinn Digital Post.

### Hva betyr DPF?

DPF er en teknisk kode for KS SvarUt og SvarInn (KS FIKS). DPF oppstod som en forkortelse for Digital Post til Fiks. At
ikke alle har et forhold til Fiks (digitale fellesløsninger som kommuner og fylkeskommuner kan ta i bruk) har medført en
del misforståelser. Bruken av begrepet blir tonet ned til fordel for KS SvarUt og SvarInn.

### Hva betyr DPE?

DPE er en teknisk kode for Digital Post til eInnsyn. Bruken av begrepet blir tonet ned til fordel for eInnsyns
meldingstjeneste.

### Hva betyr DPI?

DPI er en teknisk kode for Digital Post til Innbyggere. At også andre meldingstjenester kan brukes til å sende digital
post til innbyggere har medført en del misforståelser. Bruken av begrepet blir tonet ned til fordel for Digital Post til
Innbyggere. 

### Hva betyr DPFIO?

DPFIO er en teknisk kode for Digital Post til FIKS IO. FIKS IO er en meldingstjeneste tilbydd av KS. Bruken av begrepet
blir tonet ned til fordel for FIKS IO.

## Sak- og arkivsystem

### Hvordan konfigurerer jeg sak- og arkvisystem X til å bruke eFormidling?

Leverandøren må bistå ved konfigurasjon av sak- og arkivsystem X til å bruke eFormidling. Enten ved å peke til riktig
dokumentasjon eller ved å gjøre oppsettet.

## Arkitektur

### Hvorfor ble eFormidling etablert?

Følgende arbeid ligger til grunn for at eFormidling ble etablert:

- [Meldingsutveksling internt i forvaltninga](https://www.digdir.no/felleslosninger/meldingsutveksling-internt-i-forvaltninga/1376)
- [Løsning for meldingsutveksling i offentlig sektor](https://www.digdir.no/felleslosninger/losning-meldingsutveksling-i-offentlig-sektor/1390)

### Hvorfor baseres eFormidling på asynkron meldingsutveksling?

Følgende arbeid ligger til grunn for at eFormidling baseres på asynkron meldingsutveksling:

- [Meldingsutveksling internt i forvaltninga](https://www.digdir.no/felleslosninger/meldingsutveksling-internt-i-forvaltninga/1376)
- [Løsning for meldingsutveksling i offentlig sektor](https://www.digdir.no/felleslosninger/losning-meldingsutveksling-i-offentlig-sektor/1390)

### Hvorfor baseres eFormidling på at integrasjonspunktet skal installeres hos virksomhetene?

Følgende arbeid ligger til grunn for at eFormidling baseres på at integrasjonspunktet skal installeres hos virksomhetene:

- [Meldingsutveksling internt i forvaltninga](https://www.digdir.no/felleslosninger/meldingsutveksling-internt-i-forvaltninga/1376)
- [Løsning for meldingsutveksling i offentlig sektor](https://www.digdir.no/felleslosninger/losning-meldingsutveksling-i-offentlig-sektor/1390)
