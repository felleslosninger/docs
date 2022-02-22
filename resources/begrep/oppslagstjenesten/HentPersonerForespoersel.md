---
title: HentPersonerForespoersel  

datatype: Metode
sidebar: begrep_sidebar
redirect_from: /ot_hentpersonerforespoersel
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Forespørsel sendt fra Virksomhet for å hente Personer fra kontakt og reservasjonsregisteret |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Webservice forespørsel som Klient sender til Kontaktregisteret, forespørselen beskriver hvilke personer Klienten ønsker uthentet og hvilken informasjon som ønskes utlevert. Se integrasjonsguiden for Oppslagstjenesten for tekniske detaljer om forespørselen og hvordan denne sendes. |

Responsen er en [HentPersonerRespons]({{site.baseurl}}/resources/begrep/oppslagstjenesten/HentPersonerRespons)

#### Attributer

| Term                                               | Kardinalitet |
| -------------------------------------------------- | ------------ |
| [personidentifikator]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/personidentifikator) | 1..1000      |
| [informasjonsbehov]({{site.baseurl}}/resources/begrep/felles/informasjonsbehov)     | 0..\*        |


Dersom det ikke spesifiseres noen informasjonsbehov-element i
forespørselen, vil standard responsverdi være Person.  
Eventuelle overflødige(ikke definerte) eller duplikate informasjonsbehov
vil ignoreres.

### Eksempel på HentPersonerForespoersel (REST)

```
POST /rest/v1/personer
Content-type: application/json
Authorization: Bearer SWDQ_pVct3HIzsIaC3zHDuMmIqffr4ORr508N3p0Mtg=

{
 "personidentifikatorer" : [ "23079422568" ]
 
}
```

### Eksempel på HentPersonerRespons (REST)

```
{
  "personer":
    [
      {
         "personidentifikator": "23079421936",
         "reservasjon": "NEI",
         "status": "AKTIV",
         "kontaktinformasjon":
         {
            "epostadresse": "23079421936-test@minid.norge.no",
            "epostadresse_oppdatert": "2018-06-29T10:14:52+02",
         }
      }
   ]
}
```

### Eksempel på HentPersonerForespoersel (SOAP)

``` 
<ns:HentPersonerForespoersel>
 <ns:informasjonsbehov>Kontaktinfo</ns:informasjonsbehov>
 <ns:informasjonsbehov>Sertifikat</ns:informasjonsbehov>
 <ns:informasjonsbehov>SikkerDigitalPost</ns:informasjonsbehov>
 <ns:informasjonsbehov>VarslingsStatus</ns:informasjonsbehov>
 
 <ns:personidentifikator>01013355300</ns:personidentifikator>
 <ns:personidentifikator>01013355491</ns:personidentifikator>
 <ns:personidentifikator>01013356366</ns:personidentifikator>
</ns:HentPersonerForespoersel>
```
