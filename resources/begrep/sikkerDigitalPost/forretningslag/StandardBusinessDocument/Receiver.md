-----

layout: default  
title: Receiver  
headtitle: Sikker digital post - Standard Business Document  
group: forretningslag

id: Forretningslag/Receiver

next: Forretningslag/DocumentIdentification

-----

{% include variables.html %}

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
    Regler for hvem som opptrer som [Receiver](Receiver) er beskrevet
    under.

\*For [digital post meldinger](../../meldinger/DigitalPostMelding) er
[Receiver](Receiver*)

  - [Postkasseleverandør](../Aktorer)

\*For [digital post kvitteringer](../../meldinger/KvitteringsMelding) er
[Receiver](Receiver*)

  - Den [Aktør](../Aktorer) som sto som [Sender](Sender) for [digital
    post meldingen](../../meldinger/DigitalPostMelding).

### Attributter

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| Identifier    | 1..1         | [virksomhetsidentifikator](/Felles/virksomhetsidentifikator) |           |

### XML eksempel

``` brush: xml; toolbar: false
    <Receiver>
        <!-- orgnr avsender -->
        <Identifier Authority="iso6523-actorid-upis">9908:123456789</Identifier>
    </Receiver>
```
