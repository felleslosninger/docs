---
title: "Scope"
description: "This page summarizes how Oauth2 scopes are used in ID-porten OIDC provider."
summary: 'This page summarizes how Oauth2 scopes are used in ID-porten OIDC provider.'
permalink: oidc_protocol_scope.html
sidebar: oidc
product: ID-porten
---


ID-porten and Maskinporten can issue access tokens to scopes controlled by Difi, as well as scopes controlled by other organizations.


## Scope limitations

Some scopes only work towards Maskinporten, others only towards ID-porten, while some can be used for both. This depends on the `allowed_integration_types` attribute registrered on the scope:

| Allowable Integration Type |Description|
|-|-|
| |  An empty value means that clients of any integration type can get access_tokens containing the scope. | 
|maskinporten  | Only for server to server integration   |
|api_klient    | For APIs that require access_tokens bound to an authenticated user, ie: ID-porten  |



You will not be able to register a client with a certain scope if there is a conflict with the `integration_type` of the client and the `allowable_integration_type` of the scope. E.g. you can't add a "maskinporten" scope to a "api_klient" client.




## Reserved scopes

The following scopes triggers special behaviour in ID-porten OIDC provider.  They can be used by all customers.

|Scope|Description| Allowed integration_types|
|-|-|-|
|openid   | Triggers an OpenID Connect-compliant authentication  | idporten, api_klient |
|profile  | Gives access to the /userinfo endpoint   |  idporten, api_klient|
|no_pid   | Triggers a [pseudonymous authentication](oidc_func_nopid.html)   |  idporten, api_klient|
|eidas    | Include the eIDAS attributes in the id_token. See [eidas login](/oidc_func_eidas.html)   |  idporten, api_klient|

## Scopes for APIs from Digitaliseringsdirektoratet

Any customer can self-service their clients with the following scopes:

| Scope |Description|Allowed integration_types|
|-|-|-|
|krr:global/*    | Scopes for global access to the Contact Registry |  krr,maskinporten |
|krr:user/*      | Scopes giving Contact Registry details for the authenticated user  | api_klient|


For the following scopes, you need to ask us to add them to your client manually:

| Scope |Description|Allowed integration_types|
|-|-|-|
|idporten:dcr*  | Scopes allowing for self-service of ID-porten integrations   | maskinporten|
|idporten:scopes*   | Scopes allowing for self-service of ID-porten/Maskinporten API management    | maskinporten|
|idporten:authorizations.*  | [API for authorizations](oidc_api_autorisasjoner.html) | api_klient |
|idporten:user.log.read |[API for authentication history](oidc_api_logghistorikk.html) | api_klient |
|global/idporten.authlevel.read| [API for authentication level of assurance](oidc_api_authlevel.html) | maskinporten|


## Scopes for APIs from 3rd parties

ID-porten and Maskinporten protect a number of APIs from other organizations. See the links below for the complete list:


| URL to list of scopes|Description|
|-|-|
| [https://integrasjon.difi.no/scopes/all](https://integrasjon.difi.no/scopes/all)  | A list of scopes protected by ID-porten in Production |
| [https://integrasjon-ver2.difi.no/scopes/all](https://integrasjon-ver2.difi.no/scopes/all)     |  A list of scopes protected by ID-porten in VER2 environment.  |

See the allowed_integration_type claim on each entry to see if any scope limitation applies.

You need to ask the organization owning the scope to grant you permission to use these scopes, unless the flag `accessible_for_all` is set.  


## Delegation source

The attribute `delegation_source` can be set on a scope in order to activate it for external delegation in e.g. Altinn.


## Scopes syntax for scopes controlled by third parties

Such scopes will always follow this syntax:

```
scope ::= prefix ':' subscope
```

The `prefix` is a string which is manually linked to a specific organization.  It may be the organization name, or other suitable value.  An organization may have multiple prefixes.

The `subscope` is created by the owning organization itself using selfservice.  ID-porten place no specific rules on how subscopes should be named or structured, as different organizations have vastly different needs to structure their APIs. Nevertheless, some _recommendations_ apply:

- the prefix should natually identify the owning organization or its subsidiary / application (example `nav` or  `folkeregisteret` or organization number)
    - if multiple organizations share the same scope, the prefix should identify the sector (`forsikring`)
- subscope should primarily identify the resource and not the API (`trygdeopplysninger` or `adresse`)
- subscope should contain various postfixes to differentiate between read and write access to the resource (`nav:trygdeopplysninger.write`)
     - absence of a postfix should normally only imply read access

For access to these scopes, you need to contact the organization owning the scope.
