---
title: Altinn Digital Post
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling støtter følgende prosesser og dokumenttyper med meldingstjenesten Altinn Digital Post (DPV).

| **Prosess**                                                                         | **Dokumenttype**                              | **Eksempel**                                          |
|-------------------------------------------------------------------------------------|-----------------------------------------------|-------------------------------------------------------|
| [Informasjon til innbygger](../../Funksjonalitet/informasjon_til_innbygger)         | [Digital DPV](../Dokumenttyper/digital_dpv)   | [Eksempel](../Eksempel/informasjon_til_innbygger)     |
| [Saksbehandling](../../Funksjonalitet/saksbehandling)                               | [Arkivmelding](../Dokumenttyper/arkivmelding) | [Eksempel](../Eksempel/saksbehandling)                |
| [Taushetsbelagt saksbehandling](../../Funksjonalitet/taushetsbelagt_saksbehandling) | [Arkivmelding](../Dokumenttyper/arkivmelding) | [Eksempel](../Eksempel/taushetsbelagt_saksbehandling) |
| [Vedtak til innbygger](../../Funksjonalitet/vedtak_til_innbygger)                   | [Digital DPV](../Dokumenttyper/digital_dpv)   | [Eksempel](../Eksempel/vedtak_til_innbygger)          |

Om Altinn Digital Post er en del av en mottakers kapabiliteter eller ikke avhenger av flere faktorer slik som
beskrevet for den enkelte prosess.

For å bruke Altinn Digital Post må integrasjonspunktet konfigureres med nødvendige tilganger til APIet Altinn Digital
Post tilbyr.

Integrasjonspunktet omformer dokumenttypene arkivmelding og digital DPV til kall mot APIet Altinn Digital Post tilbyr.
Se dokumenttypene for detaljer. For saksbehandlingsprosessene (inkludert taushetsbelagt saksbehandling) omformes den
aktuelle prosessen til tilsvarande teneste i Altinn Digital Post (servicecode & serviceditoncode) slik at mottakende
virksomheter kan ha ulik tilgangsstyring avhengig av prosess.

Ved bruk av grensesnittet BEST/EDU omformer integrasjonspunktet først fra BEST/EDU til arkivmelding, før meldingen
sendes som beskrevet over.

Integrasjonspunktet omformer meldingsstatusene fra Altinn Digital Post til eFormidlings meldingsstatuser og
arkivmelding-kvittering.

Flytskisse for `arkivmelding`:

<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler") --> |Fylle inn| B("fa:fa-server Sak/arkiv")
B --> |Arkivmelding| C("fa:fa-server" Integrasjonspunktet)
C --> D("fa:fa-server Altinn Digital Post")
C --> |Status| B
C --> |Arkivmelding-kvittering| B
D --> C
</div>

Flytskisse for `digital DPV`:

<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler") --> |Fylle inn| B("fa:fa-server Sak/arkiv")
B --> |Digital DPV| C("fa:fa-server" Integrasjonspunktet)
C --> D("fa:fa-server Altinn Digital Post")
C --> |Status| B
D --> C
</div>

## Neste steg

- [Produktdokumentasjon for Altinn Digital Post](https://www.altinndigital.no/produkter/digital-post/) (ekstern lenke)
- [Teknisk dokumentasjon for Altinn Digital Post](https://altinn.github.io/docs/utviklingsguider/digital-post-til-virksomheter/) (ekstern lenke)
- Flere [meldingstjenester](./)
