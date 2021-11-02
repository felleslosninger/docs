---
title: Dokument  
permalink: sdp_dokument.html
sidebar: begrep_sidebar
---

|---|---|
|Term|{{page.title}}|
|Definisjon|Informasjon om et enkelt dokument.|
|Datatype|complexType|
|Kilde|DIFI|
|Kommentar|Dette gir en henvisning til dokumentet i [Dokumentpakken](dokumentpakke_index.html) sammen med en tittel. Denne tittelen vil vises til Innbygger når Dokumentpakken er dekryptert og Innbygger er autentisert på tilstrekkelig sikkerhetsnivå.|

#### Egenskaper

| --- | --- | --- |
| Identifikator        | Kardinalitet | Datatype                     |
| href                 | 1..1         | xsd:string                   |
| mime                 | 1..1         | xsd:string                   |
| [Tittel](Tittel.md)     | 0..1         | [Tittel](Tittel.md)             |
| [Data](DokumentData.md) | 0..1         | [DokumentData](DokumentData.md) |

#### Xml eksempel

``` 
        <sdp:Dokument href="melding.pdf" mime="application/pdf">
            <sdp:Tittel lang="no">Vedtak om barnehageplass til Ola</sdp:Tittel>             
        </sdp:Dokument>
```
