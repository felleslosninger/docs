---
title: Integrasjonsguide for Ansattporten
description: Ansattporten er en kopi av ID-porten men der funksjonaliteten er tilpasset innlogging i ansatt/representasjonskontekst.

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_guide
---

Ansattporten er en egen innloggingtjeneste med funksjonalitet som skiller seg noe fra ID-porten, slik at den skal være mer hensiktmessig å bruke i ansattkontekst eller i andre situasjoner der det er ønskelig å opptre i et representasjonsforhold på vegne av andre virksomheter eller personer.

Du finner mer overordned informasjon om Ansattporten ved å klikke [her](ansattporten_om.html)

# Beskrivelse av bruksscenarioet

På denne siden beskriver vi hvordan du setter opp en tjeneste som bruker Ansattporten til punkt-autentisering.   Dersom du heller vil lese om hvordan tjenesten din kan kreve innlogging på vegne av en virksomhet, må du klikke [her](ansattporten_representasjon.html). 

# Brukerreise

Punkt-autentisering er den enkleste brukerreisen.  I dette scenariet utfører brukeren en innlogging til en tjeneste, og får etablert en isolert SSO-sesjon kun til denne tjenesten:

1. Bruker klikker login-knapp hos tjeneste.  
2. Bruker autentiserer seg med eID gjennom Ansattporten.
3. Bruker blir sendt tilbake til tjenesten.

Ulikt ID-porten så vil ikke brukeren få opprettet en felles SSO-sesjon i Ansattporten.  Dersom brukeren forsøker å logge på en annen tjeneste rett etterpå, med samme browser, så må brukeren autentisere seg på nytt.  Men dersom brukeren forsøker å logge på samme tjeneste på nytt, så vil vil hen bli logga inn automatisk.

# Protokoll-flyt

Punkt-innlogging i Ansattporten har helt identisk flyt som for innlogging med ID-porten:

<div class="mermaid">
sequenceDiagram

participant B as Bruker
participant C as Tjeneste
participant A as Ansattporten

B->>C: Klikker "login" på tjeneste
C-->>A: /authorize (redirect)
note over A: sluttbruker autentiserer seg
A-->>C: code (redirect)
C->>+A: /token(code)
A->>-C: id_token
note over B,C: innlogget i tjenesten

</div>

Denne flyten er grundig dokumentert på denne siden  [innlogging med ID-porten](../../docs/idporten/oidc/oidc_guide_idporten.html),  men med følgende endringer:


* Du finner Ansattporten-spesifikk protokoll-definisjon [her](ansattporten_protocol.html).
* Du må selvsagt bruke Ansattporten sine endepunkter, som du finner [her]( [ansattporten_wellknown.html]).  
* Klienten du bruker, må være registrert i Selvbetjening til å bruke Ansattporten og ikke ID-porten.


# Isolert SSO

SSO-oppførselen i Ansattporten er realisert vha funksjonaliteten [isolert SSO-sesjon](../../docs/idporten/oidc/oidc_func_nosso.html), der Ansattporten overstyrer flagget `sso_disabled` til true uavhengig av hva kunden selv har satt i selvbetjening.   Merk at dette også  betyr at Ansattporten ikke tilbyr individuelle sesjonslevetider per tjeneste, men isteden så deler alle tjenestene en felles underliggende http-sesjonscookie der max-levetid på 120 min starter ved innlogging til første tjeneste, og inaktivitetstimer på 30 min gjelder for unionen av de innloggede tjenestene. 

Dette betyr også at kunder må støtte utlogging både fra egen tjeneste, men også håndtere utloggingsforespørsler (front_channel_logout) fra Ansattporten initiert av en annen tjeneste.


# Utlogging

Selv om Ansattporten ikke har SSO på tvers av tjenester, bør likevel tjenesten din kunne håndtere [utlogging på samme måten som ID-porten](../../docs/idporten/oidc/oidc_protocol_logout.html).  Dvs. både tilby brukeren å kunne logge ut, samt å måtte håndtere utloggingsforsepørsler  initiert fra andre tjenester i Ansattporten (front_channel_logout).
