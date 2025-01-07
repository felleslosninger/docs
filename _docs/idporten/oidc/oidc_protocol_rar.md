---
title: RAR-typer i ID-porten
description: ID-porten bruker RAR til kommunisere representasjonsforhold

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_rar
---


ID-porten bruker standarden [Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) til å strukturere informasjon om representasjonsforhold, både i forespørsler og tokens. 


RAR er en ny Oauth2-utvidelse for transaksjonsspesifikke autorisasjoner. Der “basic” Oauth2 kun gir tilgang til et såkalt “scope” (tekst-streng), åpner RAR for tilgang til mer utvidede datamodeller i form av autorisasjonstyper. Autorisasjonstypen(e) blir utlevert i token som et nytt hierarkisk claim kalla `authorization_details` som igjen er ein array av autorisasjonsobjekter, der hvert objekt består av:

* Standardisert påkrevd felt:
    * `type` definerer den aktuelle autorisasjonstypen

* Eigendefinert datamodell
    * til ein gitt `type` vil det vere definert og dokumentert ein tilhøyrande gyldig datamodell.  Ansattporten sine datamodeller er definert på denne siden.  


# Forhold mellom RAR og scope

Det er ingen teknisk sammenheng mellom et Oauth2 scope og RAR, de to mekanismene er disjunkte.  

En kan derfor ikke legge til grunn at en klient som ikke har fått et gitt scope, heller ikke kan motta en rar-struktur i token.

# Tilgangstyring av RAR-typer

Det er p.t. ingen tilgangstyring av RAR-typer.  Alle klienter fra alle kunder kan sende inn en RAR-struktur i autorisasjonsforspørselen, og den vil trigge fullmaktsvelger.


# RAR-typer støttet i ID-porten

Følgende authorization_type er støttet i ID-porten:

| `authorization_type` | 	 Skildring |
|-|-|
| `idporten:fullmakt`  |Bruker fullmaktsgupper i Altinn 3 som autorativ kilde for representasjonsforhold. Altinn3 inkluderer både vergemål og brukerstyrte fullmakter. |





# Datamodell for  fullmakt (`idporten:fullmakt`)

Følgende claims kan sendes inn i request: 

| claim | kardinalitet|beskrivelse |
|-|-|-|
|permission_roles | påkrevd| Et array av hvilke fullmaktsgrupper som etterspørres. |


Du finner en oversikt over tilgjengelige typer [hos Statens Sivilrettsforvaltning](https://www.vergemal.no/fullmaktstekst).  Selve det detaljerte kodeverket vi bruker er foreløpig basert på verdiene som [Skatteetaten har definert i sin informasjonsmodell](https://skatteetaten.github.io/folkeregisteret-api-dokumentasjon/informasjonsmodell/) (les avsnitt 5.20 i PDFen side 79).  På sikt vil disse erstattes av definisjonene for [fullmaktsgrupper for innbygger i Altinn 3](https://docs.altinn.studio/authorization/what-do-you-get/accessgroups/type-accessgroups/tilgangsgrupper-innbyggere/).



*Eksempel på request*: 
```
  authorization_details= [
    {
      "type": "idporten:fullmakt",
      "permission_roles": [ "arbeid"] 
    }
  ]
```

Datamodellen for respons inneholder de samme claimene som i request, men i tillegg vil det utleveres:

| claim | beskrivelse |
|-|-|-|
| authorized_representative | Fødselsnummer til fullmektig (innlogga bruker)|
| authorizer | Fødselsnummer til fullmaktsgiver / vergehaver.  |

*Eksempel på respons*:
```

  "authorization_details" : [ {
    "type" : "idporten:fullmakt",

    "authorizer" : {
      "name" : "USIKKER BILLETTLUKE",
      "pid" : "28816196088"
    },
    "permissions" : [ {
      "owner" : "nav",
      "role" : "arbeid"
    } ],
    "authorized_representative" : {
      "name" : "LIVSGLAD DEDIKERT HUSBÅT BILLETTLUKE",
      "pid" : "05895894984"
    }
  } ]
```

