---
title: Vedlegg C: Sentralisert SSO-gruppe
description: Løsningsforslag til beslutning

sidebar: oidc
product: ID-porten
redirect_from: /idporten_sso_grupper_vedlegg_C_sentralisert
---

Dette er et av alternativene for løsning for [sso-grupper](oidc_sso_grupper).

## Hva er sentralisert sso-gruppe ?

I dette alternativet lar vi en SSO-gruppe bli et eget administrasjonsobjekt, eid av en organisasjon eller delegert administrator, der medlemmer deler SSO seg imellom. 

Hver gruppe vil få en identifikator.  Klienter som deltar i flere grupper må angi hvilken gruppe-identifikator en påloggingsforespørsel gjelder runtime.


Vi velger å ikke gå videre med dette nå fordi:

- det krever et nytt administrasjonsobjekt og en rollemodell, med regler for eierskap, delegering og godkjenning,
- det er vesentlig dyrere å realisere, blant annet fordi det forutsetter støtte i autorisasjonsløsning og samtykkeprosesser,
- grupper må forvaltes løpende, og kan bli foreldet eller få medlemmer som ikke lenger skal være der,
- det må avklares hva som skjer når en klient er med i flere grupper, og modellen støtter ikke ensidig tillit.

Den er best egnet for store grupper (over ca. 5 klienter) og tverrorganisatoriske behov, og kan revurderes dersom SSO-relasjonene blir store og uoversiktlige (se kapittel 9).
