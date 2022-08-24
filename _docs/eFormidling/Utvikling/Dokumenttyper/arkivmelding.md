---
title: "Dokumenttype: Arkivmelding"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_mappinger
---

Dokumenttypen `arkivmelding` består av et standard business document (SBD), en arkivmelding og et eller flere dokument.

Dokumenttypen har identifikatoren `urn:no:difi:arkivmelding:xsd::arkivmelding`.

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](standard_sbd).

Dokumenttypen `arkivmelding` adresseres fra avsenders organisasjonsnummer til mottakers organisasjonsnummer.

### Forretningsmeldingen

Forretningsmeldingen `arkivmelding` er beskrevet under.

> `arkivmelding.sikkerhetsnivaa` (frivillig)
>
> Instruksjonen gjelder bare ved formidling med KS Svarut, og ignoreres ved formidling til de andre meldingstjenestene.
>
> Instruksjonen definerer hvilket sikkerhetsnivå mottakers virksomhets bruker må være autentisert med for å få tilgang
> til å lese meldingen.
>
> | Lovlige verdier                 | `3` eller `4` |
> | Standard verdi                  | `3`           |
> | Konfigurasjon av standard verdi | Ikke støttet  |

> `arkivmelding.dpv.varselType` (frivillig)
>
> Instruksjonen gjelder bare ved formidling med Altinn Digital Post, og ignoreres ved formidling til de andre
meldingstjenestene.
>
> Instruksjonen bestemmer om mottaker skal varsles om innkommende post ved mottak eller både ved mottak og en uke etter
mottak. Les mer på:
> 
> - [Varsel og eventuelt revarsel for Altinn Digital Post](https://altinn.github.io/docs/utviklingsguider/digital-post-til-virksomheter/overorndet-funksjonalitet/#varsel-og-evt-revarsel) (ekstern lenke)
>
> | Lovlige verdier                 | `VarselDPVMedRevarsel` eller `VarselDPVUtenRevarsel` |
> | Standard verdi                  | `VarselDPVMedRevarsel`                               |
> | Konfigurasjon av standard verdi | Ikke støttet                                         |

> `arkivmelding.dpv.varselTransportType` (frivillig)
>
> Instruksjonen gjelder bare ved formidling med Altinn Digital Post, og ignoreres ved formidling til de andre
meldingstjenestene.
>
> Instruksjonen bestemmer om varsel om innkommende post skal sendes til mottaker med e-post, SMS eller både e-post og
SMS.
>
> | Lovlige verdier                 | `EpostOgSMS`, `Epost` eller `SMS`                        |
> | Standard verdi                  | `EpostOgSMS`                                             |
> | Konfigurasjon av standard verdi | `difi.move.dpv.notifyEmail`<br>`difi.move.dpv.notifySms` |

> `arkivmelding.dpv.varselTekst` (frivillig)
>
> Instruksjonen gjelder bare ved formidling med Altinn Digital Post, og ignoreres ved formidling til de andre
meldingstjenestene.
>
> Instruksjonen bestemmer hvilken tekst som skal brukes ved varsel til mottaker om innkommende post. 
>
> | Lovlige verdier                 | `valgfri tekst`                                                 |
> | Standard verdi                  | `$reporteeName$: Du har mottatt en melding fra $reporterName$.` |                      |
> | Konfigurasjon av standard verdi | `difi.move.dpv.notificationText`                                |

> `arkivmelding.dpv.taushetsbelagtVarselTekst` (frivillig)
>
> Instruksjonen gjelder bare ved formidling med Altinn Digital Post, og ignoreres ved formidling til de andre
meldingstjenestene.
>
> Instruksjonen bestemmer hvilken tekst som skal brukes ved varsel til mottaker om innkommende taushetsbelagt post.
>
> | Lovlige verdier                 | `valgfri tekst`                                                                                                                                                                                                                                                                                                                                                                                          |
> | Standard verdi                  | `$reporteeName$, har mottatt en taushetsbelagt melding fra $reporterName$. For å få tilgang til meldingen, er det nødvendig at noen i $reporteeName$ har fått tildelt rollen "Taushetsbelagt post fra det offentlige" i Altinn. Dersom dere er usikre på om noen har slik tilgang, anbefaler vi sterkt at dette sjekkes. Les mer om å gi tilgang til rollen "Taushetsbelagt post" på Altinns nettsider.` |
> | Konfigurasjon av standard verdi | `difi.move.dpv.sensitiveNotificationText`                                                                                                                                                                                                                                                                                                                                                                |

> `arkivmelding.dpv.dagerTilSvarfrist` (frivillig)
>
> Instruksjonen gjelder bare ved formidling med Altinn Digital Post, og ignoreres ved formidling til de andre
meldingstjenestene.
>
> Instruksjonen bestemmer hvor mange dager som skal gå før revarsel sendes til mottaker om innkommende post. 
>
> | Lovlige verdier                 | Heltall                     |
> | Standard verdi                  | `7`                         |
> | Konfigurasjon av standard verdi | `difi.move.dpv.daysToReply` |

> `arkivmelding.dpf.forsendelseType` (frivillig)
>
> Instruksjonen gjelder bare ved formidling med KS SvarUt, og ignoreres ved formidling til de andre
meldingstjenestene.
>
> Instruksjonen bestemmer hvilken foresendelsestype i KS SvarUt meldingen skal markeres med.
>
> | Lovlige verdier                 | En av forsendelsestypene som er tilgjengelig i KS SvarUt |
> | Standard verdi                  | Utelatt                                                 |
> | Konfigurasjon av standard verdi | Ikke støttet                                            |

## Arkivmeldingen

Arkivmeldingen inneholder arkivspesifikke metadata og er utformet for kommunikasjon mellom sak- og arkivsystem.
Arkivmeldingen følger standarden `arkivmelding`.

Standarden `arkivmelding` må ikke forveksles med forretningsmeldingen `arkivmelding`.

eFormidlings bruk av standarden arkivmelding er beskrevet på [Arkivmelding](standard_arkivmelding).

## Et eller flere dokument

Arkivmeldingen inneholder dokumentreferanser med filnavn for et eller flere dokument. Hvert enkelt av disse refererte
dokumentene må inkluderes. Hvilke typer dokument som støttes avhenger av mottakeren og er ikke kjent på forhånd. Dette
medfører at forsøk på å sende dokumenter som ikke støttes av mottakeren feiler først ved mottak.

Alle filformat støttes i utgangspunktet, men i praksis vil mottakers system i mange tilfeller stille strengere krav.
Derfor anbefales PDF. Kjente begrensninger:

- Mottakere som bruker Altinn Digital Post støtter HTML og vedlegg med vilkårlige filformat
- Mottakere som bruker KS SvarUt og SvarInn støtter i utgangspunktet bare PDF, men kan konfigureres til å støtte flere 
filformat på bekostning av leveransegaranti

## Beriking og transformasjon

For å støtte mottakere som bruker andre meldingstjenester enn eFormidlings meldingstjeneste må integrasjonspunktet
berike og transformere utgående meldinger:

- [Transformasjon fra arkivmelding til Altinn Digital Post](../Transformasjoner/arkivmelding_til_altinn_digital_post)
- [Transformasjon fra arkivmelding til KS SvarUt](../Transformasjoner/arkivmelding_til_ks_svarut)

For å støtte mottak fra avsendere som bruker andre meldingstjenester enn eFormidlings meldingstjeneste må
integrasjonspunktet berike og transformere innkommende meldinger:

- [Transformasjon fra KS SvarInn til arkivmelding](../Transformasjoner/ks_svarinn_til_arkivmelding)

Ved bruk av integrasjonspunktets grensesnitt `BEST/EDU` transformerer integrasjonspunktet utgående meldinger til
arkivmelding. Dersom mottaker bruker KS SvarUt eller Altinn Digital Post transformeres i tillegg arkivmeldingen til den
aktuelle meldingstjenesten:

- [Transformasjon fra BEST/EDU til arkivmelding](../Transformasjoner/bestedu_til_arkivmelding)

Ved bruk av integrasjonspunktets grensesnitt `BEST/EDU` transformerer integrasjonspunktet innkommende meldinger direkte
til BEST/EDU:

- [Transformasjon fra arkivmelding til BEST/EDU](../Transformasjoner/arkivmelding_til_bestedu)
- [Transformasjon fra KS SvarInn til BEST/EDU](../Transformasjoner/ks_svarinn_til_bestedu)

Forskjeller i datastrukturene i BEST/EDU, arkivmeldingen, KS SvarUt og Altinn Digital Post medfører i noen tilfeller at
ikke alle metadata fra avsender kan leveres til mottaker.

## Neste steg

- [Eksempel på saksbehandling](../Eksempel/saksbehandling)
