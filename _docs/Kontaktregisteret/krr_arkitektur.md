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
    Oppslagstjenesten
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

Når klientene er registrert kan disse brukes for å få tildelt token og gjennomføre api-kallene.

<div class="mermaid">
graph LR
  subgraph API-tilbyder
    API
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
