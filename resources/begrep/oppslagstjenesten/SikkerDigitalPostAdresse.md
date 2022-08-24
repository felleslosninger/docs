---
title: SikkerDigitalPostAdresse  

sidebar: begrep_sidebar
redirect_from: /ot_sikkerdigitalpostadresse
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
| [postkasseadresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/postkasseadresse)                       | 1..1         |
| [postkasseleverandoerAdresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/postkasseleverandoerAdresse) | 1..1         |

#### Xml eksempel

```
<ns2:SikkerDigitalPostAdresse>
   <ns2:postkasseadresse>1</ns2:postkasseadresse>
   <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
</ns2:SikkerDigitalPostAdresse>
```
