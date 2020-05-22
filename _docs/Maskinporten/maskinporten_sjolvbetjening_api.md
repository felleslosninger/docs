---
title: Selvbetjening av Maskinporten via API
description:  Selvbetjening av Maskinporten via API
summary: 'Her finn du guidar og tutorials på korleis du kan sjølvbetjene Maskinporten via API'
permalink: maskinporten_sjolvbetjening_api.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

Dette dokumentet viser hvordan du kan selvbetjene i Maskinporten som API-tilbyder og API-konsument.

---
* TOC
{:toc}

## Innlogging og tilgang

### Tilgang (Administrasjon av API)

For å kunne bruke selvbetjening via API, så må virksomheten få utdelt en administrasjons-klient fra Digdir. API'et er sikret med oAuth2 med bruk av virksomhetssertifikat. Merk at i testmiljøene må det benyttes gyldig test-virksomhetssertifikat.

For å administrere API'er må administrasjons-klienten ha tilgang til scopet idporten:scopes.write.

Ta kontakt med servicedesk@digdir.no for å få tilgang.

Les også "Grunnleggende prosedyre for API-sikring". (https://difi.github.io/felleslosninger/oidc_api_admin_maskinporten.html#grunnleggende-prosedyre-for-api-sikring)

### Opprette API

For å opprette bruker på Samarbeidsportalen. Gjør følgende:

https://difi.github.io/felleslosninger/oidc_api_admin_maskinporten.html#1-opprette-apier

### Tilgangsstyring

https://difi.github.io/felleslosninger/oidc_api_admin_maskinporten.html#2-tilgangsstyring


### Vedlikehald av merkantile data

Vedlikehold av fakturainformasjon og varslingspunkter er viktig for at vi hele tiden skal ha oppdatert informasjon om dette. Varslingspunkt(er) får eposter ved kritiske hendelser i løsningen og om det ikke er registrert noe her, så kan man gå glipp av viktig informasjon.

For å administrere merkantile data:

1. Logg inn på Samarbeidsportalen
2. Trykk på "Virksomhetens tjenester" i venstremenyen
3. Finn integrasjonen av type "API-tilbyder" og trykk på den.
4. Trykk på "Rediger integrasjon"
5. Legg inn informasjon og trykk "Lagre" når du er ferdig.

Tutorial:


## Selvbetjening som API-konsument

### Innnlogging (Integrasjoner)

For å komme til administrasjonsgrensesnittet for integrasjoner/klienter, gjør følgende:

1. Logg inn på samarbeidsportalen.
2. Trykk på "Virksomhetens tjenester" i venstremenyen.
3. Trykk på "Administrasjon av tjenester" i venstremenyen.
4. Velg "Integrasjoner" i det miljøet du vil opprette selvbetjene i.

### Opprette klient for å konsumere API

1. Fullfør stegene i "Innlogging"
2. Trykk på "Ny integrasjon".
3. Velg "Maskinporten" på "Difi-tjeneste".
4. Trykk på "Legg til scopes" for å legge til scopet du skal konsumere. (Dersom scopet ikke ligger i listen, så har ikke API-tilbyder delt tilgang til virksomheten du representerer.)
5. Fullfør registreringen.
6. Trykk "Opprett" for å lagre.

### Slette klient

1. Fullfør stegene i "Innlogging"
2. Trykk på klienten du skal slette.
3. Trykk på "Endre".
4. Trykk på "Deaktiver" og bekreft.

### Vedlikehald av merkantile data

Vedlikehold av fakturainformasjon og varslingspunkter er viktig for at vi hele tiden skal ha oppdatert informasjon om dette. Varslingspunkt(er) får eposter ved kritiske hendelser i løsningen og om det ikke er registrert noe her, så kan man gå glipp av viktig informasjon.

For å administrere merkantile data:

1. Logg inn på Samarbeidsportalen
2. Trykk på "Virksomhetens tjenester" i venstremenyen
3. Finn klienten i listen og trykk på den.
4. Trykk på "Rediger integrasjon"
5. Legg inn informasjon og trykk "Lagre" når du er ferdig.

Tutorial:

## Ofte stillte spørsmål

### Jeg får 401 unauthorized når jeg prøver å poste en endring via API'et.
