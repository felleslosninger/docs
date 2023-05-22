---
title: "Changes in the new ID-porten in 2022-2023"
description: "We are making comprehensive changes in the core of ID-porten to make it more modern, robust and secure for the future. One of the main objectives for this project is to minimize the impact on our customers. Still, we know that the new solution will not be 100% downward compatible, and this page will highlight the coming changes."



sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_new_idporten
---


## Background

"We are making comprehensive changes in the core of ID-porten to make it more modern, robust and secure for the future. One of the main objectives for this project is to minimize the impact on our customers. There is a[project page on Samarbeidsportalen](https://samarbeid.digdir.no/eformidling/ny-systemarkitektur/736), this page contains the status for the project and a timeline for the migration.

We know the new solution will not be 100% downward compatible, so we have created this page in order to highlight the coming changes. The changes will mainly effect propriatary mechanisms created by us, as well as any custom usage that deviates from the standard Oauth protocol. We started to use Oauth in an early draft-phase and we can see that standard libraries and applications are not using the mechanisms in the way we tought they would be used.

The current agreement with our vendor TietoEvry expires in Q3 2023. On the new agreement, we wish to run all services on the new platform only. The new architechture will be based on the Kubernetes platform, and we will use SaaS services if needed. The "heart" of the new ID-porten will be based on a modern Oauth2/OIDC-authorization server from Connect2Id.  


## Migration plan

