---
title: "/endsession endpoint"
description: "Clients call the /endsession endpoint to logout the user from ID-porten"
summary: 'Clients call the /endsession endpoint to logout the user from ID-porten'

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_revoke
---

{% include note.html content="I 2022 kommer det [ikke-bakoverkompatible endringer i ID-porten](oidc_protocol_nye_idporten.html)." %}


## About

The `/endsession` endpoint is thoroughly documented in [OpenID Connect RP-initiated Logout](https://openid.net/specs/openid-connect-rpinitiated-1_0.html)

Clients participating in the SSO circle-of-trust in ID-porten must support this endpoint.

When the end-user wants to logout, the client redirects the browser to the /endsession-endpoint.  Upon receiving the request, ID-porten will try to log the end-user out from all other active clients in the SSO-session as follows:
1. constructing a dynamic page where each OIDC-client in parallell are sent a front-channel logout request (one iframe per client)
1. invalidating all tokens 
1. terminating the SSO-session in ID-porten
1. redirecting the browser to each SAML serviceprovider, in turn, with a SAMLLogoutRequest
1. redirect the browser back to the `post_logout_redirect_uri` supplied by the initiating client (if an id_token_hint was provided)

Note that if one of the SAML serviceproviders don't redirect the end-user back to ID-porten, the logout-chain is broken.  



Note that ID-porten currently has an "aggressive"
When clients participating
When the client calls the revoke endpoint with valid token (either an access_token or a refresh token),  all tokens linked to the grant are invalidated in ID-porten.  Additionally the end-user session is invalidated.

## Request


## Response
