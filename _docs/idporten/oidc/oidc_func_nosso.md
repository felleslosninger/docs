---
title: SSO-fri innlogging
description: SSO-fri innlogging
summary: "En kunde kan konfigurere sin integrasjon til å ikke være deltager i ID-portens Circle-of-Trust."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_nosso
---

## Bakgrunn

ID-porten har siden oppstarten tilbudt single-signon (SSO), ved at alle tjenestene i føderasjonen tilhører samme Circle-of-Trust (CoT). Dette er en viktig funksjonalitet for å at innbygger skal ha en friksjonsfri opplevelse ved bruk av offentlige digitale tjenester, ved at man slipper hyppig re-autentisering.  Spesielt for samensatte tjenester, for eksempel såkalte lenketjenester, der innbygger "hopper" mellom ulike etater som del av en komplett tjenesteleveranse, er SSO en nøkkelfunksjonalitet.

Samtidig så har SSO i ID-porten på mange måter blitt sin egen fiende fra et sikkerhetsperspektiv, gitt det store antallet tjenester som nå er integrert. Det er ikke alle innbyggere som forstår at når de logger inn gjennom ID-porten, så er de samtidig innlogget i over 3000 ulike offfentlige digitale tjenester, og vi ser også at relavtivt få innbyggere (10-15%) faktisk foretar en aktiv utlogging fra tjenestene.  

Selv om noen tjenester bruker tvungen re-autentisering (SAML forceAuth eller OIDC prompt=login), så blir det fremdeles opprettet en aktiv SSO-sesjon i ID-porten.  Risikoen for innbygger som ikke logger ut, er derfor at en angriper som kan kontrollere brukers device (enten fysisk, eller fjerntilgang av komprommitert device), kan utnytte en aktiv SSO-sesjon til å komme seg inn på tjenester.



## Om SSO-fri innlogging

I Nye ID-porten så kan en kunde velge at en integrasjon IKKE skal delta i ID-portens felles SSO-sesjon, men heller ha sin egen, "egoistiske" sesjon.

Vi har valgt å la SSO-fri sesjoner være "fullverdig" sesjoner. Det vil si at ved første gangs innlogging til en SSO-fri klient, vil innbygger måtte autentisere seg (eller re-autentisere seg dersom om browseren allerede har felles SSO-sesjon), men ved etterfølgende innlogginger til samme klient slipper innbygger å re-autentisere seg, gitt at tidvinduene for inaktivitet eller max-sesjonslengde ikke er overskredet.

Vice versa vil innbygger også måtte autentisere seg første gang til en ordinær klient i felles CoT, dersom browser bare har en aktiv, egoistisk sesjon fra før.

Det kan være verdt å merke seg at selv om den/de egoistiske sesjonen(e) vil være avskilt fra felles SSO-sesjon som beskrevet ovenfor,  så deler begge sesjons-typene samme HTTP-sesjonscookie i ID-porten.  Det betyr også at timere for inaktivitet og max-lengde er felles.

#### Utlogging er fremdeles global

Vi har valgt å gjøre utlogging global.   Dette er både for å unngå til dels omfattende implementasjonskompleksitet, men også for å motvirke en funksjonell risiko for innbygger:  Innbygger aner ikke om en tjeneste er SSO-fri eller ikke (eller at det faktisk finnes et slikt teknisk konsept), men er kanskje gjennom årene blitt lært opp til å tro at utlogging i ID-porten logger ut av alle offentlige tjenester.  Ved å skulle begrense utlogging til å bare gjelde den sso-fri tjenesten, risikerer vi at innbygger tror hen er logget ut overalt, selv om felles SSO fremdeles er aktiv.   For å unngå dette, har vi valgt at utlogging logger ut av alle tjenester vi klarer, uavhengig av om initierende tjeneste var SSO-fri eller tilhørte felles CoT.



## Konfigurasjon

Kunde setter flagget `sso_disabled` i selvbetjening på OIDC-klienten for å aktivere funksjonaliteten.

SSO-fri innlogging er ikke støttet for SAML-klienter.
