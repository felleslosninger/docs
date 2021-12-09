---
title: Introduksjon
description: ""
summary: ""
permalink: eformidling_introduksjon.html
product: eFormidling
sidebar: eformidling_sidebar
---

Dette er den tekniske dokumentasjonen for eFormidling. Formålet er å støtte arkitekter, utviklere og driftspersonell hos
offentlige virksomheter og deres leverandører i innføring og bruk av eFormidling.

Se gjerne Samarbeidsportalen for en helt overordnet ikke-teknisk introduksjon til eFormidling:

- [Dette er eFormidling](https://samarbeid.digdir.no/eformidling/dette-er-eformidling/46) (ekstern lenke)

## Hva er eFormidling?
eFormidling lar din virksomhet:
- sende meldinger til mottakende virksomhets foretrukne kanal
- sende meldinger til mottakende innbygggers foretrukne kanal
- motta innkommende meldinger på ønsket kanal

eFormidling brukes av statlige virksomheter. Alle norske virksomheter og innbyggere kan nås gjennom eFormidling.
Funksjonaliteten i eFormidling kan tas i bruk gjennom:

- [fagsystem som allerede støtter integrasjon med eFormidling](todo.html)
- [egne integrasjoner direkte mot eFormidling](todo.html)

## Hva kan sendes og mottas med eFormidling?
eFormidling støtter meldinger med både strukturert og ustrukturert innhold. Meldinger med egendefinert innhold kan også
sendes. Hvilket innhold som støttes avhenger av sammenhengen en melding sendes i og mottakerens kapabiliteter. Mulig
innhold inkluderer:

- XML-baserte format
- JSON-baserte format
- PDF-filer
- Tekstfiler

## I hvilke sammenhenger kan eFormidling brukes?
Meldinger kan sendes i mange ulike sammenhenger og må i mange tilfeller behandles ulikt avhengig av sammenhengen. For
eksempel vil mottakeren i noen sammenhenger ønske å:

- Rute meldinger til ulike fagsystem
- Knytte enkelte meldinger til strengere tilgangskontroller
- Legge meldinger i ulike arbeidskøer 

Alle meldinger i eFormidling sendes derfor som del av en gitt sammenheng. I eFormidling kalles disse sammenhengene
prosesser. En mottaker støtter meldingsutveksling i forbindelse med en eller flere prosesser. En mottaker støtter en
gitt prosess gjennnom en eller flere meldingstjenester som igjen støtter en eller flere dokumenttyper. Dokumenttypene
definerer hvilket innhold som kan sendes. Prosesser, meldingstjenester og dokumenttyper utgjør mottakerens
kapabiliteter.

Prosesser som støttes av eFormidling inkluderer:

| Prosess                                                                                           | Meldingstjenester                                                                  | Dokumenttype | Adressering         |
| ------------------------------------------------------------------------------------------------- | -----------------------------------------------------------------------------------| ------------ | ------------------- |
| [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)                                  | Altinn Formidling (DPO)<br>KS SvarUt/SvarInn (DPF)<br>Altinn Digital Post (DPV)    | Arkivmelding | Organisasjonsnummer |
| [Taushetsbelagt<br>saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html) | Altinn Formidling (DPO)<br>KS SvarUt/SvarInn (DPF)<br>Altinn Digital Post (DPV)    | Arkivmelding | Organisasjonsnummer |
| [Innsynskrav](eformidling_funksjonalitet_innsynskrav.html)                                        | eInnsyn (DPE)                                                                      |              | Organisasjonsnummer |
| [Postjournal](eformidling_funksjonalitet_postjournal.html)                                        | eInnsyn (DPE)                                                                      |              | Organisasjonsnummer |
| [Møtekalender](eformidling_funksjonalitet_motekalender.html)                                      | eInnsyn (DPE)                                                                      |              | Organisasjonsnummer |
| [Informasjon til innbygger](eformidling_funksjonalitet_informasjon_til_innbygger.html)            | Digital Postkasse (DPI)<br>Altinn digital post (DPV)                               |              | Fødselsnummer       |
| [Vedtak til innbygger](eformidling_funksjonalitet_vedtak_til_innbygger.html)                      | Digital Postkasse (DPI)<br>Altinn digital post (DPV)                               |              | Fødselsnummer       |
| [Avtalt](eformidling_funksjonalitet_avtalt.html)                                                  | Altinn Formidling (DPO)                                                            | Avtalt       | Organisasjonsnummer |
| [FIKS IO](eformidling_funksjonalitet_fiks_io.html)                                                | FIKS IO (DPFIO)                                                                    | FIKS IO      | FIKS IO kontonummer |

eFormidling sikrer at mottaker bestemmer hvilke meldingstjeneste meldinger skal sendes gjennom. Selv om en mottaker
rent teknisk kan motta en gitt melding med en gitt meldingstjeneste så inkluderes bare foretrukne meldingstjenestener i
mottakerens kapabiliteter. Hvilke meldingstjeneste som brukes avhenger av hvilke prosess en melding sendes som del av og
mottakers kapabiliteter. Se gjerne mer om dette på:

- [Hente virksomhets foretrukne kanal](eformidling_funksjonalitet_hente_virksomhets_foretrukne_kanal.html)
- [Hente innbyggers foretrukne kanal](eformidling_funksjonalitet_hente_innbyggers_foretrukne_kanal.html)

## Hvordan fungerer eFormidling?

eFormidling er ikke i seg selv en meldingstjeneste, men leverer derimot en mellomvare (integrasjonspunktet) som gir
fagsystem ett enkelt grensesnitt for meldingsutveksling uavhengig av prosess og meldingstjeneste. Integrasjonspunktet
installeres hos virksomhetene (eller deres leverandører) og integreres mot et eller flere fagsystem. Fagsystem kan
benytte integrasjonspunktet over følgende grensesnitt:

- [eFormidling 2](eformidling_utvikling_api_eformidling2.html)
- [BEST/EDU](eformidling_utvikling_api_bestedu.html) (fases ut)

I tillegg leverer eFormidling:

- en sentral adressetjeneste (service registry) som brukes av integrasjonspunktet for å slå opp foretrukket kanal for 
  mottaker
- diverse støttetjenester (administrasjon, overvåking, feilsøking, ol)

Overordnet arkitekturskisse:
<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant C as Adressetjeneste
participant D as Meldingstjeneste<br>(f.eks. KS FIKS)
A->>B: Kapabilitetsoppslag
B->>C: Kapabilitetsoppslag
A->>B: Utgående melding
B->>D: Utgående melding
D->>B: Innkommende melding
B->>A: Innkommende melding
</div>

Før en virksomhet sender en melding gjøres et kapabilitetsoppslag for å se om mottakeren støtter den aktuelle prosessen
meldingen skal sendes som del av og i så fall med hvilke meldingstjeneste (f.eks KS FIKS) mottakeren ønsker å motta
meldingen. Virksomheten sender så meldingen til mottakers foretrukne meldingstjeneste.

Virksomhetens fagsystem mottar kontinuerlig innkommende meldinger fra virksomhetens integrasjonspunkt som igjen mottar
meldingene fra meldingstjenestene virksomheten bruker.

## Integrasjonspunktet

blabla


## KOSMOS

Kontinuerlege oppdateringar for sikker meldingsutveksling i offentleg sektor - KOSMOS er ein Java-applikasjon (JAR) som køyrer som ei teneste, side om side med eit integrasjonspunkt (også JAR). Den fungerar i grove trekk slik:

1. Samanliknar gjeldande integrasjonspunkt-versjon mot siste tilgjengelege versjon hjå Digdir.
2. Dersom det er ein nyare versjon tilgjengeleg, vert denne lasta ned til klienten. 
3. Gjeldande integrasjonspunkt vert forsøkt oppdatert til den nedlasta versjonen. Dersom den nye versjonen ikkje startar, rullar KOSMOS attende.

[Sjå eiga rettleiing for utdjupande informasjon]()

### Funksjonalitet
KOSMOS køyrer periodiske sjekkar i rekkefølge beskriven her. Innstillinga ```kosmos.schedulerCronExpression``` avgjer kor ofte dette skjer. 

1. Finne noværande versjon av integrasjonspunktet.
2. Finne siste versjon av integrasjonspunktet.
3. Sjekk av versjon-kompabilitet.
4. Nedlasting av siste lanserte versjon.
5. Validere autentisitet på nedlasta versjon.
6. Stopp av gammalt integrasjonspunkt.
7. Oppstart av ny versjon.

Ein kan sjølv velge tidspunkt for når ny versjon skal starte opp. Standard verdiane er kl 05:30, 19:30 og 21:30.

### Krav til integrasjonspunkt som skal verta oppdatert
Det anbefales å begynne med eit fungerande oppsett for integrasjonspunktet, men ved nyinstallasjon av både KOSMOS og integrasjonspunktet er det også mulig å bruke KOSMOS til å laste ned integrasjonspunktet for så å konfigurere både integrasjonspunkt og KOSMOS.
+ Alle nødvendige portopningar for integrasjonspunktet er satt opp i brannmur(ar) som beskytter dette. [Sjå dokumentasjon](eformidling_drift_forberede_installasjon.html#brannmur%C3%A5pninger). Om du allereie køyrer integrasjonspunktet er desse på plass og du treng ikkje åpne noko nytt for å bruke KOSMOS.
+ Følgande endepunkt må være internt eksponerte i integrasjonspunktet. 
  1. Shutdown-endepunktet: ```/manage/shutdown```. Dette gjer at KOSMOS kan stoppa integrasjonspunktet når ein ny versjon er tilgjengeleg.
  2. Info-endepunktet: ```/manage/info```. For bestemming av inneværande versjon.
  3. Helse-endepunktet: ```/manage/health```. For at KOSMOS skal kunna avgjera om applikasjonen køyrer eller ikkje.

Om du har skrudd desse av i integrasjonspunktet kan du skru det på ved denne propertyen ```management.endpoints.enabled-by-default=true```

