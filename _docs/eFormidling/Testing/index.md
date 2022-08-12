---
title: Kom i gang med testing
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Formålet med denne siden er å støtte de som utvikler egne integrasjoner mot eFormidling å teste at disse fungerer som de
skal.

1. TOC
{:toc}

## Testcase

> Gitt en annen virksomhet som bruker eFormidling
> Når jeg sender en saksbehandlingsmelding til denne virksomheten
> Så skal jeg få tilbake status LEVERT
> Og så skal jeg få tilbake en arkivemeldings-kvittering

> Gitt en annen virksomhet som bruker KS SvarUt og SvarInn
> Når jeg sender en saksbehandlingsmelding til denne virksomheten
> Så skal jeg få tilbake status LEVERT
> Og så skal jeg få tilbake en arkivemeldings-kvittering

> Gitt en annen virksomhet som bruker Altinn Digital Post
> Når jeg sender en saksbehandlingsmelding til denne virksomheten
> Så skal jeg få tilbake status LEVERT
> Og så skal jeg få tilbake en arkivmeldings-kvittering

TODO alle prosesser, sende og motta
TODO instruksjoner - varsling, åpningskvittering, sender-ref, receiver-ref, osv
TODO innhold i responser

## Teste i et lokalt mock-miljø

eFormidling tilbyr oppsett for et lokalt mock-miljø som lar en teste integrasjonspunktet. Alle eksterne tjenester er
mocket bort. Mock-miljøet anbefales som en støtte for utvikling og tidlig brøytetesting. Det er viktig å merke seg at
testing i Mock-miljøet ikke er tilstrekkelig for å verifisere at en integrasjon mot eFormidling fungerer. Se beskrivelse
av hvordan en kan ta i bruk mock-miljøet:

- [efm-mocks](https://github.com/felleslosninger/efm-mocks)

## Teste i eFormidlings testmiljø

For å verifisere at en integrasjon mot eFormidling fungerer er det nødvendig å teste i eFormidlings testmiljø. 

For å teste i eFormidlings testmiljø må en installere et integrasjonspunkt og konfigurere det til å benytte testmiljø.
Vanlig installasjonveiledning kan følges, men før en går i gang må en sørge for å ha en fullverdig testvirksomhet:

- En velger et ekte eller syntetisk organisasjonsnummer for testvirksomheten
- En bestiller et testvirksomhetssertifikat utstedt til testvirksomhetens organisasjonsnummer
- En bestiller registrering og tilganger av testvirksomheten i testmiljø for eFormidling og meldingstjenestene som skal
brukes

Begrensninger ved bruk av ekte organisasjonsnummer:

- Testiljøet for Altinn Digital Post støtter ikke bruk av ekte organisasjonsnummer
- Testmiljøet for KS SvarUt og SvarInn støtter ikke bruk av ekte organisasjonsnummer

Begrensninger ved bruk av syntetisk organisasjonsnummer:

- Testmiljøet for eFormidlings meldingstjeneste støtter ikke bruk av syntetisk organisasjonsnummer (fordi denne er
realisert med en egen meldingstjeneste i Altinn Formidlings produksjonsmiljø som bare støtter ekte organisasjonsnummer)

Workarounds ved bruk av ekte organisasjonsnummer:

- TODO kan en overstyre Altinn Digital Post til å bruke et annet organisasjonsnummer enn integrasjonspunktets?
- TODO kan en overstyre KS SvarUt og SvarInn til å bruke et annet organisasjonsnummer enn integrasjonspunktets?

Workarounds ved bruk av syntetisk organisasjonsnummer:

- TODO kan en overstyre Altinn Formidling til TT02 ved hjelp av konfigurasjon? eller må en bytte også service-registry osv?
- TODO eventuelt ta i bruk Digdirs interne testmiljø (nb: kontinuerlig leveranse)

Merk at ved behov for flere installasjoner (f.eks. en per utvikler + et eget testmiljæ) av integrasjonspunktet i samme
miljø så vil en oppleve at installasjonene "stjeler" meldinger fra hverandre. En kan løse dette ved å bruke kanaler
eller ved å å benytte en testvirksomhet per installasjon.

Avhengig av hvilke meldingstjenester som brukes vil det være behov for testbrukere og testvirksomheter å sende til og
motta fra:

| Test                                                                          | Krav til testbruker                                                                                                                                                                                                     |
|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sende post til innbygger med Digipost for å se hvordan det ser ut             | Fødselsnummer tilgjengelig i Digipost, Kontakt- og reservasjonsregisteret (uten reservasjon og valgt Digipost som postkasse) og ID-porten                                                                               |
| Sende post til innbygger med eBoks for å se hvordan det ser ut                | Fødselsnummer tilgjengelig i eBoks, Kontakt- og reservasjonsregisteret (uten reservasjon og valgt eBoks som postkasse) og ID-porten                                                                                     |
| Sende post til innbygger med Altinn Digital Post for å se hvordan det ser ut  | Fødselsnummer tilgjengelig i Altinn Digital Post, Kontakt- og reservasjonsregisteret (uten reservasjon og uten postkasse valgt) og ID-porten                                                                            |
| Sende post til virksomhet med Altinn Digital Post for å se hvordan det ser ut | Organisasjonsnummer (et annet enn ens eget) tilgjengelig i Altinn Digital Post, fødselsnummer med rettigheter til å lese post for virksomheten i Altinn Digital Post, Kontakt- og reservasjonsregisteret og ID-porten   |                                                 
| Sende post til og motta post fra annen virksomhet med KS SvarUt og SvarInn    | Organisasjonsnummer (et annet enn ens eget) tilgjengelig i KS SvarUt og SvarInn, fødselsnummer med rettigheter til å lese post for virksomheten i KS SvarUt og SvarInn, Kontakt- og reservasjonsregisteret og ID-porten |                                                 
|                                                                               | Eventuelt kan en samarbeide med en annen virksomhet som bruker KS SvarUt og SvarInn testmiljø                                                                                                                           | 
| Sende post til og motta post fra annen virksomhet med eFormidling             | Organisasjonsnummer (et annet enn ens eget) tilgjengelig i Altinn Formidling slik at en har to testvirksomheter med hvert sitt integrasjonspunkt                                                                        |                                                 
|                                                                               | Eventuelt kan en sende til/fra seg selv                                                                                                                                                                                 | 
|                                                                               | Eventuelt kan en sende til/fra et integrasjonspunkt som er tilgjengelig i eFormidlings testmiljø                                                                                                                        | 
|                                                                               | Eventuelt kan en samarbeide med en annen virksomhet som bruker eFormidlings testmiljø                                                                                                                                   | 
| Motta post fra innbygger og virksomheter fra KS eDialog                       | Fødselsnummer tilgjengelig i ID-porten                                                                                                                                                                                  | 

For å teste varsling og reservasjon for innbyggere kan en selv registrere reservasjon, mobilnummer og/eller
e-postadresse i kontakt- og reservasjonsregisteret.

For å teste varsling for virksomheter kan en selv registrere mobilnummer og/eller e-postadresse i Altinn.

For å teste på vegne av må en ha to testvirksomheter i Altinn.

## Teste i eFormidlings produksjonsmiljø

..
