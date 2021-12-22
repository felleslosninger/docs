---
title: "JWT grant "
description: "This page summarizes the protocol options availalbe for on JWT grants on the /token endpoint for OIDC provider"
summary: "This page summarizes the protocol options availalbe for on JWT grants on the /token endpoint for OIDC provider"

sidebar: oidc
product: ID-porten
---

## About

JWT grants are documented in [RFC7523](https://tools.ietf.org/html/rfc7523).

## Request

ID-porten uses [the same grant format as Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_protocol_jwtgrant), with the following exceptions:
- the `consumer_org`-claim (ie external delegation) is not supported.
-  make sure the OIDC-provider is used as audience for the grant, ie: the `aud` claim.
