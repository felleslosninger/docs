-----

layout: default  
title: manifest  
headtitle: Begrepskatalog for Sikker digital post -  
group: forretningslag

id: Forretningslag/Manifest

next: Forretningslag/Dokumentformater

-----

{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    inneholder metadata relatert til hver fil i en forsendelse.
  - Datatype  
    complexType
  - Kilde  
    DIFI
  - Kommentar  
    Manifest er en xml-fil som inneholder relevant informasjon om
    [dokumentene](../../begrep/Dokument) i [dokumentpakken](index).  
    Manifest xml-filen skal langtidsoppbevares sammen med dokumentene
    for å bevare integriteten på hele [dokumentpakken](index) over lang
    tid.

### Attributer

| Identifikator                     | Kardinalitet | Datatype                              |
| --------------------------------- | ------------ | ------------------------------------- |
| [Mottaker](../../begrep/Mottaker) | 1..1         | [sdp:Mottaker](../../begrep/Mottaker) |
| [Avsender](../../begrep/Avsender) | 1..1         | [sdp:Avsender](../../begrep/Avsender) |
| hoveddokument                     | 1..1         | [sdp:Dokument](../../begrep/Dokument) |
| vedlegg                           | 0..200       | [sdp:Dokument](../../begrep/Dokument) |

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
