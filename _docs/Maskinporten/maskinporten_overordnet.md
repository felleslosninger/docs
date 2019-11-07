---
title: Overordnet
description:
summary:
permalink: maskinporten_overordnet.html
sidebar: maskinporten
product: Maskinporten
---

## Overordnet arkitekturbeskrivelse

Maskinporten er en tjeneste som tilbyr en enkel modell for API-sikring basert på OAuth2 protokollen og bruk av JWT-bearer grants, inspirert av [Google sine system-kontoer](https://developers.google.com/identity/protocols/OAuth2ServiceAccount).


<div class="mermaid">
graph LR
  subgraph API-tilbyder
    API
  end
  subgraph Difi
    OIDC[OIDC Provider]
  end
  subgraph API-konsument
     ny[Klient]
  end
  OIDC -->|2.utsteder token|ny
  ny -->|1. forspør tilgang|OIDC
  ny -->|3.bruker token mot|API
</div>


Maskinporten lar API-tilbydere definere tilganger til sine API, modellert som scopes, basert på konsumenten sine organisasjonsnummer.

API-konsumenter kan selv administrere sine klientkonfigurasjoner og provisjonere disse med tildelte tilganger fra tilbyderene.

API-tilbydere og konsumenter kan bruke denne tjenesten for å styre tilgang i de tilfellene der informasjonsverdiene APIet tilbyr er regulert av lovhjemmel, og ikke krever samtykke av brukeren.

Bruk av Maskinporten krever at begge aktørene bruker Maskinporten sin selvbetjeningsfunksjonalitet, enten gjennom webløsningen eller selvbetjeningsAPIet.
