---
title: varslingsTekst
permalink: varslingstekst.html
sidebar:
---

| ---- | ---- |
| Identifikator | |
| Term | varslingsTekst |
| Definisjon | Tekst til Innbygger. Brukt til å sende påminnelser/varslinger for å sikre at Innbygger skaffer seg tilgang til et tilknyttet dokument. |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | En tekst knyttet til en digital post forsendelse. Teksten legges med i varslinger/påminnelser til Innbygger. |

* For epost varsel er maks tillatt med 500 tegn.
* For sms varsel er maks tillatt med 160 tegn. 

### Attributter

Tittelen har et språk attributt som beskriver teksten. Språk attributtet kan brukes for å understøtte funksjoner som opplesing av tekst.

| ---- | ---- |
| **Identifikator** | **Kardinalitet** | **Datatype** |
| lang              | 1..1             | spraak       |


### Xml eksempel

```
<varslingsTekst lang="no">Tilbud om bostøtte til din hybelkanin. Husk svarfrist på dette dokumentet er 24.12 2013.</varslingsTekst>
```

