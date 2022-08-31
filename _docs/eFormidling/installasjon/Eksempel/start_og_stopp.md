---
title: Start og stopp
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_ip_run
---

Her er alternative måter en kan bruke til å kjøre integrasjonspunktet og KOSMOS.

1. TOC
{:toc}

## Integrasjonspunktet

Det finnes flere måter å kjøre integrasjonspunktet på. Den vi anbefaler for enkel start/stopp i tillegg til tilgangsstyring er å installere integrasjonspunktet som en tjeneste. Her vil vi vise tre forskjellige måter å kjøre integrasjonspunktet på.

### Alt 1: Kjøre integrasjonspunktet som en tjeneste

Integrasjonspunktet kan også installeres som en tjeneste på server. For å gjøre dette kan en laste ned en tredjepartsprogramvare og sette opp en egen liten config-fil.

Dokumentasjonen på programvaren du trenger ligger [på github](https://github.com/kohsuke/winsw). Du trenger to filer: .exe -filen fra dette programmet og en egen .xml-fil for å fortelle .exe -filen hvilke innstillinger som skal brukes. Dette er samme konseptet som [einnsyn-klient installasjonen er basert på](https://docs.digdir.no/docs/eInnsyn/). 

1. Last ned Winsw.exe [her](https://github.com/kohsuke/winsw/releases). Mer informasjon om hvilken versjon du skal velge står [her: Supported .NET versions](https://github.com/kohsuke/winsw#user-content-supported-net-versions). Om du er usikker på hvilken .NET versjon du har, [les her](https://support.microsoft.com/nb-no/help/318785/how-to-determine-which-versions-and-service-pack-levels-of-the-microso)
2. Last ned konfigurasjonsfila vår for [testmkosmosiljø]({{site.baseurl}}/resources/eformidling/integrasjonspunkt-staging.xml) eller [produksjonsmiljø]({{site.baseurl}}/resources/eformidling/integrasjonspunkt-prod.xml)
3. Endre navn på .exe fila og xml-filene til de navnene du ønsker. For eksempel integrasjonspunkt-service.exe og integrasjonspunkt-service.xml. (begge må ha samme navn)
4. Legg begge disse filene i integrasjonspunktmappa di.
5. Endre versjonsnummeret på integrasjonspunkt-%versjonsnr%.jar til å være lik din versjon
* For å installere tjenesten gjør du følgende:
  - åpne kommandovindu som administrator og naviger til integrasjonspunktmappa. F.eks. ```cd c:\integrasjonspunkt```. Kjør så følgende kommando
  ```
  integrasjonspunkt-service.exe install
  integrasjonspunkt-service.exe start
  ```

I denne config-fila er det lagt inn automatisk loggrotering ved 10MB størrelse og 8 filer vil bli beholdt. Dette kan endres til ønsket størrelse ved å endre ```<sizeThreshold>```variabelen.  Om du ikke ønsker loggrotering kan du fjerne hele ```<logmode>``` fra integrasjonspunkt-service.xml

Loggene for denne tjenesten vil i utgangspunktet bli skrevet til feks ```c:\integrasjonspunkt\integrasjonspunkt-logs``` og filen integrasjonspunkt-service.out. Innholdet i denne er veldig likt innholdet i application.log filen.

#### Kjøre med lavest mulige rettigheter

Vi anbefaler å kjøre integrasjonspunktet med en minste rettighetsbruker. For å endre hvilken bruker som kjører tjenesten ved å høyreklikke på den, velge "properties" og så velge "logg på" fanen. [Hvordan opprette en minste rettighetsbruker.](#alt-3-kj%C3%B8re-via-task-scheduler-med-minste-rettigheter)

#### Loggrullering

Om integrasjonspunktet ditt er satt opp til å kjøre som en Windows-tjeneste så kan en enkelt også aktivere loggrullering.

Du kan rotere logger på størrelse og samtidig velge hvor mange en ønsker å ta vare på. standardstørrelsen her er 10MB, denne kan du endre til ønsket størrelse. Antall filer som blir tatt vare på er 8. Dette kan også endres. Sørg for at dette er innenfor ``` <service> </service> ``` taggen slik som resten av konfigurasjonen.

```
<log mode="roll-by-size">
	<sizeThreshold>10240</sizeThreshold>
	<keepFiles>8</keepFiles>
</log> 
```

Ferdig konfigurert ser det feks slik ut:

```
<service>
            <id>einnsyn-integrasjonspunkt</id>
            <name>einnsyn-integrasjonspunkt</name>
            <description>Klient for opplasting av journaldata og nedlasting av innsynskrav</description>
            <argument>-Xmx2048m</argument>
            <argument>-jar</argument>
            <argument>integrasjonspunkt-2.0.7.jar</argument>
            <argument>--app.logger.enableSSL=false</argument>
            <logpath>%BASE%/integrasjonspunkt-logs</logpath>
            <log mode="roll-by-size">
                <sizeThreshold>10240</sizeThreshold>
                <keepFiles>8</keepFiles>
            </log>
            <executable>java</executable>
</service>
```

#### Oppgradere integrasjonspunkt som kjører som en tjeneste

Last ned den siste versjon av integrasjonspunkt[versjonsnr].jar filen og legg den i integrasjonspunkt-mappen. Om du har integrasjonspunkt installert som en tjeneste så må du endre versjonsnummer i integrasjonspunkt-service.xml-filen og dermed reinstallere tjenesten.

I integrasjonspunkt-service.xml-filen er det denne linjen som må oppdateres med korrekt(nytt) versjonsnummer: ```<argument>integrasjonspunkt-2.0.X.jar</argument>```.

Når du gjør endringer i versjon / integrasjonspunkt-service.xml fil så må du reinstallere tjenesten. Det gjør du ved å åpne kommandovindu som administrator og navigere til integrasjonspunktmappa. Kjør så følgende kommandoer.

```
integrasjonspunkt-service.exe stop
integrasjonspunkt-service.exe uninstall
integrasjonspunkt-service.exe install
integrasjonspunkt-service.exe start
```

Da er tjenesten reinstallert og restartet.

### Alt 2: Kjøre integrasjonspunktet fra kommandovindu

Integrasjonspunktet startes fra kommandolinjen med følgende kommandoer for henholdsvis test og produksjon. For å starte integrasjonspunktet kreves visse minimum brukerrettigheter, [les mer om dette her](#alt-3-kj%C3%B8re-via-task-scheduler-med-minste-rettigheter). Eller så kan en eventuelt starte kommandovinduet som administrator og dermed også ha rettigheter til å starte det.

#### TEST
```powershell
java -Xmx2048m -jar -Dspring.profiles.active=staging integrasjonspunkt-[versjon].jar  
```

#### PROD
```powershell
java -Xmx2048m -jar integrasjonspunkt-[versjon].jar 
```

Sjekk i nettleser når Integrasjonspunktet har startet, som gir response i form av en wsdl.

```
http://localhost:<port-til-integrasjonspunkt>/noarkExchange?wsdl
```

For å sjekke helse på integrasjonspunktet
``` 
http://localhost:<port-til-integrasjonspunkt>/manage/health
```

Merk: Om du kjører integrasjonspunktet fra kommandolinjen så må dette vinduet stå åpent. Eventuelt så kan du endre ```java -jar``` i kommandoen til ```javaw -jar```. Da vil det kjøre uten kommandovinduet, men du vil måtte lukke det ved å finner prosessen i task manager / oppgavebehandling og stoppe den der. 

#### Oppgradere integrasjonspunkt som kjører fra kommandovindu

Last ned den siste versjon av integrasjonspunkt[versjonsnr].jar filen og legg den i integrasjonspunkt-mappen. Dermed må du bytte ut versjonsnummeret i din oppstartskommando.

### Alt 3: Kjøre via task scheduler med minste rettigheter

Når en skal starte integrasjonspunktet så kreves det visse rettigheter på denne brukeren for at programmet skal kunne fungere. 

**Opprette Lokal bruker type user:**

%servernavn%\integrasjonspunkt
 
**Sette rettigheter for bruker i local security policy (deaktivere påloggingsmulighet):**

- Deny log on locally
- Deny log on thru remote desktop service 
- Deny access to this computer from the network 
- Log on as a batch job (for å kunne kjøre taskscheduler)
 
**Bruker må ha tilgang på mappen der integrasjonspunktfilene ligger**

Egenskaper på mappen
  * Security:
    * Legg til integrasjonspunkt brukeren med modify rettigheter
    
**Bruker må ha modify tilgang på Windows EventLog**

Registry Editor
  * Permissions på HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog
  * Legg til integrasjonspunkt brukeren med modify rettigheter på Security "mappe".
  
#### Kjøre kommandoen i "Task Scheduler"

**general:**

user: %servernavn%\integrasjonspunkt
- Run whether user is logged on or not
 
**Trigger:**
* At startup
   * Edit action
   * Program/script: JAVA
   * add argument (optional):
        * -jar integrasjonspunkt-%versjonsnr%.jar 
   * Start in (optional):
        * "disk:\mappenavn» til integrasjonspunktet"


![Taskscheduler]({{site.baseurl}}/images/eformidling/taskscheduler.PNG)

Merk: om du skal starte integrasjonspunktet i staging-miljø må du bruke følgende argument i stedet: ```-jar -Dspring.profiles.active=staging integrasjonspunkt-%versjonsnr%.jar ```

#### Oppgradere integrasjonspunkt som kjører via task scheduler

Last ned den siste versjon av integrasjonspunkt[versjonsnr].jar filen og legg den i integrasjonspunkt-mappen. Dermed må du bytte ut versjonsnummeret i din task. Under argument (optional)

## KOSMOS

### Starte som Windows-teneste

> Køyrer du allereie integrasjonspunktet som ei teneste så må denne tenesta stoppes til fordel for KOSMOS slik at det er KOSMOS som styrer oppstart (inkl. ønska versjon) av integrasjonspunktet

Vi har lagt opp til at KOSMOS kan køyrast som ei Windows-teneste vha jar-wrapperen https://github.com/kohsuke/winsw. Følg veiledninga og bruk konfigurasjonen under. Dette er same wrapper som vi har nytta for [integrasjonspunktet](#alt-1-kj%C3%B8re-integrasjonspunktet-som-en-tjeneste) og [einnsyn](https://docs.digdir.no/docs/eInnsyn/) før. 

> Lagre konfigurasjonsfila fila som ```kosmos-service.xml``` og *winsw.exe* fila endrast til ```kosmos-service.exe``` .
Om du allereie har integrasjonspunktet som Windows-service så kan du benytte samme .exe fil ved å endre namn frå til dømes: ```integrasjonspunkt-service.exe``` til ```kosmos-service.exe```. Du treng ikkje ```integrasjonspunkt-service.xml``` når du bruker KOSMOS, men du må fortsatt ha ```integrasjonspunkt-local.properties.```

Om du har alt i samme katalog treng du kun endre versjonsnamnet "X.Y.Z" frå følgande konfigurasjon:
```
<service>
  
  <!-- ID of the service. It should be unique accross the Windows system-->
  <id>kosmossvc</id>
  <!-- Display name of the service -->
  <name>Kosmos Service</name>
  <!-- Service description -->
  <description>Keeps the integrasjonspunkt application up-to-date.</description>
  
  <!-- Path to the executable, which should be started -->
  <executable>java</executable>
    <arguments>-jar %BASE%\kosmos-X.Y.Z.jar --spring.profiles.active=production --spring.config.additional-location=file:%BASE%\integrasjonspunkt-local.properties</arguments>
  <logpath>%BASE%\kosmos-logs</logpath>
  
  <log mode="roll-by-size">
    <sizeThreshold>10240</sizeThreshold>
    <keepFiles>8</keepFiles>
  </log>
</service>
```
*[Last ned konfigurasjonsfila her]({{site.baseurl}}/resources/eformidling/kosmos-service.xml)*

> **Merk:** Visst du har mellomrom i mappenamn i stien bør du endre %BASE% til absolutt sti. Døme: *C:\\"kosmos app"\\sti\\til\\her\\kosmos.X.Y.Z.jar*

Døme: No bør du ha desse filene i liggande i mappa.
    
![Filer for å køyre applikasjon som Windows wrapper]({{site.baseurl}}/images/eformidling/kosmos-filer.PNG)

### Starte frå kommandolinja
For å starte frå kommandolinja kan du bruke følgande kommando:

**I produksjon**
```java -jar -Dspring.profiles.active=production kosmos-x.y.z.jar```

**I staging**
```java -jar -Dspring.profiles.active=staging kosmos-x.y.z.jar```

### Starte i Linux
For å starte kan ein bruke samme kommando som over, men om ein ynskjer å starte KOSMOS som ei bakgrunnsteneste kan ein legge på ein ampersand på slutten av kommandoen. Her treng du sjølvsagt ikkje wrapper filene som vist på biletet over, men heller ha ein mappestruktur som liknar på dette: 

![Filer for å køyre applikasjon i linux]({{site.baseurl}}/images/eformidling/kosmos-linux-filer.PNG)

Døme:
```java -jar -Dspring.profiles.active=staging kosmos-x.y.z.jar &```

Like etter at kommandoen er eksekvert vil du få returnert ein PID for prosessen. Denne kan nyttast om du treng å stoppe prosessen. Du vil også kunne finne den ved å bruke *htop* og sjå etter kommandoen, eller i *top* og stenge ned java prosessen. Integrasjonspunktet startar som eigen Java-prosess. 
