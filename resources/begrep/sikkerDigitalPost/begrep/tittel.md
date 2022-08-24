--- 
title: Tittel  

sidebar: dpi_sidebar
---

  - Term  
    {{page.title}}
  - Definisjon  
    Beskrivende tittel for et Dokument
  - Datatype  
    complexType
  - Kilde  
    DIFI
  - Kommentar  
    En beskrivende tittel for dokumentet, tittelen kan inneholde
    sensitive opplysninger da den kun vil vises til Innbygger etter
    dekryptering og når Innbygger er autentisert på tilstrekkelig
    sikkerhetsnivå.

#### Egenskaper

| Identifikator | Kardinalitet | Datatype                 |
| --- | --- | --- |
| lang          | 1..1         | [spraak]({{site.baseurl}}/resources/begrep/felles/spraak) |

### Xml eksempel

    <{{page.title}} lang="no">Vedtaksbrev - støtte til utdanning - saksnr. 2013/1111</{{page.title}}>
