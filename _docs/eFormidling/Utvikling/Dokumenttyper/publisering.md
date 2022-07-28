---
title: "Dokumenttype: Publisering"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Dokumenttypen `publisering` består av et standard business document (SBD) og eventuelt et eller flere dokument.

Dokumenttypen har identifikatoren `urn:no:difi:einnsyn:xsd::publisering`.

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](standard_sbd).

Dokumenttypen `publisering` adresseres fra avsenders organisasjonsnummer til Digdirs organisasjonsnummer.

### Forretningsmeldingen

Forretningsmeldingen `publisering` er beskrevet under.

> `innsynskrav.orgnr` (påkrevd)
>
> Organisasjonsnummer for avsender av innsynskravet.
>
> | Lovlige verdier                 | String        |
> | Standard verdi                  | Ingen         |
> | Konfigurasjon av standard verdi | Ikke støttet  |

## Dokumentet

Se

- [Journalpost under teknisk dokumentasjon hos eInnsyn](https://docs.digdir.no/docs/eInnsyn/datamodell/publisering_til_einnsyn) (ekstern lenke)
- [Møte under teknisk dokumentasjon hos eInnsyn](https://docs.digdir.no/docs/eInnsyn/datamodell/publisering_moeter/generelt_om_moetemodellen) (ekstern lenke)

## Neste steg

- [Eksempel på journalpost til eInnsyn](../Eksempel/journalpost)
- [Eksempel på møte til eInnsyn](../Eksempel/mote)
