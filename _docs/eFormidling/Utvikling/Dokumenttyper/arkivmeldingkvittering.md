---
title: "Dokumenttype: Arkivmelding-kvittering"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Dokumenttypen `arkivmelding-kvittering` består av et standard business document (SBD).

Dokumenttypen har identifikatoren `urn:no:difi:arkivmelding:xsd::arkivmelding_kvittering`.

Dokumenttypen sendes som respons til en arkivmelding.

Dokumenttypen sendes alltid med prosessen `urn:no:difi:profile:arkivmelding:response:ver1.0`, uavhengig av hvilken
prosess den opprinnelige arkivmeldingen hadde.

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](standard_sbd).

Dokumenttypen `arkivmelding-kvittering` adresseres fra avsenders organisasjonsnummer til mottakers organisasjonsnummer.

### Forretningsmeldingen

Forretningsmeldingen `arkivmelding-kvittering` er beskrevet under.

> `arkivmelding_kvittering.receiptType` (påkrevd)
>
> Beskriver hva som er resultatet av meldingen kvitteringen gjelder.
>
> | Lovlige verdier                 | `OK`, `NOTSUPPORTED`, `WARNING` og `ERROR` |
> | Standard verdi                  | (ingen)      |
> | Konfigurasjon av standard verdi | Ikke støttet |

> `arkivmelding_kvittering.relatedToMessageId` (påkrevd)
>
> Identifikator for meldingen kvitteringen gjelder.
>
> | Lovlige verdier                 | String       |
> | Standard verdi                  | (ingen)      |
> | Konfigurasjon av standard verdi | Ikke støttet |

> `arkivmelding_kvittering.messages[].code` (frivillig)
>
> Eventuell kode som utdyper resultatet av meldingen kvitteringen gjelder.
>
> | Lovlige verdier                 | String        |
> | Standard verdi                  | (ingen)       |
> | Konfigurasjon av standard verdi | Ikke støttet  |

> `arkivmelding_kvittering.messages[].text` (frivillig)
>
> Eventuell tekst som utdyper resultatet av meldingen kvitteringen gjelder.
>
> | Lovlige verdier                 | String       |
> | Standard verdi                  | (ingen)      |
> | Konfigurasjon av standard verdi | Ikke støttet |

## Beriking og transformasjon

Når en sender en arkivmelding skal en forvente en arkivmelding-kvittering tilbake. Siden tilsvarende konsept ikke finnes
i Altinn Digital Post eller KS SvarUt produserer integrasjonspunktet arkivmelding-kvittering i disse tilfellene. Dette
gjør at avsendersystemet kan ha konsistent oppførsel uavhengig av hvilke meldingstjeneste mottaker nås på.

Når en mottar en arkivmelding skal en sende en arkivmelding-kvittering tilbake. Siden tilsvarende konsept ikke finnes i
KS SvarUt vil arkivmelding-kvittering i dette tilfellet ikke bli videreformidlet til mottaker. Dette gjør at
mottakersystemet kan ha konsistent oppførsel uavhengig av hvilke meldingstjeneste avsender benyttet.

Ved bruk av integrasjonspunktets grensesnitt `BEST/EDU` transformerer integrasjonspunktet utgående BEST/EDU AppReceipt
til arkivmelding-kvittering. 

Ved bruk av integrasjonspunktets grensesnitt `BEST/EDU` transformerer integrasjonspunktet innkommende
arkivmelding-kvittering til BEST/EDU AppReceipt.

## Neste steg

- [Eksempel på saksbehandling](../Eksempel/saksbehandling)
