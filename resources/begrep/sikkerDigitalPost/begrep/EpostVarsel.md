-----

layout: egenskap  
title: EpostVarsel  
headtitle: Begrepskatalog for Sikker digital post -  
group: complexType,

name: EpostVarsel  
prev: Begreper  
—-

{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon om hvordan man skal varsle sluttbruker på epost
  - Datatype  
    complexType
  - Kjelde  
    DIFI
  - Kommentar  
    Beskriver når det skal sendes epostvarsel fra postkassen etter at
    posten er tilgjengeliggjort.

#### Eigenskapar

| Identifikator                            | Kardinalitet | Datatype                                              |
| ---------------------------------------- | ------------ | ----------------------------------------------------- |
| [epostadresse](/Felles/epostadresse)     | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| [varslingsTekst](/Felles/varslingsTekst) | 1..1         | [varslingsTekst](/Felles/varslingsTekst)              |
| [repetisjoner](Repetisjoner)             | 1..1         | [sdp:Repetisjoner](Repetisjoner)                      |

#### Xml eksempel

``` brush: xml; toolbar: false
    <epostVarsel>
      <epostadresse>01012295312_test@minid.difi.no</epostadresse>
      <varslingsTekst lang="no">Viktig melding fra Staten</varslingsTekst>
      <repetisjoner>
        <dagerEtter>0</dagerEtter>
        <dagerEtter>7</dagerEtter>
      </repetisjoner>
    </epostVarsel>

 
```
