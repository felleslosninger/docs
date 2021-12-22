---
 
title: PayloadInfo  

sidebar:
---

## {{page.title}}

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”.html"
    }}":{{page.title}}
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon om selve forretningsmeldingen
  - Datatype  
    complexType
  - Kilde  
    [ebMS 3.0](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/core/ebms-header-3_0-200704.xsd)

### Egenskaper

| Identifikator | Type | Kardinalitet | Kommentar |
| --- | --- | --- | --- |
| PartInfo | PartInfo | 1.. | Beskriver vedlegget |

### Kommentar

En SDP forretningsmelding skal alltid ha en PartInfo med referanse til
SoapBody (som inneholder selve
[meldingen]({{site.baseurl}}/resources/begrep/ID-porten/index), og
alternativt en til med referanse til [ASIC-E
vedlegg](../../forretningslag/Dokumentpakke/index.md). For denne skal det alltid
angis PartProperties for MimeType (konstant “application/cms”) og
Content (konstant “sdp:Dokumentpakke”).

### Xml eksempel

``` brush: xml; toolbar: false
    <eb:PayloadInfo>
        <eb:PartInfo href="#soapBody"/>
        <eb:PartInfo href="cid:1234-4567@some.domain.com">
            <eb:PartProperties>
                <eb:Property name="MimeType">application/cms</eb:Property>
                <eb:Property name="Content">sdp:Dokumentpakke</eb:Property>
            </eb:PartProperties>
        </eb:PartInfo>
    </eb:PayloadInfo>
```
