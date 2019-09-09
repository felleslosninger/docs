---
title: SikkerDigitalPostAdresse  
permalink: ot_sikkerfigitalpostadresse.html
sidebar: begrep_sidebar
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Adresse informasjon om Person sin Sikker DigitalPostKasse |
| Datatype      | complexType |
| Kilde         | DIFI |
| Kommentar     | SikkerDigitalPostAdresse er Innbygger sin adresse til Postkassen. Det inneholder nok informasjon til å adresse post til Innbygger sin postkasse. |

#### Attributer

| Term                                                               | Kardinalitet |
| ------------------------------------------------------------------ | ------------ |
| [postkasseadresse](../felles/postkasseadresse.md)                       | 1..1         |
| [postkasseleverandoerAdresse](../felles/postkasseleverandoerAdresse.md) | 1..1         |

#### Xml eksempel

```
<ns2:SikkerDigitalPostAdresse>
   <ns2:postkasseadresse>1</ns2:postkasseadresse>
   <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
</ns2:SikkerDigitalPostAdresse>
```
