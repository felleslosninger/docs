---
title: StandardBusinessDocumentHeader  
headtitle: Sikker digital post - Standard Business Document  
group: forretningslag
permalink: sdp_standardbusinessdocumentheader.html
sidebar:
---

### {{page.title}}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon relatert til ruting og adressering av en melding.
    Forkortelse: SBDH. Avsender og mottaker definert i SBDH vil alltid
    reflektere de tekniske endepunktene i meldingsutvekslingen.
  - Kilde  
    [GS1](http://www.gs1.org)

### Attributter

| Identifikator                                    | Kardinalitet | Datatype                                              | Kommentar                                                                                                                                                                                   |
| ------------------------------------------------ | ------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HeaderVersion                                    | 1..1         | xs:string                                             | “1.0”                                                                                                                                                                                       |
| [Sender](Sender.md)                                 | 1..1         | [sbdh:Sender](Sender.md)                                 | Identifikator (organisasjonsnummer) til virksomheten som initierer (er avsender) i meldingsprosessen. Alle kvitteringer skal addresseres til denne parten som mottaker                      |
| [Receiver](Receiver.md)                             | 1..1         | [sbdh:Receiver](Receiver.md)                             | Identifikator (organisasjonsnummer) til virksomheten som er sluttmottaker i meldingsprosessen. Ved initiell sending av melding vil dette alltid være en postboks eller utskriftsleverandør. |
| [DocumentIdentification](DocumentIdentification.md) | 1..1         | [sbdh:DocumentIdentification](DocumentIdentification.md) | Unik identifikator for meldingen, generert av Avsender                                                                                                                                      |
| [BusinessScope](BusinessScope.md)                   | 1..1         | [sbdh:BusinessScope](BusinessScope.md)                   | Unik identifikator for konversasjonen, knytter meldinger og tilhørende kvitteringer sammen                                                                                                  |

### Kommentar

Sender/Receiver indikerer retning på meldingsprosessen. For eksempel i
[FormidleDigitalPostForsendelse](../../transportlag/Meldingsutveksling/FormidleDigitalPostForsendelse.md)
prosessen så vil Sender være [Databehandler](../Aktorer.md) og Receiver
være [Postkasse](../Aktorer.md).

Merk også at Sikker Digital Post sin bruk av SBDH er strengere enn den
offisielle standarden (BusinessScope er obligatorisk i Sikker Digital
Post). Konsekvesen er at man kan få en [forretningsrelatert
feilmelding](../../feilhandtering/Forretningsfeil.md) selv om XML’en
validerer mot xsd.

### XML eksempel fra Databehandler til Postkasseleverandør

**** En melding fra [Databehandler](../Aktorer.md) med orgnummer: 123456789
til [Postkasseleverandør](../Aktorer.md) med orgnummer: 987654321

**** [Databehandler](../Aktorer.md) har generert en unik
DocumentIdentification.InstanceIdentifier for denne meldingen:
“35e21e33-22b3-4554-9707-5fa829ee8bc0”

**** [Databehandler](../Aktorer.md) har generert en unik
BusinessScope.InstanceIdentifier for hele konversasjonen:
“37efbd4c-413d-4e2c-bbc5-257ef4a65a45”

****\* Dette vil brukes for å knytte seinere meldinger i samme
konversasjon sammen.

``` brush: xml; toolbar: false
    <ns3:StandardBusinessDocumentHeader>
        <ns3:HeaderVersion>1.0</ns3:HeaderVersion>
        <ns3:Sender>
            <ns3:Identifier Authority="iso6523-actorid-upis">9908:123456789</ns3:Identifier>
        </ns3:Sender>
        <ns3:Receiver>
            <ns3:Identifier Authority="iso6523-actorid-upis">9908:987654321</ns3:Identifier>
        </ns3:Receiver>
        <ns3:DocumentIdentification>
            <ns3:Standard>urn:no:difi:sdp:1.0</ns3:Standard>
            <ns3:TypeVersion>1.0</ns3:TypeVersion>
            <ns3:InstanceIdentifier>35e21e33-22b3-4554-9707-5fa829ee8bc0</ns3:InstanceIdentifier>
            <ns3:Type>digitalPost</ns3:Type>
            <ns3:CreationDateAndTime>2014-05-26T13:08:00.288+02:00</ns3:CreationDateAndTime>
        </ns3:DocumentIdentification>
        <ns3:BusinessScope>
            <ns3:Scope>
                <ns3:Type>ConversationId</ns3:Type>
                <ns3:InstanceIdentifier>37efbd4c-413d-4e2c-bbc5-257ef4a65a45</ns3:InstanceIdentifier> 
                <ns3:Identifier>urn:no:difi:sdp:1.0</ns3:Identifier>
            </ns3:Scope>
        </ns3:BusinessScope>
    </ns3:StandardBusinessDocumentHeader>
```

### XML eksempel fra Postkasseleverandør til Databehandler

**** En melding fra [Postkasseleverandør](../Aktorer.md) med orgnummer:
987654321 til [Databehandler](../Aktorer.md) med orgnummer: 123456789

**** [Postkasseleverandør](../Aktorer.md) har generert en unik
DocumentIdentification.InstanceIdentifier for denne meldingen:
“12e57bde-ea5d-43ee-96b6-e2cf73f8311e”

**** [Postkasseleverandør](../Aktorer.md) bruker den
BusinessScope.InstanceIdentifier som [Databehandler](../Aktorer.md) har
generert.

****\* Dette er knytningen mot den opprinnelige forsendelsen.

``` brush: xml; toolbar: false
    <ns3:StandardBusinessDocumentHeader>
        <ns3:HeaderVersion>1.0</ns3:HeaderVersion>
        <ns3:Sender>
            <ns3:Identifier Authority="iso6523-actorid-upis">9908:987654321</ns3:Identifier>
        </ns3:Sender>
        <ns3:Receiver>
            <ns3:Identifier Authority="iso6523-actorid-upis">9908:123456789</ns3:Identifier>
        </ns3:Receiver>
        <ns3:DocumentIdentification>
            <ns3:Standard>urn:no:difi:sdp:1.0</ns3:Standard>
            <ns3:TypeVersion>1.0</ns3:TypeVersion>
            <ns3:InstanceIdentifier>12e57bde-ea5d-43ee-96b6-e2cf73f8311e</ns3:InstanceIdentifier>
            <ns3:Type>digitalPost</ns3:Type>
            <ns3:CreationDateAndTime>2014-05-26T13:08:00.288+02:00</ns3:CreationDateAndTime>
        </ns3:DocumentIdentification>
        <ns3:BusinessScope>
            <ns3:Scope>
                <ns3:Type>ConversationId</ns3:Type>
                <ns3:InstanceIdentifier>37efbd4c-413d-4e2c-bbc5-257ef4a65a45</ns3:InstanceIdentifier> 
                <ns3:Identifier>urn:no:difi:sdp:1.0</ns3:Identifier>
            </ns3:Scope>
        </ns3:BusinessScope>
    </ns3:StandardBusinessDocumentHeader>
```
