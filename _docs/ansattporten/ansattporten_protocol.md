---
title: Ansattporten protokoll
description: Ansattporten er protokoll-lik med ID-porten
summary: "Metadata om Ansattporten er tilgjengelig på vårt .well-known-endepunkt"

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_protocol
---

Ansattporten sin protokoll-støtte er nær identisk med ID-porten sin, og vi henviser til [denne](../../docs/idporten/oidc/oidc_protocol_authorize.html).


Merk spesielt følgende:

* Ansattporten støtter RAR.  Dette er dokumentert [her](ansattporten_rar.html)
* Ansattporten har egne endepunkt.  Se [metadata](ansattporten_wellknown.html)

Ansattporten bruker dessverre av historiske årsake andre `acr`-verdier enn ID-porten.  