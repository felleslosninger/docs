---
title: "/userinfo endpoint"
description: "This page summarizes the protocol options availalbe for on the /usering endpoint for ID-porten OIDC Provider"
summary: 'This page summarizes the protocol options availalbe for on the /userinfo endpoint for ID-porten OIDC Provider'

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_userinfo
---

## About

The `/userinfo` endpoint is thoroughly documented in [OIDC Core specification, chapter 5.3](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)

Note that ID-porten does not contain any useful additional information about the user beyond the `pid` (national id number) which is already included in the id_token.

## Request

All clients can request the *profile* scope and will get an access_token that can be used to gain additional user information.

```
URL: https://<<miljø>>/idporten-oidc-provider/userinfo
```

The following header parameters apply:

| Parameter  | Calue |
| --- | --- |
| Http method: | GET |
| Authorization: | Bearer \< access_token \> |

## Response

The response is a JSON structure with claims:

|Claim|Description
|-|-|
|sub   | "subject identifier" - an unique identifier for the authenticated user.  The value is *pairwise*, meaning a given client will always get the same value, whilst different clients do not get equal values for the same user.   |
|pid   |Norwegian national id number - always present unless the 'no_pid' scope was request / pre-registered on the client  |
|locale| The language used during authentication|

```
{
  "sub" : "NR8vTTPrM3T7rWf8dXxeWLZpxEMsug4E7pxqJuh9wIM=",
  "pid" : "23079421936",
  "locale" : "nb"
}
```
