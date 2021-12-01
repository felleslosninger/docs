---
title: "id_token from ID-porten"
description: "This page documents the id_tokens issued by ID-porten ID-porten OIDC Provider"
summary: 'his page documents the id_tokens issued by ID-porten ID-porten OIDC Provider'
permalink: oidc_protocol_id_token.html
sidebar: oidc
product: ID-porten
---


## Request

To request an *id_token*, use the [/token endpoint](oidc_protocol_token.html).


## The id_token

The id_token is the assertion of the authenticated user identity.  It tells you "who the user is", but not "what the user can access".  The id_token is meant to be consumed and validated by the client, to build a local session at the client.  It is not intended to be passed around to enable API access towards other parties/systems.

The id_token is a JWT structure, as documented in [OIDC Core, 3.1.6](https://openid.net/specs/openid-connect-core-1_0.html#CodeIDToken).  The client MUST validate the id_token according to [OIDC Core, 3.1.7](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation).  

In addition, the client MUST validate that the security level (`acr`) is sufficiently high for the given service.

Example:
```
{
  "kid" : "mqT5A3LOSIHbpKrscb3EHGrr-WIFRfLdaqZ_5J9GR9s",
  "alg" : "RS256"
}
```

```
{
  "sub" : "-v-lcae5rGG-jlvzuv9Y9H7R8NmAeM2-kh0qWb-vPIE=",
  "aud" : "test_rp_yt2",
  "acr" : "Level4",
  "auth_time" : 1497605218,
  "amr" : "BankID",
  "iss" : "https://oidc-yt2.difi.eon.no/idporten-oidc-provider/",
  "pid" : "23079410918",
  "exp" : 1497605382,
  "locale" : "nb",
  "iat" : 1497605262,
  "nonce" : "min_fine_nonce_verdi",
  "jti" : "Hgb3zwO9g0bjmSbCCtQCxMowsZEu00lCJ2Exg4Zhv3g="
}
```

```
OuFJaVWQvLY9... <signaturverdi> ...isvpDMfHM3mkI
```


**id_token header claims**

| claim | verdi |
| --- | --- |
| kid | "Key identifier" - unique identifier for the key and certificate used by ID-porten. The public key and the certificate must be fetched from our .well-known endpoint. |
| alg | "algorithm" - algorithm used for signing the token. ID-porten only supports `RS256` (RSA-SHA256) |

**id_token body claims**


| claim | value |
| --- | --- |
| sub | "subject identifier" - an unique identifier for the authenticated user.  The value is *pairwise*, meaning a given client will always get the same value, whilst different clients do not get equal values for the same user.  |
| aud | "audience" - The client_id of the client receiving this id_token  |
| acr | "Authentication Context Class Reference" - The security level of assurance for the authentication. Possible values are `Level3` (i.e.  MinID was used) or `Level4` (other eIDs). The level must be validated by the client. |
| auth_time | Timestamp indicating when the authentication was performed.  |
| amr | "Authentication Method References" - Method of authentication. Possible values can be seen below.  The available values may change over time, so the client should not validate this value. |
| iss | The identifier of ID-porten as can be verified on the [.well-known endpoint](oidc_func_wellknown.html)|
| pid | "Personidentifikator" - the Norwegian national ID number (fødselsnummer/d-nummer) of the autenticated end user.   This claim is not included if `no_pid` scope was requested or pre-registered on the client. |
| exp | Expire - Timestamp when this token should not be trusted any more.  |
| iat | Timestamp when this token was issued.  |
| jti | jwt id - unique identifer for a given token  |
| locale | The language selected by the user during the authentication in ID-porten |
| sid | session id - an unique identifier for end user session at ID-porten. May be needed when performing logout |
|at_hash| A hash of the access_token issued together with this id_token. The client may use this value to protect against access_token injections when using by-reference access tokens. |



## AMR values

Authentication method can have the following values:

|`amr` value| Description|
|-|-|
|`Minid-PIN` | MinID with PIN-codes from letter|
|`Minid-OTC` | MinID with one-time-code received via SMS|
|`BankID`    | BankID using code generator or app|
|`BankID Mobil` | BankID on mobile |
|`Buypass`      | Buypass |
|`Commfides` | Commfides using smartcard |
|`eIDAS`  | A European approved eID through the eIDAS network|
|`TestId` |  An eID for testing purposes. NOT USED IN PRODUCTION.  |
