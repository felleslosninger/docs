---
title: FysiskPostRetur  
permalink: sdp_fysiskpostretur.html
sidebar: dpi_sidebar
---

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
| [mottaker](Mottaker.md)                   | 1..1         | [sdp:FysiskPostadresse](FysiskPostadresse.md)            |
| [postHaandtering](returPostHaandtering.md) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
