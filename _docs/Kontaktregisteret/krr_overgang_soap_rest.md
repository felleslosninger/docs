---
title: Overgang fra SOAP til REST
description: Overgang fra SOAP til REST for KRR
summary:

toc: false
sidebar: krr_sidebar
product: KRR

redirect_from: /krr_overgang_soap_rest
---
SOAP-grensesnittet til KRR ble faset ut 01.11.2022

I den forbindelse må alle sørge for å gå over til å bruke KRR sitt REST-API.

REST-API'et inneholder samme data og funksjonalitet som SOAP-grensesnittet, men kan i tillegg tilby selvbetjening for opprettelse og administrasjon av KRR-klienter.

## Bakgrunn:

Det er flere grunner til at vi ønsker å fase ut SOAP grensesnittet.

- Enklere å bruke og vedlikeholde
- Bedre ytelse
- REST er den foretrukne protokollen for WEB Service i dag i det offentlige
- Støtte for flere dataformat bl.a. JSON
- Å støtte både SOAP og REST gir utfordringer både med ressurser og kompetanse
- Oppslag via SOAP er i dag tett integrert med ID-porten, REST går mot et API som er sikret med Maskinporten.


## Hva må gjøres?

Her kommer litt informasjon om hva virksomhetene må gjøre for å komme seg over på REST-grensesnittet.

### Opprette klient via selvbetjening

Dette er beskrevet under "Kom i gang":
[https://docs.digdir.no/docs/Kontaktregisteret/krr_opprette_klient](https://docs.digdir.no/docs/Kontaktregisteret/krr_opprette_klient)
