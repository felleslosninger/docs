---
title: Endre kontaktopplysninger i KRR
description: Brukerprofil for endring av kontaktopplysninger

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_brukerprofil
---

## Introduksjon

Virksomheter som bruker Kontaktregisteret kan videresende en innlogget bruker til

For at innbygger skal holde sine kontaktopplysninger i KRR oppdatert, vil de hver 90ende dag måtte bekrefte opplysningene ved innlogging gjennom ID-porten.

Det er også mulig å logge direkte inn på tjenesten [Dine kontaktopplysninger](https://brukerprofil.difi.no/minprofil/).

## Hvordan:

be digdir om å legge inn `GOTO-url`  på integrasjonen din.  Dette skjer p.t. manuelt, men vil forhåpentligvis snart bli selvbetjent.

## API-tilgang

Det vil forhåpentligvis snart bli mulig for utvalgte virksomheter å selv endre mobil/epost direkte i Kontaktregisteret, via API-kall.

Merk at slike løsninger må tydelig informere til innbygger om at:
* endringene skjer i det nasjonale kontaktregisteret og gjelder ikke kun hos den enkelte etat
* endring av mobilnummer kan påvirke SMS-basert innlogging med MinID
