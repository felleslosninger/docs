---
title: Digital Post til Innbyggere
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling støtter følgende prosesser og dokumenttyper med meldingstjenesten Digital Post til Innbyggere (DPI).

| **Prosess**                                                                 | **Dokumenttype**                                                       | **Eksempel**                                      |
|-----------------------------------------------------------------------------|------------------------------------------------------------------------|---------------------------------------------------|
| [Informasjon til innbygger](../../Funksjonalitet/informasjon_til_innbygger) | [Digital](../Dokumenttyper/digital)<br>[Print](../Dokumenttyper/print) | [Eksempel](../Eksempel/informasjon_til_innbygger) |
| [Vedtak til innbygger](../../Funksjonalitet/vedtak_til_innbygger)           | [Digital](../Dokumenttyper/digital)<br>[Print](../Dokumenttyper/print) | [Eksempel](../Eksempel/vedtak_til_innbygger)      |

Om Digital Post til Innbyggere er en del av en mottakers kapabiliteter eller ikke avhenger av flere faktorer slik som
beskrevet for den enkelte prosess.

For å bruke Digital Post til Innbyggere må integrasjonspunktet konfigureres med nødvendige tilganger til APIet Digital
Post til Innbyggere tilbyr.

Integrasjonspunktet omformer dokumenttypene digital og print til kall mot APIet Digital Post til Innbyggere tilbyr.
Se dokumenttypene for detaljer.

Integrasjonspunktet omformer meldingsstatusene fra Digital Post til Innbyggere til eFormidlings meldingsstatuser.

Flytskisse for `digital`:

<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler") --> |Fylle inn| B("fa:fa-server Sak/arkiv")
B --> |Digital| C("fa:fa-server" Integrasjonspunktet)
C --> D("fa:fa-server Digital Post til Innbyggere")
C --> |Status| B
D --> C
</div>

Flytskisse for `print`:

<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler") --> |Fylle inn| B("fa:fa-server Sak/arkiv")
B --> |Print| C("fa:fa-server" Integrasjonspunktet)
C --> D("fa:fa-server Digital Post til Innbyggere")
C --> |Status| B
D --> C
</div>

## Neste steg

- [Produktdokumentasjon for Digital Post til Innbyggere](https://samarbeid.digdir.no/digital-postkasse/digital-postkasse-til-innbyggere/23) (ekstern lenke)
- [Teknisk dokumentasjon for Digital Post til Innbyggere](https://docs.digdir.no/resources/begrep/sikkerDigitalPost/innledning/) (ekstern lenke)
- Flere [meldingstjenester](./)
