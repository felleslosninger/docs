---
title: Opprette og sette opp klient
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_opprette_klient
---

For å gjøre en forespørsel mot et eller flere av KRR sine endepunkt, må virksomheten sette opp en klient ved selvbetjening web eller selvbetjening api. Her beskriver vi hvordan du kan opprette klient ved selvbetjening web, men tilsvarende kan gjøres ved [selvbetjenings api](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api#registrere-klient). 

### Registrer ny bruker på Min Side  
Bruk av selvbetjening forutsetter at din virksomhet har fått tilgang til Samarbeidsportalen, og at du er registrert bruker. Registrer ny bruker på [Min side](https://user.difi.no/auth/realms/difi/protocol/openid-connect/auth?client_id=samarbeid-lukket&response_type=code&scope=openid%20email%20profile&redirect_uri=https%3A//minside-samarbeid.digdir.no/openid-connect/difi_user_login&state=vjHgvGh7mAqpRsxRjcjrR4EWSMs7-NMSafbdrkmHdqY).

{% include note.html content=" For å kunne registrere ny bruker må du bruke epost-domenet til din virksomhet!" %}

### Opprette klient

- Logg inn på Min side og gå til "Integrasjoner" i menyen til venstre.
- Trykk på "Selvbetjening" og velg miljøet du vil opprette klienten i.
- Velg "Legg til ny".

### Sette opp klient

a. Ved oppslagstjenesten REST
- Velg "Maskinporten & KRR".
- Under "Scope", velg scope-pakken "KRR". Da vil du automatisk få tildelt de riktige scopene.  
  For oppslag i KRR er krr:global/kontaktinformasjon.read relevant.
- Integrasjonsidentifikator: Genereres automatisk og skal brukes i jwt_claims.
- Navn på integrasjon: Egendefinert, unikt navn på integrasjonen.
- Beskrivelse: Egendefinert beskrivelse av hva integrasjonen skal brukes til.

b. Oppslag ved brukerinnlogging (brukerstyrt datadeling)
- Velg "ID-porten & API-klient".
- Under "Skal klienten benytte eksterne scope?", velg "Ja".
- Du må manuelt legge til scopet: krr:user/kontaktinformasjon.read.

[Lenke til mer detaljert beskrivelse av scopene](https://docs.digdir.no/docs/Kontaktregisteret/Brukerspesifikt-oppslag_rest#bruk-av-oauth2).
  
- Fullfør registreringen ved å trykke på "Opprett".

{% include note.html content="Ved opprettelse får du en integrasjonsID (klientID) som må brukes i forespørselen mot ID-porten." %}

### For leverandører
Hvis man er leverandør for kunde (databehandler og behandlingsansvarlig), skal kundens organisasjonsnummer legges til ved oppsett av klient. 
Det må i tillegg opprettes en såkalt OnBehalfof-klient (nederst på selvbetjeningssida ved oppretting av klient), der leverandør må legge inn en ønsket OnBehalfOf-verdi (entity-ID), navn og org.nr. 

"iss_onbehalfof" : "OnBehalfOf-verdi" må inkluderes i claims ved forespørsel av access-token fra Maskinporten. 


### Legge til nøkkel i klient
Public-nøkkelen skal legges til i klienten, struktuert som JWK. Mer beskrivelse om hvordan nøkkelen skal registreres [her](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#registrere-n%C3%B8kkel-p%C3%A5-klient).

### Kom i gang med koden
[Dette repoet](https://github.com/entur/exploratory-maskinporten-token/tree/main) kan være til hjelp for å komme i gang med koden. 

