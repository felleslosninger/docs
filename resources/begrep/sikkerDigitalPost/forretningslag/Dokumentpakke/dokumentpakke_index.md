---
title: Dokumentpakke (ASiC)  
permalink: dokumentpakke_index.html
sidebar: dpi_sidebar
---

## Introduksjon

Dokumentpakke inngår kun i
[DigitalPostMeldinger](../../meldinger/DigitalPostMelding.md).

[Associated Signature Container
(ASiC)](http://www.etsi.org/deliver/etsi_ts/102900_102999/102918/01.03.01_60/ts_102918v010301p.pdf)
er et pakkeformat som er designet for å ivareta integritet til innholdet
over lang tid. Kort fortalt så definerer standarden hvordan man skal
sette sammen en zip fil med en filstruktur der man lager en digital
signatur hver enkel fil med en kombinasjon av et digitalt fingeravtrykk
av filen og et PKI sertifikat eid av en virksomheten.  
Dette medfører at man kan verifisere at filene kommer fra rett
virksomhet, og om filene har blitt endret.

Les mer om [hvordan dokumenter som sendes i Sikker digital post er
beskyttet](sikkerhet_index.html)

Sikker Digital Post har definert et eget begrep [Manifest](Manifest.md) som
inneholder metadata relatert til hver fil.

### Innhold

| Fil                      | Kardinalitet | Beskrivelse                                                                                                                      |
| ------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| hoveddokument            | 1..1         | fil - se: krav til [filnavn og dokumentformat](dokumentformat_index.html)                                                               |
| [manifest.xml](Manifest.md) | 1..1         | [manifest](Manifest.md)                                                                                                             |
| vedlegg                  | 0..200       | fil - se: krav til [filnavn og dokumentformat](dokumentformat_index.html)                                                               |
| META-INF/signatures.xml  | 1..1         | [XAdES](http://www.etsi.org/deliver/etsi_ts%5C101900_101999%5C101903%5C01.04.02_60%5Cts_101903v010402p.pdf) signaturer av filene |

### Begrensninger

  - Dokumentpakken kan inneholde et hoveddokument
  - Dokumentpakken kan ha inntil 200 vedlegg
  - Avsender kan ikke definere rekkefølgende på vedleggene, sorteringen
    av disse håndteres av postkassen.

### Eksempel

  - [Manifest](../../eksempler/sdpManifest.xml)
  - [Full dokumentpakke](../../eksempler/post.asice.zip)

### Refererte standarder

  - [Associated Signature Container
    (ASiC)](http://www.etsi.org/deliver/etsi_ts/102900_102999/102918/01.03.01_60/ts_102918v010301p.pdf)
  - [XAdES](http://www.etsi.org/deliver/etsi_ts%5C101900_101999%5C101903%5C01.04.02_60%5Cts_101903v010402p.pdf)
