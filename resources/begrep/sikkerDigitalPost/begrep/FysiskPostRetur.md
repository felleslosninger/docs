-----

layout: egenskap  
title: FysiskPostRetur  
headtitle: Begrepskatalog for Sikker digital post -  
group: complexType

name: FysiskPostRetur  
prev: Begreper  
—-  
{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon som brukes ved retur av post som av en eller annen grunn
    ikke kan levers til mottaker.
  - Kilde  
    DIFI
  - Kommentar  
    Informasjon som brukes ved retur av post som av en eller annen grunn
    ikke kan levers til mottaker.

### Attributer

| Identifikator                                   | Kardinalitet | Datatype                                              |
| ----------------------------------------------- | ------------ | ----------------------------------------------------- |
| [mottaker](FysiskPostadresse)                   | 1..1         | [sdp:FysiskPostadresse](FysiskPostadresse)            |
| [postHaandtering](/Felles/returPostHaandtering) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
