-----

layout: default  
title: Dokument  
headtitle: Begrepskatalog for Sikker digital post -  
group: complexType

name: Dokument  
prev: Begreper  
—-

{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
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
    [Dokumentpakken](index.html) sammen med en tittel.  
    Denne tittelen vil vises til Innbygger når Dokumentpakken er
    dekryptert og Innbygger er autentisert på tilstrekkelig
    sikkerhetsnivå.

#### Eigenskapar

| Identifikator        | Kardinalitet | Datatype                     |
| -------------------- | ------------ | ---------------------------- |
| href                 | 1..1         | xsd:string                   |
| mime                 | 1..1         | xsd:string                   |
| [Tittel](Tittel)     | 0..1         | [Tittel](Tittel)             |
| [Data](DokumentData) | 0..1         | [DokumentData](DokumentData) |

#### Xml eksempel

``` brush: xml; toolbar: false
        <sdp:Dokument href="melding.pdf" mime="application/pdf">
            <sdp:Tittel lang="no">Vedtak om barnehageplass til Ola</sdp:Tittel>             
        </sdp:Dokument>
```
