---
title: Summary in english
description: Summary in english
summary: "ID-porten offer authentication services from Norwegian citizens towards service providers in the Norwegian public sector.  Most services should use the authorization code flow as standardized by OpenID Connect for integration towards ID-porten. "

sidebar: oidc
product: ID-porten
redirect_from: /oidc_guide_english
---

This english summary is intentionally kept very brief.  We advice english speaking companies to study the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html) for details. ID-porten implements a subset of this specification, conforming more-or-less to a *basic* OpenID Provider.

The authorization code flow is recommended from almost all services which integrates towards ID-porten.  

The integration activity is started by sending an email to "idporten (at) Digitaliseringsdirektoratet (dot) no".


## Overall description



<div class="mermaid">
graph LR
  end_user(User)
  OP(ID-porten)
  RP(Relying party / service provider)
  end_user -. authenticates towards  .-> OP
  OP -. issues id_token .-> RP
  end_user -. logging into  .-> RP
</div>

Følgende aktører inngår:

| Party | Description | Term in OIDC |
| -|-|-|
| User| Wants to log in to a public service | End User |
| Service | Web-based service offered by a Norwegian public body | Relying Party (RP) / Client |
| ID-porten | The authentication service offered by ID-porten| OpenID Provider (OP) |

## Authorization code flow:

<div class="mermaid">
sequenceDiagram
  User ->> Relying Party: Clicks "login"-button
  Relying Party ->> User: Redirect with authentication request
  User ->> OpenID Provider: follow redirect...
  note over User,OpenID Provider: End user authenticates himself (opt. consents to scopes)
  OpenID Provider ->> User: Redirect with authorization code
  User ->> Relying Party: follow redirect...
  Relying Party ->> OpenID Provider: request token (/token)
  OpenID Provider ->> Relying Party: id_token (opt. other tokens)
  note over User,Relying Party: User is logged in to the service
</div>

See [the description in OIDC Core](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowSteps) for details.

It is of utmost importance that the client performs all validations steps described in the specification.


Some relevant paramteres in the authentication request:

| Parameter  | Comment |
| --- | --- |
| response_type | Only `code` is supported by ID-porten |
| client\_id | ID-porten will provide you with a client-id  |
| redirect\_uri | The end user will be redirected here after a successful authentication.  Only pre-registered URIs can be used.  |
| scope |  Whitespace-separated list of requested scopes.  Normally just "openid".  |
| state | Value set by the client and returned in the callback.  Recommended to user to implement CSRF-protection. |
| nonce | Value set by the client and returned in the id-token. Recommended to use to protect from replay attacks. |
| acr\_values | Requested security level, either *idporten-loa-substantial* or  *idporten-loa-high* |
| ui\_locales | Requested language in the user interface, we support *nb*, *nn*, *en* or *se* |
| prompt | Optional, used to govern end user involvement.  Only `login` is supported by ID-porten  |




## Session handling

Please note that ID-porten and the Relying party holds individual http sessions.  It is the responsibility of the relying party to transform the id_token into a local session suitable for their service.

The ID-porten session is used to offer *single signon* (SSO) between all federations members.  A Relying party may override SSO by using prompt=login in the authentication request, however the SSO session is still created in ID-porten, and the user is vulnerable to SSO towards subsequent relying parties.

Session lifetime in ID-porten is as follows:
- inactivity time: 30 minutes
- maximium lifetime: 120 minutes

Composite services that rely on SSO to offer a seamless end user journey between individual services, must make sure to refresh the session before the inactivity time expires.

Note that the 'exp'-claim in the id_token is not related to the http session.


### Logout

