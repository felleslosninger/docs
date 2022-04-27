---
title: "Dokumenttype: FIKS IO"
description: ""
summary: ""
permalink: eformidling_utvikling_dokumenttype_fiks_io.html
product: eFormidling
sidebar: eformidling_sidebar
---

Alle FIKS IO-meldingsprotokoller er gyldige dokumenttyper i eFormidling.

FIKS IO-dokumenttypene består av et standard business document (SBD) og eventuelt et eller flere dokument.

Dokumenttypenes identifikator tilsvarer den aktuelle FIKS IO-meldingsprotokollen.

- [KS FIKS IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksio/) (ekstern lenke)

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](eformidling_utvikling_standard_sbd.html).

FIKS IO-dokumenttypene adresseres fra avsenders FIKS IO-kontonummer til mottakers FIKS IO-kontonummer.

### Forretningsmeldingen

Forretningsmeldingen `fiksio` har ikke innhold.

## Et eller flere dokument

Hvilke typer dokument som støttes for en gitt FIKS IO-dokumenttype tilsvarer det som støttes av den aktuelle 
FIKS IO-protokollen. 

- [KS FIKS IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksio/) (ekstern lenke)

## Neste steg

- [Eksempel på FIKS IO-meldingsutveksling](eformidling_utvikling_eksempel_fiksio.html)
