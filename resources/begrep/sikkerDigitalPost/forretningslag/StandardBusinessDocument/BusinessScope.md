---
title: BusinessScope  
headtitle: Begrepskatalog for Sikker digital post -  
group: forretningslag
permalink: sdp_businessscope.html
sidebar:
---

### {{page.title}}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    inneholder identifikasjon om dokumentet
  - Kilde  
    [GS1](http://www.gs1.org/docs/gsmp/xml/sbdh/CEFACT_SBDH_TS_version1.3.pdf)

### Attributer

| Identifikator      | Kardinalitet | Datatype  | Verdi                                                                                                                                                                   |
| ------------------ | ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type               | 1..1         | xs:string | “ConversationId”                                                                                                                                                        |
| InstanceIdentifier | 1..1         | xs:string | Unik identifikator for konversasjonen. Identifikator som binder meldinger og tilhørende kvitteringer/feilmeldinger sammen. Opprettet av Databehandler. Se format under. |
| Identifier         | 1..1         | xs:string | “urn:no:difi:sdp:1.0”                                                                                                                                                   |

### Format InstanceIdentifier

InstanceIdentifier er i XML skjemaet for SBDH definert som en
tekst-streng. I Sikker Digital Post skal denne alltid være en GUID som
validerer mot følgende regulært uttrykk:

``` 
    [a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12} 
```

Rett format på InstanceIdentifier blir håndhevet av meldingsformidler.

### Xml eksempel

``` 
    <ns3:BusinessScope>
        <ns3:Scope>
            <ns3:Type>ConversationId</ns3:Type>
            <ns3:InstanceIdentifier>37efbd4c-413d-4e2c-bbc5-257ef4a65a45</ns3:InstanceIdentifier> 
            <ns3:Identifier>urn:no:difi:sdp:1.0</ns3:Identifier>
        </ns3:Scope>
    </ns3:BusinessScope>
```
