---
title: Dokument  
permalink: sdp_dokument.html
sidebar: dpi_sidebar
---

  - Identifikator  
    http://begrep.difi.no/SikkerDigitalPost/1.3.0.RC1/1.3.0.RC1/begrep/Dokument
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon om et enkelt dokument.
  - Datatype  
    complexType
  - Kilde  
    DIFI
  - Kommentar  
    Dette gir en henvisning til dokumentet i
    [Dokumentpakken](dokumentpakke_index.md) sammen med en tittel.  
    Denne tittelen vil vises til Innbygger når Dokumentpakken er
    dekryptert og Innbygger er autentisert på tilstrekkelig
    sikkerhetsnivå.

#### Eigenskapar

| --- | --- | --- |
| Identifikator        | Kardinalitet | Datatype                     |
| href                 | 1..1         | xsd:string                   |
| mime                 | 1..1         | xsd:string                   |
| [Tittel](Tittel.md)     | 0..1         | [Tittel](Tittel.md)             |
| [Data](DokumentData.md) | 0..1         | [DokumentData](DokumentData.md) |

#### Xml eksempel

``` brush: xml; toolbar: false
        <sdp:Dokument href="melding.pdf" mime="application/pdf">
            <sdp:Tittel lang="no">Vedtak om barnehageplass til Ola</sdp:Tittel>             
        </sdp:Dokument>
```
