---
title: Backlog 2020
description: Backlog 2020
permalink: Backlog_2020.html
sidebar: oidc
---


Backlog inneheld utviklingstiltak som me ikkje har starta på enno. Det er ei målsetning for Difi å gjennomføre desse i 2020, men det vert ikkje gjeve garantiar.



Releasen vart produksjonssatt 2020-12-31

## Ny funksjonalitet:


#### Modernisere utsendelse av pinkodebrev

Produktet som brukes til å produsere MinID pinkode-brev er end-of-life, og trenger erstattes.




#### Viderutvikling Maskinporten

Behovsdrevet viderutvikling av Maskinporten.

Med leveranse av delegering i eOppslag ved årskiftet, regner vi at hovedvekten av nødvendig funksjonalitet for Maskinporten er ferdig, og produktet går inn i en roligere fase preget av fokus på å øke bruken. Det vil sikkert dukke opp behov i løpet av året som blir vurdert som viktige å få løst.




#### RAR-støtte

Rich autorization requests (RAR) er ein kommande Oauth-spesifikasjon som gjer det mogeleg å be om transaksjonsbaserte samtykker eller mer kompliserte autorisasjonar på ein standardisert måte. I første omgang tenker vi å benytte dette til å bygge den såkalte "Ansattporten", men det er også identifisert behov for å kunne bruke dette til å tilby avgiver/fullmakts-basert innlogging.




#### Støtte random port for native-klienter

Ihht RFC8252 kap 7.3 skal native-klienter (mobil, desktop) kunne støtte redirect-uri på loopback-device på vilkårleg portnummer. Innfører støtte for dette både i klient-registrering og runtime i OIDC provider.




#### Delegering i OIDC

Delegeringsfunksjonaliteten mellom Maskinporten og Altinn Autorisasjon implementeres i OIDC-provider, slik at det blir mulig å bruke delegering for APIer som krever en innlogget bruker.

