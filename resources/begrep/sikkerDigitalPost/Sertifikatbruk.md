---

title: Signering og kryptering av Sikker Digital Post forsendelse  
permalink: sdp_sertifikatbruk.html
sidebar:
---

## Innledning

Her beskrives det kort hvordan hver del av [Digital
postforsendelse](meldingsstruktur.md) krypteres og signeres.

### Omfang

Dokumentasjonen skal hovedsakelig fungere som en implementasjonguide for
avsendere.  
Se beskrivelsen av de enkelte delene av for detaljer om signering og
krypteringsalgoritmer etc.

### Overordnet

Deler av Digital postforsendelse er sikret ende til ende, fra
[Avsender](StandardBusinessDocument/Melding/Avsender.md) til
[Mottaker](StandardBusinessDocument/Melding/Mottaker.md).  
Deler av Digital postforsendelse er sikret punkt til punkt fra [Teknisk
Mottaker](UserMessage/PartyInfo.md) til
[Meldingsformidlerleverandør](UserMessage/PartyInfo.md), og fra
Meldingsformidler- til Postkasseleverandør.

### Sikret ende til ende

Følgende deler av Digital postforsendelse er sikret ende-til-ende

  - [Melding](StandardBusinessDocument/Melding/)
  - [Dokumentpakke](Dokumentpakke/ASiC.md)

### Sikret punkt til punkt

Følgende deler av Digital postforsendelse er sikret punkt til punkt:

  - [Webservice security timestamp](WebserviceSecurity.md)
  - [Eb:messaging](ebMS30.md)
  - [SOAP:Body](StandardBusinessDocument/)
  - [Dokumentpakke](Dokumentpakke/)

### [Dokumentpakke](Dokumentpakke/)

Inneholder signaturer fra Behandlingsansvarlig\* og kryptert før
utveksling av Behandlingsansvarlig\*.  
Krypteringen er gjort med en symmetrisk engangs-nøkkel  
Signeringssertifikatet med fullkjede er lagt inn i
[Dokumentpakke](Dokumentpakke/), sammen med signaturen

I tillegg til ende til ende sikkerheten så er
[dokumentpakken](Dokumentpakke/) signert i meldingsutvekslingen punkt
til punkt.

### [StandardBusinessDocument](StandardBusinessDocument/)

[Melding](StandardBusinessDocument/Melding/) i
[StandardBusinessDocument](StandardBusinessDocument/) er signert av
Behandlingsansvarlig\*/Postkasseleverandør ved bruk av Enveloped xml
signature.  
Signeringssertifikatet er lagt inn i
[Melding](StandardBusinessDocument/Melding/), sammen med signaturen.

[StandardBusinessDocument.Melding.Dokumentpakke](StandardBusinessDocument/Melding/Dokumentpakke.md)
har en kryptert engangsnøkkel,kryptert med innbyggers sertifikat.  
[StandardBusinessDocument.Melding.Avsender](StandardBusinessDocument/Melding/Avsender.md)
skal være organisasjonsnummeret til Behandlingsansvarlig.

I tillegg så er [StandardBusinessDocument](StandardBusinessDocument/)
signert i meldingsutvekslingen punkt til punkt.

### [Eb:Messaging](ebMS30.md)

EB:Messaging headeren er signert punkt til punkt.

### [Webservice Security](WebserviceSecurity.md)

  - wsse:Secuity skal inneholde et Timestamp som angir meldingens
    levetid, signert av avsender av meldingen.
  - wsse:Secuity skal inneholde en signatur.
      - Denne signaturen skal ha referanse til følgende signerte
        elementer:
          - [Timestamp](WebserviceSecurity.md)
          - [eb:Messaging](ebMS30.md)
          - [SOAP Body
            (StandardBusinessDocument)](StandardBusinessDocument/)
          - [Attachment (Dokumentpakke)](Dokumentpakke/)
  - Signeringssertifikatet skal være vedlagt SOAP meldingen i
    [wsse:security](WebserviceSecurity.md)

### Signering på veien av Behandlingsansvarlig

Som beskrevet over skal [Dokumentpakke](Dokumentpakke/) og
[StandardBusinessDocument](StandardBusinessDocument/) signeres av
[Behandlingsansvarlig](Aktorer.md).  
Det er åpnet for at Databehandler kan signere på vegne av
Behandlingsansvarlig.
