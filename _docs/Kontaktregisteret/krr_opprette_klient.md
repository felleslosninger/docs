---
title: Opprette klient
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_opprette_klient
---

For å gjøre en forespørsel mot et eller flere av KRR sine endepunkt, må virksomheten sette opp en klient. 


{% include note.html content="For å bruke selvbetjening så forutsetter det at din virksomhet har fått tilgang til Samarbeidsportalen, og at du er registrert bruker.  
[Registrer ny bruker](https://user.difi.no/auth/realms/difi/login-actions/registration?client_id=samarbeid-lukket&tab_id=zSkmxGL1jZI) og logg inn på [Min side](https://user.difi.no/auth/realms/difi/protocol/openid-connect/auth?client_id=samarbeid-lukket&response_type=code&scope=openid%20email%20profile&redirect_uri=https%3A//minside-samarbeid.digdir.no/openid-connect/difi_user_login&state=vjHgvGh7mAqpRsxRjcjrR4EWSMs7-NMSafbdrkmHdqY).
Husk å bruke jobb-epost (epost-domenet til din virksomhet)! " %}

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
