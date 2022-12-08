---
title: well-known
description: Maskinportens well-known endepunkt
summary: "Metadata om Maskinporten er tilgjengelig på vårt .well-known-endepunkt"

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_func_wellknown
---


## Well-known endepunkt

Metadata om Maskinporten er tilgjengelig på vårt .well-known-endepunkt ihht. [RFC8414](https://tools.ietf.org/html/rfc8414#section-3.1).  

På endepunktet finner du lenke til vårt JWK-endepunkt, der  Maskinportens signeringssertifikat publiseres.  Vi anbefaler kunder sterkt om å bruke endepunktet til dynamisk egen-konfigurasjon for å sikre kontinuerlig tjeneste-leveranse når Maskinporten bytter signeringssertifikat.

|Miljø|URL|Kommentar|
|-|-|-|
|TEST|[https://test.maskinporten.no/.well-known/oauth-authorization-server](https://test.maskinporten.no/.well-known/oauth-authorization-server)| Ny platform
|VER2 |[https://ver2.maskinporten.no/.well-known/oauth-authorization-server](https://ver2.maskinporten.no/.well-known/oauth-authorization-server)| VER2 er gammel platform, skal fases ut ila 2023
|PROD|[https://maskinporten.no/.well-known/oauth-authorization-server](https://maskinporten.no/.well-known/oauth-authorization-server)|

Du må ta kontakt med den som leverer APIet for å finne ut hvilket test-miljø du skal koble deg mot.

## ID-porten
Merk at ID-porten OIDC provider har sine egne metadata, som er [publisert her]({{site.baseurl}}/docs/idporten/oidc/oidc_func_wellknown)
