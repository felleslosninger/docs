---
title: EpostVarsel 

sidebar: begrep_sidebar
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
| [epostadresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/epostadresse)     | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| [varslingstekst]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/varslingsTekst) | 1..1         | [varslingstekst]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/varslingsTekst)           |
| [repetisjoner]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Repetisjoner)             | 1..1         | [sdp:Repetisjoner]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Repetisjoner)                      |

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
