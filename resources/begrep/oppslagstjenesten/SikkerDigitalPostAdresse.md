---
title: SikkerDigitalPostAdresse  
headtitle: Begrepskatalog for Sikker digital post -  
group: Oppslagstjenesten/complexType  
permalink: ot_sikkerfigitalpostadresse.html
sidebar:
---

|---|---|
| Identifikator | <http://begrep.difi.no/Oppslagstjenesten/5.0.0/5.0/SikkerDigitalPostAdresse> |
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

``` brush: xml; toolbar: false
<ns2:SikkerDigitalPostAdresse>
   <ns2:postkasseadresse>1</ns2:postkasseadresse>
   <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
</ns2:SikkerDigitalPostAdresse>
```
