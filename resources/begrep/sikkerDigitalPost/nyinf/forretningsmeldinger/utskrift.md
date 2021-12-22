---
title: Utskrift

sidebar: dpi_timo_sidebar
dpi_common_schema_location: https://docs.digdir.no/schemas/dpi/commons.schema.json
---

![](/images/dpi/underarbeide.png)

| --- | --- |
| Term  | {{page.title}} |
| Definisjon | Utskrift melding med tilhørende [Dokumentpakke](dpi_dokumentpakke_index.html) |
| Kilde | DIFI |
| Kommentar  | Utskrift melding med tilhørende Dokumentpakke er postforsendelsen [Avsender](sdp_avsender.html) sender til [Mottaker](2sdp_mottaker.html). Denne inneholder informasjon om hvilken Avsender som er [Behandlingsansvarlig](dpi_aktorer.html), en knytning til dokumentpakken igjennom [Dokumentpakkefingeravtrykk](sdp_dokumentpakkefingeravtrykk.html)  og informasjon om behandlingsregler som [Postkasseleverandør](dpi_aktorer.html) skal bruke for utskrift og forsendelse. |

Postkassen kvitterer for meldingen gjennom å sende [Leveringskvittering](dpi_leveringskvittering.html) til avsender. Leveringskvittering for at postkassen har tatt ansvar for å tilgjengeliggjøre meldingen.

### Schema
[innbyggerpost_dpi_utskrift_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_utskrift_1_0.schema.json)

### Properties

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| [avsender](sdp_avsender.html) | 1..1 | [avsender]({{ page.dpi_common_schema_location }}#/definitions/avsender) |
| [mottaker](2sdp_mottaker.html) | 1..1 | [mottaker]({{ page.dpi_common_schema_location }}#/definitions/adresseInformasjon) |
| [dokumentpakkefingeravtrykk](sdp_dokumentpakkefingeravtrykk.html) | 1..1 | [dokumentpakkefingeravtrykk]({{ page.dpi_common_schema_location }}#/definitions/dokumentpakkefingeravtrykk) |
| [maksinportentoken](dpi_maskinportentoken.html) | 1..1 | [maksinportentoken]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) |
| [utskriftstype](utskriftstype.html) | 0..1 | [utskriftstype]({{ page.dpi_common_schema_location }}#/definitions/utskriftstype) |
| [retur](sdp_fysiskpostretur.html) | 0..1 | [retur]({{ page.dpi_common_schema_location }}#/definitions/retur) |
| [posttype](posttype.html) | 0..1 | [posttype]({{ page.dpi_common_schema_location }}#/definitions/posttype) |

