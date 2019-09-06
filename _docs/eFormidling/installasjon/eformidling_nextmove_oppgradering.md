---
title: Oppgradere til integrasjonspunkt 2.0.0
description: Oppgradere fra gammelt til nytt integrasjonspunkt med NextMove
summary: "Hvordan man oppgraderer fra gammelt til nytt integrasjonspunkt med NextMove"

permalink: eformidling_nextmove_oppgradering.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

## Hva må gjøres?

1. Stopp integrasjonspunktet.
2. I mappen med integrasjonspunktet: Her må du gjøre ett av stegene under:
- Slett alle gamle databasefiler. Dette kan være én eller flere av følgende:  ```integrasjonspunkt.mv.db``` , ```receipt.mv.db``` og ```receipt.trace.db```, det spørst hvilken versjon du har. 
- **NB!** Om du ikke har disse filene og heller bruker en egen database(feks MySQL) må du slette denne og peike integrasjonspunktet til en ny database ```spring.datasource.url=```. Legg inn ```spring.jpa.properties.hibernate.jdbc.time_zone=Europe/Oslo``` i *integrasjonspunkt-local.properties* filen.
3. Slett ```activemq-data``` mappa. 
4. Last ned [nytt integrasjonspunkt her](https://beta-meldingsutveksling.difi.no/content/repositories/itest/no/difi/meldingsutveksling/integrasjonspunkt/2.0.0-SNAPSHOT/integrasjonspunkt-2.0.0-20190906.082318-42.jar) og legg integrasjonspunkt[versjonsnr].jar filen inn i mappen med det gamle integrasjonspunktet.
5. Oppdater versjonsnummer i din tjeneste (xml-fil), scheduled task eller kommando i konsollvindu. [Se her for generell info](https://difi.github.io/felleslosninger/eformidling_ip_upgrade.html)
6. Start integrasjonspunktet. 
