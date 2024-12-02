---
title: well-known
description: Ansattporten sitt well-known endepunkt

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_wellknown
---


## Well-known endepunkt

Metadata om Ansattporten er tilgjengelig på vårt .well-known-endepunkt ihht. [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig).  

På endepunktet finner du lenke til vårt JWK-endepunkt, der Ansattporten sitt  signeringssertifikat publiseres.  Vi anbefaler kunder sterkt om å bruke endepunktet til dynamisk egen-konfigurasjon for å sikre kontinuerlig tjeneste-leveranse når Ansattporten bytter signeringssertifikat.


|Miljø| IssuerMetadata |
|-|-|-|
|TEST|`https://test.ansattporten.no`| [https://test.ansattporten.no/.well-known/openid-configuration](https://test.ansattporten.no/.well-known/openid-configuration)| 
|PROD|`https://ansattporten.no`|[https://ansattporten.no/.well-known/openid-configuration](https://ansattporten.no/.well-known/openid-configuration) | 


Disse metadata skal caches i din egen løsning, typisk er 24 timer en passende levetid.

Merk spesielt at endepunktene tiltenkt for brukers browser har annet sub-domene enn endepunkt for bak-kanal-kall. 


Du finner [IP-adresse til disse miljøene her]({{site.baseurl}}/docs/general/IP)




## Andre porter

Merk at både ID-porten og Maskinporten har sine egne metadata og egne signeringssertifikat.
