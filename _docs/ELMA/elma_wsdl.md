---
title: WSDL
description: WSDL for Elma
summary: "Elma WSDL"
permalink: elma_wsdl.html
product: elma
sidebar: elma_sidebar
---

### WSDL

https://smp.difi.no/ws/2.0?wsdl

```xml
<?xml version='1.0' encoding='UTF-8'?><wsdl:definitions xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:http="http://schemas.xmlsoap.org/soap/http/" xmlns:elma="no:difi:elma:smp:webservice" name="elmaService" targetNamespace="no:difi:elma:smp:webservice">
  <wsdl:types>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:types="no:difi:elma:smp:webservice:types" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:responses="no:difi:elma:smp:webservice:responses" xmlns:http="http://schemas.xmlsoap.org/soap/http/" xmlns:elma="no:difi:elma:smp:webservice" elementFormDefault="unqualified" targetNamespace="no:difi:elma:smp:webservice" version="2.0">

            
  <xs:import namespace="no:difi:elma:smp:webservice:types" schemaLocation="https://smp.difi.no/ws/2.0/?xsd=xsd/Types_v1.xsd"/>
            
  <xs:import namespace="no:difi:elma:smp:webservice:responses" schemaLocation="https://smp.difi.no/ws/2.0/?xsd=xsd/Responses_v1.xsd"/>

            
  <xs:element name="addParticipant" type="types:addParticipantType"/>
            
  <xs:element name="addParticipantResponse" type="responses:addParticipantResponse"/>

            
  <xs:element name="editParticipant" type="types:editParticipantType"/>
            
  <xs:element name="editParticipantResponse" type="responses:editParticipantResponse"/>

            
  <xs:element name="getAllParticipants" type="types:getAllParticipantsType"/>
            
  <xs:element name="getAllParticipantsResponse" type="responses:getAllParticipantsResponse"/>

            
  <xs:element name="getParticipant" type="types:getParticipantType"/>
            
  <xs:element name="getParticipantResponse" type="responses:getParticipantResponse"/>

            
  <xs:element name="deleteParticipant" type="types:deleteParticipantType"/>
            
  <xs:element name="deleteParticipantResponse" type="responses:deleteParticipantResponse"/>

            
  <xs:element name="removeProfileFromAllParticipants" type="types:removeProfileFromAllParticipantsType"/>
            
  <xs:element name="removeProfileFromAllParticipantsResponse" type="responses:removeProfileFromAllParticipantsResponse"/>

            
  <xs:element name="getProfilesOnParticipant" type="types:getProfilesOnParticipantType"/>
            
  <xs:element name="getProfilesOnParticipantResponse" type="responses:getProfilesOnParticipantResponse"/>

            
  <xs:element name="addProfileToAllParticipants" type="types:addProfileToAllParticipantsType"/>
            
  <xs:element name="addProfileToAllParticipantsResponse" type="responses:addProfileToAllParticipantsResponse"/>

            
  <xs:element name="profilesSupported" type="types:profilesSupportedType"/>
            
  <xs:element name="profilesSupportedResponse" type="responses:profilesSupportedResponse"/>
        
</xs:schema>
  </wsdl:types>
  <wsdl:message name="editParticipantResponse">
    <wsdl:part element="elma:editParticipantResponse" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="addProfileToAllParticipantsResponse">
    <wsdl:part element="elma:addProfileToAllParticipantsResponse" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="getParticipant">
    <wsdl:part element="elma:getParticipant" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="getProfilesOnParticipant">
    <wsdl:part element="elma:getProfilesOnParticipant" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="getAllParticipants">
    <wsdl:part element="elma:getAllParticipants" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="removeProfileFromAllParticipants">
    <wsdl:part element="elma:removeProfileFromAllParticipants" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="deleteParticipant">
    <wsdl:part element="elma:deleteParticipant" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="profilesSupportedResponse">
    <wsdl:part element="elma:profilesSupportedResponse" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="getProfilesOnParticipantResponse">
    <wsdl:part element="elma:getProfilesOnParticipantResponse" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="getParticipantResponse">
    <wsdl:part element="elma:getParticipantResponse" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="getAllParticipantsResponse">
    <wsdl:part element="elma:getAllParticipantsResponse" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="addProfileToAllParticipants">
    <wsdl:part element="elma:addProfileToAllParticipants" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="editParticipant">
    <wsdl:part element="elma:editParticipant" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="addParticipantResponse">
    <wsdl:part element="elma:addParticipantResponse" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="profilesSupported">
    <wsdl:part element="elma:profilesSupported" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="addParticipant">
    <wsdl:part element="elma:addParticipant" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="removeProfileFromAllParticipantsResponse">
    <wsdl:part element="elma:removeProfileFromAllParticipantsResponse" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:message name="deleteParticipantResponse">
    <wsdl:part element="elma:deleteParticipantResponse" name="parameters">
    </wsdl:part>
  </wsdl:message>
  <wsdl:portType name="difi">
    <wsdl:operation name="getAllParticipants">
      <wsdl:input message="elma:getAllParticipants" name="getAllParticipants">
    </wsdl:input>
      <wsdl:output message="elma:getAllParticipantsResponse" name="getAllParticipantsResponse">
    </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="addProfileToAllParticipants">
      <wsdl:input message="elma:addProfileToAllParticipants" name="addProfileToAllParticipants">
    </wsdl:input>
      <wsdl:output message="elma:addProfileToAllParticipantsResponse" name="addProfileToAllParticipantsResponse">
    </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="getParticipant">
      <wsdl:input message="elma:getParticipant" name="getParticipant">
    </wsdl:input>
      <wsdl:output message="elma:getParticipantResponse" name="getParticipantResponse">
    </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="editParticipant">
      <wsdl:input message="elma:editParticipant" name="editParticipant">
    </wsdl:input>
      <wsdl:output message="elma:editParticipantResponse" name="editParticipantResponse">
    </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="deleteParticipant">
      <wsdl:input message="elma:deleteParticipant" name="deleteParticipant">
    </wsdl:input>
      <wsdl:output message="elma:deleteParticipantResponse" name="deleteParticipantResponse">
    </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="addParticipant">
      <wsdl:input message="elma:addParticipant" name="addParticipant">
    </wsdl:input>
      <wsdl:output message="elma:addParticipantResponse" name="addParticipantResponse">
    </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="profilesSupported">
      <wsdl:input message="elma:profilesSupported" name="profilesSupported">
    </wsdl:input>
      <wsdl:output message="elma:profilesSupportedResponse" name="profilesSupportedResponse">
    </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="removeProfileFromAllParticipants">
      <wsdl:input message="elma:removeProfileFromAllParticipants" name="removeProfileFromAllParticipants">
    </wsdl:input>
      <wsdl:output message="elma:removeProfileFromAllParticipantsResponse" name="removeProfileFromAllParticipantsResponse">
    </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="getProfilesOnParticipant">
      <wsdl:input message="elma:getProfilesOnParticipant" name="getProfilesOnParticipant">
    </wsdl:input>
      <wsdl:output message="elma:getProfilesOnParticipantResponse" name="getProfilesOnParticipantResponse">
    </wsdl:output>
    </wsdl:operation>
  </wsdl:portType>
  <wsdl:binding name="difiServiceSoapBinding" type="elma:difi">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <wsdl:operation name="profilesSupported">
      <soap:operation soapAction="profilesSupported" style="document"/>
      <wsdl:input name="profilesSupported">
        <soap:body use="literal"/>
      </wsdl:input>
      <wsdl:output name="profilesSupportedResponse">
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="getParticipant">
      <soap:operation soapAction="getParticipant" style="document"/>
      <wsdl:input name="getParticipant">
        <soap:body use="literal"/>
      </wsdl:input>
      <wsdl:output name="getParticipantResponse">
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="addProfileToAllParticipants">
      <soap:operation soapAction="addProfileToAllParticipants" style="document"/>
      <wsdl:input name="addProfileToAllParticipants">
        <soap:body use="literal"/>
      </wsdl:input>
      <wsdl:output name="addProfileToAllParticipantsResponse">
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="editParticipant">
      <soap:operation soapAction="editParticipant" style="document"/>
      <wsdl:input name="editParticipant">
        <soap:body use="literal"/>
      </wsdl:input>
      <wsdl:output name="editParticipantResponse">
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="addParticipant">
      <soap:operation soapAction="addParticipant" style="document"/>
      <wsdl:input name="addParticipant">
        <soap:body use="literal"/>
      </wsdl:input>
      <wsdl:output name="addParticipantResponse">
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="deleteParticipant">
      <soap:operation soapAction="deleteParticipant" style="document"/>
      <wsdl:input name="deleteParticipant">
        <soap:body use="literal"/>
      </wsdl:input>
      <wsdl:output name="deleteParticipantResponse">
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="getAllParticipants">
      <soap:operation soapAction="getAllParticipants" style="document"/>
      <wsdl:input name="getAllParticipants">
        <soap:body use="literal"/>
      </wsdl:input>
      <wsdl:output name="getAllParticipantsResponse">
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="removeProfileFromAllParticipants">
      <soap:operation soapAction="removeProfileFromAllParticipants" style="document"/>
      <wsdl:input name="removeProfileFromAllParticipants">
        <soap:body use="literal"/>
      </wsdl:input>
      <wsdl:output name="removeProfileFromAllParticipantsResponse">
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="getProfilesOnParticipant">
      <soap:operation soapAction="getProfilesOnParticipant" style="document"/>
      <wsdl:input name="getProfilesOnParticipant">
        <soap:body use="literal"/>
      </wsdl:input>
      <wsdl:output name="getProfilesOnParticipantResponse">
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
  </wsdl:binding>
  <wsdl:service name="elmaService">
    <wsdl:port binding="elma:difiServiceSoapBinding" name="elmaPort">
      <soap:address location="https://smp.difi.no/ws/2.0/"/>
    </wsdl:port>
  </wsdl:service>
</wsdl:definitions>
```
