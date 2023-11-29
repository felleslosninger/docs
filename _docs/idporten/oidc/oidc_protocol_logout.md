---
title: "/logout endpoint"
description: "A logout will invalidate the central SSO session at ID-porten and log the user out of all other active clients. "
summary: 'A logout will invalidate the central SSO session at ID-porten and log the user out of all other active clients. '

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_logout
---

## About


When the user wants to log out of a client,  the client redirects the browser to the logout endpoint in ID-porten.  ID-porten will then invalidate the central SSO session, and try to log the user out of all other clients, before optionally redirecting the browser back to the originating client.

Most clients in ID-porten should implement logout support, but there are special cases, fe.x mobile apps, where logout support may not be desirable.  A risk assessment must be performed by customers chosing not to implement logout support. 


## Endpoints

The logout endpoint can be found from the [ID-porten metadata](oidc_func_wellknown) as parameter `end_session_endpoint`. 

The `/logout` endpoint is thoroughly documented in [OpenID Connect RP-Initiated Logout 1.0 specification](https://openid.net/specs/openid-connect-rpinitiated-1_0.html). 

## Behaviour

When the end-user wants to logout, the client must redirect the browser to the /logout-endpoint.  Upon receiving the request, ID-porten will try to log the end-user out from all other active clients in the SSO-session as follows:

1. terminate the current SSO-session in ID-porten
1. invalidate all tokens for pure authentication clients (ie tokens having only `openid` and/or `profile` scopes)
1. construct a dynamic page where each OIDC-client in parallell are sent a front-channel logout request (one iframe per client)
1. redirect the browser to each SAML serviceprovider in the session, in turn, with a SAMLLogoutRequest
1. finally redirect the browser back to the `post_logout_redirect_uri` supplied by the initiating client (if provided). Clients may need to explicitly url-decode the `state` value if it was provided 

We call this prosess "to perform single logout (SLO)"

Please note the following:
*  clients can NOT expect to get its own cookie included in the frontchannel-notification in step 3, as browsers increasingly implement limitations on the support of 3rd-party cookies due to privacy reasons.  Clients should store the `sid` value from the id_token 
*  if one of the SAML serviceproviders don't redirect the end-user back to ID-porten, the logout-chain is broken, and the end user will stop at that serviceprovider.
*  the client initiating the /logout will also receive a frontchannel notification in step 3. 
*  any tokens issues to 3rd-party scopes (beyond `openid`/`profile`) will still be active after a logout. For most scenarios in ID-porten, this is the desired behaviour, and thus the default behaviour.  But a side effect of this design is that ex. [Single-page applications (SPA)/javascript](oidc_auth_spa.html) which have chosen to use ID-porten access_tokens with their own scope directly as their session mechanism, must use the [revoke-endpoint](oidc_protocol_revoke.html) instead (or in addition to) the /logout-endpoint to "log out of the spa".



## Request

The client requests a logout by redirecting the browser to the /logout endpoint. This can happen in two ways:

| Parameter  | Value | Comment |
| --- | --- | - |
| HTTP method | POST | RECOMMENDED |
| HTTP method | GET | Supported |

We recommend to use POST, as the id_token_hint will then not be included in the web browser history or serverside access logs.

These query parameters should be part of the request: 

| Attribute | Cardinality | Description|
|---|---|---|
|```state```                   | recommended | Can be used by the client to detect legitimate calls on the post_logout_uri, and also transfer relevant user-state information if needed when handling the logout response.  |

If the client wants ID-porten to redirect the end user back to the client, the following query parameters must be present:

|```id_token_hint```           | optional | The id_token corresponding to the end user that wants to logout. |
|```post_logout_redirect_uri```| optional | Must match one of the pre-registered logout uris on the client.   Must be combined with `id_token_hint`. |



#### About state

* Valid regex: ^[\x20-\x7E]+$
* Ie. accepts valid ascii-characters having hex-value between 20 og 7E, ref. ex. http://www.asciitable.com/



#### error cases

If the ID-porten cookie is not included by the browser when redirecting to the /logout endpoint, ID-porten will not accept the logout and show an error page.

If no `id_token_hint` was provided, ID-porten will perform SLO of all other clients in the session, but will not redirect the browser back to the client.  This behaviour is defined in the OIDC specification.
