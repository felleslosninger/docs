---
title: "/token endpoint"
description: "This page summarizes the protocol options available for on the /token endpoint for ID-porten OIDC Provider"
summary: 'This page summarizes the protocol options available for on the /token endpoint for ID-porten OIDC Provider'
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
| code_verifier | recommended | The PKCE code verifier. Mandatory for public clients. Between 43 and 128 characters (ASCII). |
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

A previously exchanged out-of-band static secret is used for standard HTTP bacic authentication header comprised of base64 encoded concatenation of client_id + colon + secret.

```
POST /token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic dGVzdF9ycF95dDI6cGFzc3dvcmQ=

grant_type=authorization_code&
  redirect_uri=https%3A%2F%2Feid-exttest.difi.no%2Fidporten-oidc-client%2Fauthorize%2Fresponse&
  code=1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0%3D
```


#### Client authentication using client secret post

A previously exchanged out-of-band static secret is used for authentication.  The secret is added as a claim `client_secret` in the JSON payload of the POST request.




#### Client authentication using JWT token

The client generates a JWT as specified in [RFC7523 chapter 2.2](https://tools.ietf.org/html/rfc7523#section-2.2), and signs this using a valid business certificate conforming to [Rammeverk for autentisering og uavviselighet i elektronisk kommunikasjon med og i offentlig sektor](https://www.regjeringen.no/no/dokumenter/rammeverk-for-autentisering-og-uavviseli/id505958/).

The request is extended with the attributes 'client_assertion_type' and 'client_assertion', see above.

The 'sub' field of the JWT must be set equal to your client_id, otherwise the JWT itself is similar to [those used for JWT grants](oidc_protocol_jwtgrant.html).

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

Mobile apps and single-page applications are clients which cannot protect a secret/certificate and thus should be pre-registered to use no client authentication.

Use of PKCE and the `state` parameter will be required when using no client authentication.

## Response

The response is a set of tokens and associated metadata, and will depend upon what was requested.

| Claim | Description|
| - |-|
|access_token   | An Oauth2 access token, either by reference or as a JWT depending on which scopes was requested and/or client registration properties. |
|expires_in  | Number of seconds until this access_token is no longer valid   |
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



### The id_token

The id_token is the assertion of the authenticated user identity.  It tells you "who the user is", but not "what the user can access".

The [id_token is documented here](oidc_protocol_id_token.html).



### The access token

The access_token enable the client to access APIs on behalf of the authenticated user.  

The [acess_token is documented here](oidc_protocol_access_token.hml).
