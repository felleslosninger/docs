---
title: Back-channel logout
description: ID-portens funksjonalitet for back-channel logout
summary: "Backchannel logout muliggjør å kalle logout bakkanal dersom det er utfordrende å gjøre det framkanal eller for å være ekstra sikker på at klienten har logget ut."
sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_backchannel_logout
---

## Om funksjonaliteten

Back-channel logout følger spesifikasjonen OpenID Connect Back-Channel Logout 1.0.

- Spesifikasjon: https://openid.net/specs/openid-connect-backchannel-1_0.html
- Event-claim: `http://schemas.openid.net/event/backchannel-logout`

Når sluttbrukeren logger ut i ID-porten, vil ID-porten sende en server-til-server forespørsel (HTTP POST) til alle klienter som er registrert med en `backchannel_logout_uri`. Forespørselen inneholder et signert `logout_token` (JWT) som klienten må validere og bruke til å terminere lokale sesjoner for brukeren.

Status i ID-porten:
- Backchannel logout støttes nå i ID-porten. Klienter som ønsker dette må registrere endepunkt i selvbetjeningsløsningen (se under).
- Det er ingen spesielle brannmur-/nettkrav utover at endepunktet må være tilgjengelig over internett via HTTPS.
- ID-porten gjør per nå kun ett (1) leveringsforsøk per hendelse. Timeoutverdier: 2 sekunder (connect) og 5 sekunder (read). Respons i 2xx-området tolkes som «akseptert». Andre responser eller tidsavbrudd anses som feil uten retry.

### Forholdet til front-channel logout

Backchannel logout utfyller front-channel logout:
- Front-channel er nettleser-basert og kan påvirkes av moderne nettleser-restriksjoner (cookies/iframes).
- Backchannel skjer server-til-server uten nettleser og er mer robust mht. å få beskjed om utlogging.
- NB: ID-porten sender ikke p.t. backchannel-kallet når en sesjon går ut på tid.
- Klienter bør støtte begge mekanismene for best mulig robusthet.

## Implementere et backchannel logout-endepunkt for din tjeneste


### Registrering (selvbetjenings-web)

For å ta i bruk backchannel logout må klienten registrere følgende i selvbetjeningsløsningen (sb-web):

- `backchannel_logout_uri` (obligatorisk for å motta backchannel logout). Når denne settes, konfigureres `backchannel_logout_session_required` automatisk.

Domenet til denne uri'en må matche domenet på en av redirect uri'ene som er konfigurert på klienten.

Se også informasjon om miljøer og metadata på siden [Well-known/metadata](oidc_func_wellknown).

### Logout request – format

ID-porten sender en HTTP POST med `Content-Type: application/x-www-form-urlencoded` til den registrerte `backchannel_logout_uri`.

Payload inneholder ett parameter:

- `logout_token`: Et signert JWT (JWS) i kompakt form.

Eksempel på HTTP-kall som tjenesten din vil motta:

```
POST https://rp.dittdomene.no/oidc/backchannel-logout
Content-Type: application/x-www-form-urlencoded

logout_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IksxIn0.eyJpc3MiOiJodHRwczovL2...<forkortet>...Ig
```

Krav til respons fra din tjeneste:
- Returner HTTP 200 OK eller 204 No Content så snart `logout_token` er validert og lokal sesjon er terminert.
- Endepunktet skal være raskt og idempotent. Unngå tung logikk i selve request-tråden.



### Validering av `logout_token`

Klienten må validere `logout_token` i henhold til spesifikasjonen og følgende ID-porten-krav:

