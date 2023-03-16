---
title: OIDC systemarkitektur
description: Systemarkitektur i ID-porten
summary: "OIDC Provideren til ID-porten er realisert som en frittstående applikasjon 'foran' ID-porten SAML-tjeneste"

sidebar: oidc
product: ID-porten
redirect_from: /oidc_arch
---


Arkitekturen for ID-porten ser slik ut:

graph LR
  subgraph Digitaliseringsdirektoratet
    IDP[ID-porten]
    SAML[SAML-proxy]
    SADM[Selvbetjening <br/> klientregistrering]
  end
  subgraph Kunde
     sp[SAML-tjeneste <br/> Service Provider]
     rp[OIDC-tjeneste <br/> Relying Party]
     adm[Administrator]
  end
  rp --  OIDC  ---IDP
  sp --  SAML2 ---SAML
  SAML -- OIDC ---IDP
  adm -- utfører ---SADM
  SADM -- synkronisering 5 min --->IDP

  Innbygger -- bruker --- sp
  Innbygger -- bruker --- rp

Selve ID-porten er basert på en moderne Oauth2/OIDC autorisasjonsserver fra Connect2ID.

[SAML-grensesnittet]({{site.baseurl}}/docs/idporten/oidc/oidc_func_saml) er basert på en enkel proxy som oversetter kundens SAML-meldinger til OIDC-protokolle.

Bemyndigede ansatte eller systemer bruker [Digdirs felles selvbetjeningsløsning]({{site.baseurl}}/docs/maskinporten/maskinporten_sjolvbetjening_web)
 til å registrere og vedlikeholde kundens integrasjoner.

## Autentiseringstjenester i ID-porten

ID-porten tilbyr **autentisering** av sluttbrukere opp mot nett-tjenester.  

Kunden kan velge mellom SAML2-protokollen og OIDC-protokollen når de skal koble seg mot ID-porten.  Alle tjenester deltar i en felles Circle-of-trust med single signon (SSO) seg imellom.

## Autorisasjonstjenester

OpenID Connect-provideren kan også utstede **autorisasjoner** for API-tilgang hos 3dje.part.    

<div class="mermaid">
graph LR
  subgraph 3djepart
    API
  end
  subgraph Digitaliseringsdirektoratet
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


## Oauth2-beskytta APIer fra Digitaliseringsdirektoratet

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

 Digitaliseringsdirektoratet tilbyr to Oauth2-beskytta APIer:

* [KRR-Oauth2](oidc_api_krr.html) tilbyr Kontakt- og Reservasjonsregisteret over et REST-grensesnitt.
* [authlevel]({{site.baseurl}}/docs/idporten/oidc/oidc_api_authlevel) er et nytt API for utlevering av innbyggers høyeste brukte sikkertsnivå i ID-porten.  


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
