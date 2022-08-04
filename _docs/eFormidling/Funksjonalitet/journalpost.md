---
title: Journalpost til eInnsyn
description: ""
summary: ""
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
- [Teknisk dokumentasjon for eInnsyn](/docs/eInnsyn/) (ekstern lenke)

Publisering av journalpost representeres med følgende prosess for mottaker:

| **Prosessnavn** | **Prosessidentifikator**                       |
| --------------- | ---------------------------------------------- |
| Journalpost     | urn:no:difi:profile:einnsyn:journalpost:ver1.0 |

Publisering av journalpost representeres med følgende prosess for avsender:

| **Prosessnavn** | **Prosessidentifikator**                     |
| --------------- | -------------------------------------------- |
| eInnsyn-respons  | urn:no:difi:profile:einnsyn:response:ver1.0 |

En virksomhet opptrer alltid som avsender, mens mottaker av journalpost alltid er eInnsyn ved Digdir.

## Meldingsinnhold

Det er bare en dokumenttype som støttes for å publisere journalpost til eInnsyn, og denne er bare støttet av eInnsyns
meldingstjeneste.

| **Dokumenttype**                                      | **Meldingstjenester**                                                                 |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [Publisering](../Utvikling/Dokumenttyper/publisering) | [eInnsyns meldingstjeneste](../Utvikling/Meldingstjenester/einnsyns_meldingstjeneste) |

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

Nærmere beskrivelse av de aktuelle meldingstjenestene finnes på:
- [eInnsyns meldingstjeneste](../Utvikling/Meldingstjenester/einnsyns_meldingstjeneste)

## Varsling

Avsenders system mottar statusmeldinger når en melding blir levert. Avsenders system mottar også statusmeldinger ved
feilsituasjoner og når en melding ikke blir levert innenfor den definerte levetiden. Avsenders system kan varsle
avsenderen om både vellykkede sendinger og avvik.

## Forutsetninger

- Grensesnittet eFormidling 2 må brukes (BEST/EDU støttes ikke)
- Bruk av eInnsyn krever avtale

## Konfigurasjon

Følgende konfigurasjon er nødvendig for full funksjonalitet:

- [Minimumskonfigurasjon av integrasjonspunktet](../Drift/installasjon#minimumskonfigurasjon)
- [Konfigurasjon av eInnsyns meldingstjeneste](../Drift/installasjon#konfigurere-einnsyns-meldingstjeneste-dpe)

## Utvikling

Grensesnitt:
- [eFormidling 2](../Utvikling/integrasjonspunkt_eformidling2_api)

Dokumenttyper:
- [Publisering](../Utvikling/Dokumenttyper/publisering)

Eksempler:
- [Eksempel på journalpost til eInnsyn](../Utvikling/Eksempel/journalpost)
