---
title: "/token endpoint"
description: "This page summarizes the protocol options available for on the /token endpoint for Maskinporten"
summary: 'This page summarizes the protocol options available for on the /token endpoint for Maskinporten'
permalink: maskinporten_protocol_token.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

## About

The `/token` endpoint is thoroughly documented in [OpenID Connect Core, chapter 3.1.3](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint)

## Request

The client requests a token by passing the JWT-bearer authorization grant to the /token endpoint.

Maskinporten only There are different parameters available for the request, depending on grant type and client authentication method.   The following always apply:

| Header parameters  | Value |
| --- | --- |
| Http method | POST |
| Content-type | application/x-www-form-urlencoded |


The following request body attributes are available when using the JWT-grants:

| Attribute  | Value | Description |
| --- | --- | --- |
| grant_type |  `urn:ietf:params:oauth:grant-type:jwt-bearer` | Type of grant the client is sending, ie. `urn:ietf:params:oauth:grant-type:jwt-bearer`  |
| assertion   | string  | The JWT grant  |

There is no need to perform client authenticion when using this grant, as the client is implicitly authenticated by the certificate in the JWT.

See [JWT grant](maskinporten_protocol_jwtgrant.html) for requirements for the JWT grant.



## Response

The response is a set of tokens and associated metadata, and will depend upon what was requested.

| Claim | Description|
| - |-|
|access_token   | An Oauth2 access token, either by reference or as a JWT depending on which scopes was requested and/or client registration properties. |
|expires_in  | Number of seconds until this access_token is no longer valid   |
| scope   | The list of scopes issued in the access token. Included for convenience only, and should not be trusted for access control decisions.  |

Example:
```
{
  "access_token" : "IxC0B76vlWl3fiQhAwZUmD0hr_PPwC9hSIXRdoUslPU=",
  "token_type" : "Bearer",
  "expires_in" : 599,
  "scope" : "difitest:test1"
}
```


### The access token


Maskinporten issues only self-contained tokens:


|Token type|Description|
|-|-|
|by value | The token is self-contained, meaning it contains all the relevant information about the authorization (end user, scope, timestamp etc.).  Such tokens are non-revokable and should have a short lifetime |



#### "By value" / self-contained access token

The token is a JWT with the following structure:

**Access tokenets header:**

| claim | verdi |
| --- | --- |
| kid | "Key identifier" - unique identifier for the key and certificate used by ID-porten. The public key and the certificate must be fetched from our .well-known endpoint. |
| alg | "algorithm" - algorithm used for signing the token. ID-porten only supports `RS256` (RSA-SHA256) |



**Access token body:**

| claim | value | example |
| --- | --- | --- |
| aud   |  The indended audience for token.  Normally the Oauth2 'issuer' URL of the Resource Server / API. Some Resource Servers require audience-restricted tokens, and the actual values to used must be exchanged out-of-band.  ID-porten will set the string value `unspecified` if no audience-restricted token was requested by the client.   See [Oauth2 Resource Indicators](https://tools.ietf.org/html/draft-ietf-oauth-resource-indicators-05) |  `https://api.examples.com/users`|
| client_id | The client_id of the client who received this token. Note that client_ids should in general not be used for access control. |
| client_amr  | How the client authenticated itselft towards the AS.  | `virksomhetssertifikat`|
| consumer | The organization number, in ISO6523 notation, of the organization who is the legal consumer  of the token/API.  This value is always present.  In most cases, this organization will also be the Data Controller according to the GDPR. | <code>"consumer": {<br/>&nbsp;&nbsp;"Identifier": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"Authority": "iso6523-actorid-upis",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"ID": "9908:910075918"<br/>&nbsp;&nbsp;}<br/>}</code> |
| supplier | The organization number, in ISO6523 notation, of the optional organization which the `consumer` has delegated to act on its behalf regarding the API consumption.  In most cases, this is a Data Processor.|
| delegation_source   |  The Oauth2 *issuer* value of the legal authority where the `consumer` organization performed delegation of a given API access (ie: scope)  to the `supplier` organization | `https://sts.altinn.no`
| scope | A list of scopes the access_token is bound to.  Note that the End User may not grant access to all scopes requested.  |
| token_type | Type of token. Only `Bearer` supported. |
| iss | The identifier of ID-porten as can be verified on the [.well-known endpoint](oidc_func_wellknown.html)| `https://oidc.idporten.no/idporten-oidc-provider`
| exp | Expire - Timestamp when this token should not be trusted any more.  |
| iat | Timestamp when this token was issued.  |
| jti | jwt id - unique identifer for a given token  |

#### client_amr

The following values may be returned for the `client_amr`-claim.  The values are partly from [Oauth Token Endpoint Authentication Methods](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-endpoint-auth-method), plus some custom claims for certificate-based authentication:

| value | description |
|-|-|
| private_key_jwt   | A pre-registeret asymmetric keypair was used. During the registration, a "virksomhetssertifikat" was used to bind the keypair to the organization. |
| virksomhetssertifikat   | A Business Certificate according to soon-to-be-abandoned Norwegian Regulation ("Kravspek PKI") was used to authenticate the client.  |
| QCForESeal | A qualified electronic seal according to the eIDAS regulation (see also https://uri.etsi.org/TrstSvc/TrustedList/schemerules/EUcommon/)|
| CForESeal  | A non-qualified electronic seal according to the eIDAS regulation   |   |


#### Access token validation

**The client and resource server MUST validate all responses from ID-porten according to the OIDC and Oauth2 standards as well as  practice recommendations from the IETF.**

Access tokens must always be validated by the Resource Server / API before granting access. Clients should normally just pass the access token along to the resource server without any processing of it, however if any processing is performed, clients must also perform such validation.

The following references are vital:
* [RFC6819: Oauth2 threat model](https://tools.ietf.org/html/rfc6819)
* [RFC8252: OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252)
* [Draft RFC: OAuth 2.0 for Browser-Based Apps](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-03)
* [Draft RFC: OAuth 2.0 Security Best Current Practice](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13)

Developers integrating towards  Maskinporten are expected to know these documents and apply them in their risk assessments. Our documention will not re-iterate the recommendations in the above documents, but overall we would like to hightlight:

* **Use a certified / well recognized IAM-product or Oauth2 library for the integration**
* **Keep keys / certificates safe to avoid getting your organization  impersonated**
