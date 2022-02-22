---
title: KanVelgeSikkerDigitalPostkasseForespoersel  

sidebar: begrep_sidebar
redirect_from: /ot_kanvelgesikkerdigitalpostkasseforespoersel
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Forespørsel sendt fra Postkasseleverandør for å sjekke om en Innbygger kan velge postkasse for offentlig bruk. |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Webservice forespørsel som Postkasseleverandør sender til Kontaktregisteret, forespørselen sjekker om Innbygger kan velge postkasse for offentlig bruk. Dersom Innbygger ikke har registrert noen aktiv postkasse i kontakt og reservasjonsregisteret kan Innbygger velge seg en postkasse for offentlig bruk. |

#### Attributer

| Term                                               | Kardinalitet | Datatype                                              |
| -------------------------------------------------- | ------------ | ----------------------------------------------------- |
| [personidentifikator]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/personidentifikator) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |

#### Respons

Responsen er en
[KanVelgeSikkerDigitalPostkasseRespons]({{site.baseurl}}/resources/begrep/oppslagstjenesten/KanVelgeSikkerDigitalPostkasseRespons)
