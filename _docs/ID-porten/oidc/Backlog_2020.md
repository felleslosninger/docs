---
title: Backlog 2020
description: Backlog 2020
permalink: Backlog_2020.html
sidebar: oidc
---


Backlog inneheld utviklingstiltak som me ikkje har starta på enno. Det er ei målsetning for Digitaliseringsdirektoratet å gjennomføre desse i 2020, men det vert ikkje gjeve garantiar.



Releasen vart produksjonssatt 2020-12-31

## Ny funksjonalitet:


#### Altinn Autorisasjons-basert tilgangstyring mot selvbetjenings-web

Det blirt no mogeleg for kundar å peike ut administratorar som skal kunne sjølvbetjene i Produksjon ved å tildele ei spesiell rolle i Altinn. Dette erstatter dagens manuelle innmelding av fødselsnummer.




#### Modernisere utsendelse av pinkodebrev

Produktet som brukes til å produsere MinID pinkode-brev er end-of-life, og trenger erstattes.




#### Viderutvikling Maskinporten

Behovsdrevet viderutvikling av Maskinporten.

Med leveranse av delegering i eOppslag ved årskiftet, regner vi at hovedvekten av nødvendig funksjonalitet for Maskinporten er ferdig, og produktet går inn i en roligere fase preget av fokus på å øke bruken. Det vil sikkert dukke opp behov i løpet av året som blir vurdert som viktige å få løst.




#### Endepunkt for revokerte autorisasjoner

Det kjem eit nytt endepunkt i OIDC som publiserer revokerte app-autorisasjonar.

Funksjonaliteten er primært tiltenkt kundar som har app'ar med svært høg utbreiing, og/eller har veldig høg samtidig bruk, slik at standardisert token introspection for å sjekke om ein autorisasjon framleis er gyldig kan gje ytelsesutfordringar




#### Kreve at alle scope provisjoneres

Per idag må kunder følge ulike prosedyrer alt etter om integrasjonen deira skal konsumerer scopes direkte, kontra scopes som er tilgjenglig for alle eller scopes som krev ekstern delegering.

Dette er forvirrande, og difor endrar vi det slik at alle scopes som ein klient skal kunne forespørre, _alltid_ må vere provisjonert i klient-registreringa.




#### RAR-støtte

Rich autorization requests (RAR) er ein kommande Oauth-spesifikasjon som gjer det mogeleg å be om transaksjonsbaserte samtykker eller mer kompliserte autorisasjonar på ein standardisert måte. I første omgang tenker vi å benytte dette til å bygge den såkalte "Ansattporten", men det er også identifisert behov for å kunne bruke dette til å tilby avgiver/fullmakts-basert innlogging.

