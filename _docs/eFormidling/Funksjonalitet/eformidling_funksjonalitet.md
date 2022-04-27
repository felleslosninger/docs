---
title: Funksjonalitet
description: ""
summary: ""
permalink: eformidling_funksjonalitet.html
product: eFormidling
sidebar: eformidling_sidebar
---

Formålet med denne siden er å gi en oversikt over funksjonaliteten som er tilgjengelig i eFormidling og hvilke
samhandlingsmønstre denne understøtter.

1. TOC
{:toc}

## En-veis kommunikasjon med innbyggere

En virksomhet sender en melding til en innbygger mha. eFormidling. Et enkelt mønster som passer bra når det som
hovedregel ikke forventes ytterligere kommunikasjon fra mottakers side. 

<div class="mermaid">
graph LR
V(Virksomhet<br>som bruker eFormidling)
I(Innbygger)
V --> |eFormidling| I
</div>

- [Informasjon til innbygger](eformidling_funksjonalitet_informasjon_til_innbygger.html)
- [Vedtak til innbygger](eformidling_funksjonalitet_vedtak_til_innbygger.html)

## En-veis kommunikasjon med virksomheter

En virksomhet sender en melding til en annen virksomhet mha. eFormidling. Et enkelt mønster som passer bra når det som
hovedregel ikke forventes ytterligere kommunikasjon fra mottakers side.

<div class="mermaid">
graph LR
V1(Virksomhet<br>som bruker eFormidling)
V2(Annen virksomhet)
V1 --> |eFormidling| V2
</div>

- [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)
- [Taushetsbelagt saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html)

## To-veis kommunikasjon mellom virksomheter som bruker eFormidling eller KS FIKS

En virksomhet sender en melding til en annen virksomhet mha. eFormidling. Den andre virksomheten svarer på den
opprinnelige meldingen mha. eFormidling eller KS FIKS. Et enkelt mønster som passer bra til samhandling mellom
virksomheter.

<div class="mermaid">
graph LR
V1(Virksomhet<br>som bruker eFormidling)
V2(Annen virksomhet<br>som bruker eFormidling eller KS FIKS)
V1 --> |eFormidling| V2
V2 --> V1
</div>

- [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)
- [Taushetsbelagt saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html)

## Forespørre informasjon fra innbyggere

En virksomhet sender en melding til en innbygger mha. eFormidling. Meldingen inneholder en forespørsel om informasjon
fra innbyggeren og en tydelig "call to action" som innbyggeren oppfordres til å følge videre til en tredjeparts
tjeneste som lar innbyggeren oppgi forespurt informasjon. Tjenesten kan være laget av virksomheten selv, en
skjematjeneste hos Altinn eller noe annet. Etter at innbyggeren har oppgitt forespurt informasjon kan denne sendes
tilbake til virksomheten med hjelp av eFormidling dersom det er ønskelig og støttet. Alternativt kan informasjonen
innbyggeren har oppgitt tilgjengeliggjøres for virksomheten på en annen måte.

<div class="mermaid">
graph LR
V(Virksomhet<br>som bruker eFormidling)
I(Innbygger)
S(Tredjeparts tjeneste)
V --> |eFormidling| I
I --> |Følger lenke| S
S --> |eFormidling| V
</div>

- [Informasjon til innbygger](eformidling_funksjonalitet_informasjon_til_innbygger.html)
- [Vedtak til innbygger](eformidling_funksjonalitet_vedtak_til_innbygger.html)
- [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)
- [Taushetsbelagt saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html)

## Forespørre informasjon fra virksomheter

En virksomhet (avsendervirksomheten) sender en melding til en annen virksomhet (mottakervirksomheten) mha. eFormidling.
Meldingen inneholder en forespørsel om informasjon fra mottakervirksomheten og en tydelig "call to action" som
mottaker virksomheten oppfordres til å følge videre til en tredjeparts tjeneste som lar mottakervirksomheten oppgi
forespurt informasjon. Tjenesten kan være laget av avsendervirksomheten selv, en skjematjeneste hos Altinn eller noe
annet. Etter at mottakervirksomheten har oppgitt forespurt informasjon kan denne sendes tilbake til avsendervirksomheten
med hjelp av eFormidling dersom det er ønskelig og støttet. Alternativt kan informasjonen mottakervirksomheten har
oppgitt tilgjengeliggjøres for avsendervirksomheten på en annen måte.

