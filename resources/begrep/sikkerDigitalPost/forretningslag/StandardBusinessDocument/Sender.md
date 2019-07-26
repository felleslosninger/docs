--- 
title: Sender  
permalink: sdp_sender.html
sidebar:
---

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Avsender som har initiert en meldingsprosess mot meldingsutvekslingsrammeverket. |
| Kilde         | GS1 |
| Kommentar     | [Sender](Sender.md) den som har signert [Standard Business Document](https://difi.github.io/felleslosninger/standardbusinessdocument_index.html). Regler for hvem som opptrer som [Sender](Sender.md) er beskrevet under. |

\*For [digital post meldinger](../../meldinger/DigitalPostMelding.md) er
[Sender](Sender.md)

  - [Behandlingsansvarlig](https://difi.github.io/felleslosninger/sdp_aktorer.html) eller en
    [databehandler](https://difi.github.io/felleslosninger/sdp_aktorer.html) på veien av
    [behandlingsansvarlig](https://difi.github.io/felleslosninger/sdp_aktorer.html)
  - Den som vil motta alle
    [kvitteringer](../../meldinger/KvitteringsMelding.md) tilbake fra
    [Receiver](Receiver.md)

\*For [digital post kvitteringer](../../meldinger/KvitteringsMelding.md) er
[Sender](Sender.md)

  - [Postkasseleverandør](https://difi.github.io/felleslosninger/sdp_aktorer.html)

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
