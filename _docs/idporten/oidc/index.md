---
title: OpenID Connect i ID-porten
description: OpenID Connect i ID-porten
summary: "Logg inn på selvbetjeningsportalen for å lage en integrasjon med ID-porten OIDC"

sidebar: oidc
product: ID-porten

redirect_from: /oidc_index
---

* TOC
{:toc}

## Hvem kan bruke ID-porten OpenID Connect provider?
Tjenesteeiere som har godtatt ID-porten sine bruksvilkår kan ta i bruk denne tjenesten i produksjonsmiljø. Man kan gjerne teste løsningen i testmiljø før man godtar bruksvilkårene.

Se [bruksvilkår i Samarbeidsportalen](https://samarbeid.digdir.no)

## Rutine for tilgang
Følg [stegvis veiledning på Samarbeidsportalen](https://samarbeid.digdir.no/id-porten/ta-i-bruk-id-porten/94)

### Planlegging
Følgende punkter bør være en del av planleggingen (gjøres i samarbeid med Digitaliseringsdirektoratet)

* Tidsplan
* Produksjonsplan
* Beskrivelse av tjenesten
* Forventninger omkring volum og bruk, herunder eventuelle høy-trafikkperioder
* Påvirkning på ID-porten sin brukerstøtte


## Framgangsmåte

Vi ønsker at alle tjenester skal verifiseres via testmiljøet før de går i produksjon. Digitaliseringsdirektoratets Ver2-miljø er standard testmiljø for OIDC.

1. Opprett en klient via [selvbetjening på Samarbeidsportalen](https://minside-samarbeid.digdir.no/my-organisation/integrations/admin). Husk å oppgi ønsket redirect-uri'er og annen nødvendig informasjon, se [klient-registrering]({{site.baseurl}}/docs/idporten/oidc/oidc_func_clientreg)
   - Alternativt kan du be om å få en klient-integrasjon ved å sende e-post til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

 2. Konfigurer din føderasjonsprogramvare med informasjonen mottatt i punkt 1, og pek den mot ID-portens well-known endepunkt.
 3. Det skal nå være mulig å logge inn

## Test

Det må utføres en rekke verifikasjonstester for å teste blant annet innlogging og utlogging. [Verifikasjonstester finner du her]({{site.baseurl}}/docs/idporten/idporten/idporten_verifikasjonstester).  


### Testbrukere

Hvis du allerede har fått testbrukere utdelt kan du gjenbruke disse. Om du trenger nye testbrukere kan du kontakte <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

## Produksjonssetting

Når du har utført verifikasjonstestene og er klar for å prodsette så sender du en ny e-post til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> der du oppgir hvilken client_id som ble brukt i testmiljøet, ønsket redirect-uri'er og annen nødvendig informasjon.

## Problemer?

Om du opplever problemer med integrasjonen din: Kontakt <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> oppgi client_id og miljø og forklar problemet.
