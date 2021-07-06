---
title: Digital
permalink: dpi_digital.html
sidebar: dpi_timo_sidebar
---

![](/images/dpi/underarbeide.png)

| --- | --- |
| Term  | {{page.title}} |
| Definisjon | En digital post med tilhørende [Dokumentpakke](dpi_dokumentpakke_index.html) |
| Kilde | DIFI |
| Kommentar  | Digital post melding med tilhørende Dokumentpakke er postforsendelsen [Avsender](../begrep/Avsender.md) sender til [Mottaker](../begrep/Mottaker.md). Denne inneholder informasjon om hvilken Avsender som er [Behandlingsansvarlig](../forretningslag/Aktorer.md), en knytning til dokumentpakken igjennom [Dokumentpakkefingeravtrykk](../begrep/Dokumentpakkefingeravtrykk.md)  og informasjon om behandlingsregler som [Postkasseleverandør](../forretningslag/Aktorer.md) skal bruke for å tilgjengeliggjøre posten. |

Postkassen kvitterer for meldingen gjennom å sende [Leveringskvittering](dpi_leveringskvittering.html) til avsender. Leveringskvittering for at postkassen har tatt ansvar for å tilgjengeliggjøre meldingen.

### Schema
[innbyggerpost_dpi_digital_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_digital_1_0.schema.json)

### Attributer

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| [avsender](sdp_avsender.html) | 1..1 | [avsender]({{site.dpi_schema_location}}#/definitions/avsender) |
| [mottaker](2sdp_mottaker.html) | 1..1 | [mottaker]({{site.dpi_schema_location}}#/definitions/personmottaker) |
| [dokumentpakkefingeravtrykk](../begrep/Dokumentpakkefingeravtrykk.md) | 1..1 | [dokumentpakkefingeravtrykk]({{site.dpi_schema_location}}#/definitions/dokumentpakkefingeravtrykk) |
| [maksinportentoken](dpi_maskinportentoken.html) | 1..1 | [sdp:Dokumentpakkefingeravtrykk]({{site.dpi_schema_location}}#/definitions/maskinportentoken) |
| [sikkerhetsnivaa](sikkerhetsnivaa.html) | 0..1 | [sikkerhetsnivaa]({{site.dpi_schema_location}}#/definitions/sikkerhetsnivaa) |
| [virkningsdato](virkningsdato.html) | 0..1 | [virkningsdato]({{site.dpi_schema_location}}#/definitions/virkningsdato) |
| [virkningstidspunkt](virkningstidspunkt.html) | 0..1 | [virkningstidspunkt]({{site.dpi_schema_location}}#/definitions/virkningstidspunkt) |
| [aapningskvittering](aapningskvittering.html) | 0..1 | [aapningskvittering]({{site.dpi_schema_location}}#/definitions/aapningskvittering) |
| [ikkesensitivtittel](ikkesensitivtittel.html) | 0..1 | [ikkesensitivtittel]({{site.dpi_schema_location}}#/definitions/ikkesensitivtittel) |
| [varsler](sdp_varsler.html) | 0..1 | [varsler]({{site.dpi_schema_location}}#/definitions/varsler) |
