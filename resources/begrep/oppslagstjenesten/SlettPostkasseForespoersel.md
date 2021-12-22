---
title: SlettPostkasseForespoersel  

sidebar: begrep_sidebar
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Forespørsel sendt fra Postkasseleverandør for å slette en postkasse. |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Webservice forespørsel som Postkasseleverandør sender til Kontaktregisteret, forespørselen sletter en digital postkasse for offentlig bruk i kontaktregisteret |

#### Attributer

| Term                                                              | Kardinalitet | Datatype                                              |
| ----------------------------------------------------------------- | ------------ | ----------------------------------------------------- |
| [personidentifikator]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/personidentifikator)                | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| [virksomhetssidentifikator]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/virksomhetsidentifikator) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |

#### Respons

Responsen er en [SlettPostkasseRespons]({{site.baseurl}}/resources/begrep/oppslagstjenesten/SlettPostkasseRespons)
