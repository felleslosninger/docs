---
title: Dokument  

sidebar: begrep_sidebar
redirect_from: /sdp_dokument
---

|---|---|
|Term|{{page.title}}|
|Definisjon|Informasjon om et enkelt dokument.|
|Datatype|complexType|
|Kilde|DIFI|
|Kommentar|Dette gir en henvisning til dokumentet i [Dokumentpakken]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Dokumentpakke/) sammen med en tittel. Denne tittelen vil vises til Innbygger når Dokumentpakken er dekryptert og Innbygger er autentisert på tilstrekkelig sikkerhetsnivå.|

#### Egenskaper

| --- | --- | --- |
| Identifikator        | Kardinalitet | Datatype                     |
| href                 | 1..1         | xsd:string                   |
| mime                 | 1..1         | xsd:string                   |
| [Tittel]({{site.baseurl}}/resources/begrep/felles/tittel)     | 0..1         | [Tittel]({{site.baseurl}}/resources/begrep/felles/tittel)             |
| [Data]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/DokumentData) | 0..1         | [DokumentData]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/DokumentData) |

#### Xml eksempel

``` 
        <sdp:Dokument href="melding.pdf" mime="application/pdf">
            <sdp:Tittel lang="no">Vedtak om barnehageplass til Ola</sdp:Tittel>             
        </sdp:Dokument>
```
