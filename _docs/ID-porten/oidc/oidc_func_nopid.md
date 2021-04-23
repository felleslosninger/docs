---
title: Pseudonymisert innlogging
description: Pseduonymisert innlogging
summary: "Pseudonymiserte token kan være gunstig for API-eiere som tilbyr tjenester for skyleverandører eller andre klienter som man ikke ønsker skal motta for mange personopplysninger. API-eier kan hente ut fødsels/D-nummer ved å validere et pseudonymisert token mot ID-porten."
permalink: oidc_func_nopid.html
sidebar: oidc
product: ID-porten
---

## Om funksjonaliteten

Fødselsnummer/D-nummer er den unike identifikatoren i ID-porten.  Men i enkelte tilfeller er det ikke ønskelig at en klient mottar fødselsnummeret, for eksempel hvis denne er en generisk skytjeneste som også bruker et API tilbudt av en offentlig virksomhet, eller hvis den er en single-page applikasjon (SPA) som bruker ID-portens tokens direkte til sikring mot egen backend.

På generell basis er det godt personvern å ikke utveksle mer personopplysninger enn man faktisk har behov for i det enkelte scenario.


## Bruk

ID-porten tilbyr p.t. tre metoder for å pseudonymisere fødselsnummer i token.


### 1: Ren oauth2 med bruk av Opaque token

Ved "ren" oauth2 (altså ikke OIDC), så mottar ikke klienten noe `id_token`, kun `access_token`.  API-tilbyder må opprette et eget oauth2-scope for formålet, og dette må være konfigurert til ha `token_type=OPAQUE`.  Da vil mottatt `access_token` ikke være meningsbærende, og APIet / backend kan da [introspecte tokenet for å hente ut fødselsnummer](oidc_protocol_tokeninfo.html).

Klienten må passe på å *ikke* etterspørre `openid`-scopet (for da vil den få et id_token som inneholder fødselsnummer...).  Dette mønsteret passer derfor best når klient og API tilhører samme organisasjon, eller API-tilbyder stoler på at konsumentene konfigurer riktig.

### 2: Pseudoynimiserende scopes

I dette tilfellet så må API-tilbyder lage et scope, og sette det opp med  satt opp med flagget `requires_pseudonymous_tokens` til true. Nå vil hverken id_token eller access_token utlevert til klienter inneholde f/d-nr (`pid`).  

Når klientene bruker tokenet mot API-tilbyders endepunkt, kan API-tilbyder i sin tur da kalle /tokeninfo-endepunktet for å hente ut f/d-nr som hører til tokenet.  API-tilbyder må lage en egen klient (må være registrert på samme organisasjonsnummer som eier scopet), og bruke denne opp mot [tokeninfo-endepunktet](oidc_protocol_tokeninfo.html).

Bruk av pseudonymiserende scopes kan gjerne kombineres med at `token_type` settes til `OPAQUE` for ytterligere beskyttelse.

Dette mønsteret passer bra når det der mange klienter fra ulike virksomheter som skal ha tilgang til ditt API.

### 3: (under utfasing) no_pid-scope

Klienter kan sende ```no_pid``` scopet i autentiseringsforespørselen for å trigge pseudonymisert innlogging.  Fødselsnummer/D-nummer vil da ikke bli inkludert i tokens fra ID-porten.

Pseudonyumisering vil skje uansett om klienten har også har brukt  ```openid``` eller ```profile``` scope.

Klienter/Ressursservere som har tilgang til scopet ```tokeninfo``` kan validere inn et pseudoymisert token ved kall på /tokeninfo-endepunktet, gitt vellykka klientautentisering.
