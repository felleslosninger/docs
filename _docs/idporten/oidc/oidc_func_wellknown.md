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


|Miljø|URL|
|-|-|
|TEST|[https://test.idporten.no/.well-known/openid-configuration](https://test.idporten.no/.well-known/openid-configuration)|
|PROD|[https://idporten.no/.well-known/openid-configuration](https://idporten.no/.well-known/openid-configuration)|

Disse metadata skal caches i din egen løsning, typisk er 24 timer en passende levetid.

## Gammel OIDC-løsning

{% include note.html content="Den nye ID-porten ble lansert 14. mars 2023. Gammel løsning lever i parallell ut 2023. Se [prosjektsida for mer informasjon om hvordan migrere fra gammel til ny løsning](oidc_protocol_nye_idporten.html)." %}

For de som av ulike grunner fremdeles må koble seg mot gammel løsning, så er metadata tilgjengelig her:

|Miljø|URL|
|-|-|
|VER2|[https://oidc-ver2.difi.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc-ver2.difi.no/idporten-oidc-provider/.well-known/openid-configuration)|
|YT2|[https://oidc-yt2.difi.eon.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc-yt2.difi.eon.no/idporten-oidc-provider/.well-known/openid-configuration)|
|PROD (gammel)|[https://oidc.difi.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc.difi.no/idporten-oidc-provider/.well-known/openid-configuration)|



## Maskinporten

Merk at Maskinporten har sine egne metadata, som er [publisert her]({{site.baseurl}}/docs/Maskinporten/maskinporten_func_wellknown)
