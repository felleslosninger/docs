---
title: "/token endpoint"
description: "This page summarizes the protocol options availalbe for on the /token endpoint for ID-porten OIDC Provider"
summary: 'This page summarizes the protocol options availalbe for on the /token endpoint for ID-porten OIDC Provider'
permalink: oidc_protocol_token.html
sidebar: oidc
product: ID-porten
---

## About

The `/token` endpoint is thoroughly documented in [OpenID Connect Core, chapter 3.1.3](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint)

## Request

The client requests a token by passing the authorization grant (normally a 'code' value) to the /token endpoint.

There are different parameters available for the request, depending on grant type and client authentication method.   The following always apply:

| Parameter  | Value |
| --- | --- |
| Http method | POST |
| Content-type | application/x-www-form-urlencoded |



### Request parameters when using `code` grant

The following request attributes are available when using the authorization code grant

| Attribute  | Requirement | Description |
| --- | --- | --- |
| client_id | required | The identifier of the client  |
| grant_type | required | Type of grant the client is sending, ie. `authorization_code` |
| code | required  | The authorization code received in the authorization response.  |
| redirect_uri | required | The desired redirect uri.  Must be the same value as was used in the corresponding authentication request. |
| code_verifier | recommended | The PKCE code verifier. Mandatory for public clients. |
| client_assertion_type | optional | If using certificate / asymmetric key for client authentication (recommended), this parameter must be set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`  |
| client_assertion   | optional   | A JWT identifing the client, mandatory if client_assertion_type is set  |


### Request parameters when using `JWT-bearer` grant

The following request attributes are available when using the authorization code grant

| Attribute  | Requirement | Description |
| --- | --- | --- |
| grant_type | required | Type of grant the client is sending, ie. `urn:ietf:params:oauth:grant-type:jwt-bearer`  |
| assertion   | optional   | The JWT grant  |

There is no need to perform client authenticion when using this grant, as the client is implicitly authenticated by the certificate in the JWT.

See [JWT grant](oidc_protocol_jwtgrant.html) for requirements for the JWT grant.


### Request parameters when using `refresh_token ` grant

TODO


### Client authentication

ID-porten supports four client authentication methods:

* client_secret_basic
* client_secret_post
* private_key_jwt
* none


#### Client authentication using client secret basic

A previously exchanged out-of-band static secret is used for standard HTTP bacic authentication header comprised of client_id + colon + secret.

```
POST /token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic dGVzdF9ycF95dDI6cGFzc3dvcmQ=

grant_type=authorization_code&
  redirect_uri=https%3A%2F%2Feid-exttest.difi.no%2Fidporten-oidc-client%2Fauthorize%2Fresponse&
  code=1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0%3D
```


#### Client authentication using client secret post

A previously exchanged out-of-band static secret is used for authentication.  The secret is added as a claim in the JSON payload of the POST request.




#### Client authentication using JWT token

The client generates a JWT as specified in [RFC7523 chapter 2.2](https://tools.ietf.org/html/rfc7523#section-2.2), and signs this using a valid business certificate conforming to [Rammeverk for autentisering og uavviselighet i elektronisk kommunikasjon med og i offentlig sektor](https://www.regjeringen.no/no/dokumenter/rammeverk-for-autentisering-og-uavviseli/id505958/).

The request is extended with the attributes 'client_assertion_type' and 'client_assertion', see above.

The 'sub' field of the JWT must be set equal to your client_id, otherwise the JWT itself is similar to [those used for JWT grant](oidc_protocol_jwtgrant.html).

#### Example:

```
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
   code=n0esc3NRze7LTCu7iYzS6a5acc3f0ogp4&
   client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
   client_assertion=< jwt >
