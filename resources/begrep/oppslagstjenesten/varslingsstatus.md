-----

layout: egenskap  
title: varslingsstatus  
headtitle: Begrepskatalog for Oppslagstjenesten -  
group: Egenskap  
datatype: string  
—-

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”.html"
    }}":{{page.title}}
  - Term  
    {{page.title}}
  - Definisjon  
    varslingsstatus gir en tekstlig beskrivelse av om bruker har utgått
    kontaktinformasjon eller ikke, ihht eForvaltningsforskriftens §32
    andre ledd.
  - Datatype  
    <span style="{ page.datatype ;">[}](http://www.w3.org/TR/xmlschema-2/#{{page.datatype}})</span>
  - Kilde  
    DIFI
  - Kommentar  
    varslingsstatus blir brukt i Person.

#### Kodeverk for varslingsstatus

[varslingsstatus](/Oppslagstjenesten/varslingsstatus) kan ha følgende
verdi:

| Kodeverdi          | Beskrivelse                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| KAN\_VARSLES       | Person har ikke utgått kontaktinformasjon                                                     |
| KAN\_IKKE\_VARSLES | Person har utgått kontaktinformasjon, er reservert, er slettet eller finnes ikke i registeret |

### Xml eksempel

    <ns2:varslingsstatus>KAN_VARSLES</ns2:varslingsstatus>
