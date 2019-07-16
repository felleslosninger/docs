-----

layout: egenskap  
title: DokumentData  
headtitle: Begrepskatalog for Sikker digital post -  
group: complexType

name: DokumentData  
prev: Begreper  
—-

{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Strukturert data for beriket visning i innbyggers postkasse
  - Datatype  
    complexType
  - Kjelde  
    DIFI

#### Eigenskapar

| Identifikator | Kardinalitet | Datatype   | Beskrivelse                                                                  |
| ------------- | ------------ | ---------- | ---------------------------------------------------------------------------- |
| href          | 1..1         | xsd:string | Filnavn på data-dokumentet i dokumentpakken                                  |
| mime          | 1..1         | xsd:string | Utvidelsens mime-type. [Tilgjengelig utvidelser](/forretningslag/Utvidelser) |

#### Xml eksempel

``` brush: xml; toolbar: false

<data href="lenke.xml" mime="application/vnd.difi.dpi.lenke+xml" />
```
