---
title: Pseudonymisert innlogging
description: Pseduonymisert innlogging
summary: "Pseudonymiserte token kan være gunstig for API-eiere som tilbyr tjenester for skyleverandører eller andre klienter som man ikke ønsker skal motta for mange personopplysninger. API-eier kan hente ut fødsels/D-nummer ved å validere et pseudonymisert token mot ID-porten."
permalink: oidc_func_nopid.html

layout: page
sidebar: oidc
---

## Om funksjonaliteten

Fødselsnummer/D-nummer er den unike identifikatoren i ID-porten.  Men i enkelte tilfeller er det ikke ønskelig at en klient mottar fødselsnummeret, for eksempel hvis denne er en generisk skytjeneste som også bruker et API tilbudt av en offentlig virksomhet.  På generell basis kan det også være godt personvern å ikke utveksle mer personopplysninger enn man faktisk har behov for i det enkelte scenario.


## Bruk

Klientet kan sende ```no_pid``` scopet i autentiseringsforespørselen for å trigge pseudonymisert innlogging.  Fødselsnummer/D-nummer vil da ikke bli inkludert i tokens fra ID-porten.

Pseudonyumisering vil skje uansett om klienten har også har brukt  ```openid``` eller ```profile``` scope.

En klient kan også pre-registreres/overstyres til alltid måtte behandles for no_pid, uavhengig av hva som blir sendt i en konkret forespørsel.

Klienter/Ressursservere som har tilgang til scopet ```tokeninfo``` kan validere inn et pseudoymisert token ved kall på /tokeninfo-endepunktet, gitt vellykka klientautentisering.
