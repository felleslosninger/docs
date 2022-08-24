---
title: "Standard Business Document (SBD)"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling inkluderer ett standard business document (SBD) som del av alle meldinger. SBD består av en header (SBDH) og
en forretningsmelding. SBDH inneholder informasjon for identifisering, adressering og ruting av meldingen.
Forretningsmeldingen inneholder ytterligere informasjon avhengig av hvilke dokumenttype som sendes. Hver av
dokumenttypene i eFormidling har en tilhørende forretningsmelding. Se gjerne dokumenttypene i eFormidling på:

- [Dokumenttyper](./)

Se gjerne mer om SBD på:

- [Standard Business Document hos GS1](https://www.gs1.org/standards/edi/standard-business-document-header-sbdh) (ekstern lenke)

## Eksempel

eFormidling benytter en JSON-variant av SBD. Se eksempelet under:

```json
{% include /eformidling/sbd.json %}
```

## Standard Business Document Header

Innholdet i SBDH er beskrevet under.

> `sender.identifier.value` (frivillig)
>
> Avsenderidentifikator.
> 
> For virksomheter benyttes ISO6523. Det er bare Norske organisasjonsnumer som støttes (International Code Designator
> (ICD) 0192). Identifkatorer for norske virksomheter er på formen `0192:<organisasjonsnummer>`. 
> 
> Ved sending på vegne av en annen virksomhet oppgis den andre virksomhetens organisasjonsnummer istedet for
> virksomheten som kjører integrasjonspunktet. For bakoverkompatibilitet støttes syntaksen
> `0192:<orgnr>:<paa-vegne-av-orgnr>` fortsatt, selv om den ikke anbefales.
>
> | Lovlige verdier                 | ISO6523                |
> | Standard verdi                  | Ingen                  |
> | Konfigurasjon av standard verdi | `difi.move.org.number` |

> `receiver.identifier.value` (påkrevd)
>
> Mottakeridentifikator.
>
> For virksomheter benyttes ISO6523. Det er bare Norske organisasjonsnumer som støttes (International Code Designator
> (ICD) 0192). Identifkatorer for norske virksomheter er på formen `0192:<organisasjonsnummer>`.
>
> For innbyggere brukes fødselsnummer.
> 
> For FIKS IO-mottaker brukes FIKS IO-kontonummer.
>
> | Lovlige verdier                 | ISO6523, fødselsnummer eller FIKS IO-kontonummer |
> | Standard verdi                  | Ingen                                            |
> | Konfigurasjon av standard verdi | Ikke støttet                                     |

> `documentIdentification.instanceIdentifier` (frivillig)
>
> Meldingsidentifikator
> Unik identifikator for meldingen, og brukes til å referere meldinger i grensesnittene. Mapper til documentIdentification.instanceIdentifier i SBD. Denne "erstatter" den gamle ConversationId for meldinger, se info under.
>
> | Lovlige verdier                 | UUID                     |
> | Standard verdi                  | Genereres dersom utelatt |
> | Konfigurasjon av standard verdi | Ikke støttet             |


> `businessScope.scope[type=ConversationId].instanceIdentifier`
>
> Konversasjonsidentifikator
>
> Unik identifikator for konversasjonen, knytter meldinger og tilhørende kvitteringer sammen. Mapper til businessScope.instanceIdentifier.
>
> | Lovlige verdier                 | UUID                     |
> | Standard verdi                  | Genereres dersom utelatt |
> | Konfigurasjon av standard verdi | Ikke støttet             |

> `documentIdentification.standard` (påkrevd)
>
> Dokumenttypen som sendes. Merk at hvilke dokumenttyper en mottaker støtter en gitt prosess med kan variere fra
> mottaker til mottaker. Denne informasjonen kan finnes i forkant av sending ved å gjøre et kapabilitetsoppslag for
> mottakeren.
>
> | Lovlige verdier                 | URI for en av dokumenttypene som støttes av eFormidling |
> | Standard verdi                  | Ingen                                                   |
> | Konfigurasjon av standard verdi | Ikke støttet                                            |

> `documentIdentification.type` (påkrevd)
> 
> Forretningsmeldingsnavn. Navn for rotelementet i forretningsmeldingen.
>
> | Lovlige verdier                 | Skal samsvare med siste ledd av dokumenttypens URI |
> | Standard verdi                  | Ingen                                              |
> | Konfigurasjon av standard verdi | Ikke støttet                                       |

> `businessScope.scope[type=ConversationId].identifier` (påkrevd)
>
> Prosessen meldingen sendes som del av. Merk at hvilke prosesser en mottaker støtter en gitt prosess med kan variere
> fra mottaker til mottaker. Denne informasjonen kan finnes i forkant av sending ved å gjøre et kapabilitetsoppslag for
> mottakeren.
>
> | Lovlige verdier                 | URI for en av prosessene som støttes av eFormidling |
> | Standard verdi                  | Ingen                                               |
> | Konfigurasjon av standard verdi | Ikke støttet                                        |

> `businessScope.scope[type=ConversationId].scopeInformation[].expectedResponseDateTime` (frivillig)
>
> Leveringsfrist. Dersom leveringskvittering ikke er mottatt fra mottaker innen leveringsfristen får meldingen
> feil-statusen LEVETID_UTLOPT. Ved midlertidig feilsituasjoner (for eksempel nettverksproblemer) vil meldinger bli
> forsøkt sendt på nytt med gradvis større pause mellom forsøka heilt til leveringsfristen har løpt ut. Av historiske
> årsaker er denne satt høgt, men det anbefales å vurdere nøye brukers behov for rask tilbakemelding opp mot
> fire-and-forget-strategien et helt døgn utgjør.
>
> | Lovlige verdier                 | ISO 8601 datorepresentasjon          |
> | Standard verdi                  | 24 timer frem i tid                  |
> | Konfigurasjon av standard verdi | difi.move.nextmove.default-ttl-hours |

> `businessScope.scope[type=SenderRef].identifier` (frivillig)
> 
> Avsenders referanse.
>
> | Lovlige verdier                 | UUID (fritekst støttes inntil videre for bakoverkompatibilitet) |
> | Standard verdi                  | Ingen                                                           |
> | Konfigurasjon av standard verdi | Ikke støttet                                                    |

> `businessScope.scope[type=ReceiverRef].identifier` (frivillig)
> 
> Mottakers referanse.
>
> | Lovlige verdier                 | UUID (fritekst støttes inntil videre for bakoverkompatibilitet) |
> | Standard verdi                  | Ingen                                                           |
> | Konfigurasjon av standard verdi | Ikke støttet                                                    |

## Forretningsmelding

Forretningsmeldingen inneholder ekstra adresseringsinformasjon og instruksjoner avhengig av dokumenttypen.

SBD (inkludert forretningsmeldingen) krypteres ikke slik at den kan brukes til ruting og beslutningsgrunnlag ved
behandling av meldingen frem til mottak.

Hver dokumenttype har sin egen forretningsmelding. Se den enkelte dokumenttypen for detaljer:

- [Dokumenttyper](./)
