-----

layout: egenskap  
title: paaVegneAv  
headtitle: Begrepskatalog for Oppslagstypen -  
group: Egenskap  
datatype: string  
—-

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”.html"
    }}":{{page.title}}
  - Term  
    {{page.title}}
  - Definisjon  
    Identifikasjon av en organisasjon
  - Datatype  
    <span style="{ page.datatype ;">[}](http://www.w3.org/TR/xmlschema-2/#{{page.datatype}})</span>
  - Kilde  
    DIFI
  - Kommentar  
    paaVegneAv er et gyldig organisasjonsnummer

### Xml eksempel

``` 
   <Oppslagstjenesten xmlns="http://kontaktinfo.difi.no/wsdl/oppslagstjeneste-16-02">
        <PaaVegneAv>991825827</PaaVegneAv>
   </Oppslagstjenesten>
```
