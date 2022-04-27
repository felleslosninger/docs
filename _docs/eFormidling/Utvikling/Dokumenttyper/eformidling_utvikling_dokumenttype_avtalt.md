---
title: "Dokumenttype: Avtalt"
description: ""
summary: ""
permalink: eformidling_utvikling_dokumenttype_avtalt.html
product: eFormidling
sidebar: eformidling_sidebar
---

Dokumenttypen `avtalt` består av et standard business document (SBD) og eventuelt et eller flere dokument.

Dokumenttypen har identifikatoren `urn:no:difi:avtalt:xsd::avtalt`.

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](eformidling_utvikling_standard_sbd.html).

Dokumenttypen `avtalt` adresseres fra avsenders organisasjonsnummer til mottakers organisasjonsnummer.

### Forretningsmeldingen

Forretningsmeldingen `avtalt` er beskrevet under.

> `avtalt.identifier` (påkrevd)
>
> Identifikator for en gitt type avtalt melding. Avtales mellom avsender og mottaker. Gjør det mulig for virksomheter å
> skille ulike typer avtalt meldingsutveksling.
>
>
> | Lovlige verdier                 | String        |
> | Standard verdi                  | Ingen         |
> | Konfigurasjon av standard verdi | Ikke støttet  |

> `avtalt.content` (påkrevd)
>
> Innhold for avtalt melding. Hvilket innhold som støttes for en gitt type avtalt melding avtales mellom avsender og
> mottaker. Gjør det mulig for virksomhetene å inkludere nødvendig innhold i forretningsmeldinger.
>
> | Lovlige verdier                 | Objekt med vilkårlig innhold |
> | Standard verdi                  | Ingen                        |
> | Konfigurasjon av standard verdi | Ikke støttet                 |

## Et eller flere dokument

Hvilke typer dokument som støttes for en gitt type avtalt melding avtales mellom avsender og mottaker.

## Neste steg

- [Eksempel på avtalt meldingsutveksling](eformidling_utvikling_eksempel_avtalt.html)
