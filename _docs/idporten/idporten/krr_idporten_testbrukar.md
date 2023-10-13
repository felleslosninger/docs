---
title: Testing som krever innlogging gjennom ID-porten
description: Innlogging ID-porten
summary:

toc: false
sidebar: krr_sidebar
product: KRR

redirect_from: /krr_idporten_testbrukar
---

For å teste KRR-integrasjoner i verifikasjonsmiljøene Ver2/Test som krever ID-porten-innlogging (eks. MinProfil, Oppslag ved innlogget bruker), kan man benytte seg av ID-porten testbrukere.


## TestID

Vi anbefaler at alle kunder bruker **TestID** når de skal teste ID-porten. TestID tilbyr å velge [sikkerhetsnivå](https://eid.difi.no/nb/sikkerhet-og-personvern/ulike-sikkerhetsniva). 

![TestID logo]({{site.baseurl}}/assets/testid.svg)

TestID støtter innlogging med **syntetisk personidentifikator**  (en må legge til +80 på måned-sifrene), og man slipper da risiko for å blande sammen test- og produksjonsdata.

TestID har ikke noe passord, så man slipper å ta kontakt med Digdir for å tildelt, opprettet eller nullstilt brukere.

Bruk [Tenor testdata-søk](https://www.skatteetaten.no/skjema/testdata/) til å finne test-brukere fra Test-Folkeregisteret.


## BankID og MinID

For de som ikke kan bruke syntetiske fødselsnummer, tilbyr vi et sett med standard testbrukere med BankID med personnumre som ikke finnes i Folkeregisteret. Det er også mulig å opprette og logge inn med MinID for tjenester med betydelig sikkerhetsnivå (nivå 3).


Les mer om [ID-porten testbrukere](https://docs.digdir.no/docs/idporten/idporten/idporten_testbrukere.html).
