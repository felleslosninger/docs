---
title: Journalpost til eInnsyn
description: ""
summary: ""
permalink: eformidling_funksjonalitet_journalpost.html
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling lar din virksomhet publisere journalpost til eInnsyn.

1. TOC
{:toc}

## Introduksjon

eInnsyn er _en søketjeneste for alle som leter etter informasjon knyttet til offentlig sektor_. Journalposter er en del
av innholdet som kan søkes i.

> Bruk av eInnsyn er obligatorisk for de statlige virksomhetene omfattet av forskrift til offentleglova § 6.
>
> [Digitaliseringsrundskrivet](https://www.regjeringen.no/no/dokumenter/digitaliseringsrundskrivet/id2895185/) (ekstern lenke)

> Bruk av eInnsyn er anbefalt for statlige virksomheter som ikke er omfattet av forskrift til offentleglova § 6.
>
> [Digitaliseringsrundskrivet](https://www.regjeringen.no/no/dokumenter/digitaliseringsrundskrivet/id2895185/) (ekstern lenke)

eFormidling brukes for å publisere informasjon til eInnsyn. Vanligvis brukes eFormidling gjennom eInnsyn-klienten, men
dette er en midlertidig løsning frem leverandørene i større grad støtter integrasjon direkte gjennom eFormidling.

Les mer om eInnsyn på:

- [Dette er eInnsyn](https://samarbeid.digdir.no/einnsyn/dette-er-einnsyn/81) (ekstern lenke)
- [Ta i bruk eInnsyn](https://samarbeid.digdir.no/einnsyn/ta-i-bruk-einnsyn/99) (ekstern lenke)
- [Teknisk dokumentasjon for eInnsyn](https://docs.digdir.no/einnsyn_index.html) (ekstern lenke)

Publisering av journalpost representeres med følgende prosess:

| **Prosessnavn** | **Prosessidentifikator**                       |
| --------------- | ---------------------------------------------- |
| Journalpost     | urn:no:difi:profile:einnsyn:journalpost:ver1.0 |

## Meldingsinnhold

Det er bare en dokumenttype som støttes for å publisere journalpost til eInnsyn, og denne er bare støttet av eInnsyns
meldingstjeneste.

| **Dokumenttype**                                                   | **Meldingstjenester**                                                             |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| [Publisering](eformidling_utvikling_dokumenttype_publisering.html) | [eInnsyns meldingstjeneste](eformidling_utvikling_einnsyns_meldingstjeneste.html) |

## Adressere meldinger

Meldinger adresseres fra avsenders organisasjonsnummer til Digdirs organisasjonsnummer.

Fordi prosessen støttes av en enkelt dokumenttype som støttes av en enkelt meldingstjeneste er det ingen
forretningsregler knyttet til valg av disse.

## Sende meldinger

Før en virksomhet sender en melding gjøres et frivillig kapabilitetsoppslag for å se om mottakeren støtter
journalpost-prosessen. I så fall er dokumenttype og meldingstjeneste gitt. Virksomheten bygger så meldingen før den sendes
til integrasjonspunktet. Integrasjonspunktet ruter meldingen til eInnsyns meldingstjeneste.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant D as eInnsyns<br>meldingstjeneste

A->>B: Utgående melding
B->>D: Utgående melding
</div>

Detaljert beskrivelse av meldingsflyten i de aktuelle meldingstjenestene finnes på:
- [eInnsyns meldingstjeneste](eformidling_utvikling_einnsyns_meldingstjeneste.html)

## Varsling

Avsenders system mottar statusmeldinger når en melding blir levert. Avsenders system mottar også statusmeldinger ved
feilsituasjoner og når en melding ikke blir levert innenfor den definerte levetiden. Avsenders system kan varsle
avsenderen om både vellykkede sendinger og avvik.

## Forutsetninger

- Grensesnittet eFormidling 2 må brukes (BEST/EDU støttes ikke)
- Bruk av eInnsyn krever avtale

## Konfigurasjon

Følgende konfigurasjon er nødvendig for full funksjonalitet:

- [Minimal konfigurasjon av integrasjonspunktet](eformidling_konfigurasjon_minimal.html)
- [Konfigurasjon av eInnsyns meldingstjeneste](eformidling_konfigurasjon_einnsyns_meldingtjeneste.html)

## Utvikling

Grensesnitt:
- [eFormidling 2](eformidling_utvikling_integrasjonspunkt_eformidling2_api.html)

Dokumenttyper:
- [Publisering](eformidling_utvikling_dokumenttype_publisering.html)

Eksempler:
- [Eksempel på journalpost til eInnsyn](eformidling_utvikling_eksempel_journalpost.html)
