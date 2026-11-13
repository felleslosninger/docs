---
title: Vedlegg D: Begrenset SSO
description: Løsningsforslag til beslutning

sidebar: oidc
product: ID-porten
redirect_from: /idporten_sso_grupper_vedlegg_D_handover
---

Dette er et av alternativene for løsning for [sso-grupper](oidc_sso_grupper).

## SSO handover

SSO handover er mer streng variant, der en bruker ikke bare kan "dukke opp" hos den etterfølgende klienten og få SSO. 
I stedet må de to klientene aktivt samarbeide for å overføre brukeren fra A til B. 


Me kallar dette "client context transfer", og har skrive eit [utkast til mogeleg løysing](https://github.com/joergenb/oauth/blob/main/client_context_transfer.md).



SSO-relasjonene fra "begrenset", evt "sentralisert" modell kan bli et naturlig grunnlag for å avgjøre mellom hvilke klienter slik kontekst kan sendes.
