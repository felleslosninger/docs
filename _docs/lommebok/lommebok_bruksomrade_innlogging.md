---
title: Bruksområde innlogging
description: Bruksområde innlogging

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_bruksomrade_innlogging
---

Innlogging på høgt sikkerheitsnivå slik me kjenner det frå dagens tradisjonelle eIDar er også støtta av den digitale lommeboka.

Innbyggaren deler det digitale identitetsbeviset, den sokalla sokalla **PID'en** (person identification data),  med ein brukarstad for å logge inn.  

Det er særskilte krav i eIDAS2 knytta til PID,  mellom anna skal det vere utført ein id-kontroll ihht nivå høgt samstundes som brukaren får PIDen. PIDen skal då også bindast kryptografisk mot det sikre nøkkellagerert (WSCD) til lommebok-instansen.  Det er berre særskilde utstedarar, utpeikt av medlemslandet, som har lov til å utferde PID. 


### Rulebook

Reglane for korleis ein PID ser ut, finn du [på EU-kommisjon sitt github-repo](https://github.com/eu-digital-identity-wallet/eudi-doc-attestation-rulebooks-catalog/blob/main/rulebooks/pid/pid-rulebook.md)

Regelboka har ei lang liste med valfrie felt, men dei følgjande er obligatorisk og kan alltid etterspørsjast av ein brukarstad:


- Fornamn
- Etternamn
- Fødselsdato
- Fødestad
- Nasjonalitet

Den norske PIDen inneheld i tillegg  norsk fødsels- eller D-nummer i attributtet `personal_administrative_number`. 



### Døme

Her er ein DCQL-spørring som etterspør ein PID med fødselsnummer, i SD JWT-format:

```
{
  "credentials" : [ {
    "meta" : {
      "vct_values" : [ "urn:eudi:pid:1" ]
    },
    "format" : "dc+sd-jwt",
    "claims" : [ {
      "path" : [ "personal_administrative_number" ]
    } ],
    "id" : "eudi-pid-sd-jwt-vc"
  } ]
}
```


Tilsvarande spørring dersom du heller vil bruke mdoc-formatet
```
{
  "credentials" : [ {
    "meta" : {
      "doctype_value" : "eu.europa.ec.eudi.pid.1"
    },
    "format" : "mso_mdoc",
    "claims" : [ {
      "path" : [ "eu.europa.ec.eudi.pid.1", "personal_administrative_number" ]
    } ],
    "id" : "pid"
  } ]
}
```

