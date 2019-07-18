--- 
title: Sender  
headtitle: Sikker digital post - Standard Business Document  
group: forretningslag
permalink: sdp_sender.html
sidebar:
---

### {{page.title}}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Avsender som har initiert en meldingsprosess mot
    meldingsutvekslingsrammeverket.
  - Kilde  
    GS1
  - Kommentar  
    [Sender](Sender.md) den som har signert [Standard Business
    Document](index.md). Regler for hvem som opptrer som [Sender](Sender.md)
    er beskrevet under.

\*For [digital post meldinger](../../meldinger/DigitalPostMelding.md) er
[Sender](Sender.md)

  - [Behandlingsansvarlig](../Aktorer.md) eller en
    [databehandler](../Aktorer.md) på veien av
    [behandlingsansvarlig](../Aktorer.md)
  - Den som vil motta alle
    [kvitteringer](../../meldinger/KvitteringsMelding.md) tilbake fra
    [Receiver](Receiver.md)

\*For [digital post kvitteringer](../../meldinger/KvitteringsMelding.md) er
[Sender](Sender.md)

  - [Postkasseleverandør](../Aktorer.md)

### Attributter

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| Identifier    | 1..1         | SKAL VÆRE LINK TIL /Felles/virksomhetsidentifikator |           |

### XML eksempel

``` brush: xml; toolbar: false
    <Sender>
        <!-- orgnr avsender -->
        <Identifier Authority="iso6523-actorid-upis">9908:123456789</Identifier>
    </Sender>
```