Have a look at the [status-page for the new ID-porten on Samarbeidsporten](https://samarbeid.digdir.no/id-porten/id-porten/1313) for a detailed timeline. When the changes are coming to our production enviroment, we will post a message on our [Statuspage](https://status.digdir.no/).

The migration will be divided into 4 main stages.

| Stage | Date | Description |
|-|-|-|
|1: Pilot | March 2023 | The production enviroment for the new Nye ID-porten is ready for selected services. No SSO to the old platform  |
|2: Normal operation |May 2023 | The new OIDC solution is ready with full functionality and performance. |
|3: Moving of SAML | September 2023 | All SAML integrations will be seemlessly moved from the old ID-porten to the new SAML proxy. SSO between old and new platform is ready. |
|4: Shutdown | December 2023 | The old OIDC-issuer is turned off. |  

### When should i migrate ?

If you are depending on SSO to other services, like Altinn, you need to wait until after september 2023.

If not, we recommend you to migrate as soon as possible starting from the end of march. Critical national services should migrate after the pilot period. Digdir will make direct contact with important/critical services.

### How do i migrate ?

This depends on your current integration.

#### A: Customer with existing OIDC client

In most cases, these are the steps to follow:

1. Open the outbound firewall to the new IP-adress.
2. Change the issuer-URL to point to the new URL: `https://idporten.no` (tbd).  
    * Some IAM-products will download the updated metadata and trust our new certificate automatically.
3. If step 2 did not happen automatically, you need to manually configure the new endpoints from our metadata and trust our new signing certificate.
4. Configure your integration to use [PKCE](https://docs.digdir.no/docs/idporten/oidc/oidc_func_pkce)
5. You will be able to re-use your existing `client_id`
6. You will be able to re-use your existing `client_secret` as well as your existing business certificate / key

#### B: Customer with SAML integration

If you want to stay on SAML, you need to check if your SAML integration is compatible with the reduced functionality of the new SAML proxy. This could be checked when the test-enviroment is ready. You will also need to open the outgoing firewall for the new IP-adress.

We recommend all our customers to use OIDC. This would require [setting up a new client and follow our integration steps.](https://docs.digdir.no/docs/idporten/oidc/oidc_guide_idporten).

## Detailed changes to the protocol:

The new ID-porten is aiming to follow the Oauth2.1 specifications, unlike 2.0 which is used today. This is because we want to follow the updated security demands from 2.1 The standard flow for alle integrations will be OIDC and code flow with forced use of PKCE, state and nonce.

### New issuer

The new ID-porten will run on a new domain with a new issuer value: `iss=https://idporten.no/`. Our signing certficate will also be changed. By providing a new issuer, we will make it possible for our customers to gradually migrate to our new solution at a suitable time.

However, this will make it a bit more complicated for API-owners that are using [brukerstyrt datadeling](oidc_auth_oauth2.html). These API-owners will need to trust access_tokens from two issuers unless they coordinate the migration with their customers.

At the end of the migration period, the old issuer will be permanently shut down. Clients that are not migrated by this point will not work any longer.

### New IP

The new ID-porten will run on a different IP-adress than today. All customers with outbound firewall must open the firewall to our new adress. The adress will be posted here when ready.

### SSO

The new ID-porten will offer SSO between all integrations between SAML and OIDC.

Please note, in the pilot-stage and the start of the migration period there will be no SSO between the new and old ID-porten.

#### SSO-free login

The new ID-porten will offer a SSO-free login. Customers will be able to configure their clients wether to allow SSO or not. This will be done through our self-service portal og API.

### onbehalfof

[onbehalfof](oidc_func_onbehalfof.html) is a custom-made mechanism in ID-porten to be used by vendors. This will still be available for OIDC and SAML.


### New acr values

There are new values for authentication levels.  The new values are `idporten-loa-substantial` and `idporten-loa-high`.  They can be used by a client to request user authentication on a minimum level with the `acr_values` parameter.  ID-porten will include the authentication level in the `acr` claim in the `id_token`.

### Forced use of PKCE, state and nonce.

All clients **must** use [PKCE](oidc_func_pkce.html) in addition to instance-uniquie state and nonce values. On todays solution, this is only required by public clients, and voluntarely yet higly recommended for confidential clients.

### state encoding

The `state` parameter will be URL encoded before it is returned to the client on authrization response and post logout redirect.  This affects clients using HTML/JSON/som ekind of data structure as `state` value.  The value should be URL decoded when recieved on these callbacks.


### `sub` will be changed

The `sub`-value from the `id_token` will be changed. Even tough most of our customers primarily use the social security number in the `pid`-claim , there are some IAM-products that uses the sub-value. In some cases, the IAM-product creates lokal user-databases (e.g. Keycloak), and there is a risk of duplicates.

In the `access_token`, the  `sub` will also get new values.

### Changes to Single logout and revoking

Due to changes in the OIDC specifications regarding logout, some changes have been implemented:

- if a client is registered with front channel logout uri it will receieve calls to this uri when it is the initiator of the logout request

We are considering to change todays behavior and align it to the spec.

- In todays solution, revoking the access_token/refresh_token will terminate the SSO session. Is this appropriate behavior?
- Is it appropriate that logging out of a SSO-sessjon, also invalidates all tokens belonging to the clients within the session?
- The spec requires a "do you really want to log out?" message in ID-porten in the logout process. Should we implement this?
- How strict should the requirements be, in order to redirect the end-user browser to the stated post_logout_redirect_uri ?

### More frequent redirect back to the client in case of errors

In the current OIDC solution, all error situations generates an error page in ID-porten and the login flow stops. In the new ID-porten, the end-user will more frequently be redirected back to the client along with an error description.

### Removal of implicit flow support

In the latest recommendations from IETF, implicit flow is not recommended. In ID-porten, implicit is not allowed on new integrations, but is still available on existing clients. I new ID-porten, implicit will not be available for any clients. Clients using implicit today, must change their solution to using code flow with PKCE. On a longer term, we are also considering implementing support for DPop.

### Claim at_hash revomed from the id_token

The claim `at_hash` will be removed from the id_token. `at_hash` is required in implicit flow.  It is not needed in the authorization code flow.

### Tightening in client authentication with private_key_jwt

JWT for the `client_assertion`-parameter must contain both `sub` and `iss` claims.  The parameter `client_id` must be stated to the token-endpoint along with `client_assertion`. This is documentet in the current solution, but the validation will be more strict in the new solution.

### New parameter in respons from authorization endpoint - `iss`

Response from the authorization endpoint will include `iss` which contains the value from the ID-porten issuer in that enviroment. This could be used to avoid "mix-up-attacks". This is spesified in [RFC 9207.](https://datatracker.ietf.org/doc/html/rfc9207#name-response-parameter-iss)

### Client_id is required when using request_uri towards the authorization endpoint

When using PAR (pushed auhtorization request), both `client_id`and `request_uri` must be included when calling the authorization endpoint

### SAML

The new ID-porten will only offer a very basic SAML-support, only to existing services. We will develop a simple SAML-to-OIDC-proxy which will be placed in front of the new OIDC-iusser.

The SAML proxy will support SAML Web Browser SSO 2.0 with Artifact Resolution binding. It will support only 1 AssertionConsumerURL and 1 combined signing- og encryption certificate.

Contact details (email/mobile) will no longer be included as part of the Assertion.

Updating the SAML-metadata will not be available. When the metadata expires (e.g. when the certificate expires), we expect that our customers starts using OIDC instead of SAML.

SAML will be phased out completely.

### Pseudonymization

[Pseudonymization](oidc_func_nopid.html) will be affected by the change of the `sub` parameter. (See above)  

The `no_pid` scope will be deprecated, meaning that all customers must use opaque tokens or pseudonymized scopes.
