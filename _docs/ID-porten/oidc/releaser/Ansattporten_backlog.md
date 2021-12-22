---
title: Ansattporten backlog
description: Ansattporten backlog

sidebar: oidc
---




Planlagd produksjonssetting: 2021-11-23

## Ny funksjonalitet:


#### Generisk ansattpålogging med Altinn (In design)

Innføre en rik organisasjonsvelger i Ansattporten, der innlogget bruker kan velge hvilken organisasjon hen ønsker å representere for den aktuelle innloggingen.

Tjenestene må velge hvilken rolle/representasjon fra Altinn Autorisasjon som de har behov for.

For datadelings-scenario blir det også mulig å få access\_tokens med koblinga mellom innlogget bruker og valgt organisasjon.




#### Ansattporten som egen IDP (In design)

Etablering av Ansattporten som eigen IDP, utan kobling til ID-porten og utan SSO.




#### Generisk ansattpålogging med NAV AA-register (Under consideration)

Organisasjonsvelgeren i Ansattporten blir utvidet til å også kunne bruke AA-registeret til NAV som kilde for ansattpålogging.




#### Lokalt hurtigbytte av avgiver (Under consideration)

Gjere det enkelt for proff-brukere å kunne bytte avgver raskt. Slike brukere har mange (potensielt flere hundre) avgivere, og det vil være uhengsiktmessig å redirecte hele browseren til Ansattporten hver gang brukeren skal bytte avgiver (spesielt viss klienten er en desktop-applikasjon eller SPA.)

Istedet får brukeren mulighet til å velge i et lokal GUI kven av dei andre mulege avgiverne ein ønskjer å representere.

