---
title: OIDC systemarkitektur
description: Systemarkitektur i ID-porten
summary: "OIDC Provideren til ID-porten er realisert som en frittstående applikasjon 'foran' ID-porten SAML-tjeneste"

sidebar: oidc
product: ID-porten
redirect_from: /oidc_arch
---



## Autentiseringstjenester i ID-porten

ID-porten tilbyr **autentisering** av sluttbrukere opp mot nett-tjenester.  

Kunden kan velge mellom SAML2-protokollen og OIDC-protokollen når de skal koble seg mot ID-porten.  Alle tjenester deltar i en felles Circle-of-trust med single signon (SSO) seg imellom.

## Sikring av API-er

OIDC-grensesnittet til ID-porten OpenID Connect-provideren kan også utstede **autorisasjoner** for API-tilgang hos 3dje.part.    

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
