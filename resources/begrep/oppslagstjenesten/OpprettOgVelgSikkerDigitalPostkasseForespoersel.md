--- 
title: OpprettOgVelgSikkerDigitalPostkasseForespoersel  
headtitle: Begrepskatalog for Sikker digital post -  
datatype: Metode  
Service: Oppslagstjenesten  
group: Oppslagstjenesten/PK\_Metode  
permalink: ot_opprettogvelgsikkerdigitalpostkasseforespoersel.html
sidebar:
---

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Forespørsel sendt fra Postkasseleverandør for å opprette og sette at
    en postkasse aktiveres for en innbygger.
  - Datatype  
    {{ page.datatype }}
  - Kilde  
    DIFI
  - Kommentar  
    Webservice forespørsel som Postkasseleverandør sender til
    Kontaktregisteret, forespørselen oppdaterer kontaktregisteret med
    informasjon om en digital postkasse

#### Attributer

| Term                                                              | Kardinalitet | Datatype                                                          |
| ----------------------------------------------------------------- | ------------ | ----------------------------------------------------------------- |
| [personidentifikator](../felles/personidentifikator.md)                | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)             |
| SKAL VÆRE LINK TIL ../felles/virksomhetsidentifikator.md | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)             |
| [postkasseadresse](../felles/postkasseadresse.md)                      | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)             |
| [X509Sertifikat](../felles/x509Sertifikat.md)                          | 0..1         | [X509Certifiate](http://www.w3.org/TR/xmldsig-core/#sec-X509Data) |

#### Respons

Responsen er en
[OpprettOgVelgSikkerDigitalPostkasseRespons](OpprettOgVelgSikkerDigitalPostkasseRespons.md)
