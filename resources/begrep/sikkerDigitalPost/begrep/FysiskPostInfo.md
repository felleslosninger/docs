---
title: FysiskpostInfo  
permalink: sdp_fysiskpostinfo
sidebar:
---

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon relatert til presentasjon og behandling av en sikker
    digital post melding
  - Kilde  
    DIFI
  - Kommentar  
    Dette er informasjon om den Digitalpostforsendelsen som vil bli
    brukt av Postkasseleverandør for å presentere og behandle den
    digitale posten.  
    Den ikkeSensitiveTittelen vil bli brukt i dialogen med Innbygger
    dersom ikke Innbygger er autentisert på tilstrekkelig nivå.  
    Den ikkeSensitiveTittelen vil også bli brukt i varsling til
    Innbygger.  
    Når den digitale posten er dekryptert og innbygger er autentisert på
    tilstrekkelig sikkerhetsnivå så vil Tittel i
    [Manifest-filen](../forretningslag/Dokumentpakke/Manifest) brukes.

### Attributer

| --- | --- | --- |
| Identifikator                           | Kardinalitet | Datatype                                              |
| [mottaker](FysiskPostadresse)           | 1..1         | [sdp:FysiskPostadresse](FysiskPostadresse)            |
| [posttype](/Felles/posttype)            | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| SKAL VÆRE LINK TIL /Felles/utskriftstype | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| [retur](FysiskPostRetur)                | 1..1         | [sdp:FysiskPostRetur](FysiskPostRetur)                |
