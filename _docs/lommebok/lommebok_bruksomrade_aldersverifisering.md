---
title: Bruksområde aldersverifisering
description: Bruksområde aldersverifisering

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_bruksomrade_aldersverifisering
---

EU har laga eit særskild bevis for å la innbyggjarar bevise alderen sin, utan å måtte utlevere andre personopplysningar.

### Rulebook

Aldersbeviset er ikkje definert i eIDAS2-reguleringa, men derimot i eit eige, forenkla økosystem for aldersverisering.  Dette er tenkt som ein "tidleg-utgave" , som kunne takast ibruk til aldersverifisering før det komplette eIDAS2-økosystemet vart klart, for medlemsland med umiddelbare behov for å innføre aldersverifisering.  

Økosystemet er skildra på [https://ageverification.dev/](https://ageverification.dev/), ogs sjølve beviset er definert i [kap 4.1 i teknisk spesifikasjon](https://ageverification.dev/av-doc-technical-specification/docs/architecture-and-technical-specifications/#41-proof-of-age-attestation). Ein kan merke seg at beviset berre kjem i mdoc-format.

### Døme

Her er ein DCQL-spørring:

```
{
  "credentials" : [ {
    "meta" : {
      "doctype_value" : "eu.europa.ec.av.1"
    },
    "format" : "mso_mdoc",
    "claims" : [ {
      "path" : [ "eu.europa.ec.av.1", "age_over_18" ]
    } ],
    "id" : "alder"
  } ]
}
```
