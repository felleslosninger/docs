---
title: EpostVarsel 
permalink: sdp_epostvarsel.html
sidebar: dpi_sidebar
---

|---|---|
| Term | {{page.title}} |
| Definisjon | Informasjon om hvordan man skal varsle sluttbruker på epost |
| Datatype | complexType |
| Kjelde | DIFI |
| Kommentar | Beskriver når det skal sendes epostvarsel fra postkassen etter at posten er tilgjengeliggjort |

#### Eigenskapar

| --- | --- | --- |
| Identifikator                            | Kardinalitet | Datatype                                              |
| [epostadresse](epostadresse.md)     | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| [varslingstekst](varslingstekst.html) | 1..1         | [varslingstekst](varslingstekst.html)           |
| [repetisjoner](Repetisjoner.md)             | 1..1         | [sdp:Repetisjoner](Repetisjoner.md)                      |

#### Xml eksempel

``` 
    <epostVarsel>
      <epostadresse>01012295312_test@minid.difi.no</epostadresse>
      <varslingsTekst lang="no">Viktig melding fra Staten</varslingsTekst>
      <repetisjoner>
        <dagerEtter>0</dagerEtter>
        <dagerEtter>7</dagerEtter>
      </repetisjoner>
    </epostVarsel>
 
```
