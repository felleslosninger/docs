---
title: Teste og verifisere forsendelser
description: Teste og verfisere forsendelser
summary: "Liten guide til testing og verfisering av forsendelser eFormidling"
permalink: eformidling_verifisere_forsendelser.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

Før en tar i bruk eFormidling er det viktig å verifisere både mottak og sending av forsendelser. Dette er det siste steget før virksomheten din kan ta i bruk eFormidling. Denne guiden er ment som en rettesnor for testing og verifisering i produksjonsmiljøet.

## Hva må jeg huske på?

- Dette bør gjøres sammen med en person fra arkivet som er kjent med sak/arkiv/fagsystemet til virksomheten.
- Avtal med idporten@difi.no når dere vil verifisere så vi kan åpne tilganger på vår side. Definer en tidsramme for testing.
- Husk å teste alle meldingstyper som virksomheten skal benytte.
- Test gjerne flere forsendelser per meldingstype og varier størrelse, vedlegg osv.
- **NB!** Når testing foregår kan virksomheten motta reelle forsendelser i mellomtiden. Det er viktig at virksomheten er obs på dette så de ikke går glipp av viktige forsendelser.
- Om noe ikke skulle fungere gi straks beskjed til idporten@difi.no så vi kan fjerne tilganger og feilsøke problemet.
- Reelle må forsendelser som mottas uten at alt fungerer må sjekkes. Varsle avsender og be de sende på nytt.

## Hvordan tester jeg?

### DPO - Digital post til offentlig virksomhet
Meldinger mellom offentlige virksomheter som bruker integrasjonspunktet. En liste over virksomheter som bruker DPO kan dere finne her under [Virksomheter som har tilgang til eFormidling](https://samarbeid.difi.no/felleslosninger/eformidling).

Her må en teste både sending og mottak.

### DPV - Digital post til virksomheter
Meldinger til en virksomhets postboks hos Altinn. Kan testes med alt fra privat foretak til vanlig virksomhet.

Her skal kun sending testes.

### DPF - Digital post til FIKS meldingsformidler
Meldinger til kommuner og andre virksomheter som bruker FIKS meldingsformidler. Hør med din kommune om de bruker FIKS. (TODO: evt skaffe ei liste over FIKS brukarar)

Her må en teste både sending (svarUt) og mottak (svarInn).

### DPI - Digital post til innbygger
Meldinger sendt til innbyggers digitale postkasse. 

Her skal kun sending testes.
