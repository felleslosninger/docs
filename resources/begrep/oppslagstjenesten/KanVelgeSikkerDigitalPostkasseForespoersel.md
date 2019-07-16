-----

layout: default  
title: KanVelgeSikkerDigitalPostkasseForespoersel  
headtitle: Begrepskatalog for Sikker digital post -  
datatype: Metode  
Service: Oppslagstjenesten  
group: Oppslagstjenesten/PK\_Metode  
—-  
{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
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
| [personidentifikator](/Felles/personidentifikator) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |

#### Respons

Responsen er en
[KanVelgeSikkerDigitalPostkasseRespons](KanVelgeSikkerDigitalPostkasseRespons)
