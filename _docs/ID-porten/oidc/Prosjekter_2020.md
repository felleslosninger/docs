---
title: Prosjekter 2020
description: Prosjekter 2020
permalink: Prosjekter_2020.html
sidebar: oidc
---


 Denne "releasen" innheld større prosjekt og potensielle pilotar som me ynskjer å gjennomføre i 2020. 

Releasen vart produksjonssatt 2020-12-31

## Ny funksjonalitet:


#### Anskaffelse nye eID-avtaler - ID-porten og eSignering

 Oppstart og planlegging med tanke på nye avtaler fra november 2020. Innmeldt av produktsjef.  Dagens avtaler løper til november 2020, med mulighet for 1 års opsjon. Ut fra dagens situasjon med revisjon av nasjonalt rammeverk for eID er det ønskelig å komme over til nytt regime fra 2020.  Vil kreve mer ressurser enn årets anskaffelse, med tanke på at det nye rammeverket baserer seg på eIDAS i stedet for rammeverk for PKI. Vil kreve stor grad av interne ressurser, med supplering fra konsulenter. God erfaring med å dele opp i delprosjekter for kravstilling, anskaffelse og merkantil forberedelse. Trenger intern prosjektstøtte i tillegg til fagressursene og konsulentkjøp ca 300K. 


#### Notifisere norske eID til eIDAS

 FDF har sagt vi kan køyre prosjektet som notifiserer norske eID.  Det vil først og fremst vere jus, kravstiller og prosjektleiarkompetanse som bidreg her.  Men kan vere behov for endringar i eID-selector dersom ikkje alle leverandørane ønskjer å verte notifisert (vurdere å bruke eigen selector, ref. IDP-277) 


#### Pilotering av ansattporten

 Her trenger vi kunder før vi går igang !    lage ny "port" som selvstendig tjenste    buypass og commfides som egne applikasjonar (IDP-353, IDP-354)    minid som egen tjeneste (IDP-161)    selvbetjente circle-of-trusts (IDP-352)    aktørvalg som del av innloggingsflyten (trigga av "RAR"-request, kall mot Altinn Autorisasjon)    og sikkert mykje meir...   


#### OIDC-provider som kjerne i ny systemarkitektur

 Overgangen fra SAML-integrasjoner til OIDC-integrasjoner går raskt. 40% av trafikken i ID-porten går nå over OIDC.  Som følge av dette besluttet Difi i et prosjekt i 2019 at ID-portens systemarkitektur må endres til at OpenID Connect / Oauth2-delen blir kjernen i ny arkitektur. En må se på om det er mulig å bruke et hyllevare IAM-produkt istedet for dagens egenutviklede løsning. Samtidig skal vi tilrettelegge for bruk av skyteknologi, både PaaS og SaaS-løsninger der dette er mulig.  Omskriving til ny systemarkitektur begynner nå, og vil pågå kontinuerlig fram til dagens driftsavtale går ut i slutten av 2021.  I 2020 ser vi for oss å gjøre følgende:    Pilotering av ulike IAM-produkter     Flytte SSO-håndtering ut av dagens SAML-kjerne og "frem" til OIDC-provider    


#### Anskaffelse av ny driftsavtale

