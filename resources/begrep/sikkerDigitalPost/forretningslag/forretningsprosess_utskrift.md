---

title: Sending av post til utskrift og forsendelse 

sidebar: dpi_sidebar
---


## Prosess for sending av papir post

[Meldingen]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/index) i Sikker digital post flyter mellom
[Aktørene]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) slik det beskrives i flytdiagrammet under.

Ovordnet er meldingsflyten slik:

1.  Avsender[1](#link1) sender en [Digital
    postmelding](sdp_digitalpostmeldinger.html) via Meldingsformidler
    til Utskriftstjeneste
2.  Postkasse sender en eller fler
    [Kvitteringsmeldinger]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/KvitteringsMelding) til
    Meldingsformidler
3.  Avsender henter
    [Kvitteringsmeldinger]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/KvitteringsMelding) fra
    Meldingsformidler

(Meldinger prefikset **eb:** i diagrammet tilhører transportlaget, men
er tatt med for å vise sammenhengen)

![Prosess for sending av digitalpost]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/prosess_for_sending_av_papirpost.png)


| Prosess    | Fra     | Til      | Beskrivelse         |
| --- | --- | --- | --- |
| [DigitalPostmelding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png)         | [Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer)          | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | Avsender sender alltid sine meldinger til meldingsformidler. Transportkvittering fra meldingsformidler indikerer at denne har tatt over ansvaret for videre formidling av meldingen |
| DigitalPostmelding                                            | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | [Utskriftstjeneste]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | Meldingsformidler mellomlagrer meldingen inntil Utskriftstjeneste har returnert en transportkvittering.                                                                             |
| [MottaksKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/MottaksKvittering) [2](#link2)     | [Utskriftstjeneste]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | Utskriftstjeneste sender en [MottaksKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/MottaksKvittering) for å signalisere at utskriftstjenesten har mottatt og lagt meldingen klar til behandling.          |
| [LeveringsKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/LeveringsKvittering) [3](#link3) | [Utskriftstjeneste]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | Utskriftstjeneste sender en [LeveringsKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/LeveringsKvittering) for å signalisere at posten er skrevet ut, konvolutert og postlagt.                             |
| [ReturpostKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/ReturpostKvittering) [4](#link4) | [Utskriftstjeneste]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | Utskriftstjeneste sender en [ReturpostKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/ReturpostKvittering) for å signalisere at posten har kommet tilbake og ikke kan leveres til innbygger.               |
| HentKvittering                                                | [Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer)          | [Meldingsformidler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) | Avsender sender forespørsel til Meldingsformidler om å få levert ventende kvitteringer[5](#link5)  |

<a name="link1"></a>
1.  Avsender bør også ha et aktivt forhold til statusen til en melding.
    Meldingsflytdiagrammet kan med fordel ses i sammenheng med
    [tilstandsdiagrammet]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/avsender_tilstanddiagram) for sikker digital
    post.
<a name="link2"></a>
2.  [Mottakskvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/MottaksKvittering) sendes så fort
    utskriftstjenesten har mottatt
    [DigitalPostmelding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png) og lagt den i
    kø for utskrift. Altså kort tid etter at
    [DigitalPostmelding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png) er sendt.
<a name="link3"></a>
3.  Utskriftstjenesten samler sammen alle utskrifter til en
    utskriftsjobb hver dag. Når dette er fullført og posten er postlagt
    vil utskriftstjenesten sende over
    [LeveringsKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/LeveringsKvittering). Disse vil
    dermed komme tilbake i daglige puljer til Avsender.
<a name="link4"></a>
4.  [ReturPostkvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/ReturpostKvittering) blir kun
    dersom returpost håndtering er bestilt i
    [DigitalPostmelding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png). Returpost som
    er fysisk ødelagt slik at ikke posten kan identifiseres vil bli
    levert til returadressen oppgitt så lenge denne er leselig.
<a name="link5"></a>
5.  Dette kan være alle typer kvitteringer, ikke bare Mottakskvitter og
    LeveringsKvittering
