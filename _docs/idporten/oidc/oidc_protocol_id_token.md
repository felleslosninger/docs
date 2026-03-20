---
title: "id_token from ID-porten"
description: "This page documents the id_tokens issued by ID-porten ID-porten OIDC Provider"
summary: 'his page documents the id_tokens issued by ID-porten ID-porten OIDC Provider'

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_id_token
---


## The id_token

The id_token is the assertion of the authenticated user identity.  It tells you "who the user is", but not "what the user can access".  

The id_token is meant to be consumed and validated by the client in order to build a local session at the client.  It is not intended to be passed around to enable API access towards other parties/systems.

id_tokens are retrieved from the eid supplier using the `openid` scope. However, if the client also requests the `profile` scope, additional claims may be added to the id_token. This is currently supported by Buypass and Bankid.

Please see [Auth0's guide to id and access tokens](https://auth0.com/blog/id-token-access-token-what-is-the-difference/) to learn more of the difference between these tokens.

## Structure of an id_token

To request an *id_token*, use the [/token endpoint]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_token).


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
  "sub" : "qD-kwgr3FcGA9zy4M7O_4Dco95Uobipd0RJeHSWypG5BL0VrsSND4Pppa2ZInbDyTGfo0AncdvAbU74gfdQmVe7Uz_D0el0",
  "amr" : [ "TestID" ],
  "iss" : "https://test.idporten.no",
  "pid" : "47906701517",
  "locale" : "nb",
  "nonce" : "<min_fine_nonce_verdi>",
  "sid" : "dskgZMtxu8DRSyIBTljf9XgqVggBS865o6Rmf74rskQ",
  "aud" : "democlient_idporten_test",
  "acr" : "idporten-loa-substantial",
  "auth_time" : 1746173220,
  "exp" : 1746173341,
  "iat" : 1746173221,
  "jti" : "K8kMQM_1zc0"
}
```

If the client has requested the `profile` scope, additional claims may be added:
```
{
  "given_name" : "Ola",
  "family_name" : "Nordmann"
}

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
| pid |  "Personidentifikator" - the Norwegian national ID number (fødselsnummer/d-nummer) of the autenticated end user. Note that some eID providers (ie: foreign users) in ID-porten may not supply a pid. |
| acr | "Authentication Context Class Reference" - The security level of assurance for the authentication. Possible values documented below.  The level MUST be validated by the client. |
| amr | "Authentication Method References" - Method of authentication. Possible values can be seen below.  The available values may change over time, so the client should not validate this value. |
| auth_time | Timestamp indicating when the authentication was performed.  |
| iat | Timestamp when this token was issued. If different from `auth_time`, this indicates a federated/sso login. |
| exp | Expire - Timestamp when this token should not be trusted any more.  |
| jti | jwt id - unique identifer for a given token  |
| locale | The language selected by the user during the authentication in ID-porten. ISO 639-1 values are: nb (Norwegian Bokmål), nn (Norwegian Nynorsk), en (English), se (Northern Sami). Only included if the *profile* scope was requested.|
| sid | session id - an unique identifier for end user session at ID-porten. Clients should store the value to be able to handle frontchannel logout notifications. Note that `sid` will only be included if the client is [registered](oidc_func_clientreg.html) with `frontchannel_logout_session_required`.  |

Additional claims that may be added if the eid supplier provides them and the client has requested the `profile` scope:
| claim | value |
| --- | --- |
| given_name | The given name of the authenticated user |
| family_name | The family name of the authenticated user |


## AMR values

Authentication method can have the following values:

| `amr` value            | Description|
|------------------------|-|
| `Minid-PIN`            | MinID using PIN-codes from letter (deprecated)|
| `Minid-OTC`            | MinID using one-time-code received via SMS|
| `Minid-APP`            | MinID using notification in the MinID-app on android/iOS |
| `Minid-TOTP`           | MinID using timebased one-time passwords |
| `Minid-WEBAUTHN`       | MinID using security keys |
| `BankID`               | BankID using code generator or app|
| `BankID Mobil`         | BankID on mobile |
| `Buypass`              | Buypass |
| `Commfides`            | Commfides using smartcard |
| `eIDAS`                | A European approved eID through the eIDAS network|
| `Selfregistered-email` | A European approved eID through the eIDAS network|
| `TestID`               |  An eID for testing purposes. NOT USED IN PRODUCTION.  |


## ACR values

The security level of assurance can have the following values:

| `acr` value               | Description                                                                                                                                                                                                                                                       |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `idporten-loa-substantial` | A []"substantial" level of assurance according to Norwegian legal framework](https://lovdata.no/forskrift/2019-11-21-1578/§20)). Multi-factor login with an ID that has been issued according to the 'substantial' demands. For example MinID App or MinID with one-time-code from SMS. |
| `idporten-loa-high`       | A ["high" level of assurance according to Norwegian legal framework](https://lovdata.no/forskrift/2019-11-21-1578/§19) (["selvdeklarasjonsforskriften"). Multi-factor login with an ID that has beed issued according to the 'high' demands. For example BankID, Buypass or Commfides.                                 |
| `eidas-loa-substantial`   | A "substantial" level of assurance according to the European eIDAS regulation. Multi-factor login with an eID that has been notified in the eIDAS network. |                                                              |
| `eidas-loa-high`   | A "high" level of assurance according to the European eIDAS regulation. Multi-factor login with an eID that has been notified in the eIDAS  network. |                                                              |
| `selfregistered-email`    | A self-registered email-user with no standardized level of assurance.                                                                                                                                                                                             |

These values was changed i 2023 to comply with the updated Norwegian legal framework introduced in 2018, see [Veileder for identifikasjon og sporbarhet i elektronisk kommunikasjon med og i offentlig sektor](https://www.digdir.no/digital-samhandling/veileder-identifikasjon-og-sporbarhet-i-elektronisk-kommunikasjon-med-og-i-offentlig-sektor/2992).

The actual values are inspired from [the IANA registry of Level-of-assurance profiles](https://www.iana.org/assignments/loa-profiles/loa-profiles.xhtml), ie. comprised of `<legal framework>-<loa level>`.

If more eIDs and LoAs should be added in the future, ID-porten will strive to use the same level postfix for eIDs we consider having the more-or-less the same level even if the legal frameworks are different. As an example: most public agencies will consider an eIDAS-notified eID on `eidas-loa-high` legally comparable to a Norwegian `idporten-loa-high`, and can thus in their validation logic only validate on the `-high` postfix.
