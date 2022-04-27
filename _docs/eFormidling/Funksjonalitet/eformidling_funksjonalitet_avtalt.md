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

Avtalt meldingsutveksling representeres med følgende prosess for mottaker:

| **Prosessnavn**           | **Prosessidentifikator**                 |
| ------------------------- | ---------------------------------------- |
| Avtalt meldingsutveksling | urn:no:difi:profile:avtalt:avtalt:ver1.0 |

Avtalt meldingsutveksling representeres med følgende prosess for avsender:

| **Prosessnavn** | **Prosessidentifikator**                   |
| --------------- | -------------------------------------------|
| Avtalt-respons  | urn:no:difi:profile:avtalt:response:ver1.0 |

Vanligvis opptrer en virksomhet både som avsender og mottaker, men det er også mulig å bare opptre som avsender.

## Meldingsinnhold

Det er bare en dokumenttype som støttes for avtalt meldingsutveksling, og denne er bare støttet av eFormidlings
meldingstjeneste.

| **Dokumenttype**                                         | **Meldingstjenester**                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| [Avtalt](eformidling_utvikling_dokumenttype_avtalt.html) | [eFormidlings meldingstjeneste](eformidling_utvikling_eformidlings_meldingstjeneste.html) |

I tillegg har eFormidling interne dokumenttyper som brukes for å signalisere tilbake fra mottaker til avsender om en
melding ble levert til integrasjonspunktet eller om levering feilet. Dette er interne kontrollmeldinger som håndteres av
integrasjonspunktet. Bare integrasjoner uten integrasjonspunkt skal bruke disse dokumenttypene.

| **Dokumenttype**                                         | **Meldingstjenester**                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| [Status](eformidling_utvikling_dokumenttype_status.html) | [eFormidlings meldingstjeneste](eformidling_utvikling_eformidlings_meldingstjeneste.html) |
| [Feil](eformidling_utvikling_dokumenttype_feil.html)     | [eFormidlings meldingstjeneste](eformidling_utvikling_eformidlings_meldingstjeneste.html) |

## Adressere meldinger

Meldinger adresseres fra avsenders organisasjonsnummer til mottakers organisasjonsnummer.

Fordi prosessen støttes av en enkelt dokumenttype som støttes av en enkelt meldingstjeneste er det ingen
forretningsregler knyttet til valg av disse.

## Sende meldinger

Før en virksomhet sender en melding gjøres et frivillig kapabilitetsoppslag for å se om mottakeren støtter
avtalt-prosessen. I så fall er dokumenttype og meldingstjeneste gitt. Virksomheten bygger så meldingen før den sendes
til integrasjonspunktet. Integrasjonspunktet ruter meldingen til eFormidlings meldingstjeneste.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant C as Adressetjeneste
participant D as eFormidlings meldingstjeneste
A->>B: Kapabilitetsoppslag
B->>C: Kapabilitetsoppslag
A->>B: Utgående melding
B->>D: Utgående melding
</div>

Nærmere beskrivelse av de aktuelle meldingstjenestene finnes på:
- [eFormidlings meldingstjeneste](eformidling_utvikling_eformidlings_meldingstjeneste.html)

## Motta meldinger

Virksomhetens fagsystem mottar kontinuerlig innkommende meldinger fra virksomhetens integrasjonspunkt som igjen mottar
meldingene fra eFormidlings meldingstjeneste.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant D as eFormidlings meldingstjeneste
D->>B: Innkommende melding
B->>A: Innkommende melding
</div>

Nærmere beskrivelse av de aktuelle meldingstjenestene finnes på:
- [eFormidlings meldingstjeneste](eformidling_utvikling_eformidlings_meldingstjeneste.html)

## Varsling

Avsenders system mottar statusmeldinger når en melding blir levert. Avsenders system mottar også statusmeldinger ved
feilsituasjoner og når en melding ikke blir levert innenfor den definerte levetiden. Avsenders system kan varsle
avsenderen om både vellykkede sendinger og avvik.

eFormidling sender i tillegg epost-varsel om eventuelle avvik til avsenders definerte varslingspunkt. Varsel samles opp
og sendes periodisk.

## Forutsetninger

- Grensesnittet eFormidling 2 må brukes (BEST/EDU støttes ikke)
- Bruk av eFormidlings meldingstjeneste krever avtale

## Konfigurasjon

Følgende konfigurasjon er nødvendig for full funksjonalitet:

- [Minimal konfigurasjon av integrasjonspunktet](eformidling_konfigurasjon_minimal.html)
- [Konfigurasjon av eFormidlings meldingstjeneste](eformidling_konfigurasjon_eformidlings_meldingstjeneste.html)

## Utvikling

- [Eksempel på avtalt_meldingsutveksling](eformidling_utvikling_eksempel_avtalt.html)
