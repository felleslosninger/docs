---
title: SlettPostkasseForespoersel  
permalink: ot_slettpostkasseforespoersel.html
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
| [personidentifikator](../felles/personidentifikator.md)                | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| SKAL VÆRE LINK TIL ../felles/virksomhetsidentifikator.md | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |

#### Respons

Responsen er en [SlettPostkasseRespons](SlettPostkasseRespons.md)
