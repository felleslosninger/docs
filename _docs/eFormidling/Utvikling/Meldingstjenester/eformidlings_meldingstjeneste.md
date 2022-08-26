---
title: eFormidlings meldingstjeneste
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling støtter følgende prosesser og dokumenttyper med eFormidlings meldingstjeneste (DPO).

Mottakere støtter en eller flere av følgende prosesser:

| **Prosess**                                              | **Dokumenttype**                              | **Eksempel**                           |
|----------------------------------------------------------|-----------------------------------------------|----------------------------------------|
| [Saksbehandling](../../Funksjonalitet/saksbehandling)    | [Arkivmelding](../Dokumenttyper/arkivmelding) | [Eksempel](../Eksempel/saksbehandling) |
| [Avtalt meldingsutveksling](../../Funksjonalitet/avtalt) | [Avtalt](../Dokumenttyper/avtalt)             | [Eksempel](../Eksempel/avtalt)         |

Avsendere støtter en eller flere av følgende prosesser:

| **Prosess**                                        | **Dokumenttype**                                                                                        | **Eksempel**       |
|----------------------------------------------------|---------------------------------------------------------------------------------------------------------|--------------------|
| `urn:no:difi:profile:arkivmelding:response:ver1.0` | [Arkivmelding-kvittering](../Dokumenttyper/arkivmeldingkvittering)<br>[Status](../Dokumenttyper/status) | Se eksemplene over |
| `urn:no:difi:profile:avtalt:response:ver1.0`       | [Status](../Dokumenttyper/status)                                                                       | Se eksemplene over |

Ved bruk av eFormidlings meldingstjeneste opptrer en virksomhet vanligvis både som avsender og mottaker.

Om eFormidlings meldingstjeneste er en del av en mottakers kapabiliteter eller ikke avhenger av flere faktorer slik som
beskrevet for den enkelte prosess.

eFormidlings meldingstjeneste er realisert med Altinn Formidling, som brukes som transport.

For å bruke eFormidlings meldingstjeneste må integrasjonspunktet konfigureres med nødvendige tilganger til APIet
Altinn Formidling tilbyr.

Integrasjonspunktet pakker meldingene og sender disse uforandret gjennom APIet Altinn Formidling tilbyr. Følgende filer
sendes:

- sbd.json ([Standard Business Document](../Dokumenttyper/standard_sbd))
- asic.zip ([Dokumentpakke](../Dokumenttyper/standard_dokumentpakke))

Ved bruk av grensesnittet BEST/EDU omformer integrasjonspunktet først fra BEST/EDU til arkivmelding, før meldingen
sendes som beskrevet over.

Saksbehandlingsprosessene krever at mottaker sender tilbake en arkivmelding-kvittering.

I tillegg sender mottakers integrasjonspunkt meldingsstatuser (mottatt og levert) tilbake til avsender. Disse brukes
for å signalisere tilbake fra mottaker til avsender om en melding ble levert til integrasjonspunktet eller om levering
feilet. Dette er interne kontrollmeldinger som håndteres av integrasjonspunktet.

Dersom en velger å integrere mot eFormidling uten integrasjonspunkt må integrasjonen:

- benytte eFormidlings meldingstjeneste hos Altinn Formidling (`service code` og `service edition code`)
- sende tilbake statuser (mottatt og levert) etter mottak av melding
- dersom mottatt melding inneholder Altinn Formidling `senders reference` så må kvitteringer og statuser merkes med
samme `senders reference` når de sendes tilbake

Flytskisse for `arkivmelding`:
<div class="mermaid">
graph LR
A("fa:fa-user Saksbehandler") --> |Fylle inn| B("fa:fa-server Avsenders<br>fagsystem")
B --> |Arkivmelding| C("fa:fa-server" Avsenders<br>integrasjonspunkt)
C --> |Arkivmelding| D("fa:fa-server eFormidlings meldingstjeneste")
D --> |Arkivmelding| E("fa:fa-server Mottakers<br>integrasjonspunkt")
E --> |Arkivmelding| F["fa:fa-server Mottaker<br>fagsystem"]
C --> |Status: Mottatt| B
D --> |Status: Mottatt| C
E --> |Status: Mottatt| D
C --> |Status: Levert| B
D --> |Status: Levert| C
E --> |Status: Levert| D
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
C --> |Status: Mottatt| B
D --> |Status: Mottatt| C
E --> |Status: Mottatt| D
C --> |Status: Levert| B
D --> |Status: Levert| C
E --> |Status: Levert| D
</div>

## Meldingsstatuser

Meldingsstatuser for meldinger sendt med eFormidlings meldingstjeneste:

| Status              | Kommentar                                                                                                                                                        |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OPPRETTET           | Integrasjonspunktet mottar BEST/EDU- eller eFormidling 2.0-melding fra sak-arkivsystem og oppretter en DPO-melding                                               |
| SENDT               | Integrasjonspunkt har sendt forsendelsen til meldingsformidler                                                                                                   |
| MOTTATT             | Avsender mottar bekreftelse på at mottakende integrasjonspunkt har mottatt.                                                                                      | 
| LEVERT              | Leveransen er videresendt til sak-arkivsystemet og bekreftet fullført.                                                                                           |
| LEST                | Appreceipt blir sendt fra mottaker til avsender. Dette er både en kvittering og meldingstype som indikerer at sak-arkivsystemet hos mottaker har fått meldingen. | 

Meldingsstatuser for meldinger mottatt med eFormidlings meldingstjeneste:

| Status              | Kommentar                                                                         |
|---------------------|-----------------------------------------------------------------------------------|
| OPPRETTET           | Integrasjonspunkt laster fra meldingsformidler ned og oppretter meldingen hos seg |
| INNKOMMENDE_MOTTATT | Integrasjonspunkt hos mottaker har mottatt melding.                               |
| INNKOMMENDE_LEVERT  | Har generert to mottakskvitteringer og disse blir sendt til avsender              |


## Neste steg

- [Produktdokumentasjon for Altinn Formidling](https://www.altinndigital.no/produkter/sending-av-dokumenter/) (ekstern lenke)
- [Teknisk dokumentasjon for Altinn Formidling](https://altinn.github.io/docs/utviklingsguider/sending-av-dokumenter/) (ekstern lenke)
- Flere [meldingstjenester](./)