```

#### No client authentication

Mobile apps and single-page applications are clients which cannot protect a secret/certificate and thus should be preregisteret to use no client authentication.

PKCE and state-parameter will be required when using no client authentication.

## Response

The response is a set of tokens and associated metadata, and will depend upon what was requested.

| Claim | Description|
| - |-|
|access_token   | An Oauth2 access token, either by reference or as a JWT depending on scopes requested and/or client registration |
|expires_in  | Seconds this access_token is valid   |
| id_token   | An OpenID Connect id_token. Only returned if 'openid' scope was requested.  |
| refresh_token  | Issued to confidential clients  |
| scope   | The list of scopes issued in the access token. Included for convenience only, and should not be trusted for access control decisions.  |

Example:
```
{
  "access_token" : "IxC0B76vlWl3fiQhAwZUmD0hr_PPwC9hSIXRdoUslPU=",
  "id_token" : "eyJraWQiOiJtcVQ1QTNMT1NJSGJwS3JzY2IzRUhHcnItV0lGUmZMZGFxWl81SjlHUjlzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiItdi1sY2FlNXJHRy1qbHZ6dXY5WTlIN1I4Tm1BZU0yLWtoMHFXYi12UElFPSIsImF1ZCI6InRlc3RfcnBfeXQyIiwiYWNyIjoiTGV2ZWw0IiwiYXV0aF90aW1lIjoxNDk3NjA1MjE4LCJhbXIiOiJCYW5rSUQiLCJpc3MiOiJodHRwczpcL1wvb2lkYy15dDIuZGlmaS5lb24ubm9cL2lkcG9ydGVuLW9pZGMtcHJvdmlkZXJcLyIsInBpZCI6IjIzMDc5NDEwOTE4IiwiZXhwIjoxNDk3NjA1MzgyLCJsb2NhbGUiOiJuYiIsImlhdCI6MTQ5NzYwNTI2Miwibm9uY2UiOiJtaW5fZmluZV9ub25jZV92ZXJkaSIsImp0aSI6IkhnYjN6d085ZzBiam1TYkNDdFFDeE1vd3NaRXUwMGxDSjJFeGc0Wmh2M2c9In0.Pl9APC3_GGJBLYR3AqZRC8-fjOWdIW3eQAn2zbqstGEyv8AJ6yPLiH0EA4e1RgHxK-dPwtydJF0fV-1aiPjDGYM8d-saN26WBlRyvBRH1j8A9smQv5XxJoXssfxMr-t1ZB5wDM37MOkwMF4zTNPVmyeQ0qM0PAudG7ZpT0gWPksQIWOoSk4A--MoOHPBy41xXWSpOvUh3jBqrnWEcZpqS785Ufofc6cDfXk_wM_-EMAlS-UExMq-hH60nPwXmR0cBNW3GV2xm_frYyqBYnxXoELmzREijpeSyiELTqn2k4nwCjeiGDXXs_Nw12D2KpWLDctqqsUtTTRUhsnCPSoDng",
  "token_type" : "Bearer",
  "expires_in" : 599,
  "refresh_token" : "yBtapz3ThC3uVWufWhxsLtbEidPnEsL7atvfHSBANDs=",
  "scope" : "openid"
}
```



### id_token

### access token

'aud'

ID-porten may issue two different types of access_tokens:

|Type token|Description|
|-|-|
|by reference| The token is just a string referencing the authorization inside ID-porten.  Such tokens must be validated towards the [/tokeninfo endpoint](oidc_protocol_tokeninfo.html).  By-reference tokens are good for privacy, as no personal data can be harvested by the client or in transit. |
|by value | The token is self-contained, meaning it contains all the relevant information about the authorization (end user, scope, timestamp etc.).  Such tokens are non-revokable and should have a short lifetime |

Access tokens must always be validated by the Resource Server / API before granting access.   

Clients should normally just pass the access token along to the resource server without any processing of it, however if any processing is performed, clients must also perform validation.

#### "By value" / self-contained access token

The token is a JWT with the following structure:

**Access tokenets header:**

| claim | verdi |
| --- | --- |
| kid | "Key identifier" - unique identifier for the key and certificate used by ID-porten. The public key and the certificate must be fetched from our .well-known endpoint. |
| alg | "algorithm" - algorithm used for signing the token. ID-porten only supports `RS256` (RSA-SHA256) |



**Access token body:**

| claim | value |
| --- | --- |
| sub | "subject identifier" - an unique identifier for the authenticated user.  The value is *pairwise*, meaning a given client will always get the same value, whilst different clients do not get equal values for the same user.  |
| aud   |  The indended audience for token.  Some Resource Servers require audience-restricted tokens, and the actual values to used must be exchanged out-of-band.  ID-porten will set the string value `unspecified` if no audience-restricted token was requested by the client.   See [Oauth2 Resource Indicators](https://tools.ietf.org/html/draft-ietf-oauth-resource-indicators-05) |  
| client_id | The client_id of the client who received this token. Note that client_ids should in general not be used for access control. |
| client_orgno | The organization number of the client. Present for legacy reasons, but note that using consumer/supplier claims is more unambiguous and is recommended for access control decisions by the Resource Server.  |
| consumer | The organization number, in ISO6523 notation, of the organization who is the legal consumer  of the token/API.  This value is always present.  In most cases, this organization will also be the Data Controller according to the GDPR. |
| supplier | The organization number, in ISO6523 notation, of the optional organization which the `consumer` has delegated to act on its behalf regarding the API consumption.  In most  wholeverandør|
| delegation_source   |  The Oauth2 *issuer* value of the legal authority in which the `consumer` organization performed delegation of a given API access (ie: scope)  to the `supplier` organization |
| scope | A list of scopes the access_token is bound to.  Note that the End User may not grant access to all scopes requested.  |
| pid | "Personidentifikator" - the Norwegian national ID number (fødselsnummer/d-nummer) of the autenticated end user.   Not included if `no_pid` scope was requested or pre-registered on the client.  Also not included for machine-type tokens.|
| token_type | Type of token. Only `Bearer` supported. |
| iss | The identifier of ID-porten as can be verified on the [.well-known endpoint](oidc_func_wellknown.html)|
| exp | Expire - Timestamp when this token should not be trusted any more.  |
| iat | Timestamp when this token was issued.  |
| jti | jwt id - unique identifer for a given token  |



### refresh token







Supported HTTP headers:

| Header  | Value |
| --- | --- |
|Http method|GET|

&nbsp;

Supported request attributes:

| Attribute  | Optionality | Description |
| --- | --- | --- |
| response_type | Required | Only `code` is supported by ID-porten |
| client\_id | Required | ID-porten will provide you with a client-id out-of-band|
| redirect\_uri | Required |The end user will be redirected here after a successful authentication.  Only pre-registered URIs can be used.  |
| scope |  Required |Whitespace-separated list of requested scopes.  Normally just `openid`.  |
| state | Recommended | Value set by the client and returned in the callback.  Recommended to use to achieve CSRF-protection. Mandatory to use for public clients|
| nonce | Recommended |Value set by the client and returned in the id-token. Recommended to use to protect from replay attacks. |
| acr\_values | Optional | Requested security level, either `Level3` or  `Level4`.  |
| response_mode | Optional | Used if you want alternative way of returning the authentication response. We support `query`,`form_post` and `fragment`. <p/>Note that some of these option may have security implications, and some other conditions may apply.   |
| ui\_locales | Optional | Requested language in the user interface, we support *nb*, *nn*, *en* or *se* |
| prompt | Optional | Used to govern end user involvement.  Only `login` is supported by ID-porten  |
| code_challenge   | Recommended  | Code challenge when using PKCE. Mandatory to use for public clients |
| code_challenge_method   | Recommended   | Algorithm for PKCE. Only `S256` supported.  |



Etter at brukeren har logget inn vil det sendes en redirect url tilbake til klienten. Denne url'en vil inneholde et autorisasjonskode-parameter `code` som kan brukes til oppslag for å hente tokens.  Koden er base64-enkoda og URL-safe.



## Validation

**The client MUST validate all responses from ID-porten according to the OIDC and Oauth2 standards as well as  practice recommendations from the IETF.**




Utviklere som integrerer mot ID-porten / Maskinporten forventes å kjenne til [RFC6819: trusselmodellen for Oauth2](https://tools.ietf.org/html/rfc6819) og legge denne til grunn for sine risikovurderinger.  Difi kommer ikke til å gjenta valideringstiltak som allerede står i spec'ene , men vi vil trekke fram følgende overordna anbefalinger:

1) Bruk et anerkjent IAM-produkt / bibliotek for integrasjonen.
2) Ha en trygg håndtering av nøkler slik at disse ikke kommer på avveie


## Validation of id-token

Dette er presist beskrive i [OIDC-spesifikasjonen kap 3.1.5.3](https://openid.net/specs/openid-connect-core-1_0.html#TokenResponseValidation)
(samt kap 3.2.2.11 for implicit-flyt og 3.3.2.12/3.3.3.7 for hybrid flyt )


## Validation of access_token


https://tools.ietf.org/html/rfc6749?#section-5.1

1. Valider token teknisk ihht Oauth2 og evt. JWT-spec.  Viss den feiler -> forkast
    1.  iss må være ID-porten
    2.  signatur på self-contained access-token / introspection respons må stemme med sertifikatet publisert på ID-porten sitt .jwks-endepunkt
    3. dersom introspection, valider at aud til deg selv
    4. dersom self-contained access token, valider at et eventuelt aud-claim er til deg selv som api-tilbyder

2. Sjekk token-type (`type`), om det er person-innlogging eller virksomhetsinnlogging
     1. dersom *virksomhet*:
         * finn konsument frå  `consumer_orgno`
         * dersom du har behov for å logge hvilken levendør, finnes dette i `supplier_orgno`

    2. dersom *person*:
        1. fødseslnummer finnes i 'pid'-claimet
            1. dersom pseudonymisert access_token finner du fødselsnummer ved å utføre introspection mot ID-porten

1.





## Examples

### Sample request

```

GET /authorize

  scope=openid&
  acr_values=Level3&
  client_id=test_rp_yt2&
  redirect_uri=https://eid-exttest.difi.no/idporten-oidc-client/authorize/response&
  response_type=code&
  state=my_csrf_protection_value&
  nonce=some_string_only_used_once&
  ui_locales=nb

```

### Sample response: {#authresponse}

```
{
  "code" : "1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0=",
  "state" : "my_csrf_protection_value"
}
```
