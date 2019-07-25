---
title: manifest  
permalink: sdp_manifest.html
sidebar: sidebar_begrep
---

|---|---|
| Identifikator |  |
| Term          | {{page.title}} |
| Definisjon    | inneholder metadata relatert til hver fil i en forsendelse. |
| Datatype      | complexType |
| Kilde         | DIFI |
| Kommentar     | Manifest er en xml |
| fil           | som inneholder relevant informasjon om [dokumentene](../../begrep/Dokument.md) i [dokumentpakken](index.md). Manifest xml |
| filen         | skal langtidsoppbevares sammen med dokumentene for å bevare integriteten på hele [dokumentpakken](index.md) over lang tid. |

### Attributer

| Identifikator                     | Kardinalitet | Datatype                              |
| --------------------------------- | ------------ | ------------------------------------- |
| [Mottaker](../../begrep/Mottaker.md) | 1..1         | [sdp:Mottaker](../../begrep/Mottaker.md) |
| [Avsender](../../begrep/Avsender.md) | 1..1         | [sdp:Avsender](../../begrep/Avsender.md) |
| hoveddokument                     | 1..1         | [sdp:Dokument](../../begrep/Dokument.md) |
| vedlegg                           | 0..200       | [sdp:Dokument](../../begrep/Dokument.md) |

### Eksempel

``` brush: xml; toolbar: false
<?xml version="1.0" encoding="UTF-8"?>
<manifest
  xmlns="http://begrep.difi.no/sdp/schema_v10"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://begrep.difi.no/sdp/schema_v10 ../xsd/sdp-manifest.xsd ">

  <mottaker>
    <person>
      <personidentifikator>17051400000</personidentifikator>
      <postkasseadresse>ola.nordmann#0ABC</postkasseadresse>
    </person>
  </mottaker>

  <avsender>
    <organisasjon authority="iso6523-actorid-upis">9908:123456789</organisasjon>
    <avsenderidentifikator>A</avsenderidentifikator>
    <fakturaReferanse>ABC barnehage</fakturaReferanse>
  </avsender>

  <hoveddokument href="vedtak_2398324.pdf" mime="application/pdf">
    <tittel lang="no">Vedtak</tittel>
  </hoveddokument>

  <vedlegg href="info.html" mime="text/html">
    <tittel lang="no">informasjon</tittel>
  </vedlegg>

  <vedlegg href="journal.txt" mime="text/plain">
    <tittel lang="no">journal</tittel>
  </vedlegg>

</manifest>
```
