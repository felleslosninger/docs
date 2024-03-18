---
title: "/revoke endpoint"
description: "The /revoke endpoint invalidates all tokens and the underlying oauth2-grant"
summary: 'The /revoke endpoint invalidates all tokens and and the underlying oauth2-grant'

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_revoke
---

{% include note.html content="I 2022 kommer det [ikke-bakoverkompatible endringer i ID-porten](oidc_protocol_nye_idporten.html)." %}


## About

The `/revoke` endpoint is thoroughly documented in [RFC7009](https://datatracker.ietf.org/doc/html/rfc7009)

When the client calls the revoke endpoint with valid token (either an access_token or a refresh token), that token and all other tokens associated with the underlying grant - for that specific client only - are invalidated in ID-porten.

Note that the SSO-session itself is NOT affected by a revoke, and any tokens issued to other clients during the same SSO-session are still valid.


## Request


## Response
