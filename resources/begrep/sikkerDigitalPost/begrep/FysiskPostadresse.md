---
title: FysiskPostadresse  
permalink: sdp_fysiskpostadresse.html
sidebar:
---

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    FysiskPostadresse definert for Sikker digital post
  - Datatype  
    complexType
  - Kilde  
    DIFI
  - Kommentar  
    FysiskPostadresse er adressen til [mottakeren](Mottaker) som Post
    skal sendes til.

#### Attributer

FysiskPostadresse er enten en NorskPostadresse eller en
UtenlandskPostadresse.

#### NorskPostadresse:

| --- | --- | --- | --- |
| Term | Kardinalitet | Datatype | Regler |
| [navn](http://www.w3.org/TR/xmlschema-2/#string)           | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 130 tegn |
| [adresselinje 1](http://www.w3.org/TR/xmlschema-2/#string) | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 100 tegn |
| [adresselinje 2](http://www.w3.org/TR/xmlschema-2/#string) | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 100 tegn |
| [adresselinje 3](http://www.w3.org/TR/xmlschema-2/#string) | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 100 tegn |
| [postnummer](http://www.w3.org/TR/xmlschema-2/#string)     | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | 4 siffer      |
| [poststed](http://www.w3.org/TR/xmlschema-2/#string)       | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 80 tegn  |

#### UtenlandskPostadresse:

| --- | --- | --- | --- |
| Term | Kardinalitet | Datatype | Regler |
| [navn](http://www.w3.org/TR/xmlschema-2/#string)           | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 130 tegn |
| [adresselinje 1](http://www.w3.org/TR/xmlschema-2/#string) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 100 tegn |
| [adresselinje 2](http://www.w3.org/TR/xmlschema-2/#string) | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 100 tegn |
| [adresselinje 3](http://www.w3.org/TR/xmlschema-2/#string) | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 100 tegn |
| [adresselinje 4](http://www.w3.org/TR/xmlschema-2/#string) | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks 100 tegn |

i tillegg et av følgende to felt:

|                                                      |      |                                                       |                                                                                                                                         |
| --- | --- | --- | --- |
| [landkode](http://www.w3.org/TR/xmlschema-2/#string) | 1..1 | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Anbefalt brukt fremfor land. To-bokstavs landkode ihht [ISO 3166-1 alpha-2 standarden](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) |
| [land](http://www.w3.org/TR/xmlschema-2/#string)     | 1..1 | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) | Maks. 80 siffer, brukes dersom Avsender ikke har mulighet til å benytte landkode.                                                       |