<div class="mermaid">
graph LR
V1(Virksomhet<br>som bruker eFormidling)
V2(Annen virksomhet)
S(Tredjeparts tjeneste)
V1 --> |eFormidling| V2
V2 --> |Følger lenke| S
S --> |eFormidling| V1
</div>

- [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)
- [Taushetsbelagt saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html)

## Innbygger initierer dialog

En innbygger oppsøker en tredjeparts tjeneste som lar innbyggeren utforme en generell henvendelse, fylle inn et
søknadsskjema eller noe annet. Tjenesten kan være laget av mottakervirksomheten selv, en skjematjeneste hos Altinn eller
noe annet. Etter at innbyggeren har utformet henvendelsen sendes denne til mottakervirksomheten med hjelp av
eFormidling.

<div class="mermaid">
graph LR
V(Virksomhet<br>som bruker eFormidling)
I(Innbygger)
S(Tredjeparts tjeneste)
I --> |Oppsøker| S
S --> |eFormidling| V
</div>

- [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)
- [Taushetsbelagt saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html)

## Virksomhet initierer dialog

En virksomhet (avsendervirksomheten) oppsøker en tredjeparts tjeneste som lar avsendervirksomheten utforme en generell
henvendelse, fylle inn et søknadsskjema eller noe annet. Tjenesten kan være laget av mottakervirksomheten selv, en
skjematjeneste hos Altinn eller noe annet. Etter at avsendervirksomheten har utformet henvendelsen sendes denne til
mottakervirksomheten med hjelp av eFormidling.

<div class="mermaid">
graph LR
V1(Virksomhet<br>som bruker eFormidling)
V2(Virksomhet)
S(Tredjeparts tjeneste)
V2 --> |Oppsøker| S
S --> |eFormidling| V1
</div>

- [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)
- [Taushetsbelagt saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html)

## Masseutsending til innbyggere

En virksomhet kan ha behov for å kommunisere med en større mengde innbyggere. Kommunikasjonsbehovet kan utløses av
datoer (f.eks. utsending av valgkort), hendelser (f.eks. fødsel) eller annet. Det kan være behov for alt fra årlige
masseutsendelser til helt dynamiske volum med automatiserte meldinger. Begge deler støttes av eFormidling. Både de enkle
og mer sammensatte bruksmønstrene støttes ved masseutsending til innbyggere.

- [Informasjon til innbygger](eformidling_funksjonalitet_informasjon_til_innbygger.html)
- [Vedtak til innbygger](eformidling_funksjonalitet_vedtak_til_innbygger.html)

## Masseutsending til virksomheter

En virksomhet kan ha behov for å kommunisere med en større mengde andre virksomheter. Kommunikasjonsbehovet kan utløses
av datoer (f.eks. årlig rapportering), hendelser (f.eks. fødsel) eller annet. Det kan være behov for alt fra årlige
masseutsendelser til helt dynamiske volum med automatiserte meldinger. Begge deler støttes av eFormidling. Både de enkle
og mer sammensatte bruksmønstrene støttes ved masseutsending til innbyggere.

- [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)
- [Taushetsbelagt saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html)

## Maskin-til-maskin kommunikasjon mellom virksomheter

En virksomhets systemer kan ha behov for å kommunisere med en annen virksomhets systemer uten at mennesker er involvert.
Slik kommunikasjon er vanligvis karakterisert med høyt strukturert innhold. Eksempler kan inkludere formidling av
hendelser (f.eks. fødsel) og innhenting/publisering av informasjon (f.eks. statistikk). eInnsyn er et eksempel på bruk
av eFormidling til maskin-til-maskin kommunikasjon og et annet er støtten for protokollene i FIKS IO. eFormidling
støtter også "lettvekts" protokoller som avtales direkte mellom de som skal samhandle, og som verken krever koordinering
med eller tilpassing av eFormidling.

- [Avtalt meldingsutveksling](eformidling_funksjonalitet_avtalt.html)
- [FIKS IO-meldingsutveksling](eformidling_funksjonalitet_fiks_io.html)
- [Innsynskrav fra eInnsyn](eformidling_funksjonalitet_innsynskrav.html)
- [Journalpost til eInnsyn](eformidling_funksjonalitet_journalpost.html)
- [Møte til eInnsyn](eformidling_funksjonalitet_mote.html)
