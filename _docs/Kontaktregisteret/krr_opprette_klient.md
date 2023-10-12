---
title: Opprette klient
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_opprette_klient
---

For å gjøre en forespørsel mot et eller flere av KRR sine endepunkt, må virksomheten sette opp en klient. 



{% include note.html content="" %}

1) Logg inn på Min side og gå til "Integrasjoner" i høyremenyen. Velg det miljøet du vil opprette klienten i.
2) Velg "Ny integrasjon"
3)
a. For forespørsel mot Oppslagstjenesten REST: 
      Velg "KRR" som "Difi-tjeneste". Du vil da få automatisk tildelt de riktige scopene.

b. For forespørsel mot Oppslag ved brukerinnlogging (brukerstyrt datadeling):
   Velg "Api-klient" som "Difi-tjeneste". Du må manuelt sette de riktige scopene
   - krr:user/kontaktinformasjon.read
   - openid
   - profile
5) Fullfør registreringen og trykk på "Opprett".
      
   
{% include note.html content="Ved opprettelse får du en klientID som må brukes i forespørselen mot ID-porten." %}
