---
title: Prosjekter 2020
description: Prosjekter 2020
permalink: Prosjekter_2020.html
sidebar: oidc
---


Denne "releasen" innheld større prosjekt og potensielle pilotar som me ynskjer å gjennomføre i 2020.



Releasen vart produksjonssatt 2020-12-31

## Ny funksjonalitet:


#### Anskaffelse nye eID-avtaler - ID-porten og eSignering

Dagens avtaler med eID-leverandørene løper til november 2020, og det må gjøres en anskaffelse av nye avtaler. De nye avtalene vil basere seg på krav som følger av de nye forskriftene for tillitstjenester (innført november 2019).




#### Notifisere norske eID til eIDAS

Nye forskrifter for tillitstjenester innført november 2019 gjør at eID-leverandører må selvdeklareres på nytt til NKOM. Siden de nasjonale kravene i stor grad er basert på europeiske krav (eIDAS) ønsker Digitaliseringsdirektoratet å kjøre et prosjekt i 2020 der vi ser på å samtidig melde eID-løsningene til EU, slik at norske borgere kan bruke sine eIDer på europeiske tjenester.




#### Pilotering av ansattporten

Dersom det er interesse fra kunder, ønsker vi å pilotere ulike varianter av "Ansattporten" i 2020. Mulige konsepter som er pekt på initielt er:

- kombinere innlogging med en "avgiver-velger" fra t.d. Altinn Autorisasjon eller andre kilder til ansatt-forhold

- selvbetjente circle-of-trust 

- bruk av Azure AD




#### OIDC-provider som kjerne i ny systemarkitektur

Overgangen fra SAML-integrasjoner til OIDC-integrasjoner går raskt. 40% av trafikken i ID-porten går nå over OIDC. Som følge av dette besluttet Digitaliseringsdirektoratet i et prosjekt i 2019 at ID-portens systemarkitektur må endres til at OpenID Connect / Oauth2-delen blir kjernen i ny arkitektur. En må se på om det er mulig å bruke et hyllevare IAM-produkt istedet for dagens egenutviklede løsning. Samtidig skal vi tilrettelegge for bruk av skyteknologi, både PaaS og SaaS-løsninger der dette er mulig.

Omskriving til ny systemarkitektur begynner nå, og vil pågå kontinuerlig fram til dagens driftsavtale går ut i slutten av 2021.

I 2020 ser vi for oss å gjøre følgende:

- Pilotering av ulike IAM-produkter

- Flytte SSO-håndtering ut av dagens SAML-kjerne og "frem" til OIDC-provider

