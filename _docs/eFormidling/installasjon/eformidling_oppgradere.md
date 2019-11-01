---
title: Oppgradere integrasjonspunktet til ny versjon
description: Hvordan man oppgraderer integrasjonspunktet til ny versjon.
summary: "Hvordan man oppgraderer integrasjonspunktet til ny versjon."

permalink: eformidling_ip_upgrade.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

## Oppgradere integrasjonspunktet

Nyeste versjonen som kan lastes ned [her.](https://beta-meldingsutveksling.difi.no/service/local/repositories/releases/content/no/difi/meldingsutveksling/integrasjonspunkt/2.0.6/integrasjonspunkt-2.0.6.jar) 


Hva må gjøres? 

Vi anbefaler å ta backup av integrasjonspunkt-mappen før du begynner.

1. Stopp integrasjonspunktet.
2. Last ned [nytt integrasjonspunkt](https://beta-meldingsutveksling.difi.no/service/local/repositories/releases/content/no/difi/meldingsutveksling/integrasjonspunkt/2.0.6/integrasjonspunkt-2.0.6.jar) og legg integrasjonspunkt[versjonsnr].jar filen inn i mappen med det gamle integrasjonspunktet.
3. Oppdater versjonsnummer i din tjeneste (xml-fil), scheduled task eller kommando i konsollvindu. Se lenger nede på siden for mer informasjon.
4. Start integrasjonspunktet. 



> Den 23. september 2019 ble det tilgjengeliggjort den første versjonen av integrasjonspunktet med NextMove. Ny generasjon 2.0.X av integrasjonspunktet inneholder vesentlige endringer. 
> Alle må oppgradere. Eldre versjoner enn 2.0.X av integrasjonspunktet fungerer ikke etter mandag 23. september 2019. Vi anbefaler å oppgradere integrasjonspunktet til den nyeste versjonen

---

Under har du tre alternative måter for å kjøre integrasjonspunktet. 

### Alternativ 1: Reinstallere en integrasjonspunkt tjeneste
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
