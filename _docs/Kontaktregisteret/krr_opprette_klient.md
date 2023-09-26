---
title: Opprette klient
description:
summary:

sidebar: krr_opprette_klient
product: KRR
redirect_from: /krr_opprette_klient
---

### Opprette klient
For å gjøre en forespørsel mot et eller flere av KRR sine endepunkt, må virksomheten sette opp en klient. For å bruke selvbetjening så forutsetter det at din virksomhet har tilgang til Samarbeidsportalen. Opprett bruker med din jobb-epostadresse og gå til "Min profil" på
[https://samarbeid.digdir.no.](https://samarbeid.digdir.no)

1. Gå til "integrasjoner" i høyremenyen og velg det miljøet du vil opprette klienten i. (*NB! For å opprette klient i produksjonsmiljøet, så må du få delegert rettigheter til dette i Altinn, fra din virksomhet. Prosessen er beskrevet på [Tilgang til produksjonsmiljø.]({{site.baseurl}}/docs/Maskinporten/maskinporten_sjolvbetjening_web#tilgang-i-produksjonsmilj%C3%B8)*)

2. Velg "Ny integrasjon"



For forespørsel mot Oppslagstjenesten REST: 

2a. Velg "KRR" som "Difi-tjeneste". Du vil da få tildelt de riktige scopene.
2b. Fullfør registreringen og trykk på "Opprett".
2c. Ved opprettelse får du en klientID som må brukes i forespørselen mot Maskinporten.



For forespørsel mot Oppslag ved brukerinnlogging (brukerstyrt datadeling):

3a. Velg "Api-klient" som "Difi-tjeneste". Du må manuelt sette de riktige scopene:
krr:user/kontaktinformasjon.read, openid, profile
3b. Fullfør registreringen og trykk på "Opprett".
3c. Ved opprettelse får du en klientID som må brukes i forespørselen mot ID-porten.
