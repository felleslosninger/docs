---
title: "/token endpoint"
description: "This page summarizes the protocol options availalbe for on the /tokeninfo introspection endpoint for ID-porten OIDC Provider"
summary: 'This page summarizes the protocol options availalbe for on the /tokeninfo introspection endpoint for ID-porten OIDC Provider'
permalink: oidc_protocol_tokeninfo.html
sidebar: oidc
product: ID-porten
---

## About

The `/tokeninfo` endpoint is thoroughly documented in [RFC 7662 OAuth 2.0 Token Introspection ](https://tools.ietf.org/html/rfc7662)


## Request

The following header parameters must be used:

| Parameter  | Value |
| --- | --- |
|Http method:|POST|
|Content-type:|application/x-www-form-urlencoded|

The preregistered method of client authentication (token_endpoint_auth_method) must be used also on the /tokeninfo endpoint.

The following JSON payload must be submitted:

| Claim  | Value |
| --- | --- |
|token|\<The token that should be validated\>|

## Response

The most important parameter in the reponse is the `active`-claim.  If its value is *false*, the submitted token is not longer valid, and must not be used or trusted by the sending party.

The remainder of the response is intentionally kept as equal to the claims available in the access_token as possible.  

The response is intentionally Struktur på respons:

| claim | verdi |
| --- | --- |
| active | true / false |
| token_type | Type token. pr. nå¨støttes kun "Bearer" |
| sub | "subject identifier" - unik identifikator for den autentiserte brukeren. Verdien er her *pairwise* - dvs en klient får alltid samme verdi for samme bruker. Men ulike klienter vil få ulik verdi for samme bruker |
| client_id | client_id til klienten som er mottaker av dette tokenet |
| client_orgno | Klienten sitt organisasjonsnummer |
| scope | Liste over de scopes som dette access tokenet er bundet mot |
| pid | Personidentifikator - fødselsnummer/d-nummer på den autentiserte sluttbrukeren. MERK: Dette claimet blir ikke utlevert dersom scopet no_pid er benyttet og forespørselen mot tokeninfo er uautentisert |
| exp | Expire - Utløpstidspunktet for tokenet. Klienten skal ikke akseptere token'et etter dette tidspunktet |
| iat | Tidspunkt for utstedelse av tokenet |
| expires_in | antall sekunder til tokenet utløper |



Eksempel på request:

```
POST /tokeninfo
Content-type: application/x-www-form-urlencoded

token=fK0dhs5vQsuAUguLL2wxbXEQSE91XbOAL3foY5VR0Uk=
```

Eksempel på en respons ved suksessfull validering av token:

```
{
    "active": true,
    "token_type": "Bearer",
    "expires_in": 556,
    "exp": 1477990301,
    "iat": 1477989701,
    "scope": "global/kontaktinformasjon.read",
    "client_id": "test_rp",
    "client_orgno": "991825827"
}
```
