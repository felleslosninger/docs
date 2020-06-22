---
title: "/par endpoint"
description: "This page summarizes the protocol options availalbe for on the /par endpoint for ID-porten OIDC Provider"
summary: 'This page summarizes the protocol options available for on the /par endpoint (Pushed Authorization Requests) for ID-porten OIDC Provider'
permalink: oidc_protocol_par.html
sidebar: oidc
product: ID-porten
---

## About

Pushed Authorization Requestes (PAR) and the `/par` endpoint is thoroughly documented in the draft IETF-specification [draft-ietf-oauth-par-01](https://tools.ietf.org/html/draft-ietf-oauth-par-01)

PAR lets the client push the authorization request (see [/authorize](oidc_protocol_authorize.html) ) to ID-porten ahead of end-user involvement.


## Request

The client pushes an authentication request by POST´ing it to the PAR endpoint.

Supported HTTP headers:

| Header  | Value |
| --- | --- |
|Http method|POST|
| Content-type | application/x-www-form-urlencoded |

&nbsp;

The supported request attributes are identical to attributes available on the [/authorize](oidc_protocol_authorize.html) endpoint, ie:


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
| code_challenge   | Recommended  | The [PKCE](oicd_func_pkce.html) `code_challenge` is a calculated value based on `code_verifier`.  Mandatory to use for public clients |
| code_challenge_method   | Recommended   | Algorithm for PKCE. Only `S256` supported.  |
|login_hint   | Optional   | Set to "eidas:true" to trigger authentication by European users according to eIDAS   |
|claims   | Optional  | Currently only used for [eIDAS](oidc_func_eidas.html)|



### Sample request

```
POST /idporten-oidc-provider/par HTTP/1.1
Host: oidc.difi.no
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



## STØTTER VI REQUEST PARAMETER ?

Aamund sjekkar


## Response

The response is a `request_uri` identifier.

### Sample response: {#authresponse}

```
{
    "expires_in": 120,
    "request_uri": "urn:idporten:JF38qJvAge0yvmYC4Hw3P0NXCahVkqlpeVCm_4K0paw"
}

```
The client must then use the request_uri by redirecting the end user to the /authorize endpoint before the request_uri expires.
```
GET /idporten-oidc-provider/authorize?request_uri=urn:idporten:JF38qJvAge0yvmYC4Hw3P0NXCahVkqlpeVCm_4K0paw
```
Request parameters should not be repeated in the authorize-request, but if they are inclued, they must be excactly matching the values that was pushed in the PAR.
