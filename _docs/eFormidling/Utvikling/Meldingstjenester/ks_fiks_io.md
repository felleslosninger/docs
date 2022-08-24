---
title: KS FIKS IO
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling støtter følgende prosesser og dokumenttyper med meldingstjenesten KS FIKS IO (DPFIO).

| **Prosess**                             | **Dokumenttype**                    | **Eksempel**                      |
|-----------------------------------------|-------------------------------------|-----------------------------------|
| [FIKS IO](../../Funksjonalitet/fiks_io) | [FIKS IO](../Dokumenttyper/fiks_io) | [Eksempel](../Eksempel/fiks_io)   |

Alle FIKS IO-meldingsprotokoller er gyldige prosesser i eFormidling. KS FIKS IO er ikke synlig del av mottakers
kapabiliteter. Avsender må vite at mottaker støtter en gitt FIKS IO protokoll og kan nås med en gitt FIKS IO
kontoidentifikator. eFormidling validerer at dette stemmer, men har per dags dato ingen mulighet for å vite hvilke
protokoller en gitt mottaker støtter på forhånd for å presentere det som del av mottakerens kapabiliteter.

For å bruke KS FIKS IO må integrasjonspunktet konfigureres med nødvendige tilganger til APIet KS FIKS IO tilbyr

Integrasjonspunktet pakker meldingene og sender disse uforandret gjennom APIet KS FIKS IO tilbyr. Se dokumenttypene for
detaljer.

Integrasjonspunktet omformer meldingsstatusene fra KS FIKS IO til eFormidlings meldingsstatuser.

Flytskisse for `FIKS IO-melding` fra stat til kommune:

<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler<br>stat") --> |Fylle inn| B("fa:fa-server Sak/arkiv")
B --> |FIKS IO-melding| C("fa:fa-server Integrasjonspunktet")
C --> |FIKS IO-melding| D("fa:fa-server KS FIKS IO")
D --> |FIKS IO-melding| E("fa:fa-server Sak/arkiv")
E --> F("fa:fa-user Saksbehandler<br>kommune")
C --> |Status| B
</div>

Flytskisse for `FIKS IO-melding` fra kommune til stat:

<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler<br>kommune") --> |Fylle inn| B("fa:fa-server Sak/arkiv")
B --> |FIKS IO-melding| C("fa:fa-server KS FIKS IO")
C --> |FIKS IO-melding| D("fa:fa-server Integrasjonspunktet")
D --> |FIKS IO-melding| E("fa:fa-server Sak/arkiv")
E --> F("fa:fa-user Saksbehandler<br>stat")
</div>

## Meldingsstatuser

Meldingsstatuser for meldinger sendt med KS FIKS IO:

| Status              | Kommentar                                                                                                           |
|---------------------|---------------------------------------------------------------------------------------------------------------------|
| OPPRETTET           | Integrasjonspunktet mottar BEST/EDU- eller eFormidling 2.0-melding fra sak-arkivsystem og oppretter en DPE-melding. |
| SENDT               | Integrasjonspunkt har sendt forsendelsen til meldingsformidler.                                                     |
| MOTTATT             | Avsender mottar bekreftelse på at mottakende integrasjonspunkt har mottatt meldingen.                               |
| LEVERT              | Forsendelsen (innsynskrav) er sendt på e-post til mottakers postmottak.                                             |

Meldingsstatuser for meldinger sendt med KS FIKS IO:

| Status              | Kommentar                                                          |
|---------------------|--------------------------------------------------------------------|
| OPPRETTET           | Integrasjonspunkt laster frå KS ned og oppretter meldingen hos seg |
| INNKOMMENDE_MOTTATT | Meldingen blir konvertert til internt format                       |
| INNKOMMENDE_LEVERT  | Meldingen er levert til sak-arkivsystem                            |

## Neste steg

- [Teknisk dokumentasjon for KS FIKS IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksio/) (ekstern lenke)
- Flere [meldingstjenester](./)
