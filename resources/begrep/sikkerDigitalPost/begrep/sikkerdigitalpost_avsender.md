---
title: Avsender  
permalink: sikkerdigitalpost_avsender.html
sidebar:
---  

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Juridisk organisasjon/entitet som er Behandlingsansvarlig for
    innholdet i den digitale posten,
  - Datatype  
    complexType
  - Kilde  
    DIFI
  - Kommentar  
    Avsender er den som er ansvarlig for innholdet i forsendelsen.  
    Kan være forskjellige frå Databehandler (for eksempel kan SvarUT
    være databehandler på vegne av en kommune)

#### Egenskaper

| --- | --- | --- |
| Identifikator                                          | Kardinalitet | Datatype |                                                        
| [organisasjon](/Felles/virksomhetsidentifikator)       | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)             |
| [avsenderidentifikator](/Felles/avsenderidentifikator) | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)             |
| fakturaReferanse                                       | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) \[maks 40\] |

#### Xml eksempel

``` brush: xml; toolbar: false
    <avsender>
        <organisasjon authority="iso6523-actorid-upis">9908:123456789</organisasjon>
        <avsenderidentifikator>12345</avsenderidentifikator>
        <fakturaReferanse>123</fakturaReferanse>        
    </avsender>
```
