---
title: Flere eInnsyn-klienter på samme integrasjonspunkt
description: Flere eInnsyn-klienter på samme integrasjonspunkt
summary: "Her finner du informasjon om hvordan bruke flere eInnsyn-klienter på samme integrasjonspunkt"
permalink: einnsyn_flere_klienter.html
sidebar: einnsyn_sidebar
---

Når du skal bruke flere integrasjonspunkt eller eInnsyn-klienter på samme server må du bruke forskjellige porter. Om du skal bruke ett integrasjonspunkt og flere einnsyn-klienter må du endre id, navn og port på einnsyn-klient tjenesten. I tillegg må hver eInnsyn-klient ha sin egen inputDirectory-mappe. 
Alt dette endres i einnsyn-klient.xml-filen. I tillegg må du legge til et ekstra argument:

* ```-Dserver.port= ```

Om du skal ha flere integrasjonspunkt installert på samme server må du endre *server.port* i integrasjonspunkt-local.properties for hver instans. Denne må være unik. Du må også da peke ```-Dapplication.moveUrl=``` til å gå mot riktig integrasjonspunkt og port. Porten som integrasjonspunktet og einnsyn-klienten bruker trenger ikke være like. 


``` java
<service>
      <id>einnsyn-klient-2</id> Her må du ha unik ID for prosessen
      <name>einnsyn-klient-2</name> Dette namnet blir det som viser i lista over windows tjenester.
      <description>Klient for parsing og sending av journaldata</description>
      <env name="USE_IP" value="true"/>
      <env name="RECEIVER_ORGNUMMER" value="991825827" />
      <argument>-jar</argument>
      <argument>-Dapplication.moveUrl=</argument> Denne må være unik. Forteller hvilket integrasjonspunkt den kobler til http://localhost:9093 94, 95...
      <argument>-Dapplication.inputDirectory=</argument>
      <argument>-Dapplication.orgnummer=</argument> 
      <argument>-Dserver.port=</argument> Her setter du egen port for denne einnsyn-klienten. For eksempel 9094, 9095, 9096…
      <argument>-Dapplication.senderId=</argument> Dette må settes likt orgnummeret som er satt på .properties filen til integrasjonspunktet. Trenger ikke være likt orgnummeret i -Dapplication.orgnummer
      <argument>-Dspring.mail.host=</argument>
      <argument>-Dspring.mail.port</argument>
      <argument>-Dspring.mail.username=</argument>
      <argument>-Dspring.mail.password=</argument>
      <argument>sender-2.0.1.jar</argument>
      <logpath>%BASE%/logs</logpath>
      <executable>javaw</executable>
</service>
```

Her finner du samme fil uten kommentarer i:

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
        <argument>-Dserver.port=</argument>
	<argument>-Dapplication.senderId=</argument>
	<argument>-Dspring.mail.host=</argument>
	<argument>-Dspring.mail.port</argument>
	<argument>-Dspring.mail.username=</argument>
	<argument>-Dspring.mail.password=</argument>
	<argument>sender-2.0.1.jar</argument>
	<logpath>%BASE%/logs</logpath>
	<executable>javaw</executable>
</service>
```

Om du opplever problemer med at Tomcat port 7000 allerede er i bruk ved oppstart av flere klienter så kan en sette følgende i *einnsyn-klient.xml* filen: 

```
<argument>-Dmanagement.enabled.health=false</argument>
<argument>-Dmanagement.server.port=</argument>
```

Sørg for at ```-Dmanagement.server.port=``` er satt til samme port som ```-Dserver.port=```.

---

### Hvordan skru av mottak av innsynskrav
En kan skru av mottak av innsynskrav på en gitt eInnsyn-klient. Vi anbefaler å skru det av på alle untatt én eInnsyn-klient: 

```
<argument>-Dapplication.retrieveInnsynskrav=false</argument>
```
