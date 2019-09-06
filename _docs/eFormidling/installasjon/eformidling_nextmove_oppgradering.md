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
2. I mappen med integrasjonspunktet: Slett gamle alle gamle databasefiler. Dette kan være en eller flere av følgende:  ```integrasjonspunkt.mv.db``` , ```receipt.mv.db``` og ```trace.mv.db```, det spørst hvilken versjon du har. **NB!** Om du ikke har desse filene og heller bruker en egen database(feks MySQL) må du tømme/slette denne og peike integrasjonspunktet til en tom/ny database. Legg også inn ```spring.jpa.properties.hibernate.jdbc.time_zone=Europe/Oslo``` i *integrasjonspunkt-local.properties* filen, eventuelt legg det rett på konfigen som viser til databasen ```spring.datasource.url=jdbc:mysql.....databasenavn?serverTimezone=UTC```
3. Slett ```active-mq``` mappa. 
4. Last ned [nytt integrasjonspunkt her]() og legg integrasjonspunkt[versjonsnr].jar filen inn i mappen der du utførte steg 2 og 3.
5. Oppdater versjonsnummer i din tjeneste (xml-fil), scheduled task eller kommando i konsollvindu. [Se her for generell info](https://difi.github.io/felleslosninger/eformidling_ip_upgrade.html)
6. Start integrasjonspunktet. 
