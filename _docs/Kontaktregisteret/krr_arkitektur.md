---
title: Overordnet arkitekturbeskrivelse (under arbeid)
description:
summary:

sidebar: krr_sidebar
product: Kontakt- og reservasjonsregisteret
redirect_from: /krr_arkitektur
---

## Oppslagstjenesten REST

Når klientene er registrert kan disse brukes for å få tildelt token og gjennomføre api-kallene.

<div class="mermaid">
graph LR
  subgraph Digdir
    Oppslagstjenesten[Oppslagstjenesten]
  end
  subgraph Digdir
    Maskinporten[Maskinporten]
  end
  subgraph API-konsument
     ny[Klient]
  end
  Maskinporten -->|2.utsteder token med tildelt scope|ny
  ny -->|1. forspør tilgang til scope|Maskinporten
  ny -->|3.bruker token mot|API
</div>

API-konsumenter kan selv administrere sine klientkonfigurasjoner og for krr-klienter vil scopene være forhåndsdefinert. 

## Oppslag ved innlogget bruker (brukerstyrt datadelling)

 <div class="mermaid">
 graph LR
   subgraph 3djepart
     API
   end
   subgraph Digdir
     OIDC[ID-porten]
   end
   subgraph Kunde
      ny[Tjeneste]
   end
   Sluttbruker ---|1. Vil bruke|ny
   OIDC -->|3.utsteder token|ny
   Sluttbruker ---|2. logger inn i  |OIDC
   ny -->|4.bruker token mot|API
 </div>


Hvilket API/ressurs som skal aksesseres, er styrt av [_scopes_]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_scope).
