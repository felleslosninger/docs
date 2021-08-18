---
title: Returpostkvittering
permalink: dpi_returpostkvittering.html
sidebar: dpi_timo_sidebar
---

![](/images/dpi/underarbeide.png)

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | En [Kvitteringsmelding](dpi_kvitteringer.html) fra Utskriftstjenesten til Avsender om at post ikke kunne leveres til Mottaker. |
| Kilde         | DIFI |
| Kommentar     | Dette er Kvittering på at posten har kommet i retur og har blitt makulert. |

Kvitteringen leveres når brevene er mottatt i retur av utskrift og
forsendelsestjenesten, registrert og makulert. Dette forutsetter at
avsender har valgt å benytte denne tjenesten i feltet
(Link til /felles/returPostStrategi.md) i opprinnelig melding.  
Kvitteringen vil komme flere dager etter at en forsendelse er sendt til
utskrift og forsendelsetjenesten, dette er overordne de steg som skal
gjennomføres før Avsender får ReturpostKvittering

| Steg | Beskrivelse | Antatt tidsbruk |
| --- | --- | --- |
| Utskrift | Brevet skrives ut og postlegges | 1 dag |
| Forsendelse | Brevet forsendes til Avsender | 2 til 5 dager |
| Retur til EA tjeneste | Brev som ikke kan leveres vil bruke noe tid tilbake til retur tjenesten | 1 til 2 dager |
| Behandling av returpost | Brev makuleres og kvittering skapes | 2 - 4 dager |
| Retur av kvittering | Kvittering gjøres tilgjengelig i meldingsformidler | Umiddelbart |

### Schema
[innbyggerpost_dpi_returpostkvittering_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_returpostkvittering_1_0.schema.json)