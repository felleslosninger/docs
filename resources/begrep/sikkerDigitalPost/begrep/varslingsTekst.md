---
title: varslingsTekst

sidebar: begrep_sidebar
redirect_from: /varslingstekst
---

| ---- | ---- |
| Term | varslingsTekst |
| Definisjon | Tekst til Innbygger. Brukt til å sende påminnelser/varslinger for å sikre at Innbygger skaffer seg tilgang til et tilknyttet dokument. |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | En tekst knyttet til en digital postforsendelse. Teksten legges med i varslinger/påminnelser til Innbygger. Teksten skal ikke inneholde personopplysninger eller sensitive opplysninger da varslene sendes ukryptert pr epost eller sms.|

* For epost varsel er maks tillatt med 500 tegn.
* For sms varsel er maks tillatt med 160 tegn. 

### Attributter

Tittelen har et språkattributt som beskriver teksten. Språkattributtet kan brukes for å understøtte funksjoner som opplesing av tekst.

| ---- | ---- |
| **Identifikator** | **Kardinalitet** | **Datatype** |
| lang              | 1..1             | spraak       |


### Xml eksempel

```
<varslingsTekst lang="no">Tilbud om bostøtte til din hybelkanin. Husk svarfrist på dette dokumentet er 24.12 2013.</varslingsTekst>
```

### Bruk av lenker (URL) i varsler via SMS og/eller e-post

Grunnet økning i svindel via usikre kanaler, som SMS og e-post, anbefaler Digitaliseringsdirektoratet å unngå all bruk av lenker i varsler. Se innlegg om [temaet](https://samarbeid.digdir.no/digital-postkasse/lenke-eller-ikke-det-er-sporsmalet/1525).
