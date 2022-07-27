---

title: CollaborationInfo  

sidebar: dpi_sidebar
redirect_from: /sdp_collaborationinfo
---

## {{page.title}}

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”.html"
    }}":{{page.title}}
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon om avtalt samhandlingsmønster for meldingen
  - Datatype  
    complexType
  - Kilde  
    [ebMS 3.0](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/core/ebms-header-3_0-200704.xsd)
  - Kommentar  
    PMode.Agreement for sending av post er dokumentert her:

<!-- end list -->

  - [FormidleDigitalPostForsendelse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/transportlag/Meldingsutveksling/FormidleDigitalPostForsendelse)
  - [KvitteringsForespoersel]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/transportlag/Meldingsutveksling/KvitteringsForespoersel)

### Egenskaper

| Identifikator | Type | Kardinalitet | Kommentar |
| --- | --- | --- | --- |
| AgreementRef | tns:none-empty-string | 0..1 | Skal være PMode.Agreement. Dersom den ikke er satt brukes standardverdiene fra PMode.Agreement |
| Service | tns:Service | 1..1 | Verdi i PMode\[1\].BusinessInfo.Service |
| Action | xsd:token | 1..1 | PMode\[1\].BusinessInfo.Action |
| ConversationId | xsd:token | 1..1 | Alltid SBDH.InstanceIdentifiser til den opprinnelige DigitalForsendelse meldingen |

### Xml eksempel

``` 
    <eb:CollaborationInfo>
        <eb:AgreementRef>http://begrep.difi.local/SikkerDigitalPost/Meldingsutveksling/FormidleDigitalPostForsendelse</eb:AgreementRef>
        <eb:Service>SDP</eb:Service>
        <eb:Action>FormidleDigitalPost</eb:Action>
        <eb:ConversationId>%%SBD.InstanceIdentifier%%</eb:ConversationId>
    </eb:CollaborationInfo>
```
