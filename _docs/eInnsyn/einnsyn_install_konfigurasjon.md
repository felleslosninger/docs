---
title: Konfigurasjon av einnsyn-klient
description: Konfigurasjon av einnsyn-klient
summary: "Konfigurasjon av einnsyn-klient ++"
permalink: einnsyn_konfigurasjon.html
sidebar: einnsyn_sidebar
---

## Konfigurasjon av einnsyn-klient.xml filen

Det første som må gjøres er å legge inn korrekte verdier i einnsyn-klient.xml-filen. I utgangspunktet ser denne slik ut:

```java
<service>
	<id>einnsyn-klient</id>
	<name>einnsyn-klient</name>
	<description>Klient for parsing og sending av journaldata</description>
	<env name="USE_IP" value="true"/>
	<env name="RECEIVER_ORGNUMMER" value="991825827" />
	<argument>-jar</argument>
	<argument>-Dapplication.moveUrl=</argument>
	<argument>-Dapplication.inputDirectory=</argument>
	<argument>-Dapplication.orgnummer=</argument>
	<argument>-Dspring.mail.host=</argument>
	<argument>-Dspring.mail.port</argument>
	<argument>-Dspring.mail.username=</argument>
	<argument>-Dspring.mail.password=</argument>
	<argument>-Dlog4j2.formatMsgNoLookups=true</argument>
	<argument>sender-2.0.4.jar</argument>
	<logpath>%BASE%/logs</logpath>
	<executable>javaw</executable>
</service>
```

### Disse fyller du inn

Det som må gjøres her er å fylle inn følgende (ikke fjern ```<argument>``` og ```</argument>```. Du skal fylle inn innimellom de) :
* ```-Dapplication.moveUrl=http://localhost:9093```
  * Denne linker einnsyn-klienten til integrasjonspunktet. Her må du ha med navnet på integrasjonspunktet og porten det kjører på. ```http://localhost:9093``` er standardnavnet.
* ```-Dapplication.inputDirectory=sti til katalog```
  * Dette er mappen som einnsyn-klienten vil lese filer fra. Filer som skal lastes opp til eInnsyn. Etter at en fil er lest herifra vil den forsvinne frå inputDirectory-mappa. Feks: ```-Dapplication.inputDirectory=C:\einnsyn\opplasting``` 
* ```-Dapplication.orgnummer=```
  * Her skal du fylle inn organisasjonsnummeret til din organisasjon. Feks: ```-Dapplication.orgnummer=123456789```
* ```-Dspring.mail.host=```
  * Her må du fylle inn navnet til din e-postserver. Denne skal sende ut e-posten med innsynskravet. Deres integrasjonspunkt vil motta innsynskravet hos seg for og så deretter fortelle einnsyn-klienten at den må sende e-posten.
  * standardport for ```-Dspring.mail.port``` er 25. Så denne trenger du ikke fylle inn om du bruker port 25.
  * Brukernavn og passord feltet trenger en kun å fylle ut om e-postserveren krever autentisering for sending av e-post.


### Dette kan du også endre

Dette er innstillinger som kan endres, men ikke nødvendigvis må endres for å få tjenesten til å fungere.

* ```<logpath>%BASE%/Loggkatalog</logpath> ``` er for å velge loggkatalog. %BASE% variabelen peker på installasjonsmappen.
* ```<id>einnsyn-klient</id>``` og ```<name>einnsyn-klient</name>``` er for å velge id og navn på tjenesten i listen over Windows tjenester. 

#### Loggrotering
I tillegg kan du legge inn loggrotering om det er ønskelig. Dermed kan du rotere logger på størrelse og velge hvor mange en ønsker å ta vare på. standardstørrelsen her er 10MB, denne kan du endre til ønsket størrelse. Antall filer som blir tatt vare på er 8. Dette kan også endres. Sørg for at dette er innenfor ``` <service> </service> ``` taggen slik som resten av konfigurasjonen.

```
<log mode="roll-by-size">
	<sizeThreshold>10240</sizeThreshold>
	<keepFiles>8</keepFiles>
</log> 
```
### Eksempel på ferdig konfigurert einnsyn-klient.xml

Her er et eksempel på en ferdig konfigurert einnsyn-klient.xml-fil inkludert loggrotering.

``` java
<service>
	<id>einnsyn-klient</id>
	<name>einnsyn-klient</name>
	<description>Klient for parsing og sending av journaldata</description>
	<env name="USE_IP" value="true"/>
	<env name="RECEIVER_ORGNUMMER" value="991825827" />
	<argument>-jar</argument>
	<argument>-Dapplication.moveUrl=http://localhost:9093</argument>
	<argument>-Dapplication.inputDirectory=C:\einnsyn\opplasting</argument>
	<argument>-Dapplication.orgnummer=123456789</argument>
	<argument>-Dspring.mail.host=navnet.til.epost.server</argument>
	<argument>-Dspring.mail.port</argument>
	<argument>-Dspring.mail.username=</argument>
	<argument>-Dspring.mail.password=</argument>
	<argument>sender-2017-11-29T10_48.jar</argument>
	<logpath>%BASE%/logs</logpath>
	<log mode="roll-by-size">
		<sizeThreshold>10240</sizeThreshold>
		<keepFiles>8</keepFiles>
	</log>
	<executable>javaw</executable>
</service>
```	

 
