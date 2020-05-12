---
title: Sjølvbetjening av Maskinporten via Samarbeidsportalen
description:  Sjølvbetjening av Maskinporten via Samarbeidsportalen
summary: 'Her finn du guidar og tutorials på korleis du kan sjølvbetjene Maskinporten via Samarbeidsportalen'
permalink: maskinporten_sjolvbetjening_web.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

Dette dokumentet viser hvordan du kan selvbetjene i Maskinporten som API-tilbyder og API-konsument.

---
* TOC
{:toc}

## Innlogging og tilgang

### Innlogging

Samarbeidsportalen er inngangen til selvbetjeningen på nett. En forutsetning for å ta dette i bruk, er at virksomheten din er registrert hos oss og bruksvilkår er signert. Når du oppretter en bruker så knyttes du til den virksomheten som er registrert med domenet i epost-adressen din. F.eks logger du inn med <navn>@digdir.no, så blir du knyttet til Digitaliseringsdirektoratet.

### Opprette bruker

For å opprette bruker på Samarbeidsportalen. Gjør følgende:

1. Gå til samarbeid.difi.no
2. Trykk på "Min profil" oppe i høyre hjørne.
3. Trykk på "Registrer deg" i påloggingsvinduet
4. Registrer bruker med din jobbadresse
5. Bekreft brukeren ved å trykke på lenken som kommer på epost. (NB! Sjekk søppelpost om ikke eposten kommer frem).

### Tilgang i testmiljø

I utgangspunktet har alle brukere som er koblet til en virksomhet, tilgang til selvbetjening i testmiljøene ver1 og ver2. Noen virksomheter har innført restriksjoner og har strengere tilgangsstyring.


### Tilgang i produksjonsmiljø

Tilgang i produksjon er sikret med ID-porten, og tilgangen må bestilles av en bemyndiget person i virksomheten. (Direktør/Leder). Bestillingen kan se noe slik ut:

"Følgende person(er) trenger tilgang til selvbetjening i produksjonsmiljøet på vegne av Eksempel AS:
Navn, epost og telefonnummer"

Så avtaler vi utveksling av personnummer etter dette.

Dette erstattes ganske snart av Altinn autorisasjon, slik at den bemyndigede personen må logge inn i Altinn for å delegere tilgang til sine ansatte.

## Selvbetjening som API-tilbyder

### Forutsetninger

For å kunne opprette subscopes i Maskinporten, forutsetter det at virksomheten er registrert med et prefix. Prefix må opprettes av Digitaliseringsdirektoratet ved bestilling. For bestilling til testmiljø, send en epost til servicedesk@digdir.no.

For bestilling til produksjonsmiljøet, send inn skjema:

### Opprette scopes

1. Logg inn på samarbeidsportalen.
2. Trykk på "Virksomhetens tjenester" i venstremenyen.
3. Trykk på "Administrasjon av tjenester" i venstremenyen.
4. Velg "Mine API" i det miljøet du vil opprette scope.
5. Trykk på "Nytt scope".
6. Velg prefix og fullfør registrering.
7. Trykk "Opprett for å lagre".

### Tilgangsstyring

1. Logg inn på samarbeidsportalen.
2. Trykk på "Virksomhetens tjenester" i venstremenyen.
3. Trykk på "Administrasjon av tjenester" i venstremenyen.
4. Velg "Mine API" i det miljøet scopet ligger i.
5. Trykk på scopet du skal tilgangsstyre.
6. Scroll ned til under konfigurasjonen og trykk "Legg til tilgang".
7. Legg inn organisasjonsnummer og trykk "Legg til"
8. For å slette en tilgang, trykk på søppelkasse-ikonet til høyre for organisasjonen med tilgang.

### Slette subscopes

### Vedlikehald av merkantile data

En full verdikjede for API-sikring med Maskinporten består av følgende steg:

1. API-tilbyder blir manuelt tildelt et API-prefiks i Maskinporten
2. API-tilbyder oppretter et API (scope)
3. API-tilbyder gir tilgang til en konsument
4. Konsument oppretter en Maskinporten-integrasjon (oauth2-klient) og registrer  scopet til denne.

Tilgang er nå etablert.  Når API'et så skal brukes run-time, gjennomføres følgende steg:

5. Konsumenten sin Oauth2-klient forespør token fra Maskinporten
6. Konsumenten inkluderer token i kall til APIet.
7. API-tilbyder validerer tokenet, utførerer evt. fin-granulert tilgangskontroll og returnerer forespurt ressurs.


## Selvbetjening som API-konsument

### Opprette klient

### Slette klient

### Vedlikehald av merkantile data

### 4. Opprett en integrasjon i Maskinporten

## Kjente feil
