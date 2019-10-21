---

title: MessageInfo  
permalink: sdp_usermessage.html
sidebar: dpi_sidebar
---

## {{page.title}}

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”.html"
    }}":{{page.title}}
  - Term  
    {{page.title}}
  - Definisjon  
    Intern identifikator og timestamp
  - Datatype  
    complexType
  - Kilde  
    [ebMS 3.0](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/core/ebms-header-3_0-200704.xsd)

### Egenskaper

| Identifikator | Type | Kardinalitet | Kommentar |
| --- | --- | --- | --- |
| Timestamp | xsd:dateTime | 1..1 | |
| MessageId | tns:none-empty-string | 1..1 | Unik identifikator, satt av MSH. Kan med fordel benytte SBDH.InstanceIdentifier |
| RefToMessageId | tns:none-empty-string | 0..1 | Brukes dersom meldingen er relatert til en annen. Refererer alltid til MessageId. |

### Xml eksempel

``` 
    <eb:MessageInfo>
        <eb:Timestamp>2014-02-10T14:21:42.520Z</eb:Timestamp>
        <eb:MessageId>60a3ade5-84d1-46d7-b2cc-5f4fa15f41e5</eb:MessageId>
    </eb:MessageInfo>
```
