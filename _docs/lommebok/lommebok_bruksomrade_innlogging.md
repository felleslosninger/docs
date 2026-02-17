---
title: Bruksområde innlogging
description: Bruksområde innlogging

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_bruksomrade_innlogging
---

Innlogging på høgt sikkerheitsnivå, slik me kjenner det frå dagens tradisjonelle eIDar, er ein grunnfunksjonalitet i den digitale lommeboka.

Innlogging vert realisert ved at innbyggaren deler det digitale identitetsbeviset, den sokalla sokalla **PID'en** (person identification data),  med ein brukarstad.  

Det er særskilte krav i eIDAS2 knytta til PID,  mellom anna skal utførtast ein id-kontroll på høgt sikkerheitsnivå samstundes som brukaren får PIDen, som då også skalø bindast kryptografisk mot det sikre nøkkellagerert (WSCD) til lommebok-instansen.  Det er berre særskilde utstedarar, utpeikt av medlemslandet, som har lov til å utferde PID. 


### Rulebook

Reglane for korleis ein PID ser ut, finn du [på EU-kommisjon sitt github-repo for rulebooks](https://github.com/eu-digital-identity-wallet/eudi-doc-attestation-rulebooks-catalog/blob/main/rulebooks/pid/pid-rulebook.md)

Regelboka har ei lang liste med valfrie felt, men dei følgjande er obligatoriske og vil alltid finnast i PIDer frå heile Europa: 

- Fornamn
- Etternamn
- Fødselsdato
- Fødestad
- Nasjonalitet

Den norske PIDen inneheld i tillegg  norsk fødsels- eller D-nummer i attributtet `personal_administrative_number`. 


### Døme

Døme på PID, med alle obligatoriske attributt,  i SD-JWT format:
```
{
  "place_of_birth": 
    { 
      "country": "NO"
    },
 "birthdate"="1985-10-23", 
 "nationalities": [ "NO" ], 
 "given_name": "OPPFARENDE", 
 "family_name":  "HEI"
} 
```
(merk dømet er forenkla.)



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



