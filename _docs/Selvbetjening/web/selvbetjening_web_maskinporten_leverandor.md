---
title: Selvbetjening som leverandør i Maskinporten via Samarbeidsportalen
description:  Selvbetjening som leverandør i Maskinporten via Samarbeidsportalen
permalink: selvbetjening_web_maskinporten_leverandor.html
sidebar: selvbetjening_sidebar
product: Selvbetjening
---

Dette dokumentet viser hvordan du som API-tilbyder kan selvbetjene dine scopes i Maskinporten gjennom Samarbeidsportalen.

---
* TOC
{:toc}


## Selvbetjening som leverandør i Maskinporten

### Forutsetninger

For å kunne opprette subscopes i Maskinporten, forutsetter det at virksomheten er registrert med et prefix. Les mer om dette på [Slik bruker du Maskinporten som API-tilbyder](https://docs.digdir.no/maskinporten_guide_apitilbyder.html)

### Innlogging (Scopes/API'er)

For å komme til administrasjonsgrensesnittet for API, gjør følgende:

1. Logg inn på samarbeidsportalen.
2. Trykk på "Virksomhetens tjenester" i venstremenyen.
3. Trykk på "Administrasjon av tjenester" i venstremenyen.
4. Velg "Mine API" i det miljøet du vil opprette scope.

### Opprette scopes

1. Fullfør stegene i "Innlogging"
2. Trykk på "Nytt scope".
3. Velg prefix og fullfør registrering.
4. Trykk "Opprett" for å lagre.

Videotutorial: (https://vimeo.com/427689809)

[![Opprette scopes](assets\videotutorial_300px.png)](https://vimeo.com/427689809 "Opprette scopes")

### Tilgangsstyring

1. Fullfør stegene i "Innlogging"
2. Trykk på scopet du skal tilgangsstyre.
3. Scroll ned til under konfigurasjonen og trykk "Legg til tilgang".
4. Legg inn organisasjonsnummer og trykk "Legg til"
5. For å slette en tilgang, trykk på søppelkasse-ikonet til høyre for organisasjonen med tilgang.

Videotutorial: (https://vimeo.com/427689702)

[![Tilgangsstyre scopes](assets\videotutorial_300px.png)](https://vimeo.com/427689702 "Tilgangsstyre scopes")

### Deaktivere subscopes

NB! Enn så lenge bør tilganger fjernes før et scope deaktiveres. Om ikke, vil de som har fått tilgang fortsatt få scopet utlistet på sine tilgjengelige scopes.

1. Fullfør stegene i "Innlogging"
2. Trykk på scopet du skal deaktivere.
3. Trykk på "Endre"
4. Trykk på "Deaktiver" og bekreft at du vil deaktivere.

Videotutorial: (https://vimeo.com/427689583)

[![Deaktivere scopes](assets\videotutorial_300px.png)](https://vimeo.com/427689583 "Deaktivere scopes")


### Vedlikehald av merkantile data

Vedlikehold av fakturainformasjon og varslingspunkter er viktig for at vi hele tiden skal ha oppdatert informasjon om dette. Varslingspunkt(er) får eposter ved kritiske hendelser i løsningen og om det ikke er registrert noe her, så kan man gå glipp av viktig informasjon.

For å administrere merkantile data:

1. Logg inn på Samarbeidsportalen
2. Trykk på "Virksomhetens tjenester" i venstremenyen
3. Finn integrasjonen av type "API-tilbyder" og trykk på den.
4. Trykk på "Rediger integrasjon"
5. Legg inn informasjon og trykk "Lagre" når du er ferdig.

Videotutorial: (https://vimeo.com/397388041)

[![Vedlikehald av merkantile data](assets\videotutorial_300px.png)](https://vimeo.com/397388041 "Vedlikehald av merkantile data")


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

Videotutorial: (https://vimeo.com/427689834)

[![Opprette klient](https://samarbeid.difi.no/sites/samarbeid2/files/videotutorial_300px.png)](https://vimeo.com/427689834 "Opprette klient")

### Slette klient

1. Fullfør stegene i "Innlogging"
2. Trykk på klienten du skal slette.
3. Trykk på "Endre".
4. Trykk på "Deaktiver" og bekreft.

Videotutorial: (https://vimeo.com/427689782)

[![Deaktivere klient](assets\videotutorial_300px.png)](https://vimeo.com/427689782 "Deaktivere klient")

### Vedlikehald av merkantile data

Vedlikehold av fakturainformasjon og varslingspunkter er viktig for at vi hele tiden skal ha oppdatert informasjon om dette. Varslingspunkt(er) får eposter ved kritiske hendelser i løsningen og om det ikke er registrert noe her, så kan man gå glipp av viktig informasjon.

For å administrere merkantile data:

1. Logg inn på Samarbeidsportalen
2. Trykk på "Virksomhetens tjenester" i venstremenyen
3. Finn klienten i listen og trykk på den.
4. Trykk på "Rediger integrasjon"
5. Legg inn informasjon og trykk "Lagre" når du er ferdig.

Videotutorial: (https://vimeo.com/397388041)

[![Vedlikehald av merkantile data](assets\videotutorial_300px.png)](https://vimeo.com/397388041 "Vedlikehald av merkantile data")

## Ofte stillte spørsmål

### "Prefiks" feltet er tomt når jeg skal opprette et nytt scope.

Om prefiks feltet er tomt, så har ikke virksomheten din fått opprettet et prefiks. Da får du ikke opprette et scope. Ta kontakt med servicedesk@digdir.no.

### Scopet jeg skal konsumere mangler når jeg trykker på "Legg til scopes".

Mest sannsynlig har ikke API-tilbyder delt tilgang med virksomheten du representerer, eller så har de gitt tilgang i et annet miljø. Kontakt API-tilbyder.

### "Ny integrasjon" er grået ut i produksjonsmiljøet.

For å administrere i produksjonsmiljøet, så må man logge inn med ID-porten. Dette forutsetter at vi har lagt inn personnummeret ditt på forhånd. Om "Ny integrasjon" fortsatt er grået ut etter innlogging med ID-porten. Kontakt servicedesk@digdir.no

### Jeg ser integrasjonene til en annen virksomhet enn det jeg forventer.

Tilgang til Samarbeidsportalen og selvbetjeningsløsningen gis på bakgrunn av epost-domenet ditt, som igjen er koblet til en virksomhet på vår side.  For store virksomheter og selskap, så kan det være at det gjenbrukes epost-domene på tvers av flere virksomheter. Ta kontakt med servicedesk@digdir.no.
