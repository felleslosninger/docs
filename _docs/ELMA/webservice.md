---
title: ELMA Web Service
description: Documentation of the web service
summary: "Here is an overview of the operations in the web service, parameters, behaviour and responses."
permalink: webservice.html
folder: veiledning
---

*Updated: 07.03.2019*

**NB. This page is under construction. Will be updated.**

Sample-requests are generated from the [WSDL](https://smp.difi.no/ws/2.0?wsdl) with [SOAP-UI](https://www.soapui.org/).

## General notes

### Organization number and ICD
If only organization number is given, the web service will assume ICD 9908.
You can supply both organization number and ICD, e.g. "0192:123456789".

### More than one endpoint
If you have more than one endpoint, you may use the optional endpoint-parameter do define what endpoint you are performing an operation on.

If you have more than one endpoint and do not specify the endpoint, the web service will apply the operation on the oldest endpoint (i.e. the endpoint first registered in ELMA).


## addParticipant

**Example of add-request**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:no="no:difi:elma:smp:webservice" xmlns:no1="no:difi:elma:smp:webservice:types">
   <soapenv:Header/>
   <soapenv:Body>
      <no:addParticipant>
         <no1:user>
            <no1:username>?</no1:username>
            <no1:password>?</no1:password>
         </no1:user>
         <no1:participant>
            <no1:organization>
               <no1:name>?</no1:name>
               <no1:organizationNumber>?</no1:organizationNumber>
               <no1:telephone>?</no1:telephone>
               <no1:website>?</no1:website>
               <no1:contact>
                  <no1:name>?</no1:name>
                  <no1:telephone>?</no1:telephone>
                  <no1:email>?</no1:email>
               </no1:contact>
            </no1:organization>
            <!--1 or more repetitions:-->
            <no1:profiles>?</no1:profiles>
         </no1:participant>
         <!--Optional:-->
         <no1:endpoint>?</no1:endpoint>
      </no:addParticipant>
   </soapenv:Body>
</soapenv:Envelope>
```

## deleteParticipant

**Example of delete-request**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:no="no:difi:elma:smp:webservice" xmlns:no1="no:difi:elma:smp:webservice:types">
   <soapenv:Header/>
   <soapenv:Body>
      <no:deleteParticipant>
         <no1:user>
            <no1:username>?</no1:username>
            <no1:password>?</no1:password>
         </no1:user>
         <no1:organizationNumber>?</no1:organizationNumber>
         <!--Optional:-->
         <no1:endpoint>?</no1:endpoint>
      </no:deleteParticipant>
   </soapenv:Body>
</soapenv:Envelope>
```

## editParticipant

**Example of edit-request**

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:no="no:difi:elma:smp:webservice" xmlns:no1="no:difi:elma:smp:webservice:types">
   <soapenv:Header/>
   <soapenv:Body>
      <no:editParticipant>
         <no1:user>
            <no1:username>?</no1:username>
            <no1:password>?</no1:password>
         </no1:user>
         <no1:organizationNumber>?</no1:organizationNumber>
         <no1:participant>
            <no1:organization>
               <no1:name>?</no1:name>
               <no1:organizationNumber>?</no1:organizationNumber>
               <no1:telephone>?</no1:telephone>
               <no1:website>?</no1:website>
               <no1:contact>
                  <no1:name>?</no1:name>
                  <no1:telephone>?</no1:telephone>
                  <no1:email>?</no1:email>
               </no1:contact>
            </no1:organization>
            <!--1 or more repetitions:-->
            <no1:profiles>?</no1:profiles>
         </no1:participant>
         <!--Optional:-->
         <no1:endpoint>?</no1:endpoint>
      </no:editParticipant>
   </soapenv:Body>
</soapenv:Envelope>
```

## getAllParticipants

**Example of getAllParticipants-request**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:no="no:difi:elma:smp:webservice" xmlns:no1="no:difi:elma:smp:webservice:types">
   <soapenv:Header/>
   <soapenv:Body>
      <no:getAllParticipants>
         <no1:user>
            <no1:username>?</no1:username>
            <no1:password>?</no1:password>
         </no1:user>
      </no:getAllParticipants>
   </soapenv:Body>
</soapenv:Envelope>
```

## getProfilesOnParticipant
Does not require login.

**Example of getProfilesOnParticipant-request**

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:no="no:difi:elma:smp:webservice" xmlns:no1="no:difi:elma:smp:webservice:types">
   <soapenv:Header/>
   <soapenv:Body>
      <no:getProfilesOnParticipant>
         <no1:organizationNumber>?</no1:organizationNumber>
      </no:getProfilesOnParticipant>
   </soapenv:Body>
</soapenv:Envelope>
```

## profilesSupported
Does not require login.

**Example of profilesSupported-request**

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:no="no:difi:elma:smp:webservice">
   <soapenv:Header/>
   <soapenv:Body>
      <no:profilesSupported/>
   </soapenv:Body>
</soapenv:Envelope>
```

## Deprecated operations

These operations are no longer in service.

- addProfileToAllParticipants
- removeProfileFromAllParticipants