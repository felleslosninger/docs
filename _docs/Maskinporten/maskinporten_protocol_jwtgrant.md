---
title: "JWT grant"
description: "A grant is sent by the client to Maskinporten in order to get an access token"

sidebar: maskinporten_sidebar
product: maskinporten_sidebar
redirect_from: /maskinporten_protocol_jwtgrant
---

## About

The JWT grant is a request sent by the client towards Maskinporten, in order to obtain an access_token.  

JWT grants are documented in [RFC7523](https://tools.ietf.org/html/rfc7523). Both the grant request and the returned access_token are JWT structures looking almost identical, so take care not to mixed them up.


## Grant structure

Adding claims not present in the following documentation will result in a response of `400 Bad request` with error description containing `Invalid assertion`.

**Header:**

| Claim  | Cardinality | Description  |
| --- | --- | --- |
| alg | required | `RS256`, `RS384` and `RS512` are supported by Maskinporten. |   
| x5c | optional* | The business certificate/eseal (virksomhetssertifikat) of the organization. Full certificate chain, see [RFC7517 chapter 4.7](https://tools.ietf.org/html/rfc7517#section-4.7). |
| kid |  optional* | Key identifier to a previously registered certificate / asymmetric key   bound to the client.     |


*Either 'kid' or 'x5c' must be present. 'kid' can and must be used by clients having a pre-registered certificate / asymmetric key.

Note that production certificates are not supported in test environments.

&nbsp;

**Body:**

| Claim  |  Cardinality | Description  |
| --- | --- |--- |
|aud| Required | The intended target for this JWT grant, ie. the identifier for Maskinporten.   The value in production is `https://maskinporten.no/`  |
|iss| Required |issuer - Your client ID |
|iat| Required| issued at - Timestamp when generating this jwt.  **NOTE:** UTC-time. To allow for clock skew and network delays, Maskinporten will only accept grants where iat is less than 10 seconds ahead/after our clock.  |
|exp| Required| expiration time - Timestamp for the expiry of this jwt,  in UTC-time. **NOTE:** Maximum 120 seconds allowed. (exp - iat <= 120 )|
|jti|Recommended | JWT ID - unique id for this jwt. **NOTE:** A JWT cannot be reused. |
|scope| Required| Whitepace-separated liste over scopes requested.  When using JWT grants, the client must have pre-registered with rights to all the scopes (unless using delegation in Altinn, see below.) |
| resource   | optional  | The target API that the client intends to use the token. Only used by some APIs, and the actual value to use must be obtained from the API owner. Please see [audience-restriction]({{site.baseurl}}/docs/Maskinporten/maskinporten_func_audience_restricted_tokens) for details. *Currently only array supported.*  |   

If the client (or the intended API) wants to utilize [enduser-restriced tokens]({{site.baseurl}}/docs/Maskinporten/maskinporten_func_pid_restricted_tokens.html), the following claim may be included in the body:

| Claim  |  Cardinality | Description  |
| --- | --- |--- |
| pid | optional | The target end-user "fødselsnummer" that the access token should be bound to. This claim might be required by some APIs. |

If the client belongs to a supplier requesting a token on behalf of another organization (legal consumer), the client should use [scope delegation](maskinporten_func_delegering) by including this claim: 

| Claim  |  Cardinality | Description  |
| --- | --- |--- |
|consumer_org| Optional |  String value carrying the Norwegian organization number of the legal consumer the client wants to get a token for. Maskinporten will validate against Altinn that the consumer-supplier delegation exists.  |

(note: previously, a simpler `iss_onbehalfof` internal delegation mechanism could be used. This is now deprecated, and will be removed in future.)

Maskinporten also supports a couple of fine-grained authorization extensions.  These are: 

| RAR-type |  Cardinality | Description  |
| --- | --- |--- |
| `urn:altinn:systemuser` | Optional | [System user token](maskinporten_func_systembruker) |
| `urn:altinn:consent`    | Optional | [Consent token](maskinporten_func_samtykke) |



#### Example JWT grant

The final JWT may look like this:

```
{
  "x5c": [ "MIIFETCCA/mgAwIB``````EefETzAxjqBHM=" ],
  "alg": "RS256"
}
.
{
  "aud": "https://test.maskinporten.no/",
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
  "aud" : "https://test.maskinporten.no/",
  "scope" : "difitest:test2",
  "iss" : "my_client_id",
  "exp" : 1584693557,
  "iat" : 1584693437,
  "jti" : "eb6ab01e-5834-4ba0-a2a1-457bfd0f0a49",
  "consumer_org" : "910753614"
}
```
