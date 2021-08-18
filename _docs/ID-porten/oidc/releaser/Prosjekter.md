---
title: Prosjekter
description: Prosjekter
permalink: Prosjekter.html
sidebar: oidc
---


Denne "releasen" innheld større prosjekt og potensielle pilotar som me ynskjer å gjennomføre i 2020.



Planlagd produksjonssetting: Q4 2021

## Ny funksjonalitet:


#### Anskaffelse nye eID-avtaler - ID-porten og eSignering (Shipped)

Dagens avtaler med eID-leverandørene løper til november 2020, og det må gjøres en anskaffelse av nye avtaler. De nye avtalene vil basere seg på krav som følger av de nye forskriftene for tillitstjenester (innført november 2019).




#### Notifisere norske eID til eIDAS (Under consideration)

Gjennomføre fagfelle-vurdering av norske eID-løsninger til EU, slik at norske borgere kan bruke sine eIDer på europeiske tjenester.




#### Pilotering av ansattporten (In design)

Vi ønsker å pilotere "Ansattporten" i 2021. Piloten vil minimum inneholde:

- kombinere innlogging med en "avgiver-velger" fra t.d. Altinn Autorisasjon eller andre kilder til ansatt-forhold

Eventuelt kan vi se om vi kan teste ut:

- selvbetjente circle-of-trust 

- bruk av Azure AD

P.t. er det planlagt å begynne utvikling i mars/april, med mål om skarp pilot rett før sommeren.




#### Ny systemarkitektur for ID-porten (In development)

Overgangen fra SAML-integrasjoner til OIDC-integrasjon går raskt. Som følge av dette besluttet Difi i et prosjekt i 2019 at ID-portens systemarkitektur må endres til at OpenID Connect / Oauth2-delen blir kjernen i ny arkitektur. En må se på om det er mulig å bruke et hyllevare IAM-produkt istedet for dagens egenutviklede løsning.. Samtidig skal vi tilrettelegge for bruk av skyteknologi, både PaaS og SaaS-løsninger der dette er mulig.

Omskriving til ny systemarkitektur begynner nå, og vil kontinuerlig fram til dagens driftsavtale går ut i slutten av 2021.

I 2021 ser vi for oss å gjøre følgende:

- Utvikling av første versjon av "nye ID-porten". 

- Prøvedrift av nye ID-porten i form av pilot på Ansattporten.

- Prøvedrift i produksjon i public cloud (Azure)

