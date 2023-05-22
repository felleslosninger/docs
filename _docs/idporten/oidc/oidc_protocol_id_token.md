---
title: "id_token from ID-porten"
description: "This page documents the id_tokens issued by ID-porten ID-porten OIDC Provider"
summary: 'his page documents the id_tokens issued by ID-porten ID-porten OIDC Provider'

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_id_token
---


## Request

To request an *id_token*, use the [/token endpoint]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_token).


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
| alg | "algorithm" - algorithm used for signing the token. Supported values are published on the .well-known endpoint.  |

**id_token body claims**


| claim | value |
| --- | --- |
| iss | The identifier of ID-porten as can be verified on the [.well-known endpoint]({{site.baseurl}}/docs/idporten/oidc/oidc_func_wellknown)|
| aud | "audience" - The client_id of the client receiving this id_token  |
| sub | "subject identifier" - an unique identifier for the authenticated user.  The value is *pairwise*, meaning a given client will always get the same value, whilst different clients do not get equal values for the same user.  |
| pid | OPTIONAL: "Personidentifikator" - the Norwegian national ID number (fødselsnummer/d-nummer) of the autenticated end user. |
| acr | "Authentication Context Class Reference" - The security level of assurance for the authentication. Possible values documented below.  The level must be validated by the client. |
| amr | "Authentication Method References" - Method of authentication. Possible values can be seen below.  The available values may change over time, so the client should not validate this value. |
| auth_time | Timestamp indicating when the authentication was performed.  |
| iat | Timestamp when this token was issued. If different from `auth_time`, this indicates a federated/sso login. |
| exp | Expire - Timestamp when this token should not be trusted any more.  |
| jti | jwt id - unique identifer for a given token  |
| locale | The language selected by the user during the authentication in ID-porten |
| sid | session id - an unique identifier for end user session at ID-porten.  `sid` will only be included if the client is registered for frontchannel-logout.  |
|at_hash| A hash of the access_token issued together with this id_token. The client may use this value to protect against access_token injections when flows where tokens are delivered from the authorization endpoint. (ID-porten will not include the `at_hash` claim when tokens are delivered from the token endpoint. |



## AMR values

Authentication method can have the following values:

|`amr` value| Description|
|-|-|
|`Minid-PIN` | MinID using PIN-codes from letter|
|`Minid-OTC` | MinID using one-time-code received via SMS|
|`Minid-APP` | MinID using notification in the MinID-app on android/iOS |
|`BankID`    | BankID using code generator or app|
|`BankID Mobil` | BankID on mobile |
|`Buypass`      | Buypass |
|`Commfides` | Commfides using smartcard |
|`eIDAS`  | A European approved eID through the eIDAS network|
|`TestID` |  An eID for testing purposes. NOT USED IN PRODUCTION.  |


## ACR values

The security level of assurance can have the following values:

|`amr` value| Description|
|-|-|
|`idporten-loa-low` | A "low" level of assurance according to Norwegian legal framework ("selvdeklarasjonsforskriften"). |
|`idporten-loa-substantial` | A "substantial" level of assurance according to Norwegian legal framework ("selvdeklarasjonsforskriften"). |
|`idporten-loa-high` | A "high" level of assurance according to Norwegian legal framework ("selvdeklarasjonsforskriften"). |

These values was changed i 2023 to comply with the updated Norwegian legal framework introduced in 2018, see [Veileder for identifikasjon og sporbarhet i elektronisk kommunikasjon med og i offentlig sektor](https://www.digdir.no/digital-samhandling/veileder-identifikasjon-og-sporbarhet-i-elektronisk-kommunikasjon-med-og-i-offentlig-sektor/2992).

The actual values are inspired from [the IANA registry of Level-of-assurance profiles](https://www.iana.org/assignments/loa-profiles/loa-profiles.xhtml), ie. comprised of `<legal framework>-<loa level>`.

If more eIDs and LoAs should be added in the future, ID-porten will strive to use the same level postfix for eIDs we consider having the more-or-less the same level even if the legal frameworks are different. As an example: most public agencies will consider an eIDAS-notified eID on `eidas-loa-high` legally comparable to a Norwegian `idporten-loa-high`, and can thus in their validation logic only validate on the `-high` postfix.
