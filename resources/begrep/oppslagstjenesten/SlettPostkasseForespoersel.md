-----

layout: default  
title: SlettPostkasseForespoersel  
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
    Forespørsel sendt fra Postkasseleverandør for å slette en postkasse.
  - Datatype  
    {{ page.datatype }}
  - Kilde  
    DIFI
  - Kommentar  
    Webservice forespørsel som Postkasseleverandør sender til
    Kontaktregisteret, forespørselen sletter en digital postkasse for
    offentlig bruk i kontaktregisteret

#### Attributer

| Term                                                              | Kardinalitet | Datatype                                              |
| ----------------------------------------------------------------- | ------------ | ----------------------------------------------------- |
| [personidentifikator](/Felles/personidentifikator)                | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| [postkasseleverandoerOrgNummer](/Felles/virksomhetsidentifikator) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |

#### Respons

Responsen er en [SlettPostkasseRespons](SlettPostkasseRespons)
