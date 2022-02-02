---
title: audience-restricted tokens
description: Audience-restricted access tokens
summary: "Some APIs require that the access_tokens are audience-restricted, ie. should have a specific ´aud´ value."

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_func_audience_restricted_tokens
---

When multiple organizations offer identical APIs protected by the same Oauth2 scope value,  they are vulnerable for *token replay* attacks.  

**Example showing token replay**: Both Bank1 and Bank2 offer the same API for customer account information.  If Bank1 receives a valid access_token, it can craft an API request using this token to Bank2, and thus get information related to the customers of their competitors.


Audience-restiction mitigates this attack, by binding the token to a specific audience (`aud`-value). Typically, the URL of the target API (resource server) is used as aud-value, but this can be chosed freely by the API owner.  A pre-requisite for audience-restriction to work, is that the APIs validate that their expected aud-value is present in the token.

Most APIs protected by Maskinporten/ID-porten do not require audience-restriction, please contact the API owner to obtain the aud-value to be used.

Audience-restriction is standardized in [RFC8707: Resource Indicators](https://tools.ietf.org/html/rfc8707)



## request

The client includes the `resource`-claim in the JWT grant in order trigger audience-restriction.

## response

The resulting access token will include the target resource value in the `aud`-claim.


If audience-restriction is not used, then `aud` will currently contain the value `unspecified`. In the future, Maskinporten will not include `aud`-claim when audience restriction is not used.
