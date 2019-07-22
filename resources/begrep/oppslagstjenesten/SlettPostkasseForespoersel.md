---
title: SlettPostkasseForespoersel  
headtitle: Begrepskatalog for Sikker digital post -  
datatype: Metode  
Service: Oppslagstjenesten  
group: Oppslagstjenesten/PK\_Metode  
permalink: ot_slettpostkasseforespoersel.html
sidebar:
---

|---|---|
| Identifikator | <http://begrep.difi.no/Oppslagstjenesten/5.0.0/5.0/SlettPostkasseForespoersel> |
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
