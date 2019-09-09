---
title: ikkeSensitivTittel
permalink: ikkesensitivtittel.html
sidebar: begrep_sidebar
---

| ---- | ---- |
| Term | ikkeSensitivTittel |
| Definisjon | En tittel som ikke inneholder sensitiv informasjon |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | Vil vises til Innbygger og brukes i varslinger/påminnelser på e-post og sms til Innbygger. Skal ikke inneholde sensitiv informasjon. Kan brukes på lavere sikkerhetsnivå enn det selve dokumentet er klassifisert på. | 

Dersom en forsendelse har sikkerhetsnivaa satt til 4 og Innbygger er innlogget på nivå 2 eller 3 vil ikkeSensitivTittel vises.
Merk at Digipost ikke har støtte for ikkeSensitivTittel da de ikke har støtte for flere titler knyttet til en forsendelse. I Digipost brukes i stedet en standard hardkodet tekst i listevisningen; “Meldingen er låst” i de tilfeller der ikkeSensitivTittel skulle vært brukt. I varsel til innbygger vises teksten; "Du har fått en ny melding fra {avsender}".

### Attributter

Tittelen har et språk attributt som beskriver teksten. Språk attributtet kan brukes for å understøtte funksjoner som opplesing av tekst.

| ---- | ---- |
| **Identifikator** | **Kardinalitet** | **Datatype** |
| lang              | 1..1             | spraak       |


### Xml eksempel

```
<ikkeSensitivTittel lang="no">Vedtaksbrev - støtte til utdanning - saksnr. 2013/1111</ikkeSensitivTittel>
```
