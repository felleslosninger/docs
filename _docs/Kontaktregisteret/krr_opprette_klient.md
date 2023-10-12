---
title: Opprette klient
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_opprette_klient
---

For å gjøre en forespørsel mot et eller flere av KRR sine endepunkt, må virksomheten sette opp en klient ved selvbetjening web eller selvbetjening api. Her beskriver vi hvordan du kan opprette klient ved selvbetjening web, men tilsvarende kan gjøres ved [selvbetjenings api](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api#registrere-klient). 

## Registrer ny bruker på Min Side  
Bruk av selvbetjening forutsetter at din virksomhet har fått tilgang til Samarbeidsportalen, og at du er registrert bruker. Registrer ny bruker på [Min side](https://user.difi.no/auth/realms/difi/protocol/openid-connect/auth?client_id=samarbeid-lukket&response_type=code&scope=openid%20email%20profile&redirect_uri=https%3A//minside-samarbeid.digdir.no/openid-connect/difi_user_login&state=vjHgvGh7mAqpRsxRjcjrR4EWSMs7-NMSafbdrkmHdqY).

{% include note.html content=" For å kunne registrere ny bruker må du bruke epost-domenet til din virksomhet!" %}

## Opprette klient
- Logg inn på Min side og gå til "Integrasjoner" i høyremenyen.
- Velg det miljøet du vil opprette klienten i.

> For å opprette klient i produksjonsmiljøet, så må du få delegert rettigheter til dette i Altinn. Prosessen er beskrevet på [Tilgang til produksjonsmiljø](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#tilgang-i-produksjonsmilj%C3%B8)
- Velg "Ny integrasjon".

For forespørsel mot Oppslagstjenesten REST: 
- Velg "KRR" som "Difi-tjeneste". Du vil da få automatisk tildelt de riktige scopene.

For forespørsel mot Oppslag ved brukerinnlogging (brukerstyrt datadeling):
- Velg "Api-klient" som "Difi-tjeneste". Du må manuelt sette de riktige scopene
  krr:user, kontaktinformasjon.read, openid, profile
  
- Fullfør registreringen og trykk på "Opprett".

{% include note.html content="Ved opprettelse får du en klientID som må brukes i forespørselen mot ID-porten." %}
