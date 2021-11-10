---
title: Endringslogg sentrale komponenter eFormidling
description: Endringslogg for sentrale komponenter
permalink: eformidling_releasenotes_sentrale_komp.html
product: eFormidling
sidebar: eformidling_sidebar
---


## ServiceRegistry 2.1.4
14.06.2021

**Endringer**
* Utvidet oppslag til å kunne signalisere at DSF-oppslag ikke er nødvendig.
* Lagt til ytelsestest profil
* Støtte for å deaktivere cache ved ytelsetesting
* Måling av svartider for utgåande forespørsler.

## ServiceRegistry 2.1.3
29.04.2021

**Endringer**
* Versjonen legger til støtte for bruk av maskinporten-autentisering (i tillegg til OIDC-provider), da det er Maskinporten som vil benyttes fra integrasjonspunktet fom. versjon 2.2.1. Som en konsekvens av dette, måtte det også gjøres en endring i bruk av KRR og DSF, da endepunktene brukt frem til nå (oppslagstjenesten-rest) kun støttet OIDC provider. SR vil nå rute forespørsler med OIDC-provider- og maskinporten-tokens til henholdsvis oppslagstjenesten-rest og oppslagstjenesten-maskinporten, basert på hvilken issuer tokenet har.



## ServiceRegistry 2.1.1
20.01.2021

**Endringer**
* Tilrettelegging for at integrasjonspunktet skal kunne brukes i fire-hjørners modell, ved å introdusere støtte for plugins. Eksempelprosjekt: https://github.com/felleslosninger/efm-ip-plugin-example - Connect to preview 
* Støtte for FIKS IO
* Validering av eget sertifikat, samt. sertifikat registrert i Virksert, både ved oppstart og sending av melding
* Ny raskere pollingoperasjon mot Altinn
* Asynkron sletteoperasjon i API for innkommende meldinger - mindre sårbar for nettverksfeil
* Innført støtte for JSON appender til stdout. Settes via property app.logger.stdoutAppender=JSON (default CONSOLE)
* Støtte for RFC5987 i name-attributt for filopplasting til utgående meldinger
* Nytt endepunkt for sletting av meldinger i status-API
* Introdusert logging av correlationId for meldingsflyt (og feil-logging)

**Feilrettinger**
* Oppslag mot KRR hvor mottakere mangler enten mobil eller epost vil ikke føre til feil under forsendelse, så lenge én av verdiene er satt (kun ett av mottakene for varsling er påkrevd)
* Rettet prefetching-feil i forsendelseskø (ActiveMQ), som kunne føre til at feilende forsendelser blokkerte køen
* Filtrering av innkommende meldinger fungerte ikke som forventet (API)
* Error-respons uten melding fra noark-klient førte til feilsituasjon
* Manglende timeout-config for serviceregistry-klient
* Fjernet logging-spam fra servicebus AMQP-klient under shutdown

[Detaljer](https://)


## ServiceRegistry 2.1.0
25.11.2020

**Endringer**: 
Versjonen inneholder to primærendringer: 
* Ny versjon av virksert klient som kun gjør CRL-validering (og ikke OCSP)
* FIKS IO-integrasjon

FIKS IO-integrasjonen vil ligge latent til den faktisk skal taes i bruk. Denne har et eget administrasjonsAPI for å håndtere mapping mellom eFormidlingsprosesser og FIKS-protokoller. API’et er dokumentert her: https://difi.github.io/felleslosninger/sr_internal_restdocs.html


[Detaljer](https://)


## ServiceRegistry 2.0.8
01.07.2020

**Sertifikat**: 
Legge til rette for nytt sertifikat i Serviceregistry fra 1. september 2020. Sertifikatendringa krever også minimum Integrasjonspunktet 2.1.2 for å unngå å måtte restarte integrasjonspunktet etter endring til det nye sertifikatet i Serviceregistry.  

**Diverse**: Mindre endringer.  

[Detaljer](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10178)




## ServiceRegistry 2.0.6
05.03.2020

**Bugfix DPI**: Oppslag av personnummer for DPI via eFormidling feilet i 2.0.5. Feilretting.

[Detaljer](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10175)
 
___
 
## ServiceRegistry 2.0.5
04.03.2020


**Avtalt-melding**: 
Støtte for avtalt-melding i eFormidling. Krever også minimum Integrasjonspunktet 2.1.0  

**Diverse**: Mindre endringer.  

[Detaljer](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10175)

___
 
## ServiceRegistry 2.0.4
28.01.2020

[Detaljer](https://difino.atlassian.net/secure/ReleaseNote.jspa?projectId=10000&version=10175)
 
___
