---
title: "JWT grant "
description: "This page summarizes the protocol options availalbe for on JWT grants on the /token endpoint for Maskinporten"
summary: "This page summarizes the protocol options availalbe for on JWT grants on the /token endpoint for Maskinporten"

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_protocol_jwtgrant
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
| resource   | optional  | The target API that the client intends to use the token. Only used by some APIs, and the actual value to use must be obtained from the API owner. Please see [audience-restriction]({{site.baseurl}}/docs/Maskinporten/maskinporten_func_audience_restricted_tokens) for details. *Currently only array supported.*  |   


If the client belongs to a supplier requesting a token on behalf of another organization (legal consumer), there are two mutually exclusive claims available:

| Claim  |  Cardinality | Description  |
| --- | --- |--- |
|consumer_org| Optional |  String value carrying the Norwegian organization number of the legal consumer the client wants to get a token for. Maskinporten will validate against Altinn that the consumer-supplier delegation exists.  |
|iss_onbehalfof| Optional | Maskinporten proprietary claim.  The onbehalfof-value for the sub-client the client is acting onbehalf of.   (See  [onbehalfof]({{site.baseurl}}/docs/idporten/oidc/oidc_func_onbehalfof))|



#### Example JWT grant

The final JWT may look like this:

```
{
  "x5c": [ "MIIFETCCA/mgAwIB``````EefETzAxjqBHM=" ],
  "alg": "RS256"
}
.
{
  "aud": "https://ver2.maskinporten.no",
  "scope": "difitest:test2",
  "iss": "my_client_id",
  "exp": 1520589928,
  "iat": 1520589808,
  "jti": "415ec7ac-33eb-4ce3-bc86-6ad40e29768f"
}
.
<<signature-value>>
```

#### Example JWT grant when using delegation

If the client rely on delegation of scope access in Altinn, the client needs to include the `consumer_org`-claim in the grant:

```
{
  "aud" : "https://ver2.maskinporten.no/",
  "scope" : "difitest:test2",
  "iss" : "my_client_id",
  "exp" : 1584693557,
  "iat" : 1584693437,
  "jti" : "eb6ab01e-5834-4ba0-a2a1-457bfd0f0a49",
  "consumer_org" : "910753614"
}
```
