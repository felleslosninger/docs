--- 
title: Receiver  
headtitle: Sikker digital post - Standard Business Document  
group: forretningslag
permalink: sdp_receiver.html
sidebar:
---

### {{page.title}}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Sluttmottaker i en meldingsprosess.
  - Kilde  
    GS1
  - Kommentar  
    Regler for hvem som opptrer som [Receiver](Receiver.md) er beskrevet
    under.

\*For [digital post meldinger](../../meldinger/DigitalPostMelding.md) er
[Receiver](Receiver*)

  - [Postkasseleverandør](../Aktorer.md)

\*For [digital post kvitteringer](../../meldinger/KvitteringsMelding.md) er
[Receiver](Receiver*)

  - Den [Aktør](../Aktorer) som sto som [Sender](Sender.md) for [digital
    post meldingen](../../meldinger/DigitalPostMelding.md).

### Attributter

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| Identifier    | 1..1         | [virksomhetsidentifikator](/Felles/virksomhetsidentifikator.md) |           |

### XML eksempel

``` brush: xml; toolbar: false
    <Receiver>
        <!-- orgnr avsender -->
        <Identifier Authority="iso6523-actorid-upis">9908:123456789</Identifier>
    </Receiver>
```
