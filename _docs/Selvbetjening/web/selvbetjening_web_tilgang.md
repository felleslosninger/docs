---
title: Tilgang til selvbetjening via Samarbeidsportalen
description:  Tilgang til selvbetjening via Samarbeidsportalen

sidebar: selvbetjening_sidebar
product: Maskinporten
redirect_from: /selvbetjening_web_tilgang
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

Tilgang i produksjon er sikret med ID-porten, og tilgangen må delegeres av en bemyndiget person i virksomheten. (Direktør/Leder/Annen person med rolle "Hovedadministrator" i Altinn).

Fremgangsmåte for tilgang gjennom Altinn autorisasjon. Den som skal delegere tilgang må ha rolle som hovedadministrator.

1. Gå til Altinn.no
2. Trykk på "Logg inn"
3. Velg virksomheten du skal representere
4. Trykk på "Profil"
5. Trykk på "Andre med rettigheter til virksomheten"
6. Legg inn fødselsnummer og etternavn på den som skal få tilgang.
7. Søk på "Maskinporten" i søkefeltet på "Gi nye rettigheter"
8. Velg "Selvbetjening av integrasjoner i ID-porten/Maskinporten" (Se tabell under for forklaring av rettighetene)
9. Trykk på alle rettighetene
10. Trykk på "Gi rettigheter"

Tabell for tilgjengelige rettigheter:

|**Rettighet**|**Funksjon**|
| - | - |
| Selvbetjening av APIer i ID-porten/Maskinporten | Gir tilgang til å administrasjon og tilgangsstyring av scopes for API-tilbydere |
| Selvbetjening av integrasjoner i ID-porten/Maskinporten | Gir tilgang til å opprette, endre og slette klienter og integrasjoner mot KRR, ID-porten og Maskinporten |
| Selvbetjening for leverandører i ID-porten/Maskinporten*| Åpner opp feltet "For en kunde" slik at leverandører kan opprette klienter kunder sine organisajonsnummer |

*NB! Selvbetjening for leverandører krever "Selvbetjening av integrasjoner..." i tillegg.

