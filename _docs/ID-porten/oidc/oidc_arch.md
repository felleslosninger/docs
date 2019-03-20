---
title: OIDC arkitektur
description: Arkitekturen til ID-portens OIDC Provider
summary: "OIDC Provideren til ID-porten er realisert som en frittstående applikasjon 'foran' ID-porten"
permalink: oidc_arch.html

layout: page
sidebar: oidc
isHome: true
---

## Autentiseringstjenester i ID-porten

Arkitekturen for den OIDC-funskjonaliteten i ID-porten  ser slik ut:

<div class="mermaid">
graph LR
  subgraph Difi
    subgraph Eksisterende funksjonalitet
      idp[ID-porten]
      end
    OIDC[OIDC Provider]
  end
  subgraph Kunde
     ny[Nye tjenester]
     gammel[Eksiterende tjenester]
  end
  ny --  OpenID Connect  --- OIDC
  gammel --  SAML2 ---idp
  OIDC -- SAML2 ---idp
</div>

ID-portens OIDC provider tilbyr **autentisering** av sluttbrukere opp mot netttjenester.  Funksjonaliteten er grunnleggende den samme som dagens SAML2-basert løsning.

ID-portens OIDC Provider er en frittstående applikasjon som står foran den eksisterende ID-porten og snakker SAML2 med denne, tilsvarende eksisterende tjenester hos kundene.

Det er ID-porten som håndterer SSO-sesjoner både for SAML2 og OIDC.  Dette medfører at kunder får [single-signon (SSO)](oidc_func_sso.html) både mellom OIDC-baserte tjenester, og mellom SAML2- og OIDC-baserte tjenester.

## Autorisasjonstjenester

OpenID Connect-provideren kan også utstede **autorisasjoner** for API-tilgang hos 3dje.part.    

<div class="mermaid">
graph LR
  subgraph 3djepart
    API
  end
  subgraph Difi
    OIDC[OIDC Provider]
  end
  subgraph Kunde
     ny[Tjeneste]
  end
  OIDC -->|3.utsteder token|ny
  Innbygger ---|2.autentiserer og autoriserer|OIDC
  ny -->|1. forspør tilgang|OIDC
  ny -->|4.bruker token mot|API
</div>

API-tilgangen kan være innloggingsbasert (implisitt samtykke), brukerstyrt (eksplisitt samtykke), eller maskin-til-maskin-basert. I de to første tilfellene gjelder autorisasjonen kun en enkelt innbygger, mens det siste tilfellet er tiltenkt hjemmelsbaserte autorisasjoner.


## Oauth2-beskytta APIer fra Difi

<div class="mermaid">
graph LR
  subgraph Eksisterende funksjonalitet
    idp[ID-porten]
    Oppslagstjenesten
  end
  subgraph Oauth2-beskytta APIer
    KRR[KRR-Oauth2]
    authlevel
  end
  authlevel --- idp
  KRR -- SOAP --- Oppslagstjenesten
</div>

Difi tilbyr to Oauth2-beskytta APIer:

* [KRR-Oauth2](oidc_api_krr.html) tilbyr Kontakt- og Reservasjonsregisteret over et REST-grensesnitt.
* [authlevel](oidc_api_authlevel.html) er et nytt API for utlevering av innbyggers høyeste brukte sikkertsnivå i ID-porten.  


## Om OpenID Connect

![](/idporten-oidc-dokumentasjon/images/oidc.png "OpenID Connect logo")

OpenID Connect er en protokoll for autentisering basert på OAuth2. Se [http://openid.net/connect/faq/](http://openid.net/connect/faq/) for mer informasjon.

De implementerte tjenestene bygger på (deler av) følgende standarder og spesifikasjoner:

* OpenID Connect Core 1.0 - [http://openid.net/specs/openid-connect-core-1_0.html](http://openid.net/specs/openid-connect-core-1_0.html)
* OpenID Connect Discovery
[http://openid.net/specs/openid-connect-discovery-1_0.html](http://openid.net/specs/openid-connect-discovery-1_0.html)

* OpenID Connect Session Management
[http://openid.net/specs/openid-connect-session-1_0.html](http://openid.net/specs/openid-connect-session-1_0.html)
* OpenID Connect Front-Channel Logout
[http://openid.net/specs/openid-connect-frontchannel-1_0.html](http://openid.net/specs/openid-connect-frontchannel-1_0.html)
* OAuth 2.0 Form Post Response Mode
[http://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html](http://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html)
* OAuth 2.0 Token Introspection
[https://tools.ietf.org/html/rfc7662](https://tools.ietf.org/html/rfc7662)
* Proof Key for Code Exchange by OAuth Public Clients
[https://tools.ietf.org/html/rfc7636](https://tools.ietf.org/html/rfc7636)

* IETF RFC6749 The OAuth 2.0 Authorization Framework - [https://tools.ietf.org/html/rfc6749](https://tools.ietf.org/html/rfc6749)
* IETF RFC7523 JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants - [https://tools.ietf.org/html/rfc7523](https://tools.ietf.org/html/rfc7523)
