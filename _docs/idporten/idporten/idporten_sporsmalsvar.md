---
title: Ofte stilte spørsmål
description: Ofte stilte spørsmål
summary: "Her finner du ofte stilte spørsmål"

toc: false
sidebar: idporten_sidebar
product: ID-porten

redirect_from: /idporten_faq
---

* TOC
{:toc}

## Generelle spørsmål

## Sertifikat

Må vi anskaffe virksomhetssertifikat for å få etablert tilgang til ID-porten via OIDC?
Nei, men vi anbefaler Klientautentisering basert på JWT’er signert med virksomhetssertifikater. Vi støtter:

-   **client_secret_basic**  /  **client_secret_post**  - Klientautentisering basert på client_secret
-   **private_key_jwt**  - Klientautentisering basert på JWT’er signert med virksomhetssertifikater
https://difi.github.io/idporten-oidc-dokumentasjon/oidc_auth_codeflow.html#utstedelse-av-token-fra-token-endepunktet




***

#### Vi har valgt klientautentisering basert på JWT’er signert med virksomhetssertifikater. Kan vi i testmiljøet bruke selvgenererete sertifikater? Og hvordan er dette i testmiljøet?

Selvgenererete sertifikater kan ikke benyttes i test og produksjon. I testmiljøet kan kun testvirksomhetssertifikat benyttes.

## Utlogging

#### Gjelder Redirect tilbake til nettsted etter utlogging. Vi blir stående på utloggingsskjermen til ID-porten. Mener post_logout_redirect_uri skal være satt i logout-requesten. Hva er feil?

Etter at en har trigga utlogging blir en sendt tilbake til post_logout_redirect_uri. Denne må være forhåndsregistrert i ID-porten, det er ikke nok å bare sette den i requesten. Dersom dere stopper på utloggingssida i ID-porten mangler post_redirect_logout_uri på klientregistreringen.

***

#### Vi ønsker å etablere en tjeneste i testmiljøet. Vi har tre testmiljø internt. Må vi etablere tre klienter, eller kan vi registrere flere uri'er (redirect uri og post logout redirect uri) på samme klient?

Dette er opptil dere selv. Begge varianter er mulig. Det enkleste kan være å ha flere uri'er på samme klient.
***

#### Når jeg logger ut via annen tjeneste (SLO) så består sesjonen hos oss. Når jeg så logger ut hos oss (uten å ha noe aktiv sesjon hos dere), fungerer ikke redirect tilbake, og blir stående på siden. Hva skjer?

Om en logger ut fra annen tjeneste enn egen, vil tjenesten få informasjon via frontchannel logout dersom dette er satt opp for og støttet av klienten. Om sesjonen hos ID-porten er invalidert, finnes den ikke lengre. Om tjenesten da trigger endsession-endepunktet, vil vi ikke finne en sesjon hos oss. Vi returnerer bare til angitt post_logout_redirect_uri dersom vi får et id_token vi kan se at vi har utstedt OG at sesjonen eksisterer OG at klienten som har fått id_token har pre-registrert aktuelle post_logout_reduirect_uri.

***
