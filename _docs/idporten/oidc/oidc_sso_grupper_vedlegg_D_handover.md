---
title: Vedlegg D: Begrenset SSO
description: Løsningsforslag til beslutning

sidebar: oidc
product: ID-porten
redirect_from: /idporten_sso_grupper_vedlegg_D_handover
---

Dette er et av alternativene for løsning for [sso-grupper](oidc_sso_grupper).

## SSO handover

SSO handover er mer streng variant enn "begrenset" eller "sentralisert".  Ved SSO-handover kan ikke lenger en bruker bare kan "dukke opp" hos den etterfølgende klienten og få SSO dersom den første klienten er inkluder på følger-lista. I stedet må de to klientene aktivt samarbeide for å overføre brukeren fra A til B. 


Me kallar dette "client context transfer", og har skrive eit [utkast til mogeleg løysing](https://github.com/joergenb/oauth/blob/main/client_context_transfer.md).


SSO-relasjonene fra "begrenset", evt "sentralisert" modell kan bli et naturlig grunnlag for å avgjøre mellom hvilke klienter slik kontekst kan sendes.


Spørmålet her er om det gir noen verdi å ha ID-porten inn i loopen mellom klienten,  en kunne jo like gjerne realisere dette partene seg imellom  dersom B stoler såpass på A at den kan opprette brukersesjon direkte. 