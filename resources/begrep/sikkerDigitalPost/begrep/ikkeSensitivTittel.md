---
title: ikkeSensitivTittel
permalink: ikkesensitivtittel.html
sidebar:
---

| ---- | ---- |
| Identifikator |  |
| Term | ikkeSensitivTittel |
| Definisjon | En tittel for en forsendelse som ikke inneholder sensitiv informasjon |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | Vil vises til Innbygger, brukes i varslinger/påminnelser på e-post og sms til Innbygger. Skal ikke inneholde sensitiv informasjon. Kan brukes på lavere sikkerhetsnivå enn det selve dokumentet er klassifisert på. | 

Dersom en forsendelse har sikkerhetsnivaa satt til 4 og Innbygger er innlogget på nivå 2 eller 3 vil ikkeSensitivTittel vises.
I Digipost brukes IKKE ikkeSensitivTittel da denne løsningen ikke har støtte for flere titler knyttet til en forsendelse. I Digipost brukes heller en standard hardkodet tekst: “Konfidensielt brev” i de tilfeller der ikkeSensitivTittel skulle vært brukt.

### Attributter

Tittelen har et språk attributt som beskriver teksten. Språk attributtet kan brukes for å understøtte funksjoner som opplesing av tekst.

| ---- | ---- |
| **Identifikator** | **Kardinalitet** | **Datatype** |
| lang              | 1..1             | spraak       |


### Xml eksempel

```
<ikkeSensitivTittel lang="no">Vedtaksbrev - støtte til utdanning - saksnr. 2013/1111</ikkeSensitivTittel>
```
