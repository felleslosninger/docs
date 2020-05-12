---
title: "JWT grant "
description: "This page summarizes the protocol options availalbe for on JWT grants on the /token endpoint for Maskinporten"
summary: "This page summarizes the protocol options availalbe for on JWT grants on the /token endpoint for Maskinporten"
permalink: maskinporten_protocol_jwtgrant.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

## About

The JWT grant is a request sent by the client towards Maskinporten, in order to obtain an access_token.  Both the grant and the access_token looks similar and share some of the same claims, as they as JWT structures, however they must not be mixed up.

JWT grants are documented in [RFC7523](https://tools.ietf.org/html/rfc7523).

## Request



**Header:**

| Claim  | Cardinality | Description  |
| --- | --- | --- |
| alg | required | Must be `RS256` - Only RSA-SHA256 is supported by Maskinporten. |   
| x5c | optional | The business certificate/eseal (virksomhetssertifikat) of the organization. Full certificate chain, see [RFC7517 chapter 4.7](https://tools.ietf.org/html/rfc7517#section-4.7). |
| kid |  optional | Key identifier to a previously registered certificate / asymmetric key   bound to the client.     |


Either 'kid' or 'x5c' must be present. 'kid' can and must be used by clients having a pre-registered asymmetric key.

Note that production certificates are not supported in test environments.

&nbsp;

**Body:**

| Claim  |  Cardinality | Description  |
| --- | --- |--- |
|aud| Required | The intended target for this JWT grant, ie. the identifier for Maskinporten.   The value in production is `https://maskinporten.no/`  |
|iss| Required |issuer - Your client ID |
|iat| Required| issued at - Timestamp when generating this jwt.  **NOTE:** UTC-time|
|exp| Required| expiration time - Timestamp for the expiry of this jwt,  in UTC-time. **NOTE:** Maximum 120 seconds allowed. (exp - iat <= 120 )|
|jti|Recommended | JWT ID - unique id for this jwt. **NOTE:** A JWT cannot be reused. |
|scope| Required| Whitepace-separated liste over scopes requested.  When using JWT grants, the client must have pre-registered with rights to all the scopes (unless using delegation in Altinn, see below.) |
| resource   | optional  | The target API that the client intends to use the token. Only used by some APIs, and the actual value to use must be obtained from the API owner. Please see [audience-restriction](maskinporten_func_audience_restricted_tokens.html) for details. *Currently only array supported.*  |   


If the client belongs to a supplier requesting a token on behalf of another organization (legal consumer), there are two mutually exclusive claims available:

| Claim  |  Cardinality | Description  |
| --- | --- |--- |
|consumer_org| Optional |  The organization number of the legal consumer the client wants to get a token for. Maskinporten will validate against Altinn that the consumer-supplier delegation exists.  Note that client can not be provisioned with the scope. |
|iss_onbehalfof| Optional | Maskinporten proprietary claim.  The onbehalfof-value for the sub-client the client is acting onbehalf of.   (See  [onbehalfof](oidc_func_onbehalfof.html))|



### Example

The final JWT may look like this:

```
{
  "x5c": [ "MIIFETCCA/mgAwIB``````EefETzAxjqBHM=" ],
  "alg": "RS256"
}
.
{
  "aud": "https://ver2.maskinporten.no",
  "scope": "global/kontaktinformasjon.read global/varslingsstatus.read global/navn.read global/postadresse.read global/sertifikat.read",
  "iss": "test_rp",
  "exp": 1520589928,
  "iat": 1520589808,
  "jti": "415ec7ac-33eb-4ce3-bc86-6ad40e29768f"
}
.
<<signature-value>>
```
