---
title: Avtalt meldingsutveksling
description: ""
summary: ""
permalink: eformidling_funksjonalitet_avtalt.html
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling lar din virksomhet sende meldinger som del av avtalt meldingsutveksling.

1. TOC
{:toc}

## Introduksjon

Avtalt meldingsutveksling lar avsender og mottaker utveksle forhåndsbestemte meldinger som kan være strukturere eller
ustrukturerte. Meldingene er ikke forhåndsdefinert i kontekst av eFormidling, men avtales direkte mellom avsender(e) og
mottaker(e).

Avtalt meldingsutveksling representeres med følgende prosesser:

| **Prosessnavn**           | **Prosessidentifikator**                 |
| ------------------------- | ---------------------------------------- |
| Avtalt meldingsutveksling | urn:no:difi:profile:avtalt:avtalt:ver1.0 |

## Meldingsinnhold

Det er bare en dokumenttype som støttes for avtalt meldingsutveksling, og denne er bare støttet av Altinn Formidling.

| **Dokumenttype**                                         | **Meldingstjenester**                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| [Avtalt](eformidling_utvikling_dokumenttype_avtalt.html) | [Altinn Formidling](eformidling_utvikling_altinn_formidling.html) |

## Adressere meldinger

Meldinger adresseres fra avsenders organisasjonsnummer til mottakers organisasjonsnummer.

Fordi prosessen støttes av en enkelt dokumenttype som støttes av en enkelt meldingstjeneste er det ingen
forretningsregler knyttet til valg av disse.

## Sende meldinger

Før en virksomhet sender en melding gjøres et frivillig kapabilitetsoppslag for å se om mottakeren støtter
avtalt-prosessen. I så fall er dokumenttype og meldingstjeneste gitt. Virksomheten bygger så meldingen før den sendes
til integrasjonspunktet. Integrasjonspunktet ruter meldingen til Altinn Formidling.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant C as Adressetjeneste
participant D as Altinn Formidling
A->>B: Kapabilitetsoppslag
B->>C: Kapabilitetsoppslag
A->>B: Utgående melding
B->>D: Utgående melding
</div>

Detaljert beskrivelse av meldingsflyten i de aktuelle meldingstjenestene finnes på:
- [Altinn Formidling](eformidling_utvikling_altinn_formidling.html)

## Motta meldinger

Virksomhetens fagsystem mottar kontinuerlig innkommende meldinger fra virksomhetens integrasjonspunkt som igjen mottar
meldingene fra Altinn Formidling.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant D as Altinn Formidling
D->>B: Innkommende melding
B->>A: Innkommende melding
</div>

Detaljert beskrivelse av meldingsflyten i de aktuelle meldingstjenestene finnes på:
- [Altinn Formidling](eformidling_utvikling_altinn_formidling.html)

## Forutsetninger

- Grensesnittet eFormidling 2 må brukes (BEST/EDU støttes ikke)
- Bruk av Altinn Formidling krever avtale

## Konfigurasjon

Følgende konfigurasjon er nødvendig for full funksjonalitet:

- [Minimal konfigurasjon av integrasjonspunktet](eformidling_konfigurasjon_minimal.html)
- [Konfigurasjon av Altinn Formidling](eformidling_konfigurasjon_altinn_formidling.html)

## Utvikling

- [Eksempel på avtalt_meldingsutveksling](eformidling_utvikling_eksempel_avtalt.html)
