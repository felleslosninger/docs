---
title: SmsVarsel  

sidebar: begrep_sidebar
---

|---|---|
| Term | {{page.title}} |
| Definisjon | Informasjon om hvordan man skal varsle sluttbruker på sms |
| Datatype | complexType |
| Kjelde | DIFI |
| Kommentar | Beskriver når det skal sendes sms varsel fra postkassen etter at posten er tilgjengeliggjort. Denne tjenesten vil medføre kostnader for Avsender |

#### Eigenskapar

| Identifikator                                    | Kardinalitet | Datatype                                              |
| --- | --- | --- |
| [mobiltelefonnummer]({{site.baseurl}}/resources/begrep/felles/mobiltelefonnummer) | 1..1     | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| [Varslingstekst]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/varslingsTekst)        | 1..1     | [Varslingstekst]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/varslingsTekst)        |
| [Repetisjoner]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Repetisjoner)                     | 1..1         | [sdp:Repetisjoner]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Repetisjoner)                    |

#### Xml eksempel

``` 
    <smsVarsel>
      <mobiltelefonnummer>12121212</mobiltelefonnummer>
      <varslingsTekst lang="no">Viktig melding fra Staten</varslingsTekst>
      <repetisjoner>
        <dagerEtter>0</dagerEtter>
        <dagerEtter>7</dagerEtter>
      </repetisjoner>
    </smsVarsel>
 
```
