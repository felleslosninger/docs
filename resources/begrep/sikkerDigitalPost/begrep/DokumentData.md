---
title: DokumentData  
permalink: sdp_dokumentdata.html
sidebar: dpi_sidebar
---


  - Term  
    {{page.title}}
  - Definisjon  
    Strukturert data for beriket visning i innbyggers postkasse
  - Datatype  
    complexType
  - Kjelde  
    DIFI

#### Eigenskapar

| --- | --- | --- | --- |
| Identifikator | Kardinalitet | Datatype   | Beskrivelse                                                                  |
| href          | 1..1         | xsd:string | Filnavn på data-dokumentet i dokumentpakken                                  |
| mime          | 1..1         | xsd:string | Utvidelsens mime-type. SKAL LINKE TIL /forretningslag/Utvidelser.md |

#### Xml eksempel

``` 
brush: xml; toolbar: false

<data href="lenke.xml" mime="application/vnd.difi.dpi.lenke+xml" />
```
