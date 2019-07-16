-----

layout: default  
title: Sender  
headtitle: Sikker digital post - Standard Business Document  
group: forretningslag

id: Forretningslag/Sender  
next: Forretningslag/Receiver

-----

{% include variables.html %}

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
    [Sender](Sender) den som har signert [Standard Business
    Document](index). Regler for hvem som opptrer som [Sender](Sender)
    er beskrevet under.

\*For [digital post meldinger](../../meldinger/DigitalPostMelding) er
[Sender](Sender*)

  - [Behandlingsansvarlig](../Aktorer) eller en
    [databehandler](../Aktorer) på veien av
    [behandlingsansvarlig](../Aktorer)
  - Den som vil motta alle
    [kvitteringer](../../meldinger/KvitteringsMelding) tilbake fra
    [Receiver](Receiver)

\*For [digital post kvitteringer](../../meldinger/KvitteringsMelding) er
[Sender](Sender*)

  - [Postkasseleverandør](../Aktorer)

### Attributter

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| Identifier    | 1..1         | [virksomhetsidentifikator](/Felles/virksomhetsidentifikator) |           |

### XML eksempel

``` brush: xml; toolbar: false
    <Sender>
        <!-- orgnr avsender -->
        <Identifier Authority="iso6523-actorid-upis">9908:123456789</Identifier>
    </Sender>
```
