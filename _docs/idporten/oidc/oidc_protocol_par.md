---
title: "/par endpoint"
description: "This page summarizes the protocol options availalbe for on the /par endpoint for ID-porten OIDC Provider"
summary: 'This page summarizes the protocol options available for on the /par endpoint (Pushed Authorization Requests) for ID-porten OIDC Provider'

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_par
---

## About

Pushed Authorization Requestes (PAR) and the `/par` endpoint is thoroughly documented in the draft IETF-specification [draft-ietf-oauth-par-06](https://tools.ietf.org/html/draft-ietf-oauth-par-06)

PAR lets the client push the authorization request (see [/authorize]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_authorize) ) to ID-porten ahead of end-user involvement.

{% include note.html content="I 2022 kommer det [ikke-bakoverkompatible endringer i ID-porten](oidc_protocol_nye_idporten.html)." %}


## Request

The client pushes an authentication request by POST´ing it to the PAR endpoint.

Supported HTTP headers:

| Header  | Value |
| --- | --- |
|Http method|POST|
| Content-type | application/x-www-form-urlencoded |

&nbsp;

The supported request attributes are identical to attributes available on the [/authorize]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_authorize) endpoint, ie:


| Attribute  | Optionality | Description |
| --- | --- | --- |
| response_type | Required | Only `code` is supported by ID-porten |
| client\_id | Required | ID-porten will provide you with a client-id out-of-band|
| redirect\_uri | Required |The end user will be redirected here after a successful authentication.  Only pre-registered URIs can be used.  |
| scope |  Required |Whitespace-separated list of requested scopes.  Normally just `openid`.  |
| state | Recommended | Value set by the client and returned in the callback.  Recommended to use to achieve CSRF-protection. Mandatory to use for public clients|
| nonce | Recommended |Value set by the client and returned in the id-token. Recommended to use to protect from replay attacks. |
| acr\_values | Optional | Requested security level, either `idporten-loa-substantial` or  `idporten-loa-high`.  |
| response_mode | Optional | Used if you want alternative way of returning the authentication response. We support `query`,`form_post` and `fragment`. <p/>Note that some of these option may have security implications, and some other conditions may apply.   |
| ui\_locales | Optional | Requested language in the user interface, we support *nb*, *nn*, *en* or *se* |
| prompt | Optional | Used to govern end user involvement.  Only `login` is supported by ID-porten  |
| code_challenge   | Required*  | The [PKCE](oicd_func_pkce.html) `code_challenge` is a calculated value based on `code_verifier`.  Mandatory to use for public clients |
| code_challenge_method   | Required   | Algorithm for PKCE. Only `S256` supported.  |





### Sample request

```
POST /par HTTP/1.1
Host: idporten.no
Content-Type: application/x-www-form-urlencoded
Authorization: Basic czZCaGRSa3F0Mzo3RmpmcDBaQnIxS3REUmJuZlZkbUl3

  response_type=code&
  state=af0ifjsldkj&
  client_id=s6BhdRkqt3&
  redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb&
  code_challenge=K2-ltc83acc4h0c9w6ESC_rEMTJ3bww-uCHaoeK1t8U&
  code_challenge_method=S256&
  scope=openid

```


## Response

The response is a `request_uri` identifier, and an associated expiry time in seconds.

### Sample response: {#authresponse}

```
{
    "expires_in": 120,
    "request_uri": "urn:idporten:JF38qJvAge0yvmYC4Hw3P0NXCahVkqlpeVCm_4K0paw"
}
```

## Continue the authorization

The client must then use the request_uri and its client_id when redirecting the end user to the /authorize endpoint before the request_uri expires.
```
GET /authorize?request_uri=urn:idporten:JF38qJvAge0yvmYC4Hw3P0NXCahVkqlpeVCm_4K0paw&client_id=s6BhdRkqt3
```
Request parameters  (apart from client_id) must not be repeated in the authorize-request.
