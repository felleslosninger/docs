---
title: Forutsetninger for installasjon
description: Forutsetninger for installasjon
summary: "Forutsetninger for installasjon"
permalink: eformidling_forutsetninger.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

Einnsyn er en prosess der statlige virksomheter gjør metadata for korrespondanse tilgjengelig for offentligheten. Integrasjonspunktet fungerer som et bindeledd mellom eInnsyn-klient brukt av arkivarene og det sentrale eInnsyn-systemet.

For å sette opp integrasjonspunktet til å støtte eInnsyn, må du gjøre følgende: 


## Dette gjør du før installasjon av Integrasjonspunktet

+ Tilgjengelig minne må være minimum 1GB for eInnsyn og minimum 2GB for eFormidling. [Les mer om minne her.](https://difi.github.io/felleslosninger/eformidling_selfhelp.html#justere-tilgjengelig-minne)
+ Nødvendige brannmuråpninger
+ Java 8 X med JCE installert (JDK)
+ Virksomhetssertifikat utstedt av Buypass eller Commfides. [Les mer](http://difi.github.io/felleslosninger/eformidling_virksomhetssertifikat.html)
+ Tips: Installer integrasjonspunktet og eInnsyn-klient på samme server.

### Tidssynkronisering
Bekreftelse på at bruker er autentisert sendes fra OIDC til ditt integrasjonspunkt i form av en Json Web Token (JWT). En JWT inneholder tidsstempel som angir hvor lenge den er gyldig. Det er derfor viktig at alle servere som kommuniserer via integrasjonspunktet har synkroniserte klokker. OIDC bruker NTP (”network time protocol”) for synkronisering, tidskilden er GPS-basert. Det er videre viktig at alle servere i Circle of Trust er justert korrekt for tidssone og sommertid. (CET / CEST i Norge). Du kan sjekke din klokke [her](https://time.is/)

[For mer informasjon om Network Time Protocol.](https://no.wikipedia.org/wiki/Network_Time_Protocol)
Tjenesteleverandør velger selv tidskilde, denne bør være lokalisert internt i datasenteret.

### Brannmuråpninger


> * eFormidling ble flyttet til nytt driftsmiljø den 11. desember. Dette medfører at det må åpnes for trafikk fra integrasjonspunktene til de nye IP-adressene.

Har virksomheten spørsmål knyttet til disse endringene kan de sende epost til <a href="mailto:idporten@difi.no">idporten@difi.no</a>

### Brannmuråpninger i testmiljø

Når du installerer den typen eFormidling du skal ta i bruk så må du åpne opp noen brannmuråpninger. 
<!--
En kan også åpne DNS mot domenet ```lb.difi.no``` som dekker alle 3 lastbalansererene. DNS for logging er ```stream.difi.no``` som er utgående TCP. 
-->
Vi anbefaler å åpne mot DNS da dette vil gjøre at eventuelle endringer i ip-adresser blir plukket opp automatisk.


|    Beskrivelse    | IPv4-adresse | IPv6-adresse | Tjeneste |
| ------------- |:-------------:| :-----:| :------:|
| qa-meldingsutveksling.difi.no | 51.144.60.111:443	 | - | Alle |
| qa-stream-meldingsutveksling.difi.no | 	40.74.39.255:443  | - | Alle |
| oidc-ver1.difi.no | 146.192.252.121:443		 | - | Alle |
| oidc-ver2.difi.no | 146.192.252.121:443	 | - | Alle |
| eInnsyn - move-dpe.servicebus.windows.net	 | 13.69.253.135:443 | - | DPE | 
| www.altinn.no | 89.250.123.0:443 | - | DPO |


### Brannmuråpninger i produksjon

|    Beskrivelse    | IPv4-adresse | IPv6-adresse | Tjeneste |
| ------------- |:-------------:| :-----:| :------:|
| meldingsutveksling.difi.no | 51.144.60.163:443	 | - | Alle |
| stream-meldingsutveksling.difi.no | 	40.74.39.254:443  | - | Alle |
| oidc.difi.no | 146.192.252.54:443	 | - | Alle |
| eInnsyn - move-dpe.servicebus.windows.net	 | 13.69.253.135:443 | - | DPE | 
| eInnsyn - move-dpe.servicebus.windows.net	 | 52.169.10.235:5671 | - | DPE | 
| www.altinn.no | 89.250.123.0:443 | - | DPO/DPV |
| meldingsformidler.digipost.no | 146.192.168.126:443 | -  | DPI |
| meldingsformidler.digipost.no | 146.192.168.80:443 | -  | DPI |
| svarut.ks.no | 193.161.171.187:443 | - | DPF |


---

### Installere Java runtime environment (JDK)

> Fra 01.01.19 vil Oracle Java være lisensbasert. Denne kan brukes, eller en kan bruke gratisalternativ som OpenJDK. [Les mer](https://www.oracle.com/corporate/pressrelease/java-se-subscription-offering-062118.html)

Integrasjonspunktet er en Java applikasjon og krever derfor at man har Java(JDK) kjøremiljø installert på serveren den skal kjøre.
For å verifisere om java er installert og hvilken versjon kan du i et kommandolinjevindu bruke kommandoen

```
java -version
```

Integrasjonspunktet krever minimum versjon 1.8.0

### OpenJDK Java 8 (gratis)
Difi har valgt å bruke JDK 8 fra [https://adoptopenjdk.net/](https://adoptopenjdk.net/) med HotSpot som JVM. Denne vil integrasjonspunktet støtte. Det finnes mange ulike tilbydere av OpenJDK for å laste ned en gratisversjon av Java. Her kan en velge den tilbyderen en selv ønsker, men versjon må være Java 8. 

Installasjonsveiledning for OpenJDK finner du her [https://adoptopenjdk.net/installation.html#x64_win-jdk](https://adoptopenjdk.net/installation.html#x64_win-jdk) . Om du bruker et annet OS enn Windows x64 bit kan du velge din platform inne på lenken.

### Oracle Java 8 (lisensbasert)
Dersom Java ikke er installert eller versjonen er for gammel, kan ny versjon lastes ned [her](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) og installeres. Denne vil integrasjonspunktet støtte.

> **NB!** Husk å installere 64-bit Java om du har 64-bit operativsystem! 

### Installere Java Cryptography Extension (JCE)

Bruker du ny versjon av Java, må ny JCE installeres. Last ned JCE fra [Oracles sider](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html)

Det er ikke noen enkel måte å sjekke om Java Cryptography Extension er installert. Ofte kan det enkleste være å bare laste ned og installere JCE, men en du ønsker å sjekke, kan du gå til mappen ```$JAVA_HOME/jre/lib/security``` og sjekke om filene ```US_export_policy.jar``` og ```local_policy.jar``` har nyere dato enn øvrige filer. Hvis datoen er lik, må du installere JCE.
Dersom JCE mangler vil integrasjonspunket stoppe under oppstart og skrive loggmelding om manglende JCE. På nyere Java versjoner må en legge JCE-filene inn i både ```$JAVA_HOME/jre/lib/security/unlimited ``` og ```$JAVA_HOME/jre/lib/security/limited```.

### Virksomhetssertifikat

> * NB! Testmiljø krever **test virksomhetssertifikat**. Produksjonsertifikat vil ikke virke i testmiljø
> * NB2! Produksjonsmiljøet krever virksomhetssertifikat for produksjon. 
> * NB3! Bruk sertifikatet merkt som **Autentiseringssertifikatet**

**Å gjøre:**
1. Anskaffe virksomhetssertifikat
2. Legge sertifikat i Java Key Store.
3. Sende sertifikat til Difi <a href="mailto:idporten@difi.no">idporten@difi.no</a>

**Hvordan?**

[VEILEDNING: Les alt om håndtering av virksomhetssertifikat her](http://difi.github.io/felleslosninger/eformidling_virksomhetssertifikat.html)

Integrasjonspunktet bruker virksomhetssertifikat til kryptering og signering av meldinger som går mellom integrasjonpunkter.
Virksomhetssertifikat som kan benyttes leveres av [Commfides](https://www.commfides.com/e-ID/Bestill-Commfides-Virksomhetssertifikat.html) og [Buypass](http://www.buypass.no/bedrift/produkter-og-tjenester/buypass-virksomhetssertifikat)

***
