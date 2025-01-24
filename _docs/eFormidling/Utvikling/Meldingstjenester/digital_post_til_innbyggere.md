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

## Meldingsstatuser

Meldingsstatuser for meldinger sendt med Digital Post til Innbygger:

| Status    | Kommentar                                                                     |
|-----------|-------------------------------------------------------------------------------|
| OPPRETTET | Integrasjonspunkt mottar meldingen og oppretter forsendelse på internt format |
| SENDT     | Forsendelse er sendt til aksesspunkt                                          |
| MOTTATT   | Forsendelse er mottatt av mottakers aksesspunkt                               |
| LEVERT    | Forsendelse levert til innbyggers prefererte kanal                            |
| LEST      | Innbygger har åpnet forsendelse i sin postkasse innboks                       |
| FEIL      | Noe ved forsendelsen har feilet                                               |

## Merknader om FEIL-status

I hovedsak feiler en melding fordi den ikke kan leveres til innbygger. I et slikt tilfelle må avsender ta stilling til om meldingen skal sendes på nytt. En melding kan også få FEIL-status uten av selve forsendelsen feiler. Da er det noe rundt meldingen som feiler, eksempelvis SMS- og/eller epost-varslingen om at posten er tilgjengeliggjort for innbygger. 

Utskriftsmeldinger har noen egne særegenheter når det kommer til status FEIL. Les mer om dette på [Dokumenttype: Print](https://docs.digdir.no/docs/eFormidling/Utvikling/Dokumenttyper/print)


## Neste steg

- [Produktdokumentasjon for Digital Post til Innbyggere](https://samarbeid.digdir.no/digital-postkasse/digital-postkasse-til-innbyggere/23) (ekstern lenke)
- [Teknisk dokumentasjon for Digital Post til Innbyggere](https://docs.digdir.no/resources/begrep/sikkerDigitalPost/innledning/) (ekstern lenke)
- Flere [meldingstjenester](./)
