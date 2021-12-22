---
title: DigitalPostMelding  

sidebar: dpi_sidebar
---

| --- | --- |
| Term  | {{page.title}} |
| Definisjon | En digital post med tilhørende [Dokumentpakke]({{site.baseurl}}/resources/begrep/ID-porten/index) |
| Kilde | DIFI |
| Kommentar  | Digital post melding med tilhørende Dokumentpakke er postforsendelsen [Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Avsender) sender til [Mottaker]({{site.baseurl}}/resources/begrep/felles/Mottaker). Denne inneholder informasjon om hvilken Avsender som er [Behandlingsansvarlig]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer), en knytning til dokumentpakken igjennom [Dokumentpakkefingeravtrykk]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Dokumentpakkefingeravtrykk)  og informasjon om behandlingsregler som [Postkasseleverandør]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) skal bruke for å tilgjengeliggjøre posten. |

Postkassen kvitterer for meldingen gjennom å sende [Leveringskvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/LeveringsKvittering) til avsender via
meldingsformidler. Leveringskvittering for at postkassen har tatt ansvar for å tilgjengeliggjøre meldingen.

### Attributer

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| [Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Avsender) | 1..1 | [sdp:Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Avsender) |
| [Mottaker]({{site.baseurl}}/resources/begrep/felles/Mottaker) | 1..1 | [sdp:Mottaker]({{site.baseurl}}/resources/begrep/felles/Mottaker) |
| [Dokumentpakkefingeravtrykk]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Dokumentpakkefingeravtrykk) | 1..1 | [sdp:Dokumentpakkefingeravtrykk]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Dokumentpakkefingeravtrykk) |
| [FysiskpostInfo]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/FysiskPostInfo) | 0..1 | [sdp:FysiskpostInfo]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/FysiskPostInfo) |
| [DigitalpostInfo]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/DigitalPostInfo) | 0..1 | [sdp:DigitalpostInfo]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/DigitalPostInfo) |
