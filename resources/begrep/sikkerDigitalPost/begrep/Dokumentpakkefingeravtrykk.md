-----

layout: egenskap  
title: Dokumentpakkefingeravtrykk  
headtitle: Begrepskatalog for Sikker digital post -  
group: complexType

name: Dokumentpakkefingeravtrykk  
prev: Begreper  
—-

{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Hash av den krypterte
    [dokumentpakken](../forretningslag/Dokumentpakke/)
  - Datatype  
    complexType
  - Kjelde  
    DIFI

#### Eigenskapar

| Identifikator                                                        | Kardinalitet | Datatype                                                              | Beskrivelse                                                                             |
| -------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [DigestMethod](http://www.w3.org/TR/xmldsig-core1/#sec-DigestMethod) | 1..1         | [ds:SignedInfo](http://www.w3.org/TR/xmldsig-core1/#sec-DigestMethod) | Referanse til Hash algoritmen brukt for lage hash                                       |
| [DigestValue](http://www.w3.org/TR/xmldsig-core1/#sec-DigestValue)   | 1..1         | [ds:DigestValue](http://www.w3.org/TR/xmldsig-core1/#sec-DigestValue) | Base64 encoded Hash av den krypterte [Dokumentpakken](../forretningslag/Dokumentpakke/) |

#### Xml eksempel

``` brush: xml; toolbar: false

<dokumentpakkefingeravtrykk>
            <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
            <ds:DigestValue></ds:DigestValue>
</dokumentpakkefingeravtrykk>
```
