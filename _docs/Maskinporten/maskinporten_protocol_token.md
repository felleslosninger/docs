---
title: "/token endpoint"
description: "This page summarizes the protocol options available for on the /token endpoint for Maskinporten"
summary: 'This page summarizes the protocol options available for on the /token endpoint for Maskinporten'
permalink: maskinporten_protocol_token.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

## About

Using JWT grants towards the `/token` endpoint is documented in [RFC 7523, section 2.1 ](https://tools.ietf.org/html/rfc7523#section-2.1).

## Request

The client requests a token by passing the JWT-bearer authorization grant to the /token endpoint.


| Header parameters  | Value |
| --- | --- |
| Http method | POST |
| Content-type | application/x-www-form-urlencoded |


The following request body attributes shall be used when passing the JWT-grant:

| Attribute  | Value | Description |
| --- | --- | --- |
| grant_type |  `urn:ietf:params:oauth:grant-type:jwt-bearer` | Type of grant the client is sending, ie. `urn:ietf:params:oauth:grant-type:jwt-bearer`  |
| assertion   | string  | The JWT grant  |

There is no need to perform client authenticion when using this grant, as the client is implicitly authenticated by the certificate in the JWT.

See [JWT grant](maskinporten_protocol_jwtgrant.html) for requirements for constructing the JWT grant.



## Response

The response is a set of tokens and associated metadata, and will depend upon what was requested.

| Claim | Description|
| - |-|
|access_token   | An Oauth2 access token, either by reference or as a JWT depending on which scopes was requested and/or client registration properties. |
|expires_in  | Number of seconds until this access_token is no longer valid   |
| scope   | The list of scopes issued in the access token. Included for convenience for the client, and should not be trusted for access control decisions.  |

Please note that the access token is opaque for the client, and the format may be changed. Thus the client should not inspect/validate the token contents.

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



The token is a JWT with the following structure:

**Access token header:**

| claim | verdi |
| --- | --- |
| kid | "Key identifier" - unique identifier for the key and certificate used by Maskinporten. The public key and the certificate must be fetched from our .well-known endpoint. |
| alg | "algorithm" - algorithm used for signing the token. Maskinporten only supports `RS256` (RSA-SHA256) |



**Access token body:**

| claim | value | example |
| --- | --- | --- |
| iss | The identifier of Maskinporten as can be verified on the [.well-known endpoint](maskinporten_func_wellknown.html)| `https://maskinporten.no/`
| client_id | The client_id of the client who received this token. Note that client_ids should in general not be used for access control. |
| client_amr  | How the client authenticated itselft towards Maskinporten  | `virksomhetssertifikat`|
| consumer | The organization number, in ISO6523 notation, of the organization who is the legal consumer  of the token/API.  This value is always present.  In most cases, this organization will also be the Data Controller according to the GDPR. | see below |
| scope | A list of scopes the access_token is bound to.   |
| token_type | Type of token. Only bearer supported. | `Bearer`|
| exp | Expire - Timestamp when this token should not be trusted any more.  |
| iat | Timestamp when this token was issued.  |
| jti | jwt id - unique identifer for a given token  |

If the token was issued to a supplier acting on behalf of another organization, the token will also include the following two claims:

| claim | value | example |
| --- | --- | --- |
| supplier | The organization number, in ISO6523 notation, of the optional organization which the `consumer` has delegated to act on its behalf regarding the API consumption.  In most cases, this is a Data Processor.| see below |
| delegation_source   |  The Oauth2 *issuer* value of the legal authority where the `consumer` organization performed delegation of a given API access (ie: scope)  to the `supplier` organization | `https://www.altinn.no`


If the token is audience-restricted, the following claim will also be included:

| claim | value | example |
| --- | --- | --- |
| aud   |  The target API for this token. Some Resource Servers require audience-restricted tokens, and the actual values to used must be exchanged out-of-band. See [audience-restriction](maskinporten_func_audience_restricted_tokens.html) for details. |  `https://api.examples.com/users`|


###  Identifying organizations

ID-porten and Maskinporten use a forward-compatible notation for identifying organizations. This is because we expect that the solutions in the future will be extended handle both foreign organizations, organizations not having a registration in the Enhetsregisteret (i.e. "offentlige utvalg") as well a sub-entities within an organization.


The `ID`-claim identifies the organization, which the `authority`-claim states how this identifier is encoded:

| `authority` |description|
|-|-|
|iso6523-actorid-upis| The organization ID is an [ISO6523-formatted string](https://en.wikipedia.org/wiki/ISO/IEC_6523), where the first element can have values from [PEPPOLs extensions to the official ICD list from ISO](https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/).  The ID can have 2-4 elements, separated by colon.   As of Jan 2021,  only 0192 is supported as ICD value (Norwegian organizations being registered in Enhetsregisteret) |

Customer implementations must thus be able to handle that the authority list and consequently the ID formatting may be extended in the future.


Below is an example for Digitaliseringsdirektoratet:
```
"consumer" : {
   "authority" : "iso6523-actorid-upis",
   "ID" : "0192:991825827"
 }
```

#### client_amr

The following values may be returned for the `client_amr`-claim.  The values are partly from [Oauth Token Endpoint Authentication Methods](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-endpoint-auth-method), plus some custom claims for certificate-based authentication:

| value | description |
|-|-|
| private_key_jwt   | A pre-registeret asymmetric keypair was used. During the registration, a "virksomhetssertifikat" was used to bind the keypair to the organization. |
| virksomhetssertifikat   | A Business Certificate according to soon-to-be-abandoned Norwegian Regulation ("Kravspek PKI") was used to authenticate the client.  |
| QCForESeal | A qualified electronic seal according to the eIDAS regulation (see also https://uri.etsi.org/TrstSvc/TrustedList/schemerules/EUcommon/)|
| CForESeal  | A non-qualified electronic seal according to the eIDAS regulation   |   |


#### Access token validation

**The client and resource server MUST validate all responses from Maskinporten according to the Oauth2 standards as well as best practice recommendations from the IETF.**

Access tokens must always be validated by the Resource Server / API before granting access. Clients should normally just pass the access token along to the resource server without any processing of it, however if any processing is performed, clients must also perform such validation.

The following references are vital:
* [RFC6819: Oauth2 threat model](https://tools.ietf.org/html/rfc6819)
* [RFC8252: OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252)
* [Draft RFC: OAuth 2.0 for Browser-Based Apps](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-03)
* [Draft RFC: OAuth 2.0 Security Best Current Practice](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13)

Developers integrating towards  Maskinporten are expected to know these documents and apply them in their risk assessments. Our documention will not re-iterate the recommendations in the above documents, but overall we would like to hightlight:

* **Use a certified / well recognized IAM-product or Oauth2 library for the integration**
* **Keep keys / certificates safe to avoid getting your organization  impersonated**
