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

## Teststrategier

Det er flere mulige strategier for å teste eFormidling og de passer gjerne i ulike faser av arbeidet med å ta i bruk
eFormidling.

### Teste i et lokalt mock-miljø

eFormidling tilbyr oppsett for et lokalt mock-miljø som lar en teste integrasjonspunktet. Alle eksterne tjenester er
mocket bort. Mock-miljøet anbefales som en støtte for utvikling og tidlig brøytetesting. Det er viktig å merke seg at
testing i Mock-miljøet ikke er tilstrekkelig for å verifisere at en integrasjon mot eFormidling fungerer. Se beskrivelse
av hvordan en kan ta i bruk mock-miljøet:

- [efm-mocks](https://github.com/felleslosninger/efm-mocks) (ekstern lenke)

### Teste i eFormidlings testmiljø

For å verifisere at en integrasjon mot eFormidling fungerer er det nødvendig å teste i eFormidlings testmiljø. 

For å teste i eFormidlings testmiljø må en installere et integrasjonspunkt og konfigurere det til å benytte testmiljø.
Vanlig installasjonveiledning kan følges, men før en går i gang må en sørge for å ha en fullverdig testvirksomhet:

- En velger et ekte eller syntetisk organisasjonsnummer for testvirksomheten
- En bestiller et testvirksomhetssertifikat utstedt til testvirksomhetens organisasjonsnummer
- En bestiller registrering av testvirksomheten i testmiljø for eFormidling og meldingstjenestene som skal brukes

#### Teste i eFormidlings testmiljø med ekte organisasjonsnummer

Testmiljøet for eFormidlings meldingstjeneste er realisert ved hjelp av en egen meldingstjeneste i Altinn Formidlings
produksjonsmiljø. Altinn Formidlings produksjonsmiljø støtter bare ekte organisasjonsnummer.

Altinn Digital Post og KS SvarUt og SvarInn benytter testmiljø som bare støtter syntetiske organisasjonsnummer. En kan
dermed ikke benytte ekte organisasjonsnummer mot alle meldingstjenestene som brukes av eFormidling. En kan likevel
benytte alle meldingstjenestene ved å legge inn brukernavn og passord for testvirksomhet hos Altinn Digital Post med
et annet organisasjonsnummer enn det integrasjonspunktet kjører. Det samme gjelder KS SvarUt og SvarInn.

#### Teste i eFormidlings testmiljø med syntetisk organisasjonsnummer

Dersom en ikke har et behov for å benytte ekte organisasjonsnummer i sitt testmiljø anbefales bruk av syntetisk
organisasjonsnummer. En må i så fall overstyre konfigurasjon av eFormidlings meldingstjeneste fra meldingstjenesten i
Altinn Formidlings produksjonsmiljø til en tilsvarende meldingstjeneste i Altinn Formidlings testmiljø. Dette oppnår
en med å legge følgende konfigurasjon i integrasjonspunktet:

```
difi.move.dpo.streamingserviceUrl=https://tt02.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc?wsdl
difi.move.dpo.brokerserviceUrl=https://tt02.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc?wsdl
difi.move.dpo.serviceCode=4192
difi.move.dpo.serviceEditionCode=270815
```

Merk at ved behov for flere installasjoner av integrasjonspunktet (f.eks. to utviklere med hver sin installasjon) i
samme miljø så vil en oppleve at installasjonene "stjeler" meldinger fra hverandre dersom de deler testvirksomhet. En
kan løse dette ved å bruke kanaler eller ved å å benytte en testvirksomhet per installasjon.

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

Et integrasjonspunkt som kan sende og motta med organisasjonsnummeret 987464291 er tilgjengelig i eFormidlings
testmiljø:

- [Enkelt brukergrensesnitt for test-integrasjonspunktet](https://qa-meldingsutveksling.difi.no/sa-mock/) (ekstern lenke)
- [Test-integrasjonspunktet](https://qa-meldingsutveksling.difi.no/integrasjonspunkt/digdir-leikanger/) (ekstern lenke)

For å teste varsling og reservasjon for innbyggere kan en selv registrere reservasjon, mobilnummer og/eller
e-postadresse for egne testbrukere i kontakt- og reservasjonsregisteret.

For å teste varsling for virksomheter kan en selv registrere mobilnummer og/eller e-postadresse i Altinn.

For å teste på vegne av må en ha to testvirksomheter i Altinn.

### Teste i eFormidlings produksjonsmiljø

En virksomhet som er klar til å ta i bruk eFormidling eller som skal gjøre endringer i oppsettet sitt anbefales å gjøre
enkel gjennomføre noen enkle tester for å bekrefte at kommunikasjon, tilganger og sertifikatoppsett fungerer som
forventet.

## Testcase

### Saksbehandling

#### Sending

> Gitt en annen virksomhet som bruker eFormidling <br>
> Når min virksomhet sender en saksbehandlingsmelding til denne virksomheten <br>
> Så skal denne virksomheten motta meldingen <br>
> Og så skal innholdet være som forventet <br>
> Og så skal min virksomhet få tilbake statusen LEVERT <br>
> Og så skal min virksomhet få tilbake en arkivmeldings-kvittering <br>
> Og så skal innholdet i arkivmeldings-kvitteringen være som forventet <br>

> Gitt en annen virksomhet som bruker KS SvarUt og SvarInn <br>
> Når min virksomhet sender en saksbehandlingsmelding til denne virksomheten <br>
> Så skal denne virksomheten motta meldingen <br>
> Og så skal innholdet være som forventet <br>
> Og så skal min virksomhet få tilbake statusen LEVERT <br>
> Og så skal min virksomhet få tilbake en arkivmeldings-kvittering <br>
> Og så skal innholdet i arkivmeldings-kvitteringen være som forventet <br>

> Gitt en annen virksomhet som bruker Altinn Digital Post <br>
> Når jeg sender en saksbehandlingsmelding til denne virksomheten <br>
> Så skal denne virksomheten motta meldingen <br>
> Og så skal innholdet være som forventet <br>
> Og så skal min virksomhet få tilbake statusen LEVERT <br>
> Og så skal min virksomhet få tilbake en arkivmeldings-kvittering <br>
> Og så skal innholdet i arkivmeldings-kvitteringen være som forventet <br>

#### Mottak

> Gitt en annen virksomhet som bruker eFormidling <br>
> Når denne sender en saksbehandlingsmelding til min virksomhet <br>
> Så skal min virksomhet motta meldingen i integrasjonspunktet <br>
> Og så skal innholdet være som forventet <br>
> Og så skal min virksomhet sende tilbake statusen LEVERT <br>
> Og så skal min virksomhet sende tilbake en arkivmeldings-kvittering <br>
> Og så skal innholdet i arkivmeldings-kvitteringen være som forventet <br>

> Gitt en annen virksomhet som bruker KS SvarUt <br>
> Når denne sender en melding til min virksomhet <br>
> Så skal min virksomhet motta meldingen i integrasjonspunktet <br>
> Og så skal innholdet være som forventet <br>
> Og så skal min virksomhet sende tilbake en arkivmeldings-kvittering <br>
> Og så skal innholdet i arkivmeldings-kvitteringen være som forventet <br>

### Taushetsbelagt saksbehandling

todo testcase taushetsbelagt saksbehandling

### Informasjon til innbygger

todo testcase informasjon til innbygger

### Vedtak til innbygger

todo testcase vedtak til innbygger

### Avtalt meldingsutveksling

todo testcase avtalt meldingsutveksling

### FIKS IO-meldingsutveksling

todo testcase fiks io meldingsutveksling

### Journalpost til eInnsyn

todo testcase journalpost til eInnsyn

### Møte til eInnsyn

todo testcase møte til eInnsyn

### Innsynskrav fra eInnsyn

todo testcase innsynskrav fra eInnsyn
