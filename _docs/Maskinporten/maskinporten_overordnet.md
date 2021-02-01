---
title: Overordnet
description:
summary:
permalink: maskinporten_overordnet.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

## Overordnet arkitekturbeskrivelse

Maskinporten er en tjeneste som tilbyr en enkel modell for API-sikring basert på OAuth2 protokollen og bruk av JWT-bearer grants, inspirert av [Google sine system-kontoer](https://developers.google.com/identity/protocols/OAuth2ServiceAccount).

Maskinporten lar API-tilbydere definere tilganger til sine API, modellert som scopes, basert på konsumenten sine organisasjonsnummer.
Dette kan gjøres via Maskinporten sine selvbetjeningsAPI eller webløsning.

<div class="mermaid">
graph LR
  subgraph API-tilbyder
    API[API manager]
  end
  subgraph Digdir
    MP[Maskinporten]
  end

  API -->|Gir tilgang til scope for API-konsument|MP

</div>

Forutsatt at de riktige tilgangene er gitt, kan API-konsumenter nå opprette sine API-klientregistreringen med de tildelte scopene:

<div class="mermaid">
graph LR
subgraph Digdir
  MP[Maskinporten]
end
  subgraph API-konsument
    client[Administrasjonsklient]
  end

  client -->|opprette / endre klient med tildelte scopes |MP
  MP -->|ny / endret klientregistrering|client


</div>

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

API-konsumenter kan selv administrere sine klientkonfigurasjoner og registrere disse med tildelte scopes fra tilbyderene.

API-tilbydere og konsumenter kan bruke denne tjenesten for å styre tilgang i de tilfellene der informasjonsverdiene APIet tilbyr er regulert av lovhjemmel, og ikke krever samtykke av brukeren.

Bruk av Maskinporten krever at begge aktørene bruker Maskinporten sin selvbetjeningsfunksjonalitet, enten gjennom webløsningen eller selvbetjeningsAPIet.
