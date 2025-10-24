---
title: DocumentIdentification
permalink: dpi_documentidentification.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Inneholder identifikasjon om dokumentet. |
| Kilde         | [GS1](https://www.gs1.org/standards/edi-xml-gdsn-gs1-un-cefact-xml-profiles/sbdh-technical-specifications/1-3) |

### Attributer

| Identifikator       | Kardinalitet | Datatype    | Verdi                                                                                                                      |
| ------------------- | ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| Standard            | 1..1         | String   | Id til en av de gyldige [meldingstypene](dpi_forretiningsmelding_index.html)                                                |
| TypeVersion         | 1..1         | String   | “1.0”                                                                                                                      |
| InstanceIdentifier  | 1..1         | String - uuid   | Unik identifikator for meldingen ([UUID](https://datatracker.ietf.org/doc/html/rfc4122)). Opprettet av Databehandler|
| Type                | 1..1         | String   | Type forretningsmelding. Skal alltid være “local-name” melding objektet Melding. Se kodeverk under |
| MultipleType        | 0..0         | Boolean  | Brukes ikke                                                                                                                |
| CreationDateAndTime | 1..1         | String - dateTime | Tidspunkt for oppretting av [Standard Business Document](dpi_sbd_index.html)                                                       |


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

### Eksempel

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
