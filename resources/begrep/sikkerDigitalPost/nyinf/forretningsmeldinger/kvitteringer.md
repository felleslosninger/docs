---
title: Kvitteringer
permalink: dpi_kvitteringer.html
sidebar: dpi_timo_sidebar
dpi_common_schema_location: https://docs.digdir.no/schemas/dpi/commons.schema.json
---

![](/images/dpi/underarbeide.png)

|---|---|
| Term          | {{page.title}} |
| Definisjon    | En kvitteringsmelding på en [digital](DigitalPostMelding.md) melding, [utskrift]() melding eller en [flyttet] melding fra en [Avsender](../begrep/Avsender.md). |
| Kilde         | DigDir |
| Kommentar     |  |

#### Arkivering av kvittering

Det anbefales at [Behandlingsansvarlig](dpi_aktorer.html) arkiverer kvitteringen som bevis på at DPI meldingen er levert til [mottaker]((2sdp_mottaker.html). En bør da arkivere hele JWT'en da denne inneholder signatur fra mottaker.



### Properties
Samtlige kvitteirnger inneholder undernevnte properties, varslingfeiletkvitterin har to ekstra

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| [avsender](sdp_avsender.html) | 1..1 | [avsender]({{ page.dpi_common_schema_location }}#/definitions/avsender) |
| [mottaker](2sdp_mottaker.html) | 1..1 | [mottaker]({{ page.dpi_common_schema_location }}#/definitions/virksomhetmottaker) |
| [maksinportentoken](dpi_maskinportentoken.html) | 1..1 | [maksinportentoken]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) |
| [tidspunkt](dpi_maskinportentoken.html) | 1..1 | [tidspunkt]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) string - date-time iht [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) |

### Kvitteringer

Følgende konkrete kvitteringer er definert:

  - [LeveringsKvittering](LeveringsKvittering.md)
  - [AapningsKvittering](AapningsKvittering.md)
  - [VarslingfeiletKvittering](VarslingfeiletKvittering.md)
  - [MottaksKvittering](MottaksKvittering.md)
