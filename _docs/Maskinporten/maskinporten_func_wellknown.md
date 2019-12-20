---
title: well-known
description: Maskinportens well-known endepunkt
summary: "Metadata om Maskinporten er tilgjengelig på vårt .well-known-endepunkt"
permalink: maskinporten_func_wellknown.html
sidebar: maskinporten_sidebar
product: Maskinporten
---


## Well-known endepunkt

Metadata om Maskinporten er tilgjengelig på vårt .well-known-endepunkt ihht. [RFC8414](https://tools.ietf.org/html/rfc8414#section-3.1).  

På endepunktet finner du lenke til vårt JWK-endepunkt, der  Maskinportens signeringssertifikat publiseres.  Vi anbefaler kunder sterkt om å bruke endepunktet til dynamisk egen-konfigurasjon for å sikre kontinuerlig tjeneste-leveranse når Maskinporten bytter signeringssertifikat.

|Miljø|URL|
|-|-|
|VER1|[https://ver1.maskinporten.no/.well-known/oauth-authorization-server](https://ver1.maskinporten.no/.well-known/oauth-authorization-server)|
|VER2|[https://ver2.maskinporten.no/.well-known/oauth-authorization-server](https://ver2.maskinporten.no/.well-known/oauth-authorization-server)|
|YT2|[https://yt2.maskinporten.no/.well-known/oauth-authorization-server](https://yt2.maskinporten.no/.well-known/oauth-authorization-server)|
|PROD|[https://maskinporten.no/.well-known/oauth-authorization-server](https://maskinporten.no/.well-known/oauth-authorization-server)|
