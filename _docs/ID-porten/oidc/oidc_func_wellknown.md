---
title: well-known
description: ID-portens well-known endepunkt
summary: "Metadata om ID-porten er tilgjengelig på vårt .well-known-endepunkt"
permalink: oidc_func_wellknown.html
sidebar: oidc
product: ID-porten
---


## Well-known endepunkt

Metadata om ID-porten er tilgjengelig på vårt .well-known-endepunkt ihht. [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig).  

På endepunktet finner du lenke til vårt JWK-endepunkt, der  ID-portens signeringssertifikat publiseres.  Vi anbefaler kunder sterkt om å bruke endepunktet til dynamisk egen-konfigurasjon for å sikre kontinuerlig tjeneste-leveranse når ID-porten bytter signeringssertifikat.



{% include_relative oidc_include_metadata.md %}




|Miljø|URL|
|-|-|
|VER1|[https://oidc-ver1.difi.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc-ver1.difi.no/idporten-oidc-provider/.well-known/openid-configuration)|
|VER2|[https://oidc-ver2.difi.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc-ver2.difi.no/idporten-oidc-provider/.well-known/openid-configuration)|
|YT2|[https://oidc-yt2.difi.eon.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc-yt2.difi.eon.no/idporten-oidc-provider/.well-known/openid-configuration)|
|PROD|[https://oidc.difi.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc.difi.no/idporten-oidc-provider/.well-known/openid-configuration)|

## Maskinporten

Merk at Maskinporten har sine egne metadata, som er [publisert her](maskinporten_func_wellknown.html)
