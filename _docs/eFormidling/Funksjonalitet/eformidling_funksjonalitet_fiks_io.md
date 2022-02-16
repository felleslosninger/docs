---
title: FIKS IO-meldingsutveksling
description: ""
summary: ""
permalink: eformidling_funksjonalitet_fiks_io.html
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling lar din virksomhet sende meldinger som del av FIKS IO-meldingsutveksling.

1. TOC
{:toc}

## Introduksjon

FIKS IO-meldingsutveksling lar avsender og mottaker utveksle meldinger som er definert i kontekst av KS FIKS IO.
Meldingene er ikke forhåndsdefinert i kontekst av eFormidling, men protokollene som defineres i FIKS IO støttes.

Alle FIKS IO-meldingsprotokoller er gyldige prosesser i eFormidling. FIKS IO-meldingsutveksling representeres med
følgende prosesser:

| **Prosessnavn**            | **Prosessidentifikator**                                              |
| -------------------------- | --------------------------------------------------------------------- |
| Arkivlett Byggesak         | no.dibk.arkivlett.byggesak.v1                                         |
| Matrikkelføring            | no.ks.fiks.matrikkelfoering.v2                                        |
| (...)                      | (alle FIKS IO-meldingsprotokoller er gyldige prosesser i eFormidling) |

## Meldingsinnhold

Alle FIKS IO-meldingsprotokoller er gyldige dokumenttyper i eFormidling. Prosess og dokumenttype må samsvare for FIKS IO
-meldingsutveksling. Dokumenttypene støttes bare av FIKS IO.

| **Dokumenttype**                                                          | **Meldingstjenester**                            |
| ------------------------------------------------------------------------- | ------------------------------------------------ |
| no.dibk.arkivlett.byggesak.v1                                             | [FIKS IO](eformidling_utvikling_ks_fiks_io.html) |
| no.ks.fiks.matrikkelfoering.v2                                            | [FIKS IO](eformidling_utvikling_ks_fiks_io.html) |
| (alle FIKS IO-meldingsprotokoller er gyldige dokumenttyper i eFormidling) | [FIKS IO](eformidling_utvikling_ks_fiks_io.html) |

## Adressere meldinger

Meldinger adresseres fra avsenders FIKS IO-kontonummer til mottakers FIKS IO-kontonummer.

Fordi prosessene støttes av tilsvarende dokumenttyper som støttes av en enkelt meldingstjeneste er det ingen
forretningsregler knyttet til valg av disse.

## Sende meldinger

Før en virksomhet sender en melding gjøres et frivillig kapabilitetsoppslag for å se om mottakeren støtter den aktuelle
FIKS IO-prosessen. I så fall er dokumenttype og meldingstjeneste gitt. Virksomheten bygger så meldingen før den 
til integrasjonspunktet. Integrasjonspunktet ruter meldingen til FIKS IO.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant C as Adressetjeneste
participant D as FIKS IO
A->>B: Kapabilitetsoppslag
B->>C: Kapabilitetsoppslag
A->>B: Utgående melding
B->>D: Utgående melding
</div>

Detaljert beskrivelse av meldingsflyten i de aktuelle meldingstjenestene finnes på:
- [FIKS IO](eformidling_utvikling_ks_fiks_io.html)

## Motta meldinger

Virksomhetens fagsystem mottar kontinuerlig innkommende meldinger fra virksomhetens integrasjonspunkt som igjen mottar
meldingene fra FIKS IO.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant D as FIKS IO
D->>B: Innkommende melding
B->>A: Innkommende melding
</div>

Detaljert beskrivelse av meldingsflyten i de aktuelle meldingstjenestene finnes på:
- [FIKS IO](eformidling_utvikling_ks_fiks_io.html)

## Forutsetninger

- Grensesnittet eFormidling 2 må brukes (BEST/EDU støttes ikke)
- Bruk av FIKS IO krever avtale

## Konfigurasjon

Følgende konfigurasjon er nødvendig for full funksjonalitet:

- [Minimal konfigurasjon av integrasjonspunktet](eformidling_konfigurasjon_minimal.html)
- [Konfigurasjon av FIKS IO](eformidling_konfigurasjon_fiks_io.html)

## Utvikling

- [Eksempel på FIKS IO-meldingsutveksling](eformidling_utvikling_eksempel_fiksio.html)
