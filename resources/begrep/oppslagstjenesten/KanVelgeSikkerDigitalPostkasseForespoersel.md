---
title: KanVelgeSikkerDigitalPostkasseForespoersel  
datatype: Metode
permalink: ot_kanvelgesikkerdigitalpostkasseforespoersel.html
sidebar:
---

  - Identifikator  
    http://begrep.difi.no/Oppslagstjenesten/5.0.0/5.0/KanVelgeSikkerDigitalPostkasseForespoersel
  - Term  
    {{page.title}}
  - Definisjon  
    Forespørsel sendt fra Postkasseleverandør for å sjekke om en
    Innbygger kan velge postkasse for offentlig bruk.
  - Datatype  
    {{ page.datatype }}
  - Kilde  
    DIFI
  - Kommentar  
    Webservice forespørsel som Postkasseleverandør sender til
    Kontaktregisteret, forespørselen sjekker om Innbygger kan velge
    postkasse for offentlig bruk.  
    Dersom Innbygger ikke har registrert noen aktiv postkasse i kontakt
    og reservasjonsregisteret kan Innbygger velge seg en postkasse for
    offentlig bruk.

#### Attributer

| Term                                               | Kardinalitet | Datatype                                              |
| -------------------------------------------------- | ------------ | ----------------------------------------------------- |
| [personidentifikator](../felles/personidentifikator.md) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |

#### Respons

Responsen er en
[KanVelgeSikkerDigitalPostkasseRespons](KanVelgeSikkerDigitalPostkasseRespons.md)
