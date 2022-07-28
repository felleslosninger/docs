---
title: KS FIKS IO
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling støtter følgende prosesser med meldingstjenesten KS FIKS IO med følgende dokumenttyper.

| **Prosess**                             | **Dokumenttype**                    | **Eksempel**                       |
| --------------------------------------- | ----------------------------------- | ---------------------------------- |
| [FIKS IO](../../Funksjonalitet/fiks_io) | [FIKS IO](../Dokumenttyper/fiks_io) | [Eksempel](../Eksempel/fiks_io) |

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


## Neste steg

- [Teknisk dokumentasjon for KS FIKS IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksio/) (ekstern lenke)
- Flere [meldingstjenester](./)
