---
title: Token-forespørsel 
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_token_request
---


### Forspørsel om access-token til bruk mot Oppslagstjenesten REST

For å få et access_token for bruke til autorisasjon mot Oppslagstjenesten REST, må det sendes et JWT grant til Maskinporten. Dersom din virksomhet har fått de riktige tilgangene og oppsettet på både klienten og jwt-grantet er riktig, vil /token-endepunktet i Maskinporten kunne svare på forespørsel med et access-token. 

Vi har en egen side som beskriver JWT grant mot Maskinporten ([JWT grant.]({{site.baseurl}}/docs/Maskinporten/maskinporten_protocol_jwtgrant)).

{% include note.html content="I testmiljøet støtter oppslagstjenesten token fra test.maskinporten.no og ikke ver2.maskinporten.no" %}

Well-known endepunkter for [Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_func_wellknown)

### Forspørsel om access-token til bruk mot Oppslag ved brukerinnlogging (brukerstyrt datadeling):

For å få et access_token til Oppslag ved brukerinnlogging, må det foretas en innlogging og videre kan access token hentes fra /token-endepunktet for ID-porten [https://idporten.no/.well-known/openid-configuration](https://idporten.no/.well-known/openid-configuration).
