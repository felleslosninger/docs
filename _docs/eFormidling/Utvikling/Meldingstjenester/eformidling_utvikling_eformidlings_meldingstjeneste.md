---
title: eFormidlings meldingstjeneste
description: ""
summary: ""
permalink: eformidling_utvikling_eformidlings_meldingstjeneste.html
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling støtter følgende prosesser med eFormidlings meldingstjeneste med følgende dokumenttyper.

| **Prosess**                                                                                    | **Dokumenttype**                                                     | **Eksempel**                                                                                                                                                |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [Avtalt meldingsutveksling](eformidling_funksjonalitet_avtalt.html)                            | [Avtalt](eformidling_utvikling_dokumenttype_avtalt.html)             | [Eksempel](eformidling_utvikling_eksempel_avtalt.html)                        |
| [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)                               | [Arkivmelding](eformidling_utvikling_dokumenttype_arkivmelding.html) | [Eksempel](eformidling_utvikling_eksempel_saksbehandling.html)                |
| [Taushetsbelagt saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html) | [Arkivmelding](eformidling_utvikling_dokumenttype_arkivmelding.html) | [Eksempel](eformidling_utvikling_eksempel_taushetsbelagt_saksbehandling.html) |

Om eFormidlings meldingstjeneste er en del av en mottakers kapabiliteter eller ikke avhenger av flere faktorer slik som
beskrevet for den enkelte prosess.

eFormidlings meldingstjeneste er realisert med Altinn Formidling, som brukes som transport.

For å bruke eFormidlings meldingstjeneste må integrasjonspunktet konfigureres med nødvendige tilganger til APIet
Altinn Formidling tilbyr.

Integrasjonspunktet pakker meldingene og sender disse uforandret gjennom APIet Altinn Formidling tilbyr. Følgende filer
sendes:

- sbd.json ([Standard Business Document](eformidling_utvikling_standard_sbd.html))
- asic.zip ([Dokumentpakke](eformidling_utvikling_standard_dokumentpakke.html))

Ved bruk av grensesnittet BEST/EDU omformer integrasjonspunktet først fra BEST/EDU til arkivmelding, før meldingen
sendes som beskrevet over.

Mottakers integrasjonspunkt produserer eFormidling meldingsstatuser og sender disse tilbake til avsenders
integrasjonspunkt med eFormidlings meldingstjeneste. Saksbehandlingsprosessene krever i tillegg at mottaker sender
tilbake en arkivmelding-kvittering.

Flytskisse for `arkivmelding`:
<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler") --> |Fylle inn| B("fa:fa-server Avsenders<br>fagsystem")
B --> |Arkivmelding| C("fa:fa-server" Avsenders<br>integrasjonspunkt)
C --> |Arkivmelding| D("fa:fa-server eFormidlings meldingstjeneste")
D --> |Arkivmelding| E("fa:fa-server Mottakers<br>integrasjonspunkt")
E --> |Arkivmelding| F["fa:fa-server Mottaker<br>fagsystem"]
C --> |Status| B
D --> |Status| C
E --> |Status| D
C --> |Arkivmelding-kvittering| B
D --> |Arkivmelding-kvittering| C
E --> |Arkivmelding-kvittering| D
F --> |Arkivmelding-kvittering| E
</div>

Flytskisse for `avtalt`:
<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler") --> |Fylle inn| B("fa:fa-server Avsenders<br>fagsystem")
B --> |Avtalt| C("fa:fa-server" Avsenders<br>integrasjonspunkt)
C --> |Avtalt| D("fa:fa-server eFormidlings meldingstjeneste")
D --> |Avtalt| E("fa:fa-server Mottakers<br>integrasjonspunkt")
E --> |Avtalt| F["fa:fa-server Mottakers<br>fagsystem"]
C --> |Status| B
D --> |Status| C
E --> |Status| D
</div>

## Neste steg

- [Produktdokumentasjon for Altinn Formidling](https://www.altinndigital.no/produkter/sending-av-dokumenter/) (ekstern lenke)
- [Teknisk dokumentasjon for Altinn Formidling](https://altinn.github.io/docs/utviklingsguider/sending-av-dokumenter/) (ekstern lenke)
- Flere [meldingstjenester](eformidling_utvikling_meldingstjenester.html)
