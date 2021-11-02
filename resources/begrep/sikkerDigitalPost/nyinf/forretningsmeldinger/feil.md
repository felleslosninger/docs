---
title: Feil
permalink: dpi_feil.html
sidebar: dpi_timo_sidebar
dpi_common_schema_location: https://docs.digdir.no/schemas/dpi/commons.schema.json
---

![](/images/dpi/underarbeide.png)

### Beskrivelse

Feilmelding sendes fra Postkasseleverandør når det oppstår en uventet
feil som ikke kan håndteres av postkasseleverandør innenfor SLA krav.  
Feilene kategoriseres overordnet i to typer, enten som klient feil som
Avsender må rette opp i eller som server feil som oppstår hos
postkasseleverandør.

#### Håndtering av klient feil

Feil kategorisert som klientfeil vil komme dersom Avsender har sendt en
digital postmelding som ikke kan behandles av Postkasseleverandør.  
Dette kan være feil som f.eks:

  - Adresseringen til Mottaker er feil
  - Postkasseleverandør kan ikke dekryptere dokumentpakken
  - Varslingreglene bryter med forretningsregler
  - Virkningsdato er satt for langt frem i tid

Generelt vil dette være alle feil med
[Digital](dpi_digital.html.md) meldignen [Utskrift](dpi_utskrift.html) meldingen og
[Dokumentpakken](dpi_dokumentpakke_index.html).

Feilen må utbedres og ny meldin må sendes.

#### Håndtering av server feil

Feil kategorisert som serverfeil vil oppstå dersom postkasseleverandør
har interne feil som stopper behandlingen av den digitale postmeldingen.

### Schema
[innbyggerpost_dpi_feil_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_feil_1_0.schema.json)

### Properties
| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| [avsender](sdp_avsender.html) | 1..1 | [avsender]({{ page.dpi_common_schema_location }}#/definitions/avsender) |
| [mottaker](2sdp_mottaker.html) | 1..1 | [mottaker]({{ page.dpi_common_schema_location }}#/definitions/virksomhetmottaker) |
| [maksinportentoken](dpi_maskinportentoken.html) | 1..1 | [maksinportentoken]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) |
| [tidspunkt](dpi_maskinportentoken.html) | 1..1 | [tidspunkt]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) string - date-time iht [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) |
| [feiltype](sikkerhetsnivaa.html) | 0..1 | [feiltype]({{ page.dpi_common_schema_location }}#/definitions/sikkerhetsnivaa) string KlIENT/SERVER|
| [detaljer](sikkerhetsnivaa.html) | 0..1 | [detaljer]({{ page.dpi_common_schema_location }}#/definitions/sikkerhetsnivaa) string|


#### Kodeverk for feiltype

feiltype kan ha følgende verdi:

| Kodeverdi | Beskrivelse |
| --- | --- |
| KLIENT | Feilen kommer pga. feil på input eller andre feil der [Avsender](sdp_avsender.html) må rette opp i årsaken til feilen |
| SERVER | Feilen kommer av feil på sentral infrastruktur. [Avsender](sdp_avsender.html) må ta kontakt med Sentralforvalter for å få rettet opp i feilen. |
