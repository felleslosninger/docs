---
title: "Dokumenttype: eInnsyn-kvittering"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Dokumenttypen `eInnsyn-kvittering` består av et standard business document (SBD).

Dokumenttypen har identifikatoren `urn:no:difi:einnsyn:xsd::einnsyn_kvittering`.

Dokumenttypen sendes som respons til en publisering.

Dokumenttypen sendes alltid med prosessen `urn:no:difi:profile:einnsyn:response:ver1.0`, uavhengig av hvilken prosess
den opprinnelige publiseringen hadde.

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](standard_sbd).

Dokumenttypen `eInnsyn-kvittering` adresseres fra avsenders organisasjonsnummer til Digdirs organisasjonsnummer.

### Forretningsmeldingen

Forretningsmeldingen `eInnsyn-kvittering` er beskrevet under.

> `einnsyn_kvittering.dokumentId` (påkrevd)
>
> Identifikator for det publisert dokumentet.
>
> | Lovlige verdier                 | String       |
> | Standard verdi                  | (ingen)      |
> | Konfigurasjon av standard verdi | Ikke støttet |

> `einnsyn_kvittering.status` (påkrevd)
>
> Status for det publiserte dokumentet.
> 
> Merk at dette feltet er et JSON-objekt enkodet som string. Se beskrivelse på:
> 
> - [Kvittering på publisert data](https://docs.digdir.no/docs/eInnsyn/datamodell/publisering_til_einnsyn#kvittering-på-publisert-data) (ekstern lenke)
>
> | Lovlige verdier                 | String       |
> | Standard verdi                  | (ingen)      |
> | Konfigurasjon av standard verdi | Ikke støttet |

> `einnsyn_kvittering.referanseType` (påkrevd)
>
> Referansetype.
>
> | Lovlige verdier                 | `innsynskrav` eller `publisering` |
> | Standard verdi                  | (ingen)                           |
> | Konfigurasjon av standard verdi | Ikke støttet                      |

## Neste steg

- [Eksempel på journalpost til eInnsyn](../Eksempel/journalpost)
- [Eksempel på møte til eInnsyn](../Eksempel/mote)
