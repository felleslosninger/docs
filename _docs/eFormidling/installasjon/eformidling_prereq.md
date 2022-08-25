---
title: Forutsetninger for installasjon
description: Forutsetninger for installasjon
summary: "Forutsetninger for installasjon"

product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_forutsetninger
---

Einnsyn er en prosess der statlige virksomheter gjør metadata for korrespondanse tilgjengelig for offentligheten. Integrasjonspunktet fungerer som et bindeledd mellom eInnsyn-klient brukt av arkivarene og det sentrale eInnsyn-systemet.

For å sette opp integrasjonspunktet til å støtte eInnsyn, må du gjøre følgende: 


## Dette gjør du før installasjon av Integrasjonspunktet

+ Tilgjengelig minne må være minimum 1GB for eInnsyn og minimum 2GB for eFormidling. [Les mer om minne her.]({{site.baseurl}}/docs/eFormidling/Selvhjelp/eformidling_selfhelp#justere-tilgjengelig-minne)
+ Nødvendige brannmuråpninger
+ Java 8 X med JCE installert (JDK)
+ Virksomhetssertifikat utstedt av Buypass eller Commfides. [Les mer](http://difi.github.io/felleslosninger/eformidling_virksomhetssertifikat.html)
+ Tips: Installer integrasjonspunktet og eInnsyn-klient på samme server.

### Tidssynkronisering
Bekreftelse på at bruker er autentisert sendes fra OIDC til ditt integrasjonspunkt i form av en Json Web Token (JWT). En JWT inneholder tidsstempel som angir hvor lenge den er gyldig. Det er derfor viktig at alle servere som kommuniserer via integrasjonspunktet har synkroniserte klokker. OIDC bruker NTP (”network time protocol”) for synkronisering, tidskilden er GPS-basert. Det er videre viktig at alle servere i Circle of Trust er justert korrekt for tidssone og sommertid. (CET / CEST i Norge). Du kan sjekke din klokke [her](https://time.is/)

[For mer informasjon om Network Time Protocol.](https://no.wikipedia.org/wiki/Network_Time_Protocol)
Tjenesteleverandør velger selv tidskilde, denne bør være lokalisert internt i datasenteret.

### Brannmuråpninger
Oversikt over nødvendige brannmuråpninger. Noen gjelder bare bestemte bruksområder (meldingstyper) i eFormidling.


### Brannmuråpninger i testmiljø (QA)

| DNS-navn | IPv4-adresse | Port | Tjeneste | Beskrivelse | Inn-/utgående trafikk |
| :-------- |-------------| :-----:| :----:| :-----| :------|
| **qa-meldingsutveksling.difi.no** | **51.144.60.111** <br/> **51.105.206.80**	 | 443 | **Alle** | eFormidling, diverse tjenester, adresseoppslag m.m. | |
| **qa-stream-meldingsutveksling.difi.no** | **40.74.39.255**  | 443 | **Alle** | eFormidling, logging | |
| oidc-ver1.difi.no | 146.192.252.121	 | 443 | Alle | ID-porten oidc-provider, verifikasjon 1-miljøet | utgående |
| oidc-ver2.difi.no | 146.192.252.152	 | 443 | Alle | ID-porten oidc-provider, verifikasjon 2-miljøet | utgående |
| ver1.maskinporten.no | 146.192.252.118	 | 443 | Alle | Maskinporten | utgående |
| ver2.maskinporten.no | 139.105.36.128/27 <br/> 139.105.36.132	 | 443 | Alle | Maskinporten, ny adresse f.o.m ca 01.09.2022 | utgående |
| efm-dpe-qa.servicebus.windows.net  | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67  | 443 | DPE | Azure Service Bus, HTTP/REST API |
| efm-dpe-qa.servicebus.windows.net  | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67  | 5671 | DPE | Azure Service Bus, AMQP med TLS |
| altinn.no | 89.250.123.0 | 443 | DPO | Altinn formidlingstjeneste |
| tt02.altinn.no | 89.250.123.40 | 443 | DPV | Altinn formidlingstjeneste |
| qaoffentlig.meldingsformidler.digipost.no  | 51.105.206.80/28  | 443  | DPI | Meldingsformidler for DPI-meldinger |
| srest.qa.dataplatfor.ms  | 51.120.49.231 | 443 | DPI | For ny transportinfrastruktur i Digital postkasse, rest-endepunkt aksesspunkt i hjørne 2 |
|  |  20.103.153.55	 | 443 | Alle | Kjøremiljø - "ny" | inngående |
|  | 52.149.75.168	 | 443 | Alle | Kjøremiljø - "gammel" | inngående |

### Brannmuråpninger i produksjon

| DNS-navn | IPv4-adresse | Port | Tjeneste | Beskrivelse | Inn-/utgående trafikk |
| :-------- |-------------| :-----:| :----:| :-----| :------|
| **meldingsutveksling.difi.no** | **51.144.60.163** | 443 | **Alle** | eFormidling, diverse tjenester, adresseoppslag m.m. | |
| **stream-meldingsutveksling.difi.no** | **40.74.39.254**  | 443 | **Alle** | eFormidling, logging | |
| oidc.difi.no | 146.192.252.54	 | 443 | Alle | ID-porten oidc-provider | |
| maskinporten.no | 146.192.252.50 | 443 | Alle | Maskinporten | |
| efm-dpe-prod.servicebus.windows.net	|  13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 | 443 | DPE | Azure Service Bus, HTTP/REST API |
| efm-dpe-prod.servicebus.windows.net	|  13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 | 5671 | DPE |  Azure Service Bus, AMQP med TLS |
| altinn.no | 89.250.123.0 | 443 | DPO/DPV | Altinn formidlingstjeneste|
| meldingsformidler.digipost.no | 51.124.140.176/28| 443  | DPI | Meldingsformidler for DPI-meldinger (16 adresser)|
| srest.dataplatfor.ms  | 51.120.1.137 | 443 | DPI | For ny transportinfrastruktur i Digital postkasse, rest-endepunkt aksesspunkt i hjørne 2|
| svarut.ks.no | 137.221.25.66 <br/> 137.221.28.66 | 443 | DPF | KS FIKS meldingformidler |
|  | 20.82.85.218	 | 443 | Alle | Kjøremiljø - "ny" | inngående |
|  | 51.105.167.136	 | 443 | Alle | Kjøremiljø - "gammel" | inngående |


> **NB!** Maskinporten.no adressa gjeld berre for dei som skal ta i bruk versjon 2.2.1 eller nyare!

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
Digitaliseringsdirektoratet har valgt å bruke JDK 8 fra [https://adooptium.net/](https://adoptium.net/temurin/releases/) med HotSpot som JVM. Denne vil integrasjonspunktet støtte. Det finnes mange ulike tilbydere av OpenJDK for å laste ned en gratisversjon av Java. Her kan en velge den tilbyderen en selv ønsker, men versjon må være Java 8. 

Installasjonsveiledning for OpenJDK finner du her [https://adoptopenjdk.net/installation.html#x64_win-jdk](https://adoptopenjdk.net/installation.html#x64_win-jdk) . Om du bruker et annet OS enn Windows x64 bit kan du velge din platform inne på lenken.

> **NB!** 32-bits Java kan skape utfordringer for minnebruken til integrasjonspunktet, så 64-bits er å foretrekke!
> **NB2!** Nedlasting via Firefox er ustabilt, så bruk en annen nettleser!

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
3. Sende public delen av sertifikatet i .cer eller .crt format til Digitaliseringsdirektoratet <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

**Hvordan?**

[VEILEDNING: Les alt om håndtering av virksomhetssertifikat her]({{site.baseurl}}/docs/eFormidling/installasjon/eformidling_virksert)

Integrasjonspunktet bruker virksomhetssertifikat til kryptering og signering av meldinger som går mellom integrasjonpunkter.
Virksomhetssertifikat som kan benyttes leveres av [Commfides](https://www.commfides.com/e-ID/Bestill-Commfides-Virksomhetssertifikat.html) og [Buypass](https://www.buypass.no/produkter/virksomhetssertifikat-esegl)

***
