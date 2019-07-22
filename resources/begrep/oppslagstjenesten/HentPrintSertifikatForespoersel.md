--- 
title: HentPrintSertifikatForespoersel  
datatype: Metode
permalink: ot_hentprintsertifikatforespoersel.html
sidebar:
---
|---|---|
| Identifikator | <http://begrep.difi.no/Oppslagstjenesten/5.0.0/5.0/HentPrintSertifikatForespoersel> |
| Term          | {{page.title}} |
| Definisjon    | Forespørsel sendt fra Virksomhet for å hente Sertifikater fra Printleverandør i Sikker Digital Post. |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Webservice forespørsel som Klient sender til Oppslagstjenesten, forespørselen brukes for å hente ut det sertifikat som skal brukes for å kryptere meldinger som skal printes. Se integrasjonsguiden for Oppslagstjenesten for tekniske detaljer om forespørselen og hvordan denne sendes. |
Responsen er en [HentPrintSertifikatRespons](HentPrintSertifikatRespons.md)

#### Attributer

Ingen input attributter

#### Xml eksempel

``` 
brush: xml; toolbar: false
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://kontaktinfo.difi.no/xsd/oppslagstjeneste/14-05">
   <soapenv:Header/>
   <soapenv:Body>
      <ns:HentPrintSertifikatForespoersel/>
   </soapenv:Body>
</soapenv:Envelope>
```
