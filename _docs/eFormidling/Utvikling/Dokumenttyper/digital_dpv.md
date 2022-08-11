---
title: "Dokumenttype: Digital DPV"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Dokumenttypen `digital_dpv` består av et standard business document (SBD), et eller flere dokument og eventuelt en eller
flere utvidelser.

Dokumenttypen har identifikatoren `urn:no:difi:digitalpost:xsd:digital::digital_dpv`.

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](standard_sbd).

Dokumenttypen `digital_dpv` adresseres fra avsenders organisasjonsnummer til mottakers fødselsnummer.

### Forretningsmeldingen

Forretningsmeldingen `digital_dpv` er beskrevet under.

> `digital_dpv.tittel` (påkrevd)
>
> Tittel for meldingen.
>
> | Lovlige verdier                 | String        |
> | Standard verdi                  | Ingen         |
> | Konfigurasjon av standard verdi | Ikke støttet  |

> `digital_dpv.sammendrag` (påkrevd)
>
> Sammendrag for meldingen.
>
> | Lovlige verdier                 | String       |
> | Standard verdi                  | Ingen        |
> | Konfigurasjon av standard verdi | Ikke støttet |

> `digital_dpv.innhold` (påkrevd)
>
> Hovedinnhold for meldingen.
>
> | Lovlige verdier                 | String       |
> | Standard verdi                  | Ingen        |
> | Konfigurasjon av standard verdi | Ikke støttet |

> `digital_dpv.dpv.varselType` (frivillig)
>
> Instruksjonen bestemmer om mottaker skal varsles om innkommende post ved mottak eller både ved mottak og en uke etter
mottak. Les mer på:
>
> - [Varsel og eventuelt revarsel for Altinn Digital Post](https://altinn.github.io/docs/utviklingsguider/digital-post-til-virksomheter/overorndet-funksjonalitet/#varsel-og-evt-revarsel) (ekstern lenke)
>
> | Lovlige verdier                 | `VarselDPVMedRevarsel` eller `VarselDPVUtenRevarsel` |
> | Standard verdi                  | `VarselDPVMedRevarsel`                               |
> | Konfigurasjon av standard verdi | Ikke støttet                                         |

> `digital_dpv.dpv.varselTransportType` (frivillig)
>
> Instruksjonen bestemmer om varsel om innnkommende post skal sendes til mottaker med e-post, SMS eller både e-post og
SMS.
>
> | Lovlige verdier                 | `EpostOgSMS`, `Epost` eller `SMS`                        |
> | Standard verdi                  | `EpostOgSMS`                                             |
> | Konfigurasjon av standard verdi | `difi.move.dpv.notifyEmail`<br>`difi.move.dpv.notifySms` |

> `digital_dpv.dpv.varselTekst` (frivillig)
>
> Instruksjonen bestemmer hvilken tekst som skal brukes ved varsel til mottaker om innkommende post.
>
> | Lovlige verdier                 | `valgfri tekst`                                                 |
> | Standard verdi                  | `$reporteeName$: Du har mottatt en melding fra $reporterName$.` |                      |
> | Konfigurasjon av standard verdi | `difi.move.dpv.notificationText`                                |

> `digital_dpv.dpv.taushetsbelagtVarselTekst` (frivillig)
>
> Instruksjonen bestemmer hvilken tekst som skal brukes ved varsel til mottaker om innkommende taushetsbelagt post.
>
> | Lovlige verdier                 | `valgfri tekst`                                                                                                                                                                                                                                                                                                                                                                                          |
> | Standard verdi                  | `$reporteeName$, har mottatt en taushetsbelagt melding fra $reporterName$. For å få tilgang til meldingen, er det nødvendig at noen i $reporteeName$ har fått tildelt rollen "Taushetsbelagt post fra det offentlige" i Altinn. Dersom dere er usikre på om noen har slik tilgang, anbefaler vi sterkt at dette sjekkes. Les mer om å gi tilgang til rollen "Taushetsbelagt post" på Altinns nettsider.` |
> | Konfigurasjon av standard verdi | `difi.move.dpv.sensitiveNotificationText`                                                                                                                                                                                                                                                                                                                                                                |

> `digital_dpv.dpv.dagerTilSvarfrist` (frivillig)
>
> Instruksjonen bestemmer hvor mange dager som skal gå før revarsel sendes til mottakar om innkommende post.
>
> | Lovlige verdier                 | Heltall                     |
> | Standard verdi                  | `7`                         |
> | Konfigurasjon av standard verdi | `difi.move.dpv.daysToReply` |


## Et eller flere dokument

Hvilke typer dokument som støttes avhenger av mottakeren og er ikke kjent på forhånd. Dette medfører at forsøk på å
sende dokumenter som ikke støttes av mottakeren feiler først ved mottak.

Filformat som støttes: TODO hva støttes for digital_dpv?

## Beriking og transformasjon

Integrasjonspunktet transformerer og beriker meldinger som sendes med Altinn Digital Post:

- [Transformasjon fra Digital DPV til Altinn Digital Post](../Transformasjoner/digital_dpv_til_altinn_digital_post)

## Neste steg

- [Dokumenttype `digital_dpv` under Eksempel på vedtak til innbygger](../Eksempel/vedtak_til_innbygger#dersom-dokumenttype-digital_dpv-st%C3%B8ttes)