Videotutorial: [https://vimeo.com/433540385](https://vimeo.com/433540385)

[![Delegere rettigheter]({{site.baseurl}}/assets/videotutorial_300px.png)](https://vimeo.com/433540385 "Delegere rettigheter")

Fremgangsmåte for å slette tilgang gjennom Altinn autorisasjon. Den som skal delegere tilgang må ha rolle som hovedadministrator.

1. Gå til Altinn.no
2. Trykk på "Logg inn"
3. Velg virksomheten du skal representere
4. Trykk på "Profil"
5. Trykk på "Andre med rettigheter til virksomheten"
6. Finn personen du skal frata rettigheter fra
7. Trykk på "Gi eller fjerne tilgang"
8. Trykk på "Fjern en eller flere rettigheter"
9. Trykk på "Fjern" på rettigheten som skal fjernes.
10. Trykk på "Ferdig for å bekrefte"

Videotutorial: [https://vimeo.com/433540358](https://vimeo.com/433540358)

[![Fjerne tilgang]({{site.baseurl}}/assets/videotutorial_300px.png)](https://vimeo.com/433540358 "Fjerne tilgang")

## Selvbetjening som API-tilbyder

### Forutsetninger

For å kunne opprette subscopes i Maskinporten, forutsetter det at virksomheten er registrert med et prefix. Prefix må opprettes av Digitaliseringsdirektoratet ved bestilling. For bestilling til testmiljø, send en epost til servicedesk@digdir.no.

For bestilling til produksjonsmiljøet, send inn skjema:
[Maskinporten - Innhenting av opplysningar](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5ka_Oknk2ND5DhEKnqlTuZMlUMVNWWVYwSlhTWlpRTjQwWEVDS09EUFVWWS4u).

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

[![Opprette scopes]({{site.baseurl}}/assets/videotutorial_300px.png)](https://vimeo.com/427689809 "Opprette scopes")

### Tilgangsstyring

1. Fullfør stegene i "Innlogging"
2. Trykk på scopet du skal tilgangsstyre.
3. Scroll ned til under konfigurasjonen og trykk "Legg til tilgang".
4. Legg inn organisasjonsnummer og trykk "Legg til"
5. For å slette en tilgang, trykk på søppelkasse-ikonet til høyre for organisasjonen med tilgang.

Videotutorial: (https://vimeo.com/427689702)

[![Tilgangsstyre scopes]({{site.baseurl}}/assets/videotutorial_300px.png)](https://vimeo.com/427689702 "Tilgangsstyre scopes")

### Deaktivere subscopes

NB! Enn så lenge bør tilganger fjernes før et scope deaktiveres. Om ikke, vil de som har fått tilgang fortsatt få scopet utlistet på sine tilgjengelige scopes.

1. Fullfør stegene i "Innlogging"
2. Trykk på scopet du skal deaktivere.
3. Trykk på "Endre"
4. Trykk på "Deaktiver" og bekreft at du vil deaktivere.

Videotutorial: (https://vimeo.com/427689583)

[![Deaktivere scopes]({{site.baseurl}}/assets/videotutorial_300px.png)](https://vimeo.com/427689583 "Deaktivere scopes")


### Vedlikehald av merkantile data

Vedlikehold av fakturainformasjon og varslingspunkter er viktig for at vi hele tiden skal ha oppdatert informasjon om dette. Varslingspunkt(er) får eposter ved kritiske hendelser i løsningen og om det ikke er registrert noe her, så kan man gå glipp av viktig informasjon.

For å administrere merkantile data:

1. Logg inn på Samarbeidsportalen
2. Trykk på "Virksomhetens tjenester" i venstremenyen
3. Finn integrasjonen av type "API-tilbyder" og trykk på den.
4. Trykk på "Rediger integrasjon"
5. Legg inn informasjon og trykk "Lagre" når du er ferdig.

Videotutorial: (https://vimeo.com/397388041)

[![Vedlikehald av merkantile data]({{site.baseurl}}/assets/videotutorial_300px.png)](https://vimeo.com/397388041 "Vedlikehald av merkantile data")


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

[![Deaktivere klient]({{site.baseurl}}/assets/videotutorial_300px.png)](https://vimeo.com/427689782 "Deaktivere klient")

### Vedlikehald av merkantile data

Vedlikehold av fakturainformasjon og varslingspunkter er viktig for at vi hele tiden skal ha oppdatert informasjon om dette. Varslingspunkt(er) får eposter ved kritiske hendelser i løsningen og om det ikke er registrert noe her, så kan man gå glipp av viktig informasjon.

For å administrere merkantile data:

1. Logg inn på Samarbeidsportalen
2. Trykk på "Virksomhetens tjenester" i venstremenyen
3. Finn klienten i listen og trykk på den.
4. Trykk på "Rediger integrasjon"
5. Legg inn informasjon og trykk "Lagre" når du er ferdig.

Videotutorial: (https://vimeo.com/397388041)

[![Vedlikehald av merkantile data]({{site.baseurl}}/assets/videotutorial_300px.png)](https://vimeo.com/397388041 "Vedlikehald av merkantile data")

## Ofte stillte spørsmål

### "Prefiks" feltet er tomt når jeg skal opprette et nytt scope.

Om prefiks feltet er tomt, så har ikke virksomheten din fått opprettet et prefiks. Da får du ikke opprette et scope. Ta kontakt med servicedesk@digdir.no.

### Scopet jeg skal konsumere mangler når jeg trykker på "Legg til scopes".

Mest sannsynlig har ikke API-tilbyder delt tilgang med virksomheten du representerer, eller så har de gitt tilgang i et annet miljø. Kontakt API-tilbyder.

### "Ny integrasjon" er grået ut i produksjonsmiljøet.

For å administrere i produksjonsmiljøet, så må man logge inn med ID-porten. Dette forutsetter at vi har lagt inn personnummeret ditt på forhånd. Om "Ny integrasjon" fortsatt er grået ut etter innlogging med ID-porten. Kontakt servicedesk@digdir.no

### Jeg ser integrasjonene til en annen virksomhet enn det jeg forventer.

Tilgang til Samarbeidsportalen og selvbetjeningsløsningen gis på bakgrunn av epost-domenet ditt, som igjen er koblet til en virksomhet på vår side.  For store virksomheter og selskap, så kan det være at det gjenbrukes epost-domene på tvers av flere virksomheter. Ta kontakt med servicedesk@digdir.no.
