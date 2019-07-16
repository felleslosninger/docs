-----

layout: egenskap  
title: OrderReference  
headtitle: Begrepskatalog for Sikker digital post -  
group: complexType

name: OrderReference  
prev: Begreper  
—-  
{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Ordrereferanse tildelt av avsender
  - Datatype  
    [cac:OrderReference](https://raw.githubusercontent.com/difi/VEFAvalidatorConf/master/STANDARD/common/xsd/UBL-2.1/xsd/common/UBL-CommonAggregateComponents-2.1.xsd)
  - Kilde  
    [UBL/EHF](https://github.com/difi/VEFAvalidatorConf/blob/master/STANDARD/EHFInvoice/2.0/guide/Implementeringsveileder%20EHF%20Fakturaprosess%20v20_NO.pdf)
  - Kommentar  
    Hentet fra EHF 2.0 - Avsender + cbc:Id skal framkomme i
    fakturagrunnlag dersom dette elementet eksisterer. Se [kap 6.7,
    side 30 i EHF
    implementasjonsguiden](https://github.com/difi/VEFAvalidatorConf/blob/master/STANDARD/EHFInvoice/2.0/guide/Implementeringsveileder%20EHF%20Fakturaprosess%20v20_NO.pdf)

#### Xml eksempel

``` brush: xml; toolbar: false
    <cac:OrderReference> 
        <cbc:ID>123</cbc:ID> 
    </cac:OrderReference>       
```
