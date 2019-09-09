---
title: Oppgradere integrasjonspunktet til ny versjon
description: Hvordan man oppgraderer integrasjonspunktet til ny versjon.
summary: "Hvordan man oppgraderer integrasjonspunktet til ny versjon."

permalink: eformidling_ip_upgrade.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

## Oppgradere til integrasjonspunkt 2.0.0

23 september er integrasjonspunkt med NextMove tilgjengelig og alle må oppgradere. [Last ned her.](https://beta-meldingsutveksling.difi.no/content/repositories/itest/no/difi/meldingsutveksling/integrasjonspunkt/2.0.0-SNAPSHOT/integrasjonspunkt-2.0.0-20190906.141255-47.jar) Hva må gjøres? 

1. Stopp integrasjonspunktet.
2. I mappen med integrasjonspunktet: Her må du gjøre ett av stegene under:
- Slett alle gamle databasefiler. Dette vil være følgende:  ```receipt.mv.db``` og ```receipt.trace.db```. 
- **NB!** Om du ikke har disse filene og heller bruker en egen database(feks MySQL) må du slette denne og peike integrasjonspunktet til en ny database ```spring.datasource.url=```. Legg inn ```spring.jpa.properties.hibernate.jdbc.time_zone=Europe/Oslo``` i *integrasjonspunkt-local.properties* filen.
3. Slett ```activemq-data``` mappa. 
4. Last ned [nytt integrasjonspunkt her](https://beta-meldingsutveksling.difi.no/content/repositories/itest/no/difi/meldingsutveksling/integrasjonspunkt/2.0.0-SNAPSHOT/integrasjonspunkt-2.0.0-20190906.082318-42.jar) og legg integrasjonspunkt[versjonsnr].jar filen inn i mappen med det gamle integrasjonspunktet.
5. Oppdater versjonsnummer i din tjeneste (xml-fil), scheduled task eller kommando i konsollvindu. [Se her for generell info](https://difi.github.io/felleslosninger/eformidling_ip_upgrade.html)
6. Start integrasjonspunktet. 

---

## Oppgradere til ny versjon 

For å oppgradere til ny versjon må den siste versjonen av integrasjonspunkt[versjonsnr].jar filen lastes ned. Denne må så legges i integrasjonspunkt-mappen og oppstartskommando/tjeneste må endres til å peke på dette versjonsnummeret.

## [Siste versjon av integrasjonspunktet kan lastes ned her (1.7.94)](https://beta-meldingsutveksling.difi.no/service/local/repositories/releases/content/no/difi/meldingsutveksling/integrasjonspunkt/1.7.94/integrasjonspunkt-1.7.94.jar) 

> Om du oppgraderer fra eldre versjoner kan det bli konflikt i database-filene. Løsningen for dette er å ta backup av og så slette "activemq-data" mappa og "receipt.mv.db" filen som ligg i integrasjonspunktmappen. Da vil en få en "clean" installasjon. Sørg for at dei gamle filene ikkje lenger ligger i mappa før du starter opp.

Under har du tre alternative måter for å kjøre integrasjonspunktet. 

### Alternativ 1: Reinstallere en integrasjonspunkt tjeneste
Last ned den siste versjon av integrasjonspunkt[versjonsnr].jar filen og legg den i integrasjonspunkt-mappen. Om du har integrasjonspunkt installert som en tjeneste så må du endre versjonsnummer i integrasjonspunkt-service.xml-filen og dermed reinstallere tjenesten.

I integrasjonspunkt-service.xml-filen er det denne linjen som må oppdateres med korrekt(nytt) versjonsnummer: ```<argument>integrasjonspunkt-2.0.0.jar</argument>```.

Når du gjør endringer i versjon / integrasjonspunkt-service.xml fil så må du reinstallere tjenesten. Det gjør du ved å åpne kommandovindu som administrator og navigere til integrasjonspunktmappa. Kjør så følgende kommandoer.

```
integrasjonspunkt-service.exe stop
integrasjonspunkt-service.exe uninstall
integrasjonspunkt-service.exe install
integrasjonspunkt-service.exe start
```

Da er tjenesten reinstallert og restartet.



___

### Alternativ 2: oppgradere integrasjonspunkt som er kjørt fra kommandovindu

Last ned den siste versjon av integrasjonspunkt[versjonsnr].jar filen og legg den i integrasjonspunkt-mappen. Dermed må du bytte ut versjonsnummeret i din oppstartskommando. 

> TEST
```powershell
java -jar -Dspring.profiles.active=staging integrasjonspunkt-[versjon].jar --app.logger.enableSSL=false 
```

> PROD
```powershell
java -jar integrasjonspunkt-[versjon].jar --app.logger.enableSSL=false 
```

Sjekk i nettleser når Integrasjonspunktet har startet, som gir response i form av en wsdl.

```
http://localhost:<port-til-integrasjonspunkt>/noarkExchange?wsdl
```

___ 

### Alternativ 3: Oppgradere integrasjonspunkt som kjører via task scheduler

Last ned den siste versjon av integrasjonspunkt[versjonsnr].jar filen og legg den i integrasjonspunkt-mappen. Dermed må du bytte ut versjonsnummeret i din task. Under argument (optional) 

**Trigger:**
* At startup
   * Edit action
   * Program/script: JAVA
   * add argument (optional):
        * -jar **integrasjonspunkt-%versjonsnr%.jar** --app.logger.enableSSL=false
   * Start in (optional):
        * "disk:\mappenavn» til integrasjonspunktet"

		
