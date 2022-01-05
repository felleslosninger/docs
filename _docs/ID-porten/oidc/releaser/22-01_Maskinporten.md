---
title: 22-01 Maskinporten
description: 22-01 Maskinporten
permalink: 22-01_Maskinporten.html
sidebar: oidc
---


Vedlikeholdsrelease av Maskinporten



Planlagd produksjonssetting: Jan 25, 2022

## Ny funksjonalitet:


#### Innbygger-bunde tokens fra Maskinporten (Ready to ship)

Maskinporten vil nå kunne utstede tokens som er begrenset til en enkelt innbygger. Dette kan være nyttig for API-tilbydere som ønsker å begrense risiko ved token på avveie.



## Forbetringar:

#### Som maskinporten-klient skal eg kunne be om innbygger-bundne tokens (PBLEID-22951)

Maskinporten utvides med støtte for å begrense eit token til eit bestemt fødselsnummer.
I første omgang er dette berre ei sak mellom klient og MP,  dvs. ingen scope-eigenskap.  API-eigar må legge inn validering i APIet dersom det krev fødselsnummer

Klienten ber om begrensing ved å inkludere `pid` i grantet.
Maskinporten validerer at oppgjeven pid er syntaktisk gyldig, og puttar `pid` som nytt claim i token.

