---
title: Sender
permalink: dpi_sender.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Avsender som har initiert en meldingsprosess mot meldingsutvekslingsrammeverket. |
| Kilde         | GS1 |
| Kommentar     | Sender den som har signert [Standard Business Document](dpi_sbd_index.html). Regler for hvem som opptrer som Sender er beskrevet under. |

\*For [digital post meldinger](../../meldinger/DigitalPostMelding.md) er
[Sender](sdp_sender.html)

  - [Behandlingsansvarlig](dpi_aktorer.html) eller en
    [databehandler](hdpi_aktorer.html) på veien av
    [behandlingsansvarlig](dpi_aktorer.html)
  - Den som vil motta alle
    [kvitteringer](dpi_kvittering.html) tilbake fra
    [Receiver](dpi_receiver.html)

\*For [digital post kvitteringer](dpi_kvittering.html) er
[Sender](dpi_sender.html)

  - [Postkasseleverandør](dpi_aktorer.html)

### Propperteis

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| authority     | 1..1         |Henviser til identitesautoritet. For orgnr angi iso6523-actorid-upis, for personnummer iso3166-1| [Peppol ICD List](https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/)|
| identifier    | 1..1         | https://difi.github.io/felleslosninger/virksomhetsidentifikator.html | Angis i på formen <ICD>:<Organisasjonsnummer>           |


### Eksempel
```json
{
    "sender": [
            {
                "identifier": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:123456789"
                }
            }
        ],
}
```
