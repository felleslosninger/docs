---

title: Signering og kryptering av Sikker Digital Post forsendelse  
permalink: sdp_sertifikatbruk.html
sidebar:
---

## Innledning

Her beskrives det kort hvordan hver del av [Digital
postforsendelse](meldingsstruktur) krypteres og signeres.

### Omfang

Dokumentasjonen skal hovedsakelig fungere som en implementasjonguide for
avsendere.  
Se beskrivelsen av de enkelte delene av for detaljer om signering og
krypteringsalgoritmer etc.

### Overordnet

Deler av Digital postforsendelse er sikret ende til ende, fra
[Avsender](StandardBusinessDocument/Melding/Avsender) til
[Mottaker](StandardBusinessDocument/Melding/Mottaker).  
Deler av Digital postforsendelse er sikret punkt til punkt fra [Teknisk
Mottaker](UserMessage/PartyInfo) til
[Meldingsformidlerleverandør](UserMessage/PartyInfo), og fra
Meldingsformidler- til Postkasseleverandør.

### Sikret ende til ende

Følgende deler av Digital postforsendelse er sikret ende-til-ende

  - [Melding](StandardBusinessDocument/Melding/)
  - [Dokumentpakke](Dokumentpakke/ASiC)

### Sikret punkt til punkt

Følgende deler av Digital postforsendelse er sikret punkt til punkt:

  - [Webservice security timestamp](WebserviceSecurity)
  - [Eb:messaging](ebMS30)
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

[StandardBusinessDocument.Melding.Dokumentpakke](StandardBusinessDocument/Melding/Dokumentpakke)
har en kryptert engangsnøkkel,kryptert med innbyggers sertifikat.  
[StandardBusinessDocument.Melding.Avsender](StandardBusinessDocument/Melding/Avsender)
skal være organisasjonsnummeret til Behandlingsansvarlig.

I tillegg så er [StandardBusinessDocument](StandardBusinessDocument/)
signert i meldingsutvekslingen punkt til punkt.

### [Eb:Messaging](ebMS30)

EB:Messaging headeren er signert punkt til punkt.

### [Webservice Security](WebserviceSecurity)

  - wsse:Secuity skal inneholde et Timestamp som angir meldingens
    levetid, signert av avsender av meldingen.
  - wsse:Secuity skal inneholde en signatur.
      - Denne signaturen skal ha referanse til følgende signerte
        elementer:
          - [Timestamp](WebserviceSecurity)
          - [eb:Messaging](ebMS30)
          - [SOAP Body
            (StandardBusinessDocument)](StandardBusinessDocument/)
          - [Attachment (Dokumentpakke)](Dokumentpakke/)
  - Signeringssertifikatet skal være vedlagt SOAP meldingen i
    [wsse:security](WebserviceSecurity)

### Signering på veien av Behandlingsansvarlig

Som beskrevet over skal [Dokumentpakke](Dokumentpakke/) og
[StandardBusinessDocument](StandardBusinessDocument/) signeres av
[Behandlingsansvarlig](Aktorer).  
Det er åpnet for at Databehandler kan signere på vegne av
Behandlingsansvarlig.
