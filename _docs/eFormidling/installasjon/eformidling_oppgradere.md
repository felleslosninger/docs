---
title: Oppgradere integrasjonspunktet til ny versjon (NextMove)
description: Hvordan man oppgraderer integrasjonspunktet til ny versjon.
summary: "Hvordan man oppgraderer integrasjonspunktet til ny versjon."

permalink: eformidling_ip_upgrade.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

## Oppgradere til integrasjonspunkt 2.0.x

Den 23. september blir integrasjonspunktet 2.0.x (med NextMove) tilgjengelig og alle må oppgradere. [Last ned her.](https://beta-meldingsutveksling.difi.no/content/repositories/releases/no/difi/meldingsutveksling/integrasjonspunkt/2.0.2/integrasjonspunkt-2.0.2.jar) De som vil teste kan gjøre dette i Difis stagingmiljø, men integrasjonspunktet 2.0.x vil ikke fungere i produksjonsmiljøet før mandag 23. september. 

Hva må gjøres? 

Vi anbefaler å ta backup av integrasjonspunkt-mappen før du begynner.

1. Stopp integrasjonspunktet.
2. I mappen med integrasjonspunktet: Her må du gjøre ett av stegene under:
- Slett alle gamle databasefiler. Dette vil være følgende:  ```receipt.mv.db``` og ```receipt.trace.db```. Om du allerede har en 2.0.X versjon heter filene ```integrasjonspunkt.mv.db``` og ```integrasjonspunkt.trace.db```.
- **NB!** Om du ikke har disse filene og heller bruker en egen database(feks MySQL) må du slette denne og peike integrasjonspunktet til en ny database ```spring.datasource.url=```. Legg inn også ```spring.jpa.properties.hibernate.jdbc.time_zone=Europe/Oslo``` i *integrasjonspunkt-local.properties* filen.
3. Slett ```activemq-data``` mappa. 
4. Last ned [nytt integrasjonspunkt](https://beta-meldingsutveksling.difi.no/content/repositories/releases/no/difi/meldingsutveksling/integrasjonspunkt/2.0.2/integrasjonspunkt-2.0.2.jar) og legg integrasjonspunkt[versjonsnr].jar filen inn i mappen med det gamle integrasjonspunktet.
5. Oppdater versjonsnummer i din tjeneste (xml-fil), scheduled task eller kommando i konsollvindu. Se lenger nede på siden for mer informasjon.
6. Start integrasjonspunktet. 

**NB!** Bruker virksomheten eInnsyn? Da må dere også oppgradere eInnsynsklient [her](https://difi.github.io/felleslosninger/einnsyn_oppdatere_tjeneste.html)

---

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
java -jar -Dspring.profiles.active=staging integrasjonspunkt-[versjon].jar 
```

> PROD
```powershell
java -jar integrasjonspunkt-[versjon].jar
```
___ 

### Alternativ 3: Oppgradere integrasjonspunkt som kjører via task scheduler

Last ned den siste versjon av integrasjonspunkt[versjonsnr].jar filen og legg den i integrasjonspunkt-mappen. Dermed må du bytte ut versjonsnummeret i din task. Under argument (optional) 

**Trigger:**
* At startup
   * Edit action
   * Program/script: JAVA
   * add argument (optional):
        * -jar **integrasjonspunkt-%versjonsnr%.jar** 
   * Start in (optional):
        * "disk:\mappenavn» til integrasjonspunktet"


### Sjekk status på Integrasjonspunktet

Sjekk i nettleser når Integrasjonspunktet har startet, som gir response i form av en wsdl.

```
http://localhost:<port-til-integrasjonspunkt>/noarkExchange?wsdl
```

Sjekk helsestatus på Integrasjonspunktet:

```
http://localhost:<port-til-integrasjonspunkt>/manage/health
```
