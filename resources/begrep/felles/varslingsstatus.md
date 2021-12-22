---
title: varslingsstatus

sidebar:
---

| ---- | ---- |
| Identifikator |  |
| Term | varslingsstatus |
| Definisjon | varslingsstatus gir en tekstlig beskrivelse av om bruker har utgått kontaktinformasjon eller ikke, ihht eForvaltningsforskriftens §32 andre ledd. |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | varslingsstatus blir brukt i Person. | 


### Kodeverk for varslingsstatus
Varslingsstatus kan ha følgende verdi:

| ---- | ---- |
| **Kodeverdi** | **Beskrivelse** | 
| KAN_VARSLES | Person har ikke utgått kontaktinformasjon |
| KAN_IKKE_VARSLES | Person har utgått kontaktinformasjon, er reservert, er slettet eller finnes ikke i registeret |

### Xml eksempel

```
<ns2:varslingsstatus>KAN_VARSLES</ns2:varslingsstatus>
```


