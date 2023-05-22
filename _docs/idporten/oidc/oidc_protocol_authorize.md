---
title: "/authorize endpoint"
description: "This page summarizes the protocol options availalbe for on the /authorize endpoint for ID-porten"
summary: 'This page summarizes the protocol options availalbe for on the /authorize endpoint for ID-porten'

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_authorize
---

## About

The `/authorize` endpoint is thoroughly documented in [OpenID Connect Core, chapter 3.1.2](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint)

## Request

The client passes an authentication request by redirecting the end user browser user's browser to the /authorize endpoint.

Supported HTTP headers:

| Header  | Value |
| --- | --- |
|Http method|GET|

&nbsp;

Supported request attributes for normal, redirected authorization requests:

| Attribute  | Optionality | Description |
| --- | --- | --- |
| response_type | Required | Only `code` is supported by ID-porten |
| client\_id | Required | ID-porten will provide you with a client-id out-of-band|
| redirect\_uri | Required |The end user will be redirected here after a successful authentication.  Only pre-registered URIs can be used.  |
| scope |  Required |Whitespace-separated list of requested scopes.  Normally just `openid`.  |
| state | Recommended | Value set by the client and returned in the callback. Often used to g Normally used to If PKCE is not used, then state must be used to achieve CSRF-protection. Mandatory to use for public clients|
| nonce | Recommended |Value set by the client and returned in the id-token. Recommended to use to protect from replay attacks. |
| acr\_values | Optional | Requested security level of assurance(s) (`idporten-loa-substantial`)|
| response_mode | Optional | Used if you want alternative way of returning the authentication response. The supported values are published on the .well-known endpoint.   |
| ui\_locales | Optional | Requested language in the user interface, we support *nb*, *nn*, *en* or *se* |
| prompt | Optional | Used to govern end user involvement. The supported values are published on the .well-known endpoint.   |
| code_challenge   | Required*  | The [PKCE](https://docs.digdir.no/docs/idporten/oidc/oidc_func_pkce) `code_challenge` is a calculated value based on `code_verifier`.  |
| code_challenge_method   | Required   | Algorithm for PKCE. Only `S256` supported.  |

When using PAR, only the following attributes are supported:

| Attribute  | Optionality | Description |
| --- | --- | --- |
| client\_id | Required | ID-porten will provide you with a client-id out-of-band|
|request_uri| Required | The identifier returned by ID-porten from a previously pushed [PAR request]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_par). |


Clients are strongly recommended to use state, nonce in addition to the mandatory [PKCE]({{site.baseurl}}/docs/idporten/oidc/oidc_func_pkce).


### Sample request

```
GET https://login.idporten.no/authorize?

  client_id=min_tjeneste&
  redirect_uri=https%3A%2F%2Fmin.tjeneste.no%2Flogin_callback&

  scope=openid+profile&
  acr_values=idporten-loa-substantial&
  response_type=code&
  ui_locales=nb&

  state=sV-423vokts9_CZdO9KZSV9xb35mlgzj_7BPTt-_khQ&
  nonce=S6tRrJ3tWsilRZl7hqySoORosHDDq4l6du3dxDhXoWc&
  code_challenge=HC9NRzz4QUaVMvl2TUYrWg_L54PBleKON4hapcIOydk
  code_challenge_method=S256&

```

### Sample request when using pushed authorization requests (PAR)

```
GET https://login.idporten.no/authorize?request_uri=urn:idporten:JF38qJvAge0yvmYC4Hw3P0NXCahVkqlpeVCm_4K0paw&client_id=min_tjeneste
```

## Request using request objects

The client can pass a request using a using a JWT based request object, as described in [OpenID Connect Core, chapter 6.1](https://openid.net/specs/openid-connect-core-1_0.html#JWTRequests)

Passing a Request Object by reference (as described in OpenID Connect Core chapter 6.2) is not supported.

The use of request objects requires use of a predefined public key on the client-registration, see [client administration api]({{site.baseurl}}/docs/idporten/oidc/oidc_api_admin#bruk-av-asymmetrisk-nøkkel)

### Sampe request using request object

```
GET https://login.idporten.no/authorize?
client_id=min_tjeneste
&scope=openid
&response_type=code
&request=eyJraWQiOiJ0ZXN0a2V5IiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJodHRwczovL29pZGMtdGVzdDEuZGlmaS5lb24ubm8vaWRwb3J0ZW4tb2lkYy1wcm92aWRlci8iLCJ1aV9sb2NhbGVzIjoibmIiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIiwiYWNyX3ZhbHVlcyI6IkxldmVsMyIsImlzcyI6InRlc3RfcnAiLCJyZXNwb25zZV90eXBlIjoiY29kZSIsInJlZGlyZWN0X3VyaSI6Imh0dHBzOi8vZWlkLWV4dHRlc3QuZGlmaS5uby9pZHBvcnRlbi1vaWRjLWNsaWVudC9hdXRob3JpemUvcmVzcG9uc2UiLCJleHAiOjE1OTM1OTc2NTksImlhdCI6MTU5MzU5NzUzOSwiY2xpZW50X2lkIjoidGVzdF9ycCIsImp0aSI6IjZlNTFjNjBjLTcxZDQtNDMxZi04NTBjLWY0ODNiYzMwZjYzMyJ9.fKPx1HAW8XqxyabtiRtT90uzIZoY0GS6BmPEaKOKDkDYQExLp1jNcLZNpMVKBkk8ZXGZG7HR62o-6e0tczEnJbhQCQ8c1IdB2XWhOyZBBJ4Vc4mJu5fqU5fKToxEOlArwCEnw0PJbgYMMNiFYRt-B8GiVrzy4Qgw4ts58Q8V7GT57ZjckhioSb28F4B1QUopcS40jckQMbzo5R372vOKkqsZnRxcxJttwQ65ALDV454Cwc_tVYr6B1z7D2SpN-ct8mqe6UblwEKMDlEtGg6i8iRczC4W6PwzlG9gRMpNXpt6Hy4_cOQ1152jqf6dCmxTumNfp568naKu_-glCdSNmg
```

## Response

When the user has performend a successful login, and optionally consented to any scopes requiring such consent, the browser will be redirected back to client.  The redirect will contain the authorization `code` parameter which is then used when fetching tokens. The code is base64-encoded and URL-safe.

The `state` parameter is also included, and MUST be validated by the client to detect CSRF attacks if PKCE is not used.  Clients may need to explicitly url-decode the `state` value


### Sample response: {#authresponse}

```
{
  "code" : "1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0=",
  "state" : "my_local_state"
}
```
