---
title: Minimal konfigurasjon
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Minimal konfigurasjon for å kjøre integrasjonspunktet krever port, konfigurasjon av virksomhetssertifikat og organisasjonsnummeret til virksomheten. I tillegg må du aktivere den tjenesten du ønsker å bruke. Feks DPO og DPV, men DPE(eInnsyn) er enabled by default. Integrasjonspunktet har også mange andre konfigurasjonsmuligheter en kan styre via properties, disse finner du på denne siden. 

Minimum for å starte et integrasjonspunkt: 

{% include eformidling/properties/jks_generell.html %} 


### Anbefalt rekkefølge for installasjon av eFormidling

Vi anbefaler å konfigurere integrasjonspunktet i følgende rekkefølge.

1. Minimumskonfigurasjon for å få starte integrasjonspunktet. 
2. Konfigurere sak-arkivsystem til å prate med integrasjonspunktet (under DPO innstillinger i tabellen under)
3. Konfigurere DPO innstillinger (brukernavn og passord) eller DPI.
4. Konfigurere DPV/DPF innstillinger


Vi anbefaler dere å konfigurere DPO før DPV/DPF for å unngå å motta post fra svarUt til virksomhetens SvarInn innboks. Ved å konfigurere DPO først vil dere motta post i sak-arkivsystemet. Om ønsket kan en også sette opp DPI først.

Husk å melde fra til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> når dere har konfigurert slik at Digitaliseringsdirektoratet kan [gi tilganger](../Drift/bestille_tilganger). Ellers vil du få 400 Bad request feil. 

## Neste steg

Utdypende konfigurasjon for hver enkelt tjeneste, egen database, mm. finner du på [tilgjengelige tjenester.](tilgjengelige_tjenester)
