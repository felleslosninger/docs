---
title: OpenID Connect i ID-porten
description: OpenID Connect i ID-porten
summary: "Logg inn på selvbetjeningsportalen for å lage en integrasjon med ID-porten OIDC"
permalink: oidc_index.html
sidebar: oidc
product: ID-porten

---
* TOC
{:toc}

## Hvem kan bruke ID-porten OpenID Connect provider?
Tjenesteeiere som har godtatt ID-porten sine bruksvilkår kan ta i bruk denne tjenesten i produksjonsmiljø. Man kan gjerne teste løsningen i testmiljø før man godtar bruksvilkårene.

Se [bruksvilkår i samarbeidsportalen](https://samarbeid.difi.no/bruksvilkar/bruksvilkar-difis-felleslosninger)

## Rutine for tilgang
Følg [stegvis veiledning på samarbeidsportalen](https://samarbeid.difi.no/felleslosninger/id-porten/ta-i-bruk-id-porten)

### Planlegging
Følgende punkter bør være en del av planleggingen (gjøres i samarbeid med Difi)

* Tidsplan
* Produksjonsplan
* Beskrivelse av tjenesten
* Forventninger omkring volum og bruk, herunder eventuelle høy-trafikkperioder
* Påvirkning på ID-porten sin brukerstøtte


## Framgangsmåte

Vi ønsker at alle tjenester skal verifiseres via testmiljøet før de går i produksjon.Digitaliseringsdirektoratetsitt [Ver2-miljø](https://samarbeid.difi.no/node/232) er standard testmiljø for OIDC.

1. Opprett en klient via [selvbetjening på Samarbeidsportalen](https://selvbetjening-samarbeid.difi.no/#/).  Husk å oppgi ønsket redirect-uri'er og annen nødvendig informasjon, se [klient-registrering](oidc_func_clientreg.html)
   - Alternativt kan du be om å få en klient-integrasjon ved å sende mail til <a href="mailto:idporten@difi.no">idporten@difi.no</a> eller meld inn klient via [web-skjema](https://forms.office.com/Pages/ResponsePage.aspx?id=dV4PJZxZFEaXBwztYRT_xpi569dsKKZOkO1f2ClqM-VUNVVMR0JKVjRHQlNPMU80VEs3NDc1MzNQUC4u)

 2. Konfigurer din føderasjonsprogramvare med informasjonen mottatt i punkt 1, og pek den mot ID-portens well-known endepunkt.
 3. Det skal nå være mulig å logge inn

## Test

Det må utføres en rekke verifikasjonstester for å teste blant annet innlogging og utlogging. [Verifikasjonstester finner du her](https://difi.github.io/idporten-integrasjonsguide//96_verifikasjonstest.html).  


### Testbrukere

Hvis du allerede har fått testbrukere utdelt kan du gjenbruke disse. Om du trenger nye testbrukere kan du kontakte <a href="mailto:idporten@difi.no">idporten@difi.no</a>

## Produksjonssetting

Client_secret i produksjonsmiljøet utleveres ikke i klartekst over e-post, men i ein kryptert zip-fil. Passord til denne filen sendes på sms. Derfor er det viktig at du angir mobiltelefonnummer for i bestillingen om. Om du bruker virksomhetssertifikat (anbefalt) trenger du ikke legge ved mobiltelefonnummer.

Når du har utført verifikasjonstestene og er klar for å prodsette så sender du en ny e-post til <a href="mailto:idporten@difi.no">idporten@difi.no</a> der du oppgir hvilken client_id som ble brukt i testmiljøet, ønsket redirect-uri'er og annen nødvendig informasjon.

## Problemer?

Om du opplever problemer med integrasjonen din: Kontakt <a href="mailto:idporten@difi.no">idporten@difi.no</a> oppgi client_id og miljø og forklar problemet.
