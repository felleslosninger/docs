---
title: Kom i gang med testing
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from:
- /eformidling_testing_env
- /eformidling_verifisere_forsendelser
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
Vanlig installasjonveiledning kan følges, men før en går i gang må en sørge for å ha en fullverdig testvirksomhet. En
må først velge om en ønsker å bruke ekte eller syntetisk organisasjonsnummer. Dersom en ikke har et behov for å benytte
ekte organisasjonsnummer i sitt testmiljø anbefales bruk av syntetisk organisasjonsnummer.

#### Teste i eFormidlings testmiljø med ekte organisasjonsnummer

Testmiljøet for eFormidlings meldingstjeneste er realisert ved hjelp av en egen meldingstjeneste i Altinn Formidlings
produksjonsmiljø. Altinn Formidlings produksjonsmiljø støtter bare ekte organisasjonsnummer.

For Altinn Digital Post og KS SvarUt og SvarInn benyttes testmiljø som bare støtter syntetiske organisasjonsnummer. En
kan dermed ikke benytte ekte organisasjonsnummer mot alle meldingstjenestene som brukes av eFormidling. En kan likevel
benytte alle meldingstjenestene ved å legge inn brukernavn og passord for testvirksomhet hos Altinn Digital Post med
et annet organisasjonsnummer enn det integrasjonspunktet kjører. Det samme gjelder KS SvarUt og SvarInn.

#### Teste i eFormidlings testmiljø med syntetisk organisasjonsnummer

For å bruke syntetisk organisasjonsnummer må en bytte testmiljøet for eFormidlings meldingstjeneste til et alternativt
testmiljø. En må i så fall overstyre konfigurasjon av eFormidlings meldingstjeneste fra test-meldingstjenesten i
Altinn Formidlings produksjonsmiljø til en tilsvarende test-meldingstjeneste i Altinn Formidlings testmiljø. Dette
oppnår en med å legge følgende konfigurasjon i integrasjonspunktet:

```
difi.move.dpo.streamingserviceUrl=https://tt02.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc?wsdl
difi.move.dpo.brokerserviceUrl=https://tt02.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc?wsdl
difi.move.dpo.serviceCode=4192
difi.move.dpo.serviceEditionCode=270815
```

Med et slikt oppsett kan en bruke samme syntetiske organisasjonsnummer på tvers av meldingstjenestene så lenge en passer
på når en bestiller tilganger og testvirksomhet: alt må bestilles til samme organisasjonsnummer, det er ingen sentral
koordinering av dette.

## Test-oppsett

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

For å teste varsling og reservasjon for innbyggere kan en selv registrere reservasjon, mobilnummer og/eller
e-postadresse for egne testbrukere i kontakt- og reservasjonsregisteret.

For å teste varsling for virksomheter kan en selv registrere mobilnummer og/eller e-postadresse i Altinn.

For å teste på vegne av må en ha to testvirksomheter i Altinn.

Ønskede tilganger bestilles fra:

- eFormidling, eInnsyn og Digital Post til Innbyggere: <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>
- Altinn Formidling og Altinn Digital Post: <a href="mailto:tjenesteeier@altinn.no">tjenesteeier@altinn.no</a>
- FIKS IO og KS SvarUt og SvarInn: <a href="mailto:fiks@ks.no">fiks@ks.no</a>

### Tilrettelegging for test av eFormidlings meldingstjeneste

Alternativt til selv å sette opp to integrasjonspunkt for å teste eFormidlings meldingstjeneste er det også tilrettelagt
for et enklere test-oppsett.

Et integrasjonspunkt som kan sende og motta med organisasjonsnummeret 987464291 er tilgjengelig i eFormidlings
testmiljø:

- [Enkelt brukergrensesnitt for test-integrasjonspunktet](https://qa-meldingsutveksling.difi.no/sa-mock/) (ekstern lenke)
- [Test-integrasjonspunktet](https://qa-meldingsutveksling.difi.no/integrasjonspunkt/digdir-leikanger/) (ekstern lenke)

### Tilrettelegging for test av Altinn Digital Post

Alternativt til selv å sette opp testvirksomhet for å teste Altinn Digital Post integrasjonspunkt er det også
tilrettelagt for et enklere test-oppsett.

Det er opprettet noen testvirksomheter i Altinn som en kan bruke som mottakere. Her vil en kunne logge inn for å finne
og se meldinger en har sendt. Disse virksomhetene og brukerne er **felles** for alle virksomheter i testmiljø. Pass på å
ikke sende sensitiv informasjon under testingen med disse virksomhetene.

| Orgnr     | Navn                     | Enhetstype  |  
|-----------|--------------------------|-------------|
| 910624474 | NESFLATEN OG BORRE       | KOMM        |
| 810624582 | SELJORD OG SØRVIK        | BEDR        | 
| 810568712 | ALTA OG KARDEMOMME BY    | BEDR        |
| 910568655 | AUKLANDSHAMN OG ELVEGARD | BEDR        |

Brukernavn og passord for testbrukere til virksomhetene over fåes ved å kontakte <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

### Lenker til testmiljø

- Altinn <a href="https://tt02.altinn.no">https://tt02.altinn.no</a>
- eBoks (Digital Post til Innbyggere) <a href="http://demo2-www.e-boks.no/">http://demo2-www.e-boks.no/</a>
- Digipost (Digital Post til Innbyggere) <a href="http://www.difitest.digipost.no/">http://www.difitest.digipost.no/</a>
- KS SvarUt og SvarInn <a href="https://test.svarut.ks.no/tjenester/">https://test.svarut.ks.no/tjenester/</a>

## Teste i eFormidlings produksjonsmiljø

En virksomhet som er klar til å ta i bruk eFormidling eller som skal gjøre endringer i oppsettet sitt anbefales å gjøre
noen enkle tester i produksjonsmiljøet for å bekrefte at kommunikasjon, tilganger og sertifikatoppsett fungerer som forventet. 

Ved testing før første gangs bruk av en ny meldingstjeneste kan det være greit å huske på:

- Dette bør gjøres sammen med en person fra arkivet som er kjent med sak/arkiv/fagsystemet til virksomheten.
- Avtal med <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> når dere vil verifisere så vi kan åpne tilganger på vår side. Definer en tidsramme for testing.
- Husk å teste alle meldingstjenester som virksomheten skal benytte
- Test gjerne flere forsendelser per meldingstype og varier størrelse, vedlegg osv.
- **NB!** Når testing foregår kan virksomheten motta reelle forsendelser i dette tidsrommet. Det er viktig at virksomheten er obs på dette så de ikke går glipp av viktige forsendelser.
- Om noe ikke skulle fungere gi straks beskjed til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> så vi kan fjerne tilganger og feilsøke problemet.
- Reelle forsendelser som mottas under testperioden uten at alt fungerer må sjekkes. Varsle avsender og be de sende på nytt.
- Hvordan vet jeg at det fungerer?
  - Ved forsendelser må en høre med mottaker at meldingen er kommet frem
  - Ved mottak skal meldingene bli pushet fra integrasjonspunktet inn i sak/arkiv/fagsystem
- Når en har verifisert at både mottak og sending av forsendelser fungerer melder en fra til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>.

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

> Gitt en annen virksomhet som bruker KS SvarInn <br>
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
