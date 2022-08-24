---
title: "Dokumenttype: Innsynskrav"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Dokumenttypen `innsynskrav` består av et standard business document (SBD) og eventuelt et eller flere dokument.

Dokumenttypen har identifikatoren `urn:no:difi:einnsyn:xsd::innsynskrav`.

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](standard_sbd).

Dokumenttypen `innsynskrav` adresseres fra Digdirs organisasjonsnummer til mottakers organisasjonsnummer.

### Forretningsmeldingen

Forretningsmeldingen `innsynskrav` er beskrevet under.

> `innsynskrav.orgnr` (påkrevd)
>
> Organisasjonsnummer for mottaker av innsynskravet.
>
> | Lovlige verdier                 | String        |
> | Standard verdi                  | Ingen         |
> | Konfigurasjon av standard verdi | Ikke støttet  |

> `innsynskrav.epost` (påkrevd)
>
> E-postadresse svaret på innsynskravet ønskes sendt til.
>
> | Lovlige verdier                 | epost-adresse |
> | Standard verdi                  | Ingen         |
> | Konfigurasjon av standard verdi | Ikke støttet  |

## Dokumentet

Sjå
- [Innsynskrav under teknisk dokumentasjon hos eInnsyn](https://docs.digdir.no/docs/eInnsyn/einnsyn_innsynskrav) (ekstern lenke)

## Neste steg

- [Eksempel på innsynskrav](../Eksempel/innsynskrav)