Relying parties **must** offer single logout functionality from their own service, by sending an `/endsession`-call according to [OIDC Session Management](https://openid.net/specs/openid-connect-session-1_0.html) specification.   Post-logout redirect URIs must be preregistered on the client in ID-porten.

In addition, Relying parties must also be able to handle logout request from ID-porten conforming to the [OIDC Front Channel Logout](https://openid.net/specs/openid-connect-frontchannel-1_0.html) specification.  A front-channel logout URI must be preregistered on the client in ID-porten.


## Client authentication at the token endpoint

The use of the token endpoint differ somewhat depending on which client authentication method is being used.  The following authentication methods from [OIDC chapter 9](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication) is supported:

### Using static client secret

A static symmetric key (*client_secret*) must be obtained from Digitaliseringsdirektoratet. Production secrets will not be handed over by email.  The relying party is responsible for rotating the secret before it expires at ID-porten.

The client auth is performed by adding a standard HTTP Basic authentication header. (base64-encoded concatenated string by client_id, a colon and the  client_secret).

This method is in general not recommended for sensitive services, and Digdir recommends going for `private_key_jwt` instead.

Example

```
POST /token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic dGVzdF9ycF95dDI6cGFzc3dvcmQ=

grant_type=authorization_code&
  redirect_uri=https%3A%2F%2Feid-exttest.difi.no%2Fidporten-oidc-client%2Fauthorize%2Fresponse&
  code=1JzjKYcPh4MIPP9YWxRfL-IivWblfKdiRLJkZtJFMT0%3D
```


### Using JWT token

This is the recommended method for client authentication.

The client must generate a JWT token having claims as defined in the  `private_key_jwt`-section in  [chapter 9 of the OIDC-spesifikasjonen](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication), and sign this using a valid X.509 Norwegian business certificate ("virksomhetssertifikat").

The following claims in the JWT is of interest:

| Claim  | Comment |
| --- | --- |
|aud| Audience - the identifier for ID-porten.  See the `issuer` claim at the *well-known*-endpoint for correct value.  |
|iss| issuer - your client ID |
|iat| issued at - timestamp when this jwt was generated. **NOTE:** UTC-time.|
|exp| expiration time - timestamp when this jwt expire. **NOTE:** UTC-tid.  Max allowable lifespan is 120 seconds (exp - iat <= 120) |
|jti| Optional - JWT ID - unique id for this JWT. A JWT can not be reused|

The following header claims in the JWT should be noted:

| Claim | Comment |
| --- | --- |
| x5c | The certificate used for signing the JWT.  |
| alg | `RS256`, `RS384` or `RS512`.  |

Example:

```
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
   code=n0esc3NRze7LTCu7iYzS6a5acc3f0ogp4&
   client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
   client_assertion=< jwt >
```




## id-token

The relying party **must** validate the id-token according to [https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation)

The following claims in the id-token should be noted:

Header:

| claim | Comment |
| --- | --- |
| kid | "Key identifier" - unique identifier for the signature. Key and cerificate must be fetched from the well-known endpoint.  |
| alg | "algorithm" - signing algorithm, RS256, RS384, RS512 are supported |


Body:

| claim | verdi |
| --- | --- |
| sub | "subject identifier" - unique identifier for the end user. A *pairwise* value, meaning that a client will always get the same value for the same user,   but different clients get different values.  |
| aud | "audience" - your client_id  |
| acr | "Authentication Context Class Reference" -  The security level used.  Possible values are  "idporten-loa-substantial" (ie. MinID) or  "idporten-loa-high". This must be verified by the relying party.  |
| amr | "Authentication Methods References" - Possible values  *Minid-PIN*, *Minid-OTC*, *Commfides*, *Buypass*, *eIDAS*, *BankID* or  *BankID-mobil*, this may change over time. |
| iss | The identifier of ID-porten |
| pid | Personidentifikator - Proprietary claim, for the Norwegian national identifier ("F-number" or "D-number") |
| exp | Expire -  A client must not accept the id-token after this timestamp.  |
| locale |  The language used by the end user during the authentication process. |
| iat | Timestamp when this token is issued |
| jti | jwt id - unique identifier for this token  |
| sid | sesjonsid - a unique identifier the session for this end user. Should be kept by the client to aid single logout |



## Userinfo-endpoint

By requesting the *profile* scope in the authentication request, an access_token for the userinfo-endpoint will be included in the response.  

Please note that our userinfo endpoint does not contain any claims of value, and is solely offered in order to be compliant to the OIDC specification.  ID-porten does not know the name or other profile details for the end users.
