---
title: Token-forespørsel 
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_token_request
---

Ved spørring om access token til bruk av Oppslagstjenesten REST: 

For å få et access_token til Oppslagstjenesten REST, må det sendes et JWT-grant til Maskinporten. Vi har en egen side som beskriver JWT grant mot Maskinporten ([JWT grant.]({{site.baseurl}}/docs/Maskinporten/maskinporten_protocol_jwtgrant)).

Well-known endepunkter for [Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_func_wellknown)


Ved spørring om access token til bruk av Oppslag ved brukerinnlogging (brukerstyrt datadeling):

For å få et access_token til Oppslag ved brukerinnlogging, må det foretas en innlogging og videre kan access token kan hentes fra token-endepunktet for ID-porten [https://idporten.no/.well-known/openid-configuration](https://idporten.no/.well-known/openid-configuration).
