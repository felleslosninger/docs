--- 
title: Mobiltelefonnummer  
headtitle: Begrepskatalog for Sikker digital post -  
group: Oppslagstjenesten/complexType  
permalink: ot_mobiltelefonnummer.html
sidebar:
---

  - Identifikator  
    <http://begrep.difi.no/Oppslagstjenesten/5.0.0/5.0/Mobiltelefonnummer>
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon om en Person sitt Mobiltelefonnummer registrert i
    kontakt og reservasjonsregisteret
  - Datatype  
    complexType
  - Kilde  
    DIFI
  - Kommentar  
    Informasjon om en Person sitt Mobiltelefonnummer registrert i
    kontakt og reservasjonsregisteret

#### Attributer

| Term                                             | Kardinalitet |
| ------------------------------------------------ | ------------ |
| [mobiltelefonnummer](../felles/mobiltelefonnummer.md) | 0..1         |
| [sistOppdatert](../felles/sistOppdatert.md)           | 0..1         |
| [sistVerifisert](../felles/sistVerifisert.md)         | 0..1         |

#### Xml eksempel

``` 
brush: xml; toolbar: false
<ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
```
