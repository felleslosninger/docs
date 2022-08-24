---
title: "Dokumenttype: Status"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Dokumenttypen `status` består av et standard business document (SBD).

Dokumenttypen har identifikatoren `urn:no:difi:eformidling:xsd::status`.

Dokumenttypen er en intern kvittering som brukes i eFormidlings meldingstjeneste og eInnsyns meldingstjeneste. Meldinger
med denne dokumenttypen produseres av integrasjonspunktet for å signalisere en status tilbake til avsender. Dersom en
velger å integrere mot eFormidling uten integrasjonspunkt må integrasjonen sende disse statusmeldingene selv.

Ved bruk av eFormidlings meldingstjeneste sendes dokumenttypen med prosessen `urn:no:difi:profile:arkivmelding:response:ver1.0`.

Ved bruk av eInnsyns meldingstjeneste sendes dokumenttypen med prosessen `urn:no:difi:profile:einnsyn:response:ver1.0`.

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](standard_sbd).

Dokumenttypen `status` adresseres fra avsenders organisasjonsnummer til mottakers organisasjonsnummer.

### Forretningsmeldingen

Forretningsmeldingen `status` er beskrevet under.

> `status.status` (påkrevd)
>
> Beskriver hva som er resultatet av meldingen kvitteringen gjelder.
>
> | Lovlige verdier                 | `MOTTATT`, `LEVERT` |
> | Standard verdi                  | (ingen)             |
> | Konfigurasjon av standard verdi | Ikke støttet        |

## Neste steg

- [Eksempel på saksbehandling](../Eksempel/saksbehandling)
