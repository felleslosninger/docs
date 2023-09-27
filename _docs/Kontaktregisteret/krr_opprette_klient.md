---
title: Opprette klient
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_opprette_klient
---

For å gjøre en forespørsel mot et eller flere av KRR sine endepunkt, må virksomheten sette opp en klient. For å bruke selvbetjening så forutsetter det at din virksomhet har tilgang til Samarbeidsportalen. Opprett bruker med din jobb-epostadresse og gå til "Min profil" på
[https://samarbeid.digdir.no.](https://samarbeid.digdir.no)

1. Gå til "integrasjoner" i høyremenyen og velg det miljøet du vil opprette klienten i. (*NB! For å opprette klient i produksjonsmiljøet, så må du få delegert rettigheter til dette i Altinn, fra din virksomhet. Prosessen er beskrevet på [Tilgang til produksjonsmiljø.]({{site.baseurl}}/docs/Maskinporten/maskinporten_sjolvbetjening_web#tilgang-i-produksjonsmilj%C3%B8)*)

2. Velg "Ny integrasjon"



a. For forespørsel mot Oppslagstjenesten REST: 

3a. Velg "KRR" som "Difi-tjeneste". Du vil da få tildelt de riktige scopene.
4a. Fullfør registreringen og trykk på "Opprett".
5a. Ved opprettelse får du en klientID som må brukes i forespørselen mot Maskinporten.



b. For forespørsel mot Oppslag ved brukerinnlogging (brukerstyrt datadeling):

3b. Velg "Api-klient" som "Difi-tjeneste". Du må manuelt sette de riktige scopene:
krr:user/kontaktinformasjon.read, openid, profile
4b. Fullfør registreringen og trykk på "Opprett".
5b. Ved opprettelse får du en klientID som må brukes i forespørselen mot ID-porten.
