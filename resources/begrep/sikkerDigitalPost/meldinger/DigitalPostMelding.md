---
title: DigitalPostMelding  
permalink: sdp_digitalpostmeldinger.html
sidebar:
---

### {{page.title}}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    En digital post med tilhørende
    [Dokumentpakke](../forretningslag/Dokumentpakke/)
  - Kilde  
    DIFI
  - Kommentar  
    Digital post melding med tilhørende Dokumentpakke er
    postforsendelsen [Avsender](../begrep/Avsender) sender til
    [Mottaker](../begrep/Mottaker).  
    Denne inneholder informasjon om hvilken Avsender som er
    [Behandlingsansvarlig](../forretningslag/Aktorer), en knytning til
    dokumentpakken igjennom
    [Dokumentpakkefingeravtrykk](../begrep/Dokumentpakkefingeravtrykk)  
    og informasjon om behandlingsregler som
    [Postkasseleverandør](../forretningslag/Aktorer) skal bruke for å
    tilgjengeliggjøre posten.

Postkassen kvitterer for meldingen gjennom å sende
[Leveringskvittering](LeveringsKvittering) til avsender via
meldingsformidler. Leveringskvittering for at postkassen har tatt ansvar
for å tilgjengeliggjøre meldingen.

### Attributer

| --- | --- | --- |
| Identifikator | Kardinalitet | Datatype |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| [Avsender](../begrep/Avsender) | 1..1 | [sdp:Avsender](../begrep/Avsender) |
| [Mottaker](../begrep/Mottaker) | 1..1 | [sdp:Mottaker](../begrep/Mottaker) |
| [Dokumentpakkefingeravtrykk](../begrep/Dokumentpakkefingeravtrykk) | 1..1 | [sdp:Dokumentpakkefingeravtrykk (../begrep/Dokumentpakkefingeravtrykk) |
| [FysiskpostInfo](../begrep/FysiskPostInfo) | 0..1 | [sdp:FysiskpostInfo](../begrep/FysiskPostInfo) |
| [DigitalpostInfo](../begrep/DigitalPostInfo) | 0..1 | [sdp:DigitalpostInfo](../begrep/DigitalPostInfo) |
