---
title: varslingsstatus  
headtitle: Begrepskatalog for Oppslagstjenesten -  
group: Egenskap  
datatype: string  
permalink: ot_varslingsstatus.html
sidebar:
---

|---|---|
| Identifikator | < http://begrep.difi.no/Oppslagstjenesten/5.0.0/5.0/varslingsstatus> |
| Term          | {{page.title}} |
| Definisjon    | varslingsstatus gir en tekstlig beskrivelse av om bruker har utgått kontaktinformasjon eller ikke, ihht eForvaltningsforskriftens §32 andre ledd. |
| Datatype      | [string](http://www.w3.org/TR/xmlschema) |
| Kilde         | DIFI |
| Kommentar     | varslingsstatus blir brukt i Person. |

#### Kodeverk for varslingsstatus

[varslingsstatus](varslingsstatus.md) kan ha følgende
verdi:

| Kodeverdi          | Beskrivelse                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| KAN\_VARSLES       | Person har ikke utgått kontaktinformasjon                                                     |
| KAN\_IKKE\_VARSLES | Person har utgått kontaktinformasjon, er reservert, er slettet eller finnes ikke i registeret |

### Xml eksempel

    <ns2:varslingsstatus>KAN_VARSLES</ns2:varslingsstatus>
