-----

layout: egenskap  
title: SmsVarsel  
headtitle: Begrepskatalog for Sikker digital post -  
group: complexType

name: SmsVarsel  
prev: Begreper

-----

{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon om hvordan man skal varsle sluttbruker på sms
  - Datatype  
    complexType
  - Kjelde  
    DIFI
  - Kommentar  
    Beskriver når det skal sendes sms varsel fra postkassen etter at
    posten er tilgjengeliggjort.  
    Denne tjenesten vil medføre kostnader for Avsender.

#### Eigenskapar

| Identifikator                                    | Kardinalitet | Datatype                                              |
| ------------------------------------------------ | ------------ | ----------------------------------------------------- |
| [mobiltelefonnummer](/Felles/mobiltelefonnummer) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| [varslingsTekst](/Felles/varslingsTekst)         | 1..1         | [varslingsTekst](/Felles/varslingsTekst)              |
| [Repetisjoner](Repetisjoner)                     | 1..1         | [sdp:Repetisjoner](Repetisjoner)                      |

#### Xml eksempel

``` brush: xml; toolbar: false
    <smsVarsel>
      <mobiltelefonnummer>12121212</mobiltelefonnummer>
      <varslingsTekst lang="no">Viktig melding fra Staten</varslingsTekst>
      <repetisjoner>
        <dagerEtter>0</dagerEtter>
        <dagerEtter>7</dagerEtter>
      </repetisjoner>
    </smsVarsel>

 
```
