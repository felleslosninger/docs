---
title: End-user-restricted tokens
description: End-user-restricted access tokens

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_func_pid_restricted_tokens
---

If tokens issued to a legimate client are stolen by an attacker,  the attacker can impersonate said client and this is hard to detect by the API.  A particular risk is if the attacker can use the stolen token "scrape" data for all users (ex. looping over all personidentifiers) undetected.  

Countermeasures for such attacks could be for the APIs to employ progressivce rate-limitations or restricting the maximum number of calls for a specific token.

Another countermeasure that APIs securing sensitive data should consider, is requiring **pid-restricted** tokens.  A pid-restricted token is a token that simply contains a `pid` claim, and the API must the validate that the pid in the token is equal to the pid referenced by the API call.  This forces the client to fetch a new Maskinporten token for each user the client wants to do API calls for.

**Note that a pid-restricted Maskinporten token looks very similar to a OIDC token from ID-porten, but the end user has NOT logged in.**




## token request

The client includes the `pid`-claim in the JWT grant in order trigger pid-restriction.

## token response

The resulting access token will include the user person identifier in the `pid`-claim.

## API / resource server tasks

* The API must reject tokens not containing `pid`.
* The API must reject tokens having a different `pid` than the subject of the API call.
