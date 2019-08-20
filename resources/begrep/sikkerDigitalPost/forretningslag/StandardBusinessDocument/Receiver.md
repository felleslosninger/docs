--- 
title: Receiver  
permalink: sdp_receiver.html
sidebar: dpi_sidebar
---

|---|---|
| Identifikator |  |
| Term          | {{page.title}} |
| Definisjon    | Sluttmottaker i en meldingsprosess. |
| Kilde         | GS1 |
| Kommentar     | Regler for hvem som opptrer som [Receiver](https://difi.github.io/felleslosninger/sdp_receiver.html) er beskrevet under. |


\*For [digital post meldinger](../../meldinger/DigitalPostMelding.md) er
[Receiver](https://difi.github.io/felleslosninger/sdp_receiver.html)

  - [Postkasseleverandør](https://difi.github.io/felleslosninger/sdp_aktorer.html)

\*For [digital post kvitteringer](../../meldinger/KvitteringsMelding.md) er
[Receiver](https://difi.github.io/felleslosninger/sdp_receiver.html)

  - Den [Aktør](https://difi.github.io/felleslosninger/sdp_aktorer.html) som sto som [Sender](https://difi.github.io/felleslosninger/sdp_sender.html) for [digital
    post meldingen](../../meldinger/DigitalPostMelding.md).

### Attributter

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| Identifier    | 1..1         | https://difi.github.io/felleslosninger/virksomhetsidentifikator.html |           |

### XML eksempel

``` 
brush: xml; toolbar: false
    <Receiver>
        <!-- orgnr avsender -->
        <Identifier Authority="iso6523-actorid-upis">9908:123456789</Identifier>
    </Receiver>
```
