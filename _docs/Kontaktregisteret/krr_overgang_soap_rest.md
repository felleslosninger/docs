---
title: Overgang fra SOAP til REST
description: Overgang fra SOAP til REST for KRR
summary:
permalink: krr_overgang_soap_rest.html
toc: false
sidebar: krr_sidebar
product: KRR

---
SOAP-grensesnittet til KRR blir faset ut 31.12.2021

I den forbindelse må alle som i dag bruker SOAP, sørge for å gå over til å bruke KRR sitt REST-API.

REST-API'et inneholder samme data og funksjonalitet som SOAP-grensesnittet, men kan i tillegg tilby selvbetjening for opprettelse og administrasjon av KRR-klienter.

## Bakgrunn:

Det er flere grunner til at vi ønsker å fase ut SOAP grensesnittet.

- Enklere å bruke og vedlikeholde
- Bedre ytelse
- REST er den foretrukne protokollen for WEB Service i dag i det offentlige
- Støtte for flere dataformat bl.a. JSON
- Å støtte både SOAP og REST gir utfordringer både med ressurser og kompetanse
- Oppslag via SOAP er i dag tett integrert med IDporten, REST går mot et API som er sikret med Maskinporten.


## Hva må gjøres?

Her kommer litt informasjon om hva virksomhetene må gjøre for å komme seg over på REST-grensesnittet.

### Opprette klient via selvbetjening

For å bruke selvbetjening så forutsetter det at din virksomhet har tilgang til Samarbeidsportalen. Opprett bruker med din jobb-adresse og gå til "Min profil" på
[https://samarbeid.digdir.no.](https://samarbeid.digdir.no)

1. Gå til "integrasjoner" i høyremenyen og velg det miljøet du vil opprette klienten i. (*NB! For å opprette klient i produksjonsmiljøet, så må du få delegert rettigheter til dette i Altinn, fra din virksomhet. Prosessen er beskrevet på [Tilgang til produksjonsmiljø.](maskinporten_sjolvbetjening_web.html#tilgang-i-produksjonsmilj%C3%B8)*)

2. Velg "Ny integrasjon"

3. Velg "KRR" som "Difi-tjeneste". Du vil da få tildelt de riktige scopene.

4. Fullfør registreringen og trykk på "Opprett".

5. Ved opprettelse får du en klientID som må brukes i forespørselen mot Maskinporten.


### Sette opp token-forespørsel mot Maskinporten

For å få et access_token til KRR sitt REST-API, må det sendes et JWT-grant til Maskinporten. Vi har en egen side som beskriver [JWT grant.](maskinporten_protocol_jwtgrant.html)

Well-known endepunkter for [Maskinporten](maskinporten_func_wellknown.html)

### Sette opp forespørsel mot KRR sitt endepunkt

Se adressene til de forskjellige endepunktene og videre beskrivelse av hvordan kalle REST-API'et på [Oppslagstjenesten REST.](oppslagstjenesten_rest.html)

### Attributter og navn

Det er noe forskjell i navnene på attributtene i KRR fra SOAP til REST. For oversikt over attributtene kan du gå til [Attributter i KRR.](krr_attributter.html)

## Kontakt

Ved spørsmål eller behov for hjelp, kan dere kontakte oss på servicedesk@digdir.no.
