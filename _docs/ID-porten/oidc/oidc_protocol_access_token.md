---
title: "access token from ID-porten"
description: "This page documents the access_tokens issued by ID-porten ID-porten OIDC Provider"
summary: 'his page documents the access_tokens issued by ID-porten ID-porten OIDC Provider'
permalink: oidc_protocol_access_token.html
sidebar: oidc
product: ID-porten
---

## Request

To request an *access_token*, use the [/token endpoint](oidc_protocol_token.html).



## The access token


ID-porten issues two different types of access_tokens:


|Token type|Description|
|-|-|
|by reference| The token is just a string referencing the authorization inside ID-porten.  Such tokens must be validated towards the [/tokeninfo endpoint](oidc_protocol_tokeninfo.html).  By-reference tokens are good for privacy, as no personal data can be harvested by the client or in transit. |
|by value | The token is self-contained, meaning it contains all the relevant information about the authorization (end user, scope, timestamp etc.).  Such tokens are non-revokable and should have a short lifetime |


#### "By value" / self-contained access token

The token is a JWT with the following structure:

**Access tokenets header:**

| claim | verdi |
| --- | --- |
| kid | "Key identifier" - unique identifier for the key and certificate used by ID-porten. The corresponding public key and the certificate must be fetched from our .well-known endpoint. |
| alg | "algorithm" - algorithm used for signing the token. ID-porten only supports `RS256` (RSA-SHA256) |



**Access token body:**

| claim | value | example |
| --- | --- | --- |
| sub | "subject identifier" - an unique identifier for the authenticated user.  The value is *pairwise*, meaning a given client will always get the same value, whilst different clients do not get equal values for the same user.  |
| aud   |  The indended audience for token.  Normally the Oauth2 'issuer' URL of the Resource Server / API. Some Resource Servers require audience-restricted tokens, and the actual values to used must be exchanged out-of-band.  ID-porten will set the string value `unspecified` if no audience-restricted token was requested by the client.   See [Oauth2 Resource Indicators](https://tools.ietf.org/html/draft-ietf-oauth-resource-indicators-05) |  `https://api.examples.com/users`|
| acr | sikkerhetsnivå |
| client_id | The client_id of the client who received this token. Note that client_ids should in general not be used for access control. |
| client_amr  | How the client authenticated itselft towards the AS.  | `virksomhetssertifikat`|
| consumer | The organization number, in ISO6523 notation, of the organization who is the legal consumer  of the token/API.  This value is always present.  In most cases, this organization will also be the Data Controller according to the GDPR. | <code>"consumer": {<br/>&nbsp;&nbsp;"Identifier": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"Authority": "iso6523-actorid-upis",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"ID": "9908:910075918"<br/>&nbsp;&nbsp;}<br/>}</code> |
| supplier | The organization number, in ISO6523 notation, of the optional organization which the `consumer` has delegated to act on its behalf regarding the API consumption.  In most cases, this is a Data Processor.|
| delegation_source   |  The Oauth2 *issuer* value of the legal authority where the `consumer` organization performed delegation of a given API access (ie: scope)  to the `supplier` organization | `https://sts.altinn.no`
| scope | A list of scopes the access_token is bound to.  Note that the End User may not grant access to all scopes requested.  |
| pid | "Personidentifikator" - the Norwegian national ID number (fødselsnummer/d-nummer) of the autenticated end user.   Not included if `no_pid` scope was requested or pre-registered on the client.  Also not included for machine-type tokens.|
| token_type | Type of token. Only `Bearer` supported. |
| iss | The identifier of ID-porten as can be verified on the [.well-known endpoint](oidc_func_wellknown.html)| `https://oidc.idporten.no/idporten-oidc-provider`
| exp | Expire - Timestamp when this token should not be trusted any more.  |
| iat | Timestamp when this token was issued.  |
| jti | jwt id - unique identifer for a given token  |
| client_orgno | **deprecated** The organization number of the client. Present for legacy reasons, but note that access control decisions by the Resource Server should be based on the `consumer`/`supplier` claims. |

#### client_amr

The following values may be returned for the `client_amr`-claim.  The values are partly from [Oauth Token Endpoint Authentication Methods](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-endpoint-auth-method), plus some custom claims for certificate-based authentication:

| value | description |
|-|-|
| none | No client authentication was performed |
| client_secret_basic   |   |
| client_secret_post   |   |
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

Developers integrating towards ID-porten / Maskinporten are expected to know these documents and apply them in their risk assessments. Our documention will not re-iterate the recommendations in the above documents, but overall we would like to hightlight:

* **Use a certified / well recognized IAM-product or OIDC library for the integration**
* **Keep secrets / certificates safe to avoid getting your organization  impersonated**
