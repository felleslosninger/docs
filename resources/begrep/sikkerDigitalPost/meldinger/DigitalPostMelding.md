---
title: DigitalPostMelding  
permalink: sdp_digitalpostmeldinger.html
sidebar:
---

### {{page.title}}

  - Identifikator  
    <http://begrep.difi.no/SikkerDigitalPost/1.3.0.RC1/1.3.0.RC1/meldinger/DigitalPostMelding>
  - Term  
    {{page.title}}
  - Definisjon  
    En digital post med tilhørende
    [Dokumentpakke](../forretningslag/Dokumentpakke/index.md)
  - Kilde  
    DIFI
  - Kommentar  
    Digital post melding med tilhørende Dokumentpakke er
    postforsendelsen [Avsender](../begrep/Avsender.md) sender til
    [Mottaker](../begrep/Mottaker.md).  
    Denne inneholder informasjon om hvilken Avsender som er
    [Behandlingsansvarlig](../forretningslag/Aktorer.md), en knytning til
    dokumentpakken igjennom
    [Dokumentpakkefingeravtrykk](../begrep/Dokumentpakkefingeravtrykk.md)  
    og informasjon om behandlingsregler som
    [Postkasseleverandør](../forretningslag/Aktorer.md) skal bruke for å
    tilgjengeliggjøre posten.

Postkassen kvitterer for meldingen gjennom å sende
[Leveringskvittering](LeveringsKvittering.md) til avsender via
meldingsformidler. Leveringskvittering for at postkassen har tatt ansvar
for å tilgjengeliggjøre meldingen.

### Attributer

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| [Avsender](../begrep/Avsender.md) | 1..1 | [sdp:Avsender](../begrep/Avsender.md) |
| [Mottaker](../begrep/Mottaker.md) | 1..1 | [sdp:Mottaker](../begrep/Mottaker.md) |
| [Dokumentpakkefingeravtrykk](../begrep/Dokumentpakkefingeravtrykk.md) | 1..1 | [sdp:Dokumentpakkefingeravtrykk](../begrep/Dokumentpakkefingeravtrykk.md) |
| [FysiskpostInfo](../begrep/FysiskPostInfo.md) | 0..1 | [sdp:FysiskpostInfo](../begrep/FysiskPostInfo.md) |
| [DigitalpostInfo](../begrep/DigitalPostInfo.md) | 0..1 | [sdp:DigitalpostInfo](../begrep/DigitalPostInfo.md) |
