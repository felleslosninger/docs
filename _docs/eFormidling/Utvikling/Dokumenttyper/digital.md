---
title: "Dokumenttype: Digital"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Dokumenttypen `digital` består av et standard business document (SBD), et eller flere dokument og eventuelt en eller flere
utvidelser.

Dokumenttypen har identifikatoren `urn:no:difi:digitalpost:xsd:digital::digital`.

1. TOC
{:toc}

## Standard business document

Alle dokumenttyper i eFormidling følger standarden `SBD` for adresseringsinformasjon. `SBD` består av en header (`SBDH`)
og en forretningsmelding som brukes for dokumenttype-spesifikk adresseringsinformasjon.

eFormidlings bruk av standarden `SBD` er beskrevet på [Standard business document](standard_sbd).

Dokumenttypen `digital` adresseres fra avsenders organisasjonsnummer til mottakers fødselsnummer.

### Forretningsmeldingen

Forretningsmeldingen `digital` er beskrevet under.

> `digital.sikkerhetsnivaa` (påkrevd)
>
> Definerer hvilket autentiseringsnivå som kreves for at dokumentet skal åpnes.
>
> | Lovlige verdier                 | `3` eller `4` |
> | Standard verdi                  | Ingen         |
> | Konfigurasjon av standard verdi | Ikke støttet  |

> `digital.hoveddokument` (påkrevd)
>
> Instruksjonen definerer hvilket dokument som skal være hoveddokument.
>
> | Lovlige verdier                 | String som matcher filnavnet for ett av dokumentene i meldingen |
> | Standard verdi                  | Ingen                                                           |
> | Konfigurasjon av standard verdi | Ikke støttet                                                    |

> `digital.avsenderId` (frivillig)
>
> Brukt for å identifisere en ansvarlig enhet innen for en virksomhet. I Digital Post til Innbyggere tildeles
> avsenderidentifikator ved tilkobling til tjenesten.
>
> | Lovlige verdier                 | String        |
> | Standard verdi                  | Ingen         |
> | Konfigurasjon av standard verdi | Ikke støttet  |

> `digital.tittel` (påkrevd)
>
> Vil vises til Innbygger og brukes i varslinger/påminnelser på e-post og sms til Innbygger. Skal ikke inneholde
> sensitiv informasjon. Kan brukes på lavere sikkerhetsnivå enn det selve dokumentet er klassifisert på.
>
> | Lovlige verdier                 | String                       |
> | Standard verdi                  | Ingen                        |
> | Konfigurasjon av standard verdi | Ikke støttet                 |

> `digital.spraak` (påkrevd)
>
> Språkkode ihht ISO-639-1 (2 bokstaver).
>
> | Lovlige verdier                 | String                       |
> | Standard verdi                  | Ingen                        |
> | Konfigurasjon av standard verdi | Ikke støttet                 |

> `digital.digitalPostInfo.virkningsdato` (påkrevd)
>
> Dato for når en melding skal tilgjengeliggjøres for Innbygger i Innbygger sin postkasse.
>
> | Lovlige verdier                 | Dato |
> | Standard verdi                  | Ingen                        |
> | Konfigurasjon av standard verdi | Ikke støttet                 |

> `digital.digitalPostInfo.aapningskvittering` (påkrevd)
>
> Dersom Dataansvarlig ønsker å at Innbygger aktivt skal bli bedt om å sende tilbake en Åpningskvittering ved åpning av Digital Post kan det spesifiseres med dette attributtet.
> 
> | Lovlige verdier                 | `true` eller `false`         |
> | Standard verdi                  | Ingen                        |
> | Konfigurasjon av standard verdi | Ikke støttet                 |

> `digital.varsler.epostTekst` (påkrevd)
>
> Tekst som skal inkluderes i epost-varsel til sluttbruker etter at posten er tilgjengeliggjort.
>
> | Lovlige verdier                 | String                       |
> | Standard verdi                  | Ingen                        |
> | Konfigurasjon av standard verdi | Ikke støttet                 |

> `digital.varsler.smsTekst` (påkrevd)
>
> Tekst som skal inkluderes i SMS-varsel til sluttbruker etter at posten er tilgjengeliggjort.
>
> | Lovlige verdier                 | String                       |
> | Standard verdi                  | Ingen                        |
> | Konfigurasjon av standard verdi | Ikke støttet                 |

> `digital.metadataFiler` (frivillig)
>
> Metadatafiler brukes for å ta i bruk tilleggsfunksjonalitet som lenke utenfor brev i Digital Post til Innbyggere.
>
> | Lovlige verdier                 | Objekt med feltnavn som tilsvarer et filnavn for et av vedleggene og verdi som tilsvarer filnavn for metadatafil for denne. |
> | Standard verdi                  | Ingen                        |
> | Konfigurasjon av standard verdi | Ikke støttet                 |

## Et eller flere dokument

Hvilke typer dokument som støttes avhenger av mottakeren og er ikke kjent på forhånd. Dette medfører at forsøk på å
sende dokumenter som ikke støttes av mottakeren feiler først ved mottak.

Filformat som støttes: TODO hva støttes for digital?

## En eller flere utvidelser

Metadatafiler brukes for å ta i bruk tilleggsfunksjonalitet som lenke utenfor brev i Digital Post til Innbyggere.

Nærmere beskrivelse av tilleggsfunksjonalitet inkludert format for metadatafiler finnes på:

- [Utvidelser for Digital Post til Innbyggere](https://docs.digdir.no/dpi_utvidelser_index) (ekstern lenke)

## Beriking og transformasjon

Integrasjonspunktet transformerer og beriker meldinger som sendes med Digital Post til Innbyggere.

- [Transformasjon fra digital til Digital Post til Innbyggere](../Transformasjoner/digital_til_digital_post_til_innbyggere)

## Neste steg

- [Dokumenttype `digital` under Eksempel på vedtak til innbygger](../Eksempel/vedtak_til_innbygger#dersom-dokumenttype-digital-st%C3%B8ttes)
