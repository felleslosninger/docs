---
title: KRR testbrukere
description: KRR testbrukere
summary:

toc: false
sidebar: krr_sidebar
product: KRR

redirect_from: /krr_testbrukere
---

## Utfasing av "vanlig" fødselsnummer

Som et ledd i å bedre informasjonssikkerhet og personvern, så faser Digdir ut bruk av fødselsnummer som følger vanlig syntaks. Vi oppfordrer alle om å gå over til syntetiske fødselsnummer i testing.

## Hva mener vi med syntetisk testbruker?

Syntetiske testbrukere har en personidentifikator der man som hovedregel har plusset på 80 på fødselsmåneden og kontrollsifferene er regnet ut i fra det.


## Registrer/opprett testbruker i KRR

### MinID testbrukar

Ved å opprette MinID bruker,vil brukeren samtidig bli registrert i Kontakt- og reservasjonsregisteret (KRR).

Framgangsmåte:
<br>
- Logg inn og hent fødselsnummer på aktuell Tenor testbruker i [Tenor testdatasøk](https://www.skatteetaten.no/skjema/testdata/).
- Registrer testbruker i KRR ved å følge oppskriften [Opprette testbruker (syntetisk PID) selv i testmiljøet TEST](https://docs.digdir.no/docs/idporten/idporten/idporten_testbrukere.html#opprette-testbruker-syntetisk-pid-selv-i-testmilj%C3%B8et-test).
- sjekke om testbruker er registrert i KRR gjennom tjenesten [MinProfil](https://docs.digdir.no/docs/Kontaktregisteret/krr_sluttbrukerinnstillinger) i testmiljøet. Du kan logge inn med både TestID og MinID.  

### Testbrukar utanfor Tenor testdatabase
Ønsker du en testbruker som ikke finnes i Tenor, kan du f.eks bruke tjenesten til [Norske testdata (Ekstern tjeneste)](https://norske-testdata.no/fiktivt-fnr/). 

Merk! For at disse skal kunne benyttes i ID-porten og KRR, må disse opprettes med +80 i månedsfeltet i fødselsnummeret. 


## Endre kontaktinformasjon på syntetisk testbruker i KRR
Det er mulig å endre kontaktinformasjon på syntetiske testbrukere ved å logge inn på MinProfil.
For å endre kontaktinformasjon på syntetiske brukere, velg TestID som innloggingsmetode.

<br>
{% include note.html content=" Dersom du legger inn egen kontaktinformasjon på en testbruker, kan du risikere å motta varslinger fra virksomheter som benytter KRR i testmiljøet." %}
<br>

## KRR testbrukere med ulike attributter i test-Folkeregisteret.
Vi har et sett med "statiske" brukere. Disse testbrukerene finner du nå i [Tenor testdatasøk](https://www.skatteetaten.no/skjema/testdata/) og er testbrukere med syntetiske fødselsnummer (+80 i mnd). Testbrukerene innehar følgende attributter fra KRR som tilbakestilles hver dag:

- Med mobil, e-post og digital postkasse
- Med mobil og e-post
- Kun mobil
- Kun e-post
- Slettet fra KRR
- Utgått på 18mnd regel

  Merk! Postkasse må testes ved andre tester/testbrukere.


