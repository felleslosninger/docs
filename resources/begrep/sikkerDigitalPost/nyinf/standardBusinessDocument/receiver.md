---
title: Receiver
permalink: dpi_receiver.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

|---|---|
| Identifikator |  |
| Term          | {{page.title}} |
| Definisjon    | Sluttmottaker i en meldingsprosess. |
| Kilde         | GS1 |
| Kommentar     | Regler for hvem som opptrer som [Receiver](dpi_receiver.html) er beskrevet under. |


\*For [digtal](dpi_digital.html) meldinger er
[Receiver](dpi_receiver.html)

  - [Postkasseleverandør](dpi_aktorer.html)

\*For [kvitteringer](dpi_kvitteringer.md) er
[Receiver](dpi_receiver.html)

  - Den [Aktør](dpi_aktorer.html) som sto som [Sender](dpi_sender.html) for [digital](dpi_digital.html) meldingen.

### Properties

| Identifikator | Kardinalitet | Datatype                                                     | Kommentar |
| ------------- | ------------ | ------------------------------------------------------------ | --------- |
| authority     | 1..1         |Henviser til identitesautoritet. For orgnr angi iso6523-actorid-upis, for personnummer iso3166-1| [Peppol ICD List](https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/)|
| identifier    | 1..1         | https://difi.github.io/felleslosninger/virksomhetsidentifikator.html | Angis i på formen <ICD>:<Organisasjonsnummer>           |

### Eksempel

```json
{
    "receiver": [
            {
                "identifier": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:987654321"
                }
            }
        ],
}
```
