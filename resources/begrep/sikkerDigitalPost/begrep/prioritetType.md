---
title: PrioritetType

sidebar: begrep_sidebar
redirect_from: /prioritettype
---

| ---- | ---- |
| Term | PrioritetType |
| Definisjon | Definerer meldingens prioritering i forbindelse med meldingsutvekslingen. |
| Datatype | String |
| Kilde | Digdir |
| Kommentar | Ved prioritetType=1 vil meldingen behandles forran alle prioritetType=2 meldinger. Meldingen vil sendes til Innbygger sin postkasse innen minutter. **Meldinger med prioritetType=1 kan medføre høyere kostnader for Avsender.** | 
| Gyldige verdier | 1 ; 2 |
| Standardverdi | 2 |

### Xml eksempel

```
<prioritetType>2</prioritetType>
```

