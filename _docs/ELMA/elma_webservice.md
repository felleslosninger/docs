---
title: ELMA Web Service
description: Documentation of the web service
summary: "Here is an overview of the operations in the web service, parameters, behaviour and responses."
permalink: elma_webservice.html
product: elma
sidebar: elma_sidebar
---

*Updated: 20.03.2019*

Sample-requests are generated from the [WSDL](https://smp.difi.no/ws/2.0?wsdl) with [SOAP-UI](https://www.soapui.org/).

## General notes

### Organization number and ICD
If only organization number is given, the web service will assume ICD 9908.
You can supply both organization number and ICD, e.g. "0192:123456789".

### More than one endpoint
If you have more than one endpoint, you may use the optional endpoint-parameter do define what endpoint you are performing an operation on.

If you have more than one endpoint and do not specify the endpoint, the web service will apply the operation on the oldest endpoint (i.e. the endpoint first registered in ELMA).

### Profile-dependencies are shown as Profiles
Currently, if you retrieve a participant and see the list of Profiles, then Profile-dependencies will be listed as if the Profiles were attached to the participant.

Example: You have a 0192-participant with the new BIS Billing 3.0 Profiles. These profiles have dependencies to Profiles only available for 9908-Participants.
The 0192-Participant has the Profile "PEPPOLBIS_3_0_BILLING_01_UBL", and the 9908-Participant has the Profiles "EHF_INVOICE 2.0", "EHF_INVOICE_CREDITNOTE 2.0", "BIS04 V2" and "BIS05 V2". The last two profiles are dependencies of the previous two profiles.

If you do a getParticipant-call to the 0192-Participant, it will list having the new 3.0-profile plus its dependencies.
I.e. the 0192-participant will have the profiles: "PEPPOLBIS_3_0_BILLING_01_UBL", "EHF_INVOICE 2.0" and "EHF_INVOICE_CREDITNOTE 2.0".
The last two profiles on the 9908-participant will not be listed, as they are dependencies of the dependencies. 

Note:
- That the last two will be listed when viewing the participant in ELMA-web.
- Dependencies are only shown as Profiles in the Web Service and ELMA-web. In a SMP-lookup, only Profiles/Document Types connected directly to the identifier will be shown.


## addParticipant
Will add a participant. If the participant already exists, it will be replaced.

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
NB: Some special characters used in the name may cause a registration to fail, e.g. "&"
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
If the participant does not already exist, it will be created.

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

## getParticipant

**Example of getParticipant-request**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:no="no:difi:elma:smp:webservice" xmlns:no1="no:difi:elma:smp:webservice:types">
   <soapenv:Header/>
   <soapenv:Body>
      <no:getParticipant>
         <no1:user>
            <no1:username>?</no1:username>
            <no1:password>?</no1:password>
         </no1:user>
         <no1:organizationNumber>?</no1:organizationNumber>
      </no:getParticipant>
   </soapenv:Body>
</soapenv:Envelope>
```

## getAllParticipants
Note that the method returns a list of participants, but without ICDs.

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

## Changelog
This is a changelog for the documentation on this webpage, not the Web Service.

*20.03.2019*
- Added getParticipant-operation
- Noted that addParticipant edits a participant if it exists, and that editParticipant creates a participant if it does not exist.

*07.03.2019*
- Initial version
