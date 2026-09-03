---
 
title:  Sending av digital post  

sidebar: dpi_sidebar
redirect_from: /sdp_avsender_tilstanddiagram
---

## Prosess for sending av digital post

[Meldingen]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/) i Sikker digital post flyter mellom
[Aktørene]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) slik det beskrives i flyt diagrammet under.

Ovordnet er meldingsflyten slik:

1.  Avsender[1](#Link1) sender en [Digital
    postmelding](sdp_digitalpostmeldinger.html) via Meldingsformidler
    til Postkasse
2.  Postkasse sender en eller fler
    [Kvitteringsmeldinger]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/KvitteringsMelding) til
    Meldingsformidler
3.  Avsender henter
    [Kvitteringsmeldinger]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/KvitteringsMelding) fra
    Meldingsformidler

(Meldinger prefikset **eb:** i diagrammet tilhører transportlaget, men
er tatt med for å vise sammenhengen)

[![Prosess for sending av digital post]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png)

| Prosess      | Fra    | Til     | Beskrivelse        |
| ---- | --- | --- | --- |
| [DigitalPostmelding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/DigitalPostMelding)   | [Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer)          | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | Avsender sender alltid sine meldinger til meldingsformidler. Transportkvittering fra meldingsformidler indikerer at denne har tatt over ansvaret for videre formidling av meldingen                       |
| DigitalPostmelding                                      | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | [Postkasse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer)         | Meldingsformidler mellomlagrer meldingen inntil Postkassen har returnert en transportkvittering.                                                                                                          |
| [Leveringskvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/LeveringsKvittering) | [Postkasse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer)         | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | Postkassen sender en [Leveringskvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/LeveringsKvittering) for å signalisere at postkassen har mottatt og behandlet meldingen, og postkassen tar ansvar for å levere denne til Mottaker |
| HentKvittering                                          | [Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer)          | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | Avsender sender forespørsel til Meldingsformidler om å få levert ventende kvitteringer[2](#link2)                                                                                                               |

<a name="Link1"></a>   
1. Avsender bør også ha et aktivt forhold til statusen til en melding.
    Meldingsflytdiagrammet kan med fordel ses i sammenheng med
    [tilstandsdiagrammet]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/avsender_tilstanddiagram) for sikker digital
    post.
  
<a name="Link2"></a> 
2.  Dette kan være andre typer kvitteringer enn Leveringskvittering
