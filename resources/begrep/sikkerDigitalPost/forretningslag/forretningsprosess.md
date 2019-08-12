---
 
title:  Sending av digital post  
permalink: sdp_avsender_tilstanddiagram.html
sidebar: dpi_sidebar
---

## Prosess for sending av digital post

[Meldingen](sdp_index.html) i Sikker digital post flyter mellom
[Aktørene](Aktorer.md) slik det beskrives i flyt diagrammet under.

Ovordnet er meldingsflyten slik:

1.  Avsender[1](#Link1) sender en [Digital
    postmelding](../meldinger/DigitalPostMelding.md) via Meldingsformidler
    til Postkasse
2.  Postkasse sender en eller fler
    [Kvitteringsmeldinger](../meldinger/KvitteringsMelding.md) til
    Meldingsformidler
3.  Avsender henter
    [Kvitteringsmeldinger](../meldinger/KvitteringsMelding.md) fra
    Meldingsformidler

(Meldinger prefikset **eb:** i diagrammet tilhører transportlaget, men
er tatt med for å vise sammenhengen)

[![Prosess for sending av digital post](DigitalpostMelding.png
"Prosess for sending av digital post")](DigitalpostMelding.png)

| Prosess      | Fra    | Til     | Beskrivelse        |
| ---- | --- | --- | --- |
| [DigitalPostmelding](../meldinger/DigitalPostMelding.md)   | [Avsender](Aktorer.md)          | [Meldingsformidler](Aktorer.md) | Avsender sender alltid sine meldinger til meldingsformidler. Transportkvittering fra meldingsformidler indikerer at denne har tatt over ansvaret for videre formidling av meldingen                       |
| DigitalPostmelding                                      | [Meldingsformidler](Aktorer.md) | [Postkasse](Aktorer.md)         | Meldingsformidler mellomlagrer meldingen inntil Postkassen har returnert en transportkvittering.                                                                                                          |
| [Leveringskvittering](../meldinger/LeveringsKvittering.md) | [Postkasse](Aktorer.md)         | [Meldingsformidler](Aktorer.md) | Postkassen sender en [Leveringskvittering](../meldinger/LeveringsKvittering.md) for å signalisere at postkassen har mottatt og behandlet meldingen, og postkassen tar ansvar for å levere denne til Mottaker |
| HentKvittering                                          | [Avsender](Aktorer.md)          | [Meldingsformidler](Aktorer.md) | Avsender sender forespørsel til Meldingsformidler om å få levert ventende kvitteringer[2](#link2)                                                                                                               |

<a name="Link1"></a>   
1. Avsender bør også ha et aktivt forhold til statusen til en melding.
    Meldingsflytdiagrammet kan med fordel ses i sammenheng med
    [tilstandsdiagrammet](avsender_tilstanddiagram.md) for sikker digital
    post.
  
<a name="Link2"></a> 
2.  Dette kan være andre typer kvitteringer enn Leveringskvittering
