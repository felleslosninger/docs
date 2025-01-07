---
title: well-known
description: ID-portens well-known endepunkt
summary: "Metadata om ID-porten er tilgjengelig på vårt .well-known-endepunkt"

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_wellknown
---


## Well-known endepunkt

Metadata om ID-porten er tilgjengelig på vårt .well-known-endepunkt ihht. [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig).  

På endepunktet finner du lenke til vårt JWK-endepunkt, der  ID-portens signeringssertifikat publiseres.  Vi anbefaler kunder sterkt om å bruke endepunktet til dynamisk egen-konfigurasjon for å sikre kontinuerlig tjeneste-leveranse når ID-porten bytter signeringssertifikat.


|Miljø|Issuer|URL|
|-|-|-|
|TEST| `https://test.idporten.no` | [https://test.idporten.no/.well-known/openid-configuration](https://test.idporten.no/.well-known/openid-configuration)|
|PROD| `https://idporten.no` | [https://idporten.no/.well-known/openid-configuration](https://idporten.no/.well-known/openid-configuration)|

Disse metadata skal caches i din egen løsning, typisk er 24 timer en passende levetid.

Du finner [IP-adresse til disse miljøene her]({{site.baseurl}}/docs/general/IP)




## Maskinporten

Merk at Maskinporten har sine egne metadata, som er [publisert her]({{site.baseurl}}/docs/Maskinporten/maskinporten_func_wellknown)