- Signatur: Verifiser JWS-signaturen mot ID-portens offentlige nøkler (`jwks_uri` hentet fra well-known for aktuelt miljø).
- `iss` (issuer): Må matche ID-portens issuer i aktuelt miljø (se well-known).
- `aud` (audience): Må matche din `client_id`.
- `iat` (issued at): Må være innenfor rimelig tidsvindu. Tillat gjerne en liten clock-skew.
- `jti` (JWT ID): Brukes for å forhindre replay. Lagre prosesserte `jti` i kort tid, og avvis duplikater.
- `events`: Må inneholde nøkkelen `http://schemas.openid.net/event/backchannel-logout`.
- `sid` og/eller `sub`: Når `backchannel_logout_session_required` er aktivert (som i ID-porten), vil `sid` være med og skal brukes til å identifisere og terminere korrekt lokal sesjon. Dersom bare `sub` forekommer, terminer relevante sesjoner for brukeren.

Etter vellykket validering skal klienten:
- Lokalt avslutte alle relevante sesjoner (f.eks. slette server-side session state, HTTP-session, cookies knyttet til `sid`).
- Invalider eventuelle lokale cachede tokens/tilganger knyttet til sesjonen. Merk at backchannel logout i seg selv ikke «revokerer» tredjepartstokens hos andre API-er.

Eksempel, dekodet logout-token:
```json
{
  "x5c": [
    "....."
  ],
  "kid": "idporten_cert_example_kid",
  "typ": "logout+jwt",
  "alg": "RS256"
},
{
  "sub": "06819774798",
  "aud": "democlient_idporten",
  "iss": "https://idporten.no",
  "exp": 1765895107,
  "iat": 1765894807,
  "jti": "2F497oFIkHuoDzkpl_albJSIyTx2CVCXpMODzDgOrZA",
  "events": {
    "http://schemas.openid.net/event/backchannel-logout": {}
  },
  "sid": "KQ2enbnoJI04JvpDCiXqoJFYvitPP05gOJRvkv-Ozxg"
},
{<signature>}
```


### Eksempler

Vi anbefaler å bruke et bibliotek for å validere logout tokenet. Se eksempler i java [her](https://www.javadoc.io/doc/com.nimbusds/oauth2-oidc-sdk/latest/com/nimbusds/openid/connect/sdk/validators/LogoutTokenValidator.html)

Java (Nimbus) – skisse:

```java
// Anta at du har hentet issuer og jwks_uri fra well-known (se oidc_func_wellknown)
String issuer = "https://idporten.no"; // erstatt med faktisk issuer for miljøet
String clientId = "<din_client_id>";

// Valider JWT-signatur ved å bruke OP JWKS (bør caches)
JWKSource<SecurityContext> jwkSource = new RemoteJWKSet<>(new URL("<jwks_uri_fra_wellknown>"));
ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, jwkSource);
jwtProcessor.setJWSKeySelector(keySelector);

// Parse og verifiser logout_token
JWTClaimsSet claims = jwtProcessor.process(logoutToken, null);

// Enkle kontroller (utvid etter behov):
if (!issuer.equals(claims.getIssuer())) throw new IllegalArgumentException("Feil issuer");
if (!claims.getAudience().contains(clientId)) throw new IllegalArgumentException("Feil audience");
JSONObject events = (JSONObject) claims.getClaim("events");
if (events == null || !events.containsKey("http://schemas.openid.net/event/backchannel-logout")) {
    throw new IllegalArgumentException("Mangler backchannel-logout event");
}

String sid = (String) claims.getClaim("sid");
// terminer lokal sesjon for sid
terminateLocalSession(sid);
```

cURL – eksempel på POST-kroppen som mottas (for test/feilsøking):

```
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "logout_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJpc3MiOiJodHRwczovL2lkcG9ydGVuLmV4YW1wbGUvIiwiYXVkIjoiY2xpZW50X2lkX2V4YW1wZSIsImlhdCI6MTczNDA2MDAwMCwiandrIjoiLi4uIiwiaHR0cDovL3NjaGVtYXMub3BlbmlkLm5ldC9ldmVudC9iYWNrY2hhbm5lbC1sb2dvdXQiOnt9LCJzaWQiOiJzZXNzaW9uSWQxMjMifQ.signature" \
  https://rp.dittdomene.no/oidc/backchannel-logout
```

---

For hjelp eller spørsmål, ta kontakt via Digdirs supportkanaler. 
