-----

layout: default  
title: DocumentIdentification  
headtitle: Begrepskatalog for Sikker digital post -  
group: forretningslag

id: Forretningslag/DocumentIdentification  
next: Forretningslag/BusinessScope

-----

{% include variables.html %}

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

| Identifikator       | Kardinalitet | Datatype    | Verdi                                                                                                                      |
| ------------------- | ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| Standard            | 1..1         | xs:string   | “urn:no:difi.sdp:1.0”                                                                                                      |
| TypeVersion         | 1..1         | xs:string   | “1.0”                                                                                                                      |
| InstanceIdentifier  | 1..1         | xs:string   | Unik identifikator for meldingen. Opprettet av Databehandler. Se format under.                                             |
| Type                | 1..1         | xs:string   | Type forretningsmelding. Skal alltid være “local-name” til rot-elementet XML’en til forretningmeldingen. Se kodeverk under |
| MultipleType        | 0..0         | xs:boolean  | brukes ikke                                                                                                                |
| CreationDateAndTime | 1..1         | xs:dateTime | Tidspunkt for oppretting av [Standard Business Document](index)                                                            |

### Format InstanceIdentifier

InstanceIdentifier er i XML skjemaet for SBDH definert som en
tekst-streng. I Sikker Digital Post skal denne alltid være en GUID som
validerer mot følgende regulært uttrykk:

``` 
    [a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12} 
```

Rett format på InstanceIdentifier blir håndhevet av meldingsformidler.

### Kodeverk: Type

I Sikker Digital Post vil type være en av følgende:

  - digitalPost
  - kvittering

### Xml eksempel

``` 
    <DocumentIdentification>
        <Standard>urn:no:difi.sdp:1.0</Standard>
        <TypeVersion>1.0</TypeVersion>
        <InstanceIdentifier>12e57bde-ea5d-43ee-96b6-e2cf73f8311e</InstanceIdentifier> <!-- Dette er den reelle unike identifikatoren i SDB -->
        <Type>digitalPost</Type>
        <CreationDateAndTime>2013-02-19T05:10:10Z</CreationDateAndTime>
    </DocumentIdentification>
```

#### XSD

``` 

<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
     targetNamespace="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader"
     xmlns="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader"
     elementFormDefault="qualified" attributeFormDefault="unqualified">

  <xs:complexType name="DocumentIdentification">
    <xs:sequence>
      <xs:element name="Standard" type="xs:string"/>
      <xs:element name="TypeVersion" type="xs:string"/>
      <xs:element name="InstanceIdentifier" type="xs:string"/>
      <xs:element name="Type" type="xs:string"/>
      <xs:element name="MultipleType" type="xs:boolean" minOccurs="0"/>
      <xs:element name="CreationDateAndTime" type="xs:dateTime"/>
    </xs:sequence>
  </xs:complexType>
</xs:schema>
```
