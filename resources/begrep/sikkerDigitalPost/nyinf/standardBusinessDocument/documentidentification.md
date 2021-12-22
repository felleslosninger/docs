---
title: DocumentIdentification

sidebar: dpi_timo_sidebar
---

![](/images/dpi/underarbeide.png)

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | inneholder identifikasjon om dokumentet |
| Kilde         | [GS1](http://www.gs1.org/docs/gsmp/xml/sbdh/CEFACT_SBDH_TS_version1.3.pdf) |

### Attributer

| Identifikator       | Kardinalitet | Datatype    | Verdi                                                                                                                      |
| ------------------- | ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| Standard            | 1..1         | string   | Id til en av de gyldigie [meldingstypene](dpi_forretiningsmelding_index.html)                                                |
| TypeVersion         | 1..1         | string   | “1.0”                                                                                                                      |
| InstanceIdentifier  | 1..1         | string - uuid   | Unik identifikator for meldingen ([UUID](https://datatracker.ietf.org/doc/html/rfc4122)). Opprettet av Databehandler|
| Type                | 1..1         | string   | Type forretningsmelding. Skal alltid være “local-name” melding objektet Melding. Se kodeverk under |
| MultipleType        | 0..0         | boolean  | brukes ikke                                                                                                                |
| CreationDateAndTime | 1..1         | string - dateTime | Tidspunkt for oppretting av [Standard Business Document](dpi_sbd.md)                                                       |


### Kodeverk: Type

I Sikker Digital Post vil type være en av følgende:

  - digital
  - utskrift
  - flyttet
  - feil
  - levertkvittering
  - varslingfeiletkvittering
  - aapningskvittering
  - mottakskvitteirng
  - returpostkvittering

### Eeksempel

```json 
{
  "documentIdentification": {
      "standard": "urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::digital##urn:fdc:digdir.no:2020:innbyggerpost:schema:digital::1.0",
      "typeVersion": "1.0",
      "instanceIdentifier": "35e21e33-22b3-4554-9707-5fa829ee8bc0",
      "type": "digital",
      "creationDateAndTime": "2021-04-11T15:29:58.753+02:00"
  }
}
```
