---
title: Hurtigguide for autorisasjonsflyt i OIDC
description: Hurtigguide for autorisasjonsflyt i OIDC
summary: "Denne hurtiguiden beskriver hvordan en tar i bruk OpenID Connect (OIDC) og autorisasjonskodeflyt i ID-porten."
permalink: oidc_hurtigguide_autorisasjonsflyt.html

layout: page
sidebar: oidc
---

## Akseptere bruksvilkår

Tjenesteeiere som har godtatt ID-porten sine bruksvilkår kan ta i bruk denne tjenesten i produksjonsmiljø.

Man kan gjerne teste løsningen i testmiljø før man godtar bruksvilkårene.

Se
[https://samarbeid.difi.no/bruksvilkar/bruksvilkar-difis-felleslosninger](https://samarbeid.difi.no/bruksvilkar/bruksvilkar-difis-felleslosninger#1.%20Generelle%20bruksvilk%C3%A5r%20for%20Difis%20fellesl%C3%B8sninger)
 for mer informasjon om hvordan du kan bli tjenesteeier i ID-porten
 
## Framgangsmåte

Vi ønsker at alle tjenester skal verifiseres via testmiljøet før det går i produksjon. Difi sitt Ver2-miljø er standard testmiljø for OIDC.

 1. Be om å få en klient-integrasjon ved å sende mail til <a href="mailto:idporten@difi.no">idporten@difi.no</a> eller meld inn klient via [web-skjema](https://forms.office.com/Pages/ResponsePage.aspx?id=dV4PJZxZFEaXBwztYRT_xpi569dsKKZOkO1f2ClqM-VUNVVMR0JKVjRHQlNPMU80VEs3NDc1MzNQUC4u) Husk å oppgi ønsket redirect-uri're og annen nødvendig informasjon, se [klient-registrering](oidc_func_clientreg.html) 
 2. Konfigurer din føderasjonsprogramvare med informasjonen mottatt i punkt 1, og pek den mot ID-portens well-known endepunkt.
 3. Det skal nå være mulig å logge inn

## Test 

Det må utføres en rekke verifikasjonstester for å teste blant annet innlogging og utlogging. [Verifikasjonstester finner du her](https://difi.github.io/idporten-integrasjonsguide//96_verifikasjonstest.html)

### Testbrukere

Visst du allerede har fått testbrukere utdelt kan du gjenbruke disse. Om du trenger nye testbrukere kan du kontakte <a href="mailto:idporten@difi.no">idporten@difi.no</a>

## Produksjonssetting

Client_secret i produksjonsmiljøet utleveres ikke i klartekst over e-post, men i ein kryptert zip-fil. Passord til denne filen sendes på sms. Derfor er det viktig at du angir mobiltelefonnummer for i bestillingen om. Om du bruker virksomhetssertifikat trenger du ikke legge ved mobiltelefonnummer.

Når du har utført verifikasjonstestene og er klar for å prodsette så sender du en ny e-post til <a href="mailto:idporten@difi.no">idporten@difi.no</a> der du oppgir hvilken client_id som ble brukt i testmiljøet, ønsket redirect-uri'er og annen nødvendig informasjon.

## Problemer?

Om du opplever problemer med integrasjonen din: Kontakt <a href="mailto:idporten@difi.no">idporten@difi.no</a> oppgi client_id og miljø og forklar problemet. 
