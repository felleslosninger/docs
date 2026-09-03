--- 
title: Sender  

sidebar: dpi_sidebar
---

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Avsender som har initiert en meldingsprosess mot meldingsutvekslingsrammeverket. |
| Kilde         | GS1 |
| Kommentar     | Sender den som har signert [Standard Business Document](https://difi.github.io/felleslosninger/standardbusinessdocument_index.html). Regler for hvem som opptrer som Sender er beskrevet under. |

\*For [digital post meldinger]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png) er
[Sender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/Sender)

  - [Behandlingsansvarlig](https://difi.github.io/felleslosninger/sdp_aktorer.html) eller en
    [databehandler](https://difi.github.io/felleslosninger/sdp_aktorer.html) på veien av
    [behandlingsansvarlig](https://difi.github.io/felleslosninger/sdp_aktorer.html)
  - Den som vil motta alle
    [kvitteringer]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/KvitteringsMelding) tilbake fra
    [Receiver](https://difi.github.io/felleslosninger/sdp_receiver.html)

\*For [digital post kvitteringer]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/KvitteringsMelding) er
[Sender](https://difi.github.io/felleslosninger/sdp_sender.html)

  - [Postkasseleverandør](https://difi.github.io/felleslosninger/sdp_aktorer.html)

### Attributter

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| Identifier    | 1..1         | https://difi.github.io/felleslosninger/virksomhetsidentifikator.html |           |

### XML eksempel

``` 
brush: xml; toolbar: false
    <Sender>
        <!-- orgnr avsender -->
        <Identifier Authority="iso6523-actorid-upis">9908:123456789</Identifier>
    </Sender>
```
