---
title: eInnsyns meldingstjeneste
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling støtter følgende prosesser med eInnsyns meldingstjeneste (DPE) med følgende dokumenttyper.

| **Prosess**                                                 | **Dokumenttype**                            | **Eksempel**                        |
| ----------------------------------------------------------- | ------------------------------------------- | ----------------------------------- |
| [Innsynskrav fra eInnsyn](../../Funksjonalitet/innsynskrav) | [Innsynskrav](../Dokumenttyper/innsynskrav) | [Eksempel](../Eksempel/innsynskrav) |
| [Journalpost til eInnsyn](../../Funksjonalitet/journalpost) | [Publisering](../Dokumenttyper/publisering) | [Eksempel](../Eksempel/journalpost) |
| [Møte til eInnsyn](../../Funksjonalitet/mote)               | [Publisering](../Dokumenttyper/publisering) | [Eksempel](../Eksempel/mote)        |

Om eInnsyns meldingstjeneste er en del av en mottakers kapabiliteter eller ikke avhenger av flere faktorer slik som
beskrevet for den enkelte prosess.

eInnsyns meldingstjeneste er realisert med Azure Service Bus, som brukes som transport.

For å bruke eInnsyns meldingstjeneste må integrasjonspunktet konfigureres med nødvendige tilganger til APIet eInnsyns
meldingstjeneste tilbyr.

Integrasjonspunktet pakker meldingene og sender disse uforandret gjennom APIet eInnsyns meldingstjeneste tilbyr. Se
dokumenttypene for detaljer.

Mottakers integrasjonspunkt produserer eFormidling meldingsstatuser og sender disse tilbake til avsenders
integrasjonspunkt med eInnsyns meldingstjeneste. eInnsyn sender tilbake en eInnsyn-kvittering som del av
prosessene journalpost til eInnsyn og møte til eInnsyn.

Flytskisse for `innsynskrav`:
<div class="mermaid">
graph LR
A("fa:fa-user Innbygger") --> |Sende innsynskrav| B("fa:fa-server eInnsyn.no")
B --> |Innsynskrav| C("fa:fa-server" eInnsyns<br>integrasjonspunkt)
C --> |Innsynskrav| D("fa:fa-server eInnsyns<br>meldingstjeneste")
D --> |Innsynskrav| E("fa:fa-server Mottakers<br>integrasjonspunkt")
E --> |Innsynskrav| F["fa:fa-server Mottakers<br>fagsystem"]
C --> |Status| B
D --> |Status| C
E --> |Status| D
</div>

Flytskisse for `publisering`:
<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler") --> |Fylle inn| B("fa:fa-server Avsenders<br>fagsystem")
B --> |Publisering| C("fa:fa-server" Avsenders<br>integrasjonspunkt)
C --> |Publisering| D("fa:fa-server eInnsyns<br>meldingstjeneste")
D --> |Publisering| E("fa:fa-server eInnsyns<br>integrasjonspunkt")
E --> |Journalpost| F["fa:fa-server eInnsyn.no"]
C --> |Status| B
D --> |Status| C
E --> |Status| D
C --> |eInnsyn-kvittering| B
D --> |eInnsyn-kvittering| C
E --> |eInnsyn-kvittering| D
F --> |eInnsyn-kvittering| E
</div>

## Neste steg

- [Produktdokumentasjon for eInnsyn](https://samarbeid.digdir.no/einnsyn/dette-er-einnsyn/81) (ekstern lenke)
- [Teknisk dokumentasjon for eInnsyn](https://docs.digdir.no/docs/eInnsyn/einnsyn_install_forutsetninger_verktoy) (ekstern lenke)
- Flere [meldingstjenester](./)
