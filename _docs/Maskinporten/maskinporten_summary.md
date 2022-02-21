---
title: English summary of Maskinporten
description:
summary:

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_overordnet
---

## Simple description of architecture

Maskinporten offers a simple security model for API's, based on the OAuth2 protocol and the use of JWT-bearer grants, inspired by [Google system accounts](https://developers.google.com/identity/protocols/OAuth2ServiceAccount).

Maskinporten allows the API-owners to define access to their API's, as scopes, based on the legal organization number of the consumer. This can be done through the self-service API or our self-service web-application.

<div class="mermaid">
graph LR
  subgraph API-owner
    API[API manager]
  end
  subgraph Digdir
    MP[Maskinporten]
  end

  API -->|Grants access to the scope|MP

</div>

Providing the correct access, the API-consumer may now create API-clients and add the provided scopes:

<div class="mermaid">
graph LR
subgraph Digdir
  MP[Maskinporten]
end
  subgraph API-consumer
    client[Self-service client]
  end

  client -->|create / edit client with provided scopes |MP
  MP -->|new / modified client registration|client


</div>

When the client(s) have been created, they can be used to recieve access_tokens and perform the API-calls.

<div class="mermaid">
graph LR
  subgraph API-owner
    API
  end
  subgraph Digdir
    Maskinporten[Maskinporten]
  end
  subgraph API-consumer
     ny[Client]
  end
  Maskinporten -->|2.issues token containing the provided scope|ny
  ny -->|1. requests access to scope|Maskinporten
  ny -->|3.use token towards|API
</div>

API-consumers can manage their own client configuration and register new clients with scopes provided from the API-owners.

API-owners and consumers may use this service to manage access if the data provided by the API is regulated by law, and does not require consent by a user.

It is required that both the API-owner and the consumer uses self-service, either through the web application or the self-service API.
