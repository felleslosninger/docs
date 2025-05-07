---
title: Automatisk test av ID-porten
description: Automatisk test av ID-porten

toc: false
sidebar: oidc
product: ID-porten

redirect_from: /oidc_func_apitesting
---



## Automatisert testing av API'er beskyttet med access_token fra ID-porten

ID-porten i testmiljøer tilbyr "headless login" der tokens kan utstedes uten brukerinteraksjon til syntetiske testbrukere.  Denne funksjonaliteten skal kun brukes til å forenkle testing av API'er beskyttet av access_token fra ID-porten.

I denne forenklede flyten kan en syntetisk testbruker logges inn automatisk ved å sende inn et `login_hint` og liste over `scope` samt øvrige vanlige parametre i en [authorization request]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_authorize) til ID-porten.

 Parameter | Beskrivelse | Eksempel
 -|-|-|
 `login_hint` | Angir hvilken syntetisk personidentifikator som skal brukes samt sikkerhetsnivå som ønskes | `login_hint=testid:12345678901_idporten-loa-high`
 `scope`      | Angir hvilke scope som skal implisitt samtykkes til | `scope=openid profile mitt:api_scope`

`id_token` som utstedes vil ha `amr=TestID`.

Klienten leser authorization response fra location header og plukker ut code (og verifiserer state).  Klienten kaller deretter [token-endepunktet]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_token) på vanlig måte.

<div class="mermaid">
sequenceDiagram
  Klient ->> OpenID Provider: HTTP GET autentiseringsforespørsel (/authorize)
  note over OpenID Provider: Automatisk autentisering basert på login_hint og implisitt samtykke til scopes
  OpenID Provider ->> Klient: HTTP response med location header med autorisasjonscode
  Klient ->> OpenID Provider: HTTP token-forespørsel (/token)
  OpenID Provider ->> Klient: id_token + access_token (evt. refresh_token)
  Klient ->> API: bruke API med access_token
  API ->> OpenID Provider: validere token
  OpenID Provider ->> API: token informasjon
  API->>Klient: Resultat av API-operasjon
</div>

Under er et eksempel med bruk av Curl.  Det kuttes litt i output for å tydeliggjøre relevant informasjon.

Redirected authorization request simuleres med GET og authorization response finnes i response header location.  Innsending request - bruk egen `client_id` og `scope` og `redirect_uri` som er registrert på klient, genererer egen `state`, `nonce`, `code_verifier` osv:

```
 curl -v https://login.test.idporten.no/authorize\?scope\=openid%20profile%20apiscope\&client_id\=oidc_idporten_test_client\&redirect_uri\=https://oidc-test-client.test.tools.idporten.no/authorize/response\&response_type\=code\&state\=LzFinVZzwoTWWJNQyxCSspoBnVTh9Hk1ugJLmvKVPdU\&nonce\=iDyWdWH18O_lJxkdyPF28heGSBTz2Zwld9cO_GCI6f0\&acr_values\=idporten-loa-substantial\&ui_locales\=nb\&code_challenge_method\=S256\&code_challenge\=s2Zoo2UrS7PcGTZO7P9rPLaR0d-R-8OhbS4lSJxJDgw\&login_hint\=testid:28876895937_idporten-loa-substantial
```
Relevant fra response:
```
< HTTP/1.1 302 
< set-cookie: IDPORTEN_AUTH=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:10 GMT; SameSite=Lax
< set-cookie: SESSION=; Max-Age=0; Expires=Thu, 1 Jan 1970 00:00:00 GMT; Path=/; Secure; HttpOnly; SameSite=Lax
< location: https://oidc-test-client.test.tools.idporten.no/authorize/response?code=Jj_5MDvtbaYM6k-K94S4wg.IcwLOy-CkPnDzlERTcZlKA&iss=https%3A%2F%2Ftest.idporten.no&state=LzFinVZzwoTWWJNQyxCSspoBnVTh9Hk1ugJLmvKVPdU
```
Plukk ut `code` og lag standard token request med verdier tilpasset egen klient og verdier som korresponderer mot valg i authorization request.  I eksempelet brukes `client_secret_basic` som metode for klientautentisering.
```
~ curl --location 'https://test.idporten.no/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic *****' \
--data-urlencode 'code=Jj_5MDvtbaYM6k-K94S4wg.IcwLOy-CkPnDzlERTcZlKA' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'client_id=oidc_idporten_test_client' \
--data-urlencode 'redirect_uri=https://oidc-test-client.test.tools.idporten.no/authorize/response' \
--data-urlencode 'code_verifier=hITge41ZTC3OrdiokQsW2QivzMq01mg3IPxTpqTazZU'
```
Hent ut access_token fra response.
```
{"access_token":"...","refresh_token_expires_in":600,"refresh_token":"...","scope":"openid profile apiscope","id_token":"...","token_type":"Bearer","expires_in":120}
```
Bruk `access_token` mot API som skal testes.
