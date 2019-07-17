---
title: Person 
permalink: sdp_person.html
sidebar:
---

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Person definert for Sikker digital post
  - Datatype  
    complexType
  - Kilde  
    DIFI
  - Kommentar  
    Person er [mottakeren](Mottaker) som Digital Post skal sendes til.

Merk at Person ikke er unik definert på tvers av Difi sine
felleskomponenter, men at hver av felleskomponentene har en definisjon
av Person i forhold til behovene i den enkelte felleskomponentene.

#### Attributer

| Term                                               | Kardinalitet | Datatype                                              |
| --- | --- | --- |
| SKAL VÆRE LINK TIL ../felles/personidentifikator | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| [postkasseadresse](../felles/postkasseadresse)       | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |

#### Xml eksempel

``` brush: xml; toolbar: false
<sdp:Person>
    <sdp:personidentifikator>01012295312</sdp:personidentifikator>
    <sdp:postkasseadresse>1</sdp:postkasseadresse>
</sdp:Person>
```
