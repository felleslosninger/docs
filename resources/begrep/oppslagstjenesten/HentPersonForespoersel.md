---
title: HentPersonForespoersel  

datatype: Metode
sidebar: begrep_sidebar
redirect_from: /ot_hentpersonforespoersel
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Forespørsel sendt fra Virksomhet for å hente data om innlogget bruker fra Kontakt- og reservasjonsregisteret |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Webservice forespørsel som Klient sender til Kontakt- og reservasjonsregisteret. Forespørselen gjelder innlogget person. |

Responsen er en [HentPersonRespons]({{site.baseurl}}/resources/begrep/oppslagstjenesten/HentPersonRespons)



### Eksempel på HentPersonForespoersel (REST)

```
POST /rest/v1/personer
Content-type: application/json
Authorization: Bearer SWDQ_pVct3HIzsIaC3zHDuMmIqffr4ORr508N3p0Mtg=

{
 "personidentifikatorer" : [ "23079422568" ]
 
}
```

### Eksempel på HentPersonRespons (REST)

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


