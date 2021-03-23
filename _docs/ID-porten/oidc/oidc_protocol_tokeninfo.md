---
title: "/tokeninfo endpoint"
description: "This page summarizes the protocol options available for on the /tokeninfo introspection endpoint for ID-porten OIDC Provider"
summary: 'This page summarizes the protocol options available for on the /tokeninfo introspection endpoint for ID-porten OIDC Provider'
permalink: oidc_protocol_tokeninfo.html
sidebar: oidc
product: ID-porten
---

## About

The `/tokeninfo` endpoint is thoroughly documented in [RFC 7662 OAuth 2.0 Token Introspection ](https://tools.ietf.org/html/rfc7662)


## Request

The following header parameters must be used:

| Parameter  | Value |
| --- | --- |
|Http method:|POST|
|Content-type:|application/x-www-form-urlencoded|

The client calling /tokeninfo must be pre-registered, and must authenticate itself using the registered method of client authentication (ie `token_endpoint_auth_method`).

The following JSON payload must be submitted:

| Claim  | Value |
| --- | --- |
|token|\<The token that should be validated\>|

## Response

The most important parameter in the reponse is the `active`-claim.  If its value is *false*, the submitted token is not longer valid, and must not be used or trusted by the sending party.


| claim | value | description |
| --- | --- | --- |
| active | true / false | Authorative statement from ID-porten whether the submitted token is valid or not. |

The response will also include a number of claims related to the submitted token, and are equal to the claims available for [self-contained access token](oidc_protocol_token.html#by-value--self-contained-access-token).

Please note that the response from the /tokeninfo-endpoint is NOT an access_token, even though it is a JWT.


**Sample request:**

```
POST /tokeninfo
Content-type: application/x-www-form-urlencoded
Authorization: Basic xxxxx

token=fK0dhs5vQsuAUguLL2wxbXEQSE91XbOAL3foY5VR0Uk=
```

Sample response:

```
{
    "active": true,
    "token_type": "Bearer",
    "expires_in": 556,
    "exp": 1477990301,
    "iat": 1477989701,
    "scope": "global/kontaktinformasjon.read",
    "client_id": "test_rp",
    "client_orgno": "991825827"
}
```

### Introspection of pseudonymous tokens
