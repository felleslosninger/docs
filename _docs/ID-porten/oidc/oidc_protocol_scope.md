---
title: "Scope"
description: "This page summarizes how Oauth2 scopes are used in ID-porten OIDC provider."
summary: 'This page summarizes how Oauth2 scopes are used in ID-porten OIDC provider.'
permalink: oidc_protocol_scope.html
sidebar: oidc
product: ID-porten
---


ID-porten and Maskinporten can issue access tokens to scopes controlled by Difi, as well as scopes controlled by other organizations.


## Scope model
The following attributes are available for a scope:

| attribute| cardinality | description |
|-|-|-|
| prefix | mandatory| A prefix used for namespacing scopes belonging to a certain organization. Manually assigned by Digdir |
| visiblity | mandatory | Controls whether the scope appear on the public listing of available scopes known to ID-porten / Maskinporten |
| description | mandatory | A human-readable short description of the scope. Shown to the end-user in consent dialogue. |
| long_description (20-11) | optional | A longer human-readable description of the scope. Paragraphs break and links allowed. Shown to the end-user in consent dialogue.
| delegation_source | optional | If set, allows consumers to [delegate a given scope  access to a supplier in a external autoriative register of delegations](maskinporten_func_delegering.html). |
| accessible_for_all | default false | If true, any consumer organization can register a client having this scope and get tokens. |
| [allowable_integration_types](#scope-limitations) | optional | Array. If set, only clients having the same integration type(s) can get tokens for this scope, from the corresponsing Autorization Server |
|at_max_age | optional | If set, defines a maximium allowable expires_in for access tokens having this scope.  If multiple scopes are included into one token, the lowest value for at_max_age is enforced. A zero value means that lifetime is based on the client setting or system default.|
| authorization_max_age (20-11) | optional | If set, defines a maximum allowable lifetime for the authorization / consent granted by the end-user to the client. For Maskinporten-type scopes, set this value equal to at_max_age. A zero value means that lifetime is based on the client setting or system default. | 
| requires_user_consent | default false | If true, the consent dialogue is shown to the end user when performing the authorization.  |
| requires_user_authentication | default false | If true, a fresh authentication must be performed by the end-user as part of the authorization even if the she has an active SSO-session in ID-porten |
| requires_pseudonymous_tokens (20-11) | default false | If true, access_tokens having this scope (and any accompanying id_token) will lack the `pid`-claim. |
| token_type | default SELF-CONTAINED | Which type of tokens are expected by the API: SELF-CONTAINED or OPAQUE |
| active | default true | if false, no clients are allowed to get tokens having this scope.  To change, use DELETE / PUT operations. (already issued accesses and client reqgistrations are not altered by the DELETE operation, meaning it is suitable for temporary deactivation of a scope)

Example:
```
{
    "name": "altinn:serviceowner",
    "prefix": "altinn",
    "subscope": "serviceowner",
    "description": "Full access scope for the Altinn Service Owner API. Used for clients not specifying any API limitations.",
    "visibility": "PUBLIC",
    "token_type": "SELF_CONTAINED",
    "at_max_age": 1000,
    "requires_user_consent": false,
    "requires_user_authentication": false,
    "requires_pseudonymous_tokens": false,
    "accessible_for_all": false,
    "delegation_source": "https://tt02.altinn.no/",
    "allowed_integration_types": [
        "maskinporten"
    ]
    "last_updated": "2020-11-03T11:28:13.826+01:00",
    "created": "2020-11-03T11:28:13.826+01:00",
    "owner_orgno": "991825827",
    "active": true,

}
```




## Scope limitations

Some scopes only work towards Maskinporten, others only towards ID-porten, while some can be used for both. This depends on the `allowed_integration_types` attribute registrered on the scope:

| Allowable Integration Type |Description|
|-|-|
| |  An empty value means that clients of any integration type can get access_tokens containing the scope. | 
|maskinporten  | Only for server to server integration   |
|api_klient    | For APIs that require access_tokens bound to an authenticated user, ie: ID-porten  |



You will not be able to register a client with a certain scope if there is a conflict with the `integration_type` of the client and the `allowable_integration_type` of the scope. E.g. you can't add a "maskinporten" scope to a "api_klient" client.




## List of Reserved scopes

The following scopes triggers special behaviour in ID-porten OIDC provider.  They can be used by all customers.

|Scope|Description| Allowed integration_types|
|-|-|-|
|openid   | Triggers an OpenID Connect-compliant authentication  | idporten, api_klient |
|profile  | Gives access to the /userinfo endpoint   |  idporten, api_klient|
|no_pid   | Triggers a [pseudonymous authentication](oidc_func_nopid.html)   |  idporten, api_klient|
|eidas    | Include the eIDAS attributes in the id_token. See [eidas login](/oidc_func_eidas.html)   |  idporten, api_klient|

## List of scopes for APIs from Digitaliseringsdirektoratet

Any customer can self-service their clients with the following scopes:

| Scope |Description|Allowed integration_types|
|-|-|-|
|krr:global/*    | Scopes for global access to the Contact Registry |  krr,maskinporten |
|krr:user/*      | Scopes giving Contact Registry details for the authenticated user  | api_klient|
|idporten:authorizations.*  | [API for authorizations](oidc_api_autorisasjoner.html) | api_klient |
|idporten:user.log.read |[API for authentication history](oidc_api_logghistorikk.html) | api_klient |
|global/idporten.authlevel.read| [API for authentication level of assurance](oidc_api_authlevel.html) | maskinporten|

For the following scopes, you need to ask us to add them to your client manually:

| Scope |Description|Allowed integration_types|
|-|-|-|
|idporten:dcr*  | Scopes allowing for self-service of ID-porten integrations   | maskinporten|
|idporten:scopes*   | Scopes allowing for self-service of ID-porten/Maskinporten API management    | maskinporten|



## List of scopes for APIs from 3rd parties

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
